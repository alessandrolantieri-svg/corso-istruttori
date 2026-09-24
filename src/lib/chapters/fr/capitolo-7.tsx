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

const K_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "k1",
    prompt: "1. « Tu as compris ? » est-elle une bonne vérification ?",
    options: [
      { value: "no", label: "Non — presque tout le monde dit oui quoi qu'il arrive", correct: true },
      { value: "si", label: "Oui — si tu le demandes d'un ton assuré, l'enfant répond sincèrement", correct: false },
    ],
  },
  {
    key: "k2",
    prompt: "2. La bonne séquence est :",
    options: [
      { value: "ascolta", label: "Je communique → l'enfant écoute, puis comprend seul avec le temps", correct: false },
      { value: "fa", label: "Je communique → il comprend → il agit", correct: true },
    ],
  },
  {
    key: "k3",
    prompt: "3. Un enfant dit « j'ai compris » avec assurance. Le laisses-tu partir pour l'exercice complet ?",
    options: [
      { value: "no", label: "Non — d'abord un essai bref, observé", correct: true },
      { value: "si", label: "Oui — s'il le dit avec assurance, l'essai bref est superflu", correct: false },
    ],
  },
  {
    key: "k4",
    prompt: "4. Avec un enfant de 4 ans, la bonne vérification est-elle de lui demander s'il a compris ?",
    options: [
      { value: "si", label: "Oui — à cet âge il suffit de le lui demander avec des mots simples", correct: false },
      { value: "no", label: "Non — une petite tâche immédiate : « montre-moi maintenant »", correct: true },
    ],
  },
  {
    key: "k5",
    prompt: "5. Le premier essai observé n'est ni clairement juste ni clairement faux. Que fais-tu ?",
    options: [
      { value: "secondo", label: "Tu regardes un deuxième essai, ou tu rends le premier plus explicite", correct: true },
      { value: "chiedo", label: "Tu redemandes « tu as compris ? », il a déjà répondu une fois de toute façon", correct: false },
    ],
  },
  {
    key: "k6",
    prompt: "6. Après avoir donné une correction, la vérification est-elle déjà complète ?",
    options: [
      { value: "si", label: "Oui, la correction seule suffit, rien d'autre n'est nécessaire", correct: false },
      { value: "no", label: "Non — même la correction doit être revérifiée par l'action", correct: true },
    ],
  },
];

const M_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "m1",
    prompt: "1. « Tu es distrait » décrit-il un moment ou étiquette-t-il la personne ?",
    options: [
      { value: "persona", label: "Ça étiquette la personne", correct: true },
      { value: "momento", label: "Ça décrit seulement le comportement de ce moment-là, pas lui en tant que personne", correct: false },
    ],
  },
  {
    key: "m2",
    prompt: "2. Un enfant a bu la tasse pendant l'exercice. Que lui est-il arrivé ?",
    options: [
      { value: "fallito", label: "Il a raté l'exercice, et il faut le corriger tout de suite", correct: false },
      { value: "veloce", label: "Il a essayé d'aller plus vite que ce que son corps pouvait encore encaisser", correct: true },
    ],
  },
  {
    key: "m3",
    prompt: "3. Un essai améliore un détail mais en perd un autre. Le bon retour est :",
    options: [
      { value: "entrambe", label: "Nommer les deux choses, de façon précise", correct: true },
      { value: "uno", label: "Choisir seulement la louange, ou seulement la correction, pour ne pas embrouiller", correct: false },
    ],
  },
];

const SIM_OPTIONS: Option[] = [
  { value: "persona", label: "« Tu n'es pas attentif, il faut faire plus d'efforts »" },
  { value: "comportamento", label: "« Tes bras se sont ouverts trop tôt, garde-les serrés un instant de plus »" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "generico", label: "« Bravo, bien mieux ! » — juste une louange générique" },
  { value: "entrambe", label: "Tu nommes à la fois l'amélioration et le nouveau détail, tous les deux de façon précise" },
];

