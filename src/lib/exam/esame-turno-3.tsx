import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

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

// Porta 1:1 beat1Outcome()/needsBeat2A()/matteoRecovered()/beat2Attention() del mockup
// esame-turno3.html: esito Beat 1: A = ragione reale + tono coerente, B = ragione reale + tono
// incongruente, D = nessuna ragione reale.
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
function matteoRecovered(a: Record<string, string>): boolean {
  return a.beat2a === "recupero";
}
type Beat2Attention = "libera" | "divisa";
function beat2Attention(a: Record<string, string>): Beat2Attention {
  const o = beat1Outcome(a);
  if (o === "A") return "libera";
  if (o === "D") return matteoRecovered(a) ? "libera" : "divisa";
  return "divisa"; // B
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Dai un motivo legato a un beneficio concreto («ti allunga la bracciata, prova e senti la differenza») con un tono che dice che ti importa davvero della risposta",
  },
  {
    value: "B",
    label:
      "Dici la cosa giusta («è utile per te») ma sospirando, guardando altrove, con un tono sbrigativo che dice «non ho tempo per questo»",
  },
  {
    value: "D",
    label: "«Perché lo dico io» o «dai, non fare storie, si fa e basta» — nessuna ragione reale",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "recupero",
    label:
      "Riconosci di non aver dato un motivo vero, e lo dai adesso («hai ragione, fermati un attimo — te lo dico sul serio...»)",
  },
  { value: "insisti", label: "Insisti sull'autorità («si fa perché lo dico io, punto»)" },
];
const ELENA_OPTIONS: Option[] = [
  { value: "silenzio", label: "Le chiedi il giudizio, o resti in silenzio lasciando che sia lei a valutarsi" },
  { value: "corregge", label: "La correggi comunque, per abitudine, anche se l'osservazione è giusta" },
];
const TONO_OPTIONS: Option[] = [
  {
    value: "congruente",
    label:
      "Ritorno specifico e congruente — es. «hai spinto con le gambe alla virata, si è vista la differenza», detto guardandolo",
  },
  {
    value: "tradisce",
    label: "Ritorno tecnicamente giusto ma il tono lo tradisce — sarcastico, sbrigativo, o detto mentre già ti allontani",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Matteo esegue le ripetute con un impegno visibile — non perfetto, ma reale. Alla fine dice: «...ok, in effetti si sente diverso.»",
  },
  B: {
    ok: false,
    text: "Matteo esegue, ma a metà: le parole dicevano una cosa, il tono un'altra, e lui si è fermato a quella contraddizione invece che al contenuto. «Va bene, come vuoi» — lo fa, ma senza cercarci niente.",
  },
  D: {
    ok: false,
    text: "Matteo fa un giro fiacco, senza spingere davvero — non è un rifiuto aperto, è il minimo indispensabile. Un ragazzo di 14-18 anni, senza un motivo, non esegue davvero (Capitolo 2) — esegue solo quel tanto che basta per non farsi notare.",
  },
};

const BEAT2A_FEEDBACK: Record<"recupero" | "insisti", { ok: boolean; text: string }> = {
  recupero: {
    ok: true,
    text: "Matteo rallenta, ti guarda — un po' sorpreso che sia tornato sull'argomento invece di lasciar perdere. Al giro successivo, spinge di più.",
  },
  insisti: {
    ok: false,
    text: "Matteo non risponde, ma il resto dell'allenamento lo fa staccato, silenzioso, al minimo.",
  },
};

const ELENA_FEEDBACK: Record<"silenzio" | "corregge", { ok: boolean; text: string }> = {
  silenzio: {
    ok: true,
    text: "ELENA: «...credo di aver tenuto meglio l'assetto stavolta. È vero?» — ha già dato il suo giudizio prima di chiedere il tuo.",
  },
  corregge: {
    ok: false,
    text: "ELENA: «...ok.» — esegue di nuovo aspettando, come sempre, il tuo verdetto finale.",
  },
};

const TONO_FEEDBACK: Record<"congruente" | "tradisce", { ok: boolean; text: string }> = {
  congruente: {
    ok: true,
    text: "Matteo annuisce, non dice molto — ma al giro successivo lo sforzo resta.",
  },
  tradisce: {
    ok: false,
    text: "Matteo si richiude — le parole dicevano una cosa, il tono un'altra, e la contraddizione lo ha fatto smettere di fidarsi.",
  },
};

const BEAT2_ATTENTION_TEXT: Record<Beat2Attention, string> = {
  libera: "L'attenzione è libera, puoi seguire Elena senza distrazioni.",
  divisa:
    "Un occhio resta su Matteo, che nuota comunque senza impegno lì vicino: dare a Elena l'attenzione calma che merita costa di più quando una parte di te sta ancora monitorando lui.",
};

