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

// English translation of caso-reale-01.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | "D" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "D";
}
function recuperato(a: Record<string, string>): boolean {
  return a.scelta1b === "verifica";
}
type Scelta2Version = "pulita" | "errore-successo" | "recupero-riuscito" | "mai-recuperato";
function scelta2Version(a: Record<string, string>): Scelta2Version {
  const o = situOutcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "errore-successo";
  if (o === "D") return recuperato(a) ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}
function needsScelta3(a: Record<string, string>): boolean {
  const v = scelta2Version(a);
  return v === "errore-successo" || v === "mai-recuperato";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "You don't repeat the whole explanation from the start, but check with a short, concrete question what he saw (\"tell me: which way do I turn my head to breathe?\") instead of \"got it?\"",
  },
  { value: "B", label: "You start the exercise thinking \"he's done this before, it's fine\"" },
  {
    value: "D",
    label: "You think he doesn't feel like doing the exercise, or has forgotten something he already knew (\"come on, you know how to do this, put some effort in\")",
  },
];
const SCELTA1B_OPTIONS: Option[] = [
  {
    value: "verifica",
    label: "You stop, lower your tone, and ask him what he saw or heard before (\"when the new group arrived — did you catch all of it?\")",
  },
  { value: "insiste", label: "You keep insisting on the wrong reading — repeat that he needs to try harder, maybe with a firmer tone" },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "You switch channel — a slow demonstration on the poolside, or guided physical contact (his head guided through the right movement)",
  },
  { value: "parole", label: "You explain it again in words" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Tommaso turns back toward you. He answers, a bit unsure but in the right direction: \"...to the side?\" You've recovered the information you needed — he knows the general part, he's missing the detail that got lost in the noise.",
  },
  B: {
    ok: false,
    text: "Tommaso tries, but gets exactly the detail wrong from the part he didn't hear — he turns his head too late relative to his arm, a mistake he hasn't made in weeks.",
  },
  D: {
    ok: false,
    text: "Tommaso thinks he got scolded for being lazy, but it wasn't his fault — he just hadn't heard. He closes up a bit, goes through the exercise mechanically, without trying to correct himself when he gets it wrong.",
  },
};

const SCELTA2_VERSION_TEXT: Record<Scelta2Version, string> = {
  pulita: "Tommaso answered the check question well, and tries the exercise with the correct information.",
  "errore-successo": "Tommaso got the detail he missed wrong, but with no scolding in between.",
  "recupero-riuscito": "Tommaso knows he was misread and then understood: he tries again, a little more confident.",
  "mai-recuperato": "Tommaso has stopped trying to correct himself, he goes through the motions mechanically.",
};

