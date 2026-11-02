# Registro di avanzamento

## Stato del progetto

Fase 0 documentale completata. **Fase 1: implementazione e verifica dello scheletro completate**, il **2 novembre 2026**. Lo scheletro si avvia senza credenziali; lint, typecheck, 18 test e build passano. Il tutor ha confermato il superamento delle prove manuali di apertura delle quattro sezioni, impaginazione a finestra stretta e navigazione da tastiera con focus visibile. Supabase locale resta non avviato e non verificato, come prova separata e opzionale. Nessun requisito funzionale MVP è dichiarato soddisfatto sulla base dello scheletro.

I requisiti e i loro identificativi sono in [requirements.md](../requirements.md); le istruzioni per gli agenti sono in [AGENTS.md](../AGENTS.md).

## Fase 0 — Analisi iniziale e documentazione

### Perimetro autorizzato ed esito

Analisi in sola lettura della cartella e dell'ambiente, seguita dalla creazione dei soli tre documenti autorizzati:

- `AGENTS.md`: metodo operativo, vincoli tecnici, verifiche e riferimenti; richiede di leggere requisiti e registro all'inizio di ogni nuova fase.
- `requirements.md`: requisiti con identificativi stabili, criteri MVP, dominio, requisiti non funzionali, esclusioni e questioni aperte. Want to have e proposte aggiuntive risultano vuoti perché non richiesti.
- `docs/progress.md`: stato effettivo, evidenze e limiti della fase.

Requisiti interessati: censimento documentale di `MVP-01`–`MVP-10`, `DOM-01`–`DOM-11`, `NFR-01`–`NFR-10`, `EXC-01`–`EXC-09`; nessuna implementazione. Questioni registrate: `Q-01`–`Q-09`.

### Ambiente rilevato

