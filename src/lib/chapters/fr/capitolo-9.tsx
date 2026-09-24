import { OptionGroup } from "@/components/OptionGroup";
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

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo9StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 9 · QUAND IL NE VEUT PAS</div>
        <h1>Il n&apos;y arrive pas, ou il ne veut pas ?</h1>
        <p className="lede">
          Face à un enfant qui refuse, s&apos;oppose ou défie ouvertement, l&apos;instructeur cherche
          d&apos;abord l&apos;intention positive derrière le refus — au lieu d&apos;insister ou
          d&apos;entrer en conflit.
        </p>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 8
  {
    day: "lundi · 10 min",
    pct: 11,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé au bassin ?</h1>
        <p className="lede">
          La semaine dernière : trois façons différentes prêtes pour une même chose technique, et
          changer de cap si la première ne marchait pas. Ça t&apos;a servi ? Quelle façon as-tu le
          plus utilisée ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 8 revient</h2>
        <p className="prompt">1. Si une façon ne marche pas, la bonne chose est-elle de la répéter plus fort ?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Non — on en essaie une différente", correct: true },
            { value: "si", label: "Oui — si tu la répètes avec plus de conviction, ça marche en général", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un bon répertoire a-t-il, pour chaque chose importante, au moins trois façons différentes de la dire ?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Oui", correct: true },
            { value: "no", label: "Non, une seule bien préparée suffit", correct: false },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Si un enfant n&apos;y arrive pas avec une façon, ça veut dire qu&apos;il ne peut pas y arriver ?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "Non — ça veut dire seulement que ce n'était pas encore la bonne façon", correct: true },
            { value: "si", label: "Oui — si une façon ne suffit pas, ça veut dire que l'enfant n'y arrive pas encore", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. Le répertoire a-t-il un ordre fixe, valable pour chaque enfant ?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Oui — d'abord les mots, puis le geste, puis le contact, toujours dans cet ordre", correct: false },
            { value: "no", label: "Non — ça dépend de l'enfant", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Tu as essayé les trois canaux avec un enfant, sans résultat. La bonne chose est-elle
          d&apos;inventer une quatrième variation ?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "Non — c'est le moment de s'arrêter et de regarder ce qu'il y a d'autre", correct: true },
            { value: "si", label: "Oui, il faut insister", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Un canal qui a marché sur un exercice marche-t-il automatiquement aussi sur
          l&apos;exercice suivant ?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Oui, une fois trouvé il reste le bon", correct: false },
            { value: "no", label: "Non — chaque nouvel exercice peut demander un canal différent", correct: true },
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
    pct: 27,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>« Il n&apos;y arrive pas » et « il ne veut pas » ne sont pas la même chose</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Jusqu&apos;ici tu as appris quoi faire quand un enfant n&apos;y arrive pas. Aujourd&apos;hui
          tu apprends la différence — parce que ce n&apos;est pas la même chose — quand un enfant ne
          veut tout simplement pas.
        </p>
        <p className="lede">
          <strong>« Il n&apos;y arrive pas » est un problème pédagogique.</strong> L&apos;enfant veut
          faire ce que tu lui demandes, mais la voie ne marche pas encore — c&apos;est ce que tu as
          appris au Chapitre 8 : on change de cap.
        </p>
        <p className="lede">
          <strong>« Il ne veut pas » est tout autre chose.</strong> Ce n&apos;est pas que la voie soit
          mauvaise : c&apos;est que lui, maintenant, ne veut pas la suivre. Il refuse, s&apos;oppose,
          parfois défie ouvertement — surtout pendant l&apos;adolescence.
        </p>
        <p className="lede">
          Confondre les deux choses est la deuxième erreur la plus courante du métier (la première
          est celle du Chapitre 8 : répéter la même explication au lieu de changer de cap). La raison
          est simple : face à un refus, on a naturellement envie de réexpliquer, peut-être plus
          clairement. Ce réflexe fonctionne pour « il n&apos;y arrive pas ». Mais il ne sert à rien
          pour « il ne veut pas ». Un enfant qui refuse n&apos;a pas besoin d&apos;une autre
          explication : il a besoin que tu comprennes pourquoi il refuse.
        </p>
        <div className="card quote">
          Même le comportement le plus gênant — le refus, l&apos;opposition, le défi — cache presque
          toujours une intention qui, du point de vue de celui qui agit, est positive. Ça ne
          justifie pas le comportement. Mais ça te donne un levier différent à actionner.
        </div>
        <p className="lede">
          L&apos;enfant qui refuse d&apos;entrer dans l&apos;eau ne te refuse souvent pas toi : il se
          protège de quelque chose qu&apos;il craint. L&apos;adolescent qui te défie devant le groupe,
          souvent, ne veut pas gagner contre toi : il veut être vu comme quelqu&apos;un qui compte,
          devant ses camarades. Une fois l&apos;intention trouvée, tu trouves souvent aussi une façon
          de la satisfaire sans céder sur le fond.
        </p>
        <p className="lede">
          Le refus n&apos;est pas toujours bruyant : parfois c&apos;est un adolescent qui défie à voix
          haute, d&apos;autres fois une fillette de 11 ans qui, sans élever la voix, se retire et dit
          « je n&apos;essaie même pas » — même mécanisme, volume différent.
        </p>
        <p className="lede">
          <strong>Et si même la proposition que tu offres est refusée ?</strong> Ça peut arriver. Ce
          n&apos;est pas une négociation infinie : tu peux tenter une deuxième lecture, avec calme —
          mais si celle-là non plus ne mène nulle part, c&apos;est correct de s&apos;arrêter et de
          dire clairement quelle est la limite, sans dureté : « d&apos;accord, aujourd&apos;hui on
          laisse cet exercice — mais le cours continue. » Chercher l&apos;intention positive ne veut
          pas dire la poursuivre à l&apos;infini : ça veut dire lui donner un vrai essai, pas zéro
          essai.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée</h2>
        <p className="prompt">1. « Il n&apos;y arrive pas » et « il ne veut pas » demandent-ils la même réponse ?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "Non — l'un est pédagogique, l'autre relationnel", correct: true },
            { value: "si", label: "Oui — dans les deux cas, la bonne réponse est de réexpliquer", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Trouver l&apos;intention positive derrière un refus justifie-t-il le comportement ?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Oui — si tu comprends la raison, alors le refus est acceptable tel quel", correct: false },
            { value: "no", label: "Non — ça te donne seulement un levier différent à actionner", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">3. Si même la deuxième proposition est refusée, faut-il continuer à en chercher d&apos;autres à l&apos;infini ?</p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "Non — après un vrai deuxième essai, c'est correct de s'arrêter avec calme", correct: true },
            { value: "si", label: "Oui, jusqu'à trouver la bonne", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercredi : trois scènes + simulation Riccardo (deux échanges conditionnels)
  {
    day: "mercredi",
    pct: 44,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "impone" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Trois refus, trois intentions différentes</h1>
        <div className="card scene">
          <div className="who">Un adolescent de 15 ans</div>
          <p>
            Il s&apos;arrête au bord du bassin, à voix haute, devant le groupe : « cet exercice est
            débile, je le fais pas. » Ce n&apos;est pas qu&apos;il ne comprenne pas l&apos;utilité de
            l&apos;exercice : il vient de tester, devant tout le monde, si l&apos;instructeur a le
            contrôle de la situation. L&apos;instructeur répond, sans élever la voix : « ok. Montre-moi
            comment tu le ferais différemment. » Ce n&apos;est pas une capitulation — c&apos;est lui
            donner un rôle, plutôt qu&apos;un affrontement. Le garçon propose une petite variante,
            assez proche pour être acceptée. Le refus ne portait pas sur l&apos;exercice : il portait
            sur qui décide.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Alice, 12 ans</div>
          <p>
            Plongeon de départ, jamais essayé devant le groupe. Elle croise les bras : « je le fais
            pas, c&apos;est nul. » Aucun défi à voix haute, juste un refus sec. L&apos;instructeur
            comprend que le problème n&apos;est pas le plongeon : c&apos;est de le rater devant ses
            copines. Il lui propose, à voix basse, de l&apos;essayer en premier, pendant que les autres
            ajustent encore leurs bonnets. Alice le fait.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un enfant de 8 ans</div>
          <p>
            Il croise les bras et ne dit rien, se tourne pour regarder le mur, devant un exercice
            qu&apos;il avait déjà fait sans problème la semaine dernière. Aucun défi, aucun public à
            impressionner — juste un refus silencieux et ferme. L&apos;instructeur, au lieu de proposer
            des récompenses (« allez, après on fait le jeu que tu aimes ») ou d&apos;insister, se met à
            son niveau : « aujourd&apos;hui c&apos;est une journée un peu lourde ? » L&apos;enfant
            hoche à peine la tête — ce n&apos;est pas de l&apos;opposition, c&apos;est de la fatigue
            qu&apos;à 8 ans il ne sait pas encore dire avec les bons mots. L&apos;instructeur réduit
            l&apos;exercice, sans en faire un problème. L&apos;enfant le fait.
          </p>
        </div>
        <p className="lede">
          <strong>
            Trois refus, trois intentions différentes — défier celui qui commande, se protéger du
            regard des camarades, ou simplement tenir une fatigue qu&apos;on ne sait pas encore
            expliquer avec des mots — et trois réponses différentes, chacune tournée vers
            l&apos;intention réelle, pas vers le refus lui-même.
          </strong>
        </p>
        <p className="prompt">
          Une fillette de 6 ans, à la troisième tentative d&apos;entrer dans l&apos;eau, se met à
          pleurer et dit « non, je veux pas, ça suffit ». Écris ce que tu fais — pas ce que tu lui dis
          pour la convaincre, mais ce que tu fais pour comprendre ce qu&apos;il y a derrière ce
          « non ».
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : le système cherche si on essaie de
            comprendre la cause (peur ? fatigue ? quelque chose arrivé avant ?) au lieu d'insister
            directement sur l'entrée dans l'eau. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>RICCARDO, 16 ans.</strong> Il croise les bras : « j&apos;ai pas envie de faire cet
          exercice, point final. » Que lui réponds-tu ?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "impone", label: "Tu réexpliques pourquoi l'exercice sert, ou tu lui dis qu'il doit le faire quand même" },
            {
              value: "capisce",
              label: "Tu cherches ce qu'il y a derrière, ou tu lui offres un choix dans un cadre — ex. « quel autre exercice ça te dirait d'essayer ? »",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "impone" && (
          <div className="feedback retry">
            RICCARDO : « J&apos;ai dit non. » <em>(il s&apos;éloigne, reste en dehors de l&apos;exercice)</em>
          </div>
        )}
        {answers.sim === "capisce" && (
          <>
            <div className="feedback ok">
              RICCARDO : « ...j&apos;sais pas, p&apos;t-être les plongeons. » <em>(il se rapproche à
              nouveau du groupe)</em>
              <br />
              Tu n&apos;as pas cédé sur le fond — l&apos;entraînement continue. Tu as cédé sur qui
              choisit, et à 16 ans c&apos;est souvent ça qui compte vraiment.
            </div>
            <p className="lede" style={{ marginTop: 14 }}>
              Après deux ou trois plongeons, Riccardo s&apos;arrête à nouveau : « non, ça suffit aussi
              pour ça, j&apos;ai plus envie de rien aujourd&apos;hui. »
            </p>
            <p className="prompt">Écris ce que tu fais maintenant.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "ancora", label: "Tu cherches encore une troisième alternative, puis une quatrième" },
                { value: "confine", label: "Après un vrai deuxième essai déjà offert, tu dis clairement quelle est la limite, avec calme" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                RICCARDO comprend que refuser marche toujours — chaque « non » obtient une nouvelle
                proposition, sans jamais de vraie limite.
              </div>
            )}
            {answers.sim2 === "confine" && (
              <div className="feedback ok">
                RICCARDO : « ...ok » <em>(il reste dans le groupe, sans protester davantage)</em>
                <br />
                Chercher l&apos;intention positive ne veut pas dire la poursuivre à l&apos;infini : un
                vrai essai, pas zéro essai — et pas non plus une négociation sans fin.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — mercredi soir : transfert
  {
    day: "mercredi soir",
    pct: 60,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée — transfert</div>
        <h1>Il n&apos;y arrive pas, ou il ne veut pas ?</h1>
        <p className="lede">
          Une fillette de 9 ans, sans élever la voix, dit simplement : « j&apos;essaie même pas, de
          toute façon j&apos;y arrive jamais. » Elle n&apos;est pas fâchée, elle a l&apos;air résignée.
        </p>
        <p className="prompt">
          Est-ce « il n&apos;y arrive pas » ou « il ne veut pas » ? Qu&apos;est-ce qui te fait penser
          que c&apos;est l&apos;un plutôt que l&apos;autre ?
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : il n'y a pas de réponse évidente —
            c'est voulu. Le système vérifie si le raisonnement porte sur le signal (résignation, pas
            opposition active) au lieu d'appliquer automatiquement le schéma vu dans les exemples du
            jour. Ça pourrait être les deux choses ensemble : une vraie difficulté technique qui,
            répétée, s'est transformée en refus de réessayer. */}
      </>
    ),
  },

  // 5 — ton tour au bassin
  {
    day: "au bassin",
    pct: 68,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton tour au bassin</div>
        <h1>D&apos;abord l&apos;intention, ensuite la réponse</h1>
        <p className="lede">
          Cette semaine, avec celui qui refuse quelque chose : avant d&apos;insister, cherche
          l&apos;intention positive derrière le refus. Elle n&apos;a pas à te justifier quoi que ce
          soit — elle doit juste te donner un levier différent de celui que tu allais utiliser.
        </p>
      </>
    ),
  },

  // 6 — vendredi : test cumulatif Chapitre 8 + Chapitre 9
  {
    day: "vendredi · 11 min",
    pct: 86,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 8 + Chapitre 9</div>
        <h1>Le test</h1>
        <p className="prompt">1. « Il n&apos;y arrive pas » et « il ne veut pas » sont-ils le même problème ?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Oui — en pratique, le refus et la difficulté se traitent de la même façon", correct: false },
            { value: "no", label: "Non — l'un est pédagogique, l'autre relationnel", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un enfant qui refuse a surtout besoin de :</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "capisce", label: "Que tu comprennes ce qu'il y a derrière le refus", correct: true },
            { value: "spiega", label: "Une autre explication plus claire", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Un adolescent de 15 ans te défie devant le groupe. Qu&apos;est-il probablement en train de tester ?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "tecnica", label: "Ta compétence technique", correct: false },
            { value: "controllo", label: "Si tu as le contrôle de la situation", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. Une fille de 12 ans refuse un exercice nouveau devant le groupe. Que protège-t-elle le plus probablement ?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "vergogna", label: "Elle ne veut pas se tromper devant ses copines", correct: true },
            { value: "sfida", label: "Elle veut défier l'autorité de l'instructeur", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(du Chapitre 8)</em> Si une façon ne marche pas, la bonne chose est :
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "forte", label: "La répéter plus fort", correct: false },
            { value: "diverso", label: "En utiliser une différente", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">6. Le refus est-il toujours bruyant et à voix haute ?</p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Non — il peut aussi être silencieux, un retrait sans drame", correct: true },
            { value: "si", label: "Oui — un vrai refus se voit toujours, sinon ce n'en est pas un", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. Un enfant de 8 ans croise les bras et ne répond pas, devant un exercice qu&apos;il savait déjà faire. Que peut-il cacher, en plus du défi ou de la gêne ?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "niente", label: "Rien, à cet âge c'est toujours un caprice", correct: false },
            { value: "stanchezza", label: "Aussi une fatigue qu'il ne sait pas encore exprimer avec des mots", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">8. Si même la deuxième proposition est refusée, faut-il continuer à en chercher d&apos;autres à l&apos;infini ?</p>
        <OptionGroup
          name="t8"
          options={[
            { value: "si", label: "Oui, jusqu'à trouver la bonne", correct: false },
            { value: "no", label: "Non — après un vrai deuxième essai, c'est correct de dire clairement quelle est la limite, avec calme", correct: true },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">9. Dire clairement quelle est la limite, après un vrai essai de comprendre, est-ce en contradiction avec « chercher l&apos;intention positive » ?</p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Oui, il faut insister jusqu'à ce que le refus cesse", correct: false },
            { value: "no", label: "Non — chercher l'intention ne veut pas dire la poursuivre à l'infini", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un enfant de 8 ans refuse un exercice qu&apos;il avait bien réussi la semaine dernière.
          Écris en deux lignes ce que tu fais avant d&apos;insister.
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
          Exemple de retour généré, en cas d&apos;erreur à la question 2 :
        </p>
        <div className="card quote">
          Tu as répondu qu&apos;il faut une autre explication plus claire. Mais si le problème n&apos;est
          pas qu&apos;il ne comprend pas — c&apos;est qu&apos;il ne veut pas — réexpliquer ne change
          rien, parce que ce n&apos;est pas là le point. Comprends d&apos;abord ce qu&apos;il y a
          derrière, puis décide quoi dire.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Le retour ne dit jamais juste « tu t&apos;es trompé » : il dit quoi regarder la prochaine
          fois. Le ton reste toujours sur le comportement observé, jamais sur la personne — la même
          règle du Chapitre 7.
        </p>
      </>
    ),
  },

  // 8 — récupération : seulement si le test du vendredi a trop d'erreurs (§12, D25/D27)
  {
    day: "récupération",
    pct: 91,
    nextLabel: "Continuer ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "capisce", t3: "controllo", t4: "vergogna", t5: "diverso",
        t6: "no", t7: "stanchezza", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Récupération — juste parce que le test a trouvé quelques difficultés</div>
        <h1>Trois exemples en plus, pour t&apos;entraîner à poser la limite</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de revoir le
          point le plus délicat de ce chapitre avec quelques exemples en plus — reconnaître le refus
          avant de réagir.
        </p>

        <div className="card scene">
          <div className="who">Un enfant de 10 ans</div>
          <p>
            Il s&apos;arrête devant un nouveau plongeon et dit, sec : « je le fais pas. »
            L&apos;instructeur, par habitude, répète l&apos;explication technique — plus lente, plus
            détaillée — convaincu qu&apos;il suffit de se faire mieux comprendre.
          </p>
        </div>
        <p className="prompt">Est-ce la bonne réponse à un refus ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Oui — si l'explication est plus claire, le refus se dissout en général", correct: false },
            {
              value: "no",
              label: "Non — un refus ne se règle pas avec une explication plus claire : il faut d'abord comprendre ce qu'il y a derrière",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Alessia, 11 ans</div>
          <p>
            Pendant l&apos;échauffement, à voix haute, devant le groupe : « je veux pas faire des jeux
            de bébé. » La semaine dernière, justement sur cet exercice, elle s&apos;était trompée
            devant tout le monde.
          </p>
        </div>
        <p className="prompt">Que protège, le plus probablement, son refus ?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "sfida", label: "Elle veut défier l'autorité de l'instructeur", correct: false },
            {
              value: "imbarazzo",
              label: "Elle se protège d'un embarras déjà vécu, pas de l'exercice en lui-même",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Davide, 14 ans</div>
          <p>
            Il refuse la première proposition. L&apos;instructeur en offre une deuxième, calibrée :
            refusée aussi. Il en offre une troisième, puis esquisse une quatrième.
          </p>
        </div>
        <p className="prompt">Est-il correct de continuer à offrir des alternatives à l&apos;infini ?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Oui, jusqu'à trouver la bonne", correct: false },
            {
              value: "no",
              label: "Non — après un vrai deuxième essai, c'est correct de s'arrêter et de dire clairement quelle est la limite, avec calme",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Le refus n&apos;est jamais la vraie demande : c&apos;est le symptôme. Et chercher
          l&apos;intention positive ne veut pas dire la poursuivre à l&apos;infini — un vrai essai, pas
          zéro essai, et pas non plus une négociation sans fin.
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
                <td style={{ padding: "6px 0" }}>La réponse au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Comment tu as géré Riccardo au §8, dans les deux échanges</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit du lundi sur le Chapitre 8</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Situations difficiles</td>
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
        <div className="done-badge">✓ Chapitre 9 terminé</div>
        <div className="eyebrow">Semaine 9 sur 10 · Chapitre 10 à venir</div>
        <h1>Le lâcher-prise</h1>
        <p className="lede">
          Tu as appris à lire, à entrer en mise en phase, à communiquer, à vérifier, à corriger, à
          changer de cap, à tenir le refus. La semaine prochaine boucle la boucle : comment faire en
          sorte qu&apos;un jour, ça ne serve plus.
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
          <div className="chip consolidata">
            <span className="name">8 · Changer de cap</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip acquisita">
            <span className="name">9 · Situations difficiles</span>
            <span className="state">acquise</span>
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
