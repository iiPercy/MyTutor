# Requisiti del prodotto

## Stato e convenzioni

Fonte iniziale: richiesta del tutor del 2 novembre 2026. I requisiti nelle sezioni MVP, dominio e requisiti non funzionali sono **confermati** dalla richiesta; questo non significa che siano implementati. Lo stato di attuazione è in [docs/progress.md](docs/progress.md).

Gli identificativi sono stabili: `MVP-*` per comportamenti, `DOM-*` per regole di dominio, `NFR-*` per requisiti non funzionali, `EXC-*` per esclusioni e `Q-*` per questioni aperte. Nuovi requisiti riceveranno nuovi identificativi, senza rinumerare quelli esistenti. I criteri elencati sotto ogni requisito MVP sono condizioni osservabili da verificare nella fase pertinente; quelli che dipendono da una questione aperta restano incompleti fino al chiarimento indicato.

Non ci sono funzionalità proposte già approvate implicitamente. Le questioni aperte non autorizzano implementazioni né introducono regole di prodotto. Eventuali proposte future devono essere marcate **da approvare**, prima di entrare nel perimetro confermato.

## Obiettivo e destinatario

Applicazione personale per un solo tutor, con accesso riservato e dati di proprietà dell'account, inizialmente per ripetizioni di matematica. Il percorso principale collega profilo studente, appunti della lezione, revisione delle bozze AI e preparazione della lezione successiva basata sullo storico confermato. Interfaccia in italiano, utilizzabile da desktop e telefono.

## MVP — comportamenti confermati

### MVP-01 — Accesso riservato e proprietà dei dati

Il tutor accede tramite autenticazione Supabase. I dati appartengono all'account e sono isolati tramite RLS, senza organizzazioni o collaborazione fra tutor.

Criteri di accettazione:

- Un visitatore senza sessione non può leggere o modificare dati riservati, nemmeno tramite chiamate dirette al backend o al database.
- Con due account fittizi distinti, ciascuno può operare sui propri dati; tentativi di lettura o modifica di quelli altrui sono respinti anche alterando gli identificativi nelle richieste.
- Le operazioni ordinarie usano la sessione dell'utente, senza chiavi amministrative.
- Il metodo di abilitazione dell'unico tutor e il ciclo di sessione saranno verificabili secondo la decisione su `Q-01`; la registrazione pubblica non è un requisito approvato.

### MVP-02 — Profilo dello studente

Il tutor può aprire il profilo di uno studente e raggiungere le sue lezioni e le informazioni pertinenti al flusso principale. Il profilo è associato all'account proprietario.

Criteri di accettazione:

- Selezionando uno studente si accede al suo profilo e alle lezioni associate, senza includere dati di altri studenti o account.
- Il flusso permette di disporre dei profili necessari all'uso ordinario secondo le modalità di inserimento e i campi da chiarire in `Q-02`.
- La consultazione del profilo e delle lezioni non richiede la disponibilità del provider AI.

### MVP-03 — Registrazione e consultazione delle note di lezione

Il tutor registra appunti liberi di una lezione dello studente e può consultarli in seguito. La nota originale resta distinta dal riepilogo AI (`DOM-01`).

Criteri di accettazione:

- Una nota salvata viene ritrovata aprendo la lezione dello studente corretto, anche in una sessione successiva.
- Nota originale e riepilogo sono riconoscibili separatamente; la generazione o conferma del riepilogo non sovrascrive la nota originale.
- Ogni lezione dispone di un riferimento temporale utilizzabile per ordinare lo storico per data della lezione; granularità e gestione delle parità dipendono da `Q-04`.
- È possibile salvare e consultare note senza effettuare chiamate AI, anche con provider indisponibile.

### MVP-04 — Proposta AI dopo la lezione

A partire dagli appunti, l'AI propone riepilogo, compiti e osservazioni sulle competenze come bozze da revisionare. La generazione usa Groq lato server e output validati con Zod.

Criteri di accettazione:

- Da una nota di lezione il tutor può richiedere una proposta che distingue riepilogo, compiti e osservazioni sulle competenze.
- Le proposte sono riconoscibili come bozze; la generazione da sola non modifica lo storico confermato o lo stato delle competenze.
- Gli stati proposti appartengono esclusivamente a quelli definiti in `DOM-04`.
- Un output che non rispetta lo schema viene gestito come errore e non diventa dato confermato; uno schema valido non equivale a un giudizio corretto, che richiede revisione del tutor.
- Eventuali affermazioni sullo storico rispettano `DOM-09` e `DOM-10`; il contesto ammesso dipende da `Q-07`.

