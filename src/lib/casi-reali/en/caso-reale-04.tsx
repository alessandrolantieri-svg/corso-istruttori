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

// English translation of caso-reale-04.tsx — same chapterId/response keys/internal values as the
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
      "You look for the cause before insisting — you get closer, slow the pace down, calmly ask him if he's tired or would rather have a simpler game",
  },
  { value: "B", label: "You insist on the planned exercise, maybe with a firmer tone or by promising a reward" },
];
const REC_OPTIONS: Option[] = [
  {
    value: "abbassi",
    label: "You stop, lower your expectations, and offer him something much simpler and more playful, without mentioning the earlier exercise again",
  },
  { value: "insisti", label: "You keep insisting on the exercise, waiting for the crying to pass on its own" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Samuele opens up a little: \"...I'm tired.\" It wasn't a refusal of the water, it was a 4-year-old at the end of his energy — and at this age, saying it with a \"no\" is normal.",
  },
  B: {
    ok: false,
    text: "Samuele shuts down further, repeats \"no\" more forcefully, and starts crying.",
  },
};

const REC_FEEDBACK: Record<"abbassi" | "insisti", { ok: boolean; text: string }> = {
  abbassi: {
    ok: true,
    text: "Samuele calms down, slowly. He won't do the planned exercise today — but he comes back to being in the water with you, and that's already a lot.",
  },
  insisti: {
    ok: false,
    text: "Samuele stays shut down for the rest of the lesson — the episode hasn't been resolved, it's just stopped.",
  },
};

export const casoReale04StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 04",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 04</div>
        <h1>The Child Who Refuses the Instruction</h1>
        <p className="lede">
          Age 3-5. Competencies: difficult situations (Ch. 9) · rapport (Ch. 4). At this age &quot;won&apos;t do
          it&quot; is rarely social defiance — more often it&apos;s overload: too many things at once, not enough
          ability to say so in words.
        </p>
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
          <h1>Samuele, 4 years old</h1>
          <p className="lede">
            On the third exercise of the lesson, he crosses his arms and says, in a small but decisive voice:
            &quot;no, I won&apos;t do it.&quot; He&apos;s not angry with you — he just seems worn out.
          </p>
          <p className="prompt">
            What do you do — not what you say to talk him into it, but what do you do to understand what&apos;s
            behind that &quot;no&quot;?
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
      const rec = answers.rec as "abbassi" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
          <h1>Samuele is crying, sitting on the edge</h1>
          <p className="lede">He no longer responds to requests.</p>
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
          What do you take with you, for the next time a young child says &quot;no&quot; without seeming angry?
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
      const esito = o === "A" ? "handled on the first try" : answers.rec === "abbassi" ? "got it wrong, but recovered" : "got it wrong, not recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who Refuses the Instruction</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Difficult situations (Ch. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Not every &quot;no&quot;, at 3-5, is a relationship problem to solve — sometimes it&apos;s just a
            simple way of saying something true: that&apos;s enough, for today.
          </p>
        </>
      );
    },
  },
];
