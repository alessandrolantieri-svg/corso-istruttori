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

// Traduction française de esame-turno-2.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1
// beat1Outcome()/needsBeat2A()/beat2Version()/soggetto() du mockup esame-turno2.html : ici, à la
// différence de l'Épreuve 1, le Beat 1 est une seule bifurcation à trois issues (pas deux lectures
// séparées).
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "leonardo-rigido" | "recupero-riuscito" | "leonardo-fuori";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "leonardo-rigido";
  if (o === "D") return a.beat2a === "cambia" ? "recupero-riuscito" : "leonardo-fuori";
  return "pulita";
}
function soggetto(a: Record<string, string>): string {
  return beat2Version(a) === "leonardo-fuori" ? "Sofia" : "Leonardo";
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu reconnais que le plongeon n'est pas le problème, c'est de le faire en premier devant tout le monde — tu lui offres un rôle ou une porte de sortie qui n'est pas un abandon (« montre-moi comment tu le ferais, toi, différemment »)",
  },
  {
    value: "B",
    label: "Tu comprends que le problème est relationnel, mais tu insistes quand même pour qu'il essaie tout de suite, devant tout le monde (« allez, tu le fais, c'est tout, tout le monde regarde »)",
  },
  {
    value: "D",
    label: "Tu réexpliques la technique du plongeon, peut-être plus lentement (« regarde, c'est facile : tu plies les genoux... »)",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Tu reconnais ton erreur et tu changes d'approche — tu arrêtes d'expliquer la technique, tu t'approches, tu baisses la voix, tu lui offres une solution qui ne l'expose pas",
  },
  {
    value: "insisti",
    label: "Tu insistes sur la même lecture — tu répètes l'explication technique, peut-être avec plus de fermeté",
  },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Tu changes de canal — tu montres le plongeon lentement au bord, ou tu guides physiquement la position des bras",
  },
  { value: "parole", label: "Tu répètes encore avec des mots, même reformulés différemment" },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Leonardo est déstabilisé un instant, puis il décroise les bras. Il propose une petite variante à lui, pas exactement le plongeon prévu mais proche — et il la fait.",
  },
  B: {
    ok: false,
    text: "Leonardo le fait, mais les épaules raides et sans regarder personne — il obéit, il ne participe pas.",
  },
  D: {
    ok: false,
    text: "Leonardo ne demandait pas une explication technique — tu l'avais déjà compris au ton, mais l'explication arrive quand même. Il se referme encore plus : « j'ai dit non. » Un camarade à côté ricane.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Leonardo se prépare au bord, détendu, prêt à essayer sa variante.",
  "leonardo-rigido": "Leonardo est au bord, mais son corps est tendu : il essaie sans vraiment participer.",
  "recupero-riuscito": "Leonardo, après avoir regardé Sofia, s'approche de lui-même, un peu méfiant mais sincère.",
  "leonardo-fuori":
    "Leonardo reste assis en dehors du groupe. C'est au tour de Sofia, qui attendait de toute façon son tour — le beat se poursuit avec elle, avec un œil qui doit rester sur Leonardo, sans l'exclure totalement.",
};

