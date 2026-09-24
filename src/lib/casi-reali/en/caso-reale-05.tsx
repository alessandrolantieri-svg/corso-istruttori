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

// English translation of caso-reale-05.tsx — same chapterId/response keys/internal values as the
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
      "You switch channel — you show her the movement slowly, or guide her arms out of the water before having her try again",
  },
  { value: "B", label: "You try again with the same words, rephrased differently" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "You finally switch channel (demonstration or guided physical contact)" },
  { value: "parole", label: "You keep insisting with words, maybe more slowly" },
];

export const casoReale05StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 05",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 05</div>
        <h1>The Child Who Doesn&apos;t Understand</h1>
        <p className="lede">
          Age 6-10. Competency: changing course (Ch. 8) — repertoire and real-time adaptation.
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Chiara, 7 years old</h1>
          <p className="lede">
            You&apos;ve explained twice, in words, how to coordinate her arms in backstroke. She tries again, and
            gets it wrong again, in exactly the same way. She doesn&apos;t seem distracted — she&apos;s watching you,
            focused, and still can&apos;t get it.
          </p>
          <p className="prompt">What do you do — not a third explanation in words?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              On the next attempt, the movement is almost right. It wasn&apos;t effort she was missing: she was
              missing a channel other than &quot;telling&quot;.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Chiara gets it wrong again, the same way. It&apos;s not a matter of how many times you explain it:
              it&apos;s a matter of which channel you use.
            </div>
          )}
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
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
        <h1>Chiara has gotten it wrong three times with the same channel</h1>
        <p className="prompt">What do you do now?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>What you actually do, in practice</h2>
        <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
        {answers.rec === "cambia" && (
          <div className="feedback ok">The next attempt improves right away, visibly.</div>
        )}
        {answers.rec === "parole" && (
          <div className="feedback retry">
            Chiara starts showing signs of attention fatigue more than mistake fatigue — continuing like this won&apos;t
            lead anywhere different.
          </div>
        )}
      </>
    ),
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
          What do you take with you, for the next time a child seems focused but keeps making the same mistake?
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
      const esito = o === "A" ? "handled on the first try" : answers.rec === "cambia" ? "got it wrong, but recovered (late)" : "got it wrong, not recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who Doesn&apos;t Understand</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Changing course (Ch. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            &quot;Doesn&apos;t understand&quot; and &quot;doesn&apos;t listen&quot; seem close, but they&apos;re not
            the same scenario: here the attention is there — it&apos;s the channel that&apos;s missing, not the
            contact.
          </p>
        </>
      );
    },
  },
];
