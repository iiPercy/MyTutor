import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type SectionPageProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  future: string;
  pending: string;
};

export function SectionPage({ title, description, icon: Icon, future, pending }: SectionPageProps) {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="eyebrow">Il tuo spazio di lavoro</p>
        <h1 className="page-title">{title}</h1>
        <p className="max-w-2xl text-base leading-7 text-muted-foreground">{description}</p>
      </header>
      <Card className="shadow-none">
        <CardContent className="flex flex-col items-center px-5 py-8 text-center sm:px-10 sm:py-12">
          <div className="mb-6 flex size-16 items-center justify-center rounded-2xl border border-border bg-secondary text-primary">
            <Icon size={28} strokeWidth={1.5} aria-hidden="true" />
          </div>
          <span className="status-label"><Construction size={14} aria-hidden="true" /> Funzionalità non implementata</span>
          <h2 className="mt-5 text-xl font-semibold">Questa sezione prenderà forma nelle prossime fasi.</h2>
          <p className="mt-3 max-w-xl leading-7 text-muted-foreground">{future}</p>
          <p className="mt-5 max-w-xl rounded-lg bg-secondary px-5 py-4 text-sm leading-6 text-muted-foreground">
            Nessun dato è stato letto dal database. Non è ancora disponibile la registrazione o la modifica dei dati.
          </p>
          <Link href="/" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary">
            <ArrowLeft size={16} aria-hidden="true" /> Torna alla panoramica
          </Link>
        </CardContent>
      </Card>
      <div className="border-l-2 border-primary/30 pl-5">
        <h2 className="text-sm font-semibold">Prima di iniziare</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{pending}</p>
      </div>
    </div>
  );
}
