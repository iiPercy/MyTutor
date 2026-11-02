import { expect, it, vi } from "vitest";

// Next.js enforces this marker at build time. It is not a runtime module in tests.
vi.mock("server-only", () => ({}));

it("importa le factory reali senza configurazione e senza traffico di rete", async () => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", undefined);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", undefined);
  const fetch = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network forbidden in this test"));
  const configuration = await import("@/lib/supabase/config");
  const browser = await import("@/lib/supabase/browser");
  const server = await import("@/lib/supabase/server");

  expect(browser.createBrowserSupabaseClient).toThrow(configuration.SupabaseConfigurationError);
  await expect(server.createServerSupabaseClient()).rejects.toBeInstanceOf(configuration.SupabaseConfigurationError);
  expect(fetch).not.toHaveBeenCalled();
});
