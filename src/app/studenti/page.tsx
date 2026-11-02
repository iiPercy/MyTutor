import { GraduationCap } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata = { title: "Studenti" };

export default function StudentiPage() {
  return <SectionPage title="Studenti" description="Ogni percorso inizia da una persona." icon={GraduationCap} future="Qui troverai i profili degli studenti e l'accesso alle loro lezioni." pending="I campi del profilo e le modalità di inserimento saranno definiti prima di realizzare la gestione degli studenti." />;
}
