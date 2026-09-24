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

// Traduction française de caso-reale-02.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1 situOutcome()/needsRecupero() du
// mockup caso-reale-02.html.
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
      "Tu te places vraiment dans son champ visuel — pas seulement à côté de lui, mais entre lui et la distraction — en attendant que ses yeux croisent les tiens avant de parler",
  },
  { value: "B", label: "Tu répètes la même consigne plus fort, depuis ta position, sans intercepter son regard" },
];
const REC_OPTIONS: Option[] = [
  { value: "sposti", label: "Tu te déplaces physiquement dans son champ visuel et tu attends le contact visuel avant de parler" },
  { value: "voce", label: "Tu hausses encore la voix, en espérant que cette fois ça marche" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Nicolò te regarde. Tu donnes la consigne une fois, simple : « prends ma main, on entre ensemble. » Il la suit.",
  },
  B: {
    ok: false,
    text: "Nicolò continue de regarder son camarade. Ta voix est devenue une partie du bruit de fond — il n'a pas arrêté de t'écouter exprès, il ne t'a tout simplement pas encore vraiment entendu.",
  },
};

const REC_FEEDBACK: Record<"sposti" | "voce", { ok: boolean; text: string }> = {
  sposti: { ok: true, text: "Nicolò te remarque, un peu surpris de te trouver là. Cette fois, la consigne arrive." },
  voce: {
    ok: false,
    text: "Nicolò se retourne, mais effrayé par le ton plus qu'attiré par la consigne — il entre dans l'eau, mais en se retenant, sans te tendre la main comme demandé.",
  },
};

export const casoReale02StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 02",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 02</div>
        <h1>L&apos;enfant qui n&apos;écoute pas</h1>
        <p className="lede">Tranche d&apos;âge 3-5 ans. Compétences : mise en phase (Chap. 4) · consignes (Chap. 5).</p>
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
          <h1>Nicolò, 4 ans</h1>
          <p className="lede">
            C&apos;est son deuxième mois de cours. Tu es accroupi à son niveau, tu lui expliques que c&apos;est
            maintenant à lui d&apos;entrer dans l&apos;eau en te tenant la main. Il regarde ailleurs — un camarade
            qui joue avec une planche — et ne donne aucun signe de t&apos;avoir entendu.
          </p>
          <p className="prompt">Qu&apos;est-ce que tu fais, avant de répéter la consigne ?</p>
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
      const rec = answers.rec as "sposti" | "voce" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Récupération · seulement parce que ça n&apos;a pas marché</div>
          <h1>Nicolò regarde encore ailleurs</h1>
          <p className="lede">Tu as répété deux fois, sans résultat.</p>
          <p className="prompt">Qu&apos;est-ce que tu fais maintenant — autre chose que répéter encore ?</p>
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
          Qu&apos;est-ce que tu retiens de ce scénario, la prochaine fois qu&apos;un petit enfant semble ne pas
          t&apos;écouter ?
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
      const esito = o === "A" ? "gérée du premier coup" : answers.rec === "sposti" ? "ratée, mais rattrapée" : "ratée, non rattrapée";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui n&apos;écoute pas</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Mise en phase (Chap. 4)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            À 3-5 ans, « il n&apos;écoute pas » signifie presque toujours « il ne m&apos;a pas encore vu » — la voix
            n&apos;est pas le problème, c&apos;est le mauvais canal : sans le contact visuel d&apos;abord, le reste a
            du mal à passer.
          </p>
        </>
      );
    },
  },
];
