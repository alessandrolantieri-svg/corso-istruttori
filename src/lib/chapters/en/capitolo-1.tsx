import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { VakBars } from "@/components/VakBars";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import { computeVak, VAK_NOUN_EN, VAK_ADJ_EN } from "@/lib/vak";
import type { Step, StepContext } from "@/lib/chapters/types";
import { computeVakProfile } from "@/lib/chapters/capitolo-1-actions";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-1.tsx) — solo il testo visibile
// cambia. I value delle opzioni VAK ("mostra"/"dire"/"sentire") restano identici in ogni lingua:
// sono confrontati da computeVak()/computeVakProfile(), non testo da tradurre.

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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

const Q1_OPTIONS: Option[] = [
  { value: "vede", label: "I show it to them again" },
  { value: "dice", label: "I explain it again in different words" },
  { value: "sente", label: "I take their hand and guide them through it" },
  { value: "boh", label: "I don't know, it depends on the moment" },
];

const V_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "v1",
    prompt: "1. You need to explain a new movement. What's your first instinct?",
    options: [
      { value: "mostra", label: "I demonstrate it myself, in the water, before saying anything" },
      { value: "dire", label: "I explain it in words, step by step" },
      { value: "sentire", label: "I take their arm and let them feel the movement" },
    ],
  },
  {
    key: "v2",
    prompt: "2. Think back to a lesson that went well. What do you remember first?",
    options: [
      { value: "mostra", label: "How the student looked moving — their posture, their wake in the water" },
      { value: "dire", label: "The words we said to each other, the tone of the conversation" },
      { value: "sentire", label: "How I felt — the energy, the physical satisfaction of that moment" },
    ],
  },
  {
    key: "v3",
    prompt: "3. A colleague asks you for advice on an exercise. How do you prefer to explain it?",
    options: [
      { value: "mostra", label: "I show you — come into the water with me" },
      { value: "dire", label: "I tell you about it, let's sit down for five minutes" },
      { value: "sentire", label: "Let's do it together, you'll get it by trying it" },
    ],
  },
  {
    key: "v4",
    prompt: "4. When you describe a technical error to a colleague, what do you do most often?",
    options: [
      { value: "mostra", label: "I sketch or mime the movement with my hands" },
      { value: "dire", label: "I describe it in words, precisely" },
      { value: "sentire", label: "I redo it myself in the air, with my whole body" },
    ],
  },
  {
    key: "v5",
    prompt: "5. A parent asks how their child is doing. What do you do to answer well?",
    options: [
      { value: "mostra", label: "I show them a video, or point it out from the poolside next time" },
      { value: "dire", label: "I tell them precisely, in words, what's changed" },
      { value: "sentire", label: "I tell them to get in the water with their child for a moment, to feel it themselves" },
    ],
  },
  {
    key: "v6",
    prompt: "6. You need to memorize a sequence of technical steps for an exam. How do you study best?",
    options: [
      { value: "mostra", label: "By watching videos or images of the sequence" },
      { value: "dire", label: "By repeating it out loud, in my own words" },
      { value: "sentire", label: "By redoing the motion with my body, even out of the water" },
    ],
  },
];

const DIARY_KEYS = ["q2", "q7", "q8a", "q8b"];

