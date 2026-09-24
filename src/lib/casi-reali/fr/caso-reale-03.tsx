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

// Traduction française de caso-reale-03.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1 situOutcome()/needsRecupero() du
// mockup caso-reale-03.html.
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
      "Tu reconnais la peur (épaules tendues, regard fixé sur l'eau, pas sur toi) et tu t'approches sans la presser, en tendant la main sans dire « entre »",
  },
  {
    value: "B",
    label: "Tu lis cette pause comme un caprice ou une distraction et tu essaies de la convaincre avec des mots (« allez, tu sais déjà le faire, tu l'as fait plein de fois »)",
  },
];
const REC_OPTIONS: Option[] = [
  { value: "tempo", label: "Tu t'arrêtes, tu te mets à son niveau et tu lui donnes du temps, sans autres mots pour la convaincre" },
  { value: "insisti", label: "Tu continues d'insister avec des mots, peut-être en promettant quelque chose en échange" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Beatrice ne bouge pas tout de suite, mais après un moment elle déplace son poids vers toi — ne se sentant pas pressée, elle commence à te faire confiance.",
  },
  B: {
    ok: false,
    text: "Beatrice se raidit davantage — les mots n'étaient pas le problème, et insister pour la convaincre ne touche pas la vraie peur.",
  },
};

const REC_FEEDBACK: Record<"tempo" | "insisti", { ok: boolean; text: string }> = {
  tempo: {
    ok: true,
    text: "Après un moment de silence partagé, Beatrice avance un pied. Elle n'a pas été convaincue — on lui a donné l'espace dont elle avait besoin.",
  },
  insisti: {
    ok: false,
    text: "Beatrice entre, mais en se tenant serrée au bord pendant toute la leçon — elle a cédé, elle ne s'est pas sentie comprise.",
  },
};

export const casoReale03StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 03",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 03</div>
        <h1>L&apos;enfant qui a peur</h1>
        <p className="lede">Tranche d&apos;âge 3-5 ans. Compétences : observer et interpréter (Chap. 3) · mise en phase (Chap. 4).</p>
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Beatrice, 5 ans</h1>
          <p className="lede">
            Première leçon après les vacances. Au bord du bassin elle se bloque, elle n&apos;entre pas : épaules
            serrées, regard fixé sur l&apos;eau, elle ne te cherche pas des yeux. Elle ne pleure pas, elle ne dit
            rien.
          </p>
          <p className="prompt">
            Quelle cause te semble la plus probable — et qu&apos;est-ce que tu fais pour le vérifier, pas ce que tu
            lui demandes avec des mots ?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
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
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "tempo" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Récupération · seulement parce que ça n&apos;a pas marché</div>
          <h1>Beatrice est toujours immobile, maintenant plus tendue</h1>
          <p className="prompt">Qu&apos;est-ce que tu fais maintenant ?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
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
          Qu&apos;est-ce que tu retiens de ce scénario, la prochaine fois qu&apos;un petit enfant se bloque en
          silence ?
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
      const esito = o === "A" ? "gérée du premier coup" : answers.rec === "tempo" ? "ratée, mais rattrapée" : "ratée, non rattrapée";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui a peur</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observer et interpréter (Chap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Le silence d&apos;un enfant effrayé n&apos;est pas un vide à combler avec d&apos;autres mots — c&apos;est
            une information, et la bonne réponse commence toujours par la façon dont on la lit, pas par ce qu&apos;on
            dit.
          </p>
        </>
      );
    },
  },
];
