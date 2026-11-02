"use client";

import { createBrowserClient } from "@supabase/ssr";
import { readSupabaseConfiguration } from "./config";

export function createBrowserSupabaseClient() {
  const { url, publishableKey } = readSupabaseConfiguration();
  return createBrowserClient(url, publishableKey);
}
