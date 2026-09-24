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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-09.html.
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
      "You switch channel anyway, even though telling had always worked with her so far, because what you're using isn't working",
  },
  { value: "B", label: "You keep going in words, because it had always been enough with her so far, rephrasing it again" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "You finally switch channel (demonstration, or guided physical contact)" },
  { value: "parole", label: "You keep insisting in words, maybe more slowly" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "You show her the movement slowly in the water, in front of her. On the next attempt, something clicks. It's not that talking doesn't work with her anymore in general: it's just that this one detail needed a different way of being explained.",
  },
  B: {
    ok: false,
    text: "Camilla gets it wrong a third time, the same way. The fact that \"telling\" usually works with her doesn't mean it works every time, with every detail.",
  },
};

const REC_FEEDBACK: Record<"cambia" | "parole", { ok: boolean; text: string }> = {
  cambia: {
    ok: true,
    text: "The next attempt improves. There was no guarantee the right channel would be different from her usual one. That's exactly why the full repertoire matters even with students who usually respond well to just one way.",
  },
  parole: {
    ok: false,
    text: "Camilla keeps getting it wrong, and starts to look more tired of the attention than of the mistake itself.",
  },
};

export const casoReale09StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 09",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 09</div>
        <h1>The Girl Who Repeats the Same Mistake</h1>
        <p className="lede">
          Ages 11-13. Competency: changing course (Ch. 8) — repertoire, with a girl for whom telling
          had always been enough, so far.
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
    pct: 20,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Camilla, 13 years old</h1>
          <p className="lede">
            With her, verbal explanations have always worked so far. But on one detail
            of the breaststroke arm pull, after two detailed verbal explanations, she keeps getting it wrong
            the exact same way.
          </p>
          <p className="prompt">What do you do — given that telling had always been enough so far?</p>
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
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "cambia" | "parole" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
          <h1>Three identical attempts</h1>
          <p className="lede">All with the same verbal explanation.</p>
          <p className="prompt">What do you do now?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — chiusura
  {
    day: "closing",
    pct: 75,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing</div>
        <h1>What you take with you</h1>
        <p className="prompt">
          What do you take with you, next time a channel that had always worked stops working on one
          specific detail?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Free reflection, not scored.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "how to read this",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "handled on the first try" : answers.rec === "cambia" ? "got it wrong, but recovered (late)" : "got it wrong, not recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Girl Who Repeats the Same Mistake</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Changing course (Ch. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Chapter 8 says it explicitly: a channel that worked with a child on one exercise doesn&apos;t close
            the repertoire — it worked for that moment, it doesn&apos;t mean it will always work with them.
          </p>
        </>
      );
    },
  },
];
