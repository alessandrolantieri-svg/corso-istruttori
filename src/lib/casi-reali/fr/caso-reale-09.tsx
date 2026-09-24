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

// French translation of caso-reale-09.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
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
      "Tu changes de canal quand même, même si avec elle jusqu'ici « dire » avait toujours fonctionné, parce que ce que tu utilises ne fonctionne pas",
  },
  { value: "B", label: "Tu insistes avec les mots, parce que jusqu'ici ça avait toujours suffi avec elle, en reformulant encore" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Tu changes enfin de canal (démonstration, ou contact physique guidé)" },
  { value: "parole", label: "Tu insistes encore avec les mots, peut-être plus lentement" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Tu lui montres le mouvement lentement dans l'eau, devant elle. À l'essai suivant, quelque chose se débloque. Ce n'est pas que parler ne fonctionne plus avec elle en général : c'est juste que ce détail précis avait besoin d'être expliqué autrement.",
  },
  B: {
    ok: false,
    text: "Camilla se trompe une troisième fois, de la même manière. Le fait que « dire » fonctionne d'habitude avec elle ne veut pas dire que ça fonctionne toujours, sur chaque détail.",
  },
};

const REC_FEEDBACK: Record<"cambia" | "parole", { ok: boolean; text: string }> = {
  cambia: {
    ok: true,
    text: "L'essai suivant s'améliore. Rien ne garantissait que le bon canal serait différent de celui de toujours. C'est pour ça que le répertoire sert aussi avec ceux qui répondent d'habitude bien à une seule méthode.",
  },
  parole: {
    ok: false,
    text: "Camilla continue à se tromper, et commence à sembler plus lasse de l'attention que de l'erreur elle-même.",
  },
};

export const casoReale09StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 09",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 09</div>
        <h1>La fille qui répète la même erreur</h1>
        <p className="lede">
          Tranche d&apos;âge 11-13 ans. Compétence : changer de cap (Chap. 8) — répertoire, avec une fille
          chez qui « dire » avait toujours suffi jusqu&apos;ici.
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
          <h1>Camilla, 13 ans</h1>
          <p className="lede">
            Avec elle, les explications orales ont toujours fonctionné jusqu&apos;ici. Mais sur un détail du
            mouvement de bras de la brasse, après deux explications verbales détaillées, elle continue à se
            tromper exactement de la même manière.
          </p>
          <p className="prompt">Que fais-tu — sachant que jusqu&apos;ici les explications orales avaient suffi ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "rattrapage",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "cambia" | "parole" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Rattrapage · seulement parce que ça n&apos;a pas fonctionné</div>
          <h1>Trois essais identiques</h1>
          <p className="lede">Tous avec la même explication verbale.</p>
          <p className="prompt">Que fais-tu maintenant ?</p>
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
          Que retiens-tu, pour la prochaine fois qu&apos;un canal qui avait toujours fonctionné jusqu&apos;ici
          cesse de fonctionner sur un détail précis ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Réflexion libre, non notée.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "comment lire ce scénario",
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
          <h1>La fille qui répète la même erreur</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Changer de cap (Chap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Le Chapitre 8 le dit explicitement : un canal qui a fonctionné avec un enfant sur un exercice ne
            ferme pas le répertoire : il a servi pour ce moment-là, ça ne veut pas dire qu&apos;il fonctionnera
            toujours avec lui.
          </p>
        </>
      );
    },
  },
];
