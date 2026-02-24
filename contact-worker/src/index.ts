export interface Env {
    DB: D1Database;
}

export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        if (request.method === 'GET') {
            try {
                const url = new URL(request.url);
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
                    return new Response('Setup Complete', { headers: corsHeaders });
                }
            } catch (e: any) {
                return new Response(e.message, { status: 500, headers: corsHeaders });
            }
        }

        if (request.method === 'POST') {
            try {
                const url = new URL(request.url);
                if (url.pathname !== '/api/contact') {
                    return new Response('Not Found', { status: 404, headers: corsHeaders });
                }

                const data: any = await request.json();

                const { success } = await env.DB.prepare(
                    `INSERT INTO contacts (name, email, phone, inquiryType, message) VALUES (?, ?, ?, ?, ?)`
                ).bind(data.name, data.email, data.phone, data.inquiryType, data.message).run();

                if (success) {
                    return new Response(JSON.stringify({ success: true }), {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    });
                }

                throw new Error('Database insert failed');
            } catch (error: any) {
                return new Response(JSON.stringify({ error: error.message }), {
                    status: 500,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }
        }

        return new Response('Method Not Allowed', { status: 405, headers: corsHeaders });
    }
};
