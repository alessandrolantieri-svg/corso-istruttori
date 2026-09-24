import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-4.tsx) — solo il testo visibile cambia.

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
  { value: "via", label: "Your go-ahead", correct: true },
  { value: "coraggio", label: "Courage — he thinks he isn't brave enough", correct: false },
];
const K2_OPTIONS: Option[] = [
  {
    value: "si",
    label: "Yes — watching and understanding are basically the same thing",
    correct: false,
  },
  {
    value: "no",
    label: "No — watching is seeing that something happened, understanding is deciding what it means",
    correct: true,
  },
];
const K3_OPTIONS: Option[] = [
  { value: "no", label: "No — sometimes something else is still missing, first", correct: true },
  {
    value: "si",
    label: "Yes, definitely — if it's the right cause, the child moves right away",
    correct: false,
  },
];
const K4_OPTIONS: Option[] = [
  {
    value: "si",
    label: "Yes, a good simulation alone already shows the competency is acquired",
    correct: false,
  },
  { value: "no", label: "No — you always need at least one real pool session", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No, the signals always stay distinct", correct: false },
  {
    value: "si",
    label: "Yes — the signal can change while you're observing, if the wait drags on",
    correct: true,
  },
];
const K6_OPTIONS: Option[] = [
  {
    value: "misto",
    label: "A mix of waiting for the go-ahead and the embarrassment of a new group",
    correct: true,
  },
  { value: "dimenticato", label: "She had forgotten how to dive", correct: false },
];

const M1_OPTIONS: Option[] = [
  { value: "domanda", label: "You ask him a direct question to get him talking", correct: false },
  { value: "silenzio", label: "For a moment, you're still and silent too", correct: true },
];
const M2_OPTIONS: Option[] = [
  {
    value: "tirare",
    label: "Pulling someone by the arm when they're not following you yet",
    correct: true,
  },
  { value: "esempio", label: "Setting a good example, so he follows along almost right away", correct: false },
];
const M3_OPTIONS: Option[] = [
  {
    value: "torni",
    label: "You step back: you find his rhythm again, before proposing the direction again",
    correct: true,
  },
  { value: "insisti", label: "You insist — until a moment ago everything was going fine", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "diretta", label: "\"Noa, do you want to get in?\"" },
  { value: "silenzio", label: "You sit next to her in silence, mirroring her stillness" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "minimizza", label: "\"Come on, it's just water, don't worry\"" },
  {
    value: "risolvi",
    label: "You offer her a swim cap, or tell her she can keep her head out of the water today",
  },
];

const T1_OPTIONS: Option[] = [
  { value: "prima", label: "Before", correct: true },
  { value: "dopo", label: "After", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "calma", label: "Telling him to calm down right away", correct: false },
  { value: "asseconda", label: "Going along with his energy for a moment, then guiding it", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "no", label: "No — it works the same, in reverse, with someone who lights up", correct: true },
  {
    value: "si",
    label: "Yes — with a kid who gets worked up, you just need to calm him down, not go along with him",
    correct: false,
  },
];
const T4_OPTIONS: Option[] = [
  { value: "capito", label: "He didn't understand", correct: false },
  { value: "paura", label: "He's afraid", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "no", label: "No — it's there to create the conditions for him to listen to you", correct: true },
  {
    value: "si",
    label: "Yes — it's mainly about being likeable to the child",
    correct: false,
  },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Yes, if you're right", correct: false },
  { value: "no", label: "No — even if you're right, it usually doesn't work", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "insisti", label: "Insisting, because it was working until a moment ago", correct: false },
  {
    value: "torna",
    label: "Stepping back and finding his rhythm again, before proposing the direction again",
    correct: true,
  },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "No — the form changes with age, but the order stays the same", correct: true },
  { value: "si", label: "Yes, in exactly the same way", correct: false },
];
const T9_OPTIONS: Option[] = [
  { value: "rassicurato", label: "He still feels reassured", correct: false },
  { value: "richiude", label: "He shuts down again — he didn't feel taken seriously", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo4StepsEn: Step[] = [
  // 0 — copertina
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 4 · RAPPORT</div>
        <h1>Why should he listen to me?</h1>
        <p className="lede">
          Faced with a closed-off or silent child — or with one who&apos;s agitated and excited —
          the instructor gets on his rhythm for a moment before asking him anything, instead of
          pressing him or shutting him down right away.
        </p>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 3
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
          Last week I asked you that, with the first child who stopped or hesitated, you&apos;d
          stop for a second too, and decide which of the four causes seemed most likely. How did
          it go? Was your reading the right one?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 3 comes back</h2>
        <p className="prompt">
          1. A child stops, seeks you out with his eyes, his body isn&apos;t tense. What&apos;s
          most likely missing for him?
        </p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, c) => setResponse("k1", v, c)} />
        <p className="prompt">2. Are watching and understanding the same thing?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, c) => setResponse("k2", v, c)} />
        <p className="prompt">
          3. You correctly understood the cause, but the child still isn&apos;t moving. Does that
          mean your reading was wrong?
        </p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, c) => setResponse("k3", v, c)} />
        <p className="prompt">4. For the Chapter 3 competency, is a good simulation enough for EXCELLENT?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, c) => setResponse("k4", v, c)} />
        <p className="prompt">
          5. Can a child who&apos;s just waiting for your go-ahead start to show signs of real
          fear, if you wait too long?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, c) => setResponse("k5", v, c)} />
        <p className="prompt">
          6. In the example of Nadia, 12, what was behind her hesitation in front of a group
          different from usual?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, c) => setResponse("k6", v, c)} />
      </>
    ),
  },

  // 2 — martedì: spiegazione + controllo di fine giornata
  {
    day: "Tuesday · 13 min",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>His rhythm first, then yours</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Even when you read the situation right, sometimes the child still won&apos;t listen to
          you. Today you learn why — and what to do, even before you speak.
        </p>
        <p className="lede">
          <strong>Rapport isn&apos;t about being likeable.</strong> It&apos;s about creating, in a
          few seconds, the conditions for a child to be willing to listen to you. Without it, even
          the most correct instruction bounces off.
        </p>
        <p className="lede">
          <strong>First you get on his rhythm.</strong> If he&apos;s still and silent, for a
          moment you&apos;re still and silent too. If he&apos;s agitated and excited, for a moment
          you go along with the energy instead of shutting it down with a &quot;calm down&quot;.
          You&apos;re not imitating: you&apos;re saying, with your body, &quot;I&apos;m here with
          you, where you are right now&quot;.
        </p>
        <p className="lede">
          <strong>Only after that, you guide him.</strong> Once he&apos;s felt that you&apos;re in
          step with him, you can propose a small step in the direction you want.
        </p>
        <div className="card quote">
          Guiding before you&apos;ve gotten on his rhythm is like pulling someone by the arm when
          they&apos;re not following you yet: you might even be right, but it doesn&apos;t work.
        </div>
        <p className="lede">
          It works with those who close up — and it works the same, in reverse, with those who
          light up. The first move is always the same: go toward him, don&apos;t ask him to come
          toward you right away.
        </p>
        <p className="lede">
          <strong>One last thing, before moving on.</strong> Rapport isn&apos;t a switch that,
          once flipped on, stays on for the whole session: it can get lost halfway through, and
          then it needs to be rebuilt, not forced. A child who&apos;s followed you for two
          exercises can, on the third, close up again — maybe he&apos;s tired, maybe the new
          exercise threw him off. The temptation is to insist (&quot;come on, everything was fine
          a moment ago&quot;), but that&apos;s the same mistake again: you&apos;re trying to guide
          him while right now, he&apos;s not following you anymore. Step back: find his rhythm
          again, before proposing the direction again. You don&apos;t need to start over: you just
          need to apply the same rule again, like always.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. A child is silent and still. What do you do first?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, c) => setResponse("m1", v, c)} />
        <p className="prompt">2. Guiding before you&apos;ve gotten on his rhythm is like:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, c) => setResponse("m2", v, c)} />
        <p className="prompt">
          3. A child who was following you well closes up mid-session, on a new exercise. What do
          you do?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, c) => setResponse("m3", v, c)} />
      </>
    ),
  },

  // 3 — mercoledì: scene + riflessione + simulazione a bivio
  {
    day: "Wednesday",
    pct: 48,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "diretta" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback =
        answers.sim === "diretta" ? (
          <div className="feedback retry">
            NOA: <em>(silence, doesn&apos;t move)</em>
            <br />
            A direct question asked her to follow a rhythm that wasn&apos;t hers yet.
          </div>
        ) : answers.sim === "silenzio" ? (
          <div className="feedback ok">
            NOA: <em>(after a few seconds, shifts her gaze toward you)</em> &quot;...I&apos;m
            afraid of getting my hair wet.&quot;
            <br />
            Getting on her rhythm didn&apos;t magically &quot;unlock&quot; her: it gave her the
            space to say what was really going on.
          </div>
        ) : null;

      const sim2Feedback =
        answers.sim2 === "minimizza" ? (
          <div className="feedback retry">
            NOA closes up again, goes back to silence — she&apos;d taken a risk telling you, and
            wasn&apos;t taken seriously.
          </div>
        ) : answers.sim2 === "risolvi" ? (
          <div className="feedback ok">
            NOA: &quot;...okay, I&apos;ll try it that way.&quot; <em>(she gets up, moves closer to
            the edge)</em>
            <br />
            Opening the door with rapport isn&apos;t enough if, as soon as the child says what
            &apos;s really going on, you close it again with a generic answer. The second move
            matters as much as the first.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Wednesday</div>
          <h1>A closed-off child, an agitated one, a distant teenager</h1>
          <div className="card scene">
            <div className="who">Elia, 6 years old</div>
            <p>
              First day with a new group. He doesn&apos;t answer, arms crossed, eyes down. The
              instructor sits next to him, in silence, for twenty seconds — same stillness, same
              silence. Then, quietly: &quot;sometimes I don&apos;t feel like talking either.&quot;
              Then: &quot;do you just want to get your feet wet, for now?&quot; Elia doesn&apos;t
              answer in words. But he moves his feet into the water.
            </p>
            <p>
              If the instructor had guided him right away — &quot;come on, let&apos;s go,
              it&apos;ll be fun!&quot; — he would have asked him to follow a rhythm that
              wasn&apos;t his yet. Those twenty seconds at his rhythm didn&apos;t
              &quot;convince&quot; Elia with an argument: they just helped him understand he could
              stay where he was. And from there, he took a small step himself.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Diego, 8 years old</div>
            <p>
              He arrives at the poolside already going a mile a minute: jumping, talking super
              fast. The instructor, instead of saying &quot;calm down,&quot; goes along with him
              for a bit: nods quickly, asks him a short question, fast like his rhythm. Only
              afterward, gradually, he slows the pace of the conversation himself — and Diego
              slows down with him, until he&apos;s ready for the first instruction.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Bianca, 15 years old</div>
            <p>
              She arrives with a dark expression, answers greetings with barely a nod, arms
              crossed — she&apos;s not closed off like Elia, it&apos;s teenage detachment from
              someone who doesn&apos;t feel like being there today. The instructor doesn&apos;t
              sit next to her in silence, at 15 that would be strange: he talks to her sparingly,
              with the same dry tone as hers — &quot;tough day?&quot; Bianca answers with an
              &quot;...a bit,&quot; but that&apos;s already something: she let the instructor meet
              her exactly where she was willing to open up — no further. Only at that point does
              the exercise arrive, in a normal tone — no fake enthusiasm, which wouldn&apos;t fit
              her mood.
            </p>
          </div>
          <p className="lede">
            <strong>
              A closed-off child, an agitated one, a distant teenager — the form changes, the
              order doesn&apos;t: his rhythm first, only after that yours.
            </strong>
          </p>
          <p className="prompt">
            An 8-year-old arrives at the poolside already very agitated, talks fast, can&apos;t
            stay still for a second. What do you do — or say — in the first thirty seconds,
            BEFORE giving him any instruction?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Grading note, not shown to the instructor: the system checks whether they go along
              with the energy for a moment before bringing it down — not whether they shut it
              off right away with a "calm down". */}
          <h2>Simulation</h2>
          <p className="lede">
            <strong>NOA, 7 years old.</strong> Poolside, silent, doesn&apos;t answer direct
            questions. What do you do or say first?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim === "silenzio" && (
            <div>
              <p className="lede" style={{ marginTop: 14 }}>
                The scene continues. Now that Noa has said what the real problem is, it&apos;s
                your turn to respond to <em>that</em>.
              </p>
              <p className="prompt">Write what you say to her or offer her now.</p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup
                name="sim2"
                options={SIM2_OPTIONS}
                selected={answers.sim2}
                onPick={(v) => setResponse("sim2", v)}
              />
              {sim2Feedback}
            </div>
          )}
        </>
      );
    },
  },

  // 4 — mercoledì sera: controllo di fine giornata (trasferimento)
  {
    day: "Wednesday evening",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>A scene different from yesterday&apos;s</h1>
        <p className="lede">
          A 10-year-old arrives laughing loudly, playfully pushes a classmate, can&apos;t stay
          still in line. He doesn&apos;t seem angry or scared: he just seems full of energy.
        </p>
        <p className="prompt">
          How do you open contact with him, BEFORE asking him to get in line and stay still?
          Write your reasoning, not just the move.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: the system checks whether they recognize
            this as a case of "agitated/excited" — going along with his energy for a moment, not
            asking him to calm down right away. */}
      </>
    ),
  },

  // 5 — in vasca
  {
    day: "in the pool",
    pct: 68,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>One minute at his rhythm</h1>
        <p className="lede">
          This week, with the most closed-off — or most agitated — child in the group: get on his
          rhythm for a minute before asking him anything. Still if he&apos;s still, silent if
          he&apos;s silent; fast if he&apos;s fast, wound up if he&apos;s wound up. Then, only
          after that, propose a small step.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo
  {
    day: "Friday · 11 min",
    pct: 85,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 3 + Chapter 4</div>
        <h1>The test</h1>
        <p className="prompt">1. Does getting on the child&apos;s rhythm come before or after guiding him?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, c) => setResponse("t1", v, c)} />
        <p className="prompt">2. A child is excited and agitated. The right first move is:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, c) => setResponse("t2", v, c)} />
        <p className="prompt">3. Does getting on the child&apos;s rhythm only work with those who close up?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, c) => setResponse("t3", v, c)} />
        <p className="prompt">
          4. <em>(from Chapter 3)</em> A child freezes, shoulders tense, gaze fixed on the water.
          It&apos;s more likely that:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, c) => setResponse("t4", v, c)} />
        <p className="prompt">5. Is rapport there to be likeable with the child?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, c) => setResponse("t5", v, c)} />
        <p className="prompt">6. Does guiding before getting on his rhythm usually work?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, c) => setResponse("t6", v, c)} />
        <p className="prompt">
          7. A child who was following you well closes up mid-session. The right thing is:
        </p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, c) => setResponse("t7", v, c)} />
        <p className="prompt">
          8. With a distant teenager, is rapport built the same way as with a 6-year-old?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, c) => setResponse("t8", v, c)} />
        <p className="prompt">
          9. A child reveals what his real fear is, after you&apos;ve gotten on his rhythm. If you
          respond generically or downplay it, what usually happens?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, c) => setResponse("t9", v, c)} />
        <p className="prompt">
          10. A 13-year-old arrives at the poolside in silence, without greeting anyone. Write in
          two lines what you do in the first ten seconds.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explains how the correction works (§10, D34)
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
          Example of generated feedback, in case of a wrong answer to question 2:
        </p>
        <div className="card quote">
          You answered that you&apos;d calm him down right away. But a &quot;calm down&quot; said
          to someone who&apos;s already worked up rarely works — because you haven&apos;t met him
          where he is, you&apos;ve only asked him to move on his own. Going along with him first,
          even for just a few seconds, opens the door that you can then close yourself.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Feedback never just says &quot;you got it wrong&quot;: it says what to look at next
          time. The tone is always about the observed behavior, never about the person (see
          Chapter 7, which will come back to exactly this rule).
        </p>
      </>
    ),
  },

  // 8 — recupero: solo se il test del venerdì ha troppi errori (§12, D25/D27)
  {
    day: "recovery",
    pct: 90,
    nextLabel: "Continue ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "prima", t2: "asseconda", t3: "no", t4: "paura", t5: "no",
        t6: "no", t7: "torna", t8: "no", t9: "richiude",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found a bit of difficulty</div>
        <h1>Three more scenes, to train the order</h1>
        <p className="lede">
          It&apos;s not a failure: it&apos;s just the signal that it&apos;s worth revisiting the
          trickiest point in this chapter with a few more examples — his rhythm first, only after
          that yours.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 9 years old</div>
          <p>
            First day with the group. Sitting at the edge, legs out of the water, arms crossed,
            doesn&apos;t answer anyone who greets him.
          </p>
        </div>
        <p className="prompt">What do you do first?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "gioco", label: "You suggest a game right away, to break the ice", correct: false },
            {
              value: "silenzio",
              label: "You sit next to him, in silence, for a moment, before proposing anything at all",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Greta, 7 years old</div>
          <p>
            Arrives at the poolside bouncing, tells you about her weekend in a rapid-fire stream
            without finishing a sentence, can&apos;t stand still for a second.
          </p>
        </div>
        <p className="prompt">What do you do first, before giving her the first instruction?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "calma", label: "You tell her to calm down, so you can start the exercise", correct: false },
            {
              value: "asseconda",
              label: "For a moment you go along with her rhythm — nod quickly, ask a short question with the same energy",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">A child who was following you well</div>
          <p>
            He followed the first two exercises without any trouble. On the third — new, never
            done before — he freezes up again, closed off like at the start of the session.
          </p>
        </div>
        <p className="prompt">What do you do?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "insisti", label: "You insist — he was following you until a moment ago, you keep going the same way", correct: false },
            {
              value: "torna",
              label: "You step back: you find his rhythm again, before proposing the direction again",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Closed off, agitated, or already moving and then frozen again — the form changes, never
          the order: you get on his rhythm first, only after that do you guide him.
        </p>
      </>
    ),
  },

  // 9 — venerdì: risultato
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
                <td style={{ padding: "6px 0" }}>Your answer in §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you reached Noa in §8, across both exchanges</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 3</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Rapport</td>
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
        <div className="done-badge">✓ Chapter 4 completed</div>
        <div className="eyebrow">Week 4 of 10 · Chapter 5 coming up</div>
        <h1>The message and the instruction</h1>
        <p className="lede">
          Today you learned to open the door. Next week you&apos;ll learn what to say, once
          it&apos;s open — and why your words, voice, and body need to say the same thing.
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
          <div className="chip acquisita">
            <span className="name">4 · Rapport</span>
            <span className="state">acquired</span>
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
