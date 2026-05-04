import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { MOCK_USER, MOCK_REVIEWS, MOCK_BLOGS } from "./mockData";
import { sanityClient } from "./sanity";

const RAZORPAY_WORKER_URL = "https://nikitaporwal-worker.gauravgoodreads.workers.dev";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.log(`[API] ${method} ${url}`, data);

  // Route Razorpay API calls to the Cloudflare Worker
  if (url === "/api/razorpay/create-order") {
    const res = await fetch(`${RAZORPAY_WORKER_URL}/api/razorpay/create-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await throwIfResNotOk(res);
    return res;
  }

  if (url === "/api/razorpay/verify-payment") {
    const res = await fetch(`${RAZORPAY_WORKER_URL}/api/razorpay/verify-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    await throwIfResNotOk(res);
    return res;
  }

  return new Response(JSON.stringify({}), { status: 200 });
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
    async ({ queryKey }) => {
      const url = queryKey.join("/");
      console.log(`[API] GET ${url}`);

      if (url === "/api/razorpay/config") {
        try {
          const res = await fetch(`${RAZORPAY_WORKER_URL}/api/razorpay/config`);
          return await res.json();
        } catch (err) {
          console.error("Failed to fetch Razorpay config", err);
          return { configured: false, keyId: null };
        }
      }

      if (url === "/api/user") return MOCK_USER as any;

      if (url === "/api/admin/reviews") {
        try {
          const response = await fetch(`${RAZORPAY_WORKER_URL}/api/reviews`);
          return response.ok ? await response.json() : [];
        } catch (err) {
          console.error("Worker reviews fetch failed", err);
          return [];
        }
      }

      if (url === "/api/admin/blogs") {
        try {
          const response = await fetch(`${RAZORPAY_WORKER_URL}/api/blogs`);
          return response.ok ? await response.json() : [];
        } catch (err) {
          console.error("Worker blogs fetch failed", err);
          return [];
        }
      }

      return null;
    };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
