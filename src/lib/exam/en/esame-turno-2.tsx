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
// the Italian turn (src/lib/exam/esame-turno-2.tsx) — only visible text changes.
// Ports 1:1 beat1Outcome()/needsBeat2A()/beat2Version()/soggetto() from the esame-turno2.html
// mockup: here, unlike Turn 1, Beat 1 is a single three-outcome fork (not two separate reads).
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "leonardo-rigido" | "recupero-riuscito" | "leonardo-fuori";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "leonardo-rigido";
  if (o === "D") return a.beat2a === "cambia" ? "recupero-riuscito" : "leonardo-fuori";
  return "pulita";
}
function soggetto(a: Record<string, string>): string {
  return beat2Version(a) === "leonardo-fuori" ? "Sofia" : "Leonardo";
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You recognize the dive isn't the problem, doing it first in front of everyone is — you offer him a role or a way out that isn't a retreat (“show me how you'd do it differently”)",
  },
  {
    value: "B",
    label: "You understand the problem is relational, but still push him to try it right away, in front of everyone (“come on, just do it, everyone's watching”)",
  },
  {
    value: "D",
    label: "You re-explain the dive technique, maybe more slowly (“look, it's easy: you bend your knees...”)",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "You recognize the mistake and change approach — you stop explaining the technique, you come closer, lower your voice, offer him a way out that doesn't expose him",
  },
  {
    value: "insisti",
    label: "You insist on the same read — you repeat the technical explanation, maybe more firmly",
  },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "You switch channel — you show the dive slowly from the edge, or physically guide his arm position",
  },
  { value: "parole", label: "You repeat it again in words, even if rephrased differently" },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Leonardo is thrown off for a moment, then unfolds his arms. He proposes a small variant of his own, not exactly the planned dive but close — and he does it.",
  },
  B: {
    ok: false,
    text: "Leonardo does it, but with stiff shoulders and without looking at anyone — he obeys, he doesn't participate.",
  },
  D: {
    ok: false,
    text: "Leonardo wasn't asking for a technical explanation — you'd already gathered that from his tone, but the explanation comes anyway. He closes off further: “I said no.” A classmate nearby snickers.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Leonardo gets ready at the edge, relaxed, ready to try his variant.",
  "leonardo-rigido": "Leonardo is at the edge, but his body is tense: he tries without really participating.",
  "recupero-riuscito": "Leonardo, after glancing at Sofia, comes over on his own, a bit wary but genuine.",
  "leonardo-fuori":
    "Leonardo stays sitting out of the group. It's Sofia's turn, who was waiting anyway — the beat continues with her, with one eye that has to stay on Leonardo, without excluding him entirely.",
};

