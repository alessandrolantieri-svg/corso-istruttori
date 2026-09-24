import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-8.tsx) — solo il testo visibile
// cambia.

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

const K1: Option[] = [
  { value: "no", label: "No — one labels the person, the other describes what happened", correct: true },
  { value: "si", label: "Yes — it's just another way of saying the same thing", correct: false },
];
const K2: Option[] = [
  { value: "si", label: "Yes — it means he doesn't have the technique yet", correct: false },
  { value: "no", label: "No — it's information about what to adjust, not a verdict on the child", correct: true },
];
const K3: Option[] = [
  { value: "no", label: "No — specific feedback does, a generic compliment doesn't", correct: true },
  { value: "si", label: "Yes — if it motivates him, he'll work out what he did right on his own", correct: false },
];
const K4: Option[] = [
  { value: "si", label: "Yes — a vague compliment is easier to remember and repeat", correct: false },
  { value: "no", label: "No — it's the opposite: the specific one is the one you can redo", correct: true },
];
const K5: Option[] = [
  { value: "entrambe", label: "Naming both things, specifically", correct: true },
  { value: "uno", label: "Choosing only praise, or only correction", correct: false },
];
const K6: Option[] = [
  { value: "no", label: "No — at that age, tone matters as much as content", correct: true },
  { value: "si", label: "Yes, enthusiasm works at every age", correct: false },
];

const M1: Option[] = [
  { value: "si", label: "Yes — words first, then the gesture, then contact", correct: false },
  { value: "no", label: "No — it depends on the child, there's no order that works for everyone", correct: true },
];
const M2: Option[] = [
  { value: "no", label: "No — it just means that wasn't the right key yet", correct: true },
  { value: "si", label: "Yes — if a simple way doesn't work, the problem is with the child", correct: false },
];
const M3: Option[] = [
  { value: "no", label: "No — it's time to stop and look at what else there is (Chapter 3)", correct: true },
  { value: "si", label: "Yes, you need to keep pushing on the communication", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "parole", label: "You try again with a verbal explanation, reworded differently" },
  { value: "canale", label: "You show her the movement, or guide her with physical contact" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "stesso", label: "You insist on the same channel — with her it always works that way" },
  { value: "diverso", label: "You try yet another channel, like a new problem" },
];

