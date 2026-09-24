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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-10.html.
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
      "You give her specific, concrete feedback on the technical move, without arguing with her comment (\"you pushed hard with your legs and stretched your arms out — that's exactly what made it work\")",
  },
  { value: "B", label: "You try to convince her verbally that it wasn't luck, in a generic way (\"come on, you're good, don't say that\")" },
];
const REC_OPTIONS: Option[] = [
  { value: "specifico", label: "You go back and give specific feedback instead of generic reassurance" },
  { value: "generico", label: "You keep pushing generic reassurance" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Ginevra listens to you, a little surprised: you didn't tell her she was wrong, you gave her a precise technical reason — and that reason shows it wasn't luck. On her next attempt, she tries again with more attention.",
  },
  B: {
    ok: false,
    text: "Ginevra shrugs, unconvinced — a generic compliment isn't enough to break down a deep-rooted belief, especially at this age, in front of the group.",
  },
};

const REC_FEEDBACK: Record<"specifico" | "generico", { ok: boolean; text: string }> = {
  specifico: {
    ok: true,
    text: "This time the precise technical detail lands — and, unlike \"you're good,\" it's something Ginevra can verify for herself on her next attempt.",
  },
  generico: {
    ok: false,
    text: "Ginevra doesn't change her mind — the distrust stays intact, because nothing you said gave her a concrete reason to think otherwise.",
  },
};

export const casoReale10StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 10",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 10</div>
        <h1>The Girl Who Doesn&apos;t Believe Her Result</h1>
        <p className="lede">
          Ages 11-13. Competencies: the feedback (Ch. 7) · rapport (Ch. 4). Different from &quot;she&apos;s scared&quot;
          (Scenario 03): here there&apos;s no perceived danger, there&apos;s chronic distrust in her own abilities.
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
          <h1>Ginevra, 11 years old</h1>
          <p className="lede">
            She has just performed a technically correct dive start — the first one done well, after weeks.
            Instead of being happy, she says, looking away: &quot;it was probably just luck, I usually get it
            wrong.&quot;
          </p>
          <p className="prompt">What do you say?</p>
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
      const rec = answers.rec as "specifico" | "generico" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recovery · only because it didn&apos;t work</div>
          <h1>Ginevra stays skeptical</h1>
          <p className="lede">Ready to dismiss the next attempt as luck too.</p>
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
          What do you take with you, next time a student dismisses their own success as luck?
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
      const esito = o === "A" ? "handled on the first try" : answers.rec === "specifico" ? "missed, but recovered" : "missed, not recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Girl Who Doesn&apos;t Believe Her Result</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">The feedback (Ch. 7)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Against distrust, &quot;you&apos;re good&quot; doesn&apos;t hold up — &quot;you did this, and that&apos;s
            why it worked&quot; does. It&apos;s the same principle as Chapter 7 — specific praise is remembered,
            vague praise is forgotten — applied to someone who doesn&apos;t believe in herself.
          </p>
        </>
      );
    },
  },
];
