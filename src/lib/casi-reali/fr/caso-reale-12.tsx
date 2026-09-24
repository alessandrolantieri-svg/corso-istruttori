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

// French translation of caso-reale-12.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu reconnais l'opposition sous le ton conciliant et tu la nommes calmement, sans confrontation (« j'ai entendu le \"comme tu veux\" — qu'est-ce qui ne te convient pas dans cet exercice ? »)",
  },
  { value: "B", label: "Tu prends le « comme tu veux » au pied de la lettre, ou tu insistes seulement sur l'engagement technique (« allez, mets-y plus d'énergie »)" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Greta est déstabilisée un instant — elle ne s'attendait pas à ce que le sarcasme soit remarqué sans être retourné contre elle. Elle répond, plus directe : « ...je trouve ça inutile, franchement. » Maintenant tu peux travailler dessus.",
  },
  B: {
    ok: false,
    text: "Greta continue avec le même ton conciliant et la même exécution paresseuse — personne n'a remarqué son opposition silencieuse, donc Greta n'a aucune raison de changer d'attitude.",
  },
};

export const casoReale12StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 12",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 12</div>
        <h1>L&apos;adolescente qui exécute à contrecœur</h1>
        <p className="lede">
          Tranche d&apos;âge 14-18 ans. Compétence : situations difficiles (Chap. 9). Différent des exemples de
          défi ouvert déjà vus dans le Chapitre 9 et dans le Tour 2 de l&apos;examen : ici l&apos;opposition ne
          hausse pas le ton — elle sourit, elle exécute, et elle désamorce tout avec un ton qui dit autre chose.
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
          <h1>Greta, 17 ans</h1>
          <p className="lede">
            Tu lui donnes une consigne technique. Elle répond : « bien sûr, comme tu veux », avec un sourire et
            un ton légèrement sarcastique, puis exécute une version volontairement paresseuse de l&apos;exercice
            — pas fausse, juste dépourvue de tout engagement.
          </p>
          <p className="prompt">
            Est-ce un problème technique ou relationnel ? Et que fais-tu — pas ce que tu lui dis pour la faire
            s&apos;engager plus ?
          </p>
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
          Que retiens-tu, pour la prochaine fois qu&apos;un refus arrive en souriant plutôt qu&apos;en défiant ?
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
      const esito = o === "A" ? "gérée du premier coup" : "non gérée — signal manqué aujourd'hui";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;adolescente qui exécute à contrecœur</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situations difficiles (Chap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Le Chapitre 9 dit que le refus n&apos;est pas toujours bruyant — ici on va un pas plus loin : il peut
            même sonner comme un accord. Le signal n&apos;est pas dans les mots (« comme tu veux » est
            techniquement un oui), il est dans le ton et dans ce qui est exécuté juste après.
          </p>
        </>
      );
    },
  },
];
