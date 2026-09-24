import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { VakBars } from "@/components/VakBars";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import { computeVak, VAK_NOUN_FR, VAK_ADJ_FR } from "@/lib/vak";
import type { Step, StepContext } from "@/lib/chapters/types";
import { computeVakProfile } from "@/lib/chapters/capitolo-1-actions";

// Traduction française, pas un chapitre indépendant : mêmes chapterId/clés de réponse/valeurs
// internes que le chapitre italien (src/lib/chapters/capitolo-1.tsx) — seul le texte visible
// change. Les value des options VAK ("mostra"/"dire"/"sentire") restent identiques dans toutes
// les langues : ce sont computeVak()/computeVakProfile() qui les comparent, pas du texte à
// traduire.

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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

const Q1_OPTIONS: Option[] = [
  { value: "vede", label: "Je le lui remontre" },
  { value: "dice", label: "Je le lui réexplique avec d'autres mots" },
  { value: "sente", label: "Je le prends par la main et je le lui fais sentir" },
  { value: "boh", label: "Je ne sais pas, ça dépend du moment" },
];

const V_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "v1",
    prompt: "1. Tu dois expliquer un mouvement nouveau. Que fais-tu en premier, instinctivement ?",
    options: [
      { value: "mostra", label: "Je le démontre moi-même, dans l'eau, avant de dire quoi que ce soit" },
      { value: "dire", label: "Je l'explique avec des mots, étape par étape" },
      { value: "sentire", label: "Je prends son bras et je lui fais sentir le mouvement" },
    ],
  },
  {
    key: "v2",
    prompt: "2. Tu repenses à un cours qui s'est bien passé. Qu'est-ce que tu retiens en premier ?",
    options: [
      { value: "mostra", label: "Comment l'élève se déplaçait — sa posture, son sillage dans l'eau" },
      { value: "dire", label: "Les mots qu'on s'est dits, le ton de la conversation" },
      { value: "sentire", label: "Ce que j'ai ressenti — l'énergie, la satisfaction physique de ce moment" },
    ],
  },
  {
    key: "v3",
    prompt: "3. Un collègue te demande conseil sur un exercice. Comment préfères-tu le lui expliquer ?",
    options: [
      { value: "mostra", label: "Je te le montre, viens dans l'eau avec moi" },
      { value: "dire", label: "Je te le raconte, asseyons-nous cinq minutes" },
      { value: "sentire", label: "Faisons-le ensemble, tu comprendras en l'essayant" },
    ],
  },
  {
    key: "v4",
    prompt: "4. Quand tu décris une erreur technique à un collègue, que fais-tu le plus souvent ?",
    options: [
      { value: "mostra", label: "Je dessine ou je mime le mouvement avec les mains" },
      { value: "dire", label: "Je le raconte avec des mots, précisément" },
      { value: "sentire", label: "Je le refais moi-même dans l'air, avec tout le corps" },
    ],
  },
  {
    key: "v5",
    prompt: "5. Un parent te demande comment son enfant progresse. Que fais-tu pour bien répondre ?",
    options: [
      { value: "mostra", label: "Je lui montre une vidéo, ou je le lui montre du bord du bassin la prochaine fois" },
      { value: "dire", label: "Je lui raconte avec des mots précis ce qui a changé" },
      { value: "sentire", label: "Je lui dis de descendre dans l'eau un instant avec son enfant, pour le sentir lui-même" },
    ],
  },
  {
    key: "v6",
    prompt: "6. Tu dois mémoriser une séquence d'étapes techniques pour un examen. Comment étudies-tu le mieux ?",
    options: [
      { value: "mostra", label: "En regardant des vidéos ou des images de la séquence" },
      { value: "dire", label: "En la répétant à voix haute, avec mes propres mots" },
      { value: "sentire", label: "En refaisant le geste avec le corps, même hors de l'eau" },
    ],
  },
];

const DIARY_KEYS = ["q2", "q7", "q8a", "q8b"];