export const esameTurno2StepsEn: Step[] = [
  // 0 — intro
  {
    day: "before we start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Final exam · Turn 2</div>
        <h1>The difficult situation</h1>
        <p className="lede">
          You&apos;re with a group of 11-13 year-old kids. It&apos;s <strong>Leonardo&apos;s (12
          years old)</strong> turn to try a starting dive for the first time — never done it before,
          never in front of the group. <strong>Sofia (11 years old)</strong> is also waiting her
          turn, a bit further back.
        </p>
        <div className="card warn">
          This isn&apos;t a chapter. There&apos;s no &quot;next question&quot; button. There&apos;s
          only what happens after what you choose.
        </div>
        <p className="lede">
          Like in Turn 1: the turn is divided into <strong>beats</strong> — the moments of the
          same scene, one after another — and the score runs from 80 to 100, with{" "}
          <strong>100 with honors</strong> reserved for those who can also recover well from a
          mistake in real time.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · The refusal</div>
          <h1>&quot;I&apos;m not doing it, it&apos;s stupid.&quot;</h1>
          <p className="lede">
            Leonardo stops at the edge, crosses his arms. He isn&apos;t shaking, he isn&apos;t
            seeking your eyes, he doesn&apos;t look scared — he looks like someone who has decided.
          </p>
          <p className="prompt">
            Is it more likely that Leonardo can&apos;t do it, or that he won&apos;t? And what do you
            do — not what do you explain again?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, only if outcome D
  {
    day: "beat 2a — recovery",
    pct: 24,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · only because the diagnosis was wrong</div>
        <h1>A refusal, watched by the others</h1>
        <p className="lede">
          Leonardo stays still, arms crossed. A classmate&apos;s snicker nearby doesn&apos;t help —
          now it&apos;s no longer just a refusal, it&apos;s a refusal watched by everyone else.
        </p>
        <p className="prompt">You have a second fork. What do you do now?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>What you actually do, in practice</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "cambia" && (
          <div className="feedback ok">
            Leonardo relaxes, not completely — he stays a bit wary — but he nods. He watches Sofia
            try, then, without anyone asking him again, he comes over to the edge.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Leonardo steps further away, sits at the edge, outside the group of those waiting their
            turn. He doesn&apos;t answer anymore.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, the check you can't see
  {
    day: "beat 2",
    pct: 38,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 2 · The check you can&apos;t see</div>
          <h1>The context you arrive with</h1>
          <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
          <p className="lede">
            <strong>{chi} tries the dive.</strong> Enters belly-first instead of head-first — the
            arms aren&apos;t extended forward at the moment of entry.
          </p>
          <p className="prompt">
            How do you check whether the earlier instruction got through — not by asking
            &quot;did you get it?&quot; — and what do you notice?
          </p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        </>
      );
    },
  },

  // 4 — beat3a, changing course
  {
    day: "beat 3 — changing course",
    pct: 52,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 3 · Changing course</div>
          <h1>Same mistake, second attempt</h1>
          <p className="lede">
            You try to correct the entry in words: &quot;keep your arms closer together and
            extended when you enter.&quot; On the second attempt, same mistake — belly-first, arms
            not extended.
          </p>
          <p className="prompt">
            The second attempt is the same as the first. What do you do now — not repeat the same
            words?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {answers.canale === "cambia" && (
            <div className="feedback ok">
              On the third attempt the entry is almost correct — not perfect, but the arms stay
              extended, and the entry is head-first.
            </div>
          )}
          {answers.canale === "parole" && (
            <div className="feedback retry">
              The third attempt is identical to the second — {chi} starts showing signs of attention
              fatigue, no longer about the mistake itself.
            </div>
          )}
          <p className="lede" style={{ marginTop: 14, fontSize: ".86rem" }}>
            ({chi} is the one trying the dive in this version of the turn.)
          </p>
        </>
      );
    },
  },

  // 5 — beat3b, the feedback
  {
    day: "beat 3 — the feedback",
    pct: 66,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q4,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 3 · The feedback</div>
        <h1>Whatever way the third attempt went</h1>
        <p className="lede">
          Whatever the third attempt was like — almost right, or still the same — you have to give
          feedback.
        </p>
        <p className="prompt">Write the feedback you give now, specific to the behavior, not to the person.</p>
        <Field id="q4" value={answers.q4 ?? ""} onChange={(v) => setReflection("q4", v)} />
      </>
    ),
  },

  // 6 — closing
  {
    day: "closing",
    pct: 82,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => (beat2Version(a) === "leonardo-fuori" ? !!a.qleonardo && !!a.qchiusura : !!a.qchiusura),
    render: ({ answers, setReflection }: StepContext) => {
      const isFuori = beat2Version(answers) === "leonardo-fuori";
      return (
        <>
          <div className="eyebrow">Closing Turn 2</div>
          <h1>{isFuori ? "Before moving on" : "What you take with you"}</h1>
          {isFuori && (
            <>
              <p className="prompt">
                Do you go back to Leonardo, sitting at the edge? What do you say to him, or not say,
                before closing?
              </p>
              <Field id="qleonardo" value={answers.qleonardo ?? ""} onChange={(v) => setReflection("qleonardo", v)} />
              <p className="lede" style={{ marginTop: 10, fontSize: ".84rem" }}>
                It doesn&apos;t count toward the score — but the system records whether the door
                stays open for the next turn, or whether the refusal is left without another word.
              </p>
            </>
          )}
          <p className="prompt" style={{ marginTop: 18 }}>
            In every version: what do you take with you, from this turn, into the next one?
          </p>
          <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        </>
      );
    },
  },

  // 7 — result
  {
    day: "result",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c9 =
        o === "A"
          ? "handled on the first try"
          : o === "B"
            ? "partly handled"
            : answers.beat2a === "cambia"
              ? "got it wrong, but recovered"
              : "got it wrong, never recovered";
      const c8 = answers.canale === "cambia" ? "handled on the first try" : "needs reinforcing";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turn 2 completed</div>
          <div className="eyebrow">How to read the result</div>
          <h1>The difficult situation</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C9 · Difficult situations</span>
              <span className="esito">{c9}</span>
            </div>
            <div className="result-row">
              <span className="comp">C6 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Verifying through action</span>
              <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C8 · Changing course</span>
              <span className="esito">{c8}</span>
            </div>
            <div className="result-row">
              <span className="comp">C7 · The feedback</span>
              <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "cambia" && (
            <div className="card quote">
              Realizing in real time that you misread the situation, and changing course in front of
              the group without awkwardly backpedaling — that&apos;s a great recovery, made in full
              view of everyone. And it&apos;s exactly the kind of proof it takes for 100 with honors.
            </div>
          )}
          <p className="lede">
            The turn continues either way — consistent with &quot;you can&apos;t fail, only postpone
            it&quot;. The next turn is waiting for you:{" "}
            <strong>Turn 3 — Teenagers, and those who can already manage on their own.</strong>
          </p>
        </>
      );
    },
  },
];
