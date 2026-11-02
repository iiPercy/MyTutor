import { z } from "zod";

function isPublicKey(value: string): boolean {
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(value)) return true;

  // The local CLI can provide a legacy anon JWT. Never accept service_role.
  const parts = value.split(".");
  if (parts.length !== 3 || !parts.every((part) => /^[A-Za-z0-9_-]+$/.test(part))) return false;
  try {
    const payload: unknown = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return typeof payload === "object" && payload !== null && "role" in payload && payload.role === "anon";
  } catch {
    return false;
  }
}

const configurationSchema = z.object({
  url: z.url().refine((value) => {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol) && !url.username && !url.password && !url.search && !url.hash;
    } catch {
      return false;
    }
  }),
  publishableKey: z.string().refine(isPublicKey),
});

export class SupabaseConfigurationError extends Error {
  readonly code = "SUPABASE_CONFIGURATION_INVALID";

  constructor(readonly reason: "missing" | "invalid") {
    super("Configurazione Supabase assente o non valida. Controllare NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
    this.name = "SupabaseConfigurationError";
  }
}

// Read only public variables, only when called. Direct property access allows
// Next.js to include these two public values in the browser bundle.
export function readSupabaseConfiguration() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url?.trim() || !publishableKey?.trim()) throw new SupabaseConfigurationError("missing");

  const result = configurationSchema.safeParse({ url, publishableKey });
  // Do not propagate Zod details: they may contain configuration values.
  if (!result.success) throw new SupabaseConfigurationError("invalid");
  return result.data;
}
