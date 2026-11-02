# Architettura — fase 1

Questa pagina descrive lo scheletro esistente e i confini previsti. Le regole di prodotto rimangono in [requirements.md](../requirements.md); non vengono risolte qui `Q-01`–`Q-09`. Configurazione e comandi sono nel [README](../README.md); fonti e verifiche in [progress.md](progress.md).

## Codice presente

```text
src/
  app/
    layout.tsx                 struttura condivisa, metadati, lingua italiana
    globals.css                Tailwind CSS 4 e tema
    page.tsx                   panoramica e collegamenti alle sezioni
    studenti/page.tsx          pagina informativa di sezione
    lezioni/page.tsx           pagina informativa di sezione
    competenze/page.tsx        pagina informativa di sezione
    preparazione/page.tsx      pagina informativa di sezione
  components/
    navigation.tsx             collegamenti e indicatore della rotta corrente
    section-page.tsx           presentazione condivisa degli stati non implementati
    service-availability.tsx   stato locale della configurazione, solo server
    ui/card.tsx                sole parti Card shadcn/ui utilizzate
  lib/
    utils.ts                   esportazione della funzione cn per le classi CSS
    supabase/
      config.ts                validazione differita della configurazione pubblica
      browser.ts               factory per Client Components
      server.ts                factory per codice server con cookie di richiesta
tests/
  supabase.test.ts             comportamento di configurazione e factory, SDK simulato
  supabase-import.test.ts      importazioni con SDK reale, senza credenziali o rete
  service-availability.test.ts stati di configurazione renderizzati senza rete
supabase/
  config.toml                 configurazione dello stack locale opzionale
```

L'applicazione è nella radice del repository, con sorgenti in `src/`. Non esistono una seconda app, modelli di dominio, repository generici, servizi vuoti o cartelle riservate senza codice.

## Direzione delle dipendenze e flusso attuale

Le rotte App Router compongono componenti di presentazione. Questi usano il componente UI Card e le utility CSS. La sola panoramica include `ServiceAvailability`, che consulta il validatore della configurazione pubblica. Nessuna pagina importa o chiama le factory Supabase.

Il flusso attuale è:

```text
Richiesta pagina → App Router → componenti di presentazione → HTML
Panoramica → lettura variabili pubbliche → validazione locale → etichetta di stato
Navigazione nel browser → Next Link / rotta selezionata
```

Non esiste un passaggio verso database o provider AI. Non viene simulato uno storico o un elenco vuoto: le pagine spiegano che la funzione non è implementata. Configurazione assente, configurazione malformata e configurazione presente ma non verificata hanno etichette distinte nella panoramica. Nessuna delle tre abilita la persistenza.

## Confini client e server

- Layout e pagine sono Server Components per impostazione predefinita. La navigazione è un Client Component perché usa `usePathname` per `aria-current` e l'indicatore visivo della rotta.
- `browser.ts` è marcato `use client`; usa `createBrowserClient` di `@supabase/ssr`.
- `server.ts` è marcato `server-only`; usa `createServerClient` e `await cookies()` di Next.js. Il client è creato per richiesta, senza singleton server condivisi.
- `config.ts` contiene soltanto nomi e accessi espliciti a variabili `NEXT_PUBLIC_*`. Non legge segreti server, non valida e non crea client durante l'importazione. La validazione Zod avviene quando richiesta.
- `SupabaseConfigurationError` espone un codice stabile e un motivo `missing` o `invalid`. Le informazioni dettagliate di Zod non vengono propagate perché potrebbero contenere valori di configurazione.
- Le chiavi accettate sono publishable e legacy JWT con ruolo `anon`; le chiavi amministrative note vengono respinte. Il controllo è sintattico, senza verifica della firma o della connessione.
- La factory server collega `getAll`/`setAll` ai cookie; la scrittura può non essere disponibile nei Server Components. Il futuro flusso Auth deve aggiungere il rinnovo della sessione nel Proxy e la verifica dell'identità. Nessuna rotta è ora protetta e nessuna RLS è stata implementata.

La panoramica viene prerenderizzata: in produzione l'etichetta della configurazione riflette i valori pubblici presenti alla build. Non è un controllo di salute del database. Nessun segreto Groq è letto o passato a un componente.

## UI e accessibilità predisposte

Navigazione laterale da desktop e griglia di collegamenti da telefono, senza menu interattivi superflui. Link nativi, area principale identificata, collegamento «Vai al contenuto», focus visibile, `aria-current` e icone decorative escluse dall'albero accessibile. I messaggi non affidano il significato soltanto al colore.

Il tema usa font di sistema e non richiede download di font durante la build. Di shadcn/ui è stato adattato solo Card dal registry ufficiale, mantenendo le parti effettivamente utilizzate; `cn` proviene dal progetto shadcn. Non è stato installato un SDK AI. Gli esiti delle prove manuali di navigazione, tastiera e impaginazione confermate dal tutor sono registrati in [progress.md](progress.md); la procedura per ripeterle è nel README.

`agentRules: false` impedisce a `next dev` di aggiungere blocchi automatici ad `AGENTS.md`; le istruzioni permanenti del progetto restano preservate.

## Supabase locale

La CLI è una dipendenza di sviluppo npm. Il file di configurazione è stato generato, con seed disattivati e assistente OpenAI di Studio non configurato. Nessuna migrazione, tabella applicativa o policy è stata aggiunta. Le impostazioni locali generate non costituiscono decisioni sul metodo di accesso del tutor.

La configurazione è pronta per una successiva prova con Docker Desktop. In questa fase non sono stati avviati container, creati account o collegati progetti remoti. La normale web app non dipende dall'avvio dello stack.

## Responsabilità future, non implementate

Quando una fase lo richiederà, introdurre soltanto i moduli necessari secondo queste dipendenze:

```text
Interfaccia → operazioni applicative server → dominio
Operazioni applicative server → accesso ai dati tramite sessione Supabase
Operazioni applicative server → integrazione AI lato server
```

Il dominio non dipenderà da React, Next.js o Groq. L'accesso ai dati gestirà le letture e scritture con la sessione utente e RLS. L'integrazione AI avrà la responsabilità del protocollo del provider e della validazione strutturata; la conferma del tutor e le regole dello storico rimarranno nella logica di dominio/applicativa.

Le note dovranno restare utilizzabili senza provider AI. Le future proposte AI saranno bozze separate dai dati confermati, con fonti riconducibili allo storico: nessun percorso di scrittura diretta del provider nello storico. Questo è il flusso previsto dai requisiti, non codice già disponibile.

L'autenticazione dipende da `Q-01`; modelli studenti, lezioni e competenze da `Q-02`–`Q-05`; bozze e contesto AI da `Q-06`–`Q-07`; preparazione e conservazione da `Q-08`–`Q-09`. Non introdurre anticipatamente le relative cartelle o regole.
