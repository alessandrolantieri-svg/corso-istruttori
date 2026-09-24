import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-2.tsx) — solo il testo visibile cambia.

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

const DIARY_KEYS = ["q2", "q7", "q7b", "q13", "t10"];

export const capitolo2StepsEn: Step[] = [
  // 0 — copertina
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 2 · WHO&apos;S IN FRONT OF ME</div>
        <h1>What changes between a 4-year-old child and a 15-year-old</h1>
        <p className="lede">
          The instructor recognizes a student&apos;s age band from how they respond — not from the
          age on their ID card — and chooses the first word to use accordingly.
        </p>
      </>
    ),
  },

  // 1 — lunedì: attivazione + consolidamento Cap1
  {
    day: "Monday · 10 min",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>Welcome back. How did it go in the pool?</h1>
        <p className="lede">
          Last week I asked you just one thing: count how many times, in a session, you explain
          the same thing the exact same way.
        </p>
        <p className="prompt">
          How many times did you count? And, thinking back: was there a moment where changing your
          approach might have worked better?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 1 comes back</h2>
        <p className="prompt">1. Does the VAK test tell you who you are as an instructor?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — it shows you a habit, not an identity", correct: true },
            { value: "si", label: "Yes, it's a reliable diagnosis", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Your least-used channel is the one...</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "evita", label: "You don't need to learn", correct: false },
            {
              value: "allena",
              label: "You risk forgetting under pressure — the one to train",
              correct: true,
            },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">
          3. If one way of explaining doesn&apos;t work, is the right thing to repeat it more
          slowly?
        </p>
        <OptionGroup
          name="k3"
          options={[
            { value: "falso", label: "False — you change channel, you don't just slow down the same one", correct: true },
            { value: "vero", label: "True — repeating it more slowly helps them understand", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. In the example of the 8-year-old and breaststroke, which channel worked last?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "mostra", label: "Showing", correct: false },
            { value: "dice", label: "Telling", correct: false },
            { value: "sente", label: "Guiding by feel — only after trying the other two", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. In that example, had the instructor gotten it wrong the first two times he tried?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "si", label: "Yes, he wasted time for nothing", correct: false },
            {
              value: "no",
              label:
                "No — he just used, one after another, his two most comfortable channels, before getting to the right one",
              correct: true,
            },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Your VAK profile shows a high score on &quot;Telling&quot;: does that mean you should
          never use &quot;Showing&quot;?
        </p>
        <OptionGroup
          name="k6"
          options={[
            {
              value: "no",
              label: "No — it just means you risk forgetting it under pressure, not that it should be avoided",
              correct: true,
            },
            { value: "si", label: "Yes, better to stick to your strong channel", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martedì: la tabella delle fasce
  {
    day: "Tuesday · 15 min",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3 && !!a.c4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>Not the age. The band.</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          This week you learn to recognize not a child&apos;s age, but their band — and those are
          two different things.
        </p>
        <p className="lede">
          A 6-year-old and a 9-year-old are in the same band. A 10-year-old and an 11-year-old
          aren&apos;t. The boundaries don&apos;t follow the birthday: they follow what a child can
          actually do with the words you give them.
        </p>
        <div className="table-wrap">
          <table className="fasce">
            <tbody>
              <tr>
                <th>Band</th>
                <th>What really changes</th>
              </tr>
              <tr>
                <td>3-5</td>
                <td>
                  One thing at a time. An instruction with two steps often gets lost halfway
                  through. Play is the language itself.
                </td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>
                  Starts being able to follow two steps in sequence. &quot;Well done&quot; still
                  works, simple and direct.
                </td>
              </tr>
              <tr>
                <td>11-13</td>
                <td>
                  Embarrassment in front of the group arrives — a correction said out loud can shut
                  a kid down for the rest of the lesson.
                </td>
              </tr>
              <tr>
                <td>14-18</td>
                <td>
                  Demands the why. An instruction with no reason doesn&apos;t get carried out: it
                  gets argued with, or ignored.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Recognize the band from how they respond to you, not from how old they are. It&apos;s
          the only thing you really need to learn today.
        </div>
        <p className="lede">
          Getting the band wrong costs you in both directions: treating a thirteen-year-old like a
          little kid makes them feel mocked; treating a seven-year-old like a grown-up loses them
          halfway through a sentence.
        </p>
        <p className="lede">
          <strong>
            Something worth knowing right away, and it complicates the table a little — on
            purpose.
          </strong>{" "}
          The band isn&apos;t fixed, not even for the same child. A 13-year-old, alone with you,
          with no group watching, can seem like a different person — more open, more at ease. You
          weren&apos;t wrong about him last week. The context changed, not him. A very
          self-confident 9-year-old can already show, in certain situations, the embarrassment
          typical of 11-13. The table tells you where to look. The child in front of you in that
          moment tells you the real answer.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Can a 6-year-old follow an instruction with two steps in a row?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "No, not before age 10", correct: false },
            { value: "si", label: "Yes — at 6, they're just starting to manage it", correct: true },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. What really changes for a 15-year-old compared to a 10-year-old?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "perche", label: "They demand the why — an instruction with no reason doesn't get carried out", correct: true },
            { value: "parole", label: "They understand harder words", correct: false },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">
          3. A 13-year-old, with no group around, behaves more &quot;like a little kid&quot; than
          usual, open and without embarrassment. Is that a contradiction?
        </p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Yes, it means you got his age band wrong", correct: false },
            {
              value: "no",
              label: "No — the age band is also read from context: without the group, embarrassment weighs much less",
              correct: true,
            },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
        <p className="prompt">
          4. Can a very self-confident 9-year-old already show, in certain situations, reactions
          typical of the 11-13 band?
        </p>
        <OptionGroup
          name="c4"
          options={[
            {
              value: "si",
              label: "Yes — the boundaries are indicative: you read the response, not the birth certificate",
              correct: true,
            },
            { value: "no", label: "No, never before turning 10", correct: false },
          ]}
          selected={answers.c4}
          onPick={(v, correct) => setResponse("c4", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercoledì: esempio + applicazione + simulazione
  {
    day: "Wednesday · 20 min",
    pct: 55,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "pubblico" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>Four children, four bands, the same attention</h1>
        <div className="card scene">
          <div className="who">Sofia, 5 years old</div>
          <p>
            She glides poorly on her back. Instead of a long technical correction, the instructor
            says: &quot;be a starfish!&quot; — one image, one single word. Sofia spreads her arms
            and her body stretches out on its own.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Tommaso, 9 years old</div>
          <p>
            He has to learn a two-step entry. The instructor gives the whole instruction, in
            order: &quot;first you stretch your arms, then you push with your legs.&quot;
            Tommaso carries it out in order — at 5 it would have been almost impossible, at 9
            it&apos;s already normal.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Giacomo, 12 years old</div>
          <p>
            He&apos;s getting a technical exercise wrong. Out of habit, the instructor says in
            front of the whole group: &quot;Giacomo, look how crooked you are, relax your
            back!&quot; Giacomo blushes, stiffens up, and avoids the exercise for the rest of the
            lesson.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Andrea, 16 years old</div>
          <p>
            He&apos;s learning a more technical turn than the one he&apos;s used so far. Following
            the habit picked up with younger kids, the instructor shows him the movement and just
            says &quot;do it like this.&quot; Andrea tries it mechanically, then asks: &quot;but
            why do it this way, wasn&apos;t the other way faster?&quot; The instructor adds, in
            two sentences, why that technique gains time exactly where he loses speed. Andrea
            nods, and this time puts real effort into it.
          </p>
        </div>
        <p className="lede">
          The same respect, applied in four opposite ways — with Giacomo it was enough to step
          closer and say the same thing to him alone; with Andrea it was enough to add the why
          that his band demands.
        </p>
        <p className="prompt">
          Giacomo is repeating the same mistake. The group is nearby and can hear. Rewrite the
          correction — same technical content, but in the right way for his band.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: the system looks for two things — that
            the correction stays private (stepping closer, lowering the voice, not shouting from
            a distance) and that it doesn't target the person ("you're all crooked") but the
            behavior ("your back is bending"). */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>GIACOMO, 12 years old.</strong> He&apos;s just made the same mistake again. The
          group is nearby. What do you do?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "pubblico", label: "I tell him out loud, from where I am — it's still correct" },
            { value: "privato", label: "I step closer and tell him quietly, just to him" },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "pubblico" && (
          <div className="feedback retry">
            GIACOMO: <em>(doesn&apos;t respond, looks away, shoulders tighten)</em> &quot;...ok.&quot;{" "}
            <em>(the exercise ends here for today)</em>
            <br />
            Same content, but from a distance and in front of everyone — for this band it costs
            more than it seems.
          </div>
        )}
        {answers.sim === "privato" && (
          <div className="feedback ok">
            GIACOMO: <em>(tries again right away, without waiting)</em> &quot;...ah, ok, I&apos;ll try.&quot;
            <br />
            Same mistake, same correction — only where and how you said it changes.
          </div>
        )}
        {answers.sim === "privato" && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Giacomo tries again. The movement improves, but it&apos;s not perfect yet. He turns
              toward you, not entirely sure: &quot;...it&apos;s already better, right?&quot;
            </p>
            <p className="prompt">Write what you say back to him now.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "specifico", label: "\"Yes — your shoulders are already lower, you can see the difference\"" },
                { value: "generico", label: "\"Good job, keep going like that\"" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "specifico" && (
              <div className="feedback ok">
                GIACOMO lights up a little, and tries again with more confidence — he knows
                exactly what worked, not just that &quot;it&apos;s going better.&quot;
              </div>
            )}
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                GIACOMO nods, but the doubt remains the same: he doesn&apos;t know exactly what
                got better, so he doesn&apos;t know what to deliberately repeat on the next try.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — turno in vasca
  {
    day: "in the pool",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>Guess the band, before checking the age</h1>
        <p className="lede">
          This week, pick a student and try to guess their band from how they respond to you —
          not from the age you already know. Then, only afterward, check if you were right.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>
          You don&apos;t need to get it right. You need to have asked yourself the question before
          taking the age for granted.
        </p>
        <p className="prompt">
          A 16-year-old, during warm-up, asks: &quot;why do we always have to do this boring
          exercise?&quot; — he&apos;s not saying it to protest, it sounds like a genuine question.
          What do you answer, in one sentence?
        </p>
        <Field id="q13" value={answers.q13 ?? ""} onChange={(v) => setReflection("q13", v)} />
        {/* Grading note, not shown to the instructor: the system looks for a practical, direct
            reason — not an order ("because I said so") and not a long lecture. */}
      </>
    ),
  },

  // 5 — venerdì test cumulativo
  {
    day: "Friday · 12 min",
    pct: 85,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 1 + Chapter 2</div>
        <h1>The test</h1>
        <p className="prompt">
          1. Marco is 5 and Elena is 13 — neither will get into the water alone. Same sentence to
          convince them both?
        </p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Yes, fear is the same at every age", correct: false },
            {
              value: "no",
              label: "No — at 5, a game or an offered hand; at 13, not being watched while she hesitates",
              correct: true,
            },
            { value: "carattere", label: "It only depends on personality", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. A 15-year-old asks: &quot;why do I have to do this exact exercise?&quot; You answer:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "dico", label: "\"Because I said so, now do it\"", correct: false },
            { value: "bracciata", label: "\"Because it lengthens your stroke — try it and feel the difference\"", correct: true },
            { value: "ignoro", label: "You ignore the question and repeat the instruction", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">
          3. True or false: the age band is recognized better from how they respond than from their ID
          card.
        </p>
        <OptionGroup
          name="t3"
          options={[
            { value: "vero", label: "True", correct: true },
            { value: "falso", label: "False", correct: false },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Can a 6-year-old follow an instruction with two steps in a row?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "no", label: "No, not yet", correct: false },
            { value: "si", label: "Yes — at 6, they're just starting to", correct: true },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">5. Does treating a 7-year-old with a long technical explanation, like an adult, work?</p>
        <OptionGroup
          name="t5"
          options={[
            { value: "no", label: "No — you lose him halfway through, even if he seems to be listening", correct: true },
            { value: "si", label: "Yes, if it's clear", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. <em>(from Chapter 1)</em> Your least-used VAK channel is the one to...
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "evita", label: "Avoid, because you're not good at it", correct: false },
            {
              value: "allena",
              label: "Train, because it's the one you risk forgetting under pressure",
              correct: true,
            },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Does getting the age band wrong cost you in only one direction?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Yes, only if you treat them too much like a little kid", correct: false },
            { value: "no", label: "No — it costs you in both directions", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. A 13-year-old, with no group around, behaves in a more open and less awkward way than
          usual. What does that mean?
        </p>
        <OptionGroup
          name="t8"
          options={[
            {
              value: "contesto",
              label: "That the age band is also read from context — without the group, embarrassment weighs much less",
              correct: true,
            },
            { value: "sbagliato", label: "That you had gotten his age band wrong", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Andrea, 16, does a new exercise mechanically until you also explain the why. What was
          he really missing?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "attenzione", label: "Attention", correct: false },
            {
              value: "motivo",
              label: "A reason — at this age, an image or an order alone often isn't enough",
              correct: true,
            },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. An 11-year-old, in front of the group, gets an exercise wrong that he already knew
          how to do. What do you do first, even before correcting him?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 6 — feedback: explains how the correction works (§10, D34)
  {
    day: "Friday · feedback",
    pct: 87,
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
          You answered that the same sentence works for both of them. Reread the two ages: at 5,
          fear is overcome with a game or a close physical presence; at 13, often, the problem
          isn&apos;t just the water anymore — it&apos;s being seen hesitating by others. Same
          starting emotion, different obstacle.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Feedback never just says &quot;you got it wrong&quot;: it says what to look at next
          time. The tone is always about the observed behavior, never about the person (see
          Chapter 7, which will come back to exactly this rule).
        </p>
      </>
    ),
  },

  // 7 — recovery: only if the Friday test has too many errors (§12, D25/D27)
  {
    day: "recovery",
    pct: 90,
    nextLabel: "Continue ▸",
    showBack: true,
    visible: (a) => {
      const correctAnswers: Record<string, string> = {
        t1: "no", t2: "bracciata", t3: "vero", t4: "si", t5: "no",
        t6: "allena", t7: "no", t8: "contesto", t9: "motivo",
      };
      const wrong = Object.entries(correctAnswers).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found some difficulty</div>
        <h1>Three more examples, to train the eye</h1>
        <p className="lede">
          This isn&apos;t a failure: it&apos;s just a signal that it&apos;s worth revisiting the
          most delicate point of this chapter with a few more examples — same age, different
          reactions.
        </p>

        <div className="card scene">
          <div className="who">Two children, both 10 years old</div>
          <p>
            Same group. To the first, after a mistake, you say in front of the others &quot;come
            on, try again, no worries&quot; — he shrugs and tries again right away. To the second
            you say the exact same sentence — he freezes, blushes, and avoids that exercise for
            the rest of the session.
          </p>
        </div>
        <p className="prompt">Are they in the same functional band?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Yes, they're the same age", correct: false },
            {
              value: "no",
              label: "No — the first still responds like 6-10, the second already has the embarrassment typical of 11-13",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Martina, 11 years old</div>
          <p>
            In a group, a correction said out loud shuts her down for the rest of the lesson —
            typical 11-13. The following week, alone with you in an individual recovery session,
            the exact same correction doesn&apos;t bother her at all: she responds and tries again
            right away, simply, directly.
          </p>
        </div>
        <p className="prompt">Did you get her band wrong the first time?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "no",
              label: "No — the context changed (the group watching), not her",
              correct: true,
            },
            { value: "si", label: "Yes, the first assessment was wrong", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Two boys, both 12 years old</div>
          <p>
            You give both the same two-step instruction in sequence. The first follows it without
            getting lost. The second gets lost halfway through, the way a younger child would, and
            asks you to repeat just the first part.
          </p>
        </div>
        <p className="prompt">Should the second one be treated as if he were 7?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Yes, on this he should be treated as a young child", correct: false },
            {
              value: "no",
              label: "No — on this specific task he needs one step at a time, but he's still 11-13 for everything else",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          The band table tells you where to look. The child in front of you in that moment, with
          that group, on that day, tells you the real answer.
        </p>
      </>
    ),
  },

  // 8 — risultato
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>The 10 test questions</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>The correction you rewrote in §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>How you handled Giacomo in §8, across both exchanges</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 1</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  transfer_score
                </td>
                <td style={{ padding: "6px 0" }}>Tuesday&apos;s answer, about the 16-year-old</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Recognizing the student
                </td>
                <td style={{ padding: "6px 0" }}>The lowest of the scores above</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 9 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapter 2 completed</div>
        <div className="eyebrow">Week 2 of 10 · Chapter 3 coming up</div>
        <h1>Watching and understanding</h1>
        <p className="lede">
          Today you learned to recognize who&apos;s in front of you. Next week you&apos;ll learn
          to read what&apos;s happening to them in that exact moment.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="en" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="en" />
        <h2>Your progress</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Self-awareness</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip acquisita">
            <span className="name">2 · Recognizing the student</span>
            <span className="state">acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">3 · Watching and understanding <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">not acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">4 · Rapport</span>
            <span className="state">not acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Instructions and congruence</span>
            <span className="state">not acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Verifying through action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">not acquired</span>
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
