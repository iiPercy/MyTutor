import "server-only";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { readSupabaseConfiguration } from "./config";

export async function createServerSupabaseClient() {
  // Validate first: an absent configuration must not require a request context.
  const { url, publishableKey } = readSupabaseConfiguration();
  const cookieStore = await cookies();

  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot write cookies. The future authentication
          // phase must add session refresh in Proxy before using protected data.
        }
      },
    },
  });
}
