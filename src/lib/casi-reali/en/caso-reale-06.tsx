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

// Porta 1:1 situOutcome() del mockup caso-reale-06.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You watch a short first attempt before letting him carry on — even though he sounds sure, you ask him to show you just the first few metres",
  },
  { value: "B", label: "You trust the confidence in his voice and let him go for the whole exercise" },
];

export const casoReale06StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 06",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 06</div>
        <h1>The Child Who Says He Already Knows How</h1>
        <p className="lede">Ages 6-10. Competency: verifying through action (Ch. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />).</p>
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
          <h1>Filippo, 9 years old</h1>
          <p className="lede">
            You&apos;ve just explained how to keep the body extended during the glide. He says, with total
            confidence: &quot;yeah yeah, I know how to do it, I always do it like that.&quot;
          </p>
          <p className="prompt">What do you do — before letting him go for the whole pool length?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Filippo glides — his body curves slightly halfway through. He hadn&apos;t even noticed it himself,
              because he felt too confident. You catch it right away, before it becomes a habit.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Filippo swims the whole length repeating the same mistake the entire way. If you had corrected it
              right away, it would have taken a moment. Caught only now, it&apos;s already become a habit — and
              habits are harder to fix.
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
        <p className="prompt">What do you take with you, next time a student answers you with total confidence?</p>
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
      const esito = o === "A" ? "handled on the first try" : "not handled — the correction came late";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who Says He Already Knows How</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Verifying through action (Ch. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            How confident a child sounds is no more reliable than a &quot;yes, I got it&quot;: Chapter 6 says
            it about uncertainty, but the same holds in reverse — confidence needs verifying through action
            too, not taking at face value.
          </p>
        </>
      );
    },
  },
];
