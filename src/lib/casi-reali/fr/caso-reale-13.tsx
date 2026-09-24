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

// French translation of caso-reale-13.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu prends la question au sérieux et tu lui offres un choix réel et limité, pas symbolique (« choisis toi-même lequel des deux exercices de jambes on fait en premier, le reste reste comme prévu »), avec un ton qui montre que tu y as vraiment réfléchi",
  },
  {
    value: "B",
    label:
      "Tu réponds de façon techniquement correcte mais expéditive (« la programmation, c'est moi qui la fais, il y a une raison pour chaque exercice »), vrai sur le fond mais dit sans t'arrêter, presque agacé",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Andrea choisit, avec plus d'attention qu'il n'en aurait mis dans un exercice imposé — ce n'était pas le choix en soi qui comptait, c'était d'avoir été pris au sérieux.",
  },
  B: {
    ok: false,
    text: "Andrea n'insiste pas, mais pour le reste de la leçon il reste distant. Il a reçu une réponse juste sur le fond, mais dite sur un ton expéditif, presque agacé. Les mots disaient une chose, le ton en disait une autre — et ça l'a fait cesser de faire confiance.",
  },
};

export const casoReale13StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 13",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 13 · dernier de la bibliothèque</div>
        <h1>L&apos;adolescent qui veut être traité comme un adulte</h1>
        <p className="lede">
          Tranche d&apos;âge 14-18 ans. Compétences : communication adaptée à l&apos;âge (Chap. 2) · congruence
          (Chap. 5). Dernier scénario de la bibliothèque — il referme l&apos;arc 3-18 ans commencé avec Nicolò, 4
          ans, qui avait seulement besoin qu&apos;on le regarde dans les yeux.
        </p>
        <div className="card">
          Scénario court et autonome — il n&apos;a pas de note d&apos;examen : c&apos;est un contenu que tu peux
          consulter quand tu veux.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situation",
    pct: 30,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Andrea, 16 ans</h1>
          <p className="lede">
            Il te demande, pas pour polémiquer mais sérieusement : « pourquoi tu ne me laisses jamais rien
            choisir dans la programmation ? Je sais bien ce que j&apos;ai besoin d&apos;améliorer. »
          </p>
          <p className="prompt">Que réponds-tu — les mots, et avec quel ton ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "clôture — la dernière de la bibliothèque",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture — la dernière de la bibliothèque</div>
        <h1>En regardant en arrière sur les treize scénarios</h1>
        <p className="prompt">
          Qu&apos;est-ce qu&apos;ont en commun un enfant de 4 ans qui a seulement besoin qu&apos;on le regarde
          dans les yeux, et un garçon de 16 ans qui demande à choisir ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Réflexion libre, non notée.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "comment lire ce scénario",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gérée du premier coup" : "non gérée — la demande reste sur la table";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Bibliothèque des 13 Cas Réels complète</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;adolescent qui veut être traité comme un adulte</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Communication adaptée à l&apos;âge + congruence</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <div className="card quote">
            Le fil qui traverse toute la bibliothèque, du premier scénario au dernier : à chaque âge, la demande
            change de forme — un regard, une question, un « pourquoi » — mais c&apos;est toujours la même chose
            : se sentir vu pour ce qu&apos;on est à ce moment-là, pas pour l&apos;âge qu&apos;on a.
          </div>
        </>
      );
    },
  },
];