export const esameTurno2StepsFr: Step[] = [
  // 0 — intro
  {
    day: "avant de commencer",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Examen final · Épreuve 2</div>
        <h1>La situation difficile</h1>
        <p className="lede">
          Tu es avec un groupe d&apos;ados de 11-13 ans. C&apos;est à <strong>Leonardo (12 ans)</strong> d&apos;essayer
          en premier un plongeon de départ — jamais fait avant, jamais devant le groupe. <strong>Sofia (11 ans)</strong>{" "}
          attend aussi son tour, un peu plus en retrait.
        </p>
        <div className="card warn">
          Ce n&apos;est pas un chapitre. Il n&apos;y a pas de bouton « question suivante ». Il n&apos;y a que ce qui
          se passe après ce que tu choisis.
        </div>
        <p className="lede">
          Comme dans l&apos;Épreuve 1 : l&apos;épreuve est divisée en <strong>beats</strong> — les moments
          d&apos;une même scène, l&apos;un après l&apos;autre — et la note va de 80 à 100, avec le{" "}
          <strong>100 avec félicitations</strong> réservé à qui sait aussi rattraper une erreur en temps réel.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Le refus</div>
          <h1>« Je ne le fais pas, c&apos;est stupide. »</h1>
          <p className="lede">
            Leonardo s&apos;arrête au bord, croise les bras. Il ne tremble pas, ne cherche pas ton regard, n&apos;a
            pas l&apos;air d&apos;avoir peur — il a l&apos;air d&apos;avoir décidé.
          </p>
          <p className="prompt">
            Il est plus probable que Leonardo n&apos;y arrive pas, ou qu&apos;il n&apos;en ait pas envie ? Et
            qu&apos;est-ce que tu fais — pas ce que tu lui réexpliques ?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — récupération",
    pct: 24,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · seulement parce que le diagnostic était faux</div>
        <h1>Un refus regardé par les autres</h1>
        <p className="lede">
          Leonardo reste immobile, bras croisés. Le ricanement d&apos;un camarade à côté n&apos;aide pas — ce
          n&apos;est plus seulement un refus, c&apos;est un refus regardé par les autres.
        </p>
        <p className="prompt">Tu as une deuxième bifurcation. Qu&apos;est-ce que tu fais maintenant ?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>Ce que tu fais vraiment, en pratique</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "cambia" && (
          <div className="feedback ok">
            Leonardo se détend, pas complètement — il reste un peu méfiant — mais il acquiesce. Il regarde Sofia
            essayer, puis, sans que personne le lui redemande, il s&apos;approche du bord.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Leonardo recule d&apos;un pas, s&apos;assoit au bord, en dehors du groupe de ceux qui attendent leur
            tour. Il ne répond plus.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la verifica che non si vede
  {
    day: "beat 2",
    pct: 38,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 2 · La vérification qu&apos;on ne voit pas</div>
          <h1>Le contexte avec lequel tu arrives</h1>
          <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
          <p className="lede">
            <strong>{chi} essaie le plongeon.</strong> Il entre par le ventre au lieu de la tête — les bras ne sont
            pas tendus vers l&apos;avant au moment de l&apos;entrée.
          </p>
          <p className="prompt">
            Comment vérifies-tu si la consigne précédente est bien passée — sans demander « tu as compris ? » — et
            qu&apos;est-ce que tu remarques ?
          </p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        </>
      );
    },
  },

  // 4 — beat3a, cambiare strada
  {
    day: "beat 3 — changer de cap",
    pct: 52,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 3 · Changer de cap</div>
          <h1>Même erreur, deuxième tentative</h1>
          <p className="lede">
            Tu essaies de corriger l&apos;entrée avec des mots : « garde les bras plus serrés et tendus quand tu
            entres. » Au deuxième essai, même erreur — par le ventre, bras pas tendus.
          </p>
          <p className="prompt">
            Le deuxième essai est identique au premier. Qu&apos;est-ce que tu fais maintenant — sans répéter les
            mêmes mots ?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {answers.canale === "cambia" && (
            <div className="feedback ok">
              Au troisième essai, l&apos;entrée est presque correcte — pas parfaite, mais les bras restent tendus,
              et l&apos;entrée se fait par la tête.
            </div>
          )}
          {answers.canale === "parole" && (
            <div className="feedback retry">
              Le troisième essai est identique au deuxième — {chi} commence à montrer des signes de fatigue de
              l&apos;attention, plus que de l&apos;erreur elle-même.
            </div>
          )}
          <p className="lede" style={{ marginTop: 14, fontSize: ".86rem" }}>
            ({chi} est la personne qui essaie le plongeon dans cette version de l&apos;épreuve.)
          </p>
        </>
      );
    },
  },

  // 5 — beat3b, il ritorno
  {
    day: "beat 3 — le retour",
    pct: 66,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q4,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 3 · Le retour</div>
        <h1>Quel que soit le résultat du troisième essai</h1>
        <p className="lede">
          Quel que soit le troisième essai — presque juste, ou encore pareil — tu dois donner un retour.
        </p>
        <p className="prompt">Écris le retour que tu donnes maintenant, précis sur le comportement, pas sur la personne.</p>
        <Field id="q4" value={answers.q4 ?? ""} onChange={(v) => setReflection("q4", v)} />
      </>
    ),
  },

  // 6 — chiusura
  {
    day: "clôture",
    pct: 82,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => (beat2Version(a) === "leonardo-fuori" ? !!a.qleonardo && !!a.qchiusura : !!a.qchiusura),
    render: ({ answers, setReflection }: StepContext) => {
      const isFuori = beat2Version(answers) === "leonardo-fuori";
      return (
        <>
          <div className="eyebrow">Clôture de l&apos;Épreuve 2</div>
          <h1>{isFuori ? "Avant d'avancer" : "Ce que tu retiens"}</h1>
          {isFuori && (
            <>
              <p className="prompt">
                Tu retournes vers Leonardo, assis au bord ? Qu&apos;est-ce que tu lui dis, ou ne lui dis pas, avant
                de clore ?
              </p>
              <Field id="qleonardo" value={answers.qleonardo ?? ""} onChange={(v) => setReflection("qleonardo", v)} />
              <p className="lede" style={{ marginTop: 10, fontSize: ".84rem" }}>
                Ça ne compte pas dans la note — mais le système enregistre si la porte reste ouverte pour la
                prochaine épreuve, ou si le refus reste sans un mot de plus.
              </p>
            </>
          )}
          <p className="prompt" style={{ marginTop: 18 }}>
            Dans toutes les versions : qu&apos;est-ce que tu retiens de cette épreuve, pour la suivante ?
          </p>
          <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        </>
      );
    },
  },

  // 7 — risultato
  {
    day: "résultat",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c9 =
        o === "A"
          ? "gérée du premier coup"
          : o === "B"
            ? "gérée en partie"
            : answers.beat2a === "cambia"
              ? "ratée, mais rattrapée"
              : "ratée, non rattrapée";
      const c8 = answers.canale === "cambia" ? "gérée du premier coup" : "à renforcer";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Épreuve 2 terminée</div>
          <div className="eyebrow">Comment lire le résultat</div>
          <h1>La situation difficile</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C9 · Situations difficiles</span>
              <span className="esito">{c9}</span>
            </div>
            <div className="result-row">
              <span className="comp">C6 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Vérifier par l&apos;action</span>
              <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C8 · Changer de cap</span>
              <span className="esito">{c8}</span>
            </div>
            <div className="result-row">
              <span className="comp">C7 · Le retour</span>
              <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "cambia" && (
            <div className="card quote">
              Comprendre en temps réel que tu as mal lu la situation, et changer de cap devant le groupe sans faire
              marche arrière de façon maladroite : voilà un excellent rattrapage, fait sous les yeux de tout le
              monde. Et c&apos;est exactement le genre de preuve qu&apos;il faut pour le 100 avec félicitations.
            </div>
          )}
          <p className="lede">
            L&apos;épreuve se poursuit dans tous les cas — cohérent avec « on ne peut pas échouer, seulement
            remettre à plus tard ». La prochaine épreuve t&apos;attend :{" "}
            <strong>Épreuve 3 — Les adolescents, et ceux qui savent déjà faire seuls.</strong>
          </p>
        </>
      );
    },
  },
];
