import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { VakBars } from "@/components/VakBars";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import { computeVak, VAK_NOUN, VAK_ADJ } from "@/lib/vak";
import type { Step, StepContext } from "./types";
import { computeVakProfile } from "./capitolo-1-actions";

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Scrivi qui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const Q1_OPTIONS: Option[] = [
  { value: "vede", label: "Glielo rifaccio vedere" },
  { value: "dice", label: "Glielo rispiego con altre parole" },
  { value: "sente", label: "Lo prendo per mano e glielo faccio sentire" },
  { value: "boh", label: "Non lo so, dipende dal momento" },
];

const V_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "v1",
    prompt: "1. Devi spiegare un movimento nuovo. Cosa fai per primo, istintivamente?",
    options: [
      { value: "mostra", label: "Lo dimostro io, in acqua, prima di dire qualsiasi cosa" },
      { value: "dire", label: "Lo spiego a parole, passo dopo passo" },
      { value: "sentire", label: "Prendo il suo braccio e gli faccio sentire il movimento" },
    ],
  },
  {
    key: "v2",
    prompt: "2. Ripensi a una lezione andata bene. Cosa ricordi per primo?",
    options: [
      { value: "mostra", label: "Come si vedeva l'allievo muoversi — la sua postura, la sua scia in acqua" },
      { value: "dire", label: "Le parole che ci siamo detti, il tono della conversazione" },
      { value: "sentire", label: "Come mi sono sentito io — l'energia, la soddisfazione fisica di quel momento" },
    ],
  },
  {
    key: "v3",
    prompt: "3. Un collega ti chiede consiglio su un esercizio. Come preferisci spiegarglielo?",
    options: [
      { value: "mostra", label: "Te lo faccio vedere, vieni in acqua con me" },
      { value: "dire", label: "Te lo racconto, sediamoci cinque minuti" },
      { value: "sentire", label: "Facciamolo insieme, lo capisci provandolo" },
    ],
  },
  {
    key: "v4",
    prompt: "4. Quando descrivi un errore tecnico a un collega, cosa fai più spesso?",
    options: [
      { value: "mostra", label: "Disegno o mimo il movimento con le mani" },
      { value: "dire", label: "Lo racconto a parole, con precisione" },
      { value: "sentire", label: "Lo rifaccio io stesso nell'aria, con tutto il corpo" },
    ],
  },
  {
    key: "v5",
    prompt: "5. Un genitore ti chiede come sta andando suo figlio. Cosa fai per rispondere per bene?",
    options: [
      { value: "mostra", label: "Gli mostro un video, o glielo faccio vedere dal bordo vasca la prossima volta" },
      { value: "dire", label: "Gli racconto con parole precise cosa è cambiato" },
      { value: "sentire", label: "Gli dico di scendere in acqua un attimo con il bambino, per sentirlo lui stesso" },
    ],
  },
  {
    key: "v6",
    prompt: "6. Devi ricordare a memoria una sequenza di passaggi tecnici per un esame. Come studi meglio?",
    options: [
      { value: "mostra", label: "Guardando video o immagini della sequenza" },
      { value: "dire", label: "Ripetendola a voce alta, con le mie parole" },
      { value: "sentire", label: "Rifacendo il gesto con il corpo, anche fuori dall'acqua" },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q8a","q8b"];

export const capitolo1Steps: Step[] = [
  // 0 — copertina
  {
    day: "inizio",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capitolo 1 · IO</div>
        <h1>La comunicazione è il risultato che ottieni</h1>
        <p className="lede">
          Non conta cosa volevi dire. Conta cosa è arrivato. Se un bambino non fa quello che gli
          hai chiesto, la domanda utile non è «perché non mi ascolta» — è «come posso dirglielo in
          un modo che arrivi».
        </p>
        <p className="lede">
          Tutto LA CHIAVE GIUSTA nasce da questa frase sola. Il resto sono i modi per metterla in
          pratica.
        </p>
      </>
    ),
  },

  // 1 — lunedì §2
  {
    day: "lunedì · 7 min",
    pct: 10,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunedì</div>
        <h1>Benvenuto in LA CHIAVE GIUSTA</h1>
        <p className="lede">
          Due domande — non c&apos;è una risposta giusta, servono solo a farti notare qualcosa su
          di te, prima ancora di leggere una riga di teoria.
        </p>
        <p className="prompt">
          1. Quando un bambino non capisce quello che gli hai chiesto, qual è la prima cosa che
          fai, istintivamente?
        </p>
        <OptionGroup name="q1" options={Q1_OPTIONS} selected={answers.q1} onPick={(v) => setResponse("q1", v)} />
        <p className="prompt">2. E quando è un adulto a non capirti? È la stessa prima mossa, o è diversa?</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <p className="lede" style={{ marginTop: 14, fontStyle: "italic" }}>
          Tienile a mente entrambe — ci torna anche il test che fai mercoledì.
        </p>
      </>
    ),
  },

  // 2 — martedì spiegazione + controllo
  {
    day: "martedì · 13 min",
    pct: 22,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martedì</div>
        <h1>Conoscere come comunichi tu</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Questa settimana impari una cosa sola, ma è quella su cui si regge tutto il resto:
          conoscere come comunichi tu, prima di occuparti di come comunica il bambino.
        </p>
        <p className="lede">
          Il tuo ciclo di lavoro comincia sempre dallo stesso punto — non dal bambino, da te:{" "}
          <strong>
            io → riconosco il bambino → osservo → mi metto in sintonia → comunico → lo faccio
            agire.
          </strong>
        </p>
        <p className="lede">
          Ognuno di noi ha un modo preferito di farsi capire — chi mostra, chi spiega a parole, chi
          fa sentire il gesto. Nessuno è sbagliato, ma se ne usi sempre e solo uno, il giorno in cui
          quel modo non funziona non hai un piano B.
        </p>
        <p className="lede">
          <strong>Questi tre modi hanno anche un nome tecnico, che da qui in poi troverai spesso: VAK.</strong>{" "}
          La sigla viene dall&apos;inglese — <em>Visual, Auditory, Kinesthetic</em> — in italiano
          Visivo, Auditivo, Cinestesico (la sigla resta la stessa): mostrare = visivo, dire =
          auditivo, far sentire = cinestesico. Userai quasi sempre le parole concrete, ma da oggi,
          quando leggi «test VAK» o «profilo VAK», sai a cosa si riferisce.
        </p>
        <div className="card quote">
          Il test non ti dice chi sei. Ti mostra un&apos;abitudine. Non troverai mai scritto «sei
          visivo» — troverai «il tuo profilo mostra una prevalenza verso il mostrare».
        </div>
        <p className="lede">
          <strong>Torniamo alla seconda domanda di lunedì</strong> — quella sull&apos;adulto. Per
          molti istruttori la prima mossa con un collega o un genitore è diversa da quella con un
          bambino: magari con un bambino mostri, e con un adulto spieghi a parole, per abitudine
          sociale, non per scelta consapevole. Il tuo profilo VAK non riguarda solo i bambini: è lo
          stesso automatismo che usi con chiunque. Se con gli adulti eviti un canale che con i
          bambini usi spesso — o il contrario — vuol dire una cosa: quell&apos;abitudine non
          dipende solo dalla vasca. È un automatismo tuo, che porti con te ovunque.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata</h2>
        <p className="prompt">1. Il test VAK ti dice chi sei come istruttore?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "No — ti mostra un'abitudine, non un'identità", correct: true },
            { value: "si", label: "Sì, è una fotografia definitiva", correct: false },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Se usi sempre e solo un canale, cosa succede?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "niente", label: "Niente, l'importante è essere chiari", correct: false },
            { value: "terzo", label: "Il giorno in cui quel modo non funziona, non hai un piano B", correct: true },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">3. Il tuo automatismo comunicativo riguarda solo il modo in cui parli ai bambini in vasca?</p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sì, è specifico del contesto vasca", correct: false },
            { value: "no", label: "No — è lo stesso automatismo che usi anche con adulti, colleghi, genitori", correct: true },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercoledì esempio + applicazione
  {
    day: "mercoledì · parte 1",
    pct: 34,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì</div>
        <h1>Tre tentativi, tre canali</h1>
        <div className="card scene">
          <div className="who">Un istruttore, un bambino di 8 anni, la rana</div>
          <p>
            Il bambino non riesce a coordinare le gambe. L&apos;istruttore rifà la dimostrazione
            tre volte. Niente cambia. Prova a dirglielo a parole — «spingi come se spingessi via
            l&apos;acqua». Il bambino ci riprova: un po&apos; meglio, ma ancora incerto. Poi
            l&apos;istruttore gli prende le caviglie fuori dall&apos;acqua e gliele muove lui,
            passivamente: <strong>far sentire</strong>. Il bambino lo rifà, quasi perfetto, al
            primo tentativo.
          </p>
        </div>
        <p className="lede">
          Tre tentativi, tre canali — solo il terzo ha funzionato del tutto. L&apos;istruttore non
          aveva sbagliato metodo le prime due volte: aveva solo usato, in fila, i suoi due canali
          più comodi.
        </p>
        <div className="card scene">
          <div className="who">Lo stesso istruttore, quella sera, con un collega nuovo</div>
          <p>
            Deve spiegargli come organizzare il materiale a bordo vasca prima di un turno con i
            piccoli. Comincia subito a parlare — elenca, descrive, specifica ogni dettaglio a
            voce. Il collega annuisce, ma alla prima lezione vera dimentica metà delle cose.
            È lo stesso automatismo di prima, ma capovolto. Con il bambino, l&apos;istruttore mostra
            o fa sentire prima, e dice dopo. Con l&apos;adulto va dritto al «dire» — un canale che
            in acqua usa poco, ma che con le persone, fuori dall&apos;acqua, gli viene naturale.
            Solo quando gli mostra fisicamente dove va ogni cosa, il collega la ricorda davvero.
          </p>
        </div>
        <p className="lede">
          La stessa persona, due canali diversi, secondo il contesto — non secondo una scelta
          consapevole. È esattamente il tipo di automatismo che il test di oggi comincia a
          mostrare.
        </p>
        <p className="prompt">
          Pensa all&apos;ultima volta che hai dovuto spiegare qualcosa e non è arrivato subito.
          Cosa hai fatto per primo — mostrato, detto, o guidato con le mani? E la seconda mossa era
          diversa dalla prima, o la stessa ripetuta più forte?
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota per la correzione, non mostrata all'istruttore: non c'è una risposta giusta. Il
            sistema guarda una cosa sola: se la seconda mossa era diversa dalla prima, o era la
            stessa ripetuta più forte. */}
      </>
    ),
  },

  // 4 — il test VAK vero
  {
    day: "mercoledì · il test",
    pct: 50,
    nextLabel: "Vedi il tuo profilo ▸",
    showBack: true,
    canNext: (a) => !!a.v1 && !!a.v2 && !!a.v3 && !!a.v4 && !!a.v5 && !!a.v6,
    onLeave: computeVakProfile,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercoledì — il test</div>
        <h1>Il test VAK</h1>
        <p className="lede">
          Non ci sono risposte giuste o sbagliate: ogni domanda chiede cosa faresti — o cosa
          ricordi — per primo.
        </p>
        {V_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v) => setResponse(q.key, v)} />
          </div>
        ))}
        <p className="lede" style={{ fontStyle: "italic", fontSize: ".82rem" }}>
          Rappresentativo — l&apos;insieme completo delle domande arriva in fase tecnica.
        </p>
      </>
    ),
  },

  // 5 — mercoledì: controllo di fine giornata sul risultato appena uscito
  {
    day: "mercoledì · sul risultato",
    pct: 62,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controllo di fine giornata — sul tuo risultato</div>
          <h1>Guarda il tuo profilo appena uscito</h1>
          <VakBars vak={vak} />
          <p className="prompt">
            Pensa a un allievo che segui da un po&apos; di tempo: con lui, quale dei tre canali usi
            meno — proprio quello più basso nel tuo profilo?
          </p>
          <Field id="q8a" value={answers.q8a ?? ""} onChange={(v) => setReflection("q8a", v)} />
          {/* Nota per la correzione, non mostrata all'istruttore: non è una domanda con una
              risposta giusta o sbagliata: è la prima volta che il profilo tocca un bambino vero,
              non solo la teoria. Il sistema registra se sta collegando il dato astratto a una
              persona reale — è esattamente il passo che serve per usarlo davvero, e non
              lasciarlo un numero. */}
          <p className="prompt">
            Un piccolo passo in più. Adesso che hai nominato quel canale, scrivi una situazione
            concreta — la prossima settimana, con quello stesso allievo — in cui proverai a
            usarlo apposta, anche se non ti viene naturale.
          </p>
          <Field id="q8b" value={answers.q8b ?? ""} onChange={(v) => setReflection("q8b", v)} />
          {/* Nota per la correzione, non mostrata all'istruttore: il sistema non giudica se ci
              riesce: guarda solo se la situazione descritta è concreta (un momento preciso, un
              esercizio preciso) e non generica («ci proverò più spesso»). Un'intenzione generica
              si dimentica al primo imprevisto del turno — una concreta resta. */}
        </>
      );
    },
  },

  // 6 — venerdì sintesi (profilo vero)
  {
    day: "venerdì · 7 min",
    pct: 78,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => a.cv === "giusta",
    render: ({ answers, setResponse }: StepContext) => {
      const vak = computeVak(answers as never);
      const noun = VAK_NOUN[vak.prevalente];
      const adj = VAK_ADJ[vak.prevalente];
      const cvFeedback: ReactNode =
        answers.cv === "giusta" ? (
          <div className="feedback ok">Esatto — un&apos;abitudine si allarga, un&apos;etichetta resta incollata.</div>
        ) : answers.cv === "sbagliata" ? (
          <div className="feedback retry">Non è sbagliato essere corti — è sbagliato dire che è chi sei. Riprova.</div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Venerdì</div>
          <h1>Il tuo profilo</h1>
          <p className="lede">
            Ecco come si legge, e come non si legge, il tuo risultato — quello vero, appena
            calcolato dalle tue risposte.
          </p>
          <VakBars vak={vak} />
          <div className="card quote">
            Il tuo profilo mostra una prevalenza verso il <strong>{noun}</strong>. Non significa
            che tu non sappia usare gli altri canali — significa che, sotto pressione, è la prima
            cosa a cui pensi.
          </div>
          <p className="prompt">Quale frase useresti per raccontare il tuo risultato a un collega?</p>
          <OptionGroup
            name="cv"
            options={[
              { value: "giusta", label: `«Il tuo profilo mostra una prevalenza verso il ${noun}» — descrive un'abitudine`, correct: true },
              { value: "sbagliata", label: `«Sei un istruttore ${adj}» — è più corta`, correct: false },
            ]}
            selected={answers.cv}
            onPick={(v, correct) => setResponse("cv", v, correct)}
          />
          {cvFeedback}
        </>
      );
    },
  },

  // 7 — risultato + turno in vasca
  {
    day: "venerdì · risultato",
    pct: 92,
    nextLabel: "Vai alla Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow">§11 · Risultato</div>
          <h1>Il tuo profilo si crea, oggi</h1>
          <p className="lede">
            Da qui in avanti, ogni capitolo chiude con una tabella come questa: quattro fotografie
            diverse della stessa competenza, non un voto unico — quanto sai (dal test), quanto sai
            applicarlo per iscritto, come te la cavi in una scena simulata, quanto rifletti su un
            turno vero. Restano scritti con il loro nome tecnico per trasparenza.
          </p>
          <div className="card">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Punteggio</th>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Da cosa nasce oggi</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    application_score
                  </td>
                  <td style={{ padding: "6px 0" }}>La tua risposta al §7 — hai cambiato strategia o l&apos;hai ripetuta?</td>
                  <td style={{ textAlign: "right" }}>registrato ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    VAK — profilo iniziale
                  </td>
                  <td style={{ padding: "6px 0" }}>Le risposte del test §8</td>
                  <td style={{ textAlign: "right" }}>{capitalize(VAK_NOUN[vak.prevalente])} ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    reflection_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Non ancora — non c&apos;è ancora un turno in vasca da raccontare</td>
                  <td style={{ textAlign: "right", color: "var(--ink-soft)" }}>non ancora</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Il tuo turno in vasca</h2>
          <p className="lede">
            Questa settimana non cambiare niente. Solo conta quante volte spieghi la stessa cosa
            nello stesso identico modo, a bambini diversi. Il numero che trovi non è un voto. È il
            punto di partenza.
          </p>
          <p className="lede" style={{ fontStyle: "italic" }}>
            Se non hai un turno questa settimana: fai lo stesso esercizio ripensando all&apos;ultima
            settimana di lavoro che ricordi bene.
          </p>
        </>
      );
    },
  },

  // 8 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="done-badge">✓ Capitolo 1 completato</div>
          <div className="eyebrow">Settimana 1 di 10 · Capitolo 2 in arrivo</div>
          <h1>Chi ho davanti</h1>
          <p className="lede">
            Oggi hai guardato te stesso. La settimana prossima impari a guardare il bambino che hai
            davanti.
          </p>
          <h2>Il tuo profilo VAK</h2>
          <VakBars vak={vak} />
          <ChapterDiarySection answers={answers} keys={DIARY_KEYS} />
          <h2>Il tuo progresso</h2>
          <div className="chip-grid">
            <div className="chip in-sviluppo">
              <span className="name">1 · Consapevolezza personale</span>
              <span className="state">in sviluppo</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">2 · Riconoscimento dell&apos;allievo</span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">3 · Osservare e interpretare <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">4 · Sintonia</span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">5 · Consegne e congruenza</span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">6 · Verificare con l&apos;azione <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">7 · Il ritorno</span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">8 · Cambiare strada</span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">9 · Situazioni difficili</span>
              <span className="state">non acquisita</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">10 · Autonomia</span>
              <span className="state">non acquisita</span>
            </div>
          </div>
        </>
      );
    },
  },
];
