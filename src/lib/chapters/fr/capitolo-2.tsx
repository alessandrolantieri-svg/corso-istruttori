import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduction française, pas un chapitre indépendant : mêmes chapterId/clés de réponse/valeurs
// internes que le chapitre italien (src/lib/chapters/capitolo-2.tsx) — seul le texte visible
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

const DIARY_KEYS = ["q2", "q7", "q7b", "q13", "t10"];

export const capitolo2StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 2 · QUI J&apos;AI EN FACE DE MOI</div>
        <h1>Ce qui change entre un enfant de 4 ans et un jeune de 15 ans</h1>
        <p className="lede">
          L&apos;instructeur reconnaît la tranche d&apos;un élève à sa façon de répondre — pas à
          l&apos;âge inscrit sur sa carte d&apos;identité — et choisit en conséquence le premier
          mot à utiliser.
        </p>
      </>
    ),
  },

  // 1 — lundi : activation + consolidation Chap1
  {
    day: "lundi · 10 min",
    pct: 12,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Bon retour. Comment ça s&apos;est passé dans le bassin ?</h1>
        <p className="lede">
          La semaine dernière, je t&apos;ai demandé une seule chose : compter combien de fois, dans
          un cours, tu expliques la même chose exactement de la même façon.
        </p>
        <p className="prompt">
          Combien de fois l&apos;as-tu comptée ? Et, en y repensant : y a-t-il eu un moment où
          changer de méthode aurait peut-être mieux fonctionné ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 1 revient</h2>
        <p className="prompt">1. Le test VAK te dit qui tu es en tant qu&apos;instructeur ?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Non — il te montre une habitude, pas une identité", correct: true },
            { value: "si", label: "Oui, c'est un diagnostic fiable", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Ton canal le moins utilisé est celui...</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "evita", label: "Que tu n'as pas besoin d'apprendre", correct: false },
            {
              value: "allena",
              label: "Que tu risques d'oublier sous pression — celui à entraîner",
              correct: true,
            },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">
          3. Si une façon d&apos;expliquer ne fonctionne pas, la bonne réaction est-elle de la
          répéter plus lentement ?
        </p>
        <OptionGroup
          name="k3"
          options={[
            { value: "falso", label: "Faux — on change de canal, on ne ralentit pas le même", correct: true },
            { value: "vero", label: "Vrai — répéter plus lentement aide à mieux se faire comprendre", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. Dans l&apos;exemple de l&apos;enfant de 8 ans et de la brasse, quel canal a
          fonctionné en dernier ?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "mostra", label: "Montrer", correct: false },
            { value: "dice", label: "Dire", correct: false },
            { value: "sente", label: "Faire sentir — seulement après avoir essayé les deux autres", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Dans cet exemple, l&apos;instructeur s&apos;était-il trompé les deux premières fois
          qu&apos;il a essayé ?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "si", label: "Oui, il a perdu du temps pour rien", correct: false },
            {
              value: "no",
              label:
                "Non — il a juste utilisé, l'un après l'autre, ses deux canaux les plus confortables, avant d'arriver au bon",
              correct: true,
            },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Ton profil VAK montre un score élevé sur « Dire » : ça veut dire que tu ne dois
          jamais utiliser « Montrer » ?
        </p>
        <OptionGroup
          name="k6"
          options={[
            {
              value: "no",
              label: "Non — ça veut juste dire que tu risques de l'oublier sous pression, pas qu'il faille l'éviter",
              correct: true,
            },
            { value: "si", label: "Oui, mieux vaut rester sur ton canal fort", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — mardi : le tableau des tranches
  {
    day: "mardi · 15 min",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3 && !!a.c4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Pas l&apos;âge. La tranche.</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Cette semaine, tu apprends à reconnaître non pas l&apos;âge d&apos;un enfant, mais sa
          tranche — et ce sont deux choses différentes.
        </p>
        <p className="lede">
          Un enfant de 6 ans et un de 9 ans sont dans la même tranche. Un de 10 ans et un de 11
          ans, non. Les frontières ne suivent pas la date d&apos;anniversaire : elles suivent ce
          qu&apos;un enfant peut vraiment faire avec les mots que tu lui donnes.
        </p>
        <div className="table-wrap">
          <table className="fasce">
            <tbody>
              <tr>
                <th>Tranche</th>
                <th>Ce qui change vraiment</th>
              </tr>
              <tr>
                <td>3-5</td>
                <td>
                  Une chose à la fois. Une consigne en deux étapes se perd souvent en cours de
                  route. Le jeu est le langage lui-même.
                </td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>
                  Commence à suivre deux étapes en séquence. Le « bravo » fonctionne encore,
                  simple et direct.
                </td>
              </tr>
              <tr>
                <td>11-13</td>
                <td>
                  La gêne devant le groupe apparaît — une correction dite à voix haute peut fermer
                  un jeune pour le reste du cours.
                </td>
              </tr>
              <tr>
                <td>14-18</td>
                <td>
                  Exige le pourquoi. Une consigne sans raison n&apos;est pas exécutée : elle est
                  discutée, ou ignorée.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Reconnais la tranche à sa façon de te répondre, pas à son âge. C&apos;est la seule chose
          que tu dois vraiment apprendre aujourd&apos;hui.
        </div>
        <p className="lede">
          Se tromper de tranche coûte dans les deux sens : traiter un enfant de treize ans comme
          un petit le fait se sentir moqué ; traiter un enfant de sept ans comme un grand le perd
          en cours de phrase.
        </p>
        <p className="lede">
          <strong>
            Une chose qu&apos;il vaut la peine de savoir tout de suite, et qui complique un peu le
            tableau — exprès.
          </strong>{" "}
          La tranche n&apos;est pas une donnée fixe, même pour un même enfant. Un jeune de 13 ans,
          seul avec toi, sans le groupe qui regarde, peut sembler une autre personne : plus
          ouvert, plus à l&apos;aise. Tu ne t&apos;étais pas trompé en le jaugeant la semaine
          dernière. C&apos;est le contexte qui a changé, pas lui. Un enfant de 9 ans très sûr de
          lui peut déjà montrer, dans certaines situations, la gêne typique des 11-13 ans. Le
          tableau te dit où regarder. L&apos;enfant que tu as devant toi à ce moment-là te donne
          la vraie réponse.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée</h2>
        <p className="prompt">
          1. Un enfant de 6 ans arrive-t-il à suivre une consigne en deux étapes d&apos;affilée ?
        </p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "Non, jamais avant 10 ans", correct: false },
            { value: "si", label: "Oui — à 6 ans, il commence tout juste à y arriver", correct: true },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Qu&apos;est-ce qui change vraiment pour un jeune de 15 ans par rapport à un de 10 ans ?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "perche", label: "Il exige le pourquoi — une consigne sans raison, il ne l'exécute pas", correct: true },
            { value: "parole", label: "Il comprend des mots plus difficiles", correct: false },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">
          3. Un jeune de 13 ans, sans le groupe autour, se comporte plus « comme un petit » que
          d&apos;habitude, ouvert et sans gêne. Est-ce une contradiction ?
        </p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Oui, ça veut dire que tu t'étais trompé sur sa tranche d'âge", correct: false },
            {
              value: "no",
              label: "Non — la tranche d'âge se lit aussi au contexte : sans le groupe, la gêne pèse beaucoup moins",
              correct: true,
            },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
        <p className="prompt">
          4. Un enfant de 9 ans très sûr de lui peut-il déjà montrer, dans certaines situations,
          des réactions typiques de la tranche 11-13 ?
        </p>
        <OptionGroup
          name="c4"
          options={[
            {
              value: "si",
              label: "Oui — les frontières sont indicatives : on lit la réponse, pas l'état civil",
              correct: true,
            },
            { value: "no", label: "Non, jamais avant 10 ans révolus", correct: false },
          ]}
          selected={answers.c4}
          onPick={(v, correct) => setResponse("c4", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercredi : exemple + application + simulation
  {
    day: "mercredi · 20 min",
    pct: 55,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "pubblico" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Quatre enfants, quatre tranches, la même attention</h1>
        <div className="card scene">
          <div className="who">Sofia, 5 ans</div>
          <p>
            Elle glisse mal sur le dos. Au lieu d&apos;une longue correction technique,
            l&apos;instructeur dit : « fais l&apos;étoile de mer ! » — une image, un seul mot.
            Sofia écarte les bras et le corps s&apos;étire tout seul.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Tommaso, 9 ans</div>
          <p>
            Il doit apprendre une entrée en deux temps. L&apos;instructeur donne la consigne
            entière, d&apos;un coup : « d&apos;abord tu tends les bras, puis tu pousses avec les
            jambes. » Tommaso l&apos;exécute dans l&apos;ordre — à 5 ans, ç&apos;aurait été
            presque impossible, à 9 ans c&apos;est déjà normal.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Giacomo, 12 ans</div>
          <p>
            Il se trompe dans un exercice technique. Par habitude, l&apos;instructeur dit devant
            tout le groupe : « Giacomo, regarde comme tu es tout tordu, détends le dos ! »
            Giacomo rougit, se raidit, et évite l&apos;exercice pour le reste du cours.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Andrea, 16 ans</div>
          <p>
            Il apprend un virage plus technique que celui qu&apos;il utilisait jusque-là. Par
            l&apos;habitude prise avec les plus petits, l&apos;instructeur lui montre le mouvement
            et se contente de dire « fais comme ça ». Andrea l&apos;essaie mécaniquement, puis
            demande : « mais pourquoi on fait comme ça, l&apos;autre façon n&apos;était pas plus
            rapide ? » L&apos;instructeur ajoute, en deux phrases, pourquoi cette technique fait
            gagner du temps justement là où lui en perd. Andrea acquiesce, et cette fois s&apos;y
            investit vraiment.
          </p>
        </div>
        <p className="lede">
          Le même respect, appliqué de quatre façons opposées — avec Giacomo, il suffisait de
          s&apos;approcher et de dire la même chose à lui seul ; avec Andrea, il suffisait
          d&apos;ajouter le pourquoi que sa tranche exige.
        </p>
        <p className="prompt">
          Giacomo répète la même erreur. Le groupe est proche et peut entendre. Réécris la
          correction — même contenu technique, mais de la bonne façon pour sa tranche.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note de correction, non montrée à l'instructeur : le système cherche deux choses —
            que la correction reste privée (tu t'approches, tu baisses la voix, tu ne cries pas de
            loin) et qu'elle ne vise pas la personne (« tu es tout tordu ») mais le comportement
            (« ton dos se plie »). */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>GIACOMO, 12 ans.</strong> Il vient de refaire la même erreur. Le groupe est
          proche. Que fais-tu ?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "pubblico", label: "Je le lui dis à voix haute, d'où je suis — c'est quand même juste" },
            { value: "privato", label: "Je m'approche et je le lui dis à voix basse, à lui seul" },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "pubblico" && (
          <div className="feedback retry">
            GIACOMO : <em>(ne répond pas, regarde ailleurs, les épaules se serrent)</em> « ...ok. »{" "}
            <em>(l&apos;exercice s&apos;arrête là pour aujourd&apos;hui)</em>
            <br />
            Même contenu, mais de loin et devant tout le monde — à cette tranche d&apos;âge, ça
            coûte plus que ça n&apos;en a l&apos;air.
          </div>
        )}
        {answers.sim === "privato" && (
          <div className="feedback ok">
            GIACOMO : <em>(réessaie tout de suite, sans attendre)</em> « ...ah, ok, je vais
            essayer. »
            <br />
            Même erreur, même correction — seul change où et comment tu l&apos;as dite.
          </div>
        )}
        {answers.sim === "privato" && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Giacomo réessaie. Le mouvement s&apos;améliore, mais n&apos;est pas encore parfait.
              Il se tourne vers toi, pas tout à fait sûr : « ...c&apos;est déjà mieux, non ? »
            </p>
            <p className="prompt">Écris ce que tu lui réponds maintenant.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "specifico", label: "« Oui — tes épaules sont déjà plus basses, on voit la différence »" },
                { value: "generico", label: "« Bravo, allez, continue comme ça »" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "specifico" && (
              <div className="feedback ok">
                GIACOMO s&apos;illumine un peu, et réessaie avec plus de confiance — il sait
                exactement ce qui a fonctionné, pas seulement que « ça va mieux ».
              </div>
            )}
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                GIACOMO acquiesce, mais le doute reste le même : il ne sait pas exactement ce qui
                s&apos;est amélioré, donc il ne sait pas quoi répéter exprès à l&apos;essai
                suivant.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — cours au bassin
  {
    day: "au bassin",
    pct: 62,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton cours au bassin</div>
        <h1>Devine la tranche, avant de regarder l&apos;âge</h1>
        <p className="lede">
          Cette semaine, choisis un élève et essaie de deviner sa tranche à sa façon de te
          répondre — pas à l&apos;âge que tu connais déjà. Ensuite, seulement après, vérifie si tu
          avais raison.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Pas besoin de trouver juste. Il faut s&apos;être posé la question avant de tenir
          l&apos;âge pour acquis.
        </p>
        <p className="prompt">
          Un jeune de 16 ans, pendant l&apos;échauffement, demande : « mais pourquoi on doit
          toujours faire cet exercice ennuyeux ? » — il ne le dit pas pour protester, ça ressemble
          à une vraie question. Que réponds-tu, en une phrase ?
        </p>
        <Field id="q13" value={answers.q13 ?? ""} onChange={(v) => setReflection("q13", v)} />
        {/* Note de correction, non montrée à l'instructeur : le système cherche une raison
            pratique et directe — ni un ordre (« parce que c'est moi qui le dis ») ni un long
            discours. */}
      </>
    ),
  },

  // 5 — vendredi test cumulatif
  {
    day: "vendredi · 12 min",
    pct: 85,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 1 + Chapitre 2</div>
        <h1>Le test</h1>
        <p className="prompt">
          1. Marco a 5 ans et Elena 13 — aucun des deux n&apos;entre dans l&apos;eau seul. Même
          phrase pour les convaincre ?
        </p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Oui, la peur est la même à tout âge", correct: false },
            {
              value: "no",
              label: "Non — à 5 ans un jeu ou une main tendue, à 13 ans ne pas être regardée pendant qu'elle hésite",
              correct: true,
            },
            { value: "carattere", label: "Ça dépend seulement du caractère", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un jeune de 15 ans demande : « pourquoi je dois faire justement cet exercice ? ». Tu réponds :</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "dico", label: "« Parce que c'est moi qui le dis, fais-le maintenant »", correct: false },
            { value: "bracciata", label: "« Parce que ça allonge ta nage — essaie et sens la différence »", correct: true },
            { value: "ignoro", label: "Tu ignores la question et répètes la consigne", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">
          3. Vrai ou faux : la tranche d&apos;âge se reconnaît mieux à la façon de répondre
          qu&apos;à la carte d&apos;identité.
        </p>
        <OptionGroup
          name="t3"
          options={[
            { value: "vero", label: "Vrai", correct: true },
            { value: "falso", label: "Faux", correct: false },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Un enfant de 6 ans arrive-t-il à suivre une consigne en deux étapes d&apos;affilée ?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "no", label: "Non, pas encore", correct: false },
            { value: "si", label: "Oui — à 6 ans, il commence tout juste", correct: true },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">5. Traiter un enfant de 7 ans avec une longue explication technique, comme un adulte, ça fonctionne ?</p>
        <OptionGroup
          name="t5"
          options={[
            { value: "no", label: "Non — il le perd à mi-chemin, même s'il semble écouter", correct: true },
            { value: "si", label: "Oui, si c'est clair", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. <em>(du Chapitre 1)</em> Ton canal VAK le moins utilisé est celui à...
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "evita", label: "Éviter, parce que tu n'es pas doué pour ça", correct: false },
            {
              value: "allena",
              label: "Entraîner, parce que c'est celui que tu risques d'oublier sous pression",
              correct: true,
            },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Se tromper de tranche d&apos;âge coûte-t-il seulement dans un sens ?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Oui, seulement si tu le traites trop comme un petit", correct: false },
            { value: "no", label: "Non — ça coûte dans les deux sens", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un jeune de 13 ans, sans le groupe autour, se comporte de façon plus ouverte et
          moins gênée que d&apos;habitude. Qu&apos;est-ce que ça signifie ?
        </p>
        <OptionGroup
          name="t8"
          options={[
            {
              value: "contesto",
              label: "Que la tranche d'âge se lit aussi au contexte — sans le groupe, la gêne pèse beaucoup moins",
              correct: true,
            },
            { value: "sbagliato", label: "Que tu t'étais trompé en jaugeant sa tranche d'âge", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Andrea, 16 ans, exécute un exercice nouveau de façon mécanique jusqu&apos;à ce que tu
          lui expliques aussi le pourquoi. Qu&apos;est-ce qui lui manquait vraiment ?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "attenzione", label: "De l'attention", correct: false },
            {
              value: "motivo",
              label: "Une raison — à cet âge, une image ou un ordre seuls ne suffisent souvent pas",
              correct: true,
            },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un enfant de 11 ans, devant le groupe, se trompe dans un exercice qu&apos;il savait
          déjà faire. Que fais-tu en premier, avant même de le corriger ?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 6 — feedback : explique comment fonctionne la correction (§10, D34)
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
          Exemple de feedback généré, en cas d&apos;erreur à la question 1 :
        </p>
        <div className="card quote">
          Tu as répondu que la même phrase convient aux deux. Relis les deux âges : à 5 ans, la
          peur se surmonte avec un jeu ou une présence physique proche ; à 13 ans, souvent, le
          problème n&apos;est plus seulement l&apos;eau — c&apos;est le fait d&apos;être vue
          hésiter par les autres. Même émotion de départ, obstacle différent.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Le feedback ne dit jamais seulement « tu t&apos;es trompé » : il dit quoi regarder la
          prochaine fois. Le ton porte toujours sur le comportement observé, jamais sur la
          personne (voir le Chapitre 7, qui reviendra justement sur cette règle).
        </p>
      </>
    ),
  },

  // 7 — rattrapage : seulement si le test du vendredi a trop d'erreurs (§12, D25/D27)
  {
    day: "rattrapage",
    pct: 90,
    nextLabel: "Continuer ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "bracciata", t3: "vero", t4: "si", t5: "no",
        t6: "allena", t7: "no", t8: "contesto", t9: "motivo",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Rattrapage — seulement parce que le test a repéré des difficultés</div>
        <h1>Trois exemples de plus, pour entraîner l&apos;œil</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de
          revoir le point le plus délicat de ce chapitre avec quelques exemples de plus — même
          âge, réactions différentes.
        </p>

        <div className="card scene">
          <div className="who">Deux enfants, tous les deux 10 ans</div>
          <p>
            Même groupe. Au premier, après une erreur, tu dis devant les autres « allez, réessaie,
            pas de souci » — il hausse les épaules et réessaie tout de suite. Au second, tu dis la
            phrase identique — il se fige, rougit, et évite cet exercice pour le reste du cours.
          </p>
        </div>
        <p className="prompt">Sont-ils dans la même tranche fonctionnelle ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Oui, ils ont le même âge", correct: false },
            {
              value: "no",
              label: "Non — le premier répond encore comme 6-10, le second a déjà la gêne typique des 11-13",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Martina, 11 ans</div>
          <p>
            En groupe, une correction dite à voix haute la ferme pour le reste du cours — typique
            des 11-13. La semaine suivante, seule avec toi dans un rattrapage individuel, la même
            correction exacte ne la perturbe pas du tout : elle répond et réessaie tout de suite,
            simple, directe.
          </p>
        </div>
        <p className="prompt">T&apos;es-tu trompé en jaugeant sa tranche la première fois ?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "no",
              label: "Non — c'est le contexte qui a changé (le groupe qui regarde), pas elle",
              correct: true,
            },
            { value: "si", label: "Oui, la première évaluation était fausse", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Deux garçons, tous les deux 12 ans</div>
          <p>
            Tu donnes aux deux la même consigne en deux étapes d&apos;affilée. Le premier la suit
            sans se perdre. Le second se perd à mi-chemin, comme le ferait un enfant plus jeune,
            et te demande de répéter seulement la première partie.
          </p>
        </div>
        <p className="prompt">Faut-il traiter le second comme s&apos;il avait 7 ans ?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Oui, sur ce point il faut le traiter comme un petit enfant", correct: false },
            {
              value: "no",
              label: "Non — sur cette tâche spécifique il a besoin d'une étape à la fois, mais il reste 11-13 pour tout le reste",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Le tableau des tranches te dit où regarder. L&apos;enfant que tu as devant toi à ce
          moment-là, avec ce groupe, ce jour-là, te donne la vraie réponse.
        </p>
      </>
    ),
  },

  // 8 — résultat
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>Les 10 questions du test</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>La correction réécrite au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Comment tu as géré Giacomo au §8, dans les deux échanges</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>Le récit de lundi sur le Chapitre 1</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  transfer_score
                </td>
                <td style={{ padding: "6px 0" }}>La réponse de mardi, sur le jeune de 16 ans</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Reconnaissance de l&apos;élève
                </td>
                <td style={{ padding: "6px 0" }}>Le plus bas des scores précédents</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 9 — tableau de bord
  {
    day: "tableau de bord",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapitre 2 terminé</div>
        <div className="eyebrow">Semaine 2 sur 10 · Chapitre 3 à venir</div>
        <h1>Regarder et comprendre</h1>
        <p className="lede">
          Aujourd&apos;hui, tu as appris à reconnaître qui tu as en face de toi. La semaine
          prochaine, tu apprends à lire ce qui lui arrive à cet instant précis.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="fr" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="fr" />
        <h2>Ton progrès</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Conscience personnelle</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip acquisita">
            <span className="name">2 · Reconnaissance de l&apos;élève</span>
            <span className="state">acquise</span>
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
    ),
  },
];
