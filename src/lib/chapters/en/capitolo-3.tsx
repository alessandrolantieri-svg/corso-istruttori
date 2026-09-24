import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-3.tsx) — solo il testo visibile cambia.

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

// Porta 1:1 la funzione simPath() del mockup: classifica la combinazione delle prime due
// scelte della simulazione con Luca in un percorso "aperta" (c'è un terzo scambio, a testo
// libero) o "chiusa" (la scena si chiude senza terzo scambio).
function simPath(answers: Record<string, string>): "aperta" | "chiusa" {
  if (answers.sim1 === "curioso" && answers.sim2 === "scalda") return "aperta";
  if (answers.sim1 === "diretto" && answers.sim2 === "calma") return "aperta";
  return "chiusa";
}

const K1_OPTIONS: Option[] = [
  { value: "si", label: "Yes, fear is the same at every age", correct: false },
  { value: "no", label: "No — at 5, a game or an offered hand; at 13, not being watched while she hesitates", correct: true },
];
const K2_OPTIONS: Option[] = [
  { value: "bracciata", label: "\"Because it lengthens your stroke — try it and feel the difference\"", correct: true },
  { value: "dico", label: "\"Because I said so, now do it\"", correct: false },
];
const K3_OPTIONS: Option[] = [
  { value: "risponde", label: "From how they respond", correct: true },
  { value: "carta", label: "From their ID card", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "eta", label: "You treat him according to his age on paper", correct: false },
  { value: "comportamento", label: "You treat him according to the behavior he's showing", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No — the age band is also read from context", correct: true },
  { value: "si", label: "Yes, you had misjudged him", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "si", label: "Yes, if it's clear", correct: false },
  { value: "no", label: "No — you lose him halfway through, even if he seems to be listening", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "freddo", label: "Cold", correct: true },
  { value: "paura", label: "Fear", correct: false },
  { value: "via", label: "Waiting for the go-ahead", correct: false },
  { value: "capito", label: "Didn't understand", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "paura", label: "Fear", correct: false },
  { value: "freddo", label: "Cold", correct: false },
  { value: "via", label: "Waiting for the go-ahead", correct: true },
  { value: "capito", label: "Didn't understand", correct: false },
];
const M3_OPTIONS: Option[] = [
  { value: "via", label: "Waiting for the go-ahead", correct: false },
  { value: "freddo", label: "Cold", correct: false },
  { value: "capito", label: "Didn't understand — the instruction isn't clear yet, it needs re-explaining, not just a nod", correct: true },
  { value: "paura", label: "Fear", correct: false },
];
const M4_OPTIONS: Option[] = [
  { value: "no", label: "No, the four signals always stay distinct and fixed", correct: false },
  { value: "si", label: "Yes — the signal can change while you're observing, if the wait drags on too long", correct: true },
];

const SIM1_OPTIONS: Option[] = [
  { value: "diretto", label: "\"Come on Luca, you've already done it, get in\"" },
  { value: "curioso", label: "\"Luca, what are you feeling? Is it cold, or are you a bit shivery?\"" },
];
const SIM2_OPTIONS_DIRETTO: Option[] = [
  { value: "insisti", label: "\"Come on Luca, you know how, let's go\"" },
  { value: "calma", label: "You step closer, lower your voice, calmly ask what he's feeling" },
];
const SIM2_OPTIONS_CURIOSO: Option[] = [
  { value: "entra", label: "You have him get in anyway, saying the cold will pass once he's in the water" },
  { value: "scalda", label: "You suggest thirty seconds of movement on the poolside, like with Giada" },
];

const T1_OPTIONS: Option[] = [
  { value: "capito", label: "Didn't understand", correct: false },
  { value: "paura", label: "He's afraid", correct: true },
  { value: "freddo", label: "He's cold", correct: false },
  { value: "via", label: "Waiting for the go-ahead", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "paura", label: "She's afraid", correct: false },
  { value: "capito", label: "Didn't understand", correct: false },
  { value: "via", label: "Waiting for the go-ahead", correct: true },
  { value: "freddo", label: "She's cold", correct: false },
];
const T3_OPTIONS: Option[] = [
  { value: "calore", label: "Lacks warmth — probably cold", correct: true },
  { value: "coraggio", label: "Lacks courage", correct: false },
  { value: "spiegazione", label: "Lacks a clearer explanation", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "tecnica", label: "A technical explanation like to an adult", correct: false },
  { value: "motivo", label: "A practical, direct reason", correct: true },
  { value: "niente", label: "No answer, just do it", correct: false },
];
const T5_OPTIONS: Option[] = [
  { value: "si", label: "Yes — if you watch closely enough, you automatically understand what's happening", correct: false },
  { value: "no", label: "No — watching is seeing that something happened, understanding is deciding what it means", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "no", label: "No — it still teaches something, often the opposite", correct: true },
  { value: "si", label: "Yes, the important thing is trying", correct: false },
];
const T7_OPTIONS: Option[] = [
  { value: "si", label: "Yes, if the answers are correct", correct: false },
  { value: "no", label: "No — you always need at least one real pool session", correct: true },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "No, the four signals always stay distinct", correct: false },
  { value: "si", label: "Yes — the signal can change while you're observing, if the wait drags on", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "misto", label: "A mix of waiting for the go-ahead and the embarrassment of a new group watching", correct: true },
  { value: "dimenticato", label: "He forgot how to dive", correct: false },
  { value: "acqua", label: "He's afraid of the water", correct: false },
];