### MVP-05 — Revisione, conferma e scarto delle proposte

Il tutor può correggere, confermare o scartare le proposte AI. Solo una conferma esplicita può farle entrare nello storico confermato.

Criteri di accettazione:

- Prima della conferma, il tutor può modificare il contenuto proposto e scartarlo.
- Dopo la conferma, nello storico compare il contenuto approvato dal tutor, comprese le sue correzioni.
- Una bozza non confermata o scartata non contribuisce allo stato delle competenze né viene presentata come evidenza confermata nella preparazione successiva.
- Le correzioni conservano la tracciabilità prevista da `DOM-08`; dettaglio delle revisioni e granularità della conferma dipendono da `Q-05` e `Q-06`.

### MVP-06 — Osservazioni sulle competenze

Ogni osservazione collega studente, competenza e lezione e usa gli stati di dominio. Affrontare un argomento non costituisce automaticamente una competenza acquisita.

Criteri di accettazione:

- Per ogni osservazione è possibile risalire a studente, competenza e lezione pertinenti, appartenenti all'account corretto.
- Sono ammessi soltanto gli stati di `DOM-04`, con il significato di `DOM-05`.
- Registrare una nota o un argomento affrontato, senza confermare un'osservazione, non aggiorna automaticamente lo stato della competenza.
- Non compaiono punteggi percentuali di padronanza.
- La selezione o individuazione delle competenze seguirà il chiarimento `Q-03`.

### MVP-07 — Consultazione dello stato attuale delle competenze

Lo stato attuale deriva dalle osservazioni confermate non invalidate, ordinate per data della lezione, secondo `DOM-07`.

Criteri di accettazione:

- Le bozze e le osservazioni invalidate sono escluse dal calcolo dello stato attuale.
- Inserire oggi un'osservazione di una lezione precedente non la rende più recente di una relativa a una lezione successiva.
- Le osservazioni che contribuiscono allo stato sono consultabili con i relativi riferimenti alla lezione.
- La regola esatta di derivazione, i casi senza osservazioni e i conflitti a pari data devono essere definiti in `Q-04` prima di implementare il calcolo e completarli con esempi di accettazione.

### MVP-08 — Correzioni tracciabili dello storico

Le correzioni mantengono una traccia riconoscibile delle modifiche, senza permettere all'AI di riscrivere direttamente lo storico confermato.

Criteri di accettazione:

- Dopo una correzione è possibile ricostruire il contenuto precedente, quello corretto e il loro collegamento, secondo il meccanismo da definire in `Q-05`.
- Le osservazioni invalidate non contribuiscono allo stato corrente.
- Nessuna generazione AI applica da sola correzioni o invalidazioni allo storico.
- L'effetto di correzioni e invalidazioni sullo stato segue la decisione su `Q-04`, con verifiche ripetibili.

### MVP-09 — Preparazione della lezione successiva

Prima di una lezione il tutor indica argomento, durata e obiettivo e ottiene una proposta basata sullo storico confermato dello studente.

Criteri di accettazione:

- Il tutor può fornire argomento, durata e obiettivo per lo studente selezionato e richiedere la proposta.
- Il contesto storico usato rispetta le regole di conferma; bozze e osservazioni invalidate non sono trattate come evidenze valide.
- Le affermazioni basate sullo storico rimandano a lezioni o osservazioni pertinenti e restano distinguibili dai suggerimenti didattici generali.
- In assenza di evidenze pertinenti non vengono inventati fatti sullo studente; l'insufficienza dello storico è esplicita.
- La preparazione non genera esercizi e non modifica automaticamente lo storico. Forma, persistenza e validazione degli input dipendono da `Q-08`.

### MVP-10 — Continuità del flusso senza AI

Errori e indisponibilità del provider non impediscono registrazione e consultazione delle note.

Criteri di accettazione:

- Con timeout, errore del provider, limite del servizio o output non valido, il tutor riceve un esito comprensibile e nessun dato viene confermato automaticamente.
- Le note già salvate restano disponibili e il salvataggio e la consultazione delle note continuano a funzionare con provider non disponibile o non configurato.
- Questi casi possono essere verificati con fixture o mock espliciti, senza dipendere da risposte live.

## Regole di dominio confermate