export const esameTurno3Steps: Step[] = [
  // 0 — intro
  {
    day: "prima di cominciare",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Esame finale · Turno 3</div>
        <h1>Gli adolescenti, e chi ormai sa fare da solo</h1>
        <p className="lede">
          Sei con un gruppo di ragazzi 14-18 anni. Il riscaldamento prevede ripetute di virata — non il preferito di
          nessuno. <strong>Matteo (16 anni)</strong> è nel gruppo da qualche mese. <strong>Elena (17 anni)</strong> ti
          segue da tre anni: sulla virata, ormai, non hai più bisogno di guardarla ogni volta.
        </p>
        <div className="card warn">
          Non è un capitolo. Non c&apos;è un tasto «prossima domanda». C&apos;è solo quello che succede dopo quello
          che scegli.
        </div>
        <p className="lede">
          Come nei turni precedenti: il turno è diviso in <strong>beat</strong> — i momenti della
          stessa scena, uno dopo l&apos;altro — e il voto va da 80 a 100, con il{" "}
          <strong>100 e lode</strong> riservato a chi sa anche recuperare bene un errore in tempo
          reale.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Il perché</div>
          <h1>«Perché dobbiamo sempre fare questo esercizio, è noioso.»</h1>
          <p className="lede">
            Matteo si ferma, non incrocia le braccia come farebbe un dodicenne — è più una domanda vera che una
            sfida.
          </p>
          <p className="prompt">Cosa rispondi — le parole che usi, e con che tono?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recupero",
    pct: 24,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.beat2a as "recupero" | "insisti" | undefined;
      const fb = val ? BEAT2A_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2A · solo perché non hai dato una ragione reale</div>
          <h1>Matteo al minimo</h1>
          <p className="lede">
            Matteo continua a nuotare al minimo, staccato dal gruppo di un metro, senza spingere.
          </p>
          <p className="prompt">Hai un secondo bivio. Cosa fai adesso?</p>
          <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — beat2, la virata di Elena
  {
    day: "beat 2 — Elena",
    pct: 40,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2 && !!a.elena,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const attn = beat2Attention(answers);
      const val = answers.elena as "silenzio" | "corregge" | undefined;
      const fb = val ? ELENA_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2 · Lasciarla andare</div>
          <h1>La virata di Elena</h1>
          <p className="lede">
            Nel frattempo, indipendentemente da come è andata con Matteo — è un problema scollegato, non una
            conseguenza — arriva il momento di Elena. Completa una virata tecnicamente pulita, quella che un anno fa
            correggevi quasi ogni volta. Oggi non ne ha avuto bisogno.
          </p>
          <div className="card">{BEAT2_ATTENTION_TEXT[attn]}</div>
          <p className="prompt">Cosa le dici, subito dopo la virata?</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="elena" options={ELENA_OPTIONS} selected={answers.elena} onPick={(v) => setResponse("elena", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 4 — beat3, congruenza sotto pressione
  {
    day: "beat 3 — Matteo",
    pct: 60,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.tono,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.tono as "congruente" | "tradisce" | undefined;
      const fb = val ? TONO_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 3 · Congruenza sotto pressione</div>
          <h1>Il primo sforzo vero di Matteo, oggi</h1>
          <p className="lede">
            Verso la fine del turno, Matteo — in qualunque versione tu sia arrivato — prova per la prima volta oggi un
            tentativo con impegno reale. Anche nella versione «Matteo staccato», qualcosa lo smuove: vede Elena
            ricevere fiducia invece di correzioni, e ci prova. L&apos;esecuzione non è perfetta, ma c&apos;è, per la
            prima volta oggi, uno sforzo vero.
          </p>
          <p className="prompt">
            Scrivi cosa gli dici — deve restare coerente: le parole, il tono e quello che il tuo corpo comunica
            devono dire la stessa cosa.
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="tono" options={TONO_OPTIONS} selected={answers.tono} onPick={(v) => setResponse("tono", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "chiusura",
    pct: 82,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura del Turno 3 — l&apos;ultimo dei tre</div>
        <h1>Guardando indietro ai tre turni insieme</h1>
        <p className="prompt">
          Cosa hai imparato su te stesso come istruttore, che non sapevi guardando solo i dieci capitoli uno alla
          volta?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Questa riflessione non entra nel punteggio: è l&apos;ultima prima dell&apos;esito finale dell&apos;esame.
        </p>
      </>
    ),
  },

  // 6 — risultato
  {
    day: "risultato",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c2 = o === "D" ? (matteoRecovered(answers) ? "sbagliata, ma recuperata" : "sbagliata, non recuperata") : "gestita";
      const b1c5 = o === "A" ? "tono coerente" : o === "B" ? "tono incongruente" : "nessuna ragione data";
      const b3c5 = answers.tono === "congruente" ? "ritorno congruente" : "tono che tradisce le parole";
      const c10 = answers.elena === "silenzio" ? "gestita" : "occasione persa, non un errore grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 3 completato</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> I tre turni sono chiusi</div>
          <div className="eyebrow">Come si legge il risultato</div>
          <h1>Gli adolescenti, e chi ormai sa fare da solo</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C2 · Comunicazione per età (14-18)</span>
              <span className="esito">{c2}</span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Congruenza</span>
              <span className="esito">
                Beat 1: {b1c5} · Beat 3: {b3c5}
              </span>
            </div>
            <div className="result-row">
              <span className="comp">C10 · Autonomia</span>
              <span className="esito">{c10}</span>
            </div>
          </div>
          {o === "D" && matteoRecovered(answers) && (
            <div className="card quote">
              Fare marcia indietro su un ordine dato male, davanti al ragazzo che ti ha messo alla prova, senza
              perdere la faccia e senza fare una scenata: è un buon recupero, fatto sotto osservazione. Proprio il
              tipo di prova che serve per il 100 e lode.
            </div>
          )}
          <p className="lede">
            Il turno si chiude comunque, qualunque strada tu abbia preso — coerente con «non si può fallire, solo
            rimandare». Con questo, tutti e tre i turni dell&apos;esame finale sono completati.
          </p>
        </>
      );
    },
  },
];
