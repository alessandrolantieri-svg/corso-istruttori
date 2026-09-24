import type { ReactNode } from "react";
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

const K1_OPTIONS: Option[] = [
  { value: "no", label: "Non — mieux vaut dire quoi faire : « regarde de côté quand tu respires »", correct: true },
  { value: "si", label: "Oui — c'est quand même clair, ça dit ce qu'il faut éviter", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Oui — c'est une donnée réelle, mesurée dans une étude célèbre", correct: false },
  { value: "no", label: "Non, c'est un chiffre sorti de son contexte", correct: true },
];
const K3_OPTIONS: Option[] = [
  { value: "corpo", label: "Au corps — c'est le signal le plus difficile à falsifier", correct: true },
  { value: "parole", label: "Aux mots — c'est le message explicite, donc le plus fiable", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "bersaglio", label: "Une cible", correct: true },
  { value: "ostacolo", label: "Un obstacle", correct: false },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Non — dans une vraie urgence, la clarté immédiate compte plus", correct: true },
  { value: "si", label: "Oui, la règle vaut toujours, même en urgence", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "sincero", label: "Comme un compliment sincère — les bons mots suffisent quand même", correct: false },
  { value: "abitudine", label: "Comme quelque chose dit par habitude, pas une vraie reconnaissance", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "no", label: "Non — il répond « oui » presque toujours, quoi qu'il arrive", correct: true },
  { value: "si", label: "Oui — si tu le demandes calmement, l'enfant répond honnêtement", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Je communique → il écoute → fin", correct: false },
  { value: "fa", label: "Je communique → il comprend → il agit", correct: true },
];
const M3_OPTIONS: Option[] = [
  { value: "secondo", label: "Tu regardes un deuxième essai, ou tu rends le premier plus explicite", correct: true },
  { value: "chiedo", label: "Tu redemandes « tu as compris ? » — ça suffit d'habitude à lever le doute", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "chiedo", label: "Tu lui demandes si elle a compris" },
  { value: "tentativo", label: "Tu lui demandes un premier essai bref, ou de te le montrer arrêtée au bord" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "riparte", label: "Tu donnes la correction et tu la laisses repartir, sans regarder l'essai suivant" },
  { value: "osservi", label: "Tu donnes la correction et tu observes l'essai suivant avant de la laisser continuer" },
];

const T1_OPTIONS: Option[] = [
  { value: "no", label: "Non — presque tout le monde répond « oui » quoi qu'il arrive", correct: true },
  { value: "si", label: "Oui — si on le demande avec attention, la réponse est fiable", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Je communique → l'enfant écoute → fin", correct: false },
  { value: "fa", label: "Je communique → il comprend → il agit", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "osservi", label: "Tu observes un premier essai bref", correct: true },
  { value: "parte", label: "Tu le laisses partir pour l'exercice complet", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "chiedo", label: "Lui demander s'il a compris, avec des mots simples", correct: false },
  { value: "compito", label: "Une petite tâche immédiate : « montre-moi maintenant »", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "parole", label: "Aux mots — c'est le message explicite, donc le plus fiable", correct: false },
  { value: "corpo", label: "Au corps — c'est le signal le plus difficile à falsifier", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Oui, l'important est d'essayer — l'erreur se corrige en chemin", correct: false },
  { value: "no", label: "Non — l'erreur se découvre plus tard, quand elle coûte plus cher à corriger", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "no", label: "Non — il faut toujours au moins une vraie séance en bassin, racontée et vérifiée", correct: true },
  { value: "si", label: "Oui, si les réponses sont correctes, le reste n'est qu'une formalité", correct: false },
];
const T8_OPTIONS: Option[] = [
  { value: "decidi", label: "Décider quand même, une information partielle suffit", correct: false },
  { value: "secondo", label: "Regarder un deuxième essai, ou rendre le premier plus explicite", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "si", label: "Oui, la correction seule suffit, pas besoin d'un autre contrôle", correct: false },
  { value: "no", label: "Non — même la correction doit être revérifiée par l'action", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo6StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 6 · LE FAIRE AGIR, ET VOIR SI LE MESSAGE EST PASSÉ <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>« Tu as compris ? » ne sert à rien. Et alors ?</h1>
        <p className="lede">
          L&apos;instructeur vérifie si un message est passé en observant si l&apos;enfant fait ce
          qu&apos;on lui a demandé — pas en lui demandant s&apos;il a compris.
        </p>
        <div className="card warn">
          <strong>Niveau plus élevé.</strong> Avec le Chapitre 3, c&apos;est l&apos;une des deux
          compétences de l&apos;écoute : ici, ACQUISE ne suffit pas, il faut atteindre{" "}
          <strong>EXCELLENT</strong> avant l&apos;examen final — et la simulation seule ne suffit
          jamais : il faut toujours au moins une vraie séance en bassin.
        </div>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 5
  {
    day: "lundi · 8 min",
    pct: 12,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé au bassin ?</h1>
        <p className="lede">
          La semaine dernière : une consigne en positif, dite en s&apos;arrêtant pour regarder
          l&apos;enfant. Qu&apos;as-tu remarqué dans sa réaction, par rapport à d&apos;habitude ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 5 revient</h2>
        <p className="prompt">1. « Ne laisse pas couler la tête » est-ce une bonne consigne ?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Les mots comptent pour 7 % de la communication — est-ce vrai en général ?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Si les mots et le corps se contredisent, l&apos;enfant croit...</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Une consigne en positif donne au corps une cible ou un obstacle ?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Dans une vraie urgence, est-ce une erreur de dire « stop ! » au lieu de reformuler en
          positif ?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Un garçon de 14 ans reçoit un compliment sincère, mais dit avec un ton mécanique et un
          corps distrait. Comment le vit-il le plus probablement ?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — mardi : je communique → il comprend → il agit
  {
    day: "mardi · 13 min",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Je communique → il comprend → il agit</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Tu as dit la bonne chose, de la bonne façon. Mais est-ce vraiment arrivé ? Aujourd&apos;hui
          tu apprends à le découvrir sans le demander.
        </p>
        <p className="lede">
          La vraie séquence n&apos;est pas « je communique → l&apos;enfant écoute ».{" "}
          <strong>L&apos;action est la preuve</strong>, pas l&apos;écoute. Et la question la plus
          utilisée pour vérifier — « tu as compris ? » — ne sert quasiment à rien : un enfant répond
          « oui » presque toujours, qu&apos;il ait compris ou non.
        </p>
        <div className="card quote">
          La bonne question ne se pose pas avec des mots : elle se pose avec les yeux. Tu donnes la
          consigne, et tu regardes ce qui se passe — pas s&apos;il hoche la tête, mais si le corps
          commence à faire ce que tu as demandé.
        </div>
        <p className="lede">
          <strong>Une exception utile :</strong> avec les plus petits (3-5 ans) tu peux transformer
          la vérification en une petite tâche immédiate — « montre-moi comment tu fais
          l&apos;étoile » — au lieu de demander s&apos;ils ont compris. C&apos;est toujours la même
          règle : tu vérifies avec l&apos;action, pas avec les mots.
        </p>
        <p className="lede">
          <strong>Et si le premier essai observé n&apos;est pas clair ?</strong> Parfois le
          mouvement que tu vois n&apos;est ni clairement juste ni clairement faux — tu n&apos;en as
          vu qu&apos;une partie, pas assez pour être sûr. Ce n&apos;est pas la faute de la méthode :
          regarde un deuxième essai, ou rends le premier un peu plus explicite (« refais-le, un peu
          plus lentement ») — ne redemande pas « tu as compris ? », et ne devine pas. Vérifier avec
          l&apos;action ne veut pas dire qu&apos;un seul regard suffit toujours : ça veut dire que
          c&apos;est toujours ce que tu vois qui décide — même s&apos;il faut parfois regarder deux
          fois avant d&apos;être sûr.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée</h2>
        <p className="prompt">1. « Tu as compris ? » est-il fiable parce que l&apos;enfant répond sincèrement ?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. La bonne séquence est :</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Le premier essai observé n&apos;est ni clairement juste ni clairement faux. Que
          fais-tu ?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — mercredi : scènes + application + simulation Sara
  {
    day: "mercredi",
    pct: 46,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback: ReactNode =
        answers.sim === "chiedo" ? (
          <div className="feedback retry">
            SARA : « Oui, j&apos;ai compris ! » <em>(elle part pour la glisse — les bras se plient
            tout de suite)</em>
            <br />
            Tu découvres l&apos;erreur plus tard, en plein milieu de l&apos;exercice.
          </div>
        ) : answers.sim === "tentativo" ? (
          <div className="feedback ok">
            SARA : <em>(elle essaie la position au bord — les bras sont déjà pliés)</em> « ...comme
            ça ? »
            <br />
            Tu le vois avant même qu&apos;elle parte — et tu peux corriger pendant que ça coûte
            encore peu.
          </div>
        ) : null;

      const sim2Feedback: ReactNode =
        answers.sim2 === "riparte" ? (
          <div className="feedback retry">
            SARA repart, et personne ne sait si l&apos;erreur s&apos;est vraiment corrigée avant
            qu&apos;elle soit de nouveau à mi-bassin — la correction, seule, n&apos;est pas encore
            une vérification.
          </div>
        ) : answers.sim2 === "osservi" ? (
          <div className="feedback ok">
            SARA essaie encore : les bras restent presque tendus. Maintenant tu le sais avec
            certitude — pas parce qu&apos;elle l&apos;a dit, mais parce que tu l&apos;as vu.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Mercredi</div>
          <h1>On regarde le corps, on n&apos;écoute pas la réponse</h1>
          <div className="card scene">
            <div className="who">Un enfant de 8 ans, « oui, j&apos;ai compris »</div>
            <p>
              Après l&apos;explication de la respiration latérale, il dit « oui, j&apos;ai compris »
              avec assurance. L&apos;instructeur le laisse partir pour tout le bassin. À mi-bassin il
              commence à boire la tasse, s&apos;arrête, tousse. S&apos;il avait regardé la première
              coulée de bras, il aurait vu qu&apos;il tournait la tête trop tard par rapport au bras
              — visible tout de suite, pas à mi-bassin. Le « oui » n&apos;était pas un mensonge :
              c&apos;était juste inutile comme information.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Emma, 4 ans</div>
            <p>
              L&apos;instructeur vient de lui montrer comment faire l&apos;étoile. Avec elle, ça
              n&apos;a pas de sens de demander « tu as compris ? » — il lui dit plutôt : «
              montre-la-moi, toi, maintenant, au bord. » Emma écarte bras et jambes, imparfaite mais
              dans la bonne direction — trois secondes, pas dix minutes.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Un garçon de 15 ans</div>
            <p>
              Il dit « oui, j&apos;ai compris, t&apos;inquiète » avec un ton un peu agacé, après
              l&apos;explication d&apos;un virage technique — à cet âge « tu as compris ? » peut
              sembler presque une insulte. L&apos;instructeur ne le répète pas, et ne lui demande
              même pas « montre-moi » comme à Emma : il lui propose, d&apos;égal à égal, « on fait un
              passage lent au bord avant de plonger, juste pour être sûrs du timing. » En le faisant
              lentement, le garçon hésite justement au point critique. Il n&apos;a pas été mis à
              l&apos;épreuve comme un enfant : on lui a offert une vérification déguisée en mise au
              point technique.
            </p>
          </div>
          <p className="lede">
            <strong>
              Même règle, trois tranches d&apos;âge différentes — seule la façon dont la demande est
              habillée pour l&apos;âge change.
            </strong>
          </p>
          <p className="prompt">
            Tu viens de donner une consigne à un enfant de 9 ans. Il hoche la tête et dit « oui,
            j&apos;ai compris ». Que fais-tu, avant de le laisser partir pour l&apos;exercice
            complet ?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Note pour la correction, non montrée à l'instructeur : le système cherche s'il propose
              un premier essai bref à observer, au lieu de faire confiance à la parole et de le
              laisser continuer pour l'exercice entier. */}
          <h2>Simulation</h2>
          <p className="lede">
            <strong>SARA, 10 ans.</strong> Tu viens de lui expliquer comment garder les bras tendus
            pendant la glisse. Que fais-tu pour vérifier si la consigne est passée ?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim && (
            <>
              <p className="lede" style={{ marginTop: 14 }}>
                Quel qu&apos;ait été ton premier choix, tu as maintenant vu l&apos;erreur : les bras
                de Sara sont pliés. Tu lui donnes une correction en positif, avec un ton et un corps
                cohérents.
              </p>
              <p className="prompt">
                Écris ce que tu fais juste après avoir donné la correction — pas seulement la
                correction elle-même.
              </p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {sim2Feedback}
            </>
          )}
        </>
      );
    },
  },

  // 4 — mercredi soir : transfert tranche 3-5 ans
  {
    day: "mercredi soir",
    pct: 62,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée — transfert</div>
        <h1>Tranche 3-5 ans, sans avoir encore rien essayé</h1>
        <p className="lede">
          Un enfant de 5 ans, tranche 3-5 ans, doit apprendre à souffler des bulles sous
          l&apos;eau. Tu n&apos;as encore rien essayé avec lui.
        </p>
        <p className="prompt">
          Comment vérifies-tu s&apos;il a compris, en respectant sa tranche d&apos;âge — sans lui
          demander « tu as compris ? »
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
      </>
    ),
  },

  // 5 — ton tour au bassin
  {
    day: "au bassin",
    pct: 69,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton tour au bassin</div>
        <h1>Un tour entier, sans « tu as compris ? »</h1>
        <p className="lede">
          Cette semaine, pendant un tour entier, ne demande « tu as compris ? » à personne. Donne la
          consigne et regarde l&apos;action. Rien d&apos;autre.
        </p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Si tu n&apos;as pas de tour cette semaine : une simulation renforcée débloque le passage,
          mais ça ne suffit pas pour amener cette compétence à EXCELLENT. Pour ça, tôt ou tard, il
          faut une vraie séance en bassin.
        </p>
      </>
    ),
  },

  // 6 — vendredi : test cumulatif Chapitre 5 + Chapitre 6
  {
    day: "vendredi · 11 min",
    pct: 86,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 5 + Chapitre 6</div>
        <h1>Le test</h1>
        <p className="prompt">1. « Tu as compris ? » est-elle une bonne question de vérification ?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. La bonne séquence est :</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Un enfant dit « j&apos;ai compris » avec assurance. Que fais-tu ?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Avec un enfant de 4 ans, la bonne vérification est :</p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(du Chapitre 5)</em> Quand les mots et le corps se contredisent, l&apos;enfant
          croit :
        </p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Faire confiance au « oui » au lieu de regarder l&apos;action est-ce une erreur neutre ?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Pour cette compétence, une bonne simulation suffit-elle pour EXCELLENT ?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Le premier essai observé n&apos;est pas clair. La bonne chose à faire est :</p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">9. Après avoir donné une correction, la vérification est-elle déjà complète ?</p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Un garçon de 13 ans dit « ok, j&apos;ai compris, allez on y va » avec un ton
          légèrement agacé. Écris en deux lignes ce que tu fais avant de le laisser partir.
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
          Exemple de retour généré, en cas d&apos;erreur à la question 3 :
        </p>
        <div className="card quote">
          Tu as répondu de le laisser partir. Mais « j&apos;ai compris » dit avec assurance
          n&apos;est pas une garantie — ce n&apos;est qu&apos;un mot. La différence entre découvrir
          une erreur au bord ou la découvrir à mi-bassin, c&apos;est un essai bref observé avant,
          qui coûte quelques secondes.
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
        t1: "no", t2: "fa", t3: "osservi", t4: "compito", t5: "corpo",
        t6: "no", t7: "no", t8: "secondo", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Récupération — juste parce que le test a trouvé quelques difficultés</div>
        <h1>Trois fois où faire confiance a coûté cher</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de revoir
          le point le plus délicat de ce chapitre avec quelques exemples en plus — faire confiance à
          la parole, ou faire confiance à la correction qu&apos;on vient de donner, au lieu de
          regarder ce qui se passe vraiment.
        </p>

        <div className="card scene">
          <div className="who">Un enfant de 9 ans, coudes bas au dos</div>
          <p>
            L&apos;instructeur explique comment garder les coudes hauts, puis demande « tu as
            compris ? ». L&apos;enfant répond « oui » avec assurance. Il le laisse partir pour tout
            le bassin — à mi-bassin, les coudes sont encore bas exactement comme avant : l&apos;erreur
            ne se voit que maintenant, quand elle a déjà coûté une demi-longueur.
          </p>
        </div>
        <p className="prompt">Qu&apos;aurait dû faire l&apos;instructeur avant de le laisser partir ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Rien — le « oui » était dit avec assurance, il suffisait de faire confiance", correct: false },
            {
              value: "tentativo",
              label: "Lui demander un essai bref à observer, avant tout le bassin",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Une correction donnée, puis laissée là</div>
          <p>
            L&apos;instructeur corrige la position de la tête d&apos;un élève — « garde-la un peu
            plus basse » — et se tourne aussitôt vers un autre enfant, sans regarder l&apos;essai
            suivant. Trois longueurs plus tard, la tête est encore dans la même position
            qu&apos;avant : personne ne s&apos;en était rendu compte.
          </p>
        </div>
        <p className="prompt">La correction, à elle seule, était-elle déjà une vérification ?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Oui — l'avoir bien dite suffit déjà", correct: false },
            {
              value: "no",
              label: "Non — il faut la voir refaire au moins une fois, sinon ça reste juste un mot dit",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">La même situation, cette fois bien gérée</div>
          <p>
            Une fille dit « j&apos;ai compris, t&apos;inquiète » avec un ton assuré, avant
            d&apos;essayer un virage aux drapeaux jamais fait. Cette fois l&apos;instructeur lui
            demande de le lui montrer lentement au bord d&apos;abord — et voit tout de suite
            qu&apos;elle se trompe sur le moment du virage, avant même de plonger.
          </p>
        </div>
        <p className="prompt">Pourquoi ça a fonctionné, cette fois ?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "azione",
              label: "Parce qu'il a regardé l'action au lieu de faire confiance à la parole",
              correct: true,
            },
            { value: "sincera", label: "Parce que cette fois la fille a dit la vérité", correct: false },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Le « oui » n&apos;est jamais la preuve. La preuve, c&apos;est toujours ce que le corps
          fait — la première fois que tu le regardes, et encore, la fois d&apos;après.
        </p>
      </>
    ),
  },

  // 9 — vendredi : résultat
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
                <td style={{ padding: "6px 0" }}>La réponse au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Comment tu as vérifié Sara au §8, correction comprise</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit du lundi sur le Chapitre 5</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Guider l&apos;action et vérifier</td>
                <td style={{ padding: "6px 0" }}>Le plus bas des précédents</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Pour cette compétence précise : le statut EXCELLENT ne s&apos;active pas sans au moins une
          vraie séance en bassin racontée et vérifiée. Aujourd&apos;hui elle reste ACQUISE.
        </p>
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
        <div className="done-badge">✓ Chapitre 6 terminé</div>
        <div className="eyebrow">Semaine 6 sur 10 · Chapitre 7 à venir</div>
        <h1>Le retour</h1>
        <p className="lede">
          Aujourd&apos;hui tu as appris à voir si quelque chose est passé. La semaine prochaine tu
          apprends quoi dire après — quand ça s&apos;est bien passé, et quand non.
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
          <div className="chip acquisita">
            <span className="name">6 · Vérifier par l&apos;action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">acquise</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · Le retour</span>
            <span className="state">non acquise</span>
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
