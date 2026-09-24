import { OptionGroup } from "@/components/OptionGroup";
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

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo5StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 5 · THE MESSAGE AND THE INSTRUCTION</div>
        <h1>What do I tell them, and how do I show it?</h1>
        <p className="lede">
          The instructor gives instructions in positive form — says what to do, not what not to
          do — and makes sure words, tone and body say the same thing.
        </p>
      </>
    ),
  },

  // 1 — Monday: reflection + Chapter 4 consolidation
  {
    day: "Monday · 8 min",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>How did it go in the pool?</h1>
        <p className="lede">
          Last week: with the most withdrawn — or most agitated — child in the group, you matched
          their rhythm for a minute before asking them anything. What did you notice — in them, or
          in yourself?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 4 comes back</h2>
        <p className="prompt">1. Does matching the child&apos;s rhythm come before or after guiding them?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "prima", label: "Before", correct: true },
            { value: "dopo", label: "After", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. An overexcited child: is the first move to calm them down right away?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Yes — if you don't calm them right away, it can get out of hand", correct: false },
            { value: "no", label: "No — first you go along with it for a moment, then you guide", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Is rapport for getting listened to, or for being liked?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "ascoltare", label: "Getting listened to — it's a professional skill", correct: true },
            { value: "apprezzare", label: "Being liked — if the child likes you, they listen more", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Does matching the rhythm only work with children who withdraw, never with those who
          get overexcited?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "vero", label: "True — with someone already agitated, going along with it agitates them more", correct: false },
            { value: "falso", label: "False — it works the same way, in reverse, with those who are agitated", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">5. A child who was following you well withdraws again halfway through the session. What do you do?</p>
        <OptionGroup
          name="k5"
          options={[
            { value: "torni", label: "Step back: find their rhythm again", correct: true },
            { value: "insisti", label: "Keep going — everything was fine a moment ago", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. With a distant teenage girl, is rapport built the same way as with a 6-year-old?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Yes, exactly the same way", correct: false },
            { value: "no", label: "No — the form changes with age, the order stays the same", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — Tuesday: explanation + check
  {
    day: "Tuesday · 13 min",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>A target, not an obstacle</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Now that he&apos;s listening to you, what you tell him — and how — makes all the
          difference.
        </p>
        <p className="lede">
          <strong>The positive instruction.</strong> &quot;Don&apos;t bend your legs&quot; only
          says what not to do — and leaves everything else open: he could hold them rigid as a
          board, or not move them at all, and the instruction would still count as
          &quot;followed&quot;. You&apos;ve ruled out one single thing not to do, out of a
          thousand, but you haven&apos;t told him what to actually do. &quot;Legs straight as a
          stick&quot; instead gives him one precise thing to do: it&apos;s the only movement the
          body can actually perform to obey.
        </p>
        <p className="lede">
          <strong>One more reason, specific to the water.</strong> A movement is learned better
          when attention is on what needs to happen outside the body — the water to push back,
          the wall to reach — rather than on which muscle to move: many studies confirm this,
          always in the same way. &quot;Push the water back&quot; produces a better
          stroke than &quot;bend your elbow&quot;, even though they describe the exact same
          movement.
        </p>
        <p className="lede">
          <strong>Consistency between words, voice, and body.</strong> You may have heard that
          words account for 7%, tone for 38%, body for 55%. That&apos;s not true — that study
          covered a very narrow case: people listening to a single word said in different ways and
          having to guess a feeling, not communication in general. If it were true, you could
          teach swimming in a language nobody understood and it would still work 93% of the time —
          it doesn&apos;t.
        </p>
        <div className="card quote">
          When the words say one thing and the body says another, the child believes the body —
          not because it &quot;counts for more&quot; in general, but because words are easy to
          control, while the body isn&apos;t: it&apos;s harder to fake.
        </div>
        <p className="lede">
          <strong>And when a prohibition seems unavoidable?</strong> In a real emergency — a
          child running toward a slippery poolside edge — a sharp &quot;stop!&quot; is the right
          move: nobody stops to rephrase in positive form. Outside that, if you have even one
          second to choose your words, it&apos;s worth spending on a target instead of a
          prohibition.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Does &quot;don&apos;t bend your legs&quot; give the body a target or an obstacle?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "bersaglio", label: "A target — it still tells you which leg to move", correct: false },
            { value: "ostacolo", label: "An obstacle to avoid — less effective than a target", correct: true },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Why does the body &quot;win&quot; over words when they contradict each other?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "falsificare", label: "Because it's harder to fake", correct: true },
            { value: "conta", label: "Because it counts for more overall", correct: false },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. In a real emergency — a child running toward a slippery poolside edge — is it still
          wrong to say &quot;stop!&quot; instead of rephrasing in positive form?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "si", label: "Yes, the rule always applies, even in an emergency", correct: false },
            { value: "no", label: "No — in a real emergency, immediate clarity matters more", correct: true },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — Wednesday: three scenes + transfer + simulation with branch
  {
    day: "Wednesday",
    pct: 47,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "generico" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>Three seconds aligned</h1>
        <div className="card scene">
          <div className="who">&quot;Great job!&quot;, said while looking at the watch</div>
          <p>
            An instructor says &quot;great job!&quot; to a child — but while looking at the watch,
            flat voice, already turned toward the next one. The child hears the right word, but
            doesn&apos;t feel encouraged: he sensed the attention was already elsewhere.
          </p>
          <p>
            <strong>Corrected:</strong> the instructor stops for a second, turns, looks at the
            child, says &quot;great job&quot; with a rising tone. Three seconds, not thirty — but
            all three aligned.
          </p>
        </div>
        <div className="card scene">
          <div className="who">&quot;Don&apos;t sink your head&quot;, repeated with no effect</div>
          <p>
            A 7-year-old keeps sinking his head, even though the instructor keeps repeating
            &quot;don&apos;t sink your head&quot;. The instructor changes the sentence, not the
            tone: &quot;keep one ear in and one ear out, like you&apos;re eavesdropping.&quot; On
            the next stroke, his head stays higher.
          </p>
        </div>
        <div className="card scene">
          <div className="who">A 14-year-old boy</div>
          <p>
            He&apos;s just improved his time by a lot, over one length. The instructor says
            &quot;good job&quot;, but with arms crossed, eyes already on the stopwatch, mechanical
            tone. The boy lowers his eyes, walks away without expression: at 14, a compliment said
            like that feels like something said out of habit, without thinking — not real
            recognition — and it stings more than silence. The next time, the instructor corrects
            himself: he stops, looks him in the
            eye, says &quot;you cut three seconds, did you feel it too?&quot; — this time the boy
            smiles just a little, because this time the instructor was really there.
          </p>
        </div>
        <p className="lede">
          <strong>
            Three scenes, the same rule underneath: words open the door, but it&apos;s consistency
            with voice and body that keeps it open — at 7 as much as at 14.
          </strong>
        </p>
        <p className="prompt">Rewrite in positive form: &quot;Don&apos;t sink your head when you breathe.&quot;</p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: the system looks for an instruction that
            describes what to do — not a more polite version of the same prohibition. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>DAVIDE, 9 years old.</strong> He&apos;s just completed a full length of
          breaststroke for the first time. What do you tell him?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "generico", label: "\"Good, let's move on\" — in a rush" },
            {
              value: "specifico",
              label: "You stop, look at him: \"you paused to breathe without sinking, you did it all by yourself\"",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "generico" && (
          <div className="feedback retry">
            DAVIDE: <em>(walks away, doesn&apos;t seem particularly satisfied)</em> &quot;...okay.&quot;
          </div>
        )}
        {answers.sim === "specifico" && (
          <div className="feedback ok">
            DAVIDE: <em>(smiles, stays there a moment longer)</em> &quot;...really? Did I do it
            right?&quot;
            <br />
            It&apos;s not the length of the sentence that makes the difference: it&apos;s the
            specificity, and the fact that you stopped.
          </div>
        )}
        {answers.sim === "specifico" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              A moment later, Davide sets off for a second length — but this time he bends his
              arms too much, a new technical error, never corrected with him before.
            </p>
            <p className="prompt">
              Write the instruction you give him now — in positive form, with tone and body
              consistent.
            </p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "negativo", label: "You go back to a negative instruction, or say it distractedly" },
                { value: "positivo", label: "You give a positive image, stopping to look at him" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "negativo" && (
              <div className="feedback retry">
                DAVIDE tries again, but the error stays exactly the same — he didn&apos;t get a
                target to aim for, just another prohibition.
              </div>
            )}
            {answers.sim2 === "positivo" && (
              <div className="feedback ok">
                DAVIDE extends his arms a little more on the next attempt — small, but in the
                right direction.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — Wednesday evening: transfer to a new error
  {
    day: "Wednesday evening",
    pct: 63,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>An error you&apos;ve never encountered before</h1>
        <p className="lede">
          A child keeps holding his fingers apart during the stroke, instead of together. You need
          to give him a new instruction — you haven&apos;t tried anything with him yet.
        </p>
        <p className="prompt">
          Write the instruction, in positive form, and try to imagine how you&apos;d say it — tone
          and body included — so that all three are consistent.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: this isn't one of the examples already
            seen — that's intentional. The system checks whether they apply the rule to a
            technical error never encountered in the chapter, not just whether they remember the
            sentences already read. */}
      </>
    ),
  },

  // 5 — in the pool
  {
    day: "in the pool",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>One instruction, stopping to look</h1>
        <p className="lede">
          This week, give just one instruction in positive form — say what to do, never what not
          to do — and stop for a second while you say it: look at the child, not the watch, not
          the group.
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
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 4 + Chapter 5</div>
        <h1>The test</h1>
        <p className="prompt">1. Is &quot;don&apos;t bend your legs&quot; a good instruction?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "no", label: "No — better to say what to do", correct: true },
            { value: "si", label: "Yes, it's clear — it still tells them what to avoid", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Is it true that words account for only 7% of communication?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "si", label: "Yes, it's a general law", correct: false },
            { value: "no", label: "No — that study covered a very specific case", correct: true },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. When words and body say different things, what does the child believe?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "parole", label: "The words — they're the explicit message, so the most reliable one", correct: false },
            { value: "corpo", label: "The body — it's the hardest signal to fake", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Does a positive instruction give the body a target or an obstacle?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "bersaglio", label: "A target", correct: true },
            { value: "ostacolo", label: "An obstacle", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(from Chapter 4)</em> Does matching the rhythm come before guiding?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Yes", correct: true },
            { value: "no", label: "No", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. Does &quot;great job&quot; said in a flat voice, while looking elsewhere, work as
          encouragement?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — the child senses the attention was elsewhere", correct: true },
            { value: "si", label: "Yes, the word counts regardless", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. In a real emergency, is it wrong to say &quot;stop!&quot; instead of rephrasing in
          positive form?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Yes, the rule always applies", correct: false },
            { value: "no", label: "No — in a real emergency, immediate clarity matters more", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. A 14-year-old boy receives a genuine compliment, but said in a mechanical tone, arms
          crossed, eyes elsewhere. How is he most likely to experience it?
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "abitudine", label: "As something said out of habit, not real recognition", correct: true },
            { value: "sincero", label: "As a sincere compliment, the words are enough", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Does a good specific encouragement given about one error also &quot;count&quot; for
          the next technical error, in the same minute?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Yes, the effect extends automatically", correct: false },
            { value: "no", label: "No — every new instruction has to be built again, positive and consistent", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. You need to correct an 8-year-old who bends his elbows incorrectly during the
          stroke. Write the instruction, in positive form, in a single sentence.
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
          Example of generated feedback, in case of a wrong answer to question 2:
        </p>
        <div className="card quote">
          You answered that words really only account for 7%. That number gets quoted a lot, but
          it comes from a study on a very narrow case — it&apos;s not a general law of
          communication. What&apos;s true, and useful, is something else: when words and body
          contradict each other, the body wins.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Feedback never just says &quot;you got it wrong&quot;: it says what to look at next
          time. The tone is always about the observed behavior, never about the person (see
          Chapter 7, which will come back to exactly this rule).
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
      const correct: Record<string, string> = {
        t1: "no", t2: "no", t3: "corpo", t4: "bersaglio", t5: "si",
        t6: "no", t7: "no", t8: "abitudine", t9: "no",
      };
      const wrong = Object.entries(correct).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found a few rough spots</div>
        <h1>Three negative instructions, rewritten for real</h1>
        <p className="lede">
          This isn&apos;t a failure: it&apos;s just a sign that it&apos;s worth training the trickiest
          automatic habit in this chapter a bit more — because softening a prohibition isn&apos;t the
          same as giving a target.
        </p>

        <div className="card scene">
          <div className="who">A child on his back, his head slipping backward</div>
          <p>
            The instructor has repeated &quot;don&apos;t throw your head back&quot; for two
            sessions — nothing changes. Try rephrasing it in positive form.
          </p>
        </div>
        <p className="prompt">Which of the two actually gives a target, not just a gentler prohibition?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "morbida", label: "\"Try not to throw it back so much\"", correct: false },
            {
              value: "mento",
              label: "\"Chin toward your chest, look at your toes\"",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">A girl doing breaststroke, legs stiff in a scissor kick</div>
          <p>
            The instructor has said &quot;don&apos;t keep your legs stiff&quot; three times in a
            row — the legs stay exactly the same.
          </p>
        </div>
        <p className="prompt">Which of the two works better?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "irrigidire", label: "\"Try not to stiffen them too much\"", correct: false },
            {
              value: "pedala",
              label: "\"Soft legs, like you're pedaling a bike slowly\"",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">A boy doing freestyle, gasping halfway across</div>
          <p>
            He holds his breath for whole strokes, then surfaces gasping. The instructor has tried
            &quot;don&apos;t hold your breath&quot; — no change.
          </p>
        </div>
        <p className="prompt">Which sentence gives him a target to carry out, not just a prohibition?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "trattenerlo", label: "\"Try not to hold it too long\"", correct: false },
            {
              value: "candela",
              label: "\"Blow out slowly underwater, like you're blowing on a candle far away\"",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          A positive instruction isn&apos;t just a nicer-sounding version of the prohibition: it&apos;s
          a different target, one the body moves toward on its own.
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
                <td style={{ padding: "6px 0" }}>The instruction you rewrote in §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you talked to Davide in §8, across both moments</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 4</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Instructions and congruence</td>
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
        <div className="done-badge">✓ Chapter 5 completed</div>
        <div className="eyebrow">Week 5 of 10 · Chapter 6 coming up</div>
        <h1>Getting them to act, and seeing if it landed</h1>
        <p className="lede">
          Today you learned to say things well. Next week you&apos;ll learn that&apos;s not
          enough: communication doesn&apos;t end when the child listens, it ends when they act.
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
          <div className="chip acquisita">
            <span className="name">5 · Instructions and congruence</span>
            <span className="state">acquired</span>
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
