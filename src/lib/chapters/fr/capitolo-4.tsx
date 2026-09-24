import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduction française, pas un chapitre indépendant : mêmes chapterId/clés de réponse/valeurs
// internes que le chapitre italien (src/lib/chapters/capitolo-4.tsx) — seul le texte visible
// change.

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

const K1_OPTIONS: Option[] = [
  { value: "via", label: "Ton feu vert, avant de se lancer", correct: true },
  { value: "coraggio", label: "Du courage — il croit qu'il n'est pas assez courageux", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Oui — regarder et comprendre sont pratiquement la même chose", correct: false },
  {
    value: "no",
    label: "Non — regarder, c'est voir qu'il s'est passé quelque chose ; comprendre, c'est décider ce que ça signifie",
    correct: true,
  },
];
const K3_OPTIONS: Option[] = [
  { value: "no", label: "Non — parfois il manque encore autre chose, d'abord", correct: true },
  { value: "si", label: "Oui, forcément — si la cause est la bonne, l'enfant bouge tout de suite", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "si", label: "Oui, une bonne simulation démontre déjà que la compétence est acquise", correct: false },
  { value: "no", label: "Non — il faut toujours au moins un vrai cours en bassin", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Non, les signaux restent toujours distincts", correct: false },
  {
    value: "si",
    label: "Oui — le signal peut changer pendant que tu observes, si l'attente se prolonge",
    correct: true,
  },
];
const K6_OPTIONS: Option[] = [
  {
    value: "misto",
    label: "Un mélange entre l'attente du feu vert et la gêne d'un nouveau groupe",
    correct: true,
  },
  { value: "dimenticato", label: "Elle avait oublié comment on fait le plongeon", correct: false },
];

const M1_OPTIONS: Option[] = [
  { value: "domanda", label: "Tu lui poses une question directe pour le faire parler", correct: false },
  { value: "silenzio", label: "Pendant un moment, tu es immobile et silencieux toi aussi", correct: true },
];
const M2_OPTIONS: Option[] = [
  {
    value: "tirare",
    label: "Tirer quelqu'un par le bras alors qu'il ne te suit pas encore",
    correct: true,
  },
  { value: "esempio", label: "Donner le bon exemple, comme ça il suit presque tout de suite", correct: false },
];
const M3_OPTIONS: Option[] = [
  {
    value: "torni",
    label: "Tu reviens en arrière d'un pas : tu retrouves son rythme, avant de reproposer la direction",
    correct: true,
  },
  { value: "insisti", label: "Tu insistes — jusqu'à il y a un instant tout allait bien", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "diretta", label: "« Noa, tu veux entrer ? »" },
  { value: "silenzio", label: "Tu t'assieds près d'elle en silence, en reflétant son immobilité" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "minimizza", label: "« Mais non, c'est juste de l'eau, ne t'inquiète pas »" },
  {
    value: "risolvi",
    label: "Tu lui proposes un bonnet de bain, ou tu lui dis qu'elle peut garder la tête hors de l'eau pour aujourd'hui",
  },
];

const T1_OPTIONS: Option[] = [
  { value: "prima", label: "Avant", correct: true },
  { value: "dopo", label: "Après", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "calma", label: "Lui dire tout de suite de se calmer", correct: false },
  { value: "asseconda", label: "Suivre un instant son énergie, puis la guider", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "no", label: "Non — ça fonctionne pareil, à l'inverse, avec celui qui s'excite", correct: true },
  {
    value: "si",
    label: "Oui — avec celui qui s'agite, il suffit de le calmer, pas de le suivre",
    correct: false,
  },
];
const T4_OPTIONS: Option[] = [
  { value: "capito", label: "N'ait pas compris", correct: false },
  { value: "paura", label: "Ait peur", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "no", label: "Non — elle sert à créer les conditions pour qu'il t'écoute", correct: true },
  {
    value: "si",
    label: "Oui — c'est surtout une question d'être sympathique avec l'enfant",
    correct: false,
  },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Oui, si tu as raison", correct: false },
  { value: "no", label: "Non — même en ayant raison, ça ne fonctionne généralement pas", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "insisti", label: "Insister, parce que jusqu'à il y a un instant ça fonctionnait", correct: false },
  {
    value: "torna",
    label: "Revenir en arrière d'un pas et retrouver son rythme, avant de reproposer la direction",
    correct: true,
  },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "Non — la forme change avec l'âge, mais l'ordre reste le même", correct: true },
  { value: "si", label: "Oui, exactement de la même façon", correct: false },
];
const T9_OPTIONS: Option[] = [
  { value: "rassicurato", label: "Il se sent quand même rassuré", correct: false },
  { value: "richiude", label: "Il se referme à nouveau — il ne s'est pas senti pris au sérieux", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo4StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 4 · LA MISE EN PHASE</div>
        <h1>Pourquoi devrait-il m&apos;écouter ?</h1>
        <p className="lede">
          Face à un enfant fermé ou silencieux — ou face à un enfant agité et euphorique —
          l&apos;instructeur se met à son rythme un instant avant de lui demander quoi que ce
          soit, au lieu de le presser ou de l&apos;éteindre tout de suite.
        </p>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 3
  {
    day: "lundi · 10 min",
    pct: 12,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé dans le bassin ?</h1>
        <p className="lede">
          La semaine dernière, je t&apos;ai demandé de t&apos;arrêter toi aussi une seconde, au
          premier enfant qui s&apos;arrêtait ou hésitait, et de décider laquelle des quatre causes
          te semblait la plus probable. Comment ça s&apos;est passé ? Ta lecture était-elle la
          bonne ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 3 revient</h2>
        <p className="prompt">
          1. Un enfant s&apos;arrête, te cherche des yeux, le corps n&apos;est pas tendu. Qu&apos;est-ce qui lui
          manque le plus probablement ?
        </p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, c) => setResponse("k1", v, c)} />
        <p className="prompt">2. Regarder et comprendre, est-ce la même chose ?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, c) => setResponse("k2", v, c)} />
        <p className="prompt">
          3. Tu as bien compris la cause, mais l&apos;enfant continue à ne pas bouger. Ça veut dire que
          ta lecture était fausse ?
        </p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, c) => setResponse("k3", v, c)} />
        <p className="prompt">4. Pour la compétence du Chapitre 3, une bonne simulation suffit-elle pour EXCELLENTE ?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, c) => setResponse("k4", v, c)} />
        <p className="prompt">
          5. Un enfant qui attend seulement ton feu vert peut-il, si tu attends trop, commencer à
          montrer des signes de vraie peur ?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, c) => setResponse("k5", v, c)} />
        <p className="prompt">
          6. Dans l&apos;exemple de Nadia, 12 ans, qu&apos;est-ce qu&apos;il y avait derrière son hésitation
          devant un groupe différent de d&apos;habitude ?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, c) => setResponse("k6", v, c)} />
      </>
    ),
  },

  // 2 — mardi : explication + contrôle de fin de journée
  {
    day: "mardi · 13 min",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>D&apos;abord son rythme, ensuite le tien</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Même quand tu lis bien la situation, parfois l&apos;enfant ne t&apos;écoute quand même
          pas. Aujourd&apos;hui, tu apprends pourquoi — et quoi faire, avant même de parler.
        </p>
        <p className="lede">
          <strong>La mise en phase, ce n&apos;est pas être sympathique.</strong> C&apos;est créer,
          en quelques secondes, les conditions pour qu&apos;un enfant soit disposé à
          t&apos;écouter. Sans ça, même la consigne la plus juste rebondit.
        </p>
        <p className="lede">
          <strong>D&apos;abord, tu te mets à son rythme.</strong> S&apos;il est immobile et
          silencieux, pendant un instant tu es immobile et silencieux toi aussi. S&apos;il est
          agité et euphorique, pendant un instant tu suis son énergie au lieu de
          l&apos;éteindre avec un « calme-toi ». Tu ne l&apos;imites pas : tu dis, avec ton corps,
          « je suis là avec toi, là où tu es maintenant ».
        </p>
        <p className="lede">
          <strong>Ce n&apos;est qu&apos;ensuite que tu le guides.</strong> Une fois qu&apos;il a
          senti que tu es à son pas, tu peux proposer un petit pas dans la direction que tu veux.
        </p>
        <div className="card quote">
          Guider avant de s&apos;être mis à son rythme, c&apos;est comme tirer quelqu&apos;un par
          le bras alors qu&apos;il ne te suit pas encore : tu peux même avoir raison, mais ça ne
          fonctionne pas.
        </div>
        <p className="lede">
          Ça fonctionne avec celui qui se ferme — et ça fonctionne pareil, à l&apos;inverse, avec
          celui qui s&apos;excite. Le premier mouvement est toujours le même : aller vers lui, pas
          lui demander de venir tout de suite vers toi.
        </p>
        <p className="lede">
          <strong>Une dernière chose, avant d&apos;avancer.</strong> La mise en phase n&apos;est
          pas un interrupteur qui, une fois allumé, reste allumé pour tout le cours : elle peut se
          perdre en cours de route, et il faut alors la reconstruire, pas la forcer. Un enfant qui
          t&apos;a suivi pendant deux exercices peut, au troisième, se refermer à nouveau —
          peut-être qu&apos;il est fatigué, peut-être que le nouvel exercice l&apos;a déstabilisé.
          La tentation est d&apos;insister (« allez, tout allait bien il y a un instant »), mais
          c&apos;est de nouveau la même erreur : tu essaies de le guider alors que lui, en ce
          moment, ne te suit plus. Reviens en arrière d&apos;un pas : retrouve son rythme, avant de
          reproposer la direction. Tu n&apos;as pas besoin de recommencer depuis le début : tu dois
          juste appliquer de nouveau la même règle qu&apos;à chaque fois.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée</h2>
        <p className="prompt">1. Un enfant est silencieux et immobile. Que fais-tu en premier ?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, c) => setResponse("m1", v, c)} />
        <p className="prompt">2. Guider avant de s&apos;être mis à son rythme, c&apos;est comme :</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, c) => setResponse("m2", v, c)} />
        <p className="prompt">
          3. Un enfant qui te suivait bien se referme en milieu de cours, sur un exercice nouveau.
          Que fais-tu ?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, c) => setResponse("m3", v, c)} />
      </>
    ),
  },

  // 3 — mercredi : scènes + réflexion + simulation à embranchement
  {
    day: "mercredi",
    pct: 48,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "diretta" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback =
        answers.sim === "diretta" ? (
          <div className="feedback retry">
            NOA : <em>(silence, ne bouge pas)</em>
            <br />
            Une question directe lui a demandé de suivre un rythme qui n&apos;était pas encore le
            sien.
          </div>
        ) : answers.sim === "silenzio" ? (
          <div className="feedback ok">
            NOA : <em>(après quelques secondes, tourne son regard vers toi)</em> « ...j&apos;ai
            peur d&apos;avoir les cheveux mouillés. »
            <br />
            Se mettre à son rythme ne l&apos;a pas « débloquée » comme par magie : ça lui a donné
            l&apos;espace pour dire ce qu&apos;il y avait vraiment.
          </div>
        ) : null;

      const sim2Feedback =
        answers.sim2 === "minimizza" ? (
          <div className="feedback retry">
            NOA se referme à nouveau, redevient silencieuse — elle avait pris un risque en te le
            disant, et elle n&apos;a pas été prise au sérieux.
          </div>
        ) : answers.sim2 === "risolvi" ? (
          <div className="feedback ok">
            NOA : « ...d&apos;accord, j&apos;essaie comme ça. » <em>(elle se lève, s&apos;approche
            du bord)</em>
            <br />
            Ouvrir la porte avec la mise en phase ne suffit pas si, dès que l&apos;enfant dit ce
            qu&apos;il y a vraiment, tu la refermes toi-même avec une réponse générique. Le second
            mouvement compte autant que le premier.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Mercredi</div>
          <h1>Un enfant fermé, un agité, une adolescente distante</h1>
          <div className="card scene">
            <div className="who">Elia, 6 ans</div>
            <p>
              Premier jour avec un nouveau groupe. Il ne répond pas, bras croisés, regard baissé.
              L&apos;instructeur s&apos;assied à côté de lui, en silence, pendant vingt secondes —
              même immobilité, même silence. Puis, doucement : « moi aussi, parfois, je n&apos;ai
              pas envie de parler. » Puis : « tu veux juste te mouiller les pieds, pour
              l&apos;instant ? » Elia ne répond pas avec des mots. Mais il met les pieds dans
              l&apos;eau.
            </p>
            <p>
              Si l&apos;instructeur l&apos;avait guidé tout de suite — « allez, on y va, ça va
              être amusant ! » — il lui aurait demandé de suivre un rythme qui n&apos;était pas
              encore le sien. Ces vingt secondes à son rythme n&apos;ont pas « convaincu » Elia par
              un argument : elles lui ont juste fait comprendre qu&apos;il pouvait rester où il
              était. Et de là, un petit pas, c&apos;est lui qui l&apos;a fait tout seul.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Diego, 8 ans</div>
            <p>
              Il arrive au bord du bassin déjà à fond : il saute, parle très vite.
              L&apos;instructeur, au lieu de dire « calme-toi », le suit un moment : il acquiesce
              vite, lui pose une question courte et rapide comme son rythme. Ce n&apos;est
              qu&apos;ensuite, progressivement, qu&apos;il ralentit lui-même le rythme de la
              conversation — et Diego ralentit avec lui, jusqu&apos;à être prêt pour la première
              consigne.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Bianca, 15 ans</div>
            <p>
              Elle arrive avec le visage fermé, répond aux salutations d&apos;un signe de tête à
              peine esquissé, bras croisés — elle n&apos;est pas fermée comme Elia, c&apos;est du
              détachement d&apos;adolescente qui n&apos;a pas envie d&apos;être là aujourd&apos;hui.
              L&apos;instructeur ne s&apos;assied pas à côté d&apos;elle en silence, à 15 ans ce
              serait étrange : il lui parle peu, avec le même ton sec qu&apos;elle — « ok, journée
              difficile ? » Bianca répond par un « ...un peu », mais c&apos;est déjà quelque chose
              : elle a laissé l&apos;instructeur la rejoindre, jusqu&apos;où elle était disposée à
              s&apos;ouvrir — pas plus loin. C&apos;est seulement à ce moment-là qu&apos;arrive
              l&apos;exercice, sur un ton normal — pas de faux enthousiasme, qui ne conviendrait
              pas à son humeur.
            </p>
          </div>
          <p className="lede">
            <strong>
              Un enfant fermé, un agité, une adolescente distante — la forme change, l&apos;ordre
              non : d&apos;abord son rythme, ensuite seulement le tien.
            </strong>
          </p>
          <p className="prompt">
            Un enfant de 8 ans arrive au bord du bassin déjà très agité, parle vite, ne tient pas
            en place une seconde. Que fais-tu — ou que dis-tu — dans les trente premières secondes,
            AVANT de lui donner une consigne quelconque ?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Note de correction, non montrée à l'instructeur : le système cherche s'il suit
              l'énergie un instant avant de la faire redescendre — pas s'il l'éteint tout de suite
              avec un « calme-toi ». */}
          <h2>Simulation</h2>
          <p className="lede">
            <strong>NOA, 7 ans.</strong> Bord du bassin, silencieuse, ne répond pas aux questions
            directes. Que fais-tu ou dis-tu en premier ?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim === "silenzio" && (
            <div>
              <p className="lede" style={{ marginTop: 14 }}>
                La scène continue. Maintenant que Noa a dit quel est le vrai problème, c&apos;est à
                toi de répondre à <em>ça</em>.
              </p>
              <p className="prompt">Écris ce que tu lui dis ou lui proposes maintenant.</p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup
                name="sim2"
                options={SIM2_OPTIONS}
                selected={answers.sim2}
                onPick={(v) => setResponse("sim2", v)}
              />
              {sim2Feedback}
            </div>
          )}
        </>
      );
    },
  },

  // 4 — mercredi soir : contrôle de fin de journée (transfert)
  {
    day: "mercredi soir",
    pct: 62,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée — transfert</div>
        <h1>Une scène différente de celle d&apos;hier</h1>
        <p className="lede">
          Un enfant de 10 ans arrive en riant fort, pousse un camarade pour jouer, n&apos;arrive
          pas à rester immobile en file. Il n&apos;a pas l&apos;air fâché ni effrayé : il semble
          juste plein d&apos;énergie.
        </p>
        <p className="prompt">
          Comment ouvres-tu le contact avec lui, AVANT de lui demander de se mettre en file et de
          rester immobile ? Écris ton raisonnement, pas seulement le geste.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note de correction, non montrée à l'instructeur : le système cherche s'il reconnaît
            ceci comme un cas d'« agité/euphorique » — suivre un instant son énergie, pas lui
            demander tout de suite de se calmer. */}
      </>
    ),
  },

  // 5 — dans le bassin
  {
    day: "dans le bassin",
    pct: 68,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton cours au bassin</div>
        <h1>Une minute à son rythme</h1>
        <p className="lede">
          Cette semaine, avec l&apos;enfant le plus fermé — ou le plus agité — du groupe :
          mets-toi à son rythme pendant une minute avant de lui demander quoi que ce soit.
          Immobile s&apos;il est immobile, silencieux s&apos;il est silencieux ; rapide s&apos;il
          est rapide, excité s&apos;il est excité. Puis, seulement après, propose un petit pas.
        </p>
      </>
    ),
  },

  // 6 — vendredi : test cumulatif
  {
    day: "vendredi · 11 min",
    pct: 85,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 3 + Chapitre 4</div>
        <h1>Le test</h1>
        <p className="prompt">1. Se mettre au rythme de l&apos;enfant vient-il avant ou après le guider ?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, c) => setResponse("t1", v, c)} />
        <p className="prompt">2. Un enfant est euphorique et agité. Le premier bon geste est :</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, c) => setResponse("t2", v, c)} />
        <p className="prompt">3. Se mettre au rythme de l&apos;enfant ne fonctionne-t-il qu&apos;avec celui qui se ferme ?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, c) => setResponse("t3", v, c)} />
        <p className="prompt">
          4. <em>(du Chapitre 3)</em> Un enfant se bloque, épaules tendues, regard fixé sur
          l&apos;eau. Il est plus probable que :
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, c) => setResponse("t4", v, c)} />
        <p className="prompt">5. La mise en phase sert-elle à être sympathique avec l&apos;enfant ?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, c) => setResponse("t5", v, c)} />
        <p className="prompt">6. Guider avant de s&apos;être mis à son rythme, ça fonctionne généralement ?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, c) => setResponse("t6", v, c)} />
        <p className="prompt">
          7. Un enfant qui te suivait bien se referme en milieu de cours. La bonne chose à faire
          est :
        </p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, c) => setResponse("t7", v, c)} />
        <p className="prompt">
          8. Avec une adolescente distante, la mise en phase se construit-elle de la même façon
          qu&apos;avec un enfant de 6 ans ?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, c) => setResponse("t8", v, c)} />
        <p className="prompt">
          9. Un enfant révèle quelle est sa vraie peur, après que tu t&apos;es mis à son rythme. Si tu
          réponds de façon générique ou que tu minimises, que se passe-t-il généralement ?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, c) => setResponse("t9", v, c)} />
        <p className="prompt">
          10. Un jeune de 13 ans arrive au bord du bassin en silence, sans saluer personne. Écris
          en deux lignes ce que tu fais dans les dix premières secondes.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback : explique comment fonctionne la correction (§10, D34)
  {
    day: "vendredi · feedback",
    pct: 87,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Voici ce que disent tes réponses</h1>
        <p className="lede">Pas sur toi — sur ce que tu as fait dans ces questions.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemple de feedback généré, en cas d&apos;erreur à la question 2 :
        </p>
        <div className="card quote">
          Tu as répondu qu&apos;il fallait le calmer tout de suite. Mais un « calme-toi » dit à
          quelqu&apos;un déjà survolté fonctionne rarement — parce que tu ne l&apos;as pas rejoint
          là où il se trouve, tu lui as juste demandé de se déplacer tout seul. Le suivre en
          premier, ne serait-ce que quelques secondes, ouvre la porte que tu peux ensuite
          refermer toi-même.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Le feedback ne dit jamais seulement « tu t&apos;es trompé » : il dit quoi regarder la
          prochaine fois. Le ton porte toujours sur le comportement observé, jamais sur la
          personne (voir le Chapitre 7, qui reviendra justement sur cette règle).
        </p>
      </>
    ),
  },

  // 8 — rattrapage : seulement si le test du vendredi a trop d'erreurs (§12, D25/D27)
  {
    day: "rattrapage",
    pct: 90,
    nextLabel: "Continuer ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "prima", t2: "asseconda", t3: "no", t4: "paura", t5: "no",
        t6: "no", t7: "torna", t8: "no", t9: "richiude",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Rattrapage — seulement parce que le test a repéré des difficultés</div>
        <h1>Trois scènes de plus, pour entraîner l&apos;ordre</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de
          revoir le point le plus délicat de ce chapitre avec quelques exemples de plus —
          d&apos;abord son rythme, ensuite seulement le tien.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 9 ans</div>
          <p>
            Premier jour avec le groupe. Assis au bord, jambes hors de l&apos;eau, bras croisés,
            ne répond pas à ceux qui le saluent.
          </p>
        </div>
        <p className="prompt">Que fais-tu en premier ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "gioco", label: "Tu lui proposes tout de suite un jeu pour briser la glace", correct: false },
            {
              value: "silenzio",
              label: "Tu t'assieds près de lui, en silence, un moment, avant de proposer quoi que ce soit",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Greta, 7 ans</div>
          <p>
            Elle arrive au bord du bassin en sautillant, raconte son week-end à toute vitesse sans
            finir une phrase, ne tient pas en place une seconde.
          </p>
        </div>
        <p className="prompt">Que fais-tu en premier, avant de lui donner la première consigne ?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "calma", label: "Tu lui dis de se calmer, comme ça tu peux commencer l'exercice", correct: false },
            {
              value: "asseconda",
              label: "Pendant un moment tu suis son rythme — tu acquiesces vite, une question courte sur la même énergie",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un enfant qui te suivait bien</div>
          <p>
            Il a suivi sans problème les deux premiers exercices. Au troisième — nouveau, jamais
            fait avant — il se bloque à nouveau, fermé comme au début du cours.
          </p>
        </div>
        <p className="prompt">Que fais-tu ?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "insisti", label: "Tu insistes — il te suivait il y a un instant, tu continues sur la même voie", correct: false },
            {
              value: "torna",
              label: "Tu reviens en arrière d'un pas : tu retrouves son rythme, avant de reproposer la direction",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Fermé, agité, ou déjà en chemin puis de nouveau arrêté — la forme change, jamais
          l&apos;ordre : tu te mets d&apos;abord à son rythme, ensuite seulement tu le guides.
        </p>
      </>
    ),
  },

  // 9 — vendredi : résultat
  {
    day: "vendredi · résultat",
    pct: 95,
    nextLabel: "Aller au Tableau de bord ▸",
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
                <td style={{ padding: "6px 0" }}>Ta réponse au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Comment tu as rejoint Noa au §8, dans les deux échanges</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit de lundi sur le Chapitre 3</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Mise en phase</td>
                <td style={{ padding: "6px 0" }}>Le plus bas des scores précédents</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 10 — tableau de bord
  {
    day: "tableau de bord",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapitre 4 terminé</div>
        <div className="eyebrow">Semaine 4 sur 10 · Chapitre 5 à venir</div>
        <h1>Le message et la consigne</h1>
        <p className="lede">
          Aujourd&apos;hui, tu as appris à ouvrir la porte. La semaine prochaine, tu apprends quoi
          dire, une fois qu&apos;elle est ouverte — et pourquoi les mots, la voix et le corps
          doivent dire la même chose.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="fr" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="fr" />
        <h2>Ton progrès</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Conscience personnelle</span>
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
          <div className="chip acquisita">
            <span className="name">4 · Mise en phase</span>
            <span className="state">acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Consignes et congruence</span>
            <span className="state">non acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Vérifier par l&apos;action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">non acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · Le retour</span>
            <span className="state">non acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Changer de méthode</span>
            <span className="state">non acquise</span>
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
