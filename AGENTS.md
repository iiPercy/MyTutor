# Istruzioni operative per gli agenti

## Inizio di ogni fase

1. Leggere integralmente [requirements.md](requirements.md) e [docs/progress.md](docs/progress.md), oltre alle istruzioni applicabili alla parte interessata.
2. Esaminare codice, configurazione e stato Git prima di modificare file. Se manca un repository Git, dichiararlo; non inizializzarlo implicitamente durante una fase documentale.
3. Individuare modifiche preesistenti e preservare il lavoro estraneo alla richiesta.
4. Collegare il compito agli identificativi dei requisiti e verificare le questioni aperte pertinenti.
5. Comunicare brevemente obiettivo, approccio e verifiche previste, in italiano.

Implementare soltanto la fase richiesta. Non avviare automaticamente la successiva né anticipare funzionalità future. Per scelte reversibili interne al perimetro autorizzato, procedere senza conferme ripetute.

Se la richiesta contraddice requisiti o vincoli, segnalare il conflitto e chiedere chiarimento prima di implementare la parte coinvolta. Chiarire anche decisioni mancanti che cambiano prodotto, storico, stato delle competenze, costi o gestione dei dati. Proseguire intanto con le attività indipendenti.

## Ruolo dei documenti

- Questo file contiene istruzioni operative, vincoli tecnici e riferimenti.
- [requirements.md](requirements.md) è la fonte dei requisiti di prodotto, delle regole di dominio, dei criteri di accettazione e delle questioni aperte. Gli identificativi restano stabili; non riutilizzare quelli ritirati per requisiti diversi.
- `README.md`, quando previsto da una fase di implementazione, deve descrivere configurazione, avvio, comandi e uso effettivamente disponibili.
- [docs/progress.md](docs/progress.md) registra fasi, requisiti interessati, decisioni, verifiche, limiti e passi successivi.

Usare riferimenti invece di duplicare intere sezioni. Non cambiare requisiti o criteri per adeguarli a un'implementazione incompleta. Una proposta resta tale fino ad approvazione esplicita; le questioni aperte non sono decisioni approvate.

## Stack e vincoli di implementazione

- Un solo repository, Next.js con App Router e backend incluso, TypeScript in modalità strict.
- Tailwind CSS e shadcn/ui per l'interfaccia.
- PostgreSQL e autenticazione su Supabase; Supabase CLI e migrazioni SQL versionate, senza ORM iniziale.
- Groq come provider AI iniziale, con integrazione esclusivamente lato server; Zod per validare input e output strutturati AI.
- Deployment previsto su Vercel; nessun deployment implicito.
- Usare versioni stabili e compatibili. Mantenere il package manager esistente; in un progetto nuovo sceglierne uno e mantenere un solo lockfile. Non aggiornare dipendenze estranee alla fase.

Separare interfaccia, dominio, accesso ai dati e integrazione AI. Rendere testabili le regole importanti tramite funzioni o servizi, evitando astrazioni speculative. Isolare il provider AI per consentirne una futura sostituzione, senza implementare ora provider multipli o infrastrutture per modelli locali.

Consultare la documentazione ufficiale quando si introduce o modifica un'integrazione e quando si hanno dubbi sulle API. Registrare le fonti rilevanti e ciò che è stato verificato in `docs/progress.md`. Se la consultazione non è possibile, dichiararlo e non presentare scelte basate sulla memoria come verificate.

All'integrazione Groq verificare modello effettivamente disponibile e supporto agli output strutturati per quel modello. La compatibilità con un SDK non prova il supporto di tutte le funzionalità di un altro provider. Gestire lato server validazione, errori, output non validi, timeout e limiti del servizio. I test ripetibili non devono dipendere da risposte live dell'AI.

## Dati e sicurezza

Applicare i requisiti di isolamento, riservatezza e indipendenza dall'AI di [requirements.md](requirements.md), in particolare `MVP-01`, `MVP-10` e `NFR-03`–`NFR-06`.

- Usare il client Supabase con la sessione utente nelle operazioni ordinarie e applicare Row Level Security. Non affidare l'isolamento alla sola interfaccia e non usare chiavi amministrative nei flussi ordinari.
- Conservare segreti e chiavi AI sul server; non inserirli in repository, log o riepiloghi. Quando si prepara la configurazione, documentare le variabili necessarie in `.env.example` con segnaposto.
- Minimizzare i dati inviati al provider AI, escludendo identificativi personali non necessari. Usare dati fittizi per sviluppo e test.
- Se mancano credenziali o servizi, preparare configurazione e istruzioni e indicare le verifiche mancanti. Non inventare credenziali né sostituire silenziosamente un servizio con dati simulati.
- Mock e fixture sono ammessi nei test o in modalità dimostrative esplicitamente identificate.

Non eliminare dati, riscrivere la storia Git, applicare migrazioni a database remoti, effettuare push o deployment senza richiesta esplicita. Non attivare servizi o fallback a pagamento senza richiesta esplicita.

## Verifica e consegna

Eseguire verifiche proporzionate: typecheck, lint, test significativi e build quando pertinenti. Dare priorità a regole di dominio, isolamento dei dati e passaggio da bozza AI a storico confermato. Non indebolire controlli o criteri di accettazione per far risultare conclusa una fase.

Aggiornare i documenti solo quando cambia il loro contenuto effettivo. Nel registro di avanzamento e nella consegna distinguere verifiche eseguite con esito, verifiche non eseguite con motivo e prove manuali ancora necessarie. Non dichiarare verificati servizi o integrazioni non provati.

La consegna di ogni fase deve riportare:

1. Comportamenti implementati e requisiti interessati.
2. Decisioni tecniche rilevanti e assunzioni, spiegate brevemente per la revisione.
3. Verifiche eseguite ed esiti.
4. Limiti e parti bloccate.
5. Procedura breve per provare la fase e risultati attesi.

## Stato iniziale

La fase 0 autorizza soltanto analisi in sola lettura e preparazione di questo file, `requirements.md` e `docs/progress.md`. Non autorizza funzionalità, inizializzazione del framework, installazioni o modifiche a servizi esterni. Lo stato effettivo e l'esito della fase sono in [docs/progress.md](docs/progress.md).
