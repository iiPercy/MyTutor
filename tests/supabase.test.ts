import { afterEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  browser: vi.fn(() => ({ kind: "browser-test-client" })),
  server: vi.fn(() => ({ kind: "server-test-client" })),
  getAll: vi.fn(() => [{ name: "test-session", value: "fixture" }]),
  set: vi.fn(),
  cookies: vi.fn(),
}));

// Only the framework boundary and SDK are mocked, never a live service.
vi.mock("server-only", () => ({}));
vi.mock("@supabase/ssr", () => ({ createBrowserClient: mocks.browser, createServerClient: mocks.server }));
vi.mock("next/headers", () => ({ cookies: mocks.cookies }));

import { readSupabaseConfiguration, SupabaseConfigurationError } from "@/lib/supabase/config";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function configure(url = "http://127.0.0.1:54321", key = "sb_publishable_test_fixture") {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", url);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", key);
}

function jwt(role: string) {
  return ["fixture", Buffer.from(JSON.stringify({ role })).toString("base64url"), "fixture"].join(".");
}

afterEach(() => vi.unstubAllEnvs());

describe("Configurazione Supabase senza servizi esterni", () => {
  it("importa configurazione e factory senza credenziali né chiamate SDK", async () => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", undefined);
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", undefined);
    vi.resetModules();
    await expect(import("@/lib/supabase/config")).resolves.toBeDefined();
    await expect(import("@/lib/supabase/browser")).resolves.toBeDefined();
    await expect(import("@/lib/supabase/server")).resolves.toBeDefined();
    expect(mocks.browser).not.toHaveBeenCalled();
    expect(mocks.server).not.toHaveBeenCalled();
    expect(mocks.cookies).not.toHaveBeenCalled();
  });

  it("restituisce errori gestibili prima di SDK e contesto cookies se manca la configurazione", async () => {
    configure("", "");
    expect(createBrowserSupabaseClient).toThrow(SupabaseConfigurationError);
    await expect(createServerSupabaseClient()).rejects.toMatchObject({ name: "SupabaseConfigurationError", code: "SUPABASE_CONFIGURATION_INVALID", reason: "missing" });
    expect(mocks.browser).not.toHaveBeenCalled();
    expect(mocks.server).not.toHaveBeenCalled();
    expect(mocks.cookies).not.toHaveBeenCalled();
  });

  it.each(["non-un-url", "ftp://example.invalid", "https://user:password@example.invalid", "INSERIRE_URL_SUPABASE"])("rifiuta URL non validi: %s", (url) => {
    configure(url);
    expect(readSupabaseConfiguration).toThrow(SupabaseConfigurationError);
  });

  it.each(["", "INSERIRE_CHIAVE_PUBBLICA_SUPABASE", "sb_secret_test_fixture", "invalid.jwt.key", jwt("service_role")])("rifiuta chiavi mancanti, segnaposto, malformate o amministrative: %s", (key) => {
    configure(undefined, key);
    expect(createBrowserSupabaseClient).toThrow(SupabaseConfigurationError);
    expect(mocks.browser).not.toHaveBeenCalled();
  });

  it("non include mai valori delle variabili nell'errore", () => {
    configure("https://user:private-value@example.invalid", "sb_secret_sensitive_fixture");
    try {
      readSupabaseConfiguration();
      expect.fail("La configurazione deve essere rifiutata");
    } catch (error) {
      expect(error).toBeInstanceOf(SupabaseConfigurationError);
      expect(String(error)).not.toMatch(/private-value|sensitive_fixture|user:/);
    }
  });

  it("accetta la chiave anon locale e passa la configurazione pubblica al client browser", () => {
    const key = jwt("anon");
    configure(undefined, key);
    expect(createBrowserSupabaseClient()).toEqual({ kind: "browser-test-client" });
    expect(mocks.browser).toHaveBeenCalledWith("http://127.0.0.1:54321", key);
  });

  it("crea un client server per richiesta e collega lettura e scrittura dei cookie", async () => {
    configure();
    mocks.cookies.mockResolvedValue({ getAll: mocks.getAll, set: mocks.set });
    await createServerSupabaseClient();
    expect(mocks.cookies).toHaveBeenCalledOnce();
    expect(mocks.server).toHaveBeenCalledOnce();
    const options = (mocks.server.mock.calls[0] as unknown as [string, string, { cookies: { getAll: () => unknown; setAll: (values: unknown[]) => void } }])[2];
    expect(options.cookies.getAll()).toEqual([{ name: "test-session", value: "fixture" }]);
    options.cookies.setAll([{ name: "test-session", value: "updated-fixture", options: { httpOnly: true } }]);
    expect(mocks.set).toHaveBeenCalledWith("test-session", "updated-fixture", { httpOnly: true });
  });
});
