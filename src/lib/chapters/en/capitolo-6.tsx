import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
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

const K1_OPTIONS: Option[] = [
  { value: "no", label: "No — better to say what to do: \"look to the side when you breathe\"", correct: true },
  { value: "si", label: "Yes — it's still clear, it says what to avoid", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Yes — it's a real figure, measured in a famous study", correct: false },
  { value: "no", label: "No, that's a number taken out of context", correct: true },
];
const K3_OPTIONS: Option[] = [
  { value: "corpo", label: "The body — it's the hardest signal to fake", correct: true },
  { value: "parole", label: "The words — they're the explicit message, so the most reliable one", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "bersaglio", label: "A target", correct: true },
  { value: "ostacolo", label: "An obstacle", correct: false },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No — in a real emergency, immediate clarity matters more", correct: true },
  { value: "si", label: "Yes, the rule always applies, even in an emergency", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "sincero", label: "As a sincere compliment — the right words are enough regardless", correct: false },
  { value: "abitudine", label: "As something said out of habit, not real recognition", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "no", label: "No — they answer \"yes\" almost every time, regardless", correct: true },
  { value: "si", label: "Yes — if you ask calmly, the child answers honestly", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "ascolta", label: "I communicate → they listen → done", correct: false },
  { value: "fa", label: "I communicate → they understand → they act", correct: true },
];
const M3_OPTIONS: Option[] = [
  { value: "secondo", label: "Watch a second attempt, or make the first one more explicit", correct: true },
  { value: "chiedo", label: "Go back to asking \"did you understand?\" — that's usually enough to clear it up", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "chiedo", label: "You ask her if she understood" },
  { value: "tentativo", label: "You ask her for a short first attempt, or to show it to you while stopped at the poolside" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "riparte", label: "You give the correction and let her set off again, without watching the next attempt" },
  { value: "osservi", label: "You give the correction and watch the next attempt before letting her move on" },
];

const T1_OPTIONS: Option[] = [
  { value: "no", label: "No — almost everyone answers \"yes\" regardless", correct: true },
  { value: "si", label: "Yes — if you ask attentively, the answer is reliable", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "ascolta", label: "I communicate → the child listens → done", correct: false },
  { value: "fa", label: "I communicate → they understand → they act", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "osservi", label: "You watch a short first attempt", correct: true },
  { value: "parte", label: "You let him set off for the full exercise", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "chiedo", label: "Asking him if he understood, with simple words", correct: false },
  { value: "compito", label: "A small immediate task: \"show it to me now\"", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "parole", label: "The words — they're the explicit message, so the most reliable one", correct: false },
  { value: "corpo", label: "The body — it's the hardest signal to fake", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Yes, what matters is trying — the error sorts itself out along the way", correct: false },
  { value: "no", label: "No — the error is discovered later, when it costs more to correct", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "no", label: "No — you always need at least one real pool session, recounted and verified", correct: true },
  { value: "si", label: "Yes, if the answers are correct, the rest is just formality", correct: false },
];
const T8_OPTIONS: Option[] = [
  { value: "decidi", label: "Decide anyway, partial information is enough", correct: false },
  { value: "secondo", label: "Watch a second attempt, or make the first one more explicit", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "si", label: "Yes, the correction itself is enough, no further check needed", correct: false },
  { value: "no", label: "No — the correction also needs to be re-checked through action", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo6StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 6 · GETTING THEM TO ACT, AND SEEING IF IT LANDED <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>&quot;Did you understand?&quot; is useless. So then?</h1>
        <p className="lede">
          The instructor verifies whether a message has landed by watching whether the child does
          what was asked — not by asking if they understood.
        </p>
        <div className="card warn">
          <strong>Higher standard.</strong> Along with Chapter 3, this is one of the two listening
          competencies: here ACQUIRED isn&apos;t enough, you need to reach{" "}
          <strong>EXCELLENT</strong> before the final exam — and simulation alone is never enough:
          at least one real pool session is always required.
        </div>
      </>
    ),
  },

  // 1 — Monday: reflection + Chapter 5 consolidation
  {
    day: "Monday · 8 min",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>How did it go in the pool?</h1>
        <p className="lede">
          Last week: one instruction in positive form, given while stopping to look at the child.
          What did you notice in their reaction, compared to usual?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 5 comes back</h2>
        <p className="prompt">1. Is &quot;don&apos;t sink your head&quot; a good instruction?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Words account for 7% of communication — is that true in general?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. If words and body contradict each other, the child believes...</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Does a positive instruction give the body a target or an obstacle?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. In a real emergency, is it wrong to say &quot;stop!&quot; instead of rephrasing in
          positive form?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. A 14-year-old boy receives a genuine compliment, but said in a mechanical tone with a
          distracted body. How is he most likely to experience it?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — Tuesday: I communicate → they understand → they act
  {
    day: "Tuesday · 13 min",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>I communicate → they understand → they act</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          You said the right thing, the right way. But did it actually land? Today you learn to
          find out without asking.
        </p>
        <p className="lede">
          The real sequence isn&apos;t &quot;I communicate → the child listens&quot;.{" "}
          <strong>Action is the proof</strong>, not listening. And the question most often used to
          check — &quot;did you understand?&quot; — is almost useless: a child answers
          &quot;yes&quot; almost every time, whether they understood or not.
        </p>
        <div className="card quote">
          The right question isn&apos;t asked in words: it&apos;s asked with your eyes. You give
          the instruction, and watch what happens — not whether they nod, but whether the body
          starts doing what you asked.
        </div>
        <p className="lede">
          <strong>A useful exception:</strong> with the youngest children (ages 3-5) you can turn
          the check into a small immediate task — &quot;show me how you do the starfish&quot; —
          instead of asking if they understood. It&apos;s still the same rule: you verify with
          action, not with words.
        </p>
        <p className="lede">
          <strong>And what if the first attempt you observe isn&apos;t clear?</strong> Sometimes
          the movement you see is neither clearly right nor clearly wrong — you&apos;ve only seen
          part of it, not enough to be sure. That&apos;s not the method&apos;s fault: watch a
          second attempt, or make the first one a bit more explicit (&quot;do it again, a little
          slower&quot;) — don&apos;t go back to asking &quot;did you understand?&quot;, and
          don&apos;t guess. Verifying through action doesn&apos;t mean one look is always enough:
          it means what you see is always what decides — even if sometimes you need to look twice
          before being sure.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Is &quot;did you understand?&quot; reliable because the child answers honestly?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. The correct sequence is:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. The first attempt you observe isn&apos;t clearly right or clearly wrong. What do you
          do?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — Wednesday: scenes + application + Sara simulation
  {
    day: "Wednesday",
    pct: 46,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback: ReactNode =
        answers.sim === "chiedo" ? (
          <div className="feedback retry">
            SARA: &quot;Yes, I understand!&quot; <em>(sets off for the glide — her arms bend right away)</em>
            <br />
            You discover the error later, in the middle of the exercise.
          </div>
        ) : answers.sim === "tentativo" ? (
          <div className="feedback ok">
            SARA: <em>(tries the position at the poolside — her arms are already bent)</em> &quot;...like this?&quot;
            <br />
            You see it before she even sets off — and you can correct it while it still costs
            little.
          </div>
        ) : null;

      const sim2Feedback: ReactNode =
        answers.sim2 === "riparte" ? (
          <div className="feedback retry">
            SARA sets off again, and nobody knows if the error was really corrected until
            she&apos;s halfway across again — the correction, on its own, isn&apos;t yet a
            verification.
          </div>
        ) : answers.sim2 === "osservi" ? (
          <div className="feedback ok">
            SARA tries again: her arms stay almost extended. Now you know for certain — not
            because she said so, but because you saw it.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Wednesday</div>
          <h1>You watch the body, you don&apos;t listen to the answer</h1>
          <div className="card scene">
            <div className="who">An 8-year-old, &quot;yes, I understand&quot;</div>
            <p>
              After the explanation of side breathing, he confidently says &quot;yes, I
              understand&quot;. The instructor lets him set off for the full length. Halfway
              across he starts swallowing water, stops, coughs. If the instructor had watched the
              first stroke, he&apos;d have seen that the boy turned his head too late relative to
              his arm — visible right away, not halfway across. The &quot;yes&quot; wasn&apos;t a
              lie: it was just useless as information.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Emma, 4 years old</div>
            <p>
              The instructor has just shown her how to do the starfish. With her, it doesn&apos;t
              make sense to ask &quot;did you understand?&quot; — instead he says: &quot;show it
              to me yourself, right now, at the poolside.&quot; Emma spreads her arms and legs,
              imperfect but in the right direction — three seconds, not ten minutes.
            </p>
          </div>
          <div className="card scene">
            <div className="who">A 15-year-old boy</div>
            <p>
              He says &quot;yes, I get it, relax&quot; with a slightly impatient tone, after the
              explanation of a technical turn — at that age, &quot;did you understand?&quot; can
              feel almost like an insult. The instructor doesn&apos;t repeat it, and doesn&apos;t
              even ask him to &quot;show me&quot; the way he did with Emma: he suggests, as one
              equal to another, &quot;let&apos;s do a slow run-through at the poolside before you
              dive in, just to be sure about the timing.&quot; Doing it slowly, the boy hesitates
              right at the critical point. He wasn&apos;t tested like a child: he was offered a
              check dressed up as technical fine-tuning.
            </p>
          </div>
          <p className="lede">
            <strong>
              Same rule, three different age groups — only how the request is dressed up for the
              age changes.
            </strong>
          </p>
          <p className="prompt">
            You&apos;ve just given an instruction to a 9-year-old. He nods and says &quot;yes, I
            understand&quot;. What do you do, before letting him set off for the full exercise?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Grading note, not shown to the instructor: the system looks for whether they
              propose a short first attempt to observe, instead of trusting the word and letting
              him go straight into the whole thing. */}
          <h2>Simulation</h2>
          <p className="lede">
            <strong>SARA, 10 years old.</strong> You&apos;ve just explained to her how to keep her
            arms extended during the glide. What do you do to check whether the instruction
            landed?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim && (
            <>
              <p className="lede" style={{ marginTop: 14 }}>
                Whatever your first choice was, you&apos;ve now seen the error: Sara&apos;s arms
                are bent. You give her a correction in positive form, with tone and body
                consistent.
              </p>
              <p className="prompt">
                Write what you do right after giving the correction — not just the correction
                itself.
              </p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {sim2Feedback}
            </>
          )}
        </>
      );
    },
  },

  // 4 — Wednesday evening: transfer to ages 3-5
  {
    day: "Wednesday evening",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>Ages 3-5, without having tried anything yet</h1>
        <p className="lede">
          A 5-year-old, in the 3-5 age group, needs to learn to blow bubbles underwater. You
          haven&apos;t tried anything with him yet.
        </p>
        <p className="prompt">
          How do you check whether he understood, respecting his age group — without asking him
          &quot;did you understand?&quot;
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
      </>
    ),
  },

  // 5 — turn in the pool
  {
    day: "in the pool",
    pct: 69,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>A whole session, without &quot;did you understand?&quot;</h1>
        <p className="lede">
          This week, for a whole session, don&apos;t ask anyone &quot;did you understand?&quot;.
          Give the instruction and watch the action. Just that.
        </p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          If you don&apos;t have a session this week: a reinforced simulation unlocks the step
          forward, but it&apos;s not enough to bring this competency to EXCELLENT. For that,
          sooner or later, you need a real pool session.
        </p>
      </>
    ),
  },

  // 6 — Friday: cumulative test Chapter 5 + Chapter 6
  {
    day: "Friday · 11 min",
    pct: 86,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 5 + Chapter 6</div>
        <h1>The test</h1>
        <p className="prompt">1. Is &quot;did you understand?&quot; a good check question?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. The correct sequence is:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. A child confidently says &quot;I understand&quot;. What do you do?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. With a 4-year-old, the correct check is:</p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(from Chapter 5)</em> When words and body contradict each other, the child
          believes:
        </p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Is trusting the &quot;yes&quot; instead of watching the action a neutral mistake?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. For this competency, is a good simulation enough for EXCELLENT?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. The first attempt you observe isn&apos;t clear. The right thing to do is:</p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">9. After giving a correction, is the check already complete?</p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. A 13-year-old boy says &quot;ok, I get it, let&apos;s go&quot; with a slightly
          annoyed tone. Write in two lines what you do before letting him start.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explains how correction works (§10, D34)
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
          Example of generated feedback, in case of a wrong answer to question 3:
        </p>
        <div className="card quote">
          You answered that you&apos;d let him set off. But a confident &quot;I
          understand&quot; isn&apos;t a guarantee — it&apos;s just a word. The difference
          between spotting an error at the poolside or discovering it halfway across is a short
          observed attempt beforehand, which costs only a few seconds.
        </div>
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
      const correct: Record<string, string> = {
        t1: "no", t2: "fa", t3: "osservi", t4: "compito", t5: "corpo",
        t6: "no", t7: "no", t8: "secondo", t9: "no",
      };
      const wrong = Object.entries(correct).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found a few rough spots</div>
        <h1>Three times trusting it cost too much</h1>
        <p className="lede">
          This isn&apos;t a failure: it&apos;s just a sign that it&apos;s worth revisiting the
          trickiest point of this chapter with a few more examples — trusting the word, or trusting
          a correction you just gave, instead of watching what actually happens.
        </p>

        <div className="card scene">
          <div className="who">A 9-year-old, low elbows on his back</div>
          <p>
            The instructor explains how to keep the elbows high, then asks &quot;did you
            understand?&quot;. The boy confidently says &quot;yes&quot;. He&apos;s let go for the
            full length — halfway across, the elbows are exactly as low as before: the error is
            only visible now, once it&apos;s already cost half a length.
          </p>
        </div>
        <p className="prompt">What should the instructor have done before letting him set off?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nothing — the \"yes\" was said with confidence, that was enough to trust", correct: false },
            {
              value: "tentativo",
              label: "Asked him for a short attempt to watch, before the full length",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">A correction given, then left there</div>
          <p>
            The instructor corrects a student&apos;s head position — &quot;keep it a bit
            lower&quot; — and turns straight to another child, without watching the next attempt.
            Three lengths later, the head is still in the exact same position as before: nobody had
            noticed.
          </p>
        </div>
        <p className="prompt">Was the correction, by itself, already a check?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Yes — saying it well is already enough", correct: false },
            {
              value: "no",
              label: "No — you need to see it done again at least once, otherwise it's just a word said",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">The same situation, handled well this time</div>
          <p>
            A girl says &quot;I get it, relax&quot; with a confident tone, before trying a flag turn
            she&apos;s never done. This time the instructor asks her to show it to him slowly at the
            poolside first — and sees right away that she gets the timing of the turn wrong, before
            she even dives in.
          </p>
        </div>
        <p className="prompt">Why did it work, this time?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "azione",
              label: "Because he watched the action instead of trusting the word",
              correct: true,
            },
            { value: "sincera", label: "Because this time the girl told the truth", correct: false },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          The &quot;yes&quot; is never the proof. The proof is always what the body does — the
          first time you watch it, and again, the next time.
        </p>
      </>
    ),
  },

  // 9 — Friday: result
  {
    day: "Friday · result",
    pct: 95,
    nextLabel: "Go to Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Result</div>
        <h1>Your profile updates</h1>
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
                <td style={{ padding: "6px 0" }}>The answer at §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you checked in on Sara at §8, correction included</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 5</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Action guidance and verification</td>
                <td style={{ padding: "6px 0" }}>The lowest of the scores above</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          For this specific competency: the EXCELLENT status doesn&apos;t kick in without at least
          one real pool session recounted and verified. Today it stays ACQUIRED.
        </p>
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
        <div className="done-badge">✓ Chapter 6 completed</div>
        <div className="eyebrow">Week 6 of 10 · Chapter 7 coming up</div>
        <h1>The feedback</h1>
        <p className="lede">
          Today you learned to see whether something landed. Next week you&apos;ll learn what to
          say afterward — when it went well, and when it didn&apos;t.
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
          <div className="chip acquisita">
            <span className="name">6 · Verifying through action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · The feedback</span>
            <span className="state">not acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Changing course</span>
            <span className="state">not acquired</span>
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