| ID | Regola |
| --- | --- |
| DOM-01 | La nota originale della lezione è distinta dal riepilogo AI. |
| DOM-02 | L'AI produce bozze e non modifica direttamente lo storico confermato. |
| DOM-03 | Il tutor può correggere, confermare o scartare le proposte. |
| DOM-04 | Gli unici stati sono: **da verificare**, **con guida**, **con suggerimenti**, **in autonomia**. |
| DOM-05 | **Da verificare** significa evidenza insufficiente, non scarsa capacità. |
| DOM-06 | Ogni osservazione è collegata a studente, competenza e lezione. Aver affrontato un argomento non significa aver acquisito una competenza. |
| DOM-07 | Lo stato attuale deriva dalle osservazioni confermate non invalidate, ordinate per data della lezione e non per data di inserimento. La formula di derivazione non è ancora definita (`Q-04`). |
| DOM-08 | Le correzioni mantengono la tracciabilità; il meccanismo operativo deve essere chiarito (`Q-05`). |
| DOM-09 | Le proposte AI distinguono evidenze dello storico e suggerimenti didattici generali. |
| DOM-10 | Ogni affermazione basata sullo storico è riconducibile alle lezioni o osservazioni pertinenti. |
| DOM-11 | Non si introducono punteggi percentuali di padronanza. |

## Requisiti non funzionali confermati

Si applicano all'MVP. Le prescrizioni tecniche operative sono in [AGENTS.md](AGENTS.md), senza ripeterne qui l'intero stack.

| ID | Requisito e verifica attesa |
| --- | --- |
| NFR-01 | Interfaccia in italiano e utilizzabile da desktop e telefono: verificare i flussi principali a entrambe le dimensioni, con campi e azioni accessibili nell'impaginazione. |
| NFR-02 | Separazione fra interfaccia, dominio, accesso ai dati e integrazione AI; le regole importanti sono testabili senza UI o chiamate live al provider. Nessuna astrazione speculativa o implementazione di provider multipli. |
| NFR-03 | Isolamento per account tramite Supabase RLS e sessione utente nelle operazioni normali; verificare accessi diretti e relazioni tra dati di account diversi, oltre ai controlli UI. |
| NFR-04 | Segreti solo sul server e fuori da repository, log e riepiloghi; variabili necessarie documentate in `.env.example` con segnaposto quando introdotte. Nessuna chiave amministrativa nei flussi ordinari. |
| NFR-05 | Inviare all'AI solo dati necessari, evitando identificativi personali superflui; usare dati fittizi per sviluppo e test. Verificare il payload inviato senza registrare dati sensibili. |
| NFR-06 | Input e output strutturati AI validati con Zod lato server; gestione di errori, output non validi, timeout e limiti. Modello Groq e supporto alle funzionalità verificati nella documentazione ufficiale al momento dell'integrazione. |
| NFR-07 | TypeScript strict, versioni stabili compatibili, un solo package manager e lockfile; typecheck, lint, build e test pertinenti eseguiti e rendicontati nelle fasi applicabili. |
| NFR-08 | Schema PostgreSQL gestito tramite Supabase CLI e migrazioni SQL versionate, senza ORM iniziale; migrazioni remote soltanto su richiesta esplicita. |
| NFR-09 | Un solo repository e backend in Next.js, deployment previsto su Vercel. Nessuna attivazione di servizi o fallback a pagamento senza richiesta esplicita. |
| NFR-10 | Test ripetibili prioritari per dominio, isolamento e transizione bozza/conferma; mock e fixture dichiarati, mai sostituzioni silenziose di servizi mancanti. Esiti e limiti documentati senza dichiarazioni di verifica non eseguita. |

## Want to have

Nessuna funzionalità futura è stata esplicitamente richiesta come Want to have. La sezione resta vuota: le esclusioni successive non diventano automaticamente una roadmap.

## Esclusioni confermate

| ID | Perimetro escluso |
| --- | --- |
| EXC-01 | Pagamenti fuori dall'MVP; nessuna richiesta futura approvata. |
| EXC-02 | Sincronizzazione calendario fuori dall'MVP; nessuna richiesta futura approvata. |
| EXC-03 | Portale studente fuori dall'MVP; nessuna richiesta futura approvata. |
| EXC-04 | Allegati fuori dall'MVP; nessuna richiesta futura approvata. |
| EXC-05 | Audio fuori dall'MVP; nessuna richiesta futura approvata. |
| EXC-06 | Generazione di esercizi fuori dall'MVP, anche nella preparazione della lezione. |
| EXC-07 | Laboratori interattivi fuori dall'MVP; nessuna richiesta futura approvata. |
| EXC-08 | Organizzazioni, abbonamenti e collaborazione fra tutor esclusi dal prodotto attuale. |
| EXC-09 | Provider AI multipli e infrastrutture speculative per modelli locali non implementati ora. La separazione del provider resta richiesta da NFR-02. |

