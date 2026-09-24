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

// French translation of caso-reale-10.tsx — same chapterId/response keys/internal values as the
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
      "Tu lui donnes un retour précis et concret sur le geste technique, sans discuter sa phrase (« tu as poussé fort avec les jambes et allongé les bras — c'est exactement ça qui a fait que ça a marché »)",
  },
  { value: "B", label: "Tu essaies de la convaincre avec des mots que ce n'était pas un hasard, de façon générique (« mais non, tu es douée, allez »)" },
];
const REC_OPTIONS: Option[] = [
  { value: "specifico", label: "Tu reviens en arrière avec un retour précis au lieu de rassurances génériques" },
  { value: "generico", label: "Tu insistes avec des rassurances génériques" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Ginevra t'écoute, un peu surprise : tu ne lui as pas dit qu'elle avait tort, tu lui as donné une raison technique précise — et cette raison prouve que ce n'était pas un hasard. À l'essai suivant, elle réessaie avec plus d'attention.",
  },
  B: {
    ok: false,
    text: "Ginevra hausse les épaules, pas convaincue — un compliment générique ne suffit pas à défaire une conviction bien ancrée, surtout à cet âge, devant le groupe.",
  },
};

const REC_FEEDBACK: Record<"specifico" | "generico", { ok: boolean; text: string }> = {
  specifico: {
    ok: true,
    text: "Cette fois, le détail technique précis arrive — et, contrairement à un « tu es douée », c'est quelque chose que Ginevra peut vérifier elle-même à l'essai suivant.",
  },
  generico: {
    ok: false,
    text: "Ginevra ne change pas d'avis — le manque de confiance reste intact, parce que rien de ce que tu as dit ne lui a donné une raison concrète de penser autrement.",
  },
};

export const casoReale10StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 10",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 10</div>
        <h1>La fille qui ne croit pas à son résultat</h1>
        <p className="lede">
          Tranche d&apos;âge 11-13 ans. Compétences : le retour (Chap. 7) · mise en phase (Chap. 4). Différent de «
          elle a peur » (Scénario 03) : ici il n&apos;y a pas de danger perçu, il y a un manque de confiance
          chronique en ses propres capacités.
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
          <h1>Ginevra, 11 ans</h1>
          <p className="lede">
            Elle vient d&apos;exécuter un plongeon de départ techniquement correct — le premier réussi, après des
            semaines. Au lieu d&apos;être contente, elle dit, en regardant ailleurs : « de toute façon c&apos;est
            un hasard, d&apos;habitude je le rate. »
          </p>
          <p className="prompt">Que réponds-tu ?</p>
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
      const rec = answers.rec as "specifico" | "generico" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Rattrapage · seulement parce que ça n&apos;a pas fonctionné</div>
          <h1>Ginevra reste sceptique</h1>
          <p className="lede">Prête à balayer aussi le prochain essai comme un simple hasard.</p>
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
          Que retiens-tu, pour la prochaine fois qu&apos;un élève balaie sa propre réussite comme un simple
          hasard ?
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
      const esito = o === "A" ? "gérée du premier coup" : answers.rec === "specifico" ? "ratée, mais rattrapée" : "ratée, non rattrapée";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>La fille qui ne croit pas à son résultat</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Le retour (Chap. 7)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Contre le manque de confiance, « tu es douée » ne suffit pas — « tu as fait ça, et c&apos;est pour ça
            que ça a marché » oui. C&apos;est le même principe que le Chapitre 7 — un compliment précis, on s&apos;en
            souvient, un compliment vague, on l&apos;oublie — appliqué à qui ne croit pas en lui.
          </p>
        </>
      );
    },
  },
];
