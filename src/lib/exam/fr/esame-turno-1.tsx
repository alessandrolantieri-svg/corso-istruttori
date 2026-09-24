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

// Traduction française de esame-turno-1.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1 beat1Outcome()/beat2Version() du
// mockup esame-turno1.html : Aurora et Diego sont deux lectures indépendantes, évaluées
// séparément — quatre issues, pas deux.
type Beat1Outcome = "A" | "B" | "C" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  const aurora = a.aurora,
    diego = a.diego;
  if (!aurora || !diego) return null;
  if (aurora === "giusta" && diego === "giusta") return "A";
  if (aurora === "giusta" && diego === "sbagliata") return "B";
  if (aurora === "sbagliata" && diego === "giusta") return "C";
  return "D";
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "diego-agitato" | "aurora-ferma" | "recupero-riuscito" | "mai-recuperato";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "diego-agitato";
  if (o === "C") return "aurora-ferma";
  if (o === "D") return a.beat2a === "separi" ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}

const AURORA_OPTIONS: Option[] = [
  { value: "giusta", label: "Tu t'approches, tu te mets à son niveau, tu tends la main sans lui dire « entre »" },
  {
    value: "sbagliata",
    label: "Tu utilises une rassurance générique ou tu essaies de la faire entrer directement (« allez, il ne s'est rien passé, viens »)",
  },
];
const DIEGO_OPTIONS: Option[] = [
  { value: "giusta", label: "Tu lui donnes une tâche qui utilise son énergie (« apporte-moi les planches, cours ! »)" },
  {
    value: "sbagliata",
    label: "Tu te contentes de le rappeler à l'ordre (« Diego, arrête ! ») sans lui donner un endroit où mettre cette énergie",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "separi",
    label: "Tu sépares les deux problèmes — tu donnes à Diego et Elisa une tâche rapide et distincte, et tu ne reviens vers Aurora, calmement, qu'ensuite",
  },
  {
    value: "insisti",
    label: "Tu insistes sur la même chose qui n'a déjà pas marché — tu rappelles de nouveau tout le monde à voix haute, ou tu répètes la même rassurance générique",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Sentant que tu es proche et sans être pressée, Aurora avance le pied plus profondément. Diego, avec quelque chose à faire, canalise sa décharge d'énergie et retourne en courant vers le groupe, content.",
  },
  B: {
    ok: false,
    text: "Aurora se détend et avance le pied. Diego s'arrête une seconde, mais recommence presque aussitôt à pousser — un simple rappel à l'ordre ne lui a rien donné à faire de cette énergie.",
  },
  C: {
    ok: false,
    text: "Diego s'éloigne content avec sa tâche. Aurora reste immobile — la rassurance ne l'a pas atteinte : sa cause était la peur, pas l'hésitation, et pour la peur, la convaincre avec des mots ne suffit pas.",
  },
  D: {
    ok: false,
    text: "Aurora ne bouge pas — la rassurance générique ne l'a pas atteinte. Diego, rappelé à voix haute, s'arrête une seconde mais repart presque aussitôt : il n'avait pas besoin d'un ordre, il avait besoin de décharger son énergie quelque part.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Le groupe est calme. Toute ton attention est libre pour Marco.",
  "diego-agitato": "Diego continue de s'agiter en marge du groupe pendant que tu essaies de suivre Marco : tu dois garder un œil sur lui.",
  "aurora-ferma": "Aurora est restée au bord, elle n'est pas repartie dans l'eau : tu dois garder un œil sur elle pendant que tu travailles avec Marco.",
  "recupero-riuscito": "Le groupe s'est reformé, mais quelques minutes plus tard que prévu : Marco a attendu, un peu distrait par ce qui s'est passé avant.",
  "mai-recuperato": "Le groupe arrive encore agité : Diego continue de perturber en marge pendant que tu essaies de travailler avec Marco.",
};

export const esameTurno1StepsFr: Step[] = [
  // 0 — intro
  {
    day: "avant de commencer",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Examen final · Épreuve 1</div>
        <h1>Le groupe des petits</h1>
        <p className="lede">
          Tu as devant toi un groupe de quatre enfants : <strong>Aurora (4 ans)</strong>, <strong>Elisa (6 ans)</strong>,{" "}
          <strong>Marco (7 ans)</strong> et <strong>Diego (9 ans)</strong>. C&apos;est la séance du mercredi : quinze
          minutes d&apos;échauffement, puis l&apos;exercice de la semaine.
        </p>
        <div className="card warn">
          Ce n&apos;est pas un chapitre. Il n&apos;y a pas de bouton « question suivante ». Il n&apos;y a que ce qui
          se passe après ce que tu choisis.
        </div>
        <p className="lede">
          L&apos;épreuve est divisée en <strong>beats</strong> — les moments d&apos;une même scène, l&apos;un après
          l&apos;autre : ce que tu choisis dans un beat change le beat qui suit. Ce ne sont pas des questions
          séparées, c&apos;est une scène unique qui avance avec toi.
        </p>
        <p className="lede">
          La note va de 80 à 100. Le <strong>100 avec félicitations</strong> est le niveau le plus élevé : il ne
          suffit pas de bien répondre, il faut aussi savoir rattraper une erreur en temps réel, devant le groupe —
          si ça t&apos;arrive, c&apos;est une occasion, pas un problème.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 14,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.aurora && !!a.diego,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Deux choses à la fois</div>
          <h1>Aurora et Diego, au même moment</h1>
          <p className="lede">
            Tu viens d&apos;arriver au bord du bassin. <strong>Aurora</strong> est immobile, le pied dans l&apos;eau
            jusqu&apos;à la cheville, sans bouger — les épaules relevées, crispées, les yeux fixés sur l&apos;eau. Au
            même moment, <strong>Diego</strong> commence à pousser Marco pour rire, en riant fort, et n&apos;arrive
            pas à rester tranquille.
          </p>
          <p className="prompt">Tu as un instant. Par qui tu commences, et qu&apos;est-ce que tu fais en premier ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <p className="lede">
            Aurora et Diego sont deux situations indépendantes — elles sont évaluées séparément, pas comme un bloc
            unique.
          </p>
          <p className="prompt">Avec Aurora :</p>
          <OptionGroup name="aurora" options={AURORA_OPTIONS} selected={answers.aurora} onPick={(v) => setResponse("aurora", v)} />
          <p className="prompt">Avec Diego :</p>
          <OptionGroup name="diego" options={DIEGO_OPTIONS} selected={answers.diego} onPick={(v) => setResponse("diego", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — récupération",
    pct: 28,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · seulement parce qu&apos;aucune des deux lectures n&apos;était la bonne</div>
        <h1>Le groupe commence à se désunir</h1>
        <p className="lede">
          Aurora est toujours immobile. Diego, pendant ce temps, a recommencé à pousser — cette fois Elisa, qui
          s&apos;éloigne agacée. Le groupe commence à se désunir.
        </p>
        <p className="prompt">Tu as une deuxième bifurcation. Qu&apos;est-ce que tu fais maintenant ?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>Ce que tu fais vraiment, en pratique</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "separi" && (
          <div className="feedback ok">
            Diego s&apos;éloigne content avec une tâche à faire. Elisa, écoutée un instant à part, se calme. Aurora,
            n&apos;étant plus entourée par le tumulte, avance enfin le pied plus profondément.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Elisa s&apos;éloigne encore plus, maintenant boudeuse aussi. Diego, sans tâche à faire, recommence à
            pousser. Aurora, entendant la voix qui s&apos;élève dans le groupe, se raidit davantage au lieu de se
            détendre.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la consegna a Marco
  {
    day: "beat 2",
    pct: 45,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2 · La consigne pour Marco</div>
        <h1>Le contexte avec lequel tu arrives</h1>
        <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
        <p className="lede">
          <strong>C&apos;est maintenant au tour de Marco, 7 ans.</strong> Il doit apprendre l&apos;entrée dans
          l&apos;eau en deux temps — les bras, puis les jambes — un exercice nouveau pour lui.
        </p>
        <p className="prompt">
          Écris la consigne que tu lui donnerais, formulée de façon positive, adaptée à sa tranche d&apos;âge (6-10
          ans : peut suivre deux étapes d&apos;affilée).
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — beat3, la verifica che non si vede
  {
    day: "beat 3",
    pct: 62,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3,
    render: ({ answers, setReflection }: StepContext) => {
      const v = beat2Version(answers);
      const noise =
        v === "diego-agitato" || v === "mai-recuperato" ? (
          <div className="card">
            Juste à ce moment-là, Diego, en marge, rit fort pour une raison ou une autre — Marco a peut-être
            hésité à cause de la difficulté technique, ou parce qu&apos;il s&apos;est laissé distraire en se tournant
            vers ce rire. Lire les quatre causes du Chapitre 3 est ici vraiment plus difficile, pas seulement plus
            stressant : un élément de plus à écarter avant d&apos;arriver à la vraie cause.
          </div>
        ) : v === "aurora-ferma" ? (
          <div className="card">
            Ton attention est partagée entre Marco et Aurora — le risque n&apos;est pas un bruit qui brouille la
            lecture, mais le temps : à quelle vitesse tu remarques l&apos;hésitation de Marco pendant qu&apos;un œil
            reste sur elle.
          </div>
        ) : (
          <div className="card">Le moment est clair, aucun bruit autour — seulement Marco et son hésitation.</div>
        );
      return (
        <>
          <div className="eyebrow">Beat 3 · La vérification qu&apos;on ne voit pas</div>
          <h1>L&apos;hésitation de Marco</h1>
          <p className="lede">
            Marco l&apos;exécute. Ça semble correct — mais il s&apos;arrête un instant juste avant la deuxième étape,
            avec une expression que tu n&apos;arrives pas bien à lire.
          </p>
          {noise}
          <p className="prompt">
            Laquelle des quatre causes du Chapitre 3 te semble la plus probable, et qu&apos;est-ce que tu fais — pas
            ce que tu lui demandes avec des mots, ce que tu fais — pour le découvrir ?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "clôture",
    pct: 80,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture de l&apos;Épreuve 1</div>
        <h1>Ce que tu retiens</h1>
        <p className="lede">
          L&apos;épreuve se termine. Le groupe sort de l&apos;eau, Aurora souriante, Marco encore un peu incertain
          sur le dernier exercice.
        </p>
        <p className="prompt">
          Une dernière question, avant de passer à l&apos;Épreuve 2 : qu&apos;est-ce que tu retiens de cette
          épreuve, pour la suivante ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Cette réflexion ne compte pas dans la note : c&apos;est la même que tu as faite pendant dix semaines, la
          dernière fois avant le résultat.
        </p>
      </>
    ),
  },

  // 6 — risultato
  {
    day: "résultat",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c4 =
        o === "A"
          ? "gérée du premier coup"
          : o === "B" || o === "C"
            ? "gérée en partie"
            : answers.beat2a === "separi"
              ? "ratée, mais rattrapée"
              : "ratée, non rattrapée";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Épreuve 1 terminée</div>
          <div className="eyebrow">Comment lire le résultat</div>
          <h1>Le groupe des petits</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C4 · Mise en phase</span>
              <span className="esito">{c4}</span>
            </div>
            <div className="result-row">
              <span className="comp">C2 · Reconnaissance de l&apos;élève</span>
              <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Consigne formulée en positif</span>
              <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C3 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Observer et interpréter</span>
              <span className="esito">enregistré <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "separi" && (
            <div className="card quote">
              Une erreur bien rattrapée n&apos;équivaut pas à ne jamais s&apos;être trompé — mais ce n&apos;est pas
              non plus un simple rattrapage. Ça montre que tu sais bien t&apos;adapter sous pression : le chemin vers
              la note maximale ne passe pas seulement par une épreuve parfaite du début à la fin.
            </div>
          )}
          <p className="lede">
            L&apos;épreuve se poursuit dans tous les cas, quel que soit le chemin que tu as pris — cohérent avec « on
            ne peut pas échouer, seulement remettre à plus tard ». La prochaine épreuve t&apos;attend :{" "}
            <strong>Épreuve 2 — La situation difficile.</strong>
          </p>
        </>
      );
    },
  },
];
