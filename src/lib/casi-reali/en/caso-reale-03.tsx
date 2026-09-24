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

// English translation of caso-reale-03.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
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
      "You recognize the fear (tense shoulders, eyes fixed on the water, not on you) and approach without pressing her, offering your hand without saying \"get in\"",
  },
  {
    value: "B",
    label: "You read the pause as a whim or distraction and try to talk her into it (\"come on, you already know how to do this, you've done it lots of times\")",
  },
];
const REC_OPTIONS: Option[] = [
  { value: "tempo", label: "You stop, get down to her level and give her time, without more words of persuasion" },
  { value: "insisti", label: "You keep insisting with words, maybe promising something in return" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Beatrice doesn't move right away, but after a moment shifts her weight toward you — feeling unpressed, she starts to trust you.",
  },
  B: {
    ok: false,
    text: "Beatrice tenses up more — words weren't the problem, and insisting to convince her doesn't touch the real fear.",
  },
};

const REC_FEEDBACK: Record<"tempo" | "insisti", { ok: boolean; text: string }> = {
  tempo: {
    ok: true,
    text: "After a moment of shared silence, Beatrice shifts one foot. She wasn't convinced — she was given the space she needed.",
  },
  insisti: {
    ok: false,
    text: "Beatrice goes in, but holding tightly to the edge for the whole lesson — she gave in, she didn't feel understood.",
  },
};

export const casoReale03StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 03",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 03</div>
        <h1>The Child Who&apos;s Afraid</h1>
        <p className="lede">Age 3-5. Competencies: watching and understanding (Ch. 3) · rapport (Ch. 4).</p>
        <div className="card">
          Short, self-contained scenario — it has no exam score: it&apos;s material you can come back to whenever you
          want.
        </div>
      </>
    ),
  },

  // 1 — situation
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
          <h1>Beatrice, 5 years old</h1>
          <p className="lede">
            First lesson after the break. At the poolside she freezes, won&apos;t get in: shoulders tight, eyes fixed
            on the water, not seeking you out with her gaze. She doesn&apos;t cry, doesn&apos;t say anything.
          </p>
          <p className="prompt">
            Which cause seems most likely to you — and what do you do to check it, not what do you ask her in words?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recovery, only if outcome B
  {
    day: "recovery",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "tempo" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
          <h1>Beatrice is still frozen, now more tense</h1>
          <p className="prompt">What do you do now?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — closing
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
          What do you take with you from this scenario, for the next time a young child freezes up in silence?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Free reflection, it doesn&apos;t count toward any score.
        </p>
      </>
    ),
  },

  // 4 — how to read this
  {
    day: "how to read this",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "handled on the first try" : answers.rec === "tempo" ? "got it wrong, but recovered" : "got it wrong, not recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who&apos;s Afraid</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Watching and understanding (Ch. 3)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            A frightened child&apos;s silence isn&apos;t a gap to fill with more words — it&apos;s information, and
            the right response always starts with how you read it, not with what you say.
          </p>
        </>
      );
    },
  },
];
