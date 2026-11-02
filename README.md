# Ripetizioni

Web app personale per le ripetizioni di matematica. **Fase 1: struttura iniziale**, con panoramica e navigazione fra Studenti, Lezioni, Competenze e Preparazione.

Le pagine dichiarano quali funzioni non sono implementate. Non vengono letti o salvati dati, non ci sono contenuti fittizi e non vengono inviate richieste a Supabase o all'AI durante il rendering. Login, protezione delle rotte, RLS, CRUD e storico non sono ancora implementati. Configurare le variabili non attiva queste funzioni.

Requisiti: [requirements.md](requirements.md). Struttura e confini tecnici: [docs/architecture.md](docs/architecture.md). Verifiche, fonti e limiti effettivi: [docs/progress.md](docs/progress.md).

## Prerequisiti Windows / PowerShell

- Node.js e npm accessibili nel terminale corrente. Ambiente verificato: **Node.js 26.13.0, npm 11.20.0, Windows PowerShell 5.1**; non sono stati usati WSL, Linux o container per la web app.
- L'intersezione dei requisiti dichiarati in `package.json` ammette Node `^22.12.0`, `^24.0.0` o `>=26.0.0`, con npm `>=10`; queste alternative non sono state provate in questa fase. Preferire una versione LTS supportata per nuove installazioni.
- Git per il controllo delle modifiche. Docker Desktop è necessario soltanto per lo stack Supabase locale opzionale.

```powershell
node --version
npm.cmd --version
git --version
```

