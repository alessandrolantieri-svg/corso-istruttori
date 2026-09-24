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

// French translation of caso-reale-07.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  { value: "A", label: "Tu lui demandes son avis avant le tien, ou tu restes en silence à observer" },
  { value: "B", label: "Tu lui donnes quand même une correction technique, par habitude, même si ce n'est pas une erreur" },
];

export const casoReale07StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 07",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 07</div>
        <h1>L&apos;enfant qui a besoin d&apos;autonomie</h1>
        <p className="lede">
          Tranche d&apos;âge 6-10 ans. Compétence : autonomie (Chap. 10) — appliquée ici plus tôt que dans les
          exemples habituels, pour montrer que ce n&apos;est pas une compétence réservée aux plus grands.
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Vittoria, 10 ans</h1>
          <p className="lede">
            Depuis un mois, elle exécute correctement, sans erreur, l&apos;entrée dans l&apos;eau que tu
            corrigeais autrefois à chaque fois. Elle est sur le point de la refaire devant toi, comme toujours.
          </p>
          <p className="prompt">Que fais-tu, avant qu&apos;elle ne l&apos;exécute ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Vittoria exécute, puis te regarde : « ...je crois que je suis bien entrée. C&apos;est vrai ? » —
              elle a déjà donné son avis avant de demander le tien.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Vittoria : « ...ok. » Elle recommence en attendant, comme toujours, ton verdict final.
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
        <p className="prompt">
          Que retiens-tu, pour la prochaine fois qu&apos;un élève sait déjà bien faire quelque chose que tu
          corrigeais autrefois à chaque fois ?
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
      const esito = o === "A" ? "gérée du premier coup" : "occasion manquée, pas une erreur grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui a besoin d&apos;autonomie</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Autonomie (Chap. 10)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            L&apos;autonomie n&apos;est pas une compétence qui s&apos;applique seulement en fin de parcours, avec
            les élèves les plus grands : un enfant de 10 ans qui sait déjà bien faire quelque chose a le même
            besoin — qu&apos;on le laisse se juger lui-même — qu&apos;un élève de longue date.
          </p>
        </>
      );
    },
  },
];
