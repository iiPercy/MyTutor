import { Shapes } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata = { title: "Competenze" };

export default function CompetenzePage() {
  return <SectionPage title="Competenze" description="Osservare il percorso, senza ridurlo a un punteggio." icon={Shapes} future="Qui troverai le osservazioni confermate collegate alle competenze e alle lezioni. Affrontare un argomento non significa averlo acquisito." pending="Catalogo delle competenze e regola di derivazione dello stato attuale sono ancora da definire. Nessuno stato viene calcolato in questa versione." />;
}
