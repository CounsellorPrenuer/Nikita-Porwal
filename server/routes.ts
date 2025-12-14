import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import Razorpay from "razorpay";
import crypto from "crypto";
import { z } from "zod";
import { getPackageById } from "@shared/pricing";
import { insertReviewSchema, insertBlogSchema } from "@shared/schema";
import { getSignedUploadUrl, getPublicUrl } from "./objectStorage";
import { makePublic } from "./objectAcl";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
});

const createOrderSchema = z.object({
  packageId: z.string().min(1),
  customerName: z.string().min(1),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(10),
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup authentication
  await setupAuth(app);

  // Auth routes
  app.get("/api/auth/user", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Razorpay setup
  const razorpayKeyId = process.env.RAZORPAY_KEY_ID;
  const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

  let razorpay: Razorpay | null = null;
  
  if (razorpayKeyId && razorpayKeySecret) {
    razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });
  }

  app.post("/api/razorpay/create-order", async (req, res) => {
    try {
      if (!razorpay) {
        return res.status(500).json({ error: "Razorpay is not configured" });
      }

      const parseResult = createOrderSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid request data", details: parseResult.error.errors });
      }

      const { packageId, customerName, customerEmail, customerPhone } = parseResult.data;

      const pkg = getPackageById(packageId);
      if (!pkg) {
        return res.status(400).json({ error: "Invalid package selected" });
      }

      const options = {
        amount: Math.round(pkg.price * 100),
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          packageId,
          packageName: pkg.name,
          packagePrice: pkg.price.toString(),
          customerName,
          customerEmail,
          customerPhone,
        },
      };

      const order = await razorpay.orders.create(options);
      res.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: razorpayKeyId,
        packageName: pkg.name,
        packagePrice: pkg.price,
      });
    } catch (error: any) {
      console.error("Error creating Razorpay order:", error);
      res.status(500).json({ error: error.message || "Failed to create order" });
    }
  });

  app.post("/api/razorpay/verify-payment", async (req, res) => {
    try {
      if (!razorpayKeySecret) {
        return res.status(500).json({ error: "Razorpay is not configured" });
      }

      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({ error: "Missing payment verification fields" });
      }

      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", razorpayKeySecret)
        .update(body.toString())
        .digest("hex");

      const isValid = expectedSignature === razorpay_signature;

      if (isValid) {
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ success: false, error: "Invalid signature" });
      }
    } catch (error: any) {
      console.error("Error verifying payment:", error);
      res.status(500).json({ error: error.message || "Payment verification failed" });
    }
  });

  app.get("/api/razorpay/config", (req, res) => {
    res.json({
      configured: !!razorpay,
      keyId: razorpayKeyId || null,
    });
  });

  // Public API routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const reviews = await storage.getVisibleReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.get("/api/blogs", async (req, res) => {
    try {
      const blogs = await storage.getPublishedBlogs();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.get("/api/blogs/:slug", async (req, res) => {
    try {
      const blog = await storage.getBlogBySlug(req.params.slug);
      if (!blog || blog.status !== "published") {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error fetching blog:", error);
      res.status(500).json({ message: "Failed to fetch blog" });
    }
  });

  // Admin API routes - Reviews
  app.get("/api/admin/reviews", async (req, res) => {
    try {
      const reviews = await storage.getReviews();
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/admin/reviews", async (req, res) => {
    try {
      const parseResult = insertReviewSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid data", details: parseResult.error.errors });
      }
      const review = await storage.createReview(parseResult.data);
      res.json(review);
    } catch (error) {
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.put("/api/admin/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateSchema = insertReviewSchema.partial();
      const parseResult = updateSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid data", details: parseResult.error.errors });
      }
      const review = await storage.updateReview(id, parseResult.data);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      console.error("Error updating review:", error);
      res.status(500).json({ message: "Failed to update review" });
    }
  });

  app.delete("/api/admin/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteReview(id);
      if (!success) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting review:", error);
      res.status(500).json({ message: "Failed to delete review" });
    }
  });

  // Admin API routes - Blogs
  app.get("/api/admin/blogs", async (req, res) => {
    try {
      const blogs = await storage.getBlogs();
      res.json(blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).json({ message: "Failed to fetch blogs" });
    }
  });

  app.post("/api/admin/blogs", async (req, res) => {
    try {
      const parseResult = insertBlogSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid data", details: parseResult.error.errors });
      }
      const blog = await storage.createBlog(parseResult.data);
      res.json(blog);
    } catch (error) {
      console.error("Error creating blog:", error);
      res.status(500).json({ message: "Failed to create blog" });
    }
  });

  app.put("/api/admin/blogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateSchema = insertBlogSchema.partial();
      const parseResult = updateSchema.safeParse(req.body);
      if (!parseResult.success) {
        return res.status(400).json({ error: "Invalid data", details: parseResult.error.errors });
      }
      const blog = await storage.updateBlog(id, parseResult.data);
      if (!blog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blog);
    } catch (error) {
      console.error("Error updating blog:", error);
      res.status(500).json({ message: "Failed to update blog" });
    }
  });

  app.delete("/api/admin/blogs/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBlog(id);
      if (!success) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting blog:", error);
      res.status(500).json({ message: "Failed to delete blog" });
    }
  });

  // AI Blog Generation
  app.post("/api/admin/blogs/generate", async (req, res) => {
    try {
      const { topic } = req.body;
      if (!topic) {
        return res.status(400).json({ error: "Topic is required" });
      }

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional blog writer for EduVista, an education counseling company. Write engaging, informative blog posts about career guidance, education planning, and student success. Format your response as JSON with fields: title, summary (2-3 sentences), body (full HTML-formatted blog content with paragraphs, headings, and lists where appropriate)."
          },
          {
            role: "user",
            content: `Write a blog post about: ${topic}`
          }
        ],
        response_format: { type: "json_object" },
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        return res.status(500).json({ error: "Failed to generate content" });
      }

      const parsed = JSON.parse(content);
      const slug = parsed.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      res.json({
        title: parsed.title,
        slug: `${slug}-${Date.now()}`,
        summary: parsed.summary,
        body: parsed.body,
        generatedWithAi: true,
      });
    } catch (error: any) {
      console.error("Error generating blog:", error);
      res.status(500).json({ error: error.message || "Failed to generate blog" });
    }
  });

  // Object storage - Upload URL
  app.post("/api/objects/upload-url", async (req, res) => {
    try {
      const { fileName, contentType } = req.body;
      if (!fileName || !contentType) {
        return res.status(400).json({ error: "fileName and contentType are required" });
      }

      const result = await getSignedUploadUrl(fileName, contentType);
      if (!result) {
        return res.status(500).json({ error: "Object storage not configured" });
      }

      res.json(result);
    } catch (error: any) {
      console.error("Error getting upload URL:", error);
      res.status(500).json({ error: error.message || "Failed to get upload URL" });
    }
  });

  // Make uploaded file public and get URL
  app.post("/api/objects/make-public", async (req, res) => {
    try {
      const { objectPath } = req.body;
      if (!objectPath) {
        return res.status(400).json({ error: "objectPath is required" });
      }

      const success = await makePublic(objectPath);
      if (!success) {
        return res.status(500).json({ error: "Failed to make object public" });
      }

      const publicUrl = getPublicUrl(objectPath);
      res.json({ url: publicUrl });
    } catch (error: any) {
      console.error("Error making object public:", error);
      res.status(500).json({ error: error.message || "Failed to make object public" });
    }
  });

  return httpServer;
}
