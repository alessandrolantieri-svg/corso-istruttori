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

// Porta 1:1 situOutcome()/needsRecupero()/recuperato()/needsScelta2() del mockup caso-reale-08.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}
function recuperato(a: Record<string, string>): boolean {
  return a.rec === "nomini";
}
function needsScelta2(a: Record<string, string>): boolean {
  return situOutcome(a) === "A" || (situOutcome(a) === "B" && recuperato(a));
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Riconosci la frustrazione (non rifiuto, non stanchezza fisica) e la nomini con calma prima di tornare alla tecnica («è frustrante, lo vedo. Riproviamo una cosa piccola, non tutto insieme»)",
  },
  { value: "B", label: "Vai dritto alla correzione tecnica, senza riconoscere cosa sta provando" },
];
const REC_OPTIONS: Option[] = [
  { value: "nomini", label: "Torni indietro e nomini quello che vedi, prima di tornare alla tecnica" },
  {
    value: "tecnica",
    label: "Insisti solo sulla tecnica, sperando che un tentativo riuscito risolva la frustrazione",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Davide alza lo sguardo, sorpreso di essere stato notato prima di essere corretto. Annuisce, e riprova con meno tensione nelle spalle.",
  },
  B: {
    ok: false,
    text: "Davide esegue di nuovo, meccanicamente, senza cercare di correggersi. Nessuno ha detto a voce alta cosa sta provando, e quella frustrazione comincia a somigliare a rassegnazione.",
  },
};

const REC_FEEDBACK: Record<"nomini" | "tecnica", { ok: boolean; text: string }> = {
  nomini: {
    ok: true,
    text: "Davide si scioglie un po': «...è che non mi viene mai.» Ora che è stato detto, puoi lavorarci.",
  },
  tecnica: {
    ok: false,
    text: "Davide continua a eseguire senza impegno reale — la frustrazione non affrontata è diventata disinteresse.",
  },
};

export const casoReale08Steps: Step[] = [
  // 0 — intro
  {
    day: "caso reale 08",
    pct: 0,
    nextLabel: "Inizia ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casi Reali · Scenario 08</div>
        <h1>Il ragazzo che sbaglia e si chiude</h1>
        <p className="lede">
          Fascia 11-13. Competenze: osservare e interpretare (Cap. 3) · il ritorno (Cap. 7) — reframing
          dell&apos;errore.
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
    pct: 16,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situazione</div>
          <h1>Davide, 12 anni</h1>
          <p className="lede">
            Al quarto tentativo consecutivo di una virata, sbaglia di nuovo. Non protesta, non rifiuta — batte
            una mano sull&apos;acqua e distoglie lo sguardo, le spalle curve.
          </p>
          <p className="prompt">Cosa fai — cosa noti prima, e cosa fai per primo?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recupero",
    pct: 34,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "nomini" | "tecnica" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recupero · solo perché non ha funzionato</div>
          <h1>Davide esegue meccanicamente</h1>
          <p className="lede">Senza più provare a correggersi.</p>
          <p className="prompt">Cosa fai adesso?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Cosa fai davvero, in pratica</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — scelta2, il ritorno dopo il tentativo riuscito, solo se needsScelta2
  {
    day: "scelta 2 — il ritorno",
    pct: 55,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    visible: (a) => needsScelta2(a),
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Scelta 2 · Il ritorno, dopo il tentativo riuscito</div>
        <h1>Davide riprova</h1>
        <p className="lede">E questa volta la virata è quasi corretta.</p>
        <p className="prompt">Scrivi il ritorno che gli dai — specifico, non un «bravo» generico.</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — chiusura
  {
    day: "chiusura",
    pct: 80,
    nextLabel: "Continua ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Chiusura</div>
        <h1>Cosa porti con te</h1>
        <p className="prompt">
          Cosa porti con te, la prossima volta che un ragazzo di 11-13 anni non protesta ma smette di provare a
          correggersi?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Riflessione libera, non entra in punteggio.
        </p>
      </>
    ),
  },

  // 5 — come si legge
  {
    day: "come si legge",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gestita al primo colpo" : recuperato(answers) ? "sbagliata, ma recuperata" : "sbagliata, non recuperata";
      const showScelta2 = needsScelta2(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completato</div>
          <div className="eyebrow">Come si legge questo scenario</div>
          <h1>Il ragazzo che sbaglia e si chiude</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Osservare e interpretare (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
            {showScelta2 && (
              <div className="result-row">
                <span className="comp">Il ritorno (Cap. 7)</span>
                <span className="esito">registrato <i className="ph-duotone ph-check" aria-hidden="true" /></span>
              </div>
            )}
          </div>
          <p className="lede">
            A 11-13 anni la frustrazione spesso non si dice a parole: si vede nel gesto (la mano sull&apos;acqua, lo
            sguardo altrove) prima che nella voce. L&apos;istruttore deve accorgersene prima di correggere
            l&apos;errore.
          </p>
        </>
      );
    },
  },
];
