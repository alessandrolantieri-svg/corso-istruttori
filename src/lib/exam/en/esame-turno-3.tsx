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
// the Italian turn (src/lib/exam/esame-turno-3.tsx) — only visible text changes.
// Ports 1:1 beat1Outcome()/needsBeat2A()/matteoRecovered()/beat2Attention() from the
// esame-turno3.html mockup. Beat 1 outcome: A = real reason + congruent tone, B = real reason +
// incongruent tone, D = no real reason.
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
function matteoRecovered(a: Record<string, string>): boolean {
  return a.beat2a === "recupero";
}
type Beat2Attention = "libera" | "divisa";
function beat2Attention(a: Record<string, string>): Beat2Attention {
  const o = beat1Outcome(a);
  if (o === "A") return "libera";
  if (o === "D") return matteoRecovered(a) ? "libera" : "divisa";
  return "divisa"; // B
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You give a reason tied to a concrete benefit (“it lengthens your stroke, try it and feel the difference”) with a tone that says you actually care about the answer",
  },
  {
    value: "B",
    label:
      "You say the right thing (“it's good for you”) but with a sigh, looking away, in a dismissive tone that says “I don't have time for this”",
  },
  {
    value: "D",
    label: "“Because I said so” or “come on, don't make a fuss, just do it” — no real reason",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "recupero",
    label:
      "You recognize you didn't give a real reason, and you give one now (“you're right, hold on a second — let me really tell you why...”)",
  },
  { value: "insisti", label: "You insist on authority (“we do it because I said so, end of story”)" },
];
const ELENA_OPTIONS: Option[] = [
  { value: "silenzio", label: "You ask her opinion, or stay silent and let her evaluate herself" },
  { value: "corregge", label: "You correct her anyway, out of habit, even though the observation is right" },
];
const TONO_OPTIONS: Option[] = [
  {
    value: "congruente",
    label:
      "Specific, congruent feedback — e.g. “you pushed off with your legs at the turn, you could see the difference”, said while looking at him",
  },
  {
    value: "tradisce",
    label: "Technically correct feedback but the tone betrays it — sarcastic, dismissive, or said while already walking away",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Matteo does the repeats with visible effort — not perfect, but real. At the end he says: “...ok, it actually does feel different.”",
  },
  B: {
    ok: false,
    text: "Matteo does it, but half-heartedly: the words said one thing, the tone another, and he got stuck on that contradiction instead of the content. “Fine, whatever you say” — he does it, but without looking for anything in it.",
  },
  D: {
    ok: false,
    text: "Matteo does a half-hearted lap, without really pushing off — it isn't an open refusal, it's the bare minimum. A 14-18 year-old kid, without a reason, doesn't really perform (Chapter 2) — he does just enough to not get noticed.",
  },
};

const BEAT2A_FEEDBACK: Record<"recupero" | "insisti", { ok: boolean; text: string }> = {
  recupero: {
    ok: true,
    text: "Matteo slows down, looks at you — a little surprised that you came back to it instead of letting it go. On the next lap, he pushes off harder.",
  },
  insisti: {
    ok: false,
    text: "Matteo doesn't answer, but he does the rest of the training detached, silent, at the minimum.",
  },
};

const ELENA_FEEDBACK: Record<"silenzio" | "corregge", { ok: boolean; text: string }> = {
  silenzio: {
    ok: true,
    text: "ELENA: “...I think I held my position better this time. Is that right?” — she's already given her own judgment before asking for yours.",
  },
  corregge: {
    ok: false,
    text: "ELENA: “...ok.” — she does it again, waiting, as always, for your final verdict.",
  },
};

const TONO_FEEDBACK: Record<"congruente" | "tradisce", { ok: boolean; text: string }> = {
  congruente: {
    ok: true,
    text: "Matteo nods, doesn't say much — but on the next lap, the effort stays.",
  },
  tradisce: {
    ok: false,
    text: "Matteo closes off again — the words said one thing, the tone another, and the contradiction made him stop trusting it.",
  },
};

const BEAT2_ATTENTION_TEXT: Record<Beat2Attention, string> = {
  libera: "Your attention is free, you can follow Elena without distractions.",
  divisa:
    "One eye stays on Matteo, who keeps swimming without effort nearby: giving Elena the calm attention she deserves costs more when part of you is still monitoring him.",
};

