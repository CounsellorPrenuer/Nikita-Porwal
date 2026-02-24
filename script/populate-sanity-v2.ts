import { createClient } from "@sanity/client";

const sanityWriteClient = createClient({
    projectId: "t6wag8hb",
    dataset: "production",
    useCdn: false,
    apiVersion: "2024-02-24",
    token: "skr0pA6DNce8y9yOzAj24OP5ZKeI1O1dROJXYk4wKAfL1SQRnZApFugc04cnffjgzGxIVkYxjxqTE8RK7dJ2Dnh5QXlv2av54zCifL4Pxteauw5IWme1zZHchnA6TdWAw0p76WcIgNPasM4HG8xWCPqwAmvmHs9qt13LKOTKxI4L3QRwDSWs",
});

const standardCategories = [
    {
        id: "8-9",
        name: "8-9 Students",
        packages: [
            {
                id: "pkg-1",
                name: "Discover",
                price: 5500,
                description: "Perfect for students starting their educational journey",
                paymentButtonId: "pl_RwDuOx96VYrsyN",
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
                paymentButtonId: "pl_RwDq8XpK76OhB3",
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
        id: "10-12",
        name: "10-12 Students",
        packages: [
            {
                id: "pkg-3",
                name: "Achieve Online",
                price: 5999,
                description: "Stream selection and career pathway guidance",
                paymentButtonId: "pl_RwDxvLPQP7j4rG",
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
                paymentButtonId: "pl_RwDzfVkQYEdAIf",
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
        id: "college",
        name: "Graduates",
        packages: [
            {
                id: "pkg-5",
                name: "Ascend Online",
                price: 6499,
                description: "Launch your career with expert guidance",
                paymentButtonId: "pl_RwE1evNHrHWJDW",
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
                paymentButtonId: "pl_RwE3WEILWB9WeJ",
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
        id: "working",
        name: "Working Professionals",
        packages: [
            {
                id: "mp-3",
                name: "Ascend Online",
                price: 6499,
                description: "Navigate your career transition successfully",
                paymentButtonId: "pl_RwE1evNHrHWJDW",
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
                paymentButtonId: "pl_RwE3WEILWB9WeJ",
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
        description: "₹199 for a ranked list of the top 100 colleges in your course. Get an expert-curated list of colleges based on verified cut-offs. CAP-100 ranks the top 100 colleges into four tiers to help you plan smarter: Indian Ivy League, Target, Smart Backup, and Safe Bet colleges. You can then shortlist colleges based on where you stand!.",
        orderId: 7
    }
];

async function populateSanity() {
    console.log("Starting Sanity population...");

    // Upload Standard Categories & Packages
    for (const cat of standardCategories) {
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

    console.log("Uploading custom packages...");
    for (const cPkg of customPackages) {
        await sanityWriteClient.createOrReplace(cPkg);
    }

    console.log("Population v2 complete!");
}

populateSanity().catch(console.error);
