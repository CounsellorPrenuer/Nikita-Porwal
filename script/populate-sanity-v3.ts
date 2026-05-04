import { createClient } from "@sanity/client";

const sanityWriteClient = createClient({
    projectId: "7fwra7kt",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: process.env.SANITY_EDITOR_TOKEN,
});

const standardCategories = [
    {
        id: "1",
        name: "8-10 Students",
        packages: [
            {
                id: "pkg-1",
                name: "Discover",
                price: 5500,
                description: "Perfect for students starting their educational journey",
                features: [
                    "Psychometric assessment",
                    "1 career counselling session",
                    "Lifetime Knowledge Gateway access",
                    "Live webinar invites",
                ],
            },
            {
                id: "pkg-2",
                name: "Discover Plus+",
                price: 15000,
                description: "Comprehensive guidance for serious learners",
                features: [
                    "Psychometric assessments",
                    "8 career counselling sessions (1/year)",
                    "Custom reports & study abroad guidance",
                    "CV building",
                ],
                highlighted: true,
            },
        ],
    },
    {
        id: "2",
        name: "10-12 Students",
        packages: [
            {
                id: "pkg-3",
                name: "Achieve Online",
                price: 5999,
                description: "Stream selection and career pathway guidance",
                features: [
                    "Psychometric assessment",
                    "1 career counselling session",
                    "Lifetime Knowledge Gateway access",
                    "Pre-recorded webinars",
                ],
            },
            {
                id: "pkg-4",
                name: "Achieve Plus+",
                price: 10599,
                description: "Complete guidance for board exam students",
                features: [
                    "Psychometric assessment",
                    "4 career counselling sessions",
                    "Custom reports & study abroad guidance",
                    "CV reviews",
                ],
                highlighted: true,
            },
        ],
    },
    {
        id: "3",
        name: "Graduates",
        packages: [
            {
                id: "pkg-5",
                name: "Ascend Online",
                price: 6499,
                description: "Launch your career with expert guidance",
                features: [
                    "Psychometric assessment",
                    "1 career counselling session",
                    "Lifetime Knowledge Gateway access",
                    "Pre-recorded webinars",
                ],
            },
            {
                id: "pkg-6",
                name: "Ascend Plus+",
                price: 10599,
                description: "Comprehensive career launch program",
                features: [
                    "Psychometric assessment",
                    "3 career counselling sessions",
                    "Certificate/online course info",
                    "CV reviews for jobs",
                ],
                highlighted: true,
            },
        ],
    },
    {
        id: "4",
        name: "Working Professionals",
        packages: [
            {
                id: "mp-3",
                name: "Ascend Online",
                price: 6499,
                description: "Navigate your career transition successfully",
                features: [
                    "Psychometric assessment",
                    "1 career counselling session",
                    "Lifetime Knowledge Gateway access",
                    "Pre-recorded webinars",
                ],
            },
            {
                id: "mp-2",
                name: "Ascend Plus+",
                price: 10599,
                description: "Complete career transformation program",
                features: [
                    "Psychometric assessment",
                    "3 career counselling sessions",
                    "Certificate/online course info",
                    "CV reviews for jobs",
                ],
                highlighted: true,
            },
        ],
    },
];

const customPackages = [
    {
        _id: "custom-career-report",
        _type: "customPackage",
        id: "career-report",
        title: "Career Report",
        price: 1500,
        description: "Get a detailed report of your psychometric assessment for a scientific analysis of your interests. Find out where your interests lie and which future paths you can potentially consider.",
        orderId: 1
    },
    {
        _id: "custom-career-report-counselling",
        _type: "customPackage",
        id: "career-report-counselling",
        title: "Career Report + Career Counselling",
        price: 3000,
        description: "Connect with India's top career coaches to analyse your psychometric report and shortlist the top three career paths you're most likely to enjoy and excel at.",
        orderId: 2
    },
    {
        _id: "custom-knowledge-gateway",
        _type: "customPackage",
        id: "knowledge-gateway",
        title: "Knowledge Gateway + Career Helpline Access",
        price: 100,
        description: "Unlock holistic information on your career paths and get direct access to Mentoria's experts, who will resolve your career-related queries through our dedicated Career Helpline. Validate your career decisions from now until you land a job you love.",
        orderId: 3
    },
    {
        _id: "custom-one-to-one-session",
        _type: "customPackage",
        id: "one-to-one-session",
        title: "One-to-One Session with a Career Expert",
        price: 3500,
        description: "Resolve your career queries and glimpse into your future world through a one-on-one session with an expert from your chosen field.",
        orderId: 4
    },
    {
        _id: "custom-college-admission-planning",
        _type: "customPackage",
        id: "college-admission-planning",
        title: "College Admission Planning",
        price: 3000,
        description: "Get unbiased recommendations and details on your future college options in India and abroad, organised in one resourceful planner.",
        orderId: 5
    },
    {
        _id: "custom-exam-stress-management",
        _type: "customPackage",
        id: "exam-stress-management",
        title: "Exam Stress Management",
        price: 1000,
        description: "Get expert guidance on tackling exam stress, planning your study schedule, revision tips and more from India's top educators. Increase your chances of acing exams with a calm and clear mind.",
        orderId: 6
    },
    {
        _id: "custom-cap-100",
        _type: "customPackage",
        id: "cap-100",
        title: "College Admissions Planner - 100 (CAP-100)",
        price: 199,
        description: "₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!",
        orderId: 7
    }
];

