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

// Traduction française de caso-reale-01.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1
// situOutcome()/needsRecupero()/recuperato()/scelta2Version()/needsScelta3() du mockup
// caso-reale-01.html.
type SituOutcome = "A" | "B" | "D" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "D";
}
function recuperato(a: Record<string, string>): boolean {
  return a.scelta1b === "verifica";
}
type Scelta2Version = "pulita" | "errore-successo" | "recupero-riuscito" | "mai-recuperato";
function scelta2Version(a: Record<string, string>): Scelta2Version {
  const o = situOutcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "errore-successo";
  if (o === "D") return recuperato(a) ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}
function needsScelta3(a: Record<string, string>): boolean {
  const v = scelta2Version(a);
  return v === "errore-successo" || v === "mai-recuperato";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu ne répètes pas toute l'explication depuis le début, mais tu vérifies avec une question brève et concrète ce qu'il a retenu (« dis-moi : où je tourne la tête pour respirer ? ») au lieu de « tu as compris ? »",
  },
  { value: "B", label: "Tu proposes l'exercice en pensant que « de toute façon il l'a déjà fait d'autres fois »" },
  {
    value: "D",
    label: "Tu penses qu'il n'a pas envie de faire l'exercice, ou qu'il a oublié une chose qu'il savait (« allez, tu sais le faire, applique-toi »)",
  },
];
const SCELTA1B_OPTIONS: Option[] = [
  {
    value: "verifica",
    label: "Tu t'arrêtes, tu baisses le ton, tu lui demandes ce qu'il a vu ou entendu avant (« quand les nouveaux sont arrivés — tu as eu le temps de tout entendre ? »)",
  },
  { value: "insiste", label: "Tu insistes sur la mauvaise lecture — tu répètes qu'il doit s'appliquer davantage, peut-être avec un ton plus ferme" },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Tu changes de canal — une démonstration lente au bord, ou un contact physique guidé (la tête accompagnée dans le bon mouvement)",
  },
  { value: "parole", label: "Tu répètes encore avec des mots" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Tommaso se retourne de nouveau vers toi. Il répond, un peu incertain mais dans la bonne direction : « ...sur le côté ? » Tu as récupéré l'information dont tu avais besoin — il connaît la partie générale, il lui manque le détail qui lui a échappé à cause du bruit.",
  },
  B: {
    ok: false,
    text: "Tommaso essaie, mais se trompe justement sur le détail de la dernière partie qu'il n'avait pas entendue — il tourne la tête trop tard par rapport au bras, une erreur qu'il ne faisait plus depuis des semaines.",
  },
  D: {
    ok: false,
    text: "Tommaso pense avoir été réprimandé pour paresse, mais ce n'est pas sa faute : il n'avait tout simplement pas entendu. Il se referme un peu, exécute l'exercice de façon mécanique, sans essayer de se corriger quand il se trompe.",
  },
};

const SCELTA2_VERSION_TEXT: Record<Scelta2Version, string> = {
  pulita: "Tommaso a bien répondu à la question de vérification, il essaie l'exercice avec la bonne information.",
  "errore-successo": "Tommaso s'est trompé sur le détail qui lui avait échappé, mais sans aucune réprimande entre-temps.",
  "recupero-riuscito": "Tommaso sait avoir été mal compris puis compris : il essaie de nouveau, un peu plus confiant.",
  "mai-recuperato": "Tommaso a arrêté d'essayer de se corriger tout seul, il exécute de façon mécanique.",
};

