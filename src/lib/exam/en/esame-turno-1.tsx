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

// English translation, not an independent turn: same chapterId/answer keys/internal values as
// the Italian turn (src/lib/exam/esame-turno-1.tsx) — only visible text changes.
// Ports 1:1 beat1Outcome()/beat2Version() from the esame-turno1.html mockup: Aurora and Diego are
// two unrelated reads, evaluated separately — four outcomes, not two.
type Beat1Outcome = "A" | "B" | "C" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  const aurora = a.aurora,
    diego = a.diego;
  if (!aurora || !diego) return null;
  if (aurora === "giusta" && diego === "giusta") return "A";
  if (aurora === "giusta" && diego === "sbagliata") return "B";
  if (aurora === "sbagliata" && diego === "giusta") return "C";
  return "D";
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "diego-agitato" | "aurora-ferma" | "recupero-riuscito" | "mai-recuperato";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "diego-agitato";
  if (o === "C") return "aurora-ferma";
  if (o === "D") return a.beat2a === "separi" ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}

const AURORA_OPTIONS: Option[] = [
  { value: "giusta", label: "You come closer, get down to her level, hold out your hand without saying “come in”" },
  {
    value: "sbagliata",
    label: "You use a generic reassurance or try to get her in directly (“come on, nothing happened, come on in”)",
  },
];
const DIEGO_OPTIONS: Option[] = [
  { value: "giusta", label: "You give him a task that uses his energy (“bring me the kickboards, run!”)" },
  {
    value: "sbagliata",
    label: "You just call him back (“Diego, stop!”) without giving him anywhere to put that energy",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "separi",
    label: "You separate the two problems — you give Diego and Elisa a quick, distinct task, and only then go back to Aurora, calmly",
  },
  {
    value: "insisti",
    label: "You insist on the same move that already didn't work — you call everyone back loudly again, or repeat the same generic reassurance",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Feeling you close by and not pressed, Aurora moves her foot in deeper. Diego, with something to do, channels the burst of energy and runs back to the group, happy.",
  },
  B: {
    ok: false,
    text: "Aurora relaxes and moves her foot in. Diego stops for a second, but almost immediately starts pushing again — being called back didn't give him anything to do with that energy.",
  },
  C: {
    ok: false,
    text: "Diego walks off happily with his task. Aurora stays put — the reassurance didn't reach her: her cause was fear, not hesitation, and words alone aren't enough to convince her.",
  },
  D: {
    ok: false,
    text: "Aurora doesn't move — the generic reassurance didn't reach her. Diego, called back loudly, stops for a second but starts again almost right away: he didn't need an order, he needed to burn off that energy somewhere.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "The group is calm. All your attention is free for Marco.",
  "diego-agitato": "Diego keeps moving around the edge of the group while you try to follow Marco: one eye has to stay on him.",
  "aurora-ferma": "Aurora has stayed at the edge, hasn't gone back in: one eye has to stay on her while you work with Marco.",
  "recupero-riuscito": "The group has come back together, but a few minutes later than planned: Marco has waited, a bit distracted by what happened before.",
  "mai-recuperato": "The group arrives still agitated: Diego keeps disrupting things at the edge while you try to work with Marco.",
};

export const esameTurno1StepsEn: Step[] = [
  // 0 — intro
  {
    day: "before we start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Final exam · Turn 1</div>
        <h1>The little ones&apos; group</h1>
        <p className="lede">
          You have a group of four children in front of you: <strong>Aurora (4 years old)</strong>,{" "}
          <strong>Elisa (6 years old)</strong>, <strong>Marco (7 years old)</strong> and{" "}
          <strong>Diego (9 years old)</strong>. It&apos;s the Wednesday turn: fifteen minutes of warm-up,
          then this week&apos;s exercise.
        </p>
        <div className="card warn">
          This isn&apos;t a chapter. There&apos;s no &quot;next question&quot; button. There&apos;s
          only what happens after what you choose.
        </div>
        <p className="lede">
          The turn is divided into <strong>beats</strong> — the moments of the same scene, one
          after another: what you choose in one beat changes the beat that follows. They&apos;re
          not separate questions, it&apos;s one scene moving with you.
        </p>
        <p className="lede">
          The score runs from 80 to 100. <strong>100 with honors</strong> is the highest level:
          it&apos;s not enough to answer well, you also need to show you can recover from a
          mistake in real time, in front of the group — if that happens to you, it&apos;s a
          chance, not a problem.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 14,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.aurora && !!a.diego,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Two things at once</div>
          <h1>Aurora and Diego, at the same moment</h1>
          <p className="lede">
            You&apos;ve just arrived at the poolside. <strong>Aurora</strong> is standing still, her
            foot in the water up to the ankle, not moving — her shoulders are up, tight, her eyes
            fixed on the water. At the same moment, <strong>Diego</strong> starts playfully pushing
            Marco, laughing loudly, and can&apos;t keep still.
          </p>
          <p className="prompt">You have a moment. Who do you start with, and what do you do first?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <p className="lede">
            Aurora and Diego are two unrelated situations — they&apos;re evaluated separately, not as
            a single block.
          </p>
          <p className="prompt">With Aurora:</p>
          <OptionGroup name="aurora" options={AURORA_OPTIONS} selected={answers.aurora} onPick={(v) => setResponse("aurora", v)} />
          <p className="prompt">With Diego:</p>
          <OptionGroup name="diego" options={DIEGO_OPTIONS} selected={answers.diego} onPick={(v) => setResponse("diego", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, only if outcome D
  {
    day: "beat 2a — recovery",
    pct: 28,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · only because neither read was right</div>
        <h1>The group starts to fall apart</h1>
        <p className="lede">
          Aurora is still standing still. Diego, meanwhile, has started pushing again — this time
          Elisa, who moves away, annoyed. The group starts to fall apart.
        </p>
        <p className="prompt">You have a second fork. What do you do now?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>What you actually do, in practice</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "separi" && (
          <div className="feedback ok">
            Diego walks off happily with a task to do. Elisa, listened to for a moment on her own,
            calms down. Aurora, no longer surrounded by the commotion, finally moves her foot in
            deeper.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Elisa moves even further away, now sulking too. Diego, with no task to do, goes back to
            pushing. Aurora, hearing the raised voice in the group, tenses up more instead of less.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, the instruction to Marco
  {
    day: "beat 2",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2 · The instruction to Marco</div>
        <h1>The context you arrive with</h1>
        <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
        <p className="lede">
          <strong>Now it&apos;s Marco&apos;s turn, 7 years old.</strong> He has to learn the two-stage
          water entry — arms, then legs — a new exercise for him.
        </p>
        <p className="prompt">
          Write the instruction you&apos;d give him, phrased positively, suited to his age group
          (6-10: can handle two steps in a row).
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — beat3, the check you can't see
  {
    day: "beat 3",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3,
    render: ({ answers, setReflection }: StepContext) => {
      const v = beat2Version(answers);
      const noise =
        v === "diego-agitato" || v === "mai-recuperato" ? (
          <div className="card">
            Right at that moment Diego, at the edge, laughs loudly at something — Marco may have
            stopped because of the technical hesitation, or because he got distracted turning toward
            the laughter. Reading the four causes from Chapter 3 is genuinely harder here, not just
            more stressful: one more thing to rule out before reaching the real cause.
          </div>
        ) : v === "aurora-ferma" ? (
          <div className="card">
            Your attention is split between Marco and Aurora — the risk isn&apos;t a noise that
            confuses the reading, but time: how quickly you notice Marco&apos;s hesitation while one
            eye stays on her.
          </div>
        ) : (
          <div className="card">The moment is clear, no noise around — just Marco and his hesitation.</div>
        );
      return (
        <>
          <div className="eyebrow">Beat 3 · The check you can&apos;t see</div>
          <h1>Marco&apos;s hesitation</h1>
          <p className="lede">
            Marco performs it. It looks correct — but he stops for a moment right before the second
            step, with an expression you can&apos;t quite read.
          </p>
          {noise}
          <p className="prompt">
            Which of the four causes from Chapter 3 seems most likely to you, and what do you
            do — not what you ask him in words, what you do — to find out?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
        </>
      );
    },
  },

  // 5 — closing
  {
    day: "closing",
    pct: 80,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing Turn 1</div>
        <h1>What you take with you</h1>
        <p className="lede">
          The turn ends. The group gets out of the water, Aurora smiling, Marco still a little unsure
          about the last exercise.
        </p>
        <p className="prompt">
          One last question, before moving on to Turn 2: what do you take with you, from this turn,
          into the next one?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          This reflection doesn&apos;t count toward the score: it&apos;s the same one you&apos;ve
          done for ten weeks, the last time before the outcome.
        </p>
      </>
    ),
  },

  // 6 — result
  {
    day: "result",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c4 =
        o === "A"
          ? "handled on the first try"
          : o === "B" || o === "C"
            ? "partly handled"
            : answers.beat2a === "separi"
              ? "got it wrong, but recovered"
              : "got it wrong, never recovered";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turn 1 completed</div>
          <div className="eyebrow">How to read the result</div>
          <h1>The little ones&apos; group</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C4 · Rapport</span>
              <span className="esito">{c4}</span>
            </div>
            <div className="result-row">
              <span className="comp">C2 · Recognizing the student</span>
              <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Positive instruction</span>
              <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C3 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Watching and understanding</span>
              <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "separi" && (
            <div className="card quote">
              A mistake recovered well isn&apos;t the same as never having made one — but it&apos;s
              not just a simple fix either. It shows you can adapt well under pressure: the road to
              the highest score doesn&apos;t only run through a turn that&apos;s perfect from start
              to finish.
            </div>
          )}
          <p className="lede">
            The turn continues either way, whichever path you took — consistent with &quot;you
            can&apos;t fail, only postpone it&quot;. The next turn is waiting for you:{" "}
            <strong>Turn 2 — The difficult situation.</strong>
          </p>
        </>
      );
    },
  },
];
