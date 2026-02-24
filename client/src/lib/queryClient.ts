import { QueryClient, QueryFunction } from "@tanstack/react-query";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

import { MOCK_RAZORPAY_CONFIG, MOCK_USER, MOCK_REVIEWS, MOCK_BLOGS } from "./mockData";
import { sanityClient } from "./sanity";

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  console.log(`[MOCK] ${method} ${url}`, data);

  // Mock API responses
  if (url === "/api/razorpay/create-order") {
    return new Response(JSON.stringify({ error: "Payment system not available in static mode" }), { status: 400 });
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
      console.log(`[MOCK] GET ${url}`);

      if (url === "/api/razorpay/config") return MOCK_RAZORPAY_CONFIG as any;
      if (url === "/api/user") return MOCK_USER as any; // Simulate logged out

      if (url === "/api/admin/reviews") {
        try {
          const reviews = await sanityClient.fetch(`*[_type == "review"]`);
          return reviews;
        } catch (err) {
          console.error("Sanity reviews fetch failed", err);
          return [];
        }
      }

      if (url === "/api/admin/blogs") {
        try {
          const blogs = await sanityClient.fetch(`*[_type == "blog"]`);
          return blogs;
        } catch (err) {
          console.error("Sanity blogs fetch failed", err);
          return [];
        }
      }

      // Default empty response
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
