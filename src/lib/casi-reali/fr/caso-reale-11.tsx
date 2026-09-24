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

// French translation of caso-reale-11.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu lui poses une question précise et personnelle sur l'entraînement, pas générique (« qu'est-ce que tu aimerais vraiment améliorer, cette année ? »), en montrant un intérêt réel pour sa réponse",
  },
  { value: "B", label: "Tu laisses passer, en pensant que s'il exécute tout correctement, il n'y a pas de problème à traiter" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Simone réfléchit un instant, surpris par la question — personne ne la lui avait jamais posée en ces termes. Il répond avec quelque chose de concret, et dans les semaines qui suivent, ce détail devient un vrai point d'accroche.",
  },
  B: {
    ok: false,
    text: "Simone continue à tout bien exécuter, et à rester ailleurs — le fait qu'il n'y ait pas de problème visible ne veut pas dire qu'il n'est pas désintéressé : ça veut juste dire que le désintérêt ne se voit pas à l'œil nu.",
  },
};

export const casoReale11StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 11",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 11</div>
        <h1>L&apos;adolescent qui exécute sans être présent</h1>
        <p className="lede">
          Tranche d&apos;âge 14-18 ans. Compétences : communication adaptée à l&apos;âge (Chap. 2) · mise en phase
          (Chap. 4). Différent de celui qui exécute à contrecœur (Scénario 12) : ici il n&apos;y a pas de
          conflit, il y a de l&apos;absence — plus difficile à repérer parce qu&apos;il ne demande rien.
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
          <h1>Simone, 15 ans</h1>
          <p className="lede">
            Il exécute tout ce que tu demandes, correctement, sans une seule erreur — et sans aucun engagement
            visible. Il ne proteste jamais, ne pose pas de questions, ne regarde jamais l&apos;horloge de façon
            ostensible. Il semble simplement ailleurs.
          </p>
          <p className="prompt">
            Que fais-tu — avec un garçon qui ne demande rien, et ne semble pas avoir de problème visible ?
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
          Que retiens-tu, pour la prochaine fois qu&apos;un adolescent exécute tout sans erreur, sans sembler
          vraiment présent ?
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
      const esito = o === "A" ? "gérée du premier coup" : "non gérée — occasion manquée aujourd'hui";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;adolescent qui exécute sans être présent</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Communication adaptée à l&apos;âge (14-18)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Le désintérêt silencieux est plus difficile à voir que le refus ouvert : il n&apos;y a pas de moment
            précis où « il se passe quelque chose » et où tu comprends qu&apos;il faut intervenir. Le désintérêt,
            il faut le chercher, pas l&apos;attendre.
          </p>
        </>
      );
    },
  },
];
