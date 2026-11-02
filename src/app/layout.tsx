import type { Metadata } from "next";
import Link from "next/link";
import { Sigma } from "lucide-react";
import { Navigation } from "@/components/navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Panoramica · Ripetizioni", template: "%s · Ripetizioni" },
  description: "Lo spazio personale per le ripetizioni di matematica. Struttura iniziale del progetto.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        <a href="#contenuto" className="skip-link">Vai al contenuto</a>
        <div className="min-h-screen lg:grid lg:grid-cols-[240px_minmax(0,1fr)]">
          <aside className="border-b border-border bg-card lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-b-0 lg:p-6">
            <Link href="/" aria-label="Ripetizioni, panoramica" className="m-4 flex w-fit items-center gap-3 rounded-lg lg:m-0 lg:mb-12">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Sigma size={23} aria-hidden="true" /></span>
              <span><span className="block text-lg font-semibold tracking-tight">Ripetizioni</span><span className="block text-xs text-muted-foreground">Spazio del tutor</span></span>
            </Link>
            <p className="eyebrow mb-3 hidden px-3 lg:block">Il tuo percorso</p>
            <Navigation />
            <div className="mt-auto hidden border-t border-border pt-6 lg:block">
              <p className="text-sm font-medium">Un passo alla volta.</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Uno spazio per accompagnare ogni studente nel suo percorso.</p>
              <span className="mt-5 inline-block rounded-md border border-border px-2 py-1 text-[11px] font-medium text-muted-foreground">FASE 1 · STRUTTURA INIZIALE</span>
            </div>
          </aside>
          <div className="min-w-0">
            <div className="flex min-h-16 flex-wrap items-center justify-between gap-2 border-b border-border bg-card/60 px-5 py-3 sm:px-10">
              <span className="text-sm font-medium">Quaderno di matematica</span>
              <span className="inline-flex items-center gap-2 text-xs text-muted-foreground"><span aria-hidden="true" className="size-1.5 rounded-full bg-amber-600" />Struttura iniziale · nessun dato collegato</span>
            </div>
            <main id="contenuto" tabIndex={-1} className="mx-auto max-w-6xl px-5 py-8 outline-none sm:px-10 sm:py-12">{children}</main>
            <footer className="mx-auto max-w-6xl px-5 pb-8 text-xs leading-5 text-muted-foreground sm:px-10">
              Versione di sviluppo. Accesso riservato e isolamento dei dati non ancora implementati.
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}