const T1: Option[] = [
  { value: "lento", label: "Repeat it more slowly, enunciating better", correct: false },
  { value: "diverso", label: "Switch to a different one right away", correct: true },
];
const T2: Option[] = [
  { value: "tre", label: "Three different ways", correct: true },
  { value: "uno", label: "One way, well prepared in advance", correct: false },
];
const T3: Option[] = [
  { value: "si", label: "Yes — if words aren't enough, the problem is that he can't do it", correct: false },
  { value: "no", label: "No — it wasn't the right key yet, not a limit of the child", correct: true },
];
const T4: Option[] = [
  { value: "no", label: "No — it depends on the individual child, there's no single order for everyone", correct: true },
  { value: "si", label: "Yes — words first, then the gesture, then contact last", correct: false },
];
const T5: Option[] = [
  { value: "si", label: "Yes — two different ways of saying the same thing", correct: false },
  { value: "no", label: "No — one labels the person, the other describes the behavior", correct: true },
];
const T6: Option[] = [
  { value: "no", label: "No — it worked for that movement, at that moment: the other two stay in the repertoire", correct: true },
  { value: "si", label: "Yes — once you've found his channel, his repertoire is settled", correct: false },
];
const T7: Option[] = [
  { value: "si", label: "Yes, you need to keep pushing until you find the right one", correct: false },
  { value: "no", label: "No — it's time to stop and look at what else there is", correct: true },
];
const T8: Option[] = [
  { value: "no", label: "No — at that age it needs adapting into something respectful, keeping the same principle", correct: true },
  { value: "si", label: "Yes, the channel matters more than the form you use it in", correct: false },
];
const T9: Option[] = [
  { value: "si", label: "Yes, once found for a child it stays the right one", correct: false },
  { value: "no", label: "No — every new exercise may call for a different channel", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo8StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 8 · CHANGING COURSE</div>
        <h1>It didn&apos;t work. Now what?</h1>
        <p className="lede">
          When a way of explaining something doesn&apos;t work, the instructor tries a different
          one right away — instead of repeating the same one louder or more slowly.
        </p>
      </>
    ),
  },

  // 1 — Monday: reflection + Chapter 7 consolidation
  {
    day: "Monday · 10 min",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>How did it go in the pool?</h1>
        <p className="lede">
          Last week: every piece of feedback had to name a behavior, never the person. Was it
          easy, or did you catch yourself slipping back into old habits?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 7 comes back</h2>
        <p className="prompt">1. Do &quot;you&apos;re distracted&quot; and &quot;you were looking at the window&quot; say the same thing?</p>
        <OptionGroup name="k1" options={K1} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. A child took a drink of water during the exercise: is that a failure?</p>
        <OptionGroup name="k2" options={K2} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Does &quot;good job&quot; teach what to do again?</p>
        <OptionGroup name="k3" options={K3} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Is a vague compliment easier to repeat than a specific one?</p>
        <OptionGroup name="k4" options={K4} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. An attempt improves one detail but loses another. The right feedback is:
        </p>
        <OptionGroup name="k5" options={K5} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. With a teenager, does specific praise said in a cheerleading tone work the same way
          it does with a young child?
        </p>
        <OptionGroup name="k6" options={K6} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — Tuesday: repertoire of the three channels
  {
    day: "Tuesday · 13 min",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>If a way doesn&apos;t work, you don&apos;t repeat it — you change it</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          You gave good feedback, with the right instruction, at the right moment — and it still
          doesn&apos;t work. Now what?
        </p>
        <p className="lede">
          The first instinct, when something isn&apos;t working, is to repeat it — more slowly,
          louder. It&apos;s the most common mistake of the trade: under pressure we all fall back
          on our favorite way.
        </p>
        <p className="lede">
          <strong>Building a repertoire</strong> means having, for every important thing, at least
          three different ways of saying it: one that shows, one that explains in words, one that
          you let the body feel — the same three channels from the VAK test, applied in reverse.
        </p>
        <div className="card quote">
          There&apos;s no fixed order. The repertoire doesn&apos;t tell you which one you&apos;ll
          use: it only guarantees that, when the first one doesn&apos;t work, you already have two
          more ready.
        </div>
        <div className="card">
          <strong>Guided physical contact has one more rule, before &quot;how&quot;: permission.
          </strong>
          <p>
            Before guiding a child&apos;s arms or legs, say it out loud, so that he and anyone
            nearby can hear it — <em>&quot;I&apos;m going to hold your ankle, so you can feel the
            movement&quot;</em>. Don&apos;t start from the contact: start from the announcement.
          </p>
          <p>
            Guide only where it&apos;s technically needed (hands, arms, ankles, back for
            floating) — never the rest of the body. Do it somewhere visible, not off to the side:
            at the edge, in open water, where a colleague or a parent, if present, can see what
            you&apos;re doing.
          </p>
          <p>
            If the child pulls back, stiffens, or says no — even without saying it in words —
            that channel is closed for that moment: go back to showing or explaining. Don&apos;t
            push to &quot;get him used to it&quot;.
          </p>
          <p>
            This applies at every age, and your facility may have its own policy on this point:
            if so, the facility&apos;s policy always has the final word.
          </p>
        </div>
        <p className="lede">
          <strong>You need a basic trust to do this:</strong> every child already has, inside
          them, the resources to succeed — your part isn&apos;t to &quot;give&quot; them the
          ability, it&apos;s to find the way that brings it out. If the first way doesn&apos;t
          work, it doesn&apos;t mean he can&apos;t do it: it just means that wasn&apos;t the right
          key yet.
        </p>
        <p className="lede">
          <strong>And if you&apos;ve tried all three channels, and none worked?</strong> At that
          point the problem probably isn&apos;t &quot;which channel&quot; anymore, but something
          else — maybe he&apos;s afraid, maybe he hasn&apos;t understood yet, maybe he&apos;s
          cold, maybe he&apos;s just waiting for your go-ahead: the same four causes from Chapter
          3. At that point, insisting with a fourth variation doesn&apos;t help: it&apos;s like
          continuing to knock on a door when you know the person inside can&apos;t answer you
          right now. The repertoire has three ways, not infinite ones —
          knowing when to stop altogether is part of the same skill.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">
          1. Does the repertoire have a fixed order — always words first, then the gesture, then
          contact?
        </p>
        <OptionGroup name="m1" options={M1} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">
          2. If the first way doesn&apos;t work with a child, does it mean he can&apos;t do it?
        </p>
        <OptionGroup name="m2" options={M2} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. You&apos;ve tried all three channels, with no result. Is the right thing to invent a
          fourth variation?
        </p>
        <OptionGroup name="m3" options={M3} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — Wednesday: three children, three channels + Bianca simulation (two moments)
  {
    day: "Wednesday",
    pct: 46,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>Three children, three different winning channels</h1>
        <div className="card scene">
          <div className="who">A 7-year-old, breaststroke</div>
          <p>
            He can&apos;t coordinate his legs. The instructor tries in words three times. Nothing
            changes. She changes channel: she lets him feel the movement by moving his ankles for
            him out of the water. The child redoes it, almost right, on the first try.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Sara, 10 years old</div>
          <p>
            With another instructor, words had always been enough — and that had convinced him
            they always would be. With the turn she keeps getting it wrong. The instructor tries
            letting her feel the movement: still nothing. On the third attempt, she shows her the
            whole movement, in the water. That&apos;s what unlocks it.
          </p>
        </div>
        <div className="card scene">
          <div className="who">A 15-year-old boy</div>
          <p>
            He keeps getting the water entry wrong on a technical dive, despite a demonstration
            and a verbal explanation. The third channel — physical contact, natural at 7 — would
            risk feeling out of place at 15. The instructor adapts the channel to his age, without
            changing the principle: he shows him a short video of his own dive. Watching himself,
            the boy figures out on his own where the movement breaks down.
          </p>
        </div>
        <p className="lede">
          <strong>
            Three children, three different winning channels — and in none of the three cases was
            the channel, or its form, obvious in advance.
          </strong>
        </p>
        <p className="prompt">
          You explained in words, twice, how to keep the body extended during the glide. The child
          keeps arching his back. Write a different way — not in words — to get the same thing
          across to him.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: the system looks for a channel different
            from the one already tried — not a third verbal explanation reworded. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>BIANCA, 9 years old.</strong> She&apos;s already heard the verbal explanation of
          how to move her arms in backstroke twice, and keeps getting it wrong. What do you try
          now — it has to be different from &quot;in words&quot;.
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "parole" && (
          <div className="feedback retry">
            BIANCA: &quot;...yeah, ok&quot; <em>(tries again, same mistake as before)</em>
          </div>
        )}
        {answers.sim === "canale" && (
          <div className="feedback ok">
            BIANCA: <em>(tries the movement following the gesture you showed her)</em> &quot;...oh,
            like this!&quot;
            <br />
            You&apos;re not working any harder: you&apos;re just using a channel you hadn&apos;t
            tried before.
          </div>
        )}
        {!!answers.sim && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Another week. Bianca has to learn a new exercise — the start in the water. You try
              the same channel that worked with her last time. This time it doesn&apos;t work: she
              stays unsure, like with the words a while ago.
            </p>
            <p className="prompt">Write what you do now.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "stesso" && (
              <div className="feedback retry">
                BIANCA keeps getting it wrong — the channel that had worked once wasn&apos;t a
                definitive discovery, it was just the right one for that specific movement.
              </div>
            )}
            {answers.sim2 === "diverso" && (
              <div className="feedback ok">
                BIANCA: <em>(tries the remaining third channel)</em> &quot;...ok, now I get it.&quot;
                <br />
                The repertoire doesn&apos;t run out after the first discovery: every new exercise
                may call for a different channel, even with the same child.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — Wednesday evening: transfer
  {
    day: "Wednesday evening",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>The remaining third channel</h1>
        <p className="lede">
          You&apos;ve already tried &quot;showing&quot; and &quot;guiding by feel&quot; with the
          same child, with no result, on a technical movement never discussed so far in the
          course.
        </p>
        <p className="prompt">What do you do now, and why is it consistent with what you learned today?</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: the system looks for whether the
            remaining third channel ("telling", in words) is what's left — not a fourth
            variation of the same channel already ruled out twice. */}
      </>
    ),
  },

  // 5 — pool turn
  {
    day: "in the pool",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>Three ways, ready before you get in</h1>
        <p className="lede">
          This week, prepare three different ways of explaining the same technical thing before
          getting into the pool. If the first doesn&apos;t work with a child, switch to another
          one right away — don&apos;t repeat the first one louder.
        </p>
      </>
    ),
  },

  // 6 — Friday: cumulative test
  {
    day: "Friday · 11 min",
    pct: 86,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 7 + Chapter 8</div>
        <h1>The test</h1>
        <p className="prompt">1. If a way of explaining something doesn&apos;t work, the right thing is:</p>
        <OptionGroup name="t1" options={T1} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. A good repertoire has, for every important thing, at least:</p>
        <OptionGroup name="t2" options={T2} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. If a child can&apos;t do it with the verbal explanation, does it mean he can&apos;t do it at all?</p>
        <OptionGroup name="t3" options={T3} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Does the repertoire have a fixed order, valid for every child?</p>
        <OptionGroup name="t4" options={T4} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(from Chapter 7)</em> Are &quot;you&apos;re distracted&quot; and &quot;you were looking
          at the window&quot; the same thing?
        </p>
        <OptionGroup name="t5" options={T5} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. A channel worked with a child on one exercise. Does that mean the other two, with him, are no longer needed?</p>
        <OptionGroup name="t6" options={T6} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">
          7. You&apos;ve tried all three channels with a child, with no result. Is the right thing
          to invent a fourth variation?
        </p>
        <OptionGroup name="t7" options={T7} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. With a teenager, is guided physical contact always the right form of the third channel?</p>
        <OptionGroup name="t8" options={T8} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Does a channel that worked on one exercise automatically work on the next exercise
          too?
        </p>
        <OptionGroup name="t9" options={T9} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. You&apos;ve already tried two different ways with the same child, and neither
          worked. Write in two lines what you do now.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explains how the correction works (§10, D34)
  {
    day: "Friday · feedback",
    pct: 88,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Here&apos;s what your answers say</h1>
        <p className="lede">Not about you — about what you did in these questions.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Example of generated feedback, in case of a wrong answer to question 1:
        </p>
        <div className="card quote">
          You answered that you&apos;d repeat it more slowly. It&apos;s the most natural instinct,
          but if a way hasn&apos;t worked twice, repeating it a third time rarely changes
          anything. The time you spend repeating the same way is time you could spend trying a
          different one.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Feedback never just says &quot;you got it wrong&quot;: it says what to look at next
          time. The tone always stays on the observed behavior, never on the person — the same
          rule from Chapter 7.
        </p>
      </>
    ),
  },

  // 8 — recovery: only if the Friday test has too many mistakes (§12, D25/D27)
  {
    day: "recovery",
    pct: 90,
    nextLabel: "Continue ▸",
    showBack: true,
    visible: (a) => {
      const correctAnswers: Record<string, string> = {
        t1: "diverso", t2: "tre", t3: "no", t4: "no", t5: "no",
        t6: "no", t7: "no", t8: "no", t9: "no",
      };
      const wrong = Object.entries(correctAnswers).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found a few rough spots</div>
        <h1>Three more examples, to recognize a truly different channel</h1>
        <p className="lede">
          This isn&apos;t a failure: it&apos;s just a sign that it&apos;s worth revisiting the
          trickiest point of this chapter with a few more examples — what really counts as
          &quot;a different way&quot;, and what&apos;s just the same road repeated.
        </p>

        <div className="card scene">
          <div className="who">An 8-year-old, breaststroke</div>
          <p>
            He can&apos;t coordinate his legs. The instructor explains in words: &quot;open, push,
            close&quot;. It doesn&apos;t work. She tries again in words, this time more slowly.
            Still nothing. She tries a third time, sounding out every syllable.
          </p>
        </div>
        <p className="prompt">Has she tried three different ways?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Yes — she changed pace and tone three times", correct: false },
            {
              value: "no",
              label: "No — those are three variations of the same channel (telling), not three different channels",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">A 9-year-old girl, two different exercises</div>
          <p>
            Last week, letting her feel the movement with your hands unlocked the glide. This week
            she has to learn the turn, an exercise never tackled before. The instructor, without
            thinking, guides her with his hands again — &quot;it always works with her that
            way&quot;. It doesn&apos;t work: she stays unsure, like the first times.
          </p>
        </div>
        <p className="prompt">What did the instructor get wrong, even before trying?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "niente",
              label: "Nothing — a channel that worked once is still the right choice afterward",
              correct: false,
            },
            {
              value: "nuovo",
              label:
                "He took the channel for granted instead of treating the turn as a new problem",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">A 14-year-old boy, the technical dive</div>
          <p>
            He keeps getting the water entry wrong despite two verbal explanations. On the third
            attempt, the instructor talks to him again — this time with more precise technical
            terms, &quot;the entry angle&quot;, &quot;the hip extension&quot; — thinking he&apos;s
            changed approach.
          </p>
        </div>
        <p className="prompt">Did he really use a new channel?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "si",
              label: "Yes — more technical language is a different way of explaining",
              correct: false,
            },
            {
              value: "no",
              label:
                "No — it's still \"telling\", just with harder words: it's the same channel already ruled out twice",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Changing the words isn&apos;t changing the channel. The repertoire only works if the
          three ways — showing, telling, feeling — stay genuinely different from each other, every
          time you need them.
        </p>
      </>
    ),
  },

  // 9 — result
  {
    day: "Friday · result",
    pct: 95,
    nextLabel: "Go to Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Result</div>
        <h1>Your profile is updated</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Score</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Where it comes from</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>The 10 test questions</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>The alternative way you wrote in §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you changed course with Bianca in §8, across both situations</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Repertoire and adaptation</td>
                <td style={{ padding: "6px 0" }}>The lowest of the scores above</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 10 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapter 8 completed</div>
        <div className="eyebrow">Week 8 of 10 · Chapter 9 coming up</div>
        <h1>When they won&apos;t have it</h1>
        <p className="lede">
          So far you&apos;ve learned what to do when a child can&apos;t manage it. Next week
          you&apos;ll learn the difference — because it isn&apos;t the same thing — when a child
          simply won&apos;t have it.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="en" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="en" />
        <h2>Your progress</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Self-awareness</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Recognizing the student</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Watching and understanding <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Rapport</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Instructions and congruence</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Verifying through action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · The feedback</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip acquisita">
            <span className="name">8 · Changing course</span>
            <span className="state">acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Difficult situations</span>
            <span className="state">not acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomy</span>
            <span className="state">not acquired</span>
          </div>
        </div>
      </>
    ),
  },
];
