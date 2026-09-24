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

// Porta 1:1 situOutcome() del mockup caso-reale-07.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  { value: "A", label: "You ask for her judgment before yours, or you stay silent and watch" },
  { value: "B", label: "You give her a technical correction anyway, out of habit, even though it isn't wrong" },
];

export const casoReale07StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 07",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 07</div>
        <h1>The Child Who Needs Autonomy</h1>
        <p className="lede">
          Ages 6-10. Competency: autonomy (Ch. 10) — applied here earlier than in the usual examples, to
          show it isn&apos;t only a competency for older students.
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Vittoria, 10 years old</h1>
          <p className="lede">
            For a month now she&apos;s been getting the water entry right, no mistakes, the one you used to
            correct every single time. She&apos;s about to do it again in front of you, as always.
          </p>
          <p className="prompt">What do you do, before she performs it?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Vittoria performs it, then looks at you: &quot;...I think I entered well. Is that right?&quot;
              — she&apos;d already given her own judgment before asking for yours.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Vittoria: &quot;...ok.&quot; She does it again waiting, as always, for your final verdict.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "closing",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing</div>
        <h1>What you take with you</h1>
        <p className="prompt">
          What do you take with you, next time a student already knows how to do well something you used
          to correct every time?
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
      const esito = o === "A" ? "handled on the first try" : "a missed opportunity, not a serious mistake";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who Needs Autonomy</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Autonomy (Ch. 10)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Autonomy isn&apos;t a competency that only applies at the end of the journey, with the older
            students: a 10-year-old who already does something well has the same need — being left to judge
            themselves — as a long-standing student.
          </p>
        </>
      );
    },
  },
];
