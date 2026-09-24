import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduction française, pas un chapitre indépendant : mêmes chapterId/clés de réponse/valeurs
// internes que le chapitre italien (src/lib/chapters/capitolo-5.tsx) — seul le texte visible
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

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo5StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 5 · LE MESSAGE ET LA CONSIGNE</div>
        <h1>Qu&apos;est-ce que je lui dis, et comment je le lui montre ?</h1>
        <p className="lede">
          L&apos;instructeur donne des consignes en positif — il dit quoi faire, pas quoi ne pas
          faire — et s&apos;assure que les mots, le ton et le corps disent la même chose.
        </p>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 4
  {
    day: "lundi · 8 min",
    pct: 12,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé dans le bassin ?</h1>
        <p className="lede">
          La semaine dernière : avec l&apos;enfant le plus fermé — ou le plus agité — du groupe,
          tu t&apos;es mis à son rythme pendant une minute avant de lui demander quoi que ce soit.
          Qu&apos;as-tu remarqué — chez lui, ou chez toi ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 4 revient</h2>
        <p className="prompt">1. Se mettre au rythme de l&apos;enfant vient-il avant ou après le guider ?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "prima", label: "Avant", correct: true },
            { value: "dopo", label: "Après", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un enfant euphorique : le premier geste est-il de le calmer tout de suite ?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Oui — si tu ne le calmes pas tout de suite, ça risque de t'échapper", correct: false },
            { value: "no", label: "Non — on suit d'abord un moment, puis on guide", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. La mise en phase sert-elle à se faire écouter ou à se faire apprécier ?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "ascoltare", label: "Se faire écouter — c'est une compétence professionnelle", correct: true },
            { value: "apprezzare", label: "Se faire apprécier — s'il aime bien l'instructeur, il écoute plus", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Se mettre au rythme ne fonctionne-t-il qu&apos;avec celui qui se ferme, jamais avec celui
          qui s&apos;excite ?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "vero", label: "Vrai — avec celui qui est déjà agité, le suivre l'agite davantage", correct: false },
            { value: "falso", label: "Faux — ça fonctionne pareil, à l'inverse, avec celui qui est agité", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">5. Un enfant qui te suivait bien se referme en milieu de cours. Que fais-tu ?</p>
        <OptionGroup
          name="k5"
          options={[
            { value: "torni", label: "Tu reviens en arrière d'un pas : tu retrouves son rythme", correct: true },
            { value: "insisti", label: "Tu insistes — jusqu'à il y a un instant tout allait bien", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Avec une adolescente distante, la mise en phase se construit-elle de la même façon
          qu&apos;avec un enfant de 6 ans ?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Oui, exactement de la même façon", correct: false },
            { value: "no", label: "Non — la forme change avec l'âge, l'ordre reste le même", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — mardi : explication + contrôle
  {
    day: "mardi · 13 min",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Une cible, pas un obstacle</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Maintenant qu&apos;il t&apos;écoute, ce que tu lui dis — et comment — fait toute la
          différence.
        </p>
        <p className="lede">
          <strong>La consigne en positif.</strong> « Ne plie pas les jambes » ne dit que ce
          qu&apos;il ne faut pas faire — et laisse tout le reste ouvert : l&apos;enfant pourrait
          les tenir raides comme une planche, ou ne pas les bouger du tout, et la consigne serait
          quand même « respectée ». Tu lui as retiré une seule chose à ne pas faire, parmi mille
          possibles, mais tu ne lui as pas dit quoi faire vraiment. « Jambes droites comme un
          bâton », au contraire, lui donne une seule chose précise à faire : c&apos;est le seul
          mouvement que le corps peut vraiment exécuter pour obéir.
        </p>
        <p className="lede">
          <strong>Une raison de plus, propre à l&apos;eau.</strong> Un mouvement s&apos;apprend
          mieux quand l&apos;attention porte sur ce qui doit se passer en dehors du corps —
          l&apos;eau à repousser, le mur à atteindre — pas sur quel muscle bouger : de nombreuses
          études le confirment, toujours de la même façon. « Repousse l&apos;eau vers
          l&apos;arrière » produit une meilleure nage que « tends le coude », même si les deux
          décrivent exactement le même mouvement.
        </p>
        <p className="lede">
          <strong>La cohérence entre les mots, la voix et le corps.</strong> Tu as peut-être
          entendu que les mots comptent pour 7 %, le ton pour 38 %, le corps pour 55 %. Ce
          n&apos;est pas vrai — cette étude portait sur un cas très restreint : des personnes qui
          écoutaient un seul mot prononcé de différentes façons et devaient deviner un sentiment,
          pas la communication en général. Si c&apos;était vrai, tu pourrais enseigner la natation
          dans une langue inconnue et ça marcherait quand même 93 % du temps — ce n&apos;est pas le
          cas.
        </p>
        <div className="card quote">
          Quand les mots disent une chose et le corps en dit une autre, l&apos;enfant croit le
          corps — pas parce qu&apos;il « compte plus » en général, mais parce que les mots se
          contrôlent facilement, alors que le corps non : il est plus difficile de le simuler.
        </div>
        <p className="lede">
          <strong>Et quand l&apos;interdit semble inévitable ?</strong> Dans une vraie urgence —
          un enfant qui court vers un bord glissant — un « stop ! » sec est le bon geste : personne
          ne s&apos;arrête pour reformuler en positif. En dehors de ça, si tu as ne serait-ce
          qu&apos;une seconde pour choisir tes mots, ça vaut la peine de la consacrer à une cible
          plutôt qu&apos;à un interdit.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée</h2>
        <p className="prompt">1. « Ne plie pas les jambes » donne-t-il au corps une cible ou un obstacle ?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "bersaglio", label: "Une cible — ça indique quand même quelle jambe bouger", correct: false },
            { value: "ostacolo", label: "Un obstacle à éviter — moins efficace qu'une cible", correct: true },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Pourquoi le corps « gagne »-t-il sur les mots quand ils se contredisent ?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "falsificare", label: "Parce qu'il est plus difficile à simuler", correct: true },
            { value: "conta", label: "Parce qu'il compte plus, dans l'absolu", correct: false },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Dans une vraie urgence — un enfant qui court vers un bord glissant — est-il quand même
          faux de dire « stop ! » au lieu de reformuler en positif ?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "si", label: "Oui, la règle s'applique toujours, même en urgence", correct: false },
            { value: "no", label: "Non — dans une vraie urgence, la clarté immédiate compte plus", correct: true },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercredi : trois scènes + transfert + simulation à embranchement
  {
    day: "mercredi",
    pct: 47,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "generico" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Trois secondes alignées</h1>
        <div className="card scene">
          <div className="who">« Bravo ! », dit en regardant sa montre</div>
          <p>
            Un instructeur dit « bravo ! » à un enfant — mais en regardant sa montre, voix plate,
            déjà tourné vers le suivant. L&apos;enfant entend le bon mot, mais ne se sent pas
            encouragé : il a senti que l&apos;attention était déjà ailleurs.
          </p>
          <p>
            <strong>Corrigé :</strong> l&apos;instructeur s&apos;arrête une seconde, se retourne,
            regarde l&apos;enfant, dit « bravo » avec un ton qui monte. Trois secondes, pas trente
            — mais toutes les trois alignées.
          </p>
        </div>
        <div className="card scene">
          <div className="who">« Ne plonge pas la tête », répété sans effet</div>
          <p>
            Un enfant de 7 ans continue à plonger la tête, malgré l&apos;instructeur qui répète
            « ne plonge pas la tête ». L&apos;instructeur change la phrase, pas le ton : « garde
            une oreille dedans et une dehors, comme si tu écoutais aux portes. » À la brasse
            suivante, la tête reste plus haute.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un jeune de 14 ans</div>
          <p>
            Il vient d&apos;améliorer beaucoup son temps sur une longueur. L&apos;instructeur dit
            « bon travail », mais bras croisés, regard déjà sur le chronomètre, ton mécanique. Le
            jeune baisse les yeux, s&apos;éloigne sans expression : à 14 ans, un compliment dit
            comme ça ressemble à une phrase dite par habitude, sans y penser — pas une vraie
            reconnaissance — et ça brûle plus que le silence. La fois suivante, l&apos;instructeur
            se corrige : il s&apos;arrête, le regarde dans les yeux, dit « tu as coupé trois
            secondes, tu l&apos;as senti toi aussi ? » — cette fois le jeune sourit à peine, parce
            que cette fois l&apos;instructeur était vraiment là.
          </p>
        </div>
        <p className="lede">
          <strong>
            Trois scènes, la même règle en dessous : les mots ouvrent la porte, mais c&apos;est la
            cohérence avec la voix et le corps qui la maintient ouverte — à 7 ans comme à 14.
          </strong>
        </p>
        <p className="prompt">Réécris en positif : « Ne plonge pas la tête quand tu respires. »</p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note de correction, non montrée à l'instructeur : le système cherche une consigne qui
            décrit quoi faire — pas une version plus polie du même interdit. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>DAVIDE, 9 ans.</strong> Il vient de terminer pour la première fois une longueur
          entière en brasse. Que lui dis-tu ?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "generico", label: "« Bravo, allez on continue » — à la va-vite" },
            {
              value: "specifico",
              label: "Tu t'arrêtes, tu le regardes : « tu t'es arrêté pour respirer sans plonger, tu l'as fait tout seul »",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "generico" && (
          <div className="feedback retry">
            DAVIDE : <em>(s&apos;éloigne, ne semble pas particulièrement satisfait)</em> « ...ok. »
          </div>
        )}
        {answers.sim === "specifico" && (
          <div className="feedback ok">
            DAVIDE : <em>(sourit, reste là un instant de plus)</em> « ...vraiment ? Je l&apos;ai
            bien fait ? »
            <br />
            Ce n&apos;est pas la longueur de la phrase qui fait la différence : c&apos;est la
            précision, et le fait de t&apos;être arrêté.
          </div>
        )}
        {answers.sim === "specifico" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Un instant après, Davide repart pour un deuxième tour — mais cette fois il plie trop
              les bras, une erreur technique nouvelle, jamais corrigée avec lui avant.
            </p>
            <p className="prompt">
              Écris la consigne que tu lui donnes maintenant — en positif, ton et corps cohérents.
            </p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "negativo", label: "Tu reviens à une consigne en négatif, ou tu la dis distraitement" },
                { value: "positivo", label: "Tu donnes une image positive, en t'arrêtant pour le regarder" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "negativo" && (
              <div className="feedback retry">
                DAVIDE réessaie, mais l&apos;erreur reste identique — il n&apos;a pas reçu de
                cible à atteindre, juste un autre interdit.
              </div>
            )}
            {answers.sim2 === "positivo" && (
              <div className="feedback ok">
                DAVIDE tend les bras un peu plus loin à la tentative suivante — petit progrès,
                mais dans la bonne direction.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — mercredi soir : transfert sur erreur nouvelle
  {
    day: "mercredi soir",
    pct: 63,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée — transfert</div>
        <h1>Une erreur jamais rencontrée avant</h1>
        <p className="lede">
          Un enfant continue à garder les doigts écartés pendant la nage, au lieu de les tenir
          serrés. Tu dois lui donner une consigne nouvelle — tu n&apos;as encore rien essayé avec
          lui.
        </p>
        <p className="prompt">
          Écris la consigne, en positif, et essaie d&apos;imaginer comment tu la dirais — ton et
          corps compris — pour que tous les trois soient cohérents.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note de correction, non montrée à l'instructeur : ce n'est pas un des exemples déjà
            vus — c'est voulu. Le système vérifie s'il applique la règle à une erreur technique
            jamais rencontrée dans le chapitre, pas seulement s'il se souvient des phrases déjà
            lues. */}
      </>
    ),
  },

  // 5 — dans le bassin
  {
    day: "dans le bassin",
    pct: 70,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton cours au bassin</div>
        <h1>Une consigne, en t&apos;arrêtant pour regarder</h1>
        <p className="lede">
          Cette semaine, donne une seule consigne en positif — dis quoi faire, jamais quoi ne pas
          faire — et arrête-toi une seconde en la disant : regarde l&apos;enfant, pas ta montre,
          pas le groupe.
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
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 4 + Chapitre 5</div>
        <h1>Le test</h1>
        <p className="prompt">1. « Ne plie pas les jambes » est-elle une bonne consigne ?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "no", label: "Non — mieux vaut dire quoi faire", correct: true },
            { value: "si", label: "Oui, c'est clair — ça dit quand même quoi éviter", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Est-il vrai que les mots ne comptent que pour 7 % de la communication ?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "si", label: "Oui, c'est une loi générale", correct: false },
            { value: "no", label: "Non — cette étude portait sur un cas très spécifique", correct: true },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Quand les mots et le corps disent des choses différentes, l&apos;enfant croit quoi ?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "parole", label: "Les mots — ce sont le message explicite, donc le plus fiable", correct: false },
            { value: "corpo", label: "Le corps — c'est le signal le plus difficile à simuler", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Une consigne en positif donne-t-elle au corps une cible ou un obstacle ?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "bersaglio", label: "Une cible", correct: true },
            { value: "ostacolo", label: "Un obstacle", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(du Chapitre 4)</em> Se mettre au rythme vient-il avant de guider ?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Oui", correct: true },
            { value: "no", label: "Non", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. « Bravo » dit d&apos;une voix plate, en regardant ailleurs, fonctionne-t-il comme
          encouragement ?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Non — l'enfant sent que l'attention était ailleurs", correct: true },
            { value: "si", label: "Oui, le mot compte quand même", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Dans une vraie urgence, est-il faux de dire « stop ! » au lieu de reformuler en
          positif ?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Oui, la règle s'applique toujours", correct: false },
            { value: "no", label: "Non — dans une vraie urgence, la clarté immédiate compte plus", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un jeune de 14 ans reçoit un compliment vrai mais dit d&apos;un ton mécanique, bras
          croisés, regard ailleurs. Comment le vit-il le plus probablement ?
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "abitudine", label: "Comme quelque chose dit par habitude, pas une vraie reconnaissance", correct: true },
            { value: "sincero", label: "Comme un compliment sincère, les mots suffisent", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Un encouragement précis bien donné sur une erreur « vaut »-il aussi pour l&apos;erreur
          technique suivante, dans la même minute ?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Oui, l'effet s'étend automatiquement", correct: false },
            { value: "no", label: "Non — chaque nouvelle consigne doit être construite de nouveau, positive et cohérente", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Tu dois corriger un enfant de 8 ans qui plie les coudes de façon incorrecte pendant
          la nage. Écris la consigne, en positif, en une seule phrase.
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
          Exemple de feedback généré, en cas d&apos;erreur à la question 2 :
        </p>
        <div className="card quote">
          Tu as répondu que les mots ne comptent vraiment que pour 7 %. Ce chiffre circule
          énormément, mais il vient d&apos;une étude sur un cas très restreint — ce n&apos;est pas
          une loi générale de la communication. Ce qui est vrai, et utile, c&apos;est autre chose :
          quand les mots et le corps se contredisent, c&apos;est le corps qui gagne.
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
        t1: "no", t2: "no", t3: "corpo", t4: "bersaglio", t5: "si",
        t6: "no", t7: "no", t8: "abitudine", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Rattrapage — seulement parce que le test a repéré des difficultés</div>
        <h1>Trois phrases en négatif, vraiment réécrites</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine
          d&apos;entraîner encore l&apos;automatisme le plus délicat de ce chapitre — parce
          qu&apos;adoucir un interdit n&apos;est pas la même chose que donner une cible.
        </p>

        <div className="card scene">
          <div className="who">Un enfant sur le dos, la tête qui glisse en arrière</div>
          <p>
            L&apos;instructeur a répété pendant deux cours « ne rejette pas la tête en arrière »
            — rien ne change. Essaie de la reformuler en positif.
          </p>
        </div>
        <p className="prompt">Laquelle des deux donne vraiment une cible, et pas juste un interdit plus gentil ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "morbida", label: "« Essaie de ne pas trop la rejeter en arrière »", correct: false },
            {
              value: "mento",
              label: "« Menton vers la poitrine, regarde tes orteils »",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Une fille en brasse, les jambes raides en ciseaux</div>
          <p>
            L&apos;instructeur a dit « ne garde pas les jambes raides » trois fois de suite — les
            jambes restent identiques.
          </p>
        </div>
        <p className="prompt">Laquelle des deux fonctionne le mieux ?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "irrigidire", label: "« Essaie de ne pas trop les raidir »", correct: false },
            {
              value: "pedala",
              label: "« Jambes souples, comme si tu pédalais doucement à vélo »",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un garçon en crawl, essoufflé à mi-bassin</div>
          <p>
            Il retient son souffle pendant des brasses entières, puis émerge en haletant.
            L&apos;instructeur a essayé « ne retiens pas ton souffle » — aucun changement.
          </p>
        </div>
        <p className="prompt">Quelle phrase lui donne une cible à atteindre, pas juste un interdit ?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "trattenerlo", label: "« Essaie de ne pas le retenir trop longtemps »", correct: false },
            {
              value: "candela",
              label: "« Souffle doucement sous l'eau, comme si tu soufflais sur une bougie au loin »",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Une phrase en positif n&apos;est pas juste une version plus gentille de l&apos;interdit :
          c&apos;est une cible différente, vers laquelle le corps se dirige tout seul.
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
                <td style={{ padding: "6px 0" }}>La consigne réécrite au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>La façon dont tu as parlé à Davide au §8, dans les deux moments</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit de lundi sur le Chapitre 4</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Consignes et congruence</td>
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
        <div className="done-badge">✓ Chapitre 5 terminé</div>
        <div className="eyebrow">Semaine 5 sur 10 · Chapitre 6 à venir</div>
        <h1>Le faire agir, et voir si ça a marché</h1>
        <p className="lede">
          Aujourd&apos;hui, tu as appris à bien dire les choses. La semaine prochaine, tu apprends
          que ça ne suffit pas : la communication ne s&apos;arrête pas quand l&apos;enfant écoute,
          elle s&apos;arrête quand il agit.
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
          <div className="chip consolidata">
            <span className="name">4 · Mise en phase</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip acquisita">
            <span className="name">5 · Consignes et congruence</span>
            <span className="state">acquise</span>
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
