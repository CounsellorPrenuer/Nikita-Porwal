
export const MOCK_RAZORPAY_CONFIG = {
  configured: true,
  keyId: null
};

export const MOCK_USER = null;

export const MOCK_REVIEWS = [
  {
    id: 1,
    reviewerName: "Priya Sharma",
    affiliation: "MBA Aspirant",
    rating: 5,
    quote: "The guidance I received was invaluable. Highly recommended!",
    isVisible: true
  },
  {
    id: 2,
    reviewerName: "Rahul Verma",
    affiliation: "Engineering Student",
    rating: 5,
    quote: "Helped me clarify my career goals and choose the right path.",
    isVisible: true
  }
];

export const MOCK_BLOGS = [
  {
    id: 1,
    title: "Choosing the Right Career Path",
    slug: "choosing-right-career",
    summary: "Tips and strategies for making informed career decisions.",
    body: "Content coming soon...",
    status: "published",
    publishedAt: new Date().toISOString(),
    coverImageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
  }
];