## Proposte da approvare

Nessuna proposta aggiuntiva introdotta nella fase 0. I chiarimenti seguenti individuano decisioni necessarie, senza approvare funzionalità o soluzioni tecniche aggiuntive.

## Questioni aperte

Tutte le questioni sono **aperte**. Non bloccano la conclusione documentale della fase 0 né attività indipendenti come la preparazione dello scheletro tecnico. Devono essere chiarite prima di implementare il comportamento o lo schema che ne dipende.

| ID | Chiarimento richiesto | Dipendenze e momento del chiarimento |
| --- | --- | --- |
| Q-01 | Come viene abilitato l'unico account tutor? Quale metodo di accesso e recupero della sessione si desidera? | MVP-01; prima dell'autenticazione e della configurazione degli accessi. |
| Q-02 | Quali campi minimi contiene il profilo studente e come vengono inseriti i profili nell'uso ordinario? Servono modifiche o archiviazione? Nessuna cancellazione è implicitamente autorizzata. | MVP-02; prima dello schema e del flusso studenti. |
| Q-03 | Da dove provengono le competenze: catalogo predefinito, voci gestite dal tutor o altro? Qual è la distinzione operativa fra argomento e competenza e come si gestiscono proposte AI senza corrispondenza? | MVP-04, MVP-06, MVP-07; prima del modello delle competenze e della relativa generazione AI. |
| Q-04 | Come si deriva esattamente lo stato dalle osservazioni ordinate: quale regola si applica a evidenze diverse? Come si gestiscono assenza di osservazioni, più osservazioni per la stessa competenza nella stessa lezione e lezioni alla stessa data? Quale granularità temporale serve? Quali effetti hanno rettifiche e invalidazioni? | MVP-03, MVP-07, MVP-08; prima di fissare i campi temporali e il calcolo. Non si assume che prevalga automaticamente l'ultima osservazione né che l'assenza equivalga a uno stato specifico. |
| Q-05 | Quali contenuti possono essere corretti dopo il salvataggio o la conferma, incluse le note originali? Come si registra la revisione e come si invalida un'osservazione? Che cosa rimane consultabile e con quali metadati? | MVP-03, MVP-05, MVP-08; prima della persistenza delle revisioni. Il vincolo di tracciabilità è già confermato. |
| Q-06 | La conferma o lo scarto avvengono per singolo elemento o per proposta completa? Qual è il ciclo di vita di bozze, proposte scartate e rigenerazioni? I compiti sono testo nella lezione o entità distinte? | MVP-04, MVP-05; prima del modello delle bozze e della revisione. Non sono approvati scadenze o monitoraggio del completamento dei compiti. |
| Q-07 | Quali contenuti costituiscono lo storico confermato usabile dall'AI? Le note originali salvate sono utilizzabili come evidenza e con quale stato? Quanto storico serve per ciascun compito e come deve apparire il riferimento alla fonte al tutor? | MVP-04, MVP-09, DOM-09, DOM-10; prima della selezione del contesto e dei contratti AI. |
| Q-08 | Quale struttura deve avere la proposta per la lezione successiva? Va salvata o soltanto consultata? Quali unità e limiti ha la durata e quali vincoli hanno argomento e obiettivo? | MVP-09; prima di schema e UI della preparazione. |
| Q-09 | Quali regole di conservazione dei dati e delle risposte AI servono? Sono richieste operazioni di eliminazione o esportazione? | Prima di introdurre politiche di conservazione o operazioni sul ciclo di vita dei dati. Nessuna di queste funzionalità è approvata dalla domanda stessa. |

## Relazione con le fasi

La fase 0 definisce la base documentale e non soddisfa ancora i criteri funzionali dell'MVP. Le fasi successive dovranno dichiarare quali identificativi affrontano e quali verifiche eseguono in [docs/progress.md](docs/progress.md). La loro sequenza e il loro perimetro saranno autorizzati dai prompt successivi del tutor.
