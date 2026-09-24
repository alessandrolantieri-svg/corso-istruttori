import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Write here..."
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
      "You recognize the frustration (not refusal, not physical tiredness) and name it calmly before going back to the technique (\"it's frustrating, I can see it. Let's try one small thing, not all at once\")",
  },
  { value: "B", label: "You go straight to the technical correction, without acknowledging what he's feeling" },
];
const REC_OPTIONS: Option[] = [
  { value: "nomini", label: "You step back and name what you see, before going back to the technique" },
  {
    value: "tecnica",
    label: "You keep insisting only on the technique, hoping a successful attempt will resolve the frustration",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Davide looks up, surprised to be noticed before being corrected. He nods, and tries again with less tension in his shoulders.",
  },
  B: {
    ok: false,
    text: "Davide does it again, mechanically, without trying to correct himself. No one has said out loud what he's feeling, and that frustration starts to look like resignation.",
  },
};

const REC_FEEDBACK: Record<"nomini" | "tecnica", { ok: boolean; text: string }> = {
  nomini: {
    ok: true,
    text: "Davide opens up a little: \"...it's that I never get it.\" Now that it's been said, you can work with it.",
  },
  tecnica: {
    ok: false,
    text: "Davide keeps going through the motions with no real effort — the unaddressed frustration has turned into disinterest.",
  },
};

export const casoReale08StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 08",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 08</div>
        <h1>The Boy Who Fails and Shuts Down</h1>
        <p className="lede">
          Ages 11-13. Competencies: watching and understanding (Ch. 3) · the feedback (Ch. 7) — reframing
          the mistake.
        </p>
        <div className="card">
          A short, self-contained scenario — it has no exam score: it&apos;s material you can come back to
          whenever you want.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situation",
    pct: 16,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Davide, 12 years old</h1>
          <p className="lede">
            On his fourth attempt in a row at a turn, he gets it wrong again. He doesn&apos;t protest, doesn&apos;t
            refuse — he slaps a hand on the water and looks away, shoulders hunched.
          </p>
          <p className="prompt">What do you do — what do you notice first, and what do you do first?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recovery",
    pct: 34,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "nomini" | "tecnica" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
          <h1>Davide performs mechanically</h1>
          <p className="lede">No longer trying to correct himself.</p>
          <p className="prompt">What do you do now?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — scelta2, il ritorno dopo il tentativo riuscito, solo se needsScelta2
  {
    day: "choice 2 — the feedback",
    pct: 55,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    visible: (a) => needsScelta2(a),
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Choice 2 · The feedback, after the successful attempt</div>
        <h1>Davide tries again</h1>
        <p className="lede">And this time the turn is nearly correct.</p>
        <p className="prompt">Write the feedback you give him — specific, not a generic &quot;well done&quot;.</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — chiusura
  {
    day: "closing",
    pct: 80,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing</div>
        <h1>What you take with you</h1>
        <p className="prompt">
          What do you take with you, next time an 11-13-year-old boy doesn&apos;t protest but stops trying to
          correct himself?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Free reflection, not scored.
        </p>
      </>
    ),
  },

  // 5 — come si legge
  {
    day: "how to read this",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "handled on the first try" : recuperato(answers) ? "got it wrong, but recovered" : "got it wrong, not recovered";
      const showScelta2 = needsScelta2(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Boy Who Fails and Shuts Down</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Watching and understanding (Ch. 3)</span>
              <span className="esito">{esito}</span>
            </div>
            {showScelta2 && (
              <div className="result-row">
                <span className="comp">The feedback (Ch. 7)</span>
                <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
              </div>
            )}
          </div>
          <p className="lede">
            At 11-13, frustration often doesn&apos;t come out in words: it shows in the gesture (a hand on the
            water, a gaze looking away) before it shows in the voice. The instructor needs to notice it before
            correcting the mistake.
          </p>
        </>
      );
    },
  },
];
