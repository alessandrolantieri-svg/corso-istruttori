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

// Porta 1:1 situOutcome() del mockup caso-reale-13.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You take the question seriously and offer him a real, limited choice, not a symbolic one (\"you choose which of the two leg exercises we do first, the rest stays as programmed\"), with a tone that says you actually thought about it",
  },
  {
    value: "B",
    label:
      "You answer in a technically correct but curt way (\"I do the programming, there's a reason for every exercise\"), true in content but said without stopping, almost annoyed",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Andrea chooses, with more attention than he would have put into an imposed exercise — the choice itself wasn't the point, being taken seriously was.",
  },
  B: {
    ok: false,
    text: "Andrea doesn't push back, but stays distant for the rest of the lesson. The answer he got was right in content, but delivered in a brisk, almost annoyed tone. The words said one thing, the tone another — and that made him stop trusting it.",
  },
};

export const casoReale13StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 13",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 13 · last in the library</div>
        <h1>The Teenager Who Wants to Be Treated Like an Adult</h1>
        <p className="lede">
          Ages 14-18. Competencies: age-appropriate communication (Ch. 2) · congruence (Ch. 5). Last scenario in the
          library — it closes the 3-18 arc that began with Nicolò, 4 years old, who only needed to be looked in
          the eye.
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
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Andrea, 16 years old</h1>
          <p className="lede">
            He asks you, not to argue but for real: &quot;why don&apos;t you ever let me choose anything about
            the programming? I know very well what I need to improve.&quot;
          </p>
          <p className="prompt">What do you say — the words, and in what tone?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "closing — the last one in the library",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing — the last one in the library</div>
        <h1>Looking back at all thirteen scenarios</h1>
        <p className="prompt">
          What do a 4-year-old who only needs to be looked in the eye, and a 16-year-old boy who asks to choose,
          have in common?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Free reflection, not scored.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "how to read this",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "handled on the first try" : "not handled — the request stays on the table";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> The library of 13 Real Cases is complete</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Teenager Who Wants to Be Treated Like an Adult</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Age-appropriate communication + congruence</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <div className="card quote">
            The thread that runs through the whole library, from the first scenario to the last: at every age the
            request takes a different shape — a look, a question, a &quot;why&quot; — but it&apos;s always the same
            thing: feeling seen for who you are in that moment, not for your age.
          </div>
        </>
      );
    },
  },
];
