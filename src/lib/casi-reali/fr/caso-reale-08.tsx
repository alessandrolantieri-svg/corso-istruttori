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

// French translation of caso-reale-08.tsx — same chapterId/response keys/internal values as the
// Italian original: only the visible text changes.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}
function recuperato(a: Record<string, string>): boolean {
  return a.rec === "nomini";
}
function needsScelta2(a: Record<string, string>): boolean {
  return situOutcome(a) === "A" || (situOutcome(a) === "B" && recuperato(a));
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu reconnais la frustration (ni refus, ni fatigue physique) et tu la nommes calmement avant de revenir à la technique (« c'est frustrant, je le vois. On réessaie un petit truc, pas tout d'un coup »)",
  },
  { value: "B", label: "Tu vas directement à la correction technique, sans reconnaître ce qu'il ressent" },
];
const REC_OPTIONS: Option[] = [
  { value: "nomini", label: "Tu reviens en arrière et tu nommes ce que tu vois, avant de revenir à la technique" },
  {
    value: "tecnica",
    label: "Tu insistes seulement sur la technique, en espérant qu'un essai réussi résolve la frustration",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Davide lève les yeux, surpris d'avoir été remarqué avant d'être corrigé. Il hoche la tête, et réessaie avec moins de tension dans les épaules.",
  },
  B: {
    ok: false,
    text: "Davide recommence, mécaniquement, sans chercher à se corriger. Personne n'a dit à voix haute ce qu'il ressent, et cette frustration commence à ressembler à de la résignation.",
  },
};

const REC_FEEDBACK: Record<"nomini" | "tecnica", { ok: boolean; text: string }> = {
  nomini: {
    ok: true,
    text: "Davide se détend un peu : « ...c'est que je n'y arrive jamais. » Maintenant que c'est dit, tu peux travailler dessus.",
  },
  tecnica: {
    ok: false,
    text: "Davide continue d'exécuter sans réel engagement — la frustration non abordée s'est transformée en désintérêt.",
  },
};

export const casoReale08StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 08",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 08</div>
        <h1>Le garçon qui se trompe et se referme</h1>
        <p className="lede">
          Tranche d&apos;âge 11-13 ans. Compétences : observer et interpréter (Chap. 3) · le retour (Chap. 7) —
          recadrage de l&apos;erreur.
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
    pct: 16,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Davide, 12 ans</h1>
          <p className="lede">
            Au quatrième essai consécutif d&apos;un virage, il se trompe encore. Il ne proteste pas, il ne refuse
            pas — il frappe une main sur l&apos;eau et détourne le regard, les épaules voûtées.
          </p>
          <p className="prompt">Que fais-tu — qu&apos;est-ce que tu remarques d&apos;abord, et que fais-tu en premier ?</p>
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
    pct: 34,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "nomini" | "tecnica" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Rattrapage · seulement parce que ça n&apos;a pas fonctionné</div>
          <h1>Davide exécute mécaniquement</h1>
          <p className="lede">Sans plus essayer de se corriger.</p>
          <p className="prompt">Que fais-tu maintenant ?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — scelta2, il ritorno dopo il tentativo riuscito, solo se needsScelta2
  {
    day: "choix 2 — le retour",
    pct: 55,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    visible: (a) => needsScelta2(a),
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Choix 2 · Le retour, après l&apos;essai réussi</div>
        <h1>Davide réessaie</h1>
        <p className="lede">Et cette fois le virage est presque correct.</p>
        <p className="prompt">Écris le retour que tu lui donnes — précis, pas un « bravo » générique.</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — chiusura
  {
    day: "clôture",
    pct: 80,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture</div>
        <h1>Ce que tu retiens</h1>
        <p className="prompt">
          Que retiens-tu, pour la prochaine fois qu&apos;un garçon de 11-13 ans ne proteste pas mais arrête
          d&apos;essayer de se corriger ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Réflexion libre, non notée.
        </p>
      </>
    ),
  },

  // 5 — come si legge
  {
    day: "comment lire ce scénario",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "gérée du premier coup" : recuperato(answers) ? "ratée, mais rattrapée" : "ratée, non rattrapée";
      const showScelta2 = needsScelta2(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>Le garçon qui se trompe et se referme</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observer et interpréter (Chap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
            {showScelta2 && (
              <div className="result-row">
                <span className="comp">Le retour (Chap. 7)</span>
                <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
              </div>
            )}
          </div>
          <p className="lede">
            À 11-13 ans, la frustration se dit rarement avec des mots : elle se voit dans le geste (la main sur
            l&apos;eau, le regard ailleurs) avant de s&apos;entendre dans la voix. L&apos;instructeur doit la
            remarquer avant de corriger l&apos;erreur.
          </p>
        </>
      );
    },
  },
];