Se Node.js non è accessibile, installarlo separatamente dal [sito ufficiale Node.js](https://nodejs.org/en/download), poi riaprire il terminale e ricontrollare i comandi. Questa fase non installa software di sistema e non cambia PATH o policy PowerShell. I comandi usano `npm.cmd`, così non dipendono dall'esecuzione di `npm.ps1`.

## Installazione e avvio

Dalla radice del repository:

```powershell
npm.cmd ci
npm.cmd run dev -- --hostname 127.0.0.1
```

Aprire [http://127.0.0.1:3000](http://127.0.0.1:3000). Se la porta è occupata, usare l'indirizzo effettivo stampato dal server. Arrestare con `Ctrl+C`.

**Non occorre creare `.env.local`** per provare lo scheletro. La panoramica mostrerà «Configurazione mancante» per l'archiviazione e indicherà le funzioni non implementate. Le altre sezioni spiegano che non è stata eseguita una lettura dal database: non rappresentano elenchi di dati vuoti.

Il progetto usa soltanto npm e `package-lock.json`. Le dipendenze dirette sono fissate a versioni esatte; `npm ci` riproduce il lockfile. L'inizializzazione è stata eseguita manualmente nella radice secondo le guide ufficiali, preservando i documenti preesistenti.

## Comandi

| Comando | Effetto |
| --- | --- |
| `npm.cmd run dev` | Server di sviluppo Next.js. |
| `npm.cmd run lint` | ESLint; anche gli avvisi causano un esito negativo. |
| `npm.cmd run typecheck` | Generazione dei tipi delle rotte e TypeScript strict senza emissione. |
| `npm.cmd test` | Test Vitest ripetibili, senza servizi esterni. |
| `npm.cmd run test:watch` | Test in modalità osservazione. |
| `npm.cmd run build` | Build di produzione; non richiede credenziali. |
| `npm.cmd start -- --hostname 127.0.0.1` | Avvio della build già prodotta. |
| `npm.cmd run supabase:start` | Avvio opzionale dei servizi locali, richiede Docker. |
| `npm.cmd run supabase:status` | Stato dello stack locale; l'output può contenere credenziali locali e non va condiviso integralmente. |
| `npm.cmd run supabase:stop` | Arresto ordinario dello stack locale. |

Non eseguire build e server di sviluppo contemporaneamente sulla stessa cartella `.next`. La procedura di verifica standard è lint, typecheck, test e build, poi avvio e controlli nel browser.

## Variabili e client Supabase

Solo se serve configurare i client:

```powershell
Copy-Item -LiteralPath .env.example -Destination .env.local
```

Sostituire i segnaposto nel file locale. Non sono valori utilizzabili. `.env.local` è escluso da Git, `.env.example` è incluso.

| Variabile | Visibilità | Uso attuale |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Pubblica, inclusa nel bundle browser | URL HTTP(S) del progetto; facoltativa per lo scheletro. |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Pubblica, inclusa nel bundle browser | Chiave publishable; per il locale è ammessa anche la chiave legacy `anon` JWT. |
| `GROQ_API_KEY` | Segreto esclusivamente server | Riservata a una futura fase; opzionale, commentata nell'esempio e non letta dal codice attuale. |

Non inserire mai chiavi `service_role`, chiavi `sb_secret_...`, password del database o token CLI nelle variabili pubbliche. Non è necessaria alcuna chiave amministrativa. La validazione controlla il formato della configurazione e rifiuta chiavi amministrative note: non prova autenticità della chiave, connessione o isolamento dei dati.

Le factory sono in `src/lib/supabase/browser.ts` e `server.ts`. Importarle non richiede configurazione. Chiamarle con configurazione assente o non valida genera `SupabaseConfigurationError` con codice `SUPABASE_CONFIGURATION_INVALID`, senza valori delle variabili nel messaggio. Il chiamante futuro potrà gestire esplicitamente questo errore. Non esiste un fallback simulato.

Il client server legge i cookie della richiesta e li scrive dove Next.js lo consente. Non è ancora presente il Proxy per il rinnovo della sessione: le factory da sole **non costituiscono un'integrazione di autenticazione completa**. La panoramica controlla solo la configurazione pubblica e non crea un client. «Configurazione presente» significa che il controllo locale è passato, non che il database sia connesso. Le variabili `NEXT_PUBLIC_*` vengono incorporate alla build: ricostruire l'applicazione dopo averle cambiate in produzione.

## Supabase locale opzionale

CLI **2.122.0** inclusa nelle dipendenze di sviluppo. `supabase/config.toml` e `.gitignore` sono stati generati con `supabase init`; seed disattivati, nessuna tabella di dominio, migrazione applicativa o policy RLS presente. Le impostazioni Auth generate sono default dello strumento locale, non decisioni di prodotto: `Q-01` resta aperta.

Nella sessione di implementazione Docker non era accessibile dal PATH né nei percorsi standard controllati. Configurazione preparata, stack **mai avviato** e connessione **non verificata**.

Se si vuole provare lo stack in seguito:

1. Installare e avviare separatamente [Docker Desktop per Windows](https://docs.docker.com/desktop/setup/install/windows-install/), seguendo i suoi prerequisiti.
2. Verificare nel terminale `docker version` e `docker info`.
3. Dalla radice eseguire `npm.cmd run supabase:start`. Il primo avvio scarica le immagini container. Non occorrono login Supabase, progetto remoto o Groq.
4. Usare `npm.cmd run supabase:status` per consultare gli endpoint locali. Le porte preparate sono API `54321`, PostgreSQL `54322`, Studio `54323`; potrebbero esserci conflitti con altri progetti locali.
5. Facoltativamente riportare in `.env.local` l'URL API locale e la sola chiave pubblica publishable/anon stampata dalla CLI. Non copiare chiavi amministrative. Lo scheletro continua a non leggere o scrivere dati.
6. Arrestare con `npm.cmd run supabase:stop`. Non usare opzioni che eliminano backup o volumi e non eseguire reset del database.

Non sono necessari `supabase link`, migrazioni remote, push o deployment. L'avvio locale è una verifica separata rispetto allo scheletro dell'interfaccia.

## Prova manuale dello scheletro

1. Avviare senza `.env.local`: la panoramica deve dichiarare configurazione mancante e nessuna funzione dati disponibile, senza errori di credenziali.
2. Visitare Panoramica, Studenti, Lezioni, Competenze e Preparazione usando la navigazione e le schede della panoramica. Il collegamento corrente deve essere riconoscibile; ogni pagina deve avere il titolo corretto e spiegare lo stato non implementato.
3. Usare `Tab`, `Shift+Tab` e `Invio`: controllare «Vai al contenuto», tutte le voci di navigazione, le schede e «Torna alla panoramica», con focus visibile.
4. Nel browser provare viewport **1440×900**, **390×844** e **320×740**: nessun contenuto tagliato o scorrimento orizzontale della pagina; la navigazione deve restare raggiungibile e i testi leggibili. Controllare anche la pagina lunga scorrendo fino al fondo.
5. In DevTools/Network verificare che la navigazione non generi richieste Supabase o Groq. Non devono comparire moduli operativi, conteggi, studenti o lezioni fittizi.

Il servizio browser dell'agente non era disponibile nella sessione di implementazione. Il tutor ha successivamente confermato apertura delle quattro sezioni, impaginazione a finestra stretta e navigazione con `Tab`/`Invio` e focus visibile. Dimensioni esatte e controllo DevTools/Network non sono stati comunicati come verificati. Gli esiti e la provenienza delle verifiche sono in [docs/progress.md](docs/progress.md).
