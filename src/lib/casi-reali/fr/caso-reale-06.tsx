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

// French translation of caso-reale-06.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu observes un premier essai court avant de le laisser continuer — même s'il semble sûr de lui, tu lui demandes de te montrer seulement les premiers mètres",
  },
  { value: "B", label: "Tu fais confiance à l'assurance avec laquelle il parle et tu le laisses partir pour l'exercice entier" },
];

export const casoReale06StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 06",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 06</div>
        <h1>L&apos;enfant qui dit qu&apos;il sait déjà faire</h1>
        <p className="lede">Tranche d&apos;âge 6-10 ans. Compétence : vérifier par l&apos;action (Chap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />).</p>
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Filippo, 9 ans</h1>
          <p className="lede">
            Tu viens de lui expliquer comment garder le corps allongé pendant la glissée. Il dit, avec une
            confiance totale : « oui oui, je sais faire, je fais toujours comme ça. »
          </p>
          <p className="prompt">Que fais-tu — avant de le laisser partir pour toute la longueur du bassin ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Filippo glisse — son corps se cambre légèrement à mi-parcours. C&apos;était un détail que lui-même
              ne remarquait pas, parce qu&apos;il se sentait trop sûr de lui. Toi, tu le vois tout de suite, avant
              que ça devienne une habitude.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Filippo nage toute la longueur en répétant toujours la même erreur. Si tu l&apos;avais corrigé tout
              de suite, un instant aurait suffi. Découvert seulement maintenant, c&apos;est déjà devenu une
              habitude — et c&apos;est plus difficile à corriger.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "clôture",
    pct: 70,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture</div>
        <h1>Ce que tu retiens</h1>
        <p className="prompt">Que retiens-tu, pour la prochaine fois qu&apos;un élève te répond avec une confiance totale ?</p>
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
      const esito = o === "A" ? "gérée du premier coup" : "non gérée — la correction est arrivée trop tard";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui dit qu&apos;il sait déjà faire</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Vérifier par l&apos;action (Chap. 6 <i className="ph-duotone ph-trophy" aria-hidden="true" />)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            L&apos;assurance avec laquelle un enfant répond n&apos;est pas plus fiable qu&apos;un « oui, j&apos;ai
            compris » : le Chapitre 6 le dit pour l&apos;incertitude, mais ça vaut exactement l&apos;inverse — la
            confiance aussi doit être vérifiée par l&apos;action, pas prise pour argent comptant.
          </p>
        </>
      );
    },
  },
];
