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

const K_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "k1",
    prompt: "1. Is \"did you understand?\" a good check?",
    options: [
      { value: "no", label: "No — almost everyone says yes regardless", correct: true },
      { value: "si", label: "Yes — if you ask in a firm tone, the child answers honestly", correct: false },
    ],
  },
  {
    key: "k2",
    prompt: "2. The correct sequence is:",
    options: [
      { value: "ascolta", label: "I communicate → they listen, then figure it out on their own over time", correct: false },
      { value: "fa", label: "I communicate → they understand → they act", correct: true },
    ],
  },
  {
    key: "k3",
    prompt: "3. A child confidently says \"I understand\". Do you let him set off for the full exercise?",
    options: [
      { value: "no", label: "No — first a short, observed attempt", correct: true },
      { value: "si", label: "Yes — if he says it with confidence, the short attempt is unnecessary", correct: false },
    ],
  },
  {
    key: "k4",
    prompt: "4. With a 4-year-old, is the correct check to ask if he understood?",
    options: [
      { value: "si", label: "Yes — at that age, asking him in simple words is enough", correct: false },
      { value: "no", label: "No — a small immediate task: \"show it to me now\"", correct: true },
    ],
  },
  {
    key: "k5",
    prompt: "5. The first attempt you observe isn't clearly right or clearly wrong. What do you do?",
    options: [
      { value: "secondo", label: "Watch a second attempt, or make the first one more explicit", correct: true },
      { value: "chiedo", label: "Go back to asking \"did you understand?\" — he already answered once", correct: false },
    ],
  },
  {
    key: "k6",
    prompt: "6. After giving a correction, is the check already complete?",
    options: [
      { value: "si", label: "Yes, the correction itself is enough, nothing more needed", correct: false },
      { value: "no", label: "No — the correction also needs to be re-checked through action", correct: true },
    ],
  },
];

const M_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "m1",
    prompt: "1. Does \"you're distracted\" describe a moment or label the person?",
    options: [
      { value: "persona", label: "It labels the person", correct: true },
      { value: "momento", label: "It describes only the behavior of that moment, not him as a person", correct: false },
    ],
  },
  {
    key: "m2",
    prompt: "2. A child swallowed water during the exercise. What happened to him?",
    options: [
      { value: "fallito", label: "He got the exercise wrong, and needs correcting right away", correct: false },
      { value: "veloce", label: "He tried to go faster than his body could handle yet", correct: true },
    ],
  },
  {
    key: "m3",
    prompt: "3. An attempt improves one detail but loses another. The right feedback is:",
    options: [
      { value: "entrambe", label: "Name both things, specifically", correct: true },
      { value: "uno", label: "Choose only praise, or only correction, to avoid confusion", correct: false },
    ],
  },
];

const SIM_OPTIONS: Option[] = [
  { value: "persona", label: "\"You're not paying attention, you need to try harder\"" },
  { value: "comportamento", label: "\"Your arms opened too soon, keep them together a moment longer\"" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "generico", label: "\"Good, much better!\" — just generic praise" },
  { value: "entrambe", label: "You name both the improvement and the new detail, both specifically" },
];

