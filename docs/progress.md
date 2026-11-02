# Registro di avanzamento

## Stato del progetto

Fase 0 documentale completata il **2 novembre 2026**. Nessuna funzionalità implementata; nessun criterio funzionale dell'MVP è dichiarato soddisfatto. Si attende il prompt della prima fase di implementazione.

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

Passo successivo: attendere il prompt del tutor per la prima fase di implementazione; chiarire soltanto le questioni da cui dipenderà quella fase.
