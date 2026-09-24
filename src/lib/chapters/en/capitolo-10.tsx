import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-10.tsx) — solo il testo visibile
// cambia. Ultimo capitolo del corso: ha uno step finale in più (9 — "chiusura"), con
// .exam-badge, prima dell'esame.

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

const SIM_OPTIONS: Option[] = [
  { value: "correggi", label: "You give her a technical correction anyway, out of habit" },
  { value: "chiedi", label: "You ask her what she thinks, first" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "ancora", label: "You still answer \"what do you think?\", like for the previous exercise" },
  { value: "indica", label: "You give her a technical pointer, because it's a new exercise, not yet consolidated" },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10", "qchiusura"];

export const capitolo10StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 10 · LETTING GO</div>
        <h1>The last chapter</h1>
        <p className="lede">
          The instructor recognizes when a student no longer needs him on a specific thing — and
          applies to himself the same rule he learned to give children: there are no failures,
          only feedback.
        </p>
      </>
    ),
  },

  // 1 — Monday: Chapter 9 consolidation
  {
    day: "Monday · 10 min",
    pct: 10,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>How did it go in the pool?</h1>
        <p className="lede">
          Last week: with anyone who refused something, looking for the good intention before
          insisting. Did you get the chance to do it? How did it go?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 9 comes back</h2>
        <p className="prompt">1. Are &quot;can&apos;t do it&quot; and &quot;won&apos;t have it&quot; the same problem?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — one is a teaching issue, the other a relational one", correct: true },
            { value: "si", label: "Yes — in practice they're solved the same way", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. A child who refuses needs, above all:</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "spiega", label: "A clearer explanation", correct: false },
            { value: "capisce", label: "For you to understand what's beneath it", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Does finding the good intention behind a refusal excuse the behavior?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "No — it just gives you a different lever to pull", correct: true },
            { value: "si", label: "Yes — if you understand why he's doing it, then it's fine to let him", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. Is refusal always loud, out loud?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Yes — otherwise you wouldn't even notice it", correct: false },
            { value: "no", label: "No — it can also be a silent pulling back", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. If even a second offer gets refused, is the right thing to keep looking for others
          forever?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "No — after a real second attempt, it's fine to stop calmly", correct: true },
            { value: "si", label: "Yes, until you find the right one", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Can a silent refusal — crossed arms, no words — simply hide tiredness, not
          defiance?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Yes — sometimes it's not defiance, just tiredness he can't yet put into words", correct: true },
            { value: "no", label: "No, it's always a tantrum", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — Tuesday: knowing when to stop being necessary
  {
    day: "Tuesday · 15 min",
    pct: 20,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>Knowing when to stop being necessary</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          You&apos;ve learned to watch, build rapport, communicate, check, correct, change course,
          hold your ground through a refusal. The last skill is the hardest of all: knowing when
          to stop being necessary.
        </p>
        <p className="lede">
          Everything you&apos;ve learned in this course — watching, building rapport, giving the
          right instruction, changing course — has a single real goal: a child who, on that
          thing, one day no longer needs you.
        </p>
        <p className="lede">
          It&apos;s easy to forget, because every day your work is judged by how present, how
          attentive, how ready to step in you are. But an instructor who always intervenes, even
          when it&apos;s no longer needed, is slowing down exactly the thing he wanted to achieve.
          Recognizing the moment when a child can do it alone — an exercise you used to follow
          step by step, a movement you used to correct every time — is an act of trust, not of
          abandonment. It means telling him, without words, &quot;you already know how to do this.
          Do it.&quot;
        </p>
        <p className="lede">
          <strong>But how do you know if it&apos;s already that moment, or if it&apos;s still too
          early?</strong> One useful signal: the student has truly made a movement his own when he
          performs it identically even when he doesn&apos;t sense you nearby, and doesn&apos;t
          turn to look for your approval as soon as he&apos;s finished. If instead he only performs
          well when he knows you&apos;re watching, or freezes to seek you out with his eyes,
          waiting for a verdict, it&apos;s still too early: he hasn&apos;t made the movement his
          own yet — he&apos;s gotten used to your presence, not the movement. Letting go at that
          moment wouldn&apos;t be trust: it would be a gamble disguised as trust.
        </p>
        <div className="card quote">
          And the same rule you taught to read into a child&apos;s mistake — there are no
          failures, only feedback — today you apply to yourself. Every session that didn&apos;t go
          the way you wanted isn&apos;t a failure of yours: it&apos;s information about what to
          try differently next time. Chapter 1 asked you to discover how you communicate. This
          chapter asks you to keep discovering it, every week, for the rest of your career — not
          only during this course.
        </div>
        <p className="lede">
          The two halves of this chapter say the same thing, seen from two different sides.
          Letting go of a student who no longer needs you, and letting go of the idea of having
          &quot;failed&quot; a session that went badly: these are the same gesture. Either way, it
          comes down to trusting that the cycle — watching, trying, correcting — keeps working
          even without your constant control, whether over the child or over yourself.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Is an instructor who always intervenes, even when it&apos;s not needed, helping the student?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "No — he's slowing down the autonomy he wanted to achieve", correct: true },
            { value: "si", label: "Yes — the more present he is, the better for the student", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Is a session that went badly a failure of the instructor?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Yes — if the session went badly, it means he did something wrong", correct: false },
            { value: "no", label: "No — it's information about what to try differently", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. A student performs a movement well only when he senses the instructor is nearby, and
          freezes to look for him as soon as he finishes. Is it time to let go on that thing?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "No — he hasn't made the movement his own yet, he's gotten used to your presence, not the movement", correct: true },
            { value: "si", label: "Yes — if he performs well, it means the movement is acquired", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
        <p className="prompt">
          4. A student repeats the same movement identically even when the instructor is looking
          elsewhere, without seeking confirmation. What does that signal?
        </p>
        <OptionGroup
          name="m4"
          options={[
            { value: "fortuna", label: "That he just got lucky", correct: false },
            { value: "suo", label: "That the movement is now his own, no longer tied to your presence", correct: true },
          ]}
          selected={answers.m4}
          onPick={(v, correct) => setResponse("m4", v, correct)}
        />
      </>
    ),
  },

  // 3 — Wednesday: two "letting go" + Giulia simulation
  {
    day: "Wednesday",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "correggi" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>Two &quot;letting go&quot;, in the same session</h1>
        <div className="card scene">
          <div className="who">A 10-year-old</div>
          <p>
            A year earlier he needed the instructor to watch every stroke to correct him. Today he
            swims a whole length with no one stepping in, and the technique holds. The instructor,
            out of habit, still moves to the edge, ready to correct something as soon as he
            finishes. Then he stops, and says nothing: he lets the child look at his own length
            himself, judge himself — &quot;how did that feel to you?&quot; — instead of giving him
            the verdict himself.
          </p>
          <p>
            It&apos;s not that the instructor has nothing left to say. It&apos;s that, on this
            specific thing, saying it himself instead of letting the child discover it would be a
            step backward, not forward.
          </p>
        </div>
        <div className="card scene">
          <div className="who">The same instructor, that evening</div>
          <p>
            With another child in the group he had tried the same silence — staying quiet and
            letting him correct himself. But with that child the mistake didn&apos;t correct
            itself: it stuck, repeated identically for the whole length. For a moment he thinks:
            &quot;I got it wrong, I should have stepped in.&quot; Then he stops, and applies to
            himself the same rule he&apos;d use with a student: it&apos;s not a failure — it&apos;s
            information. Next time, before staying silent, he&apos;ll watch a little longer to make
            sure the exercise is truly already mastered, and not just looking like it.
          </p>
          <p>
            Two &quot;letting go&quot; in the same session — one that worked, one to correct — and
            the instructor treats the second exactly as he would treat a child&apos;s mistake:
            without labeling himself, just noting what to change.
          </p>
        </div>
        <div className="card scene">
          <div className="who">A 15-year-old, Marco</div>
          <p>
            For two months he&apos;s been swimming eighty meters of backstroke without a single
            correction: the technique is now solid, and the instructor knows it. One session, out
            of habit, he steps back a bit more than usual, watching the other children in the
            group too. Marco, reaching the edge, asks: &quot;is everything ok? You didn&apos;t even
            look at me once.&quot; It&apos;s not a technical question — it&apos;s a doubt about
            something else: still being watched over. The instructor answers: &quot;I watched you,
            and that&apos;s exactly why I didn&apos;t say anything — it means it was good.&quot; Marco stays
            quiet a moment, then smiles.
          </p>
        </div>
        <p className="lede">
          <strong>
            Letting go doesn&apos;t mean you stop watching: it means you stop intervening when
            watching is enough.
          </strong>{" "}
          But to the student, from the outside, the two things can look identical — which is why,
          sometimes, it&apos;s worth saying it out loud, not just doing it silently.
        </p>
        <p className="prompt">
          Think of a student you&apos;ve been following for a while, and a specific thing he can
          now do well without your constant involvement. Write what you would do differently, next
          time, to give him more room — without disappearing entirely.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: there's no right answer. The system looks
            at whether they're describing a gradual step back (watching instead of correcting,
            asking for his judgment instead of giving theirs) and not total abandonment or a
            control that stays identical. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>GIULIA, 11 years old.</strong> She&apos;s just completed a technical exercise
          that, until a month ago, needed a correction on every attempt. Today she didn&apos;t
          need one. What do you say to her, right after?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "correggi" && (
          <div className="feedback retry">
            GIULIA: &quot;...ok.&quot; <em>(does it again, waiting, as always, for your final verdict)</em>
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div className="feedback ok">
            GIULIA: &quot;...I think I stretched out better this time. Was that right?&quot;{" "}
            <em>(looks at you, but has already given her own judgment before asking for yours)</em>
            <br />
            A small difference, a big effect: in the second case Giulia is learning to judge
            herself — which is, literally, the goal of this whole chapter.
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Right after, Giulia tries a second exercise — never done before, a starting dive.
              She performs it hesitantly, then turns and waits, silently, for your verdict.
            </p>
            <p className="prompt">Write what you do now.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={SIM2_OPTIONS}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                GIULIA stays still, unsure, without knowing whether it was good or not. Giving room
                works when the foundation is already solid. On a brand-new movement, silence isn&apos;t
                trust: it&apos;s leaving her alone — the exact signal from Tuesday, read backward.
              </div>
            )}
            {answers.sim2 === "indica" && (
              <div className="feedback ok">
                GIULIA nods and tries again, with the pointer in mind. Letting go isn&apos;t a
                fixed rule the same for every exercise: it depends on what&apos;s already
                internalized and what isn&apos;t.
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
    pct: 42,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>When silence isn&apos;t enough</h1>
        <p className="lede">
          You tried, with a student, staying silent on an exercise you believed was already
          mastered — but he got it wrong anyway, in a way you didn&apos;t expect.
        </p>
        <p className="prompt">
          What do you think, in that moment — and what do you do the next time? Write your
          reasoning, not just the conclusion.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: the system looks for whether they apply
            to themselves the same rule from Tuesday — not a failure, information — instead of
            concluding that "letting go" was a mistake never to repeat. */}
      </>
    ),
  },

  // 5 — in the pool
  {
    day: "in the pool",
    pct: 52,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>Start from silence</h1>
        <p className="lede">
          This week, pick a whole exercise and say nothing throughout it, with a student who
          already knows how to do it well. Just watch. If you need to step in, step in — but start
          from silence, not from comment.
        </p>
      </>
    ),
  },

  // 6 — Friday: cumulative test Chapter 9 + Chapter 10
  {
    day: "Friday · 11 min",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 9 + Chapter 10</div>
        <h1>The test</h1>
        <p className="prompt">1. An instructor who always intervenes, even when it&apos;s not needed, is:</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "bene", label: "Doing his job well", correct: false },
            { value: "rallenta", label: "Slowing down the autonomy he wanted to achieve", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Is a session that went badly a failure of the instructor?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "no", label: "No — it's information about what to try differently", correct: true },
            { value: "si", label: "Yes — a session that went badly means he did something wrong", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Giving more room to a student who already knows how to do something means:</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "sparire", label: "Disappearing entirely", correct: false },
            { value: "graduale", label: "A gradual step back, not abandonment", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">
          4. Are the two halves of this chapter — a child&apos;s autonomy and the instructor&apos;s mistake
          — connected?
        </p>
        <OptionGroup
          name="t4"
          options={[
            {
              value: "si",
              label: "Yes — they're the same gesture: trusting the cycle works without constant control",
              correct: true,
            },
            { value: "no", label: "No, they're two different topics", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(from Chapter 9)</em> Are &quot;can&apos;t do it&quot; and &quot;won&apos;t have it&quot; the
          same problem?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Yes — in practice they're handled the same way", correct: false },
            { value: "no", label: "No — one is a teaching issue, the other a relational one", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. If a session went badly because you let go too early, is the right conclusion
          &quot;I&apos;ll never let anyone go again&quot;?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — the conclusion is to calibrate better when to do it, not to stop doing it", correct: true },
            { value: "si", label: "Yes, better to be cautious", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. A student performs a movement well only when he senses you&apos;re nearby, and looks for
          your eyes as soon as he finishes. Is it already time to let go on that thing?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Yes — if he performs well, the movement is already acquired", correct: false },
            { value: "no", label: "No — he hasn't made the movement his own yet, he's gotten used to your presence, not the movement", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. A student notices you&apos;re watching him less than usual today and asks if everything&apos;s
          ok. Silence, on an already-good movement, is:
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "complimento", label: "A compliment, not a distraction", correct: true },
            { value: "distrazione", label: "A distraction to correct", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. <em>(from Chapter 9)</em> If even a second offer gets refused, do you have to keep
          looking for others forever?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Yes, until you find the right one", correct: false },
            { value: "no", label: "No — after a real second attempt, it's fine to stop calmly", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. A student you&apos;ve been following for two years asks you, for the first time, &quot;how
          did I do?&quot; before you say anything. Write in two lines how you respond.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explains how correction works (§10)
  {
    day: "Friday · feedback",
    pct: 73,
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
          You answered that always intervening is doing his job well. That&apos;s understandable —
          it&apos;s the part that&apos;s most visible. But the goal of everything you teach is a
          student who, on that thing, no longer needs you. Intervening when it&apos;s not needed
          slows down exactly that.
        </div>
      </>
    ),
  },

  // 8 — recovery: only if Friday's test has too many mistakes (§12, D25/D27)
  {
    day: "recovery",
    pct: 76,
    nextLabel: "Continue ▸",
    showBack: true,
    visible: (a) => {
      const correct: Record<string, string> = {
        t1: "rallenta", t2: "no", t3: "graduale", t4: "si", t5: "no",
        t6: "no", t7: "no", t8: "complimento", t9: "no",
      };
      const wrong = Object.entries(correct).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found some difficulty</div>
        <h1>Two more examples, to train the right silence</h1>
        <p className="lede">
          It&apos;s not a failure: it&apos;s only the signal that it&apos;s worth revisiting the
          trickiest point of this chapter with a few more examples — recognizing when staying
          silent is the right call, and when it isn&apos;t yet.
        </p>

        <div className="card scene">
          <div className="who">Elena, 9 years old</div>
          <p>
            A month ago, her turn needed a correction on almost every attempt. Today she does it
            on her own, looks at her hands underwater, and surfaces smiling — without looking for
            the instructor&apos;s eyes. He still moves to the edge anyway, ready to say something.
          </p>
        </div>
        <p className="prompt">What&apos;s the right thing to do?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "correggi", label: "He gives her a small technical pointer anyway, out of habit", correct: false },
            {
              value: "tace",
              label: "He stays quiet — the smile with no need for confirmation says the movement is already hers",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Filippo, 13 years old</div>
          <p>
            He performs the same exercise well, technically. But after every attempt he snaps
            around to look at the instructor, seeking a nod, and stays frozen until he gets one.
          </p>
        </div>
        <p className="prompt">Is it already time to let go on this exercise?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Yes — if he performs it well technically, the movement is acquired", correct: false },
            {
              value: "no",
              label: "No — he's still seeking confirmation: he hasn't made the movement his own yet, he's gotten used to your presence, not the movement",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Letting go isn&apos;t one rule that fits everyone the same way: it&apos;s the silence
          said at the right moment. Not too soon, while the student still needs you. Not too
          late, once it&apos;s become your habit, and no longer his need.
        </p>
      </>
    ),
  },

  // 9 — Friday: result
  {
    day: "Friday · result",
    pct: 82,
    nextLabel: "Continue ▸",
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>The 9 questions in the test</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>Your answer at §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>How you responded to Giulia at §8</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 9</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Autonomy and continuous improvement
                </td>
                <td style={{ padding: "6px 0" }}>The lowest of the ones above</td>
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
    pct: 92,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapter 10 completed</div>
        <div className="eyebrow">Week 10 of 10 · course completed</div>
        <h1>The ten chapters, closed</h1>
        <p className="lede">
          You&apos;ve learned to read, build rapport, communicate, verify, correct, change course,
          hold your ground with refusal, let go. Only one last reflection remains, before the
          final exam.
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
          <div className="chip consolidata">
            <span className="name">8 · Changing course</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">9 · Difficult situations</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip acquisita">
            <span className="name">10 · Autonomy and improvement</span>
            <span className="state">acquired</span>
          </div>
        </div>
      </>
    ),
  },

  // 11 — closing: the closure, before the exam
  {
    day: "closing",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> The closing — before the exam</div>
        <h1>One last question, before moving on</h1>
        <p className="lede">
          This week you tried staying silent on an exercise a student already knew how to do. How
          did it go? And, looking back over all ten weeks: what is the thing that changed the
          most — in a child, or in you?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          This reflection stays between you and your profile: whoever assesses your final exam
          will never see it.
        </p>
        <div className="card quote">
          From here the final exam begins. It isn&apos;t another test like the other nine: it&apos;s
          the moment when everything you&apos;ve built — not just what you know, but what you can
          do — comes together and gets checked once, calmly. You can&apos;t fail it — you can only
          postpone it. If you&apos;re not ready yet, you go back, you reinforce what&apos;s needed,
          and you try again. The standard is the same for everyone. The path to get there, as it
          has been for the whole course, remains yours.
        </div>
      </>
    ),
  },
];
