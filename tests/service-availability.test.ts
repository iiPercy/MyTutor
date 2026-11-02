import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { ServiceAvailability } from "@/components/service-availability";

it.each([
  [undefined, undefined, "Configurazione mancante"],
  ["INSERIRE_URL_SUPABASE", "INSERIRE_CHIAVE_PUBBLICA_SUPABASE", "Configurazione da correggere"],
  ["http://127.0.0.1:54321", "sb_publishable_test_fixture", "Configurazione presente · connessione non verificata"],
])("distingue lo stato di configurazione senza simulare una connessione: %s", (url, key, label) => {
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", url);
  vi.stubEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY", key);
  const fetch = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("Network forbidden in this test"));

  const html = renderToStaticMarkup(createElement(ServiceAvailability));

  expect(html).toContain(label);
  expect(html).toContain("Lettura e salvataggio non implementati.");
  expect(html).toContain("Nessuna richiesta viene inviata a un provider.");
  expect(fetch).not.toHaveBeenCalled();
});
