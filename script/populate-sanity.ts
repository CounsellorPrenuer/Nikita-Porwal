import { createClient } from "@sanity/client";

const sanityWriteClient = createClient({
    projectId: "t6wag8hb",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "skr0pA6DNce8y9yOzAj24OP5ZKeI1O1dROJXYk4wKAfL1SQRnZApFugc04cnffjgzGxIVkYxjxqTE8RK7dJ2Dnh5QXlv2av54zCifL4Pxteauw5IWme1zZHchnA6TdWAw0p76WcIgNPasM4HG8xWCPqwAmvmHs9qt13LKOTKxI4L3QRwDSWs",
});

const pricingCategories = [
    {
        id: "8-9",
        name: "8-9 Students",
        packages: [
            {
                id: "8-9-discover",
                name: "Discover",
                price: 5500,
                description: "Perfect for students starting their educational journey",
                paymentButtonId: "pl_RwDuOx96VYrsyN",
                features: [
                    "Psychometric Assessment",
                    "Strengths & Interests Mapping",
                    "Subject Selection Guidance",
                    "One-on-One Counseling Session",
                    "Career Awareness Workshop",
                    "Report with Recommendations",
                ],
            },
            {
                id: "8-9-discover-plus",
                name: "Discover Plus+",
                price: 15000,
                description: "Comprehensive guidance for serious learners",
                paymentButtonId: "pl_RwDq8XpK76OhB3",
                features: [
                    "Everything in Discover",
                    "Advanced Aptitude Testing",
                    "Multiple Counseling Sessions",
                    "Parent-Teacher Guidance",
                    "Skill Development Roadmap",
                    "6-Month Follow-up Support",
                    "Personalized Learning Plan",
                    "Priority WhatsApp Support",
                ],
                highlighted: true,
            },
        ],
    },
    {
        id: "10-12",
        name: "10-12 Students",
        packages: [
            {
                id: "10-12-achieve",
                name: "Achieve Online",
                price: 5999,
                description: "Stream selection and career pathway guidance",
                paymentButtonId: "pl_RwDxvLPQP7j4rG",
                features: [
                    "Stream Selection Assessment",
                    "Aptitude & Interest Analysis",
                    "Career Pathway Mapping",
                    "Subject Combination Advice",
                    "One-on-One Counseling",
                    "Detailed Career Report",
                ],
            },
            {
                id: "10-12-achieve-plus",
                name: "Achieve Plus+",
                price: 10599,
                description: "Complete guidance for board exam students",
                paymentButtonId: "pl_RwDzfVkQYEdAIf",
                features: [
                    "Everything in Achieve Online",
                    "Entrance Exam Preparation Tips",
                    "College Selection Guidance",
                    "Multiple Counseling Sessions",
                    "Scholarship Information",
                    "Study Abroad Consultation",
                    "3-Month Follow-up Support",
                    "Priority WhatsApp Support",
                ],
                highlighted: true,
            },
        ],
    },
    {
        id: "college",
        name: "College Graduates",
        packages: [
            {
                id: "college-ascend",
                name: "Ascend Online",
                price: 6499,
                description: "Launch your career with expert guidance",
                paymentButtonId: "pl_RwE1evNHrHWJDW",
                features: [
                    "Career Assessment",
                    "Industry-Aligned Skill Analysis",
                    "Resume Building Guidance",
                    "Interview Preparation Tips",
                    "Job Market Insights",
                    "Career Roadmap Report",
                ],
            },
            {
                id: "college-ascend-plus",
                name: "Ascend Plus+",
                price: 10599,
                description: "Comprehensive career launch program",
                paymentButtonId: "pl_RwE3WEILWB9WeJ",
                features: [
                    "Everything in Ascend Online",
                    "LinkedIn Profile Optimization",
                    "Mock Interview Sessions",
                    "Higher Education Guidance",
                    "Industry Connect Sessions",
                    "3-Month Career Support",
                    "Personalized Growth Plan",
                    "Priority WhatsApp Support",
                ],
                highlighted: true,
            },
        ],
    },
    {
        id: "working",
        name: "Working Professionals",
        packages: [
            {
                id: "working-ascend",
                name: "Ascend Online",
                price: 6499,
                description: "Navigate your career transition successfully",
                paymentButtonId: "pl_RwE1evNHrHWJDW",
                features: [
                    "Career Transition Assessment",
                    "Skill Gap Analysis",
                    "Industry Trend Insights",
                    "Personal Branding Strategy",
                    "One-on-One Counseling",
                    "Career Pivot Roadmap",
                ],
            },
            {
                id: "working-ascend-plus",
                name: "Ascend Plus+",
                price: 10599,
                description: "Complete career transformation program",
                paymentButtonId: "pl_RwE3WEILWB9WeJ",
                features: [
                    "Everything in Ascend Online",
                    "Executive Resume Building",
                    "Leadership Coaching Session",
                    "Networking Strategy",
                    "Upskilling Recommendations",
                    "3-Month Career Mentoring",
                    "Priority WhatsApp Support",
                    "Exclusive Webinar Access",
                ],
                highlighted: true,
            },
        ],
    },
];

const mockReviews = [
    {
        _id: "review-1",
        _type: "review",
        reviewerName: "Priya Sharma",
        affiliation: "MBA Aspirant",
        rating: 5,
        quote: "The guidance I received was invaluable. Highly recommended!",
        isVisible: true
    },
    {
        _id: "review-2",
        _type: "review",
        reviewerName: "Rahul Verma",
        affiliation: "Engineering Student",
        rating: 5,
        quote: "Helped me clarify my career goals and choose the right path.",
        isVisible: true
    }
];

const mockBlogs = [
    {
        _id: "blog-1",
        _type: "blog",
        title: "Choosing the Right Career Path",
        slug: "choosing-right-career",
        summary: "Tips and strategies for making informed career decisions.",
        body: "Content coming soon...",
        status: "published",
        publishedAt: new Date().toISOString(),
        coverImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
    }
];

async function populateSanity() {
    console.log("Starting Sanity population...");

    // Upload Categories & Packages
    for (const cat of pricingCategories) {
        console.log(`Uploading category: ${cat.name}`);
        const catDoc = {
            _type: "pricingCategory",
            _id: `category-${cat.id}`,
            name: cat.name,
            orderId: cat.id
        };
        await sanityWriteClient.createOrReplace(catDoc);

        for (const pkg of cat.packages) {
            console.log(`  Uploading package: ${pkg.name}`);
            const pkgDoc = {
                _type: "pricingPackage",
                _id: `package-${pkg.id}`,
                categoryId: cat.id,
                name: pkg.name,
                price: pkg.price,
                description: pkg.description,
                paymentButtonId: pkg.paymentButtonId,
                features: pkg.features,
                highlighted: pkg.highlighted || false,
            };
            await sanityWriteClient.createOrReplace(pkgDoc);
        }
    }

    // Upload Reviews
    for (const rev of mockReviews) {
        console.log(`Uploading review: ${rev.reviewerName}`);
        await sanityWriteClient.createOrReplace(rev);
    }

    // Upload Blogs
    for (const blog of mockBlogs) {
        console.log(`Uploading blog: ${blog.title}`);
        await sanityWriteClient.createOrReplace(blog);
    }

    console.log("Population complete!");
}

populateSanity().catch(console.error);
