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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-04.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Cerchi la causa prima di insistere — ti avvicini, abbassi il ritmo, gli chiedi con calma se è stanco o se preferisce un gioco più semplice",
  },
  { value: "B", label: "Insisti sull'esercizio previsto, magari con un tono più fermo o promettendo un premio" },
];
const REC_OPTIONS: Option[] = [
  {
    value: "abbassi",
    label: "Ti fermi, abbassi le pretese e gli offri qualcosa di molto più semplice e giocoso, senza nominare più l'esercizio di prima",
  },
  { value: "insisti", label: "Continui a insistere sull'esercizio, aspettando che il pianto passi da solo" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Samuele si scioglie un po': «...sono stanco.» Non era un rifiuto dell'acqua, era un bambino di 4 anni a fine energie — e a questa età, dirlo con un «no» è normale.",
  },
  B: {
    ok: false,
    text: "Samuele si chiude di più, ripete «no» con più forza, e comincia a piangere.",
  },
};

const REC_FEEDBACK: Record<"abbassi" | "insisti", { ok: boolean; text: string }> = {
  abbassi: {
    ok: true,
    text: "Samuele si calma, lentamente. Non farà l'esercizio previsto oggi — ma torna a stare in acqua con te, ed è già molto.",
  },
  insisti: {
    ok: false,
    text: "Samuele resta chiuso per il resto della lezione — l'episodio non si è risolto, si è solo fermato.",
  },
};

export const casoReale04Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 04",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 04</div>
        <h1>Il bambino che rifiuta la consegna</h1>
        <p className="lede">
          Fascia 3-5. Competenze: situazioni difficili (Cap. 9) · sintonia (Cap. 4). A questa età «non ci sta»
          raramente è sfida sociale — più spesso è sovraccarico: troppe cose insieme, poca capacità di dirlo a
          parole.
        </p>
        <div className="card">
          Scenario breve e autonomo — non ha un punteggio d&apos;esame: è materiale che puoi richiamare quando
          vuoi.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situazione",
    pct: 20,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Samuele, 4 anni</h1>
          <p className="lede">
            Al terzo esercizio della lezione, incrocia le braccia e dice, con voce piccola ma decisa: «no, non lo
            faccio.» Non è arrabbiato con te — sembra solo esausto.
          </p>
          <p className="prompt">
            Cosa fai — non cosa gli dici per convincerlo, ma cosa fai per capire cosa c&apos;è sotto quel «no»?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "recupero",
    pct: 45,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "abbassi" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
          <h1>Samuele piange, seduto sul bordo</h1>
          <p className="lede">Non risponde più alle richieste.</p>
          <p className="prompt">Cosa fai adesso?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — chiusura
  {
    day: "chiusura",
    pct: 75,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura</div>
        <h1>Cosa porti con te</h1>
        <p className="prompt">
          Cosa porti con te, la prossima volta che un bambino piccolo dice «no» senza sembrare arrabbiato?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Riflessione libera, non entra in punteggio.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "come si legge",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestita al primo colpo" : answers.rec === "abbassi" ? "sbagliata, ma recuperata" : "sbagliata, non recuperata";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il bambino che rifiuta la consegna</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situazioni difficili (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Non tutti i «no», a 3-5 anni, sono un problema di relazione da risolvere — a volte sono solo un modo
            semplice di dire una cosa vera: basta così, per oggi.
          </p>
        </>
      );
    },
  },
];
