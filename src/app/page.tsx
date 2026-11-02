import Link from "next/link";
import { ArrowRight, BookOpen, Compass, GraduationCap, Shapes } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ServiceAvailability } from "@/components/service-availability";

const sections = [
  { href: "/studenti", title: "Studenti", description: "I profili e il percorso di ogni studente, in un unico spazio.", icon: GraduationCap },
  { href: "/lezioni", title: "Lezioni", description: "Gli appunti originali e, in seguito, i riepiloghi da rivedere.", icon: BookOpen },
  { href: "/competenze", title: "Competenze", description: "Le osservazioni confermate e le evidenze che le sostengono.", icon: Shapes },
  { href: "/preparazione", title: "Preparazione", description: "Il punto di partenza per progettare la prossima lezione.", icon: Compass },
] as const;

export default function HomePage() {
  return (
    <div className="space-y-9">
      <header className="space-y-3">
        <p className="eyebrow">Benvenuto nel tuo quaderno</p>
        <h1 className="page-title">Panoramica</h1>
        <p className="text-base leading-7 text-muted-foreground">Il tuo spazio per seguire le ripetizioni, con cura e continuità.</p>
      </header>
      <section aria-labelledby="benvenuto" className="relative overflow-hidden rounded-2xl border border-[#d4e0d5] bg-[#e8efe4] p-7 sm:p-9">
        <span className="eyebrow text-primary">Le basi di un nuovo percorso</span>
        <h2 id="benvenuto" className="mt-4 max-w-lg font-serif text-3xl leading-tight tracking-tight sm:text-4xl">Ogni lezione è un passo.<br /><span className="text-primary">Qui troverà il suo filo.</span></h2>
        <p className="mt-5 max-w-xl text-sm leading-6 text-muted-foreground">La struttura iniziale è pronta da esplorare. Le sezioni sono navigabili; la gestione degli studenti, gli appunti e le proposte AI arriveranno nelle prossime fasi.</p>
        <p className="mt-6 inline-flex rounded-md border border-primary/20 bg-white/60 px-3 py-1.5 text-xs font-medium text-primary">Fase 1 · navigazione disponibile</p>
      </section>
      <section aria-labelledby="sezioni">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 id="sezioni" className="text-base font-semibold">Esplora lo spazio</h2>
          <p className="text-xs text-muted-foreground">Quattro sezioni, un percorso</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {sections.map(({ href, title, description, icon: Icon }) => (
            <Link href={href} key={href} className="group rounded-xl">
              <Card className="h-full gap-4 shadow-none transition-colors group-hover:border-primary/50 group-hover:bg-secondary/40">
                <CardHeader>
                  <div className="mb-3 flex items-center justify-between">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
                    <ArrowRight size={18} className="text-muted-foreground transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="mb-5 text-sm leading-6 text-muted-foreground">{description}</p>
                  <span className="status-label">Funzionalità non implementata</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
      <ServiceAvailability />
    </div>
  );
}