export const casoReale01StepsEn: Step[] = [
  // 0 — intro
  {
    day: "real case 01",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Real Cases · Scenario 01</div>
        <h1>The Child Who Gets Distracted</h1>
        <p className="lede">
          Age 6-10. Competencies touched: watching and understanding (Ch. 3) · rapport (Ch. 4) · the feedback (Ch.
          7) · changing course (Ch. 8).
        </p>
        <div className="card">
          Unlike a chapter or an exam round, this scenario is short and self-contained — it has no exam score:
          it&apos;s material you can come back to whenever you want.
        </div>
      </>
    ),
  },

  // 1 — situation
  {
    day: "situation",
    pct: 14,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Tommaso, 8 years old</h1>
          <p className="lede">
            Third lesson of the week. You&apos;re working on lateral breathing at the poolside, an exercise he&apos;s
            already done before. Halfway through the explanation, Tommaso looks toward the entrance — a new group has
            arrived, dropping their bags with a clatter. When he looks back at you, you get the feeling he didn&apos;t
            hear the last part of what you said.
          </p>
          <p className="prompt">What do you do — before having him try the exercise?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — scelta1b, only if outcome D
  {
    day: "choice 1B — recovery",
    pct: 28,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.scelta1b,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Choice 1B · only because you misread the cause</div>
        <h1>Something doesn&apos;t add up</h1>
        <p className="lede">
          Tommaso does the exercise mechanically, getting the same detail wrong as before without trying to correct
          himself. He doesn&apos;t seem unmotivated — he seems a bit dulled, like someone expecting another scolding.
        </p>
        <p className="prompt">You notice that something doesn&apos;t add up in your first reading. What do you do now?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>What you actually do, in practice</h2>
        <OptionGroup name="scelta1b" options={SCELTA1B_OPTIONS} selected={answers.scelta1b} onPick={(v) => setResponse("scelta1b", v)} />
        {answers.scelta1b === "verifica" && (
          <div className="feedback ok">
            Tommaso lights up a little: &quot;...no, actually no.&quot; It wasn&apos;t a lack of effort: a piece had
            gotten past him, and the scolding had only discouraged him further.
          </div>
        )}
        {answers.scelta1b === "insiste" && (
          <div className="feedback retry">
            Tommaso does two more attempts, always the same, no longer trying to correct himself. He&apos;s stopped
            trying — not because he doesn&apos;t know how, but because he&apos;s understood that, in your eyes, the
            problem is him and not the detail that got past him.
          </div>
        )}
      </>
    ),
  },

  // 3 — scelta2, the feedback
  {
    day: "choice 2 — the feedback",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const v = scelta2Version(answers);
      const esito =
        v === "pulita" || v === "recupero-riuscito"
          ? "Tommaso tries the exercise, and gets it almost right."
          : "Tommaso tries the exercise, and repeats the same mistake on the detail that got past him.";
      return (
        <>
          <div className="eyebrow">Choice 2 · The feedback</div>
          <h1>The context you arrive with</h1>
          <div className="card">{SCELTA2_VERSION_TEXT[v]}</div>
          <p className="lede">{esito}</p>
          <p className="prompt">Write the feedback you give him now — specific about the behavior, never about the person.</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v2) => setReflection("q2", v2)} />
        </>
      );
    },
  },

  // 4 — scelta3, changing course, only if needed
  {
    day: "choice 3 — changing course",
    pct: 65,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    visible: (a) => needsScelta3(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = answers.canale as "cambia" | "parole" | undefined;
      return (
        <>
          <div className="eyebrow">Choice 3 · Changing course</div>
          <h1>Same mistake, a third time</h1>
          <p className="lede">
            After the specific feedback, Tommaso tries again — same mistake a third time. Explaining in words, even
            repeated precisely, isn&apos;t enough anymore.
          </p>
          <p className="prompt">What do you do now — instead of repeating the same words again?</p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>What you actually do, in practice</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {outcome === "cambia" && (
            <div className="feedback ok">
              On the next attempt the movement is almost correct — not perfect, but his head turns at the right
              moment.
            </div>
          )}
          {outcome === "parole" && (
            <div className="feedback retry">
              Tommaso keeps making the same mistake. It&apos;s no longer a matter of distraction: it&apos;s become a
              matter of channel — and the &quot;telling&quot; channel has already shown, three times, that it&apos;s
              not enough.
            </div>
          )}
        </>
      );
    },
  },

  // 5 — closing
  {
    day: "closing",
    pct: 84,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Closing</div>
        <h1>What you take with you</h1>
        <p className="prompt">
          Across all the versions: what do you take with you, from this scenario, for the next time a student seems
          distracted rather than struggling?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Free reflection, it doesn&apos;t count toward any score: Real Cases aren&apos;t a test, they&apos;re
          training material you can revisit any time.
        </p>
      </>
    ),
  },

  // 6 — how to read this
  {
    day: "how to read this",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const oss =
        o === "A" ? "handled on the first try" : o === "B" ? "partly handled" : recuperato(answers) ? "got it wrong, but recovered" : "got it wrong, not recovered";
      const showScelta3 = needsScelta3(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scenario completed</div>
          <div className="eyebrow">How to read this scenario</div>
          <h1>The Child Who Gets Distracted</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Watching and understanding (Ch. 3)</span>
              <span className="esito">{oss}</span>
            </div>
            <div className="result-row">
              <span className="comp">The feedback (Ch. 7)</span>
              <span className="esito">recorded <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            {showScelta3 && (
              <div className="result-row">
                <span className="comp">Changing course (Ch. 8)</span>
                <span className="esito">{answers.canale === "cambia" ? "handled" : "needs reinforcing"}</span>
              </div>
            )}
          </div>
          <p className="lede">
            The first choice has three outcomes, not two: recognizing the distraction and acting well is not the same
            thing as recognizing it and ignoring it. Misreading it doesn&apos;t close the scenario — it opens a
            second fork, with a real recovery possible.
          </p>
        </>
      );
    },
  },
];