const T_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "t1",
    prompt: "1. Are \"you're distracted\" and \"just now you were looking at the window\" the same thing?",
    options: [
      { value: "si", label: "Yes — they're two different ways of saying the same thing", correct: false },
      { value: "no", label: "No — the first labels the person, the second describes a moment", correct: true },
    ],
  },
  {
    key: "t2",
    prompt: "2. Is \"good job\" a good compliment?",
    options: [
      { value: "no", label: "It's pleasant but teaches nothing", correct: true },
      { value: "si", label: "Yes — it's short but the child still understands what he did well", correct: false },
    ],
  },
  {
    key: "t3",
    prompt: "3. A child swallowed water during the exercise. Is that a failure?",
    options: [
      { value: "si", label: "Yes — swallowing water during the exercise means he can't handle it", correct: false },
      { value: "no", label: "No — it's information", correct: true },
    ],
  },
  {
    key: "t4",
    prompt: "4. A vague compliment gets forgotten, a specific one...",
    options: [
      { value: "ripete", label: "Gets repeated — the child knows what he did to earn it", correct: true },
      { value: "uguale", label: "Also gets forgotten, it makes no difference — the child remembers it either way", correct: false },
    ],
  },
  {
    key: "t5",
    prompt: "5. (from Chapter 6) Is \"did you understand?\" a good check?",
    options: [
      { value: "si", label: "Yes — if he answers right away, it means he understood well", correct: false },
      { value: "no", label: "No — even a child who didn't understand often says yes", correct: true },
    ],
  },
  {
    key: "t6",
    prompt: "6. Does vague feedback hurt the child?",
    options: [
      { value: "vuoto", label: "It doesn't hurt, but it teaches nothing", correct: true },
      { value: "male", label: "Yes, always — a child who hears the same comment every time switches off", correct: false },
    ],
  },
  {
    key: "t7",
    prompt: "7. An attempt improves one detail but loses another. The right feedback is:",
    options: [
      { value: "uno", label: "Choose only praise, or only correction, to keep it simple", correct: false },
      { value: "entrambe", label: "Name both things, specifically", correct: true },
    ],
  },
  {
    key: "t8",
    prompt: "8. With a teenager, does a specific compliment said in a cheerleader tone (\"great job, champion!\") work the same way as with a young child?",
    options: [
      { value: "no", label: "No — at that age, tone matters as much as content: respectful, not like a cheerleader", correct: true },
      { value: "si", label: "Yes, enthusiasm works at any age", correct: false },
    ],
  },
  {
    key: "t9",
    prompt: "9. If you give a correction and the child only improves partially, is generic praise enough for the next attempt?",
    options: [
      { value: "si", label: "Yes, what matters is encouraging", correct: false },
      { value: "no", label: "No — the new detail still needing correction must also be named", correct: true },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo7StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 7 · THE FEEDBACK</div>
        <h1>What do I tell them after they&apos;ve tried?</h1>
        <p className="lede">
          The instructor gives feedback — positive or corrective — describing the behavior
          observed, never labeling the person.
        </p>
      </>
    ),
  },

  // 1 — Monday: reflection + Chapter 6 consolidation
  {
    day: "Monday · 10 min",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>How did it go in the pool?</h1>
        <p className="lede">
          Last week: a whole session without asking anyone &quot;did you understand?&quot;. What
          did you watch instead, and what did you discover?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 6 comes back</h2>
        {K_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 2 — Tuesday: describing behavior, not labeling the person
  {
    day: "Tuesday · 13 min",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>What they did, not who they are</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          You&apos;ve seen the action. Now: what do you tell them — afterward, when it went well,
          and when it didn&apos;t?
        </p>
        <p className="lede">
          &quot;You&apos;re distracted&quot; talks about him as a person. &quot;Just now you were
          looking at the window&quot; talks only about what happened in that moment. If you say
          the first sentence often, it becomes a label the child carries around — eventually he
          stops trying to prove it wrong, because it&apos;s easier to become what you tell him he
          is. The second sentence instead describes one moment, and that can already change on
          the next try.
        </p>
        <p className="lede">
          <strong>It applies to compliments too.</strong> &quot;You&apos;re good&quot; is pleasant
          but teaches nothing. &quot;You kept your legs straight the whole length&quot; tells him
          exactly what to repeat.
        </p>
        <div className="card quote">
          A child who swallowed water during the exercise didn&apos;t &quot;make a mistake&quot;:
          he tried to go faster than his body was ready to handle yet. Put this way, the error
          becomes information to use — not a fault to pay for.
        </div>
        <p className="lede">
          Even a generic compliment can do as much harm as a generic criticism. It seems harmless
          — nobody&apos;s offended by a &quot;good&quot; — but a child who hears only vague
          praise, chapter after chapter, stops knowing what actually makes him good. Vague
          feedback doesn&apos;t hurt: it simply teaches nothing, and it&apos;s still time spent
          without building anything.
        </p>
        <p className="lede">
          <strong>And when the attempt is halfway there</strong> — neither clearly successful nor
          clearly wrong? It happens more often than it seems: a child who improves one detail but
          loses another. The temptation is to pick just one message — all praise, or all
          correction — but neither is fully true. The correct feedback names both things, always
          specifically: &quot;you kept your arms extended, that&apos;s new and it&apos;s great —
          but your head dropped a bit too soon, try keeping it up a little longer.&quot;
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        {M_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 3 — Wednesday: scenes + application + Tommaso simulation (two attempts)
  {
    day: "Wednesday",
    pct: 46,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>A vague compliment gets forgotten</h1>
        <div className="card scene">
          <div className="who">A 9-year-old, &quot;you&apos;re just not paying attention!&quot;</div>
          <p>
            He keeps turning his head too late. The third time, the instructor says &quot;you&apos;re
            just not paying attention!&quot; — the child shuts down, slows down. If he&apos;d said
            &quot;you turned your head a moment after your arm — try turning it together with the
            arm, not after&quot;, the child would have had precise information, with no label to
            defend against.
          </p>
        </div>
        <div className="card scene">
          <div className="who">An 11-year-old, the perfect dive</div>
          <p>
            He completes a correct starting dive for the first time. The instructor, in a rush,
            says &quot;good job!&quot; without stopping. The child wouldn&apos;t be able to say
            what he did differently — and on the next start he goes back to the old movement.
            Stopping for three seconds — &quot;you extended well through your arms, that&apos;s
            what changed everything&quot; — would have told him what to repeat.
          </p>
        </div>
        <div className="card scene">
          <div className="who">A 16-year-old boy</div>
          <p>
            He&apos;s just improved his time on a turn, after weeks of lagging behind the group.
            In Chapter 2 you already saw the mistake to avoid: treating a teenager in a tone
            meant for a young child makes him feel mocked. That&apos;s why the instructor
            doesn&apos;t say &quot;great job, champion!&quot;. He says, in a normal, almost
            technical tone: &quot;you pushed off
            with your legs a moment before the touch, that&apos;s where you gained the time.&quot;
            The boy nods, doesn&apos;t smile broadly — but the next time he deliberately repeats
            the same movement.{" "}
            <strong>
              Specific works at every age — but at 16, the tone in which it&apos;s specific
              matters as much as the content: respectful, not like a cheerleader.
            </strong>
          </p>
        </div>
        <p className="lede">
          <strong>Three scenes, the same rule: never a label, never generic praise — always the
          precise behavior, at any age.</strong>
        </p>
        <p className="prompt">
          A 10-year-old has just completed a correct starting dive for the first time, after weeks
          of attempts. Write the feedback you&apos;d give him — specific, about the behavior.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: the system looks for feedback that names
            exactly what happened, not generic praise. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>TOMMASO, 8 years old.</strong> He&apos;s just gotten the same exercise wrong for
          the second time in a row. What do you tell him?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "persona" && (
          <div className="feedback retry">
            TOMMASO: <em>(lowers his eyes)</em> &quot;...sorry.&quot; <em>(does it again, the same
            way as before)</em>
            <br />
            He apologized, but got no information about what to change.
          </div>
        )}
        {answers.sim === "comportamento" && (
          <div className="feedback ok">
            TOMMASO: &quot;Ah, ok&quot; <em>(tries again, changing something)</em>
            <br />
            He got a precise instruction, and he uses it.
          </div>
        )}
        {answers.sim && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Tommaso tries again: his arms stay together longer, a real improvement — but now
              it&apos;s his head turning a moment too soon, a new detail, never corrected with him
              before.
            </p>
            <p className="prompt">Write the feedback you give him now.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                TOMMASO smiles, but on the next attempt his head still turns too soon — he
                doesn&apos;t know there&apos;s still something to fix.
              </div>
            )}
            {answers.sim2 === "entrambe" && (
              <div className="feedback ok">
                TOMMASO: &quot;...okay, so my arms are fine but not my head&quot; <em>(tries
                again, this time paying attention to both things)</em>
              </div>
            )}
            <p className="lede" style={{ fontSize: ".85rem" }}>
              Feedback on a halfway attempt isn&apos;t a watered-down compliment or a correction
              dressed up as praise: it&apos;s two true pieces of information, both stated
              specifically.
            </p>
          </>
        )}
      </>
    ),
  },

  // 4 — Wednesday evening: transfer of the rule to positive feedback
  {
    day: "Wednesday evening",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>Even when it goes well</h1>
        <p className="lede">
          A 7-year-old girl has just performed, for the first time, a water entry without holding
          onto the edge. You haven&apos;t decided yet what to tell her.
        </p>
        <p className="prompt">Write the compliment you&apos;d give her, specific, not generic.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: this isn't the scene already seen (which
            was about an error, not a success) — that's intentional. The system checks whether
            they apply the same rule of specificity even when the feedback is positive, not only
            when it's corrective. */}
      </>
    ),
  },

  // 5 — turn in the pool
  {
    day: "in the pool",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>Only the behavior, never the person</h1>
        <p className="lede">
          This week, every piece of feedback you give — positive or corrective — must name a
          precise behavior, never the person. No &quot;good job&quot; and no &quot;you&apos;re not
          paying attention&quot;: just what happened.
        </p>
      </>
    ),
  },

  // 6 — Friday: cumulative test Chapter 6 + Chapter 7
  {
    day: "Friday · 11 min",
    pct: 86,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 6 + Chapter 7</div>
        <h1>The test</h1>
        {T_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
        <p className="prompt">
          10. A 14-year-old boy makes the same technical error for the fourth time and starts
          showing frustration. Write the feedback you&apos;d give him.
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
          Example of generated feedback, in case of a wrong answer to question 1:
        </p>
        <div className="card quote">
          You answered that they&apos;re the same thing. Re-read them: one says who he is
          (&quot;distracted&quot;), the other says what happened in that moment (&quot;you were
          looking at the window&quot;). The second one can be corrected the very next moment. The
          first one, repeated, becomes something hard to shake off.
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
      const correctAnswers: Record<string, string> = {
        t1: "no", t2: "no", t3: "no", t4: "ripete", t5: "no",
        t6: "vuoto", t7: "entrambe", t8: "no", t9: "no",
      };
      const wrong = Object.entries(correctAnswers).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found a few rough spots</div>
        <h1>Three more examples, to train the eye</h1>
        <p className="lede">
          This isn&apos;t a failure: it&apos;s just a sign that it&apos;s worth revisiting the
          trickiest point of this chapter with a few more examples — describing the behavior, not
          labeling the person, and saying it specifically.
        </p>

        <div className="card scene">
          <div className="who">An 8-year-old, the perfect glide</div>
          <p>
            For the first time he keeps his arms fully extended on his back. The instructor just
            says &quot;great job!&quot; and moves to the next student. The child smiles, but on the
            next length he goes back to the old position.
          </p>
        </div>
        <p className="prompt">What was missing from this compliment?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nothing — the enthusiasm of \"great job\" is enough to motivate him", correct: false },
            {
              value: "cosa",
              label: "Knowing exactly what he did differently — without that, he can't repeat it",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">A 10-year-old girl, the halfway dive</div>
          <p>
            In her starting dive, for the first time she keeps her arms fully extended — new. But
            she lifts her feet too soon, a flaw she&apos;s had for weeks. The instructor just says
            &quot;you need to be more careful with your feet&quot;, ignoring the improvement.
          </p>
        </div>
        <p className="prompt">What&apos;s missing from this feedback?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "urgente",
              label: "It's fine as is — correcting the remaining flaw is the most urgent thing",
              correct: false,
            },
            {
              value: "entrambe",
              label:
                "It's missing naming what also improved — the extended arms — not just the flaw that's left",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">A 15-year-old boy, the improved stroke</div>
          <p>
            After weeks, he finally improves his stroke. The instructor, excited, shouts in front
            of the whole group with a cheerleading tone: &quot;Great job champion, you pushed
            really well with your legs!&quot;
          </p>
        </div>
        <p className="prompt">
          The content is specific (&quot;you pushed really well with your legs&quot;). Is that
          enough at this age?
        </p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Yes — if the content is specific, the tone doesn't matter", correct: false },
            {
              value: "no",
              label:
                "No — at this age tone matters as much as content: better normal and respectful, not like a cheerleader",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Behavior described precisely always leaves something to repeat. A label — good or bad —
          leaves nothing to use.
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
                <td style={{ padding: "6px 0" }}>The feedback written at §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you corrected Tommaso at §8, across both attempts</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 6</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Reinforcement and correction</td>
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
        <div className="done-badge">✓ Chapter 7 completed</div>
        <div className="eyebrow">Week 7 of 10 · Chapter 8 coming up</div>
        <h1>Changing course</h1>
        <p className="lede">
          Today you learned to give good feedback. Next week you&apos;ll learn what to do when,
          despite everything, what you say still doesn&apos;t work.
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
          <div className="chip acquisita">
            <span className="name">7 · The feedback</span>
            <span className="state">acquired</span>
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
