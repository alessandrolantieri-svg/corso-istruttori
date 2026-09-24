import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
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

const K1: Option[] = [
  { value: "no", label: "Non — l'une étiquette la personne, l'autre décrit ce qui s'est passé", correct: true },
  { value: "si", label: "Oui — c'est juste une autre façon de dire la même chose", correct: false },
];
const K2: Option[] = [
  { value: "si", label: "Oui — ça veut dire qu'il n'a pas encore la bonne technique", correct: false },
  { value: "no", label: "Non — c'est une information sur quoi ajuster, pas une note sur l'enfant", correct: true },
];
const K3: Option[] = [
  { value: "no", label: "Non — un retour précis apprend quoi refaire, un compliment générique non", correct: true },
  { value: "si", label: "Oui — si ça le motive, tôt ou tard il comprendra seul ce qu'il a bien fait", correct: false },
];
const K4: Option[] = [
  { value: "si", label: "Oui — un compliment vague est plus facile à retenir et à reproduire", correct: false },
  { value: "no", label: "Non — c'est l'inverse : c'est le précis qu'on peut reproduire", correct: true },
];
const K5: Option[] = [
  { value: "entrambe", label: "Nommer les deux choses, de façon précise", correct: true },
  { value: "uno", label: "Choisir seulement la louange, ou seulement la correction", correct: false },
];
const K6: Option[] = [
  { value: "no", label: "Non — à cet âge le ton compte autant que le contenu", correct: true },
  { value: "si", label: "Oui, l'enthousiasme fonctionne à tout âge", correct: false },
];

const M1: Option[] = [
  { value: "si", label: "Oui — d'abord les mots, puis le geste, puis le contact", correct: false },
  { value: "no", label: "Non — ça dépend de l'enfant, il n'y a pas d'ordre valable pour tous", correct: true },
];
const M2: Option[] = [
  { value: "no", label: "Non — ça veut juste dire que ce n'était pas encore la bonne clé", correct: true },
  { value: "si", label: "Oui — si une façon simple ne fonctionne pas, le problème vient de l'enfant", correct: false },
];
const M3: Option[] = [
  { value: "no", label: "Non — c'est le moment de s'arrêter et de regarder ce qu'il y a d'autre (Chapitre 3)", correct: true },
  { value: "si", label: "Oui, il faut insister sur la communication", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "parole", label: "Tu réessaies avec une explication verbale, reformulée différemment" },
  { value: "canale", label: "Tu lui montres le mouvement, ou tu la guides par un contact physique" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "stesso", label: "Tu insistes sur le même canal — avec elle ça marche toujours comme ça" },
  { value: "diverso", label: "Tu essaies un canal encore différent, comme un problème nouveau" },
];

