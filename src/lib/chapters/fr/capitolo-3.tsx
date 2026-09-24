import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduction française, pas un chapitre indépendant : mêmes chapterId/clés de réponse/valeurs
// internes que le chapitre italien (src/lib/chapters/capitolo-3.tsx) — seul le texte visible
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

// Reprend 1:1 la fonction simPath() de la maquette : classe la combinaison des deux premiers
// choix de la simulation avec Luca dans un parcours "aperta" (il y a un troisième échange, en
// texte libre) ou "chiusa" (la scène se termine sans troisième échange).
function simPath(answers: Record<string, string>): "aperta" | "chiusa" {
  if (answers.sim1 === "curioso" && answers.sim2 === "scalda") return "aperta";
  if (answers.sim1 === "diretto" && answers.sim2 === "calma") return "aperta";
  return "chiusa";
}

const K1_OPTIONS: Option[] = [
  { value: "si", label: "Oui, la peur est la même à tout âge", correct: false },
  { value: "no", label: "Non — à 5 ans un jeu ou une main tendue, à 13 ans ne pas être regardée pendant qu'elle hésite", correct: true },
];
const K2_OPTIONS: Option[] = [
  { value: "bracciata", label: "« Parce que ça allonge ta nage — essaie et sens la différence »", correct: true },
  { value: "dico", label: "« Parce que c'est moi qui le dis, fais-le maintenant »", correct: false },
];
const K3_OPTIONS: Option[] = [
  { value: "risponde", label: "À sa façon de répondre", correct: true },
  { value: "carta", label: "À sa carte d'identité", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "eta", label: "Tu le traites selon son âge officiel", correct: false },
  { value: "comportamento", label: "Tu le traites selon le comportement qu'il montre", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Non — la tranche d'âge se lit aussi au contexte", correct: true },
  { value: "si", label: "Oui, tu t'étais trompé en le jaugeant", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "si", label: "Oui, si c'est clair", correct: false },
  { value: "no", label: "Non — il le perd à mi-chemin, même s'il semble écouter", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "freddo", label: "Froid", correct: true },
  { value: "paura", label: "Peur", correct: false },
  { value: "via", label: "Attend le feu vert", correct: false },
  { value: "capito", label: "N'a pas compris", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "paura", label: "Peur", correct: false },
  { value: "freddo", label: "Froid", correct: false },
  { value: "via", label: "Attend le feu vert", correct: true },
  { value: "capito", label: "N'a pas compris", correct: false },
];
const M3_OPTIONS: Option[] = [
  { value: "via", label: "Attend le feu vert", correct: false },
  { value: "freddo", label: "Froid", correct: false },
  { value: "capito", label: "N'a pas compris — la consigne n'est pas encore claire, il faut la réexpliquer, un signe ne suffit pas", correct: true },
  { value: "paura", label: "Peur", correct: false },
];
const M4_OPTIONS: Option[] = [
  { value: "no", label: "Non, les quatre signaux restent toujours distincts et fixes", correct: false },
  { value: "si", label: "Oui — le signal peut changer pendant que tu observes, si l'attente se prolonge trop", correct: true },
];

const SIM1_OPTIONS: Option[] = [
  { value: "diretto", label: "« Allez Luca, tu y es déjà arrivé, entre »" },
  { value: "curioso", label: "« Luca, qu'est-ce que tu ressens ? C'est froid, ou tu as un peu la chair de poule ? »" },
];
const SIM2_OPTIONS_DIRETTO: Option[] = [
  { value: "insisti", label: "« Allez Luca, tu sais faire, vas-y »" },
  { value: "calma", label: "Tu t'approches, tu baisses la voix, tu demandes calmement ce qu'il ressent" },
];
const SIM2_OPTIONS_CURIOSO: Option[] = [
  { value: "entra", label: "Tu le fais entrer quand même, en disant que le froid passera dans l'eau" },
  { value: "scalda", label: "Tu lui proposes trente secondes de mouvement à sec au bord, comme avec Giada" },
];

const T1_OPTIONS: Option[] = [
  { value: "capito", label: "N'a pas compris", correct: false },
  { value: "paura", label: "A peur", correct: true },
  { value: "freddo", label: "A froid", correct: false },
  { value: "via", label: "Attend le feu vert", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "paura", label: "A peur", correct: false },
  { value: "capito", label: "N'a pas compris", correct: false },
  { value: "via", label: "Attend le feu vert", correct: true },
  { value: "freddo", label: "A froid", correct: false },
];
const T3_OPTIONS: Option[] = [
  { value: "calore", label: "Manque de chaleur — probablement froid", correct: true },
  { value: "coraggio", label: "Manque de courage", correct: false },
  { value: "spiegazione", label: "Manque une explication plus claire", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "tecnica", label: "Une explication technique comme à un adulte", correct: false },
  { value: "motivo", label: "Une raison pratique et directe", correct: true },
  { value: "niente", label: "Aucune réponse, il exécute", correct: false },
];
const T5_OPTIONS: Option[] = [
  { value: "si", label: "Oui — si tu regardes attentivement, tu comprends automatiquement ce qui se passe", correct: false },
  { value: "no", label: "Non — regarder, c'est voir qu'il s'est passé quelque chose ; comprendre, c'est décider ce que ça signifie", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "no", label: "Non — ça enseigne quand même quelque chose, souvent le contraire", correct: true },
  { value: "si", label: "Oui, l'important est d'essayer", correct: false },
];
const T7_OPTIONS: Option[] = [
  { value: "si", label: "Oui, si les réponses sont correctes", correct: false },
  { value: "no", label: "Non — il faut toujours au moins un vrai cours en bassin", correct: true },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "Non, les quatre signaux restent toujours distincts", correct: false },
  { value: "si", label: "Oui — le signal peut changer pendant que tu observes, si l'attente se prolonge", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "misto", label: "Un mélange entre l'attente du feu vert et la gêne d'un nouveau groupe qui regarde", correct: true },
  { value: "dimenticato", label: "Il a oublié comment on fait le plongeon", correct: false },
  { value: "acqua", label: "Il a peur de l'eau", correct: false },
];