export const casoReale01StepsFr: Step[] = [
  // 0 — intro
  {
    day: "cas réel 01",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Cas Réels · Scénario 01</div>
        <h1>L&apos;enfant qui se distrait</h1>
        <p className="lede">
          Tranche d&apos;âge 6-10 ans. Compétences abordées : observer et interpréter (Chap. 3) · mise en phase (Chap. 4) ·
          le retour (Chap. 7) · changer de cap (Chap. 8).
        </p>
        <div className="card">
          À la différence d&apos;un chapitre ou d&apos;une épreuve d&apos;examen, ce scénario est court et autonome —
          il n&apos;a pas de note d&apos;examen : c&apos;est du matériel que tu peux revoir quand tu veux.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situation",
    pct: 14,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situation</div>
          <h1>Tommaso, 8 ans</h1>
          <p className="lede">
            Troisième leçon de la semaine. Tu travailles la respiration latérale au bord du bassin, un exercice
            qu&apos;il a déjà fait d&apos;autres fois. À la moitié de l&apos;explication, Tommaso regarde vers la
            porte d&apos;entrée — un nouveau groupe est arrivé, ils font du bruit en posant leurs sacs. Quand il te
            regarde de nouveau, tu as l&apos;impression qu&apos;il n&apos;a pas entendu la dernière partie de ce que
            tu as dit.
          </p>
          <p className="prompt">Qu&apos;est-ce que tu fais — avant de le faire essayer l&apos;exercice ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — scelta1b, solo se esito D
  {
    day: "choix 1B — récupération",
    pct: 28,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.scelta1b,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Choix 1B · seulement parce que tu n&apos;as pas reconnu la cause</div>
        <h1>Quelque chose ne colle pas</h1>
        <p className="lede">
          Tommaso exécute l&apos;exercice mécaniquement, se trompant sur le même détail qu&apos;avant sans essayer
          de se corriger. Il n&apos;a pas l&apos;air désinvolte — il a l&apos;air un peu éteint, comme quelqu&apos;un
          qui s&apos;attend à une autre réprimande.
        </p>
        <p className="prompt">Tu remarques que quelque chose ne colle pas dans ta première lecture. Qu&apos;est-ce que tu fais maintenant ?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>Ce que tu fais vraiment, en pratique</h2>
        <OptionGroup name="scelta1b" options={SCELTA1B_OPTIONS} selected={answers.scelta1b} onPick={(v) => setResponse("scelta1b", v)} />
        {answers.scelta1b === "verifica" && (
          <div className="feedback ok">
            Tommaso s&apos;illumine un peu : « ...non, en fait non. » Ce n&apos;était pas de la désinvolture : il lui
            avait échappé un morceau, et la réprimande n&apos;a fait que le décourager davantage.
          </div>
        )}
        {answers.scelta1b === "insiste" && (
          <div className="feedback retry">
            Tommaso fait encore deux tentatives, toujours identiques, sans plus essayer de se corriger tout seul. Il
            a arrêté de chercher — pas parce qu&apos;il ne sait pas, mais parce qu&apos;il a compris que le problème,
            selon toi, c&apos;est lui et pas le détail qui lui a échappé.
          </div>
        )}
      </>
    ),
  },

  // 3 — scelta2, il ritorno
  {
    day: "choix 2 — le retour",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const v = scelta2Version(answers);
      const esito =
        v === "pulita" || v === "recupero-riuscito"
          ? "Tommaso essaie l'exercice, et le fait presque bien."
          : "Tommaso essaie l'exercice, et répète la même erreur sur le détail qui lui avait échappé.";
      return (
        <>
          <div className="eyebrow">Choix 2 · Le retour</div>
          <h1>Le contexte avec lequel tu arrives</h1>
          <div className="card">{SCELTA2_VERSION_TEXT[v]}</div>
          <p className="lede">{esito}</p>
          <p className="prompt">Écris le retour que tu lui donnes maintenant — précis sur le comportement, jamais sur la personne.</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v2) => setReflection("q2", v2)} />
        </>
      );
    },
  },

  // 4 — scelta3, cambiare strada, solo se serve
  {
    day: "choix 3 — changer de cap",
    pct: 65,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    visible: (a) => needsScelta3(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = answers.canale as "cambia" | "parole" | undefined;
      return (
        <>
          <div className="eyebrow">Choix 3 · Changer de cap</div>
          <h1>Même erreur, une troisième fois</h1>
          <p className="lede">
            Après le retour précis, Tommaso réessaie — même erreur une troisième fois. L&apos;explication avec des
            mots, même répétée avec précision, ne suffit plus.
          </p>
          <p className="prompt">Qu&apos;est-ce que tu fais maintenant — sans répéter encore les mêmes mots ?</p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {outcome === "cambia" && (
            <div className="feedback ok">
              À la tentative suivante, le mouvement est presque correct — pas parfait, mais la tête tourne au bon
              moment.
            </div>
          )}
          {outcome === "parole" && (
            <div className="feedback retry">
              Tommaso continue de se tromper sur le même détail. Ce n&apos;est plus un problème de distraction :
              c&apos;est devenu un problème de canal — et le canal « dire » a déjà montré, trois fois, qu&apos;il ne
              suffisait pas.
            </div>
          )}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "clôture",
    pct: 84,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture</div>
        <h1>Ce que tu retiens</h1>
        <p className="prompt">
          Dans toutes les versions : qu&apos;est-ce que tu retiens de ce scénario, la prochaine fois qu&apos;un
          élève semble distrait plutôt qu&apos;en difficulté ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Réflexion libre, elle ne compte dans aucune note : les Cas Réels ne sont pas un test, c&apos;est du
          matériel d&apos;entraînement que tu peux revoir à tout moment.
        </p>
      </>
    ),
  },

  // 6 — come si legge
  {
    day: "comment lire ça",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const oss =
        o === "A" ? "gérée du premier coup" : o === "B" ? "gérée en partie" : recuperato(answers) ? "ratée, mais rattrapée" : "ratée, non rattrapée";
      const showScelta3 = needsScelta3(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Scénario terminé</div>
          <div className="eyebrow">Comment lire ce scénario</div>
          <h1>L&apos;enfant qui se distrait</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observer et interpréter (Chap. 3)</span>
              <span className="esito">{oss}</span>
            </div>
            <div className="result-row">
              <span className="comp">Le retour (Chap. 7)</span>
              <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            {showScelta3 && (
              <div className="result-row">
                <span className="comp">Changer de cap (Chap. 8)</span>
                <span className="esito">{answers.canale === "cambia" ? "gérée" : "à renforcer"}</span>
              </div>
            )}
          </div>
          <p className="lede">
            Le premier choix a trois issues, pas deux : reconnaître la distraction et bien agir n&apos;est pas la
            même chose que la reconnaître et l&apos;ignorer. Une erreur de lecture ne clôt pas le scénario — elle
            ouvre une deuxième bifurcation, avec un vrai rattrapage possible.
          </p>
        </>
      );
    },
  },
];
