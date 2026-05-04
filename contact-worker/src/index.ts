export interface Env {
    DB: D1Database;
    RAZORPAY_KEY_ID: string;
    RAZORPAY_KEY_SECRET: string;
    RAZORPAY_WEBHOOK_SECRET: string;
    SANITY_PROJECT_ID: string;
    SANITY_TOKEN: string;
}

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Predefined coupon codes
const COUPON_CODES: Record<string, { discount: number; type: "percent" | "flat"; label: string }> = {
    "NIKITA10": { discount: 10, type: "percent", label: "10% off" },
    "NIKITA20": { discount: 20, type: "percent", label: "20% off" },
    "MENTORIA500": { discount: 500, type: "flat", label: "₹500 off" },
    "MENTORIA1000": { discount: 1000, type: "flat", label: "₹1,000 off" },
    "FIRST50": { discount: 50, type: "percent", label: "50% off" },
};

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // GET /api/setup
            if (url.pathname === '/api/setup') {
                await env.DB.prepare(`
                    CREATE TABLE IF NOT EXISTS contacts (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT,
                        email TEXT,
                        phone TEXT,
                        inquiryType TEXT,
                        message TEXT,
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                    );
                `).run();
                await env.DB.prepare(`
                    CREATE TABLE IF NOT EXISTS payments (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        orderId TEXT,
                        paymentId TEXT,
                        signature TEXT,
                        amount REAL,
                        currency TEXT,
                        status TEXT,
                        customerName TEXT,
                        customerEmail TEXT,
                        packageId TEXT,
                        couponCode TEXT,
                        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                    );
                `).run();
                return new Response('Setup Complete', { headers: corsHeaders });
            }

            // GET /api/pricing (Proxy to Sanity)
            if (url.pathname === '/api/pricing') {
                const query = encodeURIComponent(`*[_type == "pricingCategory"] | order(orderId asc) {
                    "id": orderId,
                    name,
                    "packages": *[_type == "pricingPackage" && categoryId == ^.orderId] | order(price asc) {
                        "id": _id,
                        name,
                        price,
                        originalPrice,
                        description,
                        features,
                        highlighted,
                        paymentButtonId
                    }
                }`);
                const customQuery = encodeURIComponent(`*[_type == "customPackage"] | order(orderId asc) {
                    "id": _id,
                    "planId": id,
                    title,
                    description,
                    price
                }`);

                const [res1, res2] = await Promise.all([
                    fetch(`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`, {
                        headers: { 'Authorization': `Bearer ${env.SANITY_TOKEN}` }
                    }),
                    fetch(`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${customQuery}`, {
                        headers: { 'Authorization': `Bearer ${env.SANITY_TOKEN}` }
                    })
                ]);

                const [data1, data2]: [any, any] = await Promise.all([res1.json(), res2.json()]);
                
                return new Response(JSON.stringify({ 
                    categories: data1.result || [], 
                    customPackages: data2.result || [] 
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // GET /api/blogs (Proxy to Sanity)
            if (url.pathname === '/api/blogs') {
                const query = encodeURIComponent(`*[_type == "blog"]`);
                const res = await fetch(`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`, {
                    headers: { 'Authorization': `Bearer ${env.SANITY_TOKEN}` }
                });
                const data: any = await res.json();
                return new Response(JSON.stringify(data.result || []), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // GET /api/reviews (Proxy to Sanity)
            if (url.pathname === '/api/reviews') {
                const query = encodeURIComponent(`*[_type == "review"]`);
                const res = await fetch(`https://${env.SANITY_PROJECT_ID}.api.sanity.io/v1/data/query/production?query=${query}`, {
                    headers: { 'Authorization': `Bearer ${env.SANITY_TOKEN}` }
                });
                const data: any = await res.json();
                return new Response(JSON.stringify(data.result || []), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // GET /api/razorpay/config
            if (url.pathname === '/api/razorpay/config') {
                return new Response(JSON.stringify({ 
                    configured: !!env.RAZORPAY_KEY_ID, 
                    keyId: env.RAZORPAY_KEY_ID 
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // POST /api/contact
            if (request.method === 'POST' && url.pathname === '/api/contact') {
                const data: any = await request.json();
                await env.DB.prepare(
                    `INSERT INTO contacts (name, email, phone, inquiryType, message) VALUES (?, ?, ?, ?, ?)`
                ).bind(data.name, data.email, data.phone, data.inquiryType, data.message).run();
                return new Response(JSON.stringify({ success: true }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // POST /api/razorpay/create-order
            if (request.method === 'POST' && url.pathname === '/api/razorpay/create-order') {
                const data: any = await request.json();
                const auth = btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`);
                
                const response = await fetch('https://api.razorpay.com/v1/orders', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Basic ${auth}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: Math.round(data.amount * 100),
                        currency: 'INR',
                        receipt: `receipt_${Date.now()}`,
                        notes: {
                            packageId: data.packageId,
                            customerName: data.customerName,
                            customerEmail: data.customerEmail,
                            couponCode: data.couponCode || ""
                        }
                    })
                });

                const order: any = await response.json();
                if (order.error) throw new Error(order.error.description);

                return new Response(JSON.stringify({
                    orderId: order.id,
                    amount: order.amount,
                    currency: order.currency,
                    keyId: env.RAZORPAY_KEY_ID,
                    packageName: data.packageId
                }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // POST /api/razorpay/verify-payment
            if (request.method === 'POST' && url.pathname === '/api/razorpay/verify-payment') {
                const data: any = await request.json();
                const body = data.razorpay_order_id + "|" + data.razorpay_payment_id;
                const encoder = new TextEncoder();
                const key = await crypto.subtle.importKey(
                    'raw',
                    encoder.encode(env.RAZORPAY_KEY_SECRET),
                    { name: 'HMAC', hash: 'SHA-256' },
                    false,
                    ['sign']
                );
                const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(body));
                const signatureArray = Array.from(new Uint8Array(signatureBuffer));
                const expectedSignature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

                if (expectedSignature !== data.razorpay_signature) {
                    return new Response(JSON.stringify({ error: 'Invalid signature' }), {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    });
                }

                await env.DB.prepare(
                    `INSERT INTO payments (orderId, paymentId, signature, status) VALUES (?, ?, ?, ?)`
                ).bind(data.razorpay_order_id, data.razorpay_payment_id, data.razorpay_signature, 'verified').run();

                return new Response(JSON.stringify({ success: true }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            return new Response('Not Found', { status: 404, headers: corsHeaders });
        } catch (error: any) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }
    },
};
