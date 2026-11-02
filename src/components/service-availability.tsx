import "server-only";

import { CircleDashed, Database, Sparkles } from "lucide-react";
import { readSupabaseConfiguration, SupabaseConfigurationError } from "@/lib/supabase/config";

function storageConfigurationLabel() {
  try {
    readSupabaseConfiguration();
    return "Configurazione presente · connessione non verificata";
  } catch (error) {
    if (!(error instanceof SupabaseConfigurationError)) throw error;
    return error.reason === "missing" ? "Configurazione mancante" : "Configurazione da correggere";
  }
}

export function ServiceAvailability() {
  return (
    <section aria-labelledby="disponibilita" className="rounded-xl border border-border bg-card px-6 py-5">
      <h2 id="disponibilita" className="mb-5 flex items-center gap-2 text-sm font-semibold"><CircleDashed size={16} aria-hidden="true" /> Disponibilità dello spazio</h2>
      <dl className="grid gap-6 sm:grid-cols-2">
        <div className="flex gap-3">
          <Database className="mt-0.5 shrink-0 text-muted-foreground" size={18} aria-hidden="true" />
          <div><dt className="text-sm font-medium">Archiviazione</dt><dd className="mt-1 text-xs leading-5 text-muted-foreground">{storageConfigurationLabel()}<br />Lettura e salvataggio non implementati.</dd></div>
        </div>
        <div className="flex gap-3">
          <Sparkles className="mt-0.5 shrink-0 text-muted-foreground" size={18} aria-hidden="true" />
          <div><dt className="text-sm font-medium">Assistente AI</dt><dd className="mt-1 text-xs leading-5 text-muted-foreground">Non implementato<br />Nessuna richiesta viene inviata a un provider.</dd></div>
        </div>
      </dl>
    </section>
  );
}