const DIARY_KEYS = ["q2", "q7", "sim3", "qtrasf", "t10"];

export const capitolo3StepsEn: Step[] = [
  // 0 — copertina
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 3 · WATCHING AND UNDERSTANDING <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>He stopped: is he afraid, or did he not understand?</h1>
        <p className="lede">
          Faced with a child who stops, freezes, or hesitates, the instructor knows how to tell
          apart four different causes — and knows that each one calls for a different response.
        </p>
        <div className="card warn">
          <strong>A higher standard.</strong> Every competency in this course moves through a
          scale of levels, in order: <strong>IN PROGRESS → ACQUIRED → CONSOLIDATED → EXCELLENT</strong> —
          but for two of them only, marked with the <i className="ph-duotone ph-trophy" aria-hidden="true" /> symbol, the course asks you to go further:
          to <strong>EXCELLENT</strong>. This one (Watching and understanding) and Chapter 6
          (Verifying through action) are the two listening competencies: here ACQUIRED isn&apos;t
          enough, you need EXCELLENT before the final exam — and simulation alone is never enough:
          you always need at least one real pool session.
        </div>
      </>
    ),
  },

  // 1 — lunedì: riflessione + consolidamento Capitolo 2
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
          Last week Chapter 2 asked you just one thing: pick a student and work out their band
          from how they responded to you, not from their age. Tell me in two lines what you
          noticed.
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 2 comes back</h2>
        <p className="prompt">1. Marco (5) and Elena (13) won&apos;t get into the water alone. Same sentence for both?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. A 15-year-old asks: &quot;why do I have to do this exact exercise?&quot; You answer:</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Is the age band recognized better from how they respond or from their ID card?</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. A 10-year-old behaves like a 12-year-old — seeks privacy before being corrected. What do you do?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">5. A 13-year-old, alone with you without the group, behaves more openly than usual. Is that a contradiction?</p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">6. Does treating a 7-year-old with a long technical explanation, like an adult, work?</p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martedì: le quattro cause
  {
    day: "Tuesday · 14 min",
    pct: 28,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>Watching and understanding aren&apos;t the same thing</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          This week you learn to do two things that sound like one, and aren&apos;t: watching,
          and understanding what you&apos;re watching.
        </p>
        <p className="lede">
          A child stops at the poolside, a moment before a dive he&apos;s already done ten times.{" "}
          <strong>Watching</strong> is seeing that he stopped — anyone can see that.{" "}
          <strong>Understanding</strong> is the hard part: that pause can mean four different
          things.
        </p>
        <div className="table-wrap">
          <table className="cause">
            <tbody>
              <tr>
                <th>He&apos;s...</th>
                <th>And the sign is...</th>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-waves" aria-hidden="true" /> Afraid</td>
                <td>His body stiffens, his eyes stay fixed on the water, not on you</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-question" aria-hidden="true" /> Didn&apos;t understand</td>
                <td>He looks at you, hesitating — waiting for a signal that doesn&apos;t come</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-snowflake" aria-hidden="true" /> Cold</td>
                <td>His arms hug his body, maybe he shivers a little — no stiffness, no seeking your gaze</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-eye" aria-hidden="true" /> Waiting for the go-ahead</td>
                <td>He seeks you out with his eyes before moving — he needs your go-ahead</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          If you respond with the wrong thing, that child still learns something — just not what
          you meant to teach him.
        </div>
        <p className="lede">
          <strong>
            One last thing, before moving on: this complicates the table on purpose, just like the
            age band did in the last chapter.
          </strong>{" "}
          A child doesn&apos;t stay frozen in a photo: the signal can change while you&apos;re
          watching, especially if you wait too long before responding. A child who at first is
          just waiting for your go-ahead — eyes on you, body relaxed — can change if you take too
          long to respond. A long silence becomes a signal in itself: it starts to feel to him like
          something&apos;s wrong. And so what was &quot;waiting for the go-ahead&quot; starts
          turning into real fear. Watching isn&apos;t taking a single snapshot: it&apos;s
          continuing to look even after you&apos;ve decided on a response.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Tight shoulders, slight trembling, no seeking of your gaze.</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. Seeks you out with his eyes before moving, body not tense.</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. You&apos;ve just shown a new exercise, never done before. The child gets in the
          water, stops halfway, looks at you — not waiting for a nod to move on: seems to genuinely
          not know what to do next.
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
        <p className="prompt">
          4. Can a child who&apos;s just waiting for your go-ahead start to show signs of real
          fear, if you wait too long to respond to him?
        </p>
        <OptionGroup name="m4" options={M4_OPTIONS} selected={answers.m4} onPick={(v, correct) => setResponse("m4", v, correct)} />
      </>
    ),
  },

  // 3 — mercoledì: quattro bambini, quattro letture + simulazione Luca (tre scambi)
  {
    day: "Wednesday",
    pct: 44,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => {
      if (!a.sim1) return false;
      if (!a.sim2) return false;
      const path = simPath(a);
      if (path === "aperta") return !!a.sim3;
      return true;
    },
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const promptStyle = {
        fontSize: ".8rem",
        textTransform: "uppercase" as const,
        letterSpacing: ".03em",
        color: "var(--surface)",
        fontFamily: "var(--mono)",
        fontWeight: 700,
      };
      const sim2Options = answers.sim1 === "diretto" ? SIM2_OPTIONS_DIRETTO : SIM2_OPTIONS_CURIOSO;
      const path = answers.sim1 && answers.sim2 ? simPath(answers) : null;

      return (
        <>
          <div className="eyebrow">Wednesday</div>
          <h1>Five children, five readings</h1>
          <div className="card scene">
            <div className="who">Sofia, 4 years old</div>
            <p>
              Foot in the water up to the ankle, still. Shoulders up, tight; eyes fixed on the
              water, not seeking him out. It&apos;s fear, not misunderstanding. The instructor
              stands beside her, holds out a hand: &quot;come on, I&apos;ve got you.&quot;
            </p>
          </div>
          <div className="card scene">
            <div className="who">Leo, 6 years old</div>
            <p>
              Has just watched the instructor show a brand-new exercise, twice. Gets in the water
              and stops right away, body calm, no trembling. Looks at the instructor — but not
              with the eyes of someone waiting for a nod: he&apos;s searching for something he
              can&apos;t find. He didn&apos;t understand, a nod won&apos;t help him: the
              instructor shows the sequence once more, slower, isolating just the arms. Leo does
              it right away, no more stopping.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Giada, 8 years old</div>
            <p>
              Arms wrapped tight around her body, shoulders curved, a slight trembling in her
              hands. She doesn&apos;t seek the instructor&apos;s gaze, her eyes aren&apos;t fixed
              and frightened. It&apos;s just cold. Thirty seconds of movement on the poolside,
              before letting her get in.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Nadia, 12 years old</div>
            <p>
              She has to redo a dive she&apos;s already nailed before, but today the group is
              different from usual — some older boys, there for a substitution. She stops at the
              edge: she&apos;s not shaking, her body isn&apos;t tense, but she seeks the
              instructor&apos;s gaze two, three times, without saying anything. It&apos;s not fear
              of the dive: she already knows how to do that. And it&apos;s not just &quot;waiting
              for the go-ahead&quot; either. There&apos;s also the embarrassment of the new group —
              the same one Chapter 2 already talked about for this age. The
              instructor doesn&apos;t say anything out loud: he just gives her a small nod, the
              same one he&apos;d give her if the group were the usual one. Nadia dives in.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Matteo, 14 years old</div>
            <p>
              Still on the starting block, the group watching him. His body is tense in a
              different way, his eyes search for the instructor for a moment. It&apos;s not the
              water: it&apos;s the line watching him. The instructor lowers his voice, just for
              him: &quot;take a second, I&apos;ll wait.&quot;
            </p>
          </div>
          <p className="lede">
            <strong>
              Same pause, five children, five different readings — all five right, precisely
              because they&apos;re different.
            </strong>{" "}
            With Nadia, as with Matteo, the silent nod worked better than any sentence. With Leo,
            though, a nod wouldn&apos;t have helped at all: what was missing was the explanation,
            not the permission.
          </p>
          <p className="prompt">
            A 7-year-old, stopped halfway across doing breaststroke. You can&apos;t tell if
            he&apos;s afraid, if he doesn&apos;t remember the movement, or if he&apos;s waiting
            for a signal from you. What do you say to him — or what do you ask him — to
            understand, BEFORE giving him a new instruction?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Grading note, not shown to the instructor: there's no single right answer. The
              system looks for one thing — asking, not assuming. A direct instruction shuts off
              the information, whatever the real cause was. */}
          <h2>Simulation — three exchanges to get Luca into the water</h2>
          <p className="lede">
            <strong>LUCA, 9 years old.</strong> At the poolside, one foot in, won&apos;t get in.
            The group is waiting.
          </p>
          <p className="prompt" style={promptStyle}>First exchange</p>
          <p className="lede">What do you say to him first?</p>
          <OptionGroup name="sim1" options={SIM1_OPTIONS} selected={answers.sim1} onPick={(v) => setResponse("sim1", v)} />
          {answers.sim1 === "diretto" && (
            <div className="feedback retry">
              LUCA: <em>(steps back half a pace, his foot comes out of the water)</em> &quot;...but
              I don&apos;t want to.&quot;
              <br />
              A direct instruction shut off the information you were missing, whatever the real
              cause was.
            </div>
          )}
          {answers.sim1 === "curioso" && (
            <div className="feedback ok">
              LUCA: <em>(points at his arms, hugs himself a little)</em> &quot;...I&apos;ve got the
              shivers.&quot;
              <br />
              An open question got you the information: it&apos;s cold, not fear. Luca opens up
              instead of shutting down.
            </div>
          )}

          {answers.sim1 && (
            <>
              <p className="prompt" style={promptStyle}>Second exchange</p>
              {answers.sim1 === "diretto" ? (
                <p className="lede">
                  The group is still waiting, and Luca is now further from the edge. What do you
                  say to him now?
                </p>
              ) : (
                <p className="lede">
                  He&apos;s still cold, and the group is waiting. What do you do now — not just
                  what do you say?
                </p>
              )}
              <OptionGroup name="sim2" options={sim2Options} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {answers.sim2 === "insisti" && (
                <div className="feedback retry">
                  LUCA steps back another pace, doesn&apos;t answer anymore — stays quiet, looks
                  away.
                </div>
              )}
              {answers.sim2 === "calma" && (
                <div className="feedback ok">
                  LUCA: &quot;...I don&apos;t know, I just don&apos;t feel like it.&quot;{" "}
                  <em>(he stops, doesn&apos;t step back anymore — not clear information, but
                  contact is restored)</em>
                </div>
              )}
              {answers.sim2 === "entra" && (
                <div className="feedback retry">
                  LUCA hesitates even more, hugs himself tighter — he doesn&apos;t feel believed,
                  and now he wants to get in even less than before.
                </div>
              )}
              {answers.sim2 === "scalda" && (
                <div className="feedback ok">
                  LUCA warms up, hugs himself a little less, and starts moving closer to the edge
                  on his own, without you having to tell him again.
                </div>
              )}
            </>
          )}

          {path === "aperta" && (
            <>
              <p className="prompt" style={promptStyle}>Third exchange — the closing</p>
              <p className="lede">
                Luca is now close to the edge, still a little hesitant but not shut down. Write
                the last thing you say to him before he gets in.
              </p>
              <Field id="sim3" value={answers.sim3 ?? ""} onChange={(v) => setReflection("sim3", v)} />
              <p className="lede" style={{ fontSize: ".85rem" }}>Any reasonable answer closes the scene well.</p>
              <div className="feedback ok" style={{ marginTop: 10 }}>
                LUCA gets in, one foot at a time, but he gets in. You haven&apos;t won anything —
                you&apos;ve just understood, instead of guessing.
              </div>
            </>
          )}
          {path === "chiusa" && (
            <>
              <p className="prompt" style={promptStyle}>The scene ends here — not today</p>
              <div className="feedback retry">
                Meanwhile, the group has moved on without Luca. Luca stays at the edge, quiet.
                It&apos;s not a failure: it&apos;s information. Whatever it was, you didn&apos;t
                find it in time today. What matters is what you do the next time he stops — not
                what happened this time.
              </div>
            </>
          )}
        </>
      );
    },
  },

  // 4 — mercoledì sera: trasferimento
  {
    day: "Wednesday evening",
    pct: 58,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>A scene you&apos;ve never seen before</h1>
        <p className="lede">
          A 10-year-old stops halfway through an exercise. He looks straight ahead, isn&apos;t
          shaking, doesn&apos;t seek you out with his eyes — but his breathing is shorter than
          usual.
        </p>
        <p className="prompt">Which cause seems most likely to you, and why? Write your reasoning, not just the answer.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: it's not directly in the table — that's
            intentional: it's often fatigue, a case that resembles all four causes and isn't
            exactly any of them. The system checks whether they're still observing, not whether
            they have the exact answer. */}
      </>
    ),
  },

  // 5 — in vasca
  {
    day: "in the pool",
    pct: 66,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>Stop for a second yourself, first</h1>
        <p className="lede">
          With the first child who stops or hesitates, before saying anything: stop for a second
          yourself first, and decide which of the four causes seems most likely to you. Then
          respond to that, not to the first sentence that comes to mind.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>You don&apos;t need to get it right. You need to have asked yourself the question before speaking.</p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          If you don&apos;t have a session this week: the chapter still unlocks with a reinforced
          simulation — but that&apos;s not enough to bring this competency to EXCELLENT. For that,
          you need, sooner or later, a real pool session.
        </p>
      </>
    ),
  },

  // 6 — venerdì: test cumulativo
  {
    day: "Friday · 11 min",
    pct: 86,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 2 + Chapter 3</div>
        <h1>The test</h1>
        <p className="prompt">
          1. A 12-year-old freezes before a dive he&apos;s already done. He doesn&apos;t look at
          you, stares at the water, shoulders tensed upward.
        </p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. A 5-year-old girl stops and seeks you out with her eyes, no tension in her body.</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Trembling slightly, arms hugging her body, but not seeking your gaze and no stiff shoulders.</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">
          4. <em>(from Chapter 2)</em> A 16-year-old asks the why of an exercise. The right answer
          for his age band is:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">5. Are watching and understanding the same thing?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Is responding to the wrong cause a neutral mistake?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. For this competency, is a good simulation enough for EXCELLENT?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">
          8. Can a child who&apos;s just waiting for your go-ahead start to show signs of real
          fear, if you wait too long to respond?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Nadia, 12, hesitates before a dive she already knows how to do, because the group
          that day is different from usual. What&apos;s most likely behind it?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. An 8-year-old performs an exercise incorrectly for the third time in a row, always
          the same way. What do you look at, and what do you start to suspect?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: spiega come funziona la correzione (§10, D34)
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
          You answered &quot;he&apos;s afraid&quot; to question 2. Re-read the signal: no tension
          in the body, just the eyes seeking you out. Fear usually shows in the body before it
          shows in the eyes. When the eyes just seek you out and nothing else, it&apos;s often
          only the go-ahead that&apos;s missing — try offering that before offering reassurance.
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
        t1: "paura", t2: "via", t3: "calore", t4: "motivo", t5: "no",
        t6: "no", t7: "no", t8: "si", t9: "misto",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found a bit of difficulty</div>
        <h1>Two more signals, so you stop mixing them up</h1>
        <p className="lede">
          It&apos;s not a failure: it&apos;s just the signal that it&apos;s worth revisiting the two
          most similar signals in this chapter — cold and waiting for the go-ahead — with one more
          example each.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 6 years old</div>
          <p>
            Standing still at the edge, arms wrapped tight around his body, a slight trembling in
            his hands. He doesn&apos;t seek the instructor&apos;s gaze — he looks absently toward
            the water, not toward him.
          </p>
        </div>
        <p className="prompt">What&apos;s most likely missing for him?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "via", label: "The go-ahead — he's waiting for a nod", correct: false },
            {
              value: "freddo",
              label: "Warmth — no seeking of your gaze, just the body pulling in tight: he's cold",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Bianca, 9 years old</div>
          <p>
            Standing still at the edge, body relaxed, no trembling. Before putting a foot in the
            water, she seeks you out with her eyes twice, without saying anything, as if waiting
            for your nod.
          </p>
        </div>
        <p className="prompt">What&apos;s most likely missing for her?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "via",
              label: "Your go-ahead — her body is calm, she's only seeking your nod",
              correct: true,
            },
            { value: "freddo", label: "Warmth — she's probably cold", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          The fastest way to tell them apart: a cold child pulls in tight and doesn&apos;t seek you
          out; a child waiting for the go-ahead stays calm and seeks you out with their eyes. Look
          there first.
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
                <td style={{ padding: "6px 0" }}>The sentence you wrote in §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you got Luca into the water in §8, across the three exchanges</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 2</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>transfer_score</td>
                <td style={{ padding: "6px 0" }}>The same reflection, on the real-world transfer</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Watching and understanding</td>
                <td style={{ padding: "6px 0" }}>The lowest of the scores above sets the ceiling</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          For this specific competency: even reaching ACQUIRED or CONSOLIDATED, the EXCELLENT
          status doesn&apos;t kick in without at least one real pool session recounted and
          verified. Today it stays at ACQUIRED — the real pool session comes with an actual
          session, not with this simulation.
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
        <div className="done-badge">✓ Chapter 3 completed</div>
        <div className="eyebrow">Week 3 of 10 · Chapter 4 coming up</div>
        <h1>Rapport</h1>
        <p className="lede">
          You&apos;ve learned to read what&apos;s happening inside a child. Next week you&apos;ll
          learn why, even when you&apos;ve read it right, sometimes he still won&apos;t listen to
          you.
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
          <div className="chip acquisita">
            <span className="name">3 · Watching and understanding <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">acquired</span>
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
