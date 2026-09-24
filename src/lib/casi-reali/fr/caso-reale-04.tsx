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

// Traduction française de caso-reale-04.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1 situOutcome()/needsRecupero() du
// mockup caso-reale-04.html.
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
      "Tu cherches la cause avant d'insister — tu t'approches, tu ralentis le rythme, tu lui demandes calmement s'il est fatigué ou s'il préfère un jeu plus simple",
  },
  { value: "B", label: "Tu insistes sur l'exercice prévu, peut-être avec un ton plus ferme ou en promettant une récompense" },
];
const REC_OPTIONS: Option[] = [
  {
    value: "abbassi",
    label: "Tu t'arrêtes, tu baisses tes exigences et tu lui offres quelque chose de beaucoup plus simple et ludique, sans plus jamais mentionner l'exercice d'avant",
  },
  { value: "insisti", label: "Tu continues d'insister sur l'exercice, en attendant que les pleurs passent tout seuls" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Samuele se détend un peu : « ...je suis fatigué. » Ce n'était pas un refus de l'eau, c'était un enfant de 4 ans à bout d'énergie — et à cet âge, le dire avec un « non » est normal.",
  },
  B: {
    ok: false,
    text: "Samuele se referme davantage, répète « non » avec plus de force, et commence à pleurer.",
  },
};

const REC_FEEDBACK: Record<"abbassi" | "insisti", { ok: boolean; text: string }> = {
  abbassi: {
    ok: true,
    text: "Samuele se calme, lentement. Il ne fera pas l'exercice prévu aujourd'hui — mais il revient être dans l'eau avec toi, et c'est déjà beaucoup.",
  },
  insisti: {
    ok: false,
    text: "Samuele reste renfermé pour le reste de la leçon — l'épisode ne s'est pas résolu, il s'est juste arrêté.",
  },
};

export const casoReale04StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 04",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 04</div>
        <h1>L&apos;enfant qui refuse la consigne</h1>
        <p className="lede">
          Tranche d&apos;âge 3-5 ans. Compétences : situations difficiles (Chap. 9) · mise en phase (Chap. 4). À cet âge,
          « il ne veut pas » est rarement un défi social — c&apos;est plus souvent une surcharge : trop de choses à
          la fois, peu de capacité à le dire avec des mots.
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Samuele, 4 ans</h1>
          <p className="lede">
            Au troisième exercice de la leçon, il croise les bras et dit, d&apos;une petite voix mais décidée : «
            non, je ne le fais pas. » Il n&apos;est pas en colère contre toi — il a juste l&apos;air épuisé.
          </p>
          <p className="prompt">
            Qu&apos;est-ce que tu fais — pas ce que tu lui dis pour le convaincre, mais ce que tu fais pour
            comprendre ce qu&apos;il y a sous ce « non » ?
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
      const rec = answers.rec as "abbassi" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Récupération · seulement parce que ça n&apos;a pas marché</div>
          <h1>Samuele pleure, assis au bord</h1>
          <p className="lede">Il ne répond plus aux demandes.</p>
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
          Qu&apos;est-ce que tu retiens, la prochaine fois qu&apos;un petit enfant dit « non » sans avoir l&apos;air
          en colère ?
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
      const esito = o === "A" ? "gérée du premier coup" : answers.rec === "abbassi" ? "ratée, mais rattrapée" : "ratée, non rattrapée";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui refuse la consigne</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situations difficiles (Chap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Tous les « non », à 3-5 ans, ne sont pas un problème relationnel à résoudre — parfois, c&apos;est juste une
            façon simple de dire une chose vraie : ça suffit comme ça, pour aujourd&apos;hui.
          </p>
        </>
      );
    },
  },
];
