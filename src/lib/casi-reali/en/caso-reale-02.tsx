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

// English translation of caso-reale-02.tsx — same chapterId/response keys/internal values as the
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
      "You really get into his field of view — not just next to him, but between him and the distraction — waiting for his eyes to reach yours before you speak",
  },
  { value: "B", label: "You repeat the same instruction louder, from where you're standing, without catching his eyes" },
];
const REC_OPTIONS: Option[] = [
  { value: "sposti", label: "You physically move into his field of view and wait for eye contact before speaking" },
  { value: "voce", label: "You raise your voice again, hoping it works this time" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Nicolò looks at you. You give the instruction once, simply: \"take my hand, we'll go in together.\" He follows.",
  },
  B: {
    ok: false,
    text: "Nicolò keeps watching his friend. Your voice has become part of the background noise — he hasn't deliberately stopped listening to you, he just hasn't really heard you yet.",
  },
};

const REC_FEEDBACK: Record<"sposti" | "voce", { ok: boolean; text: string }> = {
  sposti: { ok: true, text: "Nicolò notices you, a little surprised to find you there. This time the instruction lands." },
  voce: {
    ok: false,
    text: "Nicolò turns around, but startled by the tone more than drawn in by the instruction — he goes in the water, but pulling back, not taking your hand as asked.",
  },
};

export const casoReale02StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 02",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 02</div>
        <h1>The Child Who Doesn&apos;t Listen</h1>
        <p className="lede">Age 3-5. Competencies: rapport (Ch. 4) · instructions (Ch. 5).</p>
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
          <h1>Nicolò, 4 years old</h1>
          <p className="lede">
            It&apos;s his second month of lessons. You&apos;re crouched down at his level, explaining that it&apos;s
            his turn to get in the water holding your hand. He&apos;s looking elsewhere — a friend playing with a
            kickboard — and shows no sign of having heard you.
          </p>
          <p className="prompt">What do you do, before repeating the instruction?</p>
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
      const rec = answers.rec as "sposti" | "voce" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
          <h1>Nicolò is still looking elsewhere</h1>
          <p className="lede">You&apos;ve repeated it twice, with no result.</p>
          <p className="prompt">What do you do now — something different from repeating it again?</p>
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
          What do you take with you, from this scenario, for the next time a young child seems not to be listening
          to you?
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
      const esito = o === "A" ? "handled on the first try" : answers.rec === "sposti" ? "got it wrong, but recovered" : "got it wrong, not recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who Doesn&apos;t Listen</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Rapport (Ch. 4)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            At 3-5, &quot;not listening&quot; almost always means &quot;hasn&apos;t seen me yet&quot; — the
            voice isn&apos;t the problem, it&apos;s the wrong channel: without eye contact first, the rest struggles
            to land.
          </p>
        </>
      );
    },
  },
];