const T_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "t1",
    prompt: "1. « Tu es distrait » et « là, tu regardais par la fenêtre » sont-ils la même chose ?",
    options: [
      { value: "si", label: "Oui — ce sont deux façons différentes de dire la même chose", correct: false },
      { value: "no", label: "Non — le premier étiquette la personne, le second décrit un moment", correct: true },
    ],
  },
  {
    key: "t2",
    prompt: "2. « Bravo » est-il un bon compliment ?",
    options: [
      { value: "no", label: "C'est agréable mais ça n'apprend rien", correct: true },
      { value: "si", label: "Oui — c'est court mais l'enfant comprend quand même ce qu'il a bien fait", correct: false },
    ],
  },
  {
    key: "t3",
    prompt: "3. Un enfant a bu la tasse pendant l'exercice. Est-ce un échec ?",
    options: [
      { value: "si", label: "Oui — boire la tasse pendant l'exercice veut dire qu'il n'y arrive pas", correct: false },
      { value: "no", label: "Non — c'est une information", correct: true },
    ],
  },
  {
    key: "t4",
    prompt: "4. Un compliment vague s'oublie, un compliment précis...",
    options: [
      { value: "ripete", label: "Se répète — l'enfant sait ce qu'il a fait pour le mériter", correct: true },
      { value: "uguale", label: "S'oublie aussi, ça ne change rien — l'enfant s'en souvient pareil", correct: false },
    ],
  },
  {
    key: "t5",
    prompt: "5. (du Chapitre 6) « Tu as compris ? » est-elle une bonne vérification ?",
    options: [
      { value: "si", label: "Oui — s'il répond tout de suite, ça veut dire qu'il a bien compris", correct: false },
      { value: "no", label: "Non — même celui qui n'a pas compris répond souvent oui", correct: true },
    ],
  },
  {
    key: "t6",
    prompt: "6. Un retour vague fait-il du mal à l'enfant ?",
    options: [
      { value: "vuoto", label: "Ça ne fait pas de mal, mais ça n'apprend rien", correct: true },
      { value: "male", label: "Oui, toujours — un enfant qui entend toujours le même commentaire finit par se fermer", correct: false },
    ],
  },
  {
    key: "t7",
    prompt: "7. Un essai améliore un détail mais en perd un autre. Le bon retour est :",
    options: [
      { value: "uno", label: "Choisir seulement la louange, ou seulement la correction, pour rester simple", correct: false },
      { value: "entrambe", label: "Nommer les deux choses, de façon précise", correct: true },
    ],
  },
  {
    key: "t8",
    prompt: "8. Avec un adolescent, un compliment précis dit sur un ton de supporter (« bravo champion ! ») fonctionne-t-il comme avec un jeune enfant ?",
    options: [
      { value: "no", label: "Non — à cet âge le ton compte autant que le contenu : respectueux, pas façon supporter", correct: true },
      { value: "si", label: "Oui, l'enthousiasme fonctionne à tout âge", correct: false },
    ],
  },
  {
    key: "t9",
    prompt: "9. Si tu donnes une correction et que l'enfant ne s'améliore qu'en partie, une louange générique suffit-elle pour l'essai suivant ?",
    options: [
      { value: "si", label: "Oui, l'important est d'encourager", correct: false },
      { value: "no", label: "Non — il faut aussi nommer le nouveau détail encore à corriger", correct: true },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo7StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 7 · LE RETOUR</div>
        <h1>Qu&apos;est-ce que je lui dis, après qu&apos;il a essayé ?</h1>
        <p className="lede">
          L&apos;instructeur donne un retour — positif ou correctif — en décrivant le comportement
          observé, jamais en étiquetant la personne.
        </p>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 6
  {
    day: "lundi · 10 min",
    pct: 12,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé au bassin ?</h1>
        <p className="lede">
          La semaine dernière : un tour entier sans demander « tu as compris ? » à personne.
          Qu&apos;as-tu regardé à la place, et qu&apos;as-tu découvert ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 6 revient</h2>
        {K_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 2 — mardi : décrire le comportement, pas étiqueter la personne
  {
    day: "mardi · 13 min",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Ce qu&apos;il a fait, pas qui il est</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Tu as vu l&apos;action. Maintenant : que lui dis-tu — après, quand ça s&apos;est bien
          passé, et quand non ?
        </p>
        <p className="lede">
          « Tu es distrait » parle de lui en tant que personne. « Là, tu regardais par la fenêtre »
          parle seulement de ce qui s&apos;est passé à ce moment-là. Si tu répètes souvent la
          première phrase, elle devient une étiquette que l&apos;enfant traîne avec lui : à la fin,
          il arrête d&apos;essayer de prouver le contraire, parce qu&apos;il est plus facile de
          devenir ce qu&apos;on lui dit qu&apos;il est. La deuxième phrase, elle, décrit un moment
          précis, qui peut déjà changer à l&apos;essai suivant.
        </p>
        <p className="lede">
          <strong>Ça vaut aussi pour les compliments.</strong> « Tu es bon » est agréable mais
          n&apos;apprend rien. « Tu as gardé les jambes tendues sur tout le bassin » lui dit
          exactement quoi refaire.
        </p>
        <div className="card quote">
          Un enfant qui a bu la tasse pendant l&apos;exercice n&apos;a pas « fait d&apos;erreur » :
          il a essayé d&apos;aller plus vite que ce que son corps pouvait encore encaisser. Dit
          ainsi, l&apos;erreur devient une information à utiliser — pas une faute à payer.
        </div>
        <p className="lede">
          Un compliment générique peut lui aussi faire autant de mal qu&apos;une critique générique.
          Ça a l&apos;air inoffensif — personne ne s&apos;offusque d&apos;un « bravo » — mais un
          enfant qui n&apos;entend que des louanges vagues, chapitre après chapitre, finit par ne
          plus savoir ce qui le rend vraiment bon. Le retour vague ne fait pas de mal : il
          n&apos;apprend simplement rien, et c&apos;est quand même du temps passé sans rien
          construire.
        </p>
        <p className="lede">
          <strong>Et quand l&apos;essai est à mi-chemin</strong> — ni clairement réussi ni
          clairement raté ? Ça arrive plus souvent qu&apos;il n&apos;y paraît : un enfant qui
          améliore un détail mais en perd un autre. La tentation est de choisir un seul message —
          tout louange, ou tout correction — mais aucun des deux n&apos;est vrai jusqu&apos;au bout.
          Le bon retour nomme les deux choses, toujours de façon précise : « tu as gardé les bras
          tendus, c&apos;est nouveau et c&apos;est très bien — mais la tête est descendue un peu
          trop tôt, essaie de la garder haute un peu plus longtemps. »
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée</h2>
        {M_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 3 — mercredi : scènes + application + simulation Tommaso (deux essais)
  {
    day: "mercredi",
    pct: 46,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Un compliment vague s&apos;oublie</h1>
        <div className="card scene">
          <div className="who">Un enfant de 9 ans, « mais tu n&apos;es pas attentif ! »</div>
          <p>
            Il continue à tourner la tête trop tard. À la troisième fois, l&apos;instructeur dit «
            mais tu n&apos;es pas attentif ! » — l&apos;enfant se referme, ralentit. S&apos;il avait
            dit « tu as tourné la tête un instant après le bras — essaie de la tourner en même temps
            que le bras, pas après », l&apos;enfant aurait eu une information précise, sans
            étiquette à défendre.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un enfant de 11 ans, le plongeon parfait</div>
          <p>
            Il réussit pour la première fois un plongeon de départ correct. L&apos;instructeur,
            pressé, dit « bravo ! » sans s&apos;arrêter. L&apos;enfant ne saurait pas dire ce
            qu&apos;il a fait différemment — et au prochain départ il revient à l&apos;ancien
            mouvement. S&apos;arrêter trois secondes — « tu t&apos;es bien étiré sur les bras,
            c&apos;est ça qui a tout changé » — lui aurait dit quoi répéter.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un garçon de 16 ans</div>
          <p>
            Il vient d&apos;améliorer son temps sur un virage, après des semaines de retard sur le
            groupe. Au Chapitre 2 tu as déjà vu l&apos;erreur à éviter : traiter un adolescent avec
            un ton pour petit enfant le fait se sentir moqué. C&apos;est pour ça que
            l&apos;instructeur ne dit pas « bravo champion ! ». Il dit, sur un ton normal, presque
            technique : « tu as poussé avec les jambes un instant avant le contact, c&apos;est là
            que tu as gagné du temps. » Le garçon hoche la tête, ne sourit pas de façon démonstrative
            — mais la fois suivante il refait le même mouvement exprès.{" "}
            <strong>
              Précis fonctionne à tout âge — mais à 16 ans le ton avec lequel c&apos;est précis
              compte autant que le contenu : respectueux, pas façon supporter.
            </strong>
          </p>
        </div>
        <p className="lede">
          <strong>Trois scènes, la même règle : jamais une étiquette, jamais une louange générique
          — toujours le comportement précis, à tout âge.</strong>
        </p>
        <p className="prompt">
          Un enfant de 10 ans vient de réussir pour la première fois un plongeon de départ correct,
          après des semaines d&apos;essais. Écris le retour que tu lui donnerais — précis, sur le
          comportement.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : le système cherche un retour qui
            nomme précisément ce qui s'est passé, pas une louange générique. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>TOMMASO, 8 ans.</strong> Il vient de rater le même exercice pour la deuxième fois
          de suite. Que lui dis-tu ?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "persona" && (
          <div className="feedback retry">
            TOMMASO : <em>(baisse les yeux)</em> « ...désolé. » <em>(refait, exactement comme
            avant)</em>
            <br />
            Il s&apos;est excusé, mais n&apos;a reçu aucune information sur quoi changer.
          </div>
        )}
        {answers.sim === "comportamento" && (
          <div className="feedback ok">
            TOMMASO : « Ah, ok » <em>(réessaie, en changeant quelque chose)</em>
            <br />
            Il a reçu une consigne précise, et il l&apos;utilise.
          </div>
        )}
        {answers.sim && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Tommaso réessaie : les bras restent serrés plus longtemps, une vraie amélioration —
              mais maintenant c&apos;est la tête qui tourne un instant trop tôt, un nouveau détail,
              jamais corrigé avec lui auparavant.
            </p>
            <p className="prompt">Écris le retour que tu lui donnes maintenant.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                TOMMASO sourit, mais à l&apos;essai suivant la tête continue de tourner trop tôt —
                il ne sait pas qu&apos;il y a encore quelque chose à ajuster.
              </div>
            )}
            {answers.sim2 === "entrambe" && (
              <div className="feedback ok">
                TOMMASO : « ...ok, donc les bras ça va mais pas la tête » <em>(réessaie, cette fois
                attentif aux deux choses)</em>
              </div>
            )}
            <p className="lede" style={{ fontSize: ".85rem" }}>
              Le retour sur un essai à mi-chemin n&apos;est ni un compliment affaibli ni une
              correction déguisée en louange : ce sont deux informations vraies, dites toutes les
              deux, de façon précise.
            </p>
          </>
        )}
      </>
    ),
  },

  // 4 — mercredi soir : transfert de la règle au retour positif
  {
    day: "mercredi soir",
    pct: 62,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée — transfert</div>
        <h1>Même quand ça va bien</h1>
        <p className="lede">
          Une fillette de 7 ans vient de réaliser, pour la première fois, une entrée dans l&apos;eau
          sans s&apos;accrocher au bord. Tu n&apos;as pas encore décidé quoi lui dire.
        </p>
        <p className="prompt">Écris le compliment que tu lui ferais, précis, pas générique.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : ce n'est pas la scène déjà vue
            (qui portait sur une erreur, pas sur une réussite) — c'est voulu. Le système contrôle
            s'il applique la même règle de précision même quand le retour est positif, pas
            seulement quand il est correctif. */}
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
        <h1>Seulement le comportement, jamais la personne</h1>
        <p className="lede">
          Cette semaine, chaque retour que tu donnes — positif ou correctif — doit nommer un
          comportement précis, jamais la personne. Ni « bravo » ni « tu n&apos;es pas attentif » :
          seulement ce qui s&apos;est passé.
        </p>
      </>
    ),
  },

  // 6 — vendredi : test cumulatif Chapitre 6 + Chapitre 7
  {
    day: "vendredi · 11 min",
    pct: 86,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 6 + Chapitre 7</div>
        <h1>Le test</h1>
        {T_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
        <p className="prompt">
          10. Un garçon de 14 ans fait la même erreur technique pour la quatrième fois et commence à
          montrer de la frustration. Écris le retour que tu lui donnerais.
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
          Tu as répondu que c&apos;est la même chose. Relis-les : l&apos;une dit qui il est («
          distrait »), l&apos;autre dit ce qui s&apos;est passé à ce moment-là (« tu regardais par
          la fenêtre »). La seconde peut se corriger l&apos;instant d&apos;après. La première,
          répétée, devient quelque chose dont il est difficile de se défaire.
        </div>
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
        t1: "no", t2: "no", t3: "no", t4: "ripete", t5: "no",
        t6: "vuoto", t7: "entrambe", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Récupération — juste parce que le test a trouvé quelques difficultés</div>
        <h1>Trois exemples en plus, pour entraîner l&apos;œil</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de revoir
          le point le plus délicat de ce chapitre avec quelques exemples en plus — décrire le
          comportement, pas étiqueter la personne, et le dire de façon précise.
        </p>

        <div className="card scene">
          <div className="who">Un enfant de 8 ans, la glisse parfaite</div>
          <p>
            Pour la première fois il garde les bras bien tendus sur le dos. L&apos;instructeur lui
            dit seulement « bravo ! » et passe à l&apos;élève suivant. L&apos;enfant sourit, mais au
            bassin suivant il revient à l&apos;ancienne position.
          </p>
        </div>
        <p className="prompt">Qu&apos;a-t-il manqué, dans ce compliment ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Rien — l'enthousiasme du « bravo » suffit à le motiver", correct: false },
            {
              value: "cosa",
              label: "Savoir ce qu'il a fait exactement de différent — sans le savoir, il ne peut pas le répéter",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Une fillette de 10 ans, le plongeon à mi-chemin</div>
          <p>
            Dans le plongeon de départ, pour la première fois elle garde les bras bien tendus — une
            nouveauté. Mais elle décolle les pieds trop tôt, un défaut qu&apos;elle a depuis des
            semaines. L&apos;instructeur lui dit seulement « fais plus attention à tes pieds », en
            ignorant l&apos;amélioration.
          </p>
        </div>
        <p className="prompt">Que manque-t-il dans ce retour ?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "urgente",
              label: "C'est bien comme ça — corriger le défaut restant est la chose la plus urgente",
              correct: false,
            },
            {
              value: "entrambe",
              label:
                "Il manque de nommer aussi ce qui s'est amélioré — les bras tendus — pas seulement le défaut restant",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un garçon de 15 ans, la nage améliorée</div>
          <p>
            Après des semaines, il améliore enfin sa nage. L&apos;instructeur, tout excité, devant
            tout le groupe, lui crie sur un ton de supporter : « bravo champion, tu as super bien
            poussé avec les jambes ! »
          </p>
        </div>
        <p className="prompt">
          Le contenu est précis (« tu as super bien poussé avec les jambes »). Est-ce suffisant à cet
          âge ?
        </p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Oui — si le contenu est précis, le ton n'a pas d'importance", correct: false },
            {
              value: "no",
              label:
                "Non — à cet âge le ton compte autant que le contenu : mieux vaut un ton normal et respectueux, pas façon supporter",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Le comportement décrit avec précision laisse toujours quelque chose à répéter.
          L&apos;étiquette — bonne ou mauvaise — ne laisse rien à utiliser.
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
                <td style={{ padding: "6px 0" }}>Le retour écrit au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Comment tu as corrigé Tommaso au §8, dans les deux essais</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit du lundi sur le Chapitre 6</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Renforcement et correction</td>
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
        <div className="done-badge">✓ Chapitre 7 terminé</div>
        <div className="eyebrow">Semaine 7 sur 10 · Chapitre 8 à venir</div>
        <h1>Changer de cap</h1>
        <p className="lede">
          Aujourd&apos;hui tu as appris à donner un bon retour. La semaine prochaine tu apprends
          quoi faire quand, malgré tout, ce que tu dis ne fonctionne quand même pas.
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
          <div className="chip acquisita">
            <span className="name">7 · Le retour</span>
            <span className="state">acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Changer de cap</span>
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