export const capitolo1StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 1 · MOI</div>
        <h1>La communication, c&apos;est le résultat que tu obtiens</h1>
        <p className="lede">
          Ce qui compte, ce n&apos;est pas ce que tu voulais dire. C&apos;est ce qui est arrivé. Si
          un enfant ne fait pas ce que tu lui as demandé, la question utile n&apos;est pas
          « pourquoi il ne m&apos;écoute pas » — c&apos;est « comment puis-je le lui dire d&apos;une
          façon qui arrive ».
        </p>
        <p className="lede">
          Tout LA CLÉ JUSTE naît de cette seule phrase. Le reste, ce sont les moyens de la mettre
          en pratique.
        </p>
      </>
    ),
  },

  // 1 — lundi §2
  {
    day: "lundi · 7 min",
    pct: 10,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.q1,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Bienvenue dans LA CLÉ JUSTE</h1>
        <p className="lede">
          Deux questions — il n&apos;y a pas de bonne réponse, elles servent juste à te faire
          remarquer quelque chose sur toi, avant même de lire une ligne de théorie.
        </p>
        <p className="prompt">
          1. Quand un enfant ne comprend pas ce que tu lui as demandé, quelle est la première
          chose que tu fais, instinctivement ?
        </p>
        <OptionGroup name="q1" options={Q1_OPTIONS} selected={answers.q1} onPick={(v) => setResponse("q1", v)} />
        <p className="prompt">2. Et quand c&apos;est un adulte qui ne te comprend pas ? C&apos;est le même premier réflexe, ou c&apos;est différent ?</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <p className="lede" style={{ marginTop: 14, fontStyle: "italic" }}>
          Garde les deux en tête — le test de mercredi y revient aussi.
        </p>
      </>
    ),
  },

  // 2 — mardi explication + contrôle
  {
    day: "mardi · 13 min",
    pct: 22,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Connaître ta façon de communiquer</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Cette semaine, tu apprends une seule chose, mais c&apos;est celle sur laquelle repose
          tout le reste : connaître ta façon de communiquer, avant de t&apos;occuper de celle de
          l&apos;enfant.
        </p>
        <p className="lede">
          Ton cycle de travail part toujours du même point — pas de l&apos;enfant, de toi :{" "}
          <strong>
            moi → je reconnais l&apos;enfant → j&apos;observe → je me mets en phase → je communique
            → je le fais agir.
          </strong>
        </p>
        <p className="lede">
          Chacun a une façon préférée de se faire comprendre — l&apos;un montre, l&apos;autre
          explique avec des mots, un autre encore fait sentir le geste. Aucune n&apos;est
          mauvaise, mais si tu utilises toujours et seulement la même, le jour où elle ne
          fonctionne plus, tu n&apos;as pas de plan B.
        </p>
        <p className="lede">
          <strong>Ces trois façons ont aussi un nom technique, que tu retrouveras souvent à
          partir de maintenant : VAK.</strong>{" "}
          Le sigle vient de l&apos;anglais — <em>Visual, Auditory, Kinesthetic</em> — en français
          Visuel, Auditif, Kinesthésique (le sigle reste le même) : montrer = visuel, dire =
          auditif, faire sentir = kinesthésique. Tu utiliseras presque toujours les mots
          concrets, mais dès aujourd&apos;hui, quand tu lis « test VAK » ou « profil VAK », tu
          sais à quoi ça renvoie.
        </p>
        <div className="card quote">
          Le test ne te dit pas qui tu es. Il te montre une habitude. Tu ne trouveras jamais écrit
          « tu es visuel » — tu trouveras « ton profil montre une tendance vers le montrer ».
        </div>
        <p className="lede">
          <strong>Revenons à la deuxième question de lundi</strong> — celle sur l&apos;adulte.
          Pour beaucoup d&apos;instructeurs, le premier réflexe avec un collègue ou un parent est
          différent de celui avec un enfant : peut-être qu&apos;avec un enfant tu montres, et
          qu&apos;avec un adulte tu expliques avec des mots, par habitude sociale, pas par choix
          conscient. Ton profil VAK ne concerne pas seulement les enfants : c&apos;est le même
          automatisme que tu utilises avec n&apos;importe qui. Si avec les adultes tu évites un
          canal que tu utilises souvent avec les enfants — ou l&apos;inverse — ça veut dire une
          chose : cette habitude ne dépend pas que du bassin. C&apos;est un automatisme à toi, que
          tu portes partout avec toi.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée</h2>
        <p className="prompt">1. Le test VAK te dit qui tu es en tant qu&apos;instructeur ?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "Non — il te montre une habitude, pas une identité", correct: true },
            { value: "si", label: "Oui, c'est une photographie définitive", correct: false },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Si tu utilises toujours et seulement un canal, que se passe-t-il ?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "niente", label: "Rien, l'important est d'être clair", correct: false },
            { value: "terzo", label: "Le jour où cette façon ne fonctionne plus, tu n'as pas de plan B", correct: true },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">3. Ton automatisme communicatif concerne-t-il seulement ta façon de parler aux enfants dans le bassin ?</p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Oui, c'est spécifique au contexte du bassin", correct: false },
            { value: "no", label: "Non — c'est le même automatisme que tu utilises aussi avec les adultes, les collègues, les parents", correct: true },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercredi exemple + application
  {
    day: "mercredi · partie 1",
    pct: 34,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Trois tentatives, trois canaux</h1>
        <div className="card scene">
          <div className="who">Un instructeur, un enfant de 8 ans, la brasse</div>
          <p>
            L&apos;enfant n&apos;arrive pas à coordonner ses jambes. L&apos;instructeur refait la
            démonstration trois fois. Rien ne change. Il essaie de le lui dire avec des mots —
            « pousse comme si tu repoussais l&apos;eau ». L&apos;enfant réessaie : un peu mieux,
            mais encore incertain. Puis l&apos;instructeur lui prend les chevilles hors de l&apos;eau
            et les bouge lui-même, passivement : <strong>faire sentir</strong>. L&apos;enfant le
            refait, presque parfait, du premier coup.
          </p>
        </div>
        <p className="lede">
          Trois tentatives, trois canaux — seul le troisième a vraiment fonctionné.
          L&apos;instructeur ne s&apos;était pas trompé de méthode les deux premières fois : il
          avait juste utilisé, l&apos;un après l&apos;autre, ses deux canaux les plus confortables.
        </p>
        <div className="card scene">
          <div className="who">Le même instructeur, ce soir-là, avec un nouveau collègue</div>
          <p>
            Il doit lui expliquer comment organiser le matériel au bord du bassin avant un cours
            avec les petits. Il se met tout de suite à parler — il liste, décrit, précise chaque
            détail à voix haute. Le collègue acquiesce, mais dès le premier vrai cours, il oublie
            la moitié des choses. C&apos;est le même automatisme qu&apos;avant, mais inversé. Avec
            l&apos;enfant, l&apos;instructeur montre ou fait sentir d&apos;abord, et dit ensuite.
            Avec l&apos;adulte, il va droit au « dire » — un canal qu&apos;il utilise peu dans
            l&apos;eau, mais qui, avec les gens, hors de l&apos;eau, lui vient naturellement.
            Ce n&apos;est que lorsqu&apos;il lui montre physiquement où va chaque chose que le
            collègue s&apos;en souvient vraiment.
          </p>
        </div>
        <p className="lede">
          La même personne, deux canaux différents, selon le contexte — pas selon un choix
          conscient. C&apos;est exactement le type d&apos;automatisme que le test d&apos;aujourd&apos;hui
          commence à montrer.
        </p>
        <p className="prompt">
          Repense à la dernière fois où tu as dû expliquer quelque chose et que ça n&apos;est pas
          arrivé tout de suite. Qu&apos;as-tu fait en premier — montré, dit, ou guidé avec les
          mains ? Et le second réflexe était-il différent du premier, ou le même répété plus fort ?
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note de correction, non montrée à l'instructeur : il n'y a pas de bonne réponse. Le
            système ne regarde qu'une chose : si le second réflexe était différent du premier, ou
            s'il était le même répété plus fort. */}
      </>
    ),
  },

  // 4 — le vrai test VAK
  {
    day: "mercredi · le test",
    pct: 50,
    nextLabel: "Voir ton profil ▸",
    showBack: true,
    canNext: (a) => !!a.v1 && !!a.v2 && !!a.v3 && !!a.v4 && !!a.v5 && !!a.v6,
    onLeave: computeVakProfile,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi — le test</div>
        <h1>Le test VAK</h1>
        <p className="lede">
          Il n&apos;y a pas de bonnes ou de mauvaises réponses : chaque question demande ce que tu
          ferais — ou ce dont tu te souviens — en premier.
        </p>
        {V_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v) => setResponse(q.key, v)} />
          </div>
        ))}
        <p className="lede" style={{ fontStyle: "italic", fontSize: ".82rem" }}>
          Représentatif — l&apos;ensemble complet des questions arrive en phase technique.
        </p>
      </>
    ),
  },

  // 5 — mercredi : contrôle de fin de journée sur le résultat qui vient de sortir
  {
    day: "mercredi · sur ton résultat",
    pct: 62,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée — sur ton résultat</div>
          <h1>Regarde le profil qui vient de sortir</h1>
          <VakBars vak={vak} locale="fr" />
          <p className="prompt">
            Pense à un élève que tu suis depuis un moment : avec lui, quel est celui des trois
            canaux que tu utilises le moins — justement celui le plus bas dans ton profil ?
          </p>
          <Field id="q8a" value={answers.q8a ?? ""} onChange={(v) => setReflection("q8a", v)} />
          {/* Note de correction, non montrée à l'instructeur : ce n'est pas une question avec une
              bonne ou une mauvaise réponse : c'est la première fois que le profil touche un
              enfant réel, pas seulement la théorie. Le système enregistre s'il relie la donnée
              abstraite à une personne réelle — c'est exactement le pas nécessaire pour vraiment
              l'utiliser, et ne pas le laisser au stade d'un chiffre. */}
          <p className="prompt">
            Un petit pas de plus. Maintenant que tu as nommé ce canal, écris une situation
            concrète — la semaine prochaine, avec ce même élève — où tu essaieras de
            l&apos;utiliser exprès, même si ça ne te vient pas naturellement.
          </p>
          <Field id="q8b" value={answers.q8b ?? ""} onChange={(v) => setReflection("q8b", v)} />
          {/* Note de correction, non montrée à l'instructeur : le système ne juge pas s'il y
              parvient : il regarde seulement si la situation décrite est concrète (un moment
              précis, un exercice précis) et non générique (« j'essaierai plus souvent »). Une
              intention générique s'oublie au premier imprévu du cours — une intention concrète
              reste. */}
        </>
      );
    },
  },

  // 6 — vendredi synthèse (vrai profil)
  {
    day: "vendredi · 7 min",
    pct: 78,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => a.cv === "giusta",
    render: ({ answers, setResponse }: StepContext) => {
      const vak = computeVak(answers as never);
      const noun = VAK_NOUN_FR[vak.prevalente];
      const adj = VAK_ADJ_FR[vak.prevalente];
      const cvFeedback: ReactNode =
        answers.cv === "giusta" ? (
          <div className="feedback ok">Exactement — une habitude peut s&apos;élargir. Une étiquette, elle, reste collée.</div>
        ) : answers.cv === "sbagliata" ? (
          <div className="feedback retry">Ce n&apos;est pas mal d&apos;être court — c&apos;est faux de dire que c&apos;est qui tu es. Réessaie.</div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Vendredi</div>
          <h1>Ton profil</h1>
          <p className="lede">
            Voici comment se lit, et comment ne se lit pas, ton résultat — le vrai, tout juste
            calculé à partir de tes réponses.
          </p>
          <VakBars vak={vak} locale="fr" />
          <div className="card quote">
            Ton profil montre une tendance vers le <strong>{noun}</strong>. Ça ne veut pas dire
            que tu ne sais pas utiliser les autres canaux — ça veut dire que, sous pression,
            c&apos;est la première chose à laquelle tu penses.
          </div>
          <p className="prompt">Quelle phrase utiliserais-tu pour raconter ton résultat à un collègue ?</p>
          <OptionGroup
            name="cv"
            options={[
              {
                value: "giusta",
                label: `« Ton profil montre une tendance vers le ${noun} » — ça décrit une habitude`,
                correct: true,
              },
              { value: "sbagliata", label: `« Tu es un instructeur ${adj} » — c'est plus court`, correct: false },
            ]}
            selected={answers.cv}
            onPick={(v, correct) => setResponse("cv", v, correct)}
          />
          {cvFeedback}
        </>
      );
    },
  },

  // 7 — résultat + cours au bassin
  {
    day: "vendredi · résultat",
    pct: 92,
    nextLabel: "Aller au Tableau de bord ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow">§11 · Résultat</div>
          <h1>Ton profil se crée, aujourd&apos;hui</h1>
          <p className="lede">
            À partir de maintenant, chaque chapitre se termine par un tableau comme celui-ci :
            quatre photographies différentes de la même compétence, pas une note unique — combien
            tu sais (d&apos;après le test), combien tu sais l&apos;appliquer par écrit, comment tu
            t&apos;en sors dans une scène simulée, combien tu réfléchis sur un cours réel. Ils
            restent écrits avec leur nom technique, par transparence.
          </p>
          <div className="card">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Score</th>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>D&apos;où ça vient aujourd&apos;hui</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    application_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Ta réponse au §7 — as-tu changé de stratégie ou l&apos;as-tu répétée ?</td>
                  <td style={{ textAlign: "right" }}>enregistré ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    VAK — profil initial
                  </td>
                  <td style={{ padding: "6px 0" }}>Les réponses au test §8</td>
                  <td style={{ textAlign: "right" }}>{capitalize(VAK_NOUN_FR[vak.prevalente])} ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    reflection_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Pas encore — il n&apos;y a pas encore de cours réel à raconter</td>
                  <td style={{ textAlign: "right", color: "var(--ink-soft)" }}>pas encore</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton cours au bassin</h2>
          <p className="lede">
            Cette semaine, ne change rien. Compte seulement combien de fois tu expliques la même
            chose exactement de la même façon, à des enfants différents. Le nombre que tu trouves
            n&apos;est pas une note. C&apos;est un point de départ.
          </p>
          <p className="lede" style={{ fontStyle: "italic" }}>
            Si tu n&apos;as pas de cours cette semaine : fais le même exercice en repensant à la
            dernière semaine de travail dont tu te souviens bien.
          </p>
        </>
      );
    },
  },

  // 8 — tableau de bord
  {
    day: "tableau de bord",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="done-badge">✓ Chapitre 1 terminé</div>
          <div className="eyebrow">Semaine 1 sur 10 · Chapitre 2 à venir</div>
          <h1>Qui j&apos;ai en face de moi</h1>
          <p className="lede">
            Aujourd&apos;hui, tu t&apos;es regardé toi-même. La semaine prochaine, tu apprends à
            regarder l&apos;enfant que tu as en face de toi.
          </p>
          <h2>Ton profil VAK</h2>
          <VakBars vak={vak} locale="fr" />
          <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="fr" />
          <h2>Ton progrès</h2>
          <div className="chip-grid">
            <div className="chip in-sviluppo">
              <span className="name">1 · Conscience personnelle</span>
              <span className="state">en développement</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">2 · Reconnaissance de l&apos;élève</span>
              <span className="state">non acquise</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">3 · Observer et interpréter <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
              <span className="state">non acquise</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">4 · Mise en phase</span>
              <span className="state">non acquise</span>
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
      );
    },
  },
];
