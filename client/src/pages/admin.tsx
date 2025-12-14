import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ObjectUploader } from "@/components/ObjectUploader";
import {
  Users,
  CreditCard,
  MousePointer,
  LayoutDashboard,
  LogOut,
  ExternalLink,
  Phone,
  Mail,
  MessageSquare,
  Globe,
  FileText,
  Target,
  TrendingUp,
  Activity,
  Star,
  Edit,
  Trash2,
  Plus,
  Eye,
  EyeOff,
  Sparkles,
  BookOpen,
  Loader2,
} from "lucide-react";
import { SiWhatsapp, SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import type { User, Review, Blog } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface WebsiteButton {
  name: string;
  location: string;
  action: string;
  type: "navigation" | "payment" | "external" | "scroll" | "modal";
}

const websiteButtons: WebsiteButton[] = [
  { name: "Get Started", location: "Header Navigation", action: "Navigate to /contact", type: "navigation" },
  { name: "Start Your Journey", location: "Hero Section", action: "Navigate to /contact", type: "navigation" },
  { name: "Explore Services", location: "Hero Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (8-9 Students)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (10-12 Students)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (College Graduates)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Learn More (Working Professionals)", location: "Services Section", action: "Navigate to /services", type: "navigation" },
  { name: "Discover (8-9)", location: "Pricing Page", action: "Razorpay Checkout - Rs 5,500", type: "payment" },
  { name: "Discover Plus+ (8-9)", location: "Pricing Page", action: "Razorpay Checkout - Rs 15,000", type: "payment" },
  { name: "Achieve Online (10-12)", location: "Pricing Page", action: "Razorpay Checkout - Rs 5,999", type: "payment" },
  { name: "Achieve Plus+ (10-12)", location: "Pricing Page", action: "Razorpay Checkout - Rs 10,599", type: "payment" },
  { name: "Ascend Online (College)", location: "Pricing Page", action: "Razorpay Checkout - Rs 6,499", type: "payment" },
  { name: "Ascend Plus+ (College)", location: "Pricing Page", action: "Razorpay Checkout - Rs 10,599", type: "payment" },
  { name: "Ascend Online (Working)", location: "Pricing Page", action: "Razorpay Checkout - Rs 6,499", type: "payment" },
  { name: "Ascend Plus+ (Working)", location: "Pricing Page", action: "Razorpay Checkout - Rs 10,599", type: "payment" },
  { name: "Contact for Custom Package", location: "Pricing Page", action: "Navigate to /contact", type: "navigation" },
  { name: "Book Consultation", location: "Powered By Section", action: "Navigate to /contact", type: "navigation" },
  { name: "Book Free Consultation", location: "Services Page", action: "Navigate to /contact", type: "navigation" },
  { name: "Inquire Now", location: "Service Detail Modal", action: "Navigate to /contact", type: "modal" },
  { name: "WhatsApp Float Button", location: "Footer (Fixed)", action: "Open WhatsApp Chat", type: "external" },
  { name: "Back to Top", location: "Footer", action: "Scroll to top of page", type: "scroll" },
  { name: "Instagram Link", location: "Footer Social", action: "Open Instagram profile", type: "external" },
  { name: "LinkedIn Link", location: "Footer Social", action: "Open LinkedIn profile", type: "external" },
  { name: "YouTube Link", location: "Footer Social", action: "Open YouTube channel", type: "external" },
  { name: "Navigation Links", location: "Header & Footer", action: "Navigate to respective pages", type: "navigation" },
];

const pageInfo = [
  { name: "Home", path: "/", description: "Landing page with hero, services overview, stats, testimonials, and contact form" },
  { name: "About", path: "/about", description: "Company story, mission, vision, and team information" },
  { name: "Services", path: "/services", description: "Detailed service offerings with modal popups for each service" },
  { name: "Pricing", path: "/pricing", description: "Package pricing with Razorpay payment integration" },
  { name: "Process", path: "/process", description: "Step-by-step counseling process explanation" },
  { name: "Contact", path: "/contact", description: "Contact form and business contact information" },
];

function getTypeColor(type: WebsiteButton["type"]) {
  switch (type) {
    case "navigation": return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
    case "payment": return "bg-green-500/10 text-green-600 dark:text-green-400";
    case "external": return "bg-purple-500/10 text-purple-600 dark:text-purple-400";
    case "scroll": return "bg-orange-500/10 text-orange-600 dark:text-orange-400";
    case "modal": return "bg-pink-500/10 text-pink-600 dark:text-pink-400";
    default: return "bg-muted text-muted-foreground";
  }
}

function ReviewsTab() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [formData, setFormData] = useState({ reviewerName: "", affiliation: "", rating: 5, quote: "", isVisible: true });

  const { data: reviews = [], isLoading } = useQuery<Review[]>({ queryKey: ["/api/admin/reviews"] });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/admin/reviews", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      setDialogOpen(false);
      resetForm();
      toast({ title: "Review created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<typeof formData> }) => {
      const res = await apiRequest("PUT", `/api/admin/reviews/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      setDialogOpen(false);
      setEditingReview(null);
      resetForm();
      toast({ title: "Review updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/reviews"] });
      toast({ title: "Review deleted successfully" });
    },
  });

  const resetForm = () => {
    setFormData({ reviewerName: "", affiliation: "", rating: 5, quote: "", isVisible: true });
  };

  const openEditDialog = (review: Review) => {
    setEditingReview(review);
    setFormData({
      reviewerName: review.reviewerName,
      affiliation: review.affiliation || "",
      rating: review.rating,
      quote: review.quote,
      isVisible: review.isVisible ?? true,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (editingReview) {
      updateMutation.mutate({ id: editingReview.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const toggleVisibility = (review: Review) => {
    updateMutation.mutate({ id: review.id, data: { isVisible: !review.isVisible } });
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Reviews Management
            </CardTitle>
            <CardDescription>Manage customer reviews and testimonials</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditingReview(null); resetForm(); } }}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-review"><Plus className="w-4 h-4 mr-2" />Add Review</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingReview ? "Edit Review" : "Add New Review"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Reviewer Name</Label>
                  <Input value={formData.reviewerName} onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })} placeholder="John Doe" data-testid="input-reviewer-name" />
                </div>
                <div className="space-y-2">
                  <Label>Affiliation (optional)</Label>
                  <Input value={formData.affiliation} onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })} placeholder="Student at XYZ University" data-testid="input-affiliation" />
                </div>
                <div className="space-y-2">
                  <Label>Rating (1-5)</Label>
                  <Input type="number" min={1} max={5} value={formData.rating} onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) || 5 })} data-testid="input-rating" />
                </div>
                <div className="space-y-2">
                  <Label>Quote</Label>
                  <Textarea value={formData.quote} onChange={(e) => setFormData({ ...formData, quote: e.target.value })} placeholder="Their testimonial..." data-testid="input-quote" />
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={formData.isVisible} onCheckedChange={(checked) => setFormData({ ...formData, isVisible: checked })} data-testid="switch-visibility" />
                  <Label>Visible on website</Label>
                </div>
                <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="w-full" data-testid="button-save-review">
                  {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingReview ? "Update Review" : "Create Review"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No reviews yet. Add your first review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="flex items-start justify-between gap-4 p-4 border rounded-md" data-testid={`card-review-${review.id}`}>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-medium">{review.reviewerName}</span>
                    {review.affiliation && <span className="text-sm text-muted-foreground">- {review.affiliation}</span>}
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <Badge variant={review.isVisible ? "default" : "secondary"} className="text-xs">
                      {review.isVisible ? "Visible" : "Hidden"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">"{review.quote}"</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => toggleVisibility(review)} data-testid={`button-toggle-visibility-${review.id}`}>
                    {review.isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => openEditDialog(review)} data-testid={`button-edit-review-${review.id}`}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(review.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-review-${review.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function BlogsTab() {
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [generateTopic, setGenerateTopic] = useState("");
  const [formData, setFormData] = useState({ title: "", slug: "", summary: "", body: "", coverImageUrl: "", status: "draft", generatedWithAi: false });

  const { data: blogs = [], isLoading } = useQuery<Blog[]>({ queryKey: ["/api/admin/blogs"] });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/admin/blogs", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      setDialogOpen(false);
      resetForm();
      toast({ title: "Blog created successfully" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<typeof formData> }) => {
      const res = await apiRequest("PUT", `/api/admin/blogs/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      setDialogOpen(false);
      setEditingBlog(null);
      resetForm();
      toast({ title: "Blog updated successfully" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/blogs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blogs"] });
      toast({ title: "Blog deleted successfully" });
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (topic: string) => {
      const res = await apiRequest("POST", "/api/admin/blogs/generate", { topic });
      return res.json();
    },
    onSuccess: (data) => {
      setFormData({
        title: data.title,
        slug: data.slug,
        summary: data.summary,
        body: data.body,
        coverImageUrl: "",
        status: "draft",
        generatedWithAi: true,
      });
      setGenerateTopic("");
      toast({ title: "Blog generated successfully" });
    },
    onError: (error: any) => {
      toast({ title: "Failed to generate blog", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({ title: "", slug: "", summary: "", body: "", coverImageUrl: "", status: "draft", generatedWithAi: false });
  };

  const openEditDialog = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      summary: blog.summary || "",
      body: blog.body,
      coverImageUrl: blog.coverImageUrl || "",
      status: blog.status,
      generatedWithAi: blog.generatedWithAi ?? false,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    const submitData = {
      ...formData,
      publishedAt: formData.status === "published" ? new Date().toISOString() : null,
    };
    if (editingBlog) {
      updateMutation.mutate({ id: editingBlog.id, data: submitData });
    } else {
      createMutation.mutate(submitData);
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center p-8"><Loader2 className="w-6 h-6 animate-spin" /></div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Blog Management
            </CardTitle>
            <CardDescription>Create and manage blog posts with AI assistance</CardDescription>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setEditingBlog(null); resetForm(); } }}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-blog"><Plus className="w-4 h-4 mr-2" />Add Blog</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                {!editingBlog && (
                  <div className="p-4 border rounded-md bg-muted/30 space-y-3">
                    <Label className="flex items-center gap-2"><Sparkles className="w-4 h-4" />Generate with AI</Label>
                    <div className="flex gap-2">
                      <Input value={generateTopic} onChange={(e) => setGenerateTopic(e.target.value)} placeholder="Enter a topic (e.g., Career planning tips)" data-testid="input-generate-topic" />
                      <Button onClick={() => generateMutation.mutate(generateTopic)} disabled={generateMutation.isPending || !generateTopic} data-testid="button-generate-blog">
                        {generateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Blog title" data-testid="input-blog-title" />
                </div>
                <div className="space-y-2">
                  <Label>Slug</Label>
                  <Input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="blog-url-slug" data-testid="input-blog-slug" />
                </div>
                <div className="space-y-2">
                  <Label>Summary</Label>
                  <Textarea value={formData.summary} onChange={(e) => setFormData({ ...formData, summary: e.target.value })} placeholder="Brief summary..." data-testid="input-blog-summary" />
                </div>
                <div className="space-y-2">
                  <Label>Body (HTML)</Label>
                  <Textarea className="min-h-[200px]" value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} placeholder="Blog content..." data-testid="input-blog-body" />
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  {formData.coverImageUrl ? (
                    <div className="space-y-2">
                      <img src={formData.coverImageUrl} alt="Cover" className="w-full h-32 object-cover rounded-md" />
                      <Button variant="outline" size="sm" onClick={() => setFormData({ ...formData, coverImageUrl: "" })}>Remove Image</Button>
                    </div>
                  ) : (
                    <ObjectUploader onUploadComplete={(url) => setFormData({ ...formData, coverImageUrl: url })} />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <div className="flex gap-2">
                    <Button variant={formData.status === "draft" ? "default" : "outline"} size="sm" onClick={() => setFormData({ ...formData, status: "draft" })} data-testid="button-status-draft">Draft</Button>
                    <Button variant={formData.status === "published" ? "default" : "outline"} size="sm" onClick={() => setFormData({ ...formData, status: "published" })} data-testid="button-status-published">Published</Button>
                  </div>
                </div>
                <Button onClick={handleSubmit} disabled={createMutation.isPending || updateMutation.isPending} className="w-full" data-testid="button-save-blog">
                  {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingBlog ? "Update Blog" : "Create Blog"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {blogs.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No blogs yet. Create your first blog post!</p>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex items-start justify-between gap-4 p-4 border rounded-md" data-testid={`card-blog-${blog.id}`}>
                <div className="flex gap-4 flex-1">
                  {blog.coverImageUrl && (
                    <img src={blog.coverImageUrl} alt={blog.title} className="w-20 h-20 object-cover rounded-md flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium truncate">{blog.title}</span>
                      <Badge variant={blog.status === "published" ? "default" : "secondary"}>{blog.status}</Badge>
                      {blog.generatedWithAi && <Badge variant="outline" className="text-xs"><Sparkles className="w-3 h-3 mr-1" />AI</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{blog.summary}</p>
                    <p className="text-xs text-muted-foreground mt-1">/{blog.slug}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="icon" variant="ghost" onClick={() => openEditDialog(blog)} data-testid={`button-edit-blog-${blog.id}`}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => deleteMutation.mutate(blog.id)} disabled={deleteMutation.isPending} data-testid={`button-delete-blog-${blog.id}`}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const { user } = useAuth();
  const typedUser = user as User | undefined;

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground" data-testid="text-admin-title">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {typedUser?.firstName || typedUser?.email || "Admin"}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />Logout
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Pages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-pages">6</div>
                <p className="text-xs text-muted-foreground">Active website pages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Interactive Elements</CardTitle>
                <MousePointer className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-buttons">{websiteButtons.length}</div>
                <p className="text-xs text-muted-foreground">Buttons & CTAs tracked</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pricing Packages</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-packages">8</div>
                <p className="text-xs text-muted-foreground">Active packages</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Payment Gateway</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600" data-testid="text-payment-status">Active</div>
                <p className="text-xs text-muted-foreground">Razorpay integrated</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="reviews" className="w-full">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid" data-testid="tabs-admin">
              <TabsTrigger value="reviews" data-testid="tab-reviews">
                <Star className="w-4 h-4 mr-2 hidden sm:inline" />Reviews
              </TabsTrigger>
              <TabsTrigger value="blogs" data-testid="tab-blogs">
                <BookOpen className="w-4 h-4 mr-2 hidden sm:inline" />Blogs
              </TabsTrigger>
              <TabsTrigger value="buttons" data-testid="tab-buttons">
                <MousePointer className="w-4 h-4 mr-2 hidden sm:inline" />Buttons
              </TabsTrigger>
              <TabsTrigger value="pages" data-testid="tab-pages">
                <LayoutDashboard className="w-4 h-4 mr-2 hidden sm:inline" />Pages
              </TabsTrigger>
              <TabsTrigger value="packages" data-testid="tab-packages">
                <CreditCard className="w-4 h-4 mr-2 hidden sm:inline" />Packages
              </TabsTrigger>
              <TabsTrigger value="quick-actions" data-testid="tab-actions">
                <Target className="w-4 h-4 mr-2 hidden sm:inline" />Actions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="reviews" className="mt-6">
              <ReviewsTab />
            </TabsContent>

            <TabsContent value="blogs" className="mt-6">
              <BlogsTab />
            </TabsContent>

            <TabsContent value="buttons" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><MousePointer className="w-5 h-5" />Website Buttons & CTAs</CardTitle>
                  <CardDescription>Complete documentation of all interactive elements on the website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Button Name</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Location</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Action</th>
                          <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {websiteButtons.map((btn, index) => (
                          <tr key={index} className="border-b border-border/50 hover-elevate" data-testid={`row-button-${index}`}>
                            <td className="py-3 px-4 font-medium">{btn.name}</td>
                            <td className="py-3 px-4 text-muted-foreground">{btn.location}</td>
                            <td className="py-3 px-4 text-muted-foreground">{btn.action}</td>
                            <td className="py-3 px-4"><Badge variant="secondary" className={getTypeColor(btn.type)}>{btn.type}</Badge></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><LayoutDashboard className="w-5 h-5" />Website Pages</CardTitle>
                  <CardDescription>All pages in the EduVista website</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {pageInfo.map((page, index) => (
                      <Card key={index} className="hover-elevate" data-testid={`card-page-${index}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg flex items-center justify-between gap-2">
                            {page.name}
                            <a href={page.path} target="_blank" rel="noopener noreferrer">
                              <Button size="icon" variant="ghost"><ExternalLink className="w-4 h-4" /></Button>
                            </a>
                          </CardTitle>
                          <Badge variant="outline" className="w-fit">{page.path}</Badge>
                        </CardHeader>
                        <CardContent><p className="text-sm text-muted-foreground">{page.description}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="packages" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" />Pricing Packages</CardTitle>
                  <CardDescription>All counseling packages with Razorpay integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" />8-9 Students</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-8-9-discover"><span>Discover</span><Badge>Rs 5,500</Badge></div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-8-9-discover-plus"><span>Discover Plus+</span><Badge>Rs 15,000</Badge></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><Users className="w-4 h-4" />10-12 Students</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-10-12-achieve"><span>Achieve Online</span><Badge>Rs 5,999</Badge></div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-10-12-achieve-plus"><span>Achieve Plus+</span><Badge>Rs 10,599</Badge></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" />College Graduates</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-college-ascend"><span>Ascend Online</span><Badge>Rs 6,499</Badge></div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-college-ascend-plus"><span>Ascend Plus+</span><Badge>Rs 10,599</Badge></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp className="w-4 h-4" />Working Professionals</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-working-ascend"><span>Ascend Online</span><Badge>Rs 6,499</Badge></div>
                        <div className="flex justify-between items-center p-3 bg-muted/50 rounded-md" data-testid="package-working-ascend-plus"><span>Ascend Plus+</span><Badge>Rs 10,599</Badge></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quick-actions" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5" />Website Links</CardTitle>
                    <CardDescription>Quick access to all pages</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {pageInfo.map((page, index) => (
                      <a key={index} href={page.path} className="block" data-testid={`link-page-${index}`}>
                        <Button variant="outline" className="w-full justify-start"><ExternalLink className="w-4 h-4 mr-2" />{page.name}</Button>
                      </a>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" />Contact Information</CardTitle>
                    <CardDescription>Business contact details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md"><Mail className="w-4 h-4" /></div>
                      <div><p className="text-sm text-muted-foreground">Email</p><p className="font-medium" data-testid="text-contact-email">with.nikita@gmail.com</p></div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-md"><Phone className="w-4 h-4" /></div>
                      <div><p className="text-sm text-muted-foreground">Phone</p><p className="font-medium" data-testid="text-contact-phone">+91 99777 77082</p></div>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t">
                      <a href="https://wa.me/919977777082" target="_blank" rel="noopener noreferrer" data-testid="link-whatsapp"><Button size="icon" variant="outline"><SiWhatsapp className="w-4 h-4" /></Button></a>
                      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" data-testid="link-instagram"><Button size="icon" variant="outline"><SiInstagram className="w-4 h-4" /></Button></a>
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" data-testid="link-linkedin"><Button size="icon" variant="outline"><SiLinkedin className="w-4 h-4" /></Button></a>
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" data-testid="link-youtube"><Button size="icon" variant="outline"><SiYoutube className="w-4 h-4" /></Button></a>
                    </div>
                  </CardContent>
                </Card>
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Target className="w-5 h-5" />Button Type Legend</CardTitle>
                    <CardDescription>Understanding the button types on the website</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2"><Badge variant="secondary" className={getTypeColor("navigation")}>navigation</Badge><span className="text-sm text-muted-foreground">Navigates between pages</span></div>
                      <div className="flex items-center gap-2"><Badge variant="secondary" className={getTypeColor("payment")}>payment</Badge><span className="text-sm text-muted-foreground">Initiates Razorpay checkout</span></div>
                      <div className="flex items-center gap-2"><Badge variant="secondary" className={getTypeColor("external")}>external</Badge><span className="text-sm text-muted-foreground">Opens external link</span></div>
                      <div className="flex items-center gap-2"><Badge variant="secondary" className={getTypeColor("scroll")}>scroll</Badge><span className="text-sm text-muted-foreground">Scrolls within page</span></div>
                      <div className="flex items-center gap-2"><Badge variant="secondary" className={getTypeColor("modal")}>modal</Badge><span className="text-sm text-muted-foreground">Opens modal/dialog</span></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