| Voce | Evidenza |
| --- | --- |
| Cartella di lavoro | `C:\Users\Davide\Desktop\uNI\A_Projects\Ripetizioni` |
| Stato iniziale | Cartella vuota: zero elementi, inclusi quelli nascosti. Nessun codice, documento, manifest o lockfile preesistente. |
| Git | Comando disponibile, versione `2.55.0.windows.3`. La cartella non appartiene a un repository Git: `git status --short` e `git rev-parse --show-toplevel` restituiscono «not a git repository». Non esistono quindi modifiche Git preesistenti da confrontare. |
| Shell | Windows PowerShell `5.1.26100.9711`. |
| Ricerca file | ripgrep `15.2.0` disponibile. |
| Runtime e package manager | `node`, `npm`, `pnpm`, `yarn`, `bun` non risolti da `Get-Command` nel PATH corrente. Questo non dimostra l'assenza di installazioni altrove. |
| Servizi locali | `supabase` e `docker` non risolti da `Get-Command` nel PATH corrente. Nessuna verifica di servizi in esecuzione o installazioni fuori PATH. |
| Istruzioni preesistenti | Nessun `AGENTS.md` trovato nella cartella iniziale o nei percorsi antenati controllati fino a `C:\`. |

### Decisioni e assunzioni

- Nessuna regola di prodotto aggiuntiva è stata scelta. I vincoli confermati sono distinti dalle domande aperte.
- Nessun package manager, versione di framework, modello Groq o schema database è stato selezionato nella fase 0.
- Lo stack richiesto è registrato come vincolo per le prossime fasi, senza dichiarare verificate compatibilità o API non ancora integrate.
- `README.md` e `.env.example` non sono stati creati: non rientrano nei file autorizzati e non esiste ancora una configurazione applicativa da documentare.
- Le esclusioni dall'MVP non sono state trasformate in funzionalità future approvate.
- La sequenza delle fasi di implementazione non viene decisa qui.

### Verifiche eseguite ed esiti

- Ispezione della cartella con elementi nascosti: vuota prima delle modifiche.
- Ispezione Git: repository assente; esito registrato come limite, senza inizializzazione.
- Ricerca delle istruzioni applicabili nei percorsi locali: nessun file preesistente trovato.
- Individuazione dei comandi e lettura delle versioni disponibili: risultati riportati nella tabella ambiente.
- Controllo documentale: identificativi univoci nelle rispettive definizioni, riferimenti a requisiti e questioni esistenti, collegamenti locali risolvibili e presenza dei soli tre file autorizzati.
- Revisione di coerenza: nessuna funzionalità dichiarata implementata; nessuna proposta marcata come confermata; tracciabilità, conferma esplicita, isolamento e ordinamento per data della lezione coerenti fra i documenti. I dettagli non definiti rimangono questioni aperte.

### Verifiche non eseguite e limiti

- Typecheck, lint, test applicativi e build non eseguiti: non esistono applicazione, manifest o dipendenze e la fase vieta di inizializzarli.
- Autenticazione, database, RLS, migrazioni, Groq e Vercel non configurati né verificati. Non sono state cercate o usate credenziali.
- Documentazione ufficiale delle integrazioni non consultata: nessuna integrazione introdotta o modificata e nessuna scelta di API effettuata. La consultazione resta necessaria nelle fasi pertinenti.
- Nessuna verifica funzionale manuale è possibile in questa fase. Nessun servizio esterno modificato, nessuna installazione, migrazione remota, push o deployment eseguiti.

### Decisioni ancora aperte e dipendenze

Consultare il testo completo di `Q-01`–`Q-09` in [requirements.md](../requirements.md). Le dipendenze più vicine all'avvio sono:

- Accesso e sessione: `Q-01`, prima dell'autenticazione.
- Profili e dati di lezione: `Q-02`, aspetti temporali di `Q-04` e modificabilità in `Q-05`, prima degli schemi pertinenti.
- Competenze e stato attuale: `Q-03` e `Q-04`, prima di catalogo e calcolo.
- Bozze, revisioni e contesto AI: `Q-05`, `Q-06`, `Q-07`, prima della relativa persistenza e integrazione.
- Preparazione e conservazione: `Q-08`, `Q-09`, prima dei comportamenti interessati.

Queste domande non bloccano il lavoro indipendente che sarà autorizzato, ma le relative regole non possono essere dedotte autonomamente.

### Procedura di revisione della fase 0

1. Aprire `AGENTS.md` e seguire i collegamenti ai due documenti: devono risolversi e mantenere distinta la funzione di ciascun file.
2. Leggere i requisiti MVP e le questioni collegate: devono distinguere vincoli già confermati e dettagli ancora da chiarire, senza presentare funzionalità disponibili.
3. Controllare la cartella: devono essere presenti soltanto i tre file documentali, senza framework, dipendenze o configurazioni di servizi.

Passo successivo registrato alla chiusura della fase 0: attendere il prompt del tutor per la prima fase di implementazione; chiarire soltanto le questioni da cui dipenderà quella fase.

## Fase 1 — Struttura iniziale del progetto

### Perimetro ed esito

Implementata nella radice una sola applicazione Next.js con App Router, TypeScript strict, Tailwind CSS e componente Card shadcn/ui. Panoramica, Studenti, Lezioni, Competenze e Preparazione sono raggiungibili; tutti i collegamenti presenti hanno una destinazione effettiva. Le pagine dichiarano le funzioni non implementate e non rappresentano dati vuoti come risultati di query mai eseguite.

Predisposte factory Supabase browser/server con validazione differita della configurazione e un errore esplicito senza valori delle variabili. Nessun client creato dalle pagine e nessuna chiamata dati o AI durante il rendering. La panoramica distingue configurazione mancante, da correggere e presente ma non verificata. Aggiunti configurazione locale Supabase, `.env.example`, esclusioni Git, comandi di verifica, README e [architettura](architecture.md).

Requisiti interessati: base tecnica per `NFR-01`, `NFR-02`, `NFR-04`, `NFR-07`, `NFR-08`, `NFR-09`, con verifiche secondo `NFR-10`. La configurazione usa Zod, ma **non** realizza ancora l'integrazione AI di `NFR-06`. Le predisposizioni per `MVP-01` non costituiscono autenticazione o isolamento implementati. Nessun `MVP-01`–`MVP-10` è dichiarato completato.

### Ambiente e preservazione del lavoro esistente

- Rispetto alla fase 0, ora il repository Git esiste: commit iniziale `d8d0a86`; al primo controllo di fase 1 la working tree era pulita e conteneva i tre documenti della fase 0.
- Ambiente effettivo: Windows PowerShell 5.1, Node.js `26.13.0`, npm `11.20.0`, entrambi accessibili dal PATH e presenti in `C:\Program Files\nodejs`. Nessun ambiente Linux/WSL usato.
- `pnpm`, `yarn`, `bun`, `supabase` globale e `docker` non erano accessibili dal PATH. Docker non trovato neppure nei due percorsi standard controllati sotto `C:\Program Files\Docker\Docker`; questo non prova l'assenza di installazioni altrove.
- Installata la CLI Supabase soltanto come dipendenza di sviluppo npm. Nessun software di sistema installato, nessuna modifica a PATH o policy PowerShell.
- npm inizialmente bloccato dal sandbox nell'accesso alla cache utente; installazione e consultazione del registro riuscite tramite l'escalation prevista. Anche `supabase init` ha richiesto escalation per la propria cartella utente. Non è stato aggirato il controllo con runtime alternativi.
- Inizializzazione Next.js manuale secondo la guida ufficiale: nessun generatore eseguito su una seconda cartella e nessun documento spostato o cancellato.
- `next dev` ha aggiunto temporaneamente un blocco gestito ad `AGENTS.md`. Impostato `agentRules: false` secondo la documentazione distribuita nel pacchetto Next.js; al riavvio il blocco è stato rimosso dal framework. Hash SHA-256 finali di `AGENTS.md` e `requirements.md` identici a quelli iniziali, nessuna modifica semantica o testuale residua.

### Decisioni tecniche

- npm come richiesto per il repository senza package manager; un solo `package-lock.json`, dipendenze dirette a versioni esatte. Versioni principali: Next.js `16.4.4`, React/React DOM `19.3.1`, TypeScript `6.0.3`, Tailwind CSS `4.3.3`, `@supabase/ssr` `0.12.7`, `@supabase/supabase-js` `2.118.0`, Zod `4.6.7`, Vitest `5.0.5`, CLI Supabase `2.122.0`. Versioni risolte controllate tramite registro npm e pacchetti installati; dettagli riproducibili nel lockfile.
- ESLint `9.39.5` con `eslint-config-next` `16.4.4`: la versione 9 è deprecata, ma è compatibile con i peer dichiarati dai plugin React, import e accessibilità inclusi nella configurazione Next, che non ammettono ESLint 10. Non sono stati forzati peer incompatibili o indebolite le regole lint. Il limite di manutenzione è registrato sotto.
- Server Components per pagine e layout; Client Component soltanto per la navigazione che usa il pathname. Il modulo Supabase server è protetto da `server-only`; la configurazione condivisa legge esclusivamente valori pubblici.
- Validazione configurazione alla chiamata della factory, senza inizializzazione a livello modulo. Ammesse chiavi publishable o legacy `anon` locali, respinte chiavi amministrative note. Validazione sintattica distinta dalla verifica di connessione e autorizzazione.
- Factory server con cookie per richiesta secondo il pattern SSR; rinnovo sessione nel Proxy e verifica identità rinviati alla fase Auth, dipendente da `Q-01`.
- Tema sobrio, font di sistema senza download e sole parti Card utilizzate dal registry shadcn/ui. Nessun SDK AI, modello Groq, contenuto fittizio o funzione di dominio introdotto.
- Configurazione locale generata dalla CLI; seed disattivati e nessuna chiave per l'assistente OpenAI di Studio. Gli altri default generati per i servizi locali non approvano regole Auth di prodotto. Nessuna migrazione applicativa, seed, tabella o policy RLS.

### Verifiche eseguite ed esiti

| Controllo | Esito |
| --- | --- |
| `npm.cmd run lint` | Superato, zero errori e zero avvisi con `--max-warnings=0`. |
| `npm.cmd run typecheck` | Superato, tipi delle rotte generati e TypeScript strict. |
| `npm.cmd test` | Superato: 18 test in 3 file, senza servizi esterni. |
| `npm.cmd run build` | Superato con configurazione finale; 5 pagine applicative prerenderizzate, nessuna credenziale necessaria. |
| `npm.cmd run dev -- --hostname 127.0.0.1` | Avviato su `127.0.0.1:3000`; tutte le cinque rotte rispondono HTTP 200. Verificati nei documenti HTML lingua, titoli, collegamenti alle sezioni, `aria-current` e messaggi di stato. |
| `npm.cmd start -- --hostname 127.0.0.1` | Avvio della build finale riuscito; HTTP 200 su tutte le cinque rotte, messaggi di stato attesi e 9 riferimenti ad asset CSS/JS raggiungibili. |
| Assenza credenziali | Verificata la sola presenza/assenza, senza stampare valori: nessuna variabile Supabase/Groq richiesta presente nel processo e nessun file `.env*` oltre a `.env.example`. Panoramica con «Configurazione mancante». |
| `npm.cmd exec --no -- supabase init` | Configurazione locale generata con successo; nessun servizio avviato. |
| `npm.cmd ls --depth=0` | Dipendenze dirette risolte senza errori. |
| `npm.cmd audit --omit=dev --json` | Zero vulnerabilità segnalate nelle dipendenze di produzione al momento del controllo. |
| `npm.cmd audit --json` | Esito negativo: 16 segnalazioni moderate nel tooling di sviluppo, ricondotte a minimatch e dipendenze ESLint; nessuna alta o critica. Nessun `audit fix --force` applicato. |
| Git e file | `git diff --check` superato; `AGENTS.md` e `requirements.md` invariati, un solo lockfile npm; esclusioni di segreti e output generati controllate con `git check-ignore`. Revisione anche dei file nuovi, che non compaiono nel normale diff dei file tracciati. |

I test verificano importazione delle factory reali senza credenziali o rete, errori gestibili prima di SDK e cookie, URL e chiavi non validi, assenza di valori nell'errore, compatibilità della chiave anon locale, collegamento dei cookie tramite SDK simulato e i tre stati di configurazione dell'interfaccia. Un primo passaggio aveva rilevato un avviso lint e due test negativi: corretti il default export PostCSS e la gestione degli URL malformati, quindi rieseguita con successo la sequenza finale completa.

I controlli HTTP riguardano contenuto e raggiungibilità, **non** costituiscono navigazione interattiva o verifica della resa visiva. I server Next.js avviati per le prove sono stati arrestati; nessun container Supabase è stato avviato.

### Verifiche manuali eseguite dal tutor

Il **2 novembre 2026** il tutor ha comunicato che tutte le seguenti prove sono **superate**:

1. Apertura delle quattro sezioni tramite clic.
2. Uso a finestra stretta, senza contenuti tagliati né scorrimento orizzontale indesiderato.
3. Navigazione con `Tab` e attivazione dei collegamenti con `Invio`, con focus visibile.

Gli esiti sono attribuiti al tutor, non a una sessione browser dell'agente. Non sono state comunicate dimensioni della finestra o versione del browser: non si dichiarano provate le specifiche viewport suggerite nel README. Non è stato comunicato un controllo DevTools/Network.

### Verifiche non eseguite, limiti e attività residue

- **Browser dell'agente non disponibile:** l'inventario CUA aveva restituito «The browser access host is unavailable» e helper nativo non disponibile. L'agente non ha svolto controlli visivi; le successive prove manuali del tutor sopra riportate completano la verifica richiesta dello scheletro. Restano non documentati un controllo DevTools/Network e prove alle dimensioni esatte suggerite nel README; non sono presentati come eseguiti.
- **Supabase locale:** Docker non accessibile, stack non avviato e connessione non provata. Configurazione preparata, senza dichiarare operativo il backend. Questa verifica è opzionale per la fase 1.
- **Tooling:** ESLint 9 deprecato e 16 segnalazioni moderate nel grafo di sviluppo. Occorrerà rivalutare le versioni compatibili quando l'ecosistema Next/ESLint consentirà di correggerle senza forzature. Nessuna garanzia di assenza generale di vulnerabilità deriva dal solo audit.
- Autenticazione, isolamento RLS, migrazioni applicative, CRUD e AI sono esclusi dalla fase e non implementati o verificati. Nessun progetto remoto collegato, nessuna operazione remota, push o deployment eseguiti.
- Nessuna parte dell'implementazione autorizzata è rimasta incompleta. La precedente classificazione **implementazione completata, verifica parziale** è superata dalla conferma delle prove manuali del tutor: la fase 1 è completata entro il proprio perimetro, con i limiti separati sopra indicati.

### Fonti ufficiali consultate

Consultate il 2 novembre 2026; le versioni effettive sono quelle fissate dal lockfile, anche quando il sito documentale mostra una patch diversa.

| Fonte | Aspetto verificato |
| --- | --- |
| [Next.js — Installation](https://nextjs.org/docs/app/getting-started/installation) | Inizializzazione manuale, App Router, script e TypeScript. |
| [Next.js — ESLint](https://nextjs.org/docs/app/api-reference/config/eslint) | Flat config, regole Core Web Vitals e TypeScript. |
| [Next.js — cookies](https://nextjs.org/docs/app/api-reference/functions/cookies) | Accesso asincrono ai cookie e contesti di scrittura. |
| [Next.js — agentRules](https://nextjs.org/docs/app/api-reference/config/next-config-js/agentRules) | Opzione verificata nella documentazione ufficiale inclusa nel pacchetto: `node_modules/next/dist/docs/01-app/03-api-reference/05-config/01-next-config-js/agentRules.md`, oltre ai tipi e all'implementazione installata. |
| [Tailwind CSS — Next.js](https://tailwindcss.com/docs/installation/framework-guides/nextjs) | Plugin PostCSS e import CSS della versione 4. |
| [shadcn/ui — Installazione manuale](https://ui.shadcn.com/docs/installation/manual), [registry Card](https://ui.shadcn.com/r/styles/new-york-v4/card.json) | Configurazione e sorgente Card, dipendenza `cn`. |
| [Supabase — Client SSR](https://supabase.com/docs/guides/auth/server-side/creating-a-client) | Client browser/server, chiave pubblica, cookie e necessità futura del rinnovo sessione. |
| [Supabase — CLI](https://supabase.com/docs/guides/local-development/cli/getting-started), [configurazione](https://supabase.com/docs/guides/local-development/cli/config) | CLI di progetto, init, stack locale e configurazione. |
| [Zod — API](https://zod.dev/api) | Validazione di URL e oggetti con schema e controlli aggiuntivi. |
| [Vitest — Guida](https://vitest.dev/guide/) | Runner, configurazione e requisiti runtime. |
| [Advisory minimatch](https://github.com/advisories/GHSA-g3hv-75wg-m249) | Riscontro delle segnalazioni emerse dall'audit npm. |

### Prova e prossimo passo

Per riprodurre i controlli, seguire [installazione e prova manuale nel README](../README.md): avvio senza credenziali, cinque sezioni raggiungibili, nessun dato fittizio e stati non implementati espliciti. Gli esiti manuali confermati dal tutor sono registrati sopra e non sono dedotti dalla build. In questo aggiornamento documentale non sono stati rieseguiti lint, typecheck, test o build: il codice applicativo non è stato modificato e restano registrati gli esiti già ottenuti.

`Q-01`–`Q-09` restano integralmente aperte in `requirements.md`. Nessuna regola di prodotto è stata modificata. Fase 1 conclusa entro il perimetro autorizzato; attendere il prossimo prompt e non iniziare automaticamente la fase 2.