const mockBlogs = [
    {
        _id: "blog-1",
        _type: "blog",
        title: "5 Tips for Choosing the Right Career Path",
        slug: { _type: "slug", current: "5-tips-choosing-right-career-path" },
        summary: "Discover the essential steps to identify your strengths and align them with a career that brings fulfillment and success.",
        body: "<p>Choosing a career is one of the most significant decisions you'll ever make. It's not just about what you'll do for 40 hours a week; it's about finding a path that resonates with your values and passions.</p><h3>1. Self-Reflection</h3><p>Understand your interests, skills, and values. What activities make you lose track of time?</p><h3>2. Research</h3><p>Look into different industries and job roles. What does a typical day look like?</p><h3>3. Networking</h3><p>Talk to professionals in fields that interest you. Their first-hand experience is invaluable.</p>",
        status: "published",
        publishedAt: new Date().toISOString(),
        coverImageUrl: "https://images.unsplash.com/photo-1454165833767-0266b19677c8?q=80&w=800&auto=format&fit=crop"
    },
    {
        _id: "blog-2",
        _type: "blog",
        title: "Managing Exam Stress: A Guide for Students",
        slug: { _type: "slug", current: "managing-exam-stress-guide" },
        summary: "Learn effective strategies to stay calm, focused, and productive during the high-pressure exam season.",
        body: "<p>Exams can be overwhelming, but with the right mindset and preparation, you can excel without sacrificing your mental peace.</p><h3>Plan Ahead</h3><p>Create a realistic study schedule and stick to it. Don't leave everything for the last minute.</p><h3>Take Breaks</h3><p>Your brain needs rest. Short breaks every hour improve focus.</p><h3>Stay Healthy</h3><p>Good sleep and nutrition are key to a clear mind.</p>",
        status: "published",
        publishedAt: new Date().toISOString(),
        coverImageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=800&auto=format&fit=crop"
    }
];

async function cleanAndPopulate() {
    console.log("Step 1: Deleting ALL old data from Sanity...");

    // Delete old pricingCategory, pricingPackage, customPackage, blog
    const types = ["pricingCategory", "pricingPackage", "customPackage", "blog"];
    for (const type of types) {
        const ids = await sanityWriteClient.fetch(`*[_type == "${type}"]._id`);
        for (const id of ids) {
            await sanityWriteClient.delete(id);
            console.log(`  Deleted ${type}: ${id}`);
        }
    }

    console.log("\nStep 2: Uploading fresh pricing data...");
    // ... (rest of the upload logic)

    // Upload Standard Categories & Packages
    for (const cat of standardCategories) {
        console.log(`Uploading category: ${cat.name} (order: ${cat.id})`);
        const catDoc = {
            _type: "pricingCategory",
            _id: `category-${cat.id}`,
            name: cat.name,
            orderId: cat.id
        };
        await sanityWriteClient.createOrReplace(catDoc);

        for (const pkg of cat.packages) {
            console.log(`  Uploading package: ${pkg.name} (₹${pkg.price})`);
            const pkgDoc = {
                _type: "pricingPackage",
                _id: `package-${pkg.id}`,
                categoryId: cat.id,
                name: pkg.name,
                price: pkg.price,
                description: pkg.description,
                features: pkg.features,
                highlighted: pkg.highlighted || false,
            };
            await sanityWriteClient.createOrReplace(pkgDoc);
        }
    }

    console.log("\nStep 3: Uploading custom packages...");
    for (const cPkg of customPackages) {
        console.log(`  Uploading: ${cPkg.title} (₹${cPkg.price})`);
        await sanityWriteClient.createOrReplace(cPkg);
    }

    console.log("\nStep 4: Uploading mock blogs...");
    for (const blog of mockBlogs) {
        console.log(`  Uploading: ${blog.title}`);
        await sanityWriteClient.createOrReplace(blog);
    }

    console.log("\n✅ Population v3 complete! Order: 8-9 → 10-12 → Graduates → Working Professionals");
}

cleanAndPopulate().catch(console.error);
