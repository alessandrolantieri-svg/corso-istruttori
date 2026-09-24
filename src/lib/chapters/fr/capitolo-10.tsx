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

const SIM_OPTIONS: Option[] = [
  { value: "correggi", label: "Tu lui donnes quand même une correction technique, par habitude" },
  { value: "chiedi", label: "Tu lui demandes son avis à elle, d'abord" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "ancora", label: "Tu lui réponds encore « et toi, qu'est-ce que tu en penses ? », comme pour l'exercice précédent" },
  { value: "indica", label: "Tu lui donnes une indication technique, parce que c'est un exercice nouveau, pas encore consolidé" },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10","qchiusura"];

export const capitolo10StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 10 · LE LÂCHER-PRISE</div>
        <h1>Le dernier chapitre</h1>
        <p className="lede">
          L&apos;instructeur reconnaît quand un élève n&apos;a plus besoin de lui sur une chose
          précise — et s&apos;applique à lui-même la même règle qu&apos;il a appris à donner aux
          enfants : il n&apos;existe pas d&apos;échecs, seulement des retours.
        </p>
      </>
    ),
  },

  // 1 — lundi : consolidation Chapitre 9
  {
    day: "lundi · 10 min",
    pct: 10,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé au bassin ?</h1>
        <p className="lede">
          La semaine dernière : avec celui qui refusait quelque chose, chercher l&apos;intention
          positive avant d&apos;insister. Ça t&apos;est arrivé de devoir le faire ? Comment ça s&apos;est
          passé ?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 9 revient</h2>
        <p className="prompt">1. « Il n&apos;y arrive pas » et « il ne veut pas » sont-ils le même problème ?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "Non — l'un est un problème pédagogique, l'autre relationnel", correct: true },
            { value: "si", label: "Oui — en pratique ils se résolvent de la même façon", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un enfant qui refuse a surtout besoin de :</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "spiega", label: "Une explication plus claire", correct: false },
            { value: "capisce", label: "Que tu comprennes ce qu'il y a derrière", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. Trouver l&apos;intention positive derrière un refus justifie-t-il le comportement ?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "Non — ça te donne seulement un levier différent à actionner", correct: true },
            { value: "si", label: "Oui — si tu comprends pourquoi il le fait, alors c'est correct de le laisser faire", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. Le refus est-il toujours bruyant, à voix haute ?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Oui — sinon tu ne le remarquerais même pas", correct: false },
            { value: "no", label: "Non — ça peut aussi être un retrait silencieux", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. Si même une deuxième proposition est refusée, la bonne chose est-elle de continuer à en
          chercher d&apos;autres à l&apos;infini ?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "Non — après un vrai deuxième essai, c'est correct de s'arrêter avec calme", correct: true },
            { value: "si", label: "Oui, jusqu'à trouver la bonne", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Un refus silencieux — bras croisés, aucun mot — peut-il simplement cacher de la fatigue,
          pas un défi ?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Oui — parfois ce n'est pas de l'opposition, juste de la fatigue qu'il ne sait pas encore dire avec des mots", correct: true },
            { value: "no", label: "Non, c'est toujours un caprice", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — mardi : savoir quand cesser d'être nécessaire
  {
    day: "mardi · 15 min",
    pct: 20,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Savoir quand cesser d&apos;être nécessaire</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Tu as appris à lire, à entrer en mise en phase, à communiquer, à vérifier, à corriger, à
          changer de cap, à tenir le refus. La dernière compétence est la plus difficile de toutes :
          savoir quand cesser d&apos;être nécessaire.
        </p>
        <p className="lede">
          Tout ce que tu as appris dans ce cours — observer, entrer en mise en phase, donner la bonne
          consigne, changer de cap — n&apos;a qu&apos;un seul vrai but : un enfant qui, sur cette
          chose-là, un jour n&apos;a plus besoin de toi.
        </p>
        <p className="lede">
          C&apos;est facile de l&apos;oublier, parce que chaque jour ton travail se juge à quel point
          tu es présent, attentif, prêt à intervenir. Mais un instructeur qui intervient toujours,
          même quand ce n&apos;est plus nécessaire, ralentit exactement ce qu&apos;il voulait obtenir.
          Reconnaître le moment où un enfant peut se débrouiller seul — un exercice que tu suivais
          avant pas à pas, un geste que tu corrigeais avant à chaque fois — est un acte de confiance,
          pas d&apos;abandon. Ça veut dire lui dire, sans mots, « ça, tu sais déjà le faire. Fais-le. »
        </p>
        <p className="lede">
          <strong>Mais comment savoir si c&apos;est déjà le moment, ou si c&apos;est encore trop
          tôt ?</strong>{" "}
          Un signal utile : l&apos;élève a vraiment fait sien un geste quand il l&apos;exécute
          identique même quand il ne te sent pas à côté, et qu&apos;il ne se retourne pas pour chercher
          ton approbation dès qu&apos;il a fini. Si au contraire il ne l&apos;exécute bien que quand il
          sait que tu le regardes, ou s&apos;arrête pour te chercher des yeux en attendant un verdict,
          c&apos;est encore trop tôt : il n&apos;a pas encore fait sien le geste — il s&apos;est habitué
          à ta présence, pas au mouvement. Le lâcher-prise à ce moment-là ne serait pas de la
          confiance : ce serait un pari déguisé en confiance.
        </p>
        <div className="card quote">
          Et la même règle que tu as appris à lire dans l&apos;erreur de l&apos;enfant — il n&apos;existe
          pas d&apos;échecs, seulement des retours — tu l&apos;appliques aujourd&apos;hui à toi-même.
          Chaque cours qui ne s&apos;est pas passé comme tu le voulais n&apos;est pas un échec de ta
          part : c&apos;est une information sur ce qu&apos;il faut essayer différemment la prochaine
          fois. Le Chapitre 1 t&apos;a demandé de découvrir comment toi, tu communiques. Ce chapitre te
          demande de continuer à le découvrir, chaque semaine, pour le reste de ta carrière — pas
          seulement pendant ce cours.
        </div>
        <p className="lede">
          Les deux moitiés de ce chapitre disent la même chose, vue sous deux angles différents.
          Lâcher un élève qui n&apos;a plus besoin de toi, et lâcher l&apos;idée d&apos;avoir « raté »
          un cours mal passé : c&apos;est le même geste. Dans les deux cas, il s&apos;agit de faire
          confiance au fait que le cycle — observer, essayer, corriger — fonctionne aussi sans ton
          contrôle continu, sur l&apos;enfant ou sur toi-même.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée</h2>
        <p className="prompt">1. Un instructeur qui intervient toujours, même quand ce n&apos;est plus nécessaire, aide-t-il l&apos;élève ?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "Non — il ralentit l'autonomie qu'il voulait obtenir", correct: true },
            { value: "si", label: "Oui — plus il est présent, mieux c'est pour l'élève", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Un cours mal passé est-il un échec de l&apos;instructeur ?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Oui — si le cours se passe mal, ça veut dire qu'il a fait une erreur quelque part", correct: false },
            { value: "no", label: "Non — c'est une information sur ce qu'il faut essayer différemment", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. Un élève exécute bien un geste seulement quand il sent l&apos;instructeur à côté, et
          s&apos;arrête pour le chercher des yeux dès qu&apos;il a fini. Est-ce le moment de le lâcher
          sur cette chose-là ?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "Non — il n'a pas encore fait sien le geste, il s'est habitué à ta présence, pas au mouvement", correct: true },
            { value: "si", label: "Oui — s'il l'exécute bien, ça veut dire que le geste est acquis", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
        <p className="prompt">
          4. Un élève répète le même geste identique même quand l&apos;instructeur regarde ailleurs,
          sans chercher de confirmation. Que signale-t-il ?
        </p>
        <OptionGroup
          name="m4"
          options={[
            { value: "fortuna", label: "Qu'il a juste eu de la chance", correct: false },
            { value: "suo", label: "Que le geste est désormais sien, plus lié à ta présence", correct: true },
          ]}
          selected={answers.m4}
          onPick={(v, correct) => setResponse("m4", v, correct)}
        />
      </>
    ),
  },

  // 3 — mercredi : deux « lâcher-prise » + simulation Giulia
  {
    day: "mercredi",
    pct: 30,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "correggi" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mercredi</div>
        <h1>Deux « lâcher-prise », dans le même cours</h1>
        <div className="card scene">
          <div className="who">Un enfant de 10 ans</div>
          <p>
            Un an plus tôt, il avait besoin que l&apos;instructeur le regarde à chaque coup de bras
            pour le corriger. Aujourd&apos;hui il nage un bassin entier sans que personne n&apos;intervienne,
            et la technique tient. L&apos;instructeur, par habitude, s&apos;approche quand même du bord,
            prêt à corriger quelque chose dès qu&apos;il termine. Puis il s&apos;arrête, et ne dit rien
            : il laisse l&apos;enfant lui-même regarder son propre passage, se juger tout seul — « ça
            t&apos;a semblé comment ? » — plutôt que de lui donner lui-même le verdict.
          </p>
          <p>
            Ce n&apos;est pas que l&apos;instructeur n&apos;ait plus rien à dire. C&apos;est que, sur
            cette chose précise, le dire lui-même au lieu de laisser l&apos;enfant le découvrir serait
            un pas en arrière, pas en avant.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Le même instructeur, le soir</div>
          <p>
            Avec un autre enfant du groupe, il avait essayé le même silence — rester muet et laisser
            l&apos;enfant se corriger seul. Mais avec cet enfant-là, l&apos;erreur ne s&apos;est pas
            corrigée : elle s&apos;est installée, répétée à l&apos;identique tout le long du bassin.
            L&apos;espace d&apos;un instant, il pense : « j&apos;ai eu tort, j&apos;aurais dû intervenir. »
            Puis il s&apos;arrête, et s&apos;applique à lui-même la même règle qu&apos;il utiliserait
            avec un élève : ce n&apos;est pas un échec — c&apos;est une information. La prochaine fois,
            avant de rester en silence, il regardera un peu plus longtemps pour être sûr que l&apos;exercice
            est vraiment déjà acquis, et pas seulement en apparence.
          </p>
          <p>
            Deux « lâcher-prise » dans le même cours — l&apos;un réussi, l&apos;autre à corriger — et
            l&apos;instructeur traite le second exactement comme il traiterait l&apos;erreur d&apos;un
            enfant : sans s&apos;étiqueter lui-même, en notant juste ce qu&apos;il faut changer.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un adolescent de 15 ans, Marco</div>
          <p>
            Depuis deux mois il nage les quatre-vingts mètres de dos sans une seule correction : le
            technique est désormais solide, et l&apos;instructeur le sait. Un jour, par habitude, il
            s&apos;éloigne un peu plus que d&apos;habitude, en surveillant aussi les autres enfants du
            groupe. Marco, arrivé au bord, demande : « tout va bien ? Tu ne m&apos;as pas regardé une
            seule fois. » Ce n&apos;est pas une question technique — c&apos;est un doute sur autre
            chose : être encore suivi. L&apos;instructeur répond : « je t&apos;ai regardé, et
            justement je n&apos;ai rien dit — ça veut dire que c&apos;était bon. » Marco reste un
            instant silencieux, puis sourit.
          </p>
        </div>
        <p className="lede">
          <strong>
            Lâcher-prise ne veut pas dire arrêter de regarder : ça veut dire arrêter d&apos;intervenir
            quand regarder suffit.
          </strong>{" "}
          Mais pour l&apos;élève, de l&apos;extérieur, les deux choses peuvent sembler identiques — et
          c&apos;est pour ça que, parfois, ça vaut le coup de le dire à voix haute, pas seulement de le
          faire en silence.
        </p>
        <p className="prompt">
          Pense à un élève que tu suis depuis longtemps, et à une chose précise qu&apos;il sait
          désormais bien faire sans ton intervention constante. Écris ce que tu ferais différemment,
          la prochaine fois, pour lui laisser plus d&apos;espace — sans disparaître complètement.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : il n'y a pas de bonne réponse. Le
            système regarde si l'instructeur décrit un pas en arrière graduel (observer au lieu de
            corriger, demander son avis à lui au lieu de donner le tien) et non un abandon total ni un
            contrôle qui reste identique. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>GIULIA, 11 ans.</strong> Elle vient de terminer un exercice technique qui, jusqu&apos;à
          il y a un mois, demandait une correction à chaque tentative. Aujourd&apos;hui elle n&apos;en
          a pas eu besoin. Que lui dis-tu, juste après ?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "correggi" && (
          <div className="feedback retry">
            GIULIA : « ...ok. » <em>(elle exécute à nouveau en attendant, comme toujours, ton
            jugement final)</em>
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div className="feedback ok">
            GIULIA : « ...je crois que je me suis mieux allongée cette fois. C&apos;est vrai ? »{" "}
            <em>(elle te regarde, mais elle a déjà donné son propre jugement avant de demander le
            tien)</em>
            <br />
            Petite différence, grand effet : dans le second cas, Giulia apprend à s&apos;évaluer
            elle-même — ce qui est, littéralement, l&apos;objectif de tout ce chapitre.
          </div>
        )}
        {answers.sim === "chiedi" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Juste après, Giulia essaie un deuxième exercice — jamais fait avant, un plongeon de
              départ. Elle l&apos;exécute de façon incertaine, puis se retourne et attend, silencieuse,
              ton jugement.
            </p>
            <p className="prompt">Écris ce que tu fais maintenant.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={SIM2_OPTIONS}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                GIULIA reste immobile, incertaine, sans savoir si c&apos;est bon ou pas. Laisser de
                l&apos;espace fonctionne quand la base est déjà solide. Sur un geste nouveau, le
                silence n&apos;est pas de la confiance : c&apos;est la laisser seule — exactement le
                signal du mardi, lu à l&apos;envers.
              </div>
            )}
            {answers.sim2 === "indica" && (
              <div className="feedback ok">
                GIULIA hoche la tête et réessaie, avec l&apos;indication en tête. Le lâcher-prise
                n&apos;est pas une règle fixe identique pour chaque exercice : ça dépend de ce qui est
                déjà acquis et de ce qui ne l&apos;est pas.
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
    pct: 42,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Bilan de fin de journée — transfert</div>
        <h1>Quand le silence ne suffit pas</h1>
        <p className="lede">
          Tu as essayé, avec un élève, de rester en silence sur un exercice que tu croyais déjà
          acquis — mais il s&apos;est quand même trompé, d&apos;une façon que tu n&apos;attendais pas.
        </p>
        <p className="prompt">
          Que penses-tu, à ce moment-là — et que fais-tu la fois suivante ? Écris ton raisonnement,
          pas juste la conclusion.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note pour la correction, non montrée à l'instructeur : le système cherche si on
            s'applique à soi-même la même règle du mardi — pas un échec, une information — au lieu de
            conclure que « lâcher-prise » était une erreur à ne plus jamais répéter. */}
      </>
    ),
  },

  // 5 — au bassin
  {
    day: "au bassin",
    pct: 52,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton tour au bassin</div>
        <h1>Pars du silence</h1>
        <p className="lede">
          Cette semaine, choisis un exercice entier et ne dis rien pendant toute sa durée à un élève
          qui sait déjà bien le faire. Regarde, c&apos;est tout. Si intervenir est nécessaire,
          interviens — mais pars du silence, pas du commentaire.
        </p>
      </>
    ),
  },

  // 6 — vendredi : test cumulatif Chapitre 9 + Chapitre 10
  {
    day: "vendredi · 11 min",
    pct: 70,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 9 + Chapitre 10</div>
        <h1>Le test</h1>
        <p className="prompt">1. Un instructeur qui intervient toujours, même quand ce n&apos;est plus nécessaire, est en train de :</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "bene", label: "Bien faire son travail", correct: false },
            { value: "rallenta", label: "Ralentir l'autonomie qu'il voulait obtenir", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un cours mal passé est-il un échec de l&apos;instructeur ?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "no", label: "Non — c'est une information sur ce qu'il faut essayer différemment", correct: true },
            { value: "si", label: "Oui — un cours mal passé veut dire qu'il a fait une erreur", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Laisser plus d&apos;espace à un élève qui sait déjà faire quelque chose veut dire :</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "sparire", label: "Disparaître complètement", correct: false },
            { value: "graduale", label: "Un pas en arrière graduel, pas un abandon", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">
          4. Les deux moitiés de ce chapitre — l&apos;autonomie de l&apos;enfant et l&apos;erreur de
          l&apos;instructeur — sont-elles liées ?
        </p>
        <OptionGroup
          name="t4"
          options={[
            {
              value: "si",
              label: "Oui — c'est le même geste : faire confiance au fait que le cycle fonctionne sans contrôle constant",
              correct: true,
            },
            { value: "no", label: "Non, ce sont deux sujets différents", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(du Chapitre 9)</em> « Il n&apos;y arrive pas » et « il ne veut pas » sont-ils le
          même problème ?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Oui — en pratique ils se traitent de la même façon", correct: false },
            { value: "no", label: "Non — l'un est un problème pédagogique, l'autre relationnel", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. Si un cours s&apos;est mal passé parce que tu as lâché prise trop tôt, la bonne
          conclusion est-elle « je ne lâcherai plus jamais personne » ?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "Non — la conclusion est de mieux calibrer quand le faire, pas d'arrêter de le faire", correct: true },
            { value: "si", label: "Oui, mieux vaut être prudent", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. Un élève exécute bien un geste seulement quand il te sent à côté, et cherche ton regard
          dès qu&apos;il a fini. Est-ce déjà le moment de le lâcher sur cette chose-là ?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Oui — s'il l'exécute bien, le geste est déjà acquis", correct: false },
            { value: "no", label: "Non — il n'a pas encore fait sien le geste, il s'est habitué à ta présence, pas au mouvement", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un élève remarque que tu le regardes moins que d&apos;habitude aujourd&apos;hui et
          demande si tout va bien. Le silence, sur un geste déjà bon, est :
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "complimento", label: "Un compliment, pas une distraction", correct: true },
            { value: "distrazione", label: "Une distraction à corriger", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. <em>(du Chapitre 9)</em> Si même une deuxième proposition est refusée, faut-il continuer
          à en chercher d&apos;autres à l&apos;infini ?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Oui, jusqu'à trouver la bonne", correct: false },
            { value: "no", label: "Non — après un vrai deuxième essai, c'est correct de s'arrêter avec calme", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un élève que tu suis depuis deux ans te demande, pour la première fois, « comment
          c&apos;était ? » avant que tu dises quoi que ce soit. Écris en deux lignes comment tu
          réponds.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback : explique comment fonctionne la correction (§10)
  {
    day: "vendredi · feedback",
    pct: 73,
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
          Tu as répondu qu&apos;intervenir toujours, c&apos;est bien faire son travail. C&apos;est
          compréhensible de le penser — c&apos;est ce qui se voit le plus. Mais le but de tout ce qui
          est enseigné, c&apos;est un élève qui, sur cette chose-là, n&apos;a plus besoin de toi.
          Intervenir quand ce n&apos;est pas nécessaire ralentit exactement ça.
        </div>
      </>
    ),
  },

  // 8 — récupération : seulement si le test du vendredi a trop d'erreurs (§12, D25/D27)
  {
    day: "récupération",
    pct: 76,
    nextLabel: "Continuer ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "rallenta", t2: "no", t3: "graduale", t4: "si", t5: "no",
        t6: "no", t7: "no", t8: "complimento", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Récupération — juste parce que le test a trouvé quelques difficultés</div>
        <h1>Deux exemples en plus, pour t&apos;entraîner au bon silence</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de revoir le
          point le plus délicat de ce chapitre avec quelques exemples en plus — reconnaître quand se
          taire est la bonne réponse, et quand ce n&apos;est pas encore le cas.
        </p>

        <div className="card scene">
          <div className="who">Elena, 9 ans</div>
          <p>
            Il y a un mois, son virage demandait une correction à presque chaque tentative.
            Aujourd&apos;hui elle l&apos;exécute seule, regarde ses mains sous l&apos;eau et refait
            surface en souriant — sans chercher le regard de l&apos;instructeur. Lui s&apos;approche
            quand même du bord, prêt à dire quelque chose.
          </p>
        </div>
        <p className="prompt">Quelle est la bonne chose à faire ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "correggi", label: "Il lui donne quand même un petit conseil technique, par habitude", correct: false },
            {
              value: "tace",
              label: "Il reste silencieux — le sourire sans chercher de confirmation dit que le geste est déjà sien",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Filippo, 13 ans</div>
          <p>
            Il exécute le même exercice techniquement bien. Mais après chaque tentative il se
            retourne vivement vers l&apos;instructeur, en cherchant un signe, et reste immobile
            jusqu&apos;à ce qu&apos;il l&apos;obtienne.
          </p>
        </div>
        <p className="prompt">Est-ce déjà le moment de le lâcher sur cet exercice ?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Oui — s'il l'exécute techniquement bien, le geste est acquis", correct: false },
            {
              value: "no",
              label: "Non — il cherche encore une confirmation : il n'a pas encore fait sien le geste, il s'est habitué à ta présence, pas au mouvement",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Le lâcher-prise n&apos;est pas une règle identique pour tous : c&apos;est le silence dit au
          bon moment. Pas trop tôt, quand l&apos;élève a encore besoin de toi. Pas trop tard, quand
          c&apos;est désormais toi qui en as l&apos;habitude, pas lui le besoin.
        </p>
      </>
    ),
  },

  // 9 — vendredi : résultat
  {
    day: "vendredi · résultat",
    pct: 82,
    nextLabel: "Continuer ▸",
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
                <td style={{ padding: "6px 0" }}>Les 9 questions du test</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>La réponse au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Comment tu as répondu à Giulia au §8</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>Le récit du lundi sur le Chapitre 9</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Autonomie et amélioration continue
                </td>
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
    pct: 92,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Chapitre 10 terminé</div>
        <div className="eyebrow">Semaine 10 sur 10 · cours terminé</div>
        <h1>Les dix chapitres, bouclés</h1>
        <p className="lede">
          Tu as appris à lire, à entrer en mise en phase, à communiquer, à vérifier, à corriger, à
          changer de cap, à tenir le refus, à lâcher prise. Il ne manque plus qu&apos;une dernière
          réflexion, avant l&apos;examen final.
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
          <div className="chip consolidata">
            <span className="name">9 · Situations difficiles</span>
            <span className="state">consolidée</span>
          </div>
          <div className="chip acquisita">
            <span className="name">10 · Autonomie et amélioration</span>
            <span className="state">acquise</span>
          </div>
        </div>
      </>
    ),
  },

  // 11 — clôture : la clôture, avant l'examen
  {
    day: "clôture",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> La clôture — avant l&apos;examen</div>
        <h1>Dernière question, avant de continuer</h1>
        <p className="lede">
          Tu as essayé, cette semaine, de rester en silence sur un exercice qu&apos;un élève savait
          déjà bien faire. Comment ça s&apos;est passé ? Et, en regardant en arrière sur les dix
          semaines : quelle est la chose qui a le plus changé — chez un enfant, ou chez toi ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Cette réflexion reste entre toi et ton profil : celui qui évaluera ton examen final ne la
          verra jamais.
        </p>
        <div className="card quote">
          C&apos;est d&apos;ici que part l&apos;examen final. Ce n&apos;est pas une épreuve comme les
          neuf autres : c&apos;est le moment où tout ce que tu as construit — pas seulement ce que tu
          sais, mais ce que tu sais faire — est rassemblé et vérifié une seule fois, avec calme. Tu ne
          peux pas le rater — tu peux seulement le reporter. Si tu n&apos;es pas encore prêt, on
          revient en arrière, on renforce ce qui est nécessaire, et on réessaie. Le niveau exigé est
          le même pour tous. Le chemin pour y arriver, comme pour tout le cours, reste le tien.
        </div>
      </>
    ),
  },
];
