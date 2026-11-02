import { Compass } from "lucide-react";
import { SectionPage } from "@/components/section-page";

export const metadata = { title: "Preparazione" };

export default function PreparazionePage() {
  return <SectionPage title="Preparazione" description="La prossima lezione parte dal percorso già fatto." icon={Compass} future="Qui potrai indicare argomento, durata e obiettivo per richiedere una proposta basata sullo storico confermato dello studente." pending="Struttura della proposta e storico utilizzabile devono essere chiariti. Non sono ancora presenti un modulo di richiesta o collegamenti a servizi AI." />;
}