export const esameTurno3StepsEn: Step[] = [
  // 0 — intro
  {
    day: "before we start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Final exam · Turn 3</div>
        <h1>Teenagers, and those who can already manage on their own</h1>
        <p className="lede">
          You&apos;re with a group of 14-18 year-old kids. The warm-up calls for turn repeats — no
          one&apos;s favorite. <strong>Matteo (16 years old)</strong> has been in the group for a
          few months. <strong>Elena (17 years old)</strong> has been with you for three years: on
          the turn, by now, you don&apos;t need to watch her every time anymore.
        </p>
        <div className="card warn">
          This isn&apos;t a chapter. There&apos;s no &quot;next question&quot; button. There&apos;s
          only what happens after what you choose.
        </div>
        <p className="lede">
          Like in the previous turns: the turn is divided into <strong>beats</strong> — the
          moments of the same scene, one after another — and the score runs from 80 to 100, with{" "}
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
          <div className="eyebrow">Beat 1 · The why</div>
          <h1>&quot;Why do we always have to do this exercise, it&apos;s boring.&quot;</h1>
          <p className="lede">
            Matteo stops, he doesn&apos;t cross his arms the way a twelve-year-old would — it&apos;s
            more a genuine question than a challenge.
          </p>
          <p className="prompt">What do you answer — the words you use, and in what tone?</p>
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
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.beat2a as "recupero" | "insisti" | undefined;
      const fb = val ? BEAT2A_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2A · only because you didn&apos;t give a real reason</div>
          <h1>Matteo at the minimum</h1>
          <p className="lede">
            Matteo keeps swimming at the minimum, a meter detached from the group, without pushing
            off.
          </p>
          <p className="prompt">You have a second fork. What do you do now?</p>
          <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — beat2, Elena's turn
  {
    day: "beat 2 — Elena",
    pct: 40,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2 && !!a.elena,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const attn = beat2Attention(answers);
      const val = answers.elena as "silenzio" | "corregge" | undefined;
      const fb = val ? ELENA_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2 · Letting her go</div>
          <h1>Elena&apos;s turn</h1>
          <p className="lede">
            Meanwhile, regardless of how things went with Matteo — it&apos;s an unrelated problem,
            not a consequence — it&apos;s Elena&apos;s moment. She completes a technically clean
            turn, the kind you&apos;d have corrected almost every time a year ago. Today she
            didn&apos;t need it.
          </p>
          <div className="card">{BEAT2_ATTENTION_TEXT[attn]}</div>
          <p className="prompt">What do you tell her, right after the turn?</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="elena" options={ELENA_OPTIONS} selected={answers.elena} onPick={(v) => setResponse("elena", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 4 — beat3, congruence under pressure
  {
    day: "beat 3 — Matteo",
    pct: 60,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.tono,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.tono as "congruente" | "tradisce" | undefined;
      const fb = val ? TONO_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 3 · Congruence under pressure</div>
          <h1>Matteo&apos;s first real effort, today</h1>
          <p className="lede">
            Toward the end of the turn, Matteo — whichever version you&apos;ve arrived at — tries,
            for the first time today, with real effort. Even in the &quot;Matteo detached&quot;
            version, something moves him: he sees Elena getting trust instead of corrections, and he
            gives it a try. The execution isn&apos;t perfect, but there is, for the first time
            today, real effort.
          </p>
          <p className="prompt">
            Write what you say to him — it has to stay congruent: the words, the tone, and what your
            body communicates all have to say the same thing.
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="tono" options={TONO_OPTIONS} selected={answers.tono} onPick={(v) => setResponse("tono", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 5 — closing
  {
    day: "closing",
    pct: 82,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing Turn 3 — the last of the three</div>
        <h1>Looking back at the three turns together</h1>
        <p className="prompt">
          What did you learn about yourself as an instructor that you didn&apos;t know just looking
          at the ten chapters one at a time?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          This reflection doesn&apos;t count toward the score: it&apos;s the last one before the
          final exam outcome.
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
      const c2 = o === "D" ? (matteoRecovered(answers) ? "got it wrong, but recovered" : "got it wrong, never recovered") : "handled";
      const b1c5 = o === "A" ? "congruent tone" : o === "B" ? "incongruent tone" : "no reason given";
      const b3c5 = answers.tono === "congruente" ? "congruent feedback" : "tone that betrays the words";
      const c10 = answers.elena === "silenzio" ? "handled" : "missed opportunity, not a serious mistake";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turn 3 completed</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> All three turns are complete</div>
          <div className="eyebrow">How to read the result</div>
          <h1>Teenagers, and those who can already manage on their own</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C2 · Communicating by age (14-18)</span>
              <span className="esito">{c2}</span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Congruence</span>
              <span className="esito">
                Beat 1: {b1c5} · Beat 3: {b3c5}
              </span>
            </div>
            <div className="result-row">
              <span className="comp">C10 · Autonomy</span>
              <span className="esito">{c10}</span>
            </div>
          </div>
          {o === "D" && matteoRecovered(answers) && (
            <div className="card quote">
              Backing down on an order given badly, in front of the very kid who tested you, without
              losing face and without making a scene: that&apos;s a good recovery, made under
              observation. Exactly the kind of proof it takes for 100 with honors.
            </div>
          )}
          <p className="lede">
            The turn closes either way, whichever path you took — consistent with &quot;you
            can&apos;t fail, only postpone it&quot;. With this, all three turns of the final exam are
            complete.
          </p>
        </>
      );
    },
  },
];