const DIARY_KEYS = ["q2", "q7", "sim3", "qtrasf", "t10"];

export const capitolo3StepsFr: Step[] = [
  // 0 — couverture
  {
    day: "début",
    pct: 0,
    nextLabel: "Commencer ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapitre 3 · REGARDER ET COMPRENDRE <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>Il s&apos;est arrêté : il a peur, ou il n&apos;a pas compris ?</h1>
        <p className="lede">
          Face à un enfant qui s&apos;arrête, se bloque ou hésite, l&apos;instructeur sait
          distinguer entre quatre causes différentes — et sait qu&apos;à chacune il répond
          différemment.
        </p>
        <div className="card warn">
          <strong>Un niveau plus exigeant.</strong> Chaque compétence de ce cours passe par une
          échelle de niveaux, dans l&apos;ordre :{" "}
          <strong>EN DÉVELOPPEMENT → ACQUISE → CONSOLIDÉE → EXCELLENTE</strong> — mais pour deux
          d&apos;entre elles seulement, marquées du symbole <i className="ph-duotone ph-trophy" aria-hidden="true" />, le cours demande d&apos;aller plus
          loin : jusqu&apos;à <strong>EXCELLENTE</strong>. Celle-ci (Regarder et comprendre) et le
          Chapitre 6 (Vérifier par l&apos;action) sont les deux compétences de l&apos;écoute : ici,
          ACQUISE ne suffit pas, il faut EXCELLENTE avant l&apos;examen final — et la simulation
          seule ne suffit jamais : il faut toujours au moins un vrai cours en bassin.
        </div>
      </>
    ),
  },

  // 1 — lundi : réflexion + consolidation Chapitre 2
  {
    day: "lundi · 10 min",
    pct: 10,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lundi</div>
        <h1>Comment ça s&apos;est passé dans le bassin ?</h1>
        <p className="lede">
          La semaine dernière, le Chapitre 2 t&apos;a demandé une seule chose : choisir un élève et
          comprendre sa tranche à sa façon de te répondre, pas à son âge. Raconte en deux lignes ce
          que tu as remarqué.
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — le Chapitre 2 revient</h2>
        <p className="prompt">1. Marco (5 ans) et Elena (13 ans) n&apos;entrent pas dans l&apos;eau seuls. Même phrase pour les deux ?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Un jeune de 15 ans demande : « pourquoi je dois faire justement cet exercice ? ». Tu réponds :</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. La tranche d&apos;âge se reconnaît-elle mieux à la façon de répondre ou à la carte d&apos;identité ?</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Un enfant de 10 ans se comporte comme un de 12 ans — il cherche l&apos;intimité avant d&apos;être corrigé. Que fais-tu ?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">5. Un jeune de 13 ans, seul avec toi sans le groupe, se comporte plus ouvertement que d&apos;habitude. Est-ce une contradiction ?</p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">6. Traiter un enfant de 7 ans avec une longue explication technique, comme un adulte, ça fonctionne ?</p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — mardi : les quatre causes
  {
    day: "mardi · 14 min",
    pct: 28,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Mardi</div>
        <h1>Regarder et comprendre ne sont pas la même chose</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Cette semaine, tu apprends à faire deux choses qui semblent n&apos;en faire qu&apos;une,
          et ce n&apos;est pas le cas : regarder, et comprendre ce que tu regardes.
        </p>
        <p className="lede">
          Un enfant s&apos;arrête au bord du bassin, un instant avant un plongeon qu&apos;il a déjà
          fait dix fois. <strong>Regarder</strong>, c&apos;est voir qu&apos;il s&apos;est arrêté —
          tout le monde le voit. <strong>Comprendre</strong>, c&apos;est la partie difficile :
          cette pause peut vouloir dire quatre choses différentes.
        </p>
        <div className="table-wrap">
          <table className="cause">
            <tbody>
              <tr>
                <th>Il a...</th>
                <th>Et le signe est...</th>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-waves" aria-hidden="true" /> Peur</td>
                <td>Le corps se raidit, les yeux restent fixés sur l&apos;eau, pas sur toi</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-question" aria-hidden="true" /> N&apos;a pas compris</td>
                <td>Il te regarde, avec une hésitation — il attend un signal qui ne vient pas</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-snowflake" aria-hidden="true" /> Froid</td>
                <td>Les bras se serrent contre le corps, il tremble peut-être un peu — aucune raideur, aucune recherche de ton regard</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-eye" aria-hidden="true" /> Attend le feu vert</td>
                <td>Il te cherche des yeux avant de bouger — il a besoin de ton feu vert</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Si tu réponds à la mauvaise cause, cet enfant apprend quand même quelque chose — ce
          n&apos;est juste pas ce que tu voulais lui enseigner.
        </div>
        <p className="lede">
          <strong>
            Une dernière chose, avant d&apos;avancer : elle complique le tableau exprès, comme
            déjà la tranche d&apos;âge au chapitre précédent.
          </strong>{" "}
          Un enfant ne reste pas figé sur une photo : le signal peut changer pendant que tu
          l&apos;observes, surtout si tu attends trop avant de répondre. Un enfant qui, au début,
          attend seulement ton feu vert — les yeux sur toi, le corps détendu — peut changer si tu
          mets trop de temps à répondre. Le long silence devient lui-même un signal : il lui semble
          que quelque chose ne va pas. Et ainsi ce qui était « attendre le feu vert » commence à
          devenir une vraie peur. Observer, ce n&apos;est pas prendre une photo une seule fois :
          c&apos;est continuer à regarder même après avoir décidé d&apos;une réponse.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée</h2>
        <p className="prompt">1. Épaules serrées, léger tremblement, aucune recherche de ton regard.</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. Il te cherche des yeux avant de bouger, corps non tendu.</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Tu viens de montrer un exercice nouveau, jamais fait avant. L&apos;enfant entre dans
          l&apos;eau, s&apos;arrête à mi-chemin, te regarde — il n&apos;attend pas un signe pour
          continuer : il semble vraiment ne pas savoir quoi faire maintenant.
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
        <p className="prompt">
          4. Un enfant qui attend seulement ton feu vert peut-il, si tu mets trop de temps à lui
          répondre, commencer à montrer des signes de vraie peur ?
        </p>
        <OptionGroup name="m4" options={M4_OPTIONS} selected={answers.m4} onPick={(v, correct) => setResponse("m4", v, correct)} />
      </>
    ),
  },

  // 3 — mercredi : cinq enfants, cinq lectures + simulation Luca (trois échanges)
  {
    day: "mercredi",
    pct: 44,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: (a) => {
      if (!a.sim1) return false;
      if (!a.sim2) return false;
      const path = simPath(a);
      if (path === "aperta") return !!a.sim3;
      return true;
    },
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const promptStyle = {
        fontSize: ".8rem",
        textTransform: "uppercase" as const,
        letterSpacing: ".03em",
        color: "var(--surface)",
        fontFamily: "var(--mono)",
        fontWeight: 700,
      };
      const sim2Options = answers.sim1 === "diretto" ? SIM2_OPTIONS_DIRETTO : SIM2_OPTIONS_CURIOSO;
      const path = answers.sim1 && answers.sim2 ? simPath(answers) : null;

      return (
        <>
          <div className="eyebrow">Mercredi</div>
          <h1>Cinq enfants, cinq lectures</h1>
          <div className="card scene">
            <div className="who">Sofia, 4 ans</div>
            <p>
              Pied dans l&apos;eau jusqu&apos;à la cheville, immobile. Épaules remontées,
              serrées ; yeux fixés sur l&apos;eau, elle ne le cherche pas des yeux. C&apos;est de
              la peur, pas de l&apos;incompréhension. L&apos;instructeur se met à côté d&apos;elle,
              tend la main : « viens, je te tiens. »
            </p>
          </div>
          <div className="card scene">
            <div className="who">Leo, 6 ans</div>
            <p>
              Il vient de voir l&apos;instructeur montrer deux fois un exercice nouveau, jamais
              fait avant. Il entre dans l&apos;eau et s&apos;arrête tout de suite, corps calme,
              aucun tremblement. Il regarde l&apos;instructeur — mais pas avec les yeux de
              quelqu&apos;un qui attend un signe : il cherche quelque chose qu&apos;il ne trouve
              pas. Il n&apos;a pas compris, un signe ne lui servira à rien : l&apos;instructeur
              refait la séquence une fois de plus, plus lentement, en isolant seulement les bras.
              Leo la refait tout de suite, sans plus s&apos;arrêter.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Giada, 8 ans</div>
            <p>
              Bras serrés autour du corps, épaules voûtées, un léger tremblement dans les mains.
              Elle ne cherche pas le regard de l&apos;instructeur, ses yeux ne sont pas fixes et
              effrayés. C&apos;est juste le froid. Trente secondes de mouvement à sec au bord,
              avant de la faire entrer.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Nadia, 12 ans</div>
            <p>
              Elle doit refaire un plongeon qu&apos;elle réussit déjà bien, mais aujourd&apos;hui
              le groupe est différent de d&apos;habitude — quelques jeunes plus âgés, arrivés pour
              un remplacement. Elle s&apos;arrête au bord : elle ne tremble pas, le corps
              n&apos;est pas tendu, mais elle cherche le regard de l&apos;instructeur deux, trois
              fois, sans rien dire. Ce n&apos;est pas la peur du plongeon : ça, elle sait déjà le
              faire. Et ce n&apos;est pas non plus juste « attendre le feu vert ». Il y a aussi la
              gêne du nouveau groupe — la même dont parlait déjà le Chapitre 2 pour cet âge.
              L&apos;instructeur ne dit rien à voix haute : il lui fait juste un petit signe, le
              même qu&apos;il lui ferait si le groupe était celui de d&apos;habitude. Nadia
              plonge.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Matteo, 14 ans</div>
            <p>
              Immobile sur le plot de départ, le groupe le regarde. Le corps est tendu
              différemment, les yeux cherchent l&apos;instructeur un instant. Ce n&apos;est pas
              l&apos;eau : c&apos;est la file qui le regarde. L&apos;instructeur baisse la voix,
              juste pour lui : « prends une seconde, j&apos;attends. »
            </p>
          </div>
          <p className="lede">
            <strong>
              Même pause, cinq enfants, cinq lectures différentes — toutes les cinq justes,
              précisément parce qu&apos;elles sont différentes.
            </strong>{" "}
            Avec Nadia, comme avec Matteo, le signe silencieux a mieux fonctionné que n&apos;importe
            quelle phrase. Avec Leo, en revanche, un signe n&apos;aurait servi à rien : ce qui
            manquait, c&apos;était l&apos;explication, pas la permission.
          </p>
          <p className="prompt">
            Un enfant de 7 ans, arrêté à mi-chemin de la traversée en brasse. Tu ne sais pas s&apos;il
            a peur, s&apos;il ne se souvient pas du mouvement, ou s&apos;il attend un signal de ta
            part. Que lui dis-tu — ou que lui demandes-tu — pour comprendre, AVANT de lui donner
            une nouvelle consigne ?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Note de correction, non montrée à l'instructeur : il n'existe pas une seule bonne
              réponse. Le système cherche une chose — qu'il demande, sans supposer. Une consigne
              directe ferme l'information, quelle que soit la vraie cause. */}
          <h2>Simulation — trois échanges pour amener Luca dans l&apos;eau</h2>
          <p className="lede">
            <strong>LUCA, 9 ans.</strong> Au bord du bassin, un pied dedans, il n&apos;entre pas.
            Le groupe attend.
          </p>
          <p className="prompt" style={promptStyle}>Premier échange</p>
          <p className="lede">Que lui dis-tu en premier ?</p>
          <OptionGroup name="sim1" options={SIM1_OPTIONS} selected={answers.sim1} onPick={(v) => setResponse("sim1", v)} />
          {answers.sim1 === "diretto" && (
            <div className="feedback retry">
              LUCA : <em>(recule d&apos;un demi-pas, le pied sort de l&apos;eau)</em> « ...mais moi
              je ne veux pas. »
              <br />
              Une consigne directe a fermé l&apos;information qui te manquait, quelle que soit la
              vraie cause.
            </div>
          )}
          {answers.sim1 === "curioso" && (
            <div className="feedback ok">
              LUCA : <em>(indique ses bras, se serre un peu)</em> « ...j&apos;ai des frissons. »
              <br />
              Une question ouverte t&apos;a donné l&apos;information : c&apos;est le froid, pas la
              peur. Luca s&apos;ouvre au lieu de se fermer.
            </div>
          )}

          {answers.sim1 && (
            <>
              <p className="prompt" style={promptStyle}>Deuxième échange</p>
              {answers.sim1 === "diretto" ? (
                <p className="lede">
                  Le groupe attend encore, et Luca est maintenant plus loin du bord. Que lui
                  dis-tu maintenant ?
                </p>
              ) : (
                <p className="lede">
                  Il a encore froid, et le groupe attend. Que fais-tu maintenant — pas seulement
                  ce que tu dis ?
                </p>
              )}
              <OptionGroup name="sim2" options={sim2Options} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {answers.sim2 === "insisti" && (
                <div className="feedback retry">
                  LUCA recule d&apos;un pas de plus, ne répond plus — reste silencieux, regarde
                  ailleurs.
                </div>
              )}
              {answers.sim2 === "calma" && (
                <div className="feedback ok">
                  LUCA : « ...je ne sais pas, je n&apos;en ai pas envie, c&apos;est tout. »{" "}
                  <em>(il s&apos;arrête, ne recule plus — ce n&apos;est pas une information claire,
                  mais le contact est revenu)</em>
                </div>
              )}
              {answers.sim2 === "entra" && (
                <div className="feedback retry">
                  LUCA hésite encore plus, se serre davantage — il ne se sent pas cru, et
                  maintenant il a encore moins envie d&apos;entrer qu&apos;avant.
                </div>
              )}
              {answers.sim2 === "scalda" && (
                <div className="feedback ok">
                  LUCA se réchauffe, se serre un peu moins, et commence à s&apos;approcher du bord
                  tout seul, sans que tu doives le lui redire.
                </div>
              )}
            </>
          )}

          {path === "aperta" && (
            <>
              <p className="prompt" style={promptStyle}>Troisième échange — la conclusion</p>
              <p className="lede">
                Luca est maintenant proche du bord, encore un peu hésitant mais pas fermé. Écris la
                dernière chose que tu lui dis avant qu&apos;il entre.
              </p>
              <Field id="sim3" value={answers.sim3 ?? ""} onChange={(v) => setReflection("sim3", v)} />
              <p className="lede" style={{ fontSize: ".85rem" }}>N&apos;importe quelle réponse raisonnable conclut bien la scène.</p>
              <div className="feedback ok" style={{ marginTop: 10 }}>
                LUCA entre, un pied après l&apos;autre, mais il entre. Tu n&apos;as rien gagné — tu
                as juste compris, au lieu de deviner.
              </div>
            </>
          )}
          {path === "chiusa" && (
            <>
              <p className="prompt" style={promptStyle}>La scène s&apos;arrête là — pas aujourd&apos;hui</p>
              <div className="feedback retry">
                Le groupe, pendant ce temps, a avancé sans Luca. Luca reste au bord, silencieux.
                Ce n&apos;est pas un échec : c&apos;est une information. Quelle qu&apos;elle soit,
                tu ne l&apos;as pas trouvée à temps aujourd&apos;hui. Ce qui compte, c&apos;est ce
                que tu fais la prochaine fois qu&apos;il s&apos;arrête — pas ce qui s&apos;est
                passé cette fois-ci.
              </div>
            </>
          )}
        </>
      );
    },
  },

  // 4 — mercredi soir : transfert
  {
    day: "mercredi soir",
    pct: 58,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Contrôle de fin de journée — transfert</div>
        <h1>Une scène jamais vue</h1>
        <p className="lede">
          Un enfant de 10 ans s&apos;arrête à mi-chemin d&apos;un exercice. Il regarde droit
          devant, ne tremble pas, ne te cherche pas des yeux — mais sa respiration est plus courte
          que d&apos;habitude.
        </p>
        <p className="prompt">Quelle cause te semble la plus probable, et pourquoi ? Écris ton raisonnement, pas seulement la réponse.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Note de correction, non montrée à l'instructeur : ce n'est pas directement dans le
            tableau — c'est voulu : c'est souvent de la fatigue, un cas qui ressemble aux quatre
            causes sans être exactement aucune d'elles. Le système vérifie s'il observe encore,
            pas s'il a la réponse exacte. */}
      </>
    ),
  },

  // 5 — dans le bassin
  {
    day: "dans le bassin",
    pct: 66,
    nextLabel: "Continuer ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Ton cours au bassin</div>
        <h1>Arrête-toi une seconde, toi, en premier</h1>
        <p className="lede">
          Au premier enfant qui s&apos;arrête ou hésite, avant de dire quoi que ce soit :
          arrête-toi une seconde toi-même, en premier, et décide laquelle des quatre causes te
          semble la plus probable. Puis réponds à celle-là, pas à la première phrase qui te vient à
          l&apos;esprit.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>Pas besoin de trouver juste. Il faut s&apos;être posé la question avant de parler.</p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Si tu n&apos;as pas de cours cette semaine : le chapitre se débloque quand même avec une
          simulation renforcée — mais ça ne suffit pas pour amener cette compétence à EXCELLENTE.
          Pour ça, il faut, tôt ou tard, un vrai cours en bassin.
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
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Vendredi — test cumulatif : Chapitre 2 + Chapitre 3</div>
        <h1>Le test</h1>
        <p className="prompt">
          1. Un enfant de 12 ans se bloque avant un plongeon déjà réussi. Il ne te regarde pas,
          fixe l&apos;eau, épaules tendues vers le haut.
        </p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Une fille de 5 ans s&apos;arrête et te cherche des yeux, sans tension dans le corps.</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Elle tremble légèrement, bras serrés contre le corps, mais ne cherche pas ton regard et n&apos;a pas les épaules raides.</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">
          4. <em>(du Chapitre 2)</em> Un jeune de 16 ans demande le pourquoi d&apos;un exercice. La
          bonne réponse pour sa tranche d&apos;âge est :
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">5. Regarder et comprendre, est-ce la même chose ?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Répondre à la mauvaise cause est-il une erreur neutre ?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Pour cette compétence, une bonne simulation suffit-elle pour EXCELLENTE ?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">
          8. Un enfant qui attend seulement ton feu vert peut-il, si tu mets trop de temps à lui
          répondre, commencer à montrer des signes de vraie peur ?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Nadia, 12 ans, hésite devant un plongeon qu&apos;elle sait déjà faire, parce que le
          groupe ce jour-là est différent de d&apos;habitude. Qu&apos;est-ce qu&apos;il y a
          derrière, le plus probablement ?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Un enfant de 8 ans exécute un exercice de façon incorrecte pour la troisième fois de
          suite, toujours de la même façon. Que regardes-tu, et que commences-tu à soupçonner ?
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
          Tu as répondu « il a peur » à la question 2. Relis le signal : aucune tension dans le
          corps, seulement le regard qui te cherche. La peur se voit d&apos;habitude dans le corps
          avant de se voir dans les yeux. Quand le regard te cherche seulement, sans rien d&apos;autre,
          c&apos;est souvent juste le feu vert qui manque — essaie de l&apos;offrir avant
          d&apos;offrir du réconfort.
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
        t1: "paura", t2: "via", t3: "calore", t4: "motivo", t5: "no",
        t6: "no", t7: "no", t8: "si", t9: "misto",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Rattrapage — seulement parce que le test a repéré des difficultés</div>
        <h1>Deux signaux de plus, pour ne pas les confondre</h1>
        <p className="lede">
          Ce n&apos;est pas un échec : c&apos;est juste le signal qu&apos;il vaut la peine de
          revoir les deux signaux les plus semblables de ce chapitre — le froid et l&apos;attente
          du feu vert — avec un exemple de plus chacun.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 6 ans</div>
          <p>
            Immobile au bord, bras serrés autour du corps, un léger tremblement dans les mains. Il
            ne cherche pas le regard de l&apos;instructeur — il regarde distraitement vers
            l&apos;eau, pas vers lui.
          </p>
        </div>
        <p className="prompt">Qu&apos;est-ce qui lui manque le plus probablement ?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "via", label: "Le feu vert — il attend un signe", correct: false },
            {
              value: "freddo",
              label: "De la chaleur — aucune recherche du regard, seulement le corps qui se serre : il a froid",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Bianca, 9 ans</div>
          <p>
            Immobile au bord, corps détendu, aucun tremblement. Avant de mettre un pied dans
            l&apos;eau, elle te cherche des yeux deux fois, sans rien dire, comme si elle attendait
            un signe de toi.
          </p>
        </div>
        <p className="prompt">Qu&apos;est-ce qui lui manque le plus probablement ?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "via",
              label: "Ton feu vert — le corps est détendu, elle cherche juste ton signe",
              correct: true,
            },
            { value: "freddo", label: "De la chaleur — elle a probablement froid", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          La façon la plus rapide de les distinguer : celui qui a froid se serre et ne te cherche
          pas ; celui qui attend le feu vert reste calme et te cherche des yeux. Regarde surtout
          là.
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
                <td style={{ padding: "6px 0" }}>La phrase que tu as écrite au §7</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Comment tu as amené Luca dans l&apos;eau au §8, dans les trois échanges</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Le récit de lundi sur le Chapitre 2</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>transfer_score</td>
                <td style={{ padding: "6px 0" }}>La même réflexion, sur le transfert réel</td>
                <td style={{ textAlign: "right" }}>enregistré ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Observer et interpréter</td>
                <td style={{ padding: "6px 0" }}>Le plus bas des scores précédents fixe le plafond</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Pour cette compétence précise : même en atteignant ACQUISE ou CONSOLIDÉE, le statut
          EXCELLENTE ne se déclenche pas sans au moins un vrai cours en bassin raconté et vérifié.
          Aujourd&apos;hui elle reste à ACQUISE — le vrai bassin arrive avec un vrai cours, pas
          avec cette simulation.
        </p>
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
        <div className="done-badge">✓ Chapitre 3 terminé</div>
        <div className="eyebrow">Semaine 3 sur 10 · Chapitre 4 à venir</div>
        <h1>La mise en phase</h1>
        <p className="lede">
          Tu as appris à lire ce qui se passe chez un enfant. La semaine prochaine, tu apprends
          pourquoi, même quand tu as bien lu, parfois il ne t&apos;écoute quand même pas.
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
          <div className="chip acquisita">
            <span className="name">3 · Observer et interpréter <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">acquise</span>
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
