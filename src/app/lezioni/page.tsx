import { BookOpen } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata = { title: "Lezioni" };

export default function LezioniPage() {
  return <SectionPage title="Lezioni" description="Uno spazio per ricordare ciò che conta, lezione dopo lezione." icon={BookOpen} future="Qui potrai consultare le lezioni e registrare gli appunti originali, distinti dai riepiloghi proposti dall'AI." pending="La gestione delle date e delle correzioni deve essere chiarita prima di implementare lo storico. Salvataggio e proposte AI non sono ancora disponibili." />;
}