export const capitolo1StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 1 · ME</div>
        <h1>Communication is the result you get</h1>
        <p className="lede">
          It doesn&apos;t matter what you meant to say. What matters is what landed. If a child
          doesn&apos;t do what you asked, the useful question isn&apos;t &quot;why aren&apos;t
          they listening to me&quot; — it&apos;s &quot;how can I say it in a way that lands&quot;.
        </p>
        <p className="lede">
          All of THE RIGHT KEY grows out of that one sentence. Everything else is ways of putting
          it into practice.
        </p>
      </>
    ),
  },

  // 1 — Monday §2
  {
    day: "Monday · 7 min",
    pct: 10,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>Welcome to THE RIGHT KEY</h1>
        <p className="lede">
          Two questions — there&apos;s no right answer, they&apos;re just here to make you notice
          something about yourself, before you read a single line of theory.
        </p>
        <p className="prompt">
          1. When a child doesn&apos;t understand what you asked, what&apos;s the first thing you
          do, instinctively?
        </p>
        <OptionGroup name="q1" options={Q1_OPTIONS} selected={answers.q1} onPick={(v) => setResponse("q1", v)} />
        <p className="prompt">2. And when it&apos;s an adult who doesn&apos;t understand you? Is it the same first move, or different?</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <p className="lede" style={{ marginTop: 14, fontStyle: "italic" }}>
          Keep both in mind — Wednesday&apos;s test comes back to this too.
        </p>
      </>
    ),
  },

  // 2 — Tuesday explanation + check
  {
    day: "Tuesday · 13 min",
    pct: 22,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>Knowing how you communicate</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          This week you learn just one thing, but it&apos;s the one everything else rests on:
          knowing how you communicate, before worrying about how the child communicates.
        </p>
        <p className="lede">
          Your work cycle always starts from the same point — not from the child, from you:{" "}
          <strong>
            me → recognize the child → observe → build rapport → communicate → get them to act.
          </strong>
        </p>
        <p className="lede">
          Everyone has a preferred way of making themselves understood — some show, some explain
          in words, some let you feel the movement. None of them is wrong, but if you always use
          only one, the day that way stops working you have no backup plan.
        </p>
        <p className="lede">
          <strong>These three ways also have a technical name, one you&apos;ll see often from here on: VAK.</strong>{" "}
          The acronym comes from <em>Visual, Auditory, Kinesthetic</em> — showing = visual, telling
          = auditory, guiding by feel = kinesthetic. You&apos;ll almost always use the plain words,
          but from today, when you read &quot;VAK test&quot; or &quot;VAK profile&quot;, you know
          what it refers to.
        </p>
        <div className="card quote">
          The test doesn&apos;t tell you who you are. It shows you a habit. You&apos;ll never find
          it written as &quot;you are visual&quot; — you&apos;ll find &quot;your profile shows a
          leaning toward showing&quot;.
        </div>
        <p className="lede">
          <strong>Back to Monday&apos;s second question</strong> — the one about the adult. For
          many instructors, the first move with a colleague or a parent is different from the one
          with a child: maybe with a child you show, and with an adult you explain in words, out
          of social habit, not conscious choice. Your VAK profile isn&apos;t only about children:
          it&apos;s the same automatic pattern you use with anyone. If with adults you avoid a
          channel you often use with children — or the other way around — it means one thing:
          that habit isn&apos;t only about the pool. It&apos;s a pattern of yours, and you carry
          it everywhere.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Does the VAK test tell you who you are as an instructor?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "No — it shows you a habit, not an identity", correct: true },
            { value: "si", label: "Yes, it's a definitive snapshot", correct: false },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. If you always use only one channel, what happens?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "niente", label: "Nothing, being clear is what matters", correct: false },
            { value: "terzo", label: "The day that way stops working, you have no backup plan", correct: true },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">3. Does your communication automatism only apply to how you talk to children in the pool?</p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Yes, it's specific to the pool context", correct: false },
            { value: "no", label: "No — it's the same automatism you use with adults, colleagues, parents too", correct: true },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
      </>
    ),
  },

  // 3 — Wednesday example + application
  {
    day: "Wednesday · part 1",
    pct: 34,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>Three attempts, three channels</h1>
        <div className="card scene">
          <div className="who">An instructor, an 8-year-old, breaststroke</div>
          <p>
            The child can&apos;t coordinate his legs. The instructor demonstrates it again three
            times. Nothing changes. He tries telling him in words — &quot;push like you&apos;re
            pushing the water away&quot;. The child tries again: a bit better, but still unsure.
            Then the instructor takes his ankles out of the water and moves them for him,
            passively: <strong>guiding by feel</strong>. The child redoes it, almost perfect, on
            the first try.
          </p>
        </div>
        <p className="lede">
          Three attempts, three channels — only the third one fully worked. The instructor
          hadn&apos;t used the wrong method the first two times: he&apos;d just used, one after
          the other, his two most comfortable channels.
        </p>
        <div className="card scene">
          <div className="who">The same instructor, that evening, with a new colleague</div>
          <p>
            He has to explain how to organize the equipment poolside before a session with the
            little ones. He starts talking right away — listing, describing, specifying every
            detail out loud. The colleague nods, but at the first real lesson forgets half of it.
            It&apos;s the same automatic pattern as before, but flipped. With the child, the
            instructor shows or guides by feel first, and tells later. With the adult, he goes
            straight to &quot;telling&quot; — a channel he rarely uses in the water, but one that
            comes naturally to him with people, out of it. Only when he physically shows him
            where everything goes does the colleague really remember it.
          </p>
        </div>
        <p className="lede">
          The same person, two different channels, depending on context — not on a conscious
          choice. It&apos;s exactly the kind of automatism today&apos;s test starts to reveal.
        </p>
        <p className="prompt">
          Think of the last time you had to explain something and it didn&apos;t land right away.
          What did you do first — show, tell, or guide with your hands? And was the second move
          different from the first, or the same one repeated harder?
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: there's no right answer. The system looks
            at one thing only — whether the second move was different from the first, or the
            same one repeated harder. */}
      </>
    ),
  },

  // 4 — the real VAK test
  {
    day: "Wednesday · the test",
    pct: 50,
    nextLabel: "See your profile ▸",
    showBack: true,
    canNext: (a) => !!a.v1 && !!a.v2 && !!a.v3 && !!a.v4 && !!a.v5 && !!a.v6,
    onLeave: computeVakProfile,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday — the test</div>
        <h1>The VAK test</h1>
        <p className="lede">
          There are no right or wrong answers: each question asks what you&apos;d do — or what you
          remember — first.
        </p>
        {V_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v) => setResponse(q.key, v)} />
          </div>
        ))}
        <p className="lede" style={{ fontStyle: "italic", fontSize: ".82rem" }}>
          Representative — the full set of questions arrives in the technical phase.
        </p>
      </>
    ),
  },

  // 5 — Wednesday: end-of-day check on the result just produced
  {
    day: "Wednesday · on your result",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — on your result</div>
          <h1>Look at the profile you just got</h1>
          <VakBars vak={vak} locale="en" />
          <p className="prompt">
            Think of a student you&apos;ve been working with for a while: which of the three
            channels do you use with them the least — the very one that&apos;s lowest in your
            profile?
          </p>
          <Field id="q8a" value={answers.q8a ?? ""} onChange={(v) => setReflection("q8a", v)} />
          {/* Grading note, not shown to the instructor: there's no right or wrong answer here —
              this is the first time the profile touches a real child, not just theory. The
              system notes whether they're connecting the abstract data point to a real person —
              exactly the step needed to actually use it, instead of leaving it as just a
              number. */}
          <p className="prompt">
            One small step further. Now that you&apos;ve named that channel, write a concrete
            situation — next week, with that same student — where you&apos;ll try to use it on
            purpose, even if it doesn&apos;t come naturally.
          </p>
          <Field id="q8b" value={answers.q8b ?? ""} onChange={(v) => setReflection("q8b", v)} />
          {/* Grading note, not shown to the instructor: the system doesn't judge whether they
              succeed — it only checks whether the situation described is concrete (a specific
              moment, a specific exercise) and not generic ("I'll try more often"). A generic
              intention gets forgotten at the first surprise of the session — a concrete one
              sticks. */}
        </>
      );
    },
  },

  // 6 — Friday summary (real profile)
  {
    day: "Friday · 7 min",
    pct: 78,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => a.cv === "giusta",
    render: ({ answers, setResponse }: StepContext) => {
      const vak = computeVak(answers as never);
      const noun = VAK_NOUN_EN[vak.prevalente];
      const adj = VAK_ADJ_EN[vak.prevalente];
      const cvFeedback: ReactNode =
        answers.cv === "giusta" ? (
          <div className="feedback ok">Exactly — a habit can broaden. A label sticks.</div>
        ) : answers.cv === "sbagliata" ? (
          <div className="feedback retry">It&apos;s not wrong to be short — it&apos;s wrong to say it&apos;s who you are. Try again.</div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Friday</div>
          <h1>Your profile</h1>
          <p className="lede">
            Here&apos;s how to read — and how not to read — your result: the real one, just
            calculated from your answers.
          </p>
          <VakBars vak={vak} locale="en" />
          <div className="card quote">
            Your profile shows a leaning toward <strong>{noun}</strong>. It doesn&apos;t mean you
            can&apos;t use the other channels — it means that, under pressure, it&apos;s the first
            thing you reach for.
          </div>
          <p className="prompt">Which sentence would you use to describe your result to a colleague?</p>
          <OptionGroup
            name="cv"
            options={[
              {
                value: "giusta",
                label: `"Your profile shows a leaning toward ${noun}" — describes a habit`,
                correct: true,
              },
              { value: "sbagliata", label: `"You're a ${adj} instructor" — it's shorter`, correct: false },
            ]}
            selected={answers.cv}
            onPick={(v, correct) => setResponse("cv", v, correct)}
          />
          {cvFeedback}
        </>
      );
    },
  },

  // 7 — result + real-world pool practice
  {
    day: "Friday · result",
    pct: 92,
    nextLabel: "Go to Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow">§11 · Result</div>
          <h1>Your profile is created, today</h1>
          <p className="lede">
            From here on, every chapter closes with a table like this one: four different snapshots
            of the same competency, not a single grade — how much you know (from the test), how
            well you can apply it in writing, how you handle a simulated scene, how much you
            reflect on a real session. They stay written with their technical name, for
            transparency.
          </p>
          <div className="card">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Score</th>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Where it comes from today</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    application_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Your answer at §7 — did you change strategy, or repeat it?</td>
                  <td style={{ textAlign: "right" }}>recorded ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    VAK — initial profile
                  </td>
                  <td style={{ padding: "6px 0" }}>The answers to the §8 test</td>
                  <td style={{ textAlign: "right" }}>{capitalize(VAK_NOUN_EN[vak.prevalente])} ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    reflection_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Not yet — there&apos;s no real pool session to tell yet</td>
                  <td style={{ textAlign: "right", color: "var(--ink-soft)" }}>not yet</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</h2>
          <p className="lede">
            This week, don&apos;t change anything. Just count how many times you explain the same
            thing the exact same way, to different children. The number you find isn&apos;t a
            grade. It&apos;s a starting point.
          </p>
          <p className="lede" style={{ fontStyle: "italic" }}>
            If you don&apos;t have a session this week: do the same exercise thinking back to the
            last work week you remember well.
          </p>
        </>
      );
    },
  },

  // 8 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="done-badge">✓ Chapter 1 completed</div>
          <div className="eyebrow">Week 1 of 10 · Chapter 2 coming up</div>
          <h1>Who&apos;s in front of me</h1>
          <p className="lede">
            Today you looked at yourself. Next week you&apos;ll learn to look at the child in front
            of you.
          </p>
          <h2>Your VAK profile</h2>
          <VakBars vak={vak} locale="en" />
          <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="en" />
          <h2>Your progress</h2>
          <div className="chip-grid">
            <div className="chip in-sviluppo">
              <span className="name">1 · Self-awareness</span>
              <span className="state">in progress</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">2 · Recognizing the student</span>
              <span className="state">not acquired</span>
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
      );
    },
  },
];
