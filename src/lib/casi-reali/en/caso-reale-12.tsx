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

// Porta 1:1 situOutcome() del mockup caso-reale-12.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You recognize the opposition under the accommodating tone and name it calmly, without confrontation (\"I heard the 'whatever you say' — what's bothering you about this exercise?\")",
  },
  { value: "B", label: "You take the \"whatever you say\" at face value, or push only on technical effort (\"come on, put more energy into it\")" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Greta is thrown off for a moment — she didn't expect the sarcasm to be noticed and not used against her. She answers, more directly: \"...I honestly find it pointless.\" Now you can work with that.",
  },
  B: {
    ok: false,
    text: "Greta keeps the same accommodating tone and the same lazy execution — no one noticed her silent opposition, so she has no reason to change her attitude.",
  },
};

export const casoReale12StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 12",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 12</div>
        <h1>The Teenager Who Complies Reluctantly</h1>
        <p className="lede">
          Ages 14-18. Competency: difficult situations (Ch. 9). Different from the examples of open defiance already
          seen in Chapter 9 and in Round 2 of the exam: here the opposition doesn&apos;t raise its voice — it
          smiles, executes, and defuses everything with a tone that says something else.
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
          <h1>Greta, 17 years old</h1>
          <p className="lede">
            You give her a technical instruction. She replies: &quot;sure, whatever you say,&quot; with a smile
            and a slightly sarcastic tone, then performs a deliberately lazy version of the exercise — not wrong,
            just devoid of any effort.
          </p>
          <p className="prompt">
            Is it a technical problem or a relational one? And what do you do — not what do you say to get her to
            put in more effort?
          </p>
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
          What do you take with you, next time a refusal arrives smiling instead of defying?
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
      const esito = o === "A" ? "handled on the first try" : "not handled — signal missed today";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Teenager Who Complies Reluctantly</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Difficult situations (Ch. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Chapter 9 says refusal isn&apos;t always loud — here it goes a step further: it can even sound like
            agreement. The signal isn&apos;t in the words (&quot;whatever you say&quot; is technically a yes),
            it&apos;s in the tone and in what gets performed right after.
          </p>
        </>
      );
    },
  },
];