const T1: Option[] = [
  { value: "lento", label: "Le répéter plus lentement, en détachant mieux les mots", correct: false },
  { value: "diverso", label: "En utiliser tout de suite un différent", correct: true },
];
const T2: Option[] = [
  { value: "tre", label: "Trois façons différentes", correct: true },
  { value: "uno", label: "Une seule façon, bien préparée à l'avance", correct: false },
];
const T3: Option[] = [
  { value: "si", label: "Oui — si les mots ne suffisent pas, le problème c'est qu'il n'y arrive pas", correct: false },
  { value: "no", label: "Non — ce n'était pas encore la bonne clé, pas une limite de l'enfant", correct: true },
];
const T4: Option[] = [
  { value: "no", label: "Non — ça dépend de chaque enfant, il n'y a pas un ordre identique pour tous", correct: true },
  { value: "si", label: "Oui — d'abord les mots, puis le geste, enfin le contact", correct: false },
];
const T5: Option[] = [
  { value: "si", label: "Oui — deux façons différentes de dire la même chose", correct: false },
  { value: "no", label: "Non — l'une étiquette la personne, l'autre décrit le comportement", correct: true },
];
const T6: Option[] = [
  { value: "no", label: "Non — ça a servi pour ce mouvement à ce moment-là : les deux autres restent dans le répertoire", correct: true },
  { value: "si", label: "Oui — une fois son canal trouvé, son répertoire est réglé", correct: false },
];
const T7: Option[] = [
  { value: "si", label: "Oui, il faut insister jusqu'à trouver le bon", correct: false },
  { value: "no", label: "Non — c'est le moment de s'arrêter et de regarder ce qu'il y a d'autre", correct: true },
];
const T8: Option[] = [
  { value: "no", label: "Non — à cet âge il faut l'adapter en quelque chose de respectueux, en gardant le même principe", correct: true },
  { value: "si", label: "Oui, le canal compte plus que la forme dans laquelle tu l'utilises", correct: false },
];
const T9: Option[] = [
  { value: "si", label: "Oui, une fois trouvé pour un enfant il reste le bon", correct: false },
  { value: "no", label: "Non — chaque nouvel exercice peut demander un canal différent", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo8StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 8 · CHANGER DE CAP</div>
        <h1>Ça n&apos;a pas marché. Et maintenant ?</h1>
        <p className="lede">
          Quand une façon d&apos;expliquer ne marche pas, l&apos;instructeur en essaie tout de suite
          une autre — au lieu de répéter la même chose plus fort ou plus lentement.
        </p>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 7
  {
    day: "lundi · 10 min",
    pct: 12,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé au bassin ?</h1>
        <p className="lede">
          La semaine dernière : chaque retour devait nommer un comportement, jamais la personne.
          Ça a été facile, ou tu t&apos;es surpris à revenir à tes vieilles habitudes ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 7 revient</h2>
        <p className="prompt">1. « Tu es distrait » et « tu regardais par la fenêtre » disent-ils la même chose ?</p>
        <OptionGroup name="k1" options={K1} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Un enfant a bu la tasse pendant l&apos;exercice : est-ce un échec ?</p>
        <OptionGroup name="k2" options={K2} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. « Bravo » apprend-il quoi refaire ?</p>
        <OptionGroup name="k3" options={K3} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Un compliment vague se répète-t-il plus facilement qu&apos;un compliment précis ?</p>
        <OptionGroup name="k4" options={K4} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Un essai améliore un détail mais en perd un autre. Le bon retour est :
        </p>
        <OptionGroup name="k5" options={K5} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Avec un adolescent, un compliment précis dit sur un ton de supporter fonctionne-t-il
          comme avec un jeune enfant ?
        </p>
        <OptionGroup name="k6" options={K6} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — mardi : répertoire des trois canaux
  {
    day: "mardi · 13 min",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Si une façon ne marche pas, tu ne la répètes pas — tu la changes</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Tu as donné un bon retour, avec la bonne consigne, au bon moment — et ça ne marche
          toujours pas. Et maintenant ?
        </p>
        <p className="lede">
          Le premier réflexe, quand quelque chose ne marche pas, est de le répéter — plus lentement,
          plus fort. C&apos;est l&apos;erreur la plus courante du métier : sous pression, on revient
          tous à notre façon préférée.
        </p>
        <p className="lede">
          <strong>Construire un répertoire</strong> veut dire avoir, pour chaque chose importante,
          au moins trois façons différentes de la dire : une qui montre, une qui explique avec des
          mots, une que le corps ressent — les mêmes trois canaux du test VAK, appliqués à
          l&apos;envers.
        </p>
        <div className="card quote">
          Il n&apos;existe pas d&apos;ordre fixe. Le répertoire ne te dit pas lequel tu utiliseras :
          il garantit seulement que, quand le premier ne marche pas, tu en as déjà deux autres prêts.
        </div>
        <div className="card">
          <strong>Le contact physique guidé a une règle en plus, avant le « comment » : la
          permission.</strong>
          <p>
            Avant de guider les bras ou les jambes d&apos;un enfant, dis-le à voix haute, pour que
            lui et les personnes proches puissent l&apos;entendre — <em>« je te prends la
            cheville, comme ça tu sens le mouvement »</em>. Ne pars pas du contact : pars de
            l&apos;annonce.
          </p>
          <p>
            Guide seulement là où c&apos;est techniquement nécessaire (mains, bras, chevilles, dos
            pour la flottaison) — jamais le reste du corps. Fais-le dans un endroit visible, pas à
            l&apos;écart : au bord, en bassin ouvert, où un collègue ou un parent, s&apos;il est
            présent, peut voir ce que tu fais.
          </p>
          <p>
            Si l&apos;enfant se rétracte, se raidit ou dit non — même sans le dire avec des mots —
            ce canal est fermé pour ce moment-là : reviens à montrer ou à expliquer. N&apos;insiste
            pas pour « l&apos;habituer ».
          </p>
          <p>
            Ça vaut pour toutes les tranches d&apos;âge, et ta structure peut avoir son propre
            règlement sur ce point : dans ce cas, c&apos;est le règlement de la structure qui a
            toujours le dernier mot.
          </p>
        </div>
        <p className="lede">
          <strong>Il te faut une confiance de base pour faire ça :</strong> chaque enfant a déjà en
          lui les ressources pour y arriver — ton rôle n&apos;est pas de lui « donner » la capacité,
          c&apos;est de trouver la façon de la faire sortir. Si la première façon ne marche pas, ça
          ne veut pas dire qu&apos;il n&apos;y arrive pas : ça veut seulement dire que ce
          n&apos;était pas encore la bonne clé.
        </p>
        <p className="lede">
          <strong>Et si tu as essayé les trois canaux, et qu&apos;aucun n&apos;a marché ?</strong> À
          ce moment-là, le problème n&apos;est probablement plus « quel canal », mais autre chose —
          peut-être qu&apos;il a peur, peut-être qu&apos;il n&apos;a pas encore compris, peut-être
          qu&apos;il a froid, peut-être qu&apos;il attend juste ton feu vert : les mêmes quatre
          causes du Chapitre 3. À ce moment-là, insister avec une quatrième variation ne sert à
          rien : c&apos;est comme continuer à frapper à une porte quand tu sais que la personne à
          l&apos;intérieur ne peut pas te répondre maintenant. Le répertoire a trois façons, pas
          l&apos;infini — savoir quand s&apos;arrêter complètement fait partie de la même
          compétence.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée</h2>
        <p className="prompt">
          1. Le répertoire a-t-il un ordre fixe — toujours d&apos;abord les mots, puis le geste, puis
          le contact ?
        </p>
        <OptionGroup name="m1" options={M1} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">
          2. Si la première façon ne marche pas avec un enfant, ça veut dire qu&apos;il n&apos;y
          arrive pas ?
        </p>
        <OptionGroup name="m2" options={M2} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Tu as essayé les trois canaux, sans résultat. La bonne chose à faire est-elle
          d&apos;inventer une quatrième variation ?
        </p>
        <OptionGroup name="m3" options={M3} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — mercredi : trois enfants, trois canaux + simulation Bianca (deux moments)
  {
    day: "mercredi",
    pct: 46,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Trois enfants, trois canaux gagnants différents</h1>
        <div className="card scene">
          <div className="who">Un enfant de 7 ans, la brasse</div>
          <p>
            Il n&apos;arrive pas à coordonner ses jambes. L&apos;instructeur essaie avec des mots
            trois fois. Rien ne change. Elle change de canal : elle lui fait sentir le mouvement en
            bougeant ses chevilles hors de l&apos;eau. L&apos;enfant le refait, presque juste, dès
            le premier essai.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Sara, 10 ans</div>
          <p>
            Avec un autre instructeur, les mots avaient toujours suffi — et ça l&apos;avait convaincu
            que ce serait toujours le cas. Avec le virage elle continue à se tromper.
            L&apos;instructeur essaie de lui faire sentir le mouvement : toujours rien. Au troisième
            essai, il lui montre le mouvement entier, dans l&apos;eau. C&apos;est ça qui la débloque.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un garçon de 15 ans</div>
          <p>
            Il continue à rater l&apos;entrée dans l&apos;eau d&apos;un plongeon technique, malgré
            démonstration et explication verbale. Le troisième canal — le contact physique, naturel
            à 7 ans — à 15 ans risquerait de sembler déplacé. L&apos;instructeur adapte le canal à
            son âge, sans changer de principe : il lui montre une courte vidéo de son propre
            plongeon. En se regardant, le garçon comprend seul où le mouvement se casse.
          </p>
        </div>
        <p className="lede">
          <strong>
            Trois enfants, trois canaux gagnants différents — et dans aucun des trois cas le canal,
            ou sa forme, n&apos;était évident à l&apos;avance.
          </strong>
        </p>
        <p className="prompt">
          Tu as expliqué avec des mots, deux fois, comment garder le corps tendu pendant la glisse.
          L&apos;enfant continue à cambrer le dos. Écris une façon différente — pas avec des mots —
          pour lui faire passer la même chose.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : le système cherche un canal
            différent de celui déjà essayé — pas une troisième explication verbale reformulée. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>BIANCA, 9 ans.</strong> Elle a déjà entendu deux fois l&apos;explication verbale de
          comment bouger les bras au dos, et continue à se tromper. Que tentes-tu maintenant — ça
          doit être différent de « avec des mots ».
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "parole" && (
          <div className="feedback retry">
            BIANCA : « ...oui, ok » <em>(réessaie, même erreur qu&apos;avant)</em>
          </div>
        )}
        {answers.sim === "canale" && (
          <div className="feedback ok">
            BIANCA : <em>(essaie le mouvement en suivant le geste que tu lui as montré)</em> «
            ...ah, comme ça ! »
            <br />
            Tu ne fais pas plus d&apos;efforts : tu utilises juste un canal que tu n&apos;avais pas
            encore essayé.
          </div>
        )}
        {!!answers.sim && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Une autre semaine. Bianca doit apprendre un exercice nouveau — le départ dans
              l&apos;eau. Tu essaies le même canal qui a marché avec elle la dernière fois. Cette
              fois ça ne marche pas : elle reste incertaine, comme avec les mots il y a quelque
              temps.
            </p>
            <p className="prompt">Écris ce que tu fais maintenant.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "stesso" && (
              <div className="feedback retry">
                BIANCA continue à se tromper — le canal qui avait marché une fois n&apos;était pas
                une découverte définitive, c&apos;était juste le bon pour ce mouvement précis.
              </div>
            )}
            {answers.sim2 === "diverso" && (
              <div className="feedback ok">
                BIANCA : <em>(essaie le troisième canal restant)</em> « ...ok, maintenant j&apos;ai
                compris. »
                <br />
                Le répertoire ne s&apos;épuise pas après la première découverte : chaque nouvel
                exercice peut demander un canal différent, même avec le même enfant.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — mercredi soir : transfert
  {
    day: "mercredi soir",
    pct: 62,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée — transfert</div>
        <h1>Le troisième canal restant</h1>
        <p className="lede">
          Tu as déjà essayé « montrer » et « faire sentir » avec le même enfant, sans résultat, sur
          un mouvement technique jamais abordé jusqu&apos;ici dans le cours.
        </p>
        <p className="prompt">Que fais-tu maintenant, et pourquoi est-ce cohérent avec ce que tu as appris aujourd&apos;hui ?</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : le système cherche si le
            troisième canal pas encore essayé (« dire », avec des mots) est ce qu'il reste — pas une
            quatrième variation du même canal déjà exclu deux fois. */}
      </>
    ),
  },

  // 5 — ton tour au bassin
  {
    day: "au bassin",
    pct: 70,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton tour au bassin</div>
        <h1>Trois façons, prêtes avant d&apos;entrer</h1>
        <p className="lede">
          Cette semaine, prépare trois façons différentes d&apos;expliquer la même chose technique
          avant d&apos;entrer dans le bassin. Si la première ne marche pas avec un enfant, utilises-en
          tout de suite une autre — ne répète pas la première plus fort.
        </p>
      </>
    ),
  },

  // 6 — vendredi : test cumulatif
  {
    day: "vendredi · 11 min",
    pct: 86,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 7 + Chapitre 8</div>
        <h1>Le test</h1>
        <p className="prompt">1. Si une façon d&apos;expliquer ne marche pas, la bonne chose est :</p>
        <OptionGroup name="t1" options={T1} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Un bon répertoire a, pour chaque chose importante, au moins :</p>
        <OptionGroup name="t2" options={T2} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Si un enfant n&apos;y arrive pas avec l&apos;explication verbale, ça veut dire qu&apos;il n&apos;y arrive pas du tout ?</p>
        <OptionGroup name="t3" options={T3} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Le répertoire a-t-il un ordre fixe, valable pour chaque enfant ?</p>
        <OptionGroup name="t4" options={T4} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(du Chapitre 7)</em> « Tu es distrait » et « tu regardais par la fenêtre » sont-ils
          la même chose ?
        </p>
        <OptionGroup name="t5" options={T5} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Un canal a marché avec un enfant sur un exercice. Ça veut dire que les deux autres, avec lui, ne servent plus ?</p>
        <OptionGroup name="t6" options={T6} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">
          7. Tu as essayé les trois canaux avec un enfant, sans résultat. La bonne chose à faire
          est-elle d&apos;inventer une quatrième variation ?
        </p>
        <OptionGroup name="t7" options={T7} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Avec un adolescent, le contact physique guidé est-il toujours la bonne forme du troisième canal ?</p>
        <OptionGroup name="t8" options={T8} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Un canal qui a marché sur un exercice marche-t-il automatiquement aussi sur
          l&apos;exercice suivant ?
        </p>
        <OptionGroup name="t9" options={T9} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Tu as déjà essayé deux façons différentes avec le même enfant, et aucune n&apos;a
          marché. Écris en deux lignes ce que tu fais maintenant.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback : explique comment fonctionne la correction (§10, D34)
  {
    day: "vendredi · feedback",
    pct: 88,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Voici ce que disent tes réponses</h1>
        <p className="lede">Pas sur toi — sur ce que tu as fait dans ces questions.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemple de retour généré, en cas d&apos;erreur à la question 1 :
        </p>
        <div className="card quote">
          Tu as répondu que tu le répéterais plus lentement. C&apos;est l&apos;instinct le plus
          naturel, mais si une façon n&apos;a pas marché deux fois, la répéter une troisième fois
          change rarement quelque chose. Le temps que tu passes à répéter la même façon est du
          temps que tu pourrais passer à en essayer une différente.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Le retour ne dit jamais juste « tu t&apos;es trompé » : il dit quoi regarder la prochaine
          fois. Le ton reste toujours sur le comportement observé, jamais sur la personne — la
          même règle du Chapitre 7.
        </p>
      </>
    ),
  },

  // 8 — récupération : seulement si le test du vendredi a trop d'erreurs (§12, D25/D27)
  {
    day: "récupération",
    pct: 90,
    nextLabel: "Continuer ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "diverso", t2: "tre", t3: "no", t4: "no", t5: "no",
        t6: "no", t7: "no", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Récupération — juste parce que le test a trouvé quelques difficultés</div>
        <h1>Trois exemples en plus, pour reconnaître un canal vraiment différent</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de revoir
          le point le plus délicat de ce chapitre avec quelques exemples en plus — ce qui compte
          vraiment comme « une autre façon », et ce qui n&apos;est que la même voie répétée.
        </p>

        <div className="card scene">
          <div className="who">Un enfant de 8 ans, la brasse</div>
          <p>
            Il n&apos;arrive pas à coordonner ses jambes. L&apos;instructeur explique avec des mots
            : « ouvre, pousse, ferme ». Ça ne marche pas. Elle réessaie avec des mots, cette fois
            plus lentement. Toujours rien. Elle réessaie une troisième fois, en détachant chaque
            syllabe.
          </p>
        </div>
        <p className="prompt">A-t-elle essayé trois façons différentes ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Oui — elle a changé de rythme et de ton trois fois", correct: false },
            {
              value: "no",
              label: "Non — ce sont trois variations du même canal (dire), pas trois canaux différents",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Une fillette de 9 ans, deux exercices différents</div>
          <p>
            La semaine dernière, lui faire sentir le mouvement avec les mains avait débloqué la
            glisse. Cette semaine elle doit apprendre le virage, un exercice jamais abordé avant.
            L&apos;instructeur, sans y penser, la guide de nouveau avec les mains — « de toute
            façon avec elle ça marche comme ça ». Ça ne marche pas : elle reste incertaine, comme
            les premières fois.
          </p>
        </div>
        <p className="prompt">Qu&apos;a mal fait l&apos;instructeur, avant même d&apos;essayer ?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "niente",
              label: "Rien — un canal qui a marché une fois est le bon choix aussi après",
              correct: false,
            },
            {
              value: "nuovo",
              label:
                "Il a présumé du canal au lieu de traiter le virage comme un problème nouveau",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un garçon de 14 ans, le plongeon technique</div>
          <p>
            Il continue à rater l&apos;entrée dans l&apos;eau malgré deux explications verbales. Au
            troisième essai, l&apos;instructeur lui parle encore — cette fois avec des termes
            techniques plus précis, « l&apos;angle d&apos;entrée », « l&apos;extension du bassin »
            — en pensant avoir changé d&apos;approche.
          </p>
        </div>
        <p className="prompt">A-t-il vraiment utilisé un canal nouveau ?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "si",
              label: "Oui — un langage plus technique est une façon différente d'expliquer",
              correct: false,
            },
            {
              value: "no",
              label:
                "Non — c'est encore « dire », juste avec des mots plus compliqués : ça reste le même canal déjà exclu deux fois",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Changer les mots n&apos;est pas changer de canal. Le répertoire ne fonctionne que si les
          trois façons — montrer, dire, faire sentir — restent vraiment différentes les unes des
          autres, chaque fois qu&apos;il le faut.
        </p>
      </>
    ),
  },

  // 9 — résultat
  {
    day: "vendredi · résultat",
    pct: 95,
    nextLabel: "Aller au Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Résultat</div>
        <h1>Ton profil se met à jour</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Score</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>D&apos;où ça vient</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>Les 10 questions du test</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>La façon alternative écrite au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Comment tu as changé de cap avec Bianca au §8, dans les deux situations</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit du lundi sur le Chapitre 7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Répertoire et adaptation</td>
                <td style={{ padding: "6px 0" }}>Le plus bas des précédents</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 10 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapitre 8 terminé</div>
        <div className="eyebrow">Semaine 8 sur 10 · Chapitre 9 à venir</div>
        <h1>Quand il ne veut pas</h1>
        <p className="lede">
          Jusqu&apos;ici tu as appris quoi faire quand un enfant n&apos;y arrive pas. La semaine
          prochaine tu apprends la différence — parce que ce n&apos;est pas la même chose — quand un
          enfant ne veut tout simplement pas.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="fr" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="fr" />
        <h2>Tes progrès</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Conscience de soi</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Reconnaissance de l&apos;élève</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Observer et interpréter <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Mise en phase</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Consignes et congruence</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Vérifier par l&apos;action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · Le retour</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip acquisita">
            <span className="name">8 · Changer de cap</span>
            <span className="state">acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situations difficiles</span>
            <span className="state">non acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomie</span>
            <span className="state">non acquise</span>
          </div>
        </div>
      </>
    ),
  },
];
