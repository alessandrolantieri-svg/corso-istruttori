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

// Porta 1:1 situOutcome() del mockup caso-reale-11.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You ask him something specific and personal about training, not generic (\"what would you really like to improve this year?\"), showing genuine interest in his answer",
  },
  { value: "B", label: "You let it go, thinking that if he does everything correctly there's no problem to address" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Simone thinks about it for a moment, surprised by the question — nobody had ever asked him in those terms. He answers with something concrete, and in the following weeks that detail becomes a real point of connection.",
  },
  B: {
    ok: false,
    text: "Simone keeps doing everything well, and staying elsewhere — the fact that there are no visible problems doesn't mean he isn't disinterested: it just means the disinterest doesn't show to the naked eye.",
  },
};

export const casoReale11StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 11",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 11</div>
        <h1>The Teenager Who Goes Through the Motions</h1>
        <p className="lede">
          Ages 14-18. Competencies: age-appropriate communication (Ch. 2) · rapport (Ch. 4). Different from the defiant
          student (Scenario 12): here there&apos;s no conflict, there&apos;s absence — harder to catch because he
          doesn&apos;t ask for anything.
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
          <h1>Simone, 15 years old</h1>
          <p className="lede">
            He does everything you ask, correctly, without a mistake — and without any visible commitment. He
            never complains, never asks questions, never looks at the clock in an obvious way. He simply seems
            elsewhere.
          </p>
          <p className="prompt">
            What do you do — with a boy who isn&apos;t asking for anything, and doesn&apos;t seem to have an
            obvious problem?
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
          What do you take with you, next time a teenager does everything without a mistake, and without seeming
          truly present?
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
      const esito = o === "A" ? "handled on the first try" : "not handled — opportunity missed today";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Teenager Who Goes Through the Motions</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Age-appropriate communication (14-18)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Silent disinterest is harder to see than open refusal: there&apos;s no exact moment when
            &quot;something happens&quot; and you realize you need to step in. Disinterest has to be sought out,
            not waited for.
          </p>
        </>
      );
    },
  },
];
