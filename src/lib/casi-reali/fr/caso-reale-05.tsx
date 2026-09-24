import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Écris ici..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Traduction française de caso-reale-05.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1 situOutcome()/needsRecupero() du
// mockup caso-reale-05.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu changes de canal — tu lui montres le mouvement lentement, ou tu lui guides les bras hors de l'eau avant de la faire réessayer",
  },
  { value: "B", label: "Tu réessaies avec les mêmes mots, reformulés différemment" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Tu changes enfin de canal (démonstration ou contact physique guidé)" },
  { value: "parole", label: "Tu insistes encore avec des mots, peut-être plus lentement" },
];

export const casoReale05StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 05",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 05</div>
        <h1>L&apos;enfant qui ne comprend pas</h1>
        <p className="lede">
          Tranche d&apos;âge 6-10 ans. Compétence : changer de cap (Chap. 8) — répertoire et adaptation en temps réel.
        </p>
        <div className="card">
          Scénario court et autonome — il n&apos;a pas de note d&apos;examen : c&apos;est du matériel que tu peux
          revoir quand tu veux.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situation",
    pct: 20,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Chiara, 7 ans</h1>
          <p className="lede">
            Tu lui as expliqué deux fois, avec des mots, comment coordonner les bras dans le dos crawlé. Elle
            réessaie, et se trompe de nouveau, exactement de la même façon. Elle n&apos;a pas l&apos;air distraite —
            elle te regarde, concentrée, et ça ne vient toujours pas.
          </p>
          <p className="prompt">Qu&apos;est-ce que tu fais — pas une troisième explication avec des mots ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              À la tentative suivante, le mouvement est presque juste. Ce n&apos;était pas l&apos;engagement qui lui
              manquait : il lui manquait un canal différent de « dire ».
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Chiara se trompe encore, de la même façon. Ce n&apos;est pas un problème du nombre de fois où tu
              l&apos;expliques : c&apos;est un problème du canal que tu utilises.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "récupération",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Récupération · seulement parce que ça n&apos;a pas marché</div>
        <h1>Chiara s&apos;est trompée trois fois avec le même canal</h1>
        <p className="prompt">Qu&apos;est-ce que tu fais maintenant ?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>Ce que tu fais vraiment, en pratique</h2>
        <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
        {answers.rec === "cambia" && (
          <div className="feedback ok">La tentative suivante s&apos;améliore tout de suite et visiblement.</div>
        )}
        {answers.rec === "parole" && (
          <div className="feedback retry">
            Chiara commence à montrer des signes de fatigue de l&apos;attention plus que de l&apos;erreur elle-même —
            continuer comme ça ne mènera à rien de différent.
          </div>
        )}
      </>
    ),
  },

  // 3 — chiusura
  {
    day: "clôture",
    pct: 75,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture</div>
        <h1>Ce que tu retiens</h1>
        <p className="prompt">
          Qu&apos;est-ce que tu retiens, la prochaine fois qu&apos;un enfant semble concentré mais continue à se
          tromper de la même façon ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Réflexion libre, elle ne compte pas dans une note.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "comment lire ça",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gérée du premier coup" : answers.rec === "cambia" ? "ratée, mais rattrapée (tard)" : "ratée, non rattrapée";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui ne comprend pas</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Changer de cap (Chap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            « Ne comprend pas » et « n&apos;écoute pas » semblent proches, mais ce ne sont pas le même scénario : ici
            l&apos;attention est là — c&apos;est le canal qui manque, pas le contact.
          </p>
        </>
      );
    },
  },
];
