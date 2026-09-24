import { OptionGroup, type Option } from "@/components/OptionGroup";
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

// Traduction française de esame-turno-3.tsx — mêmes chapterId/clés de réponse/valeurs internes que
// l'original italien : seul le texte visible change. Porte 1:1
// beat1Outcome()/needsBeat2A()/matteoRecovered()/beat2Attention() du mockup esame-turno3.html —
// issue du Beat 1 : A = raison réelle + ton cohérent, B = raison réelle + ton incohérent,
// D = aucune raison réelle.
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
function matteoRecovered(a: Record<string, string>): boolean {
  return a.beat2a === "recupero";
}
type Beat2Attention = "libera" | "divisa";
function beat2Attention(a: Record<string, string>): Beat2Attention {
  const o = beat1Outcome(a);
  if (o === "A") return "libera";
  if (o === "D") return matteoRecovered(a) ? "libera" : "divisa";
  return "divisa"; // B
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Tu donnes une raison liée à un bénéfice concret (« ça t'allonge la nage, essaie et sens la différence ») avec un ton qui montre que sa réponse t'importe vraiment",
  },
  {
    value: "B",
    label:
      "Tu dis la bonne chose (« c'est utile pour toi ») mais en soupirant, en regardant ailleurs, avec un ton expéditif qui dit « je n'ai pas de temps pour ça »",
  },
  {
    value: "D",
    label: "« Parce que c'est moi qui le dis » ou « allez, ne fais pas d'histoires, on le fait, c'est tout » — aucune vraie raison",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "recupero",
    label:
      "Tu reconnais ne pas avoir donné de vraie raison, et tu la donnes maintenant (« tu as raison, arrête-toi un instant — je te le dis sérieusement... »)",
  },
  { value: "insisti", label: "Tu insistes sur l'autorité (« on le fait parce que c'est moi qui le dis, point »)" },
];
const ELENA_OPTIONS: Option[] = [
  { value: "silenzio", label: "Tu lui demandes son propre avis, ou tu restes silencieux en la laissant s'évaluer elle-même" },
  { value: "corregge", label: "Tu la corriges quand même, par habitude, même si l'observation est juste" },
];
const TONO_OPTIONS: Option[] = [
  {
    value: "congruente",
    label:
      "Retour précis et congruent — ex. « tu as poussé avec les jambes au virage, ça s'est vu », dit en le regardant",
  },
  {
    value: "tradisce",
    label: "Retour techniquement juste mais le ton le trahit — sarcastique, expéditif, ou dit alors que tu t'éloignes déjà",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Matteo fait les répétitions avec un engagement visible — pas parfait, mais réel. À la fin il dit : « ...ok, en effet, ça se sent différent. »",
  },
  B: {
    ok: false,
    text: "Matteo le fait, mais à moitié : les mots disaient une chose, le ton une autre, et il s'est arrêté sur cette contradiction plutôt que sur le contenu. « D'accord, comme tu veux » — il le fait, mais sans y chercher quoi que ce soit.",
  },
  D: {
    ok: false,
    text: "Matteo fait un tour mou, sans vraiment pousser — ce n'est pas un refus ouvert, c'est le strict minimum. Un ado de 14-18 ans, sans une raison, n'exécute pas vraiment (Chapitre 2) — il exécute juste ce qu'il faut pour ne pas se faire remarquer.",
  },
};

const BEAT2A_FEEDBACK: Record<"recupero" | "insisti", { ok: boolean; text: string }> = {
  recupero: {
    ok: true,
    text: "Matteo ralentit, te regarde — un peu surpris que tu sois revenu sur le sujet au lieu de laisser tomber. Au tour suivant, il pousse davantage.",
  },
  insisti: {
    ok: false,
    text: "Matteo ne répond pas, mais il fait le reste de l'entraînement détaché, silencieux, au minimum.",
  },
};

const ELENA_FEEDBACK: Record<"silenzio" | "corregge", { ok: boolean; text: string }> = {
  silenzio: {
    ok: true,
    text: "ELENA : « ...je crois que j'ai mieux tenu ma position cette fois. C'est vrai ? » — elle a déjà donné son propre avis avant de demander le tien.",
  },
  corregge: {
    ok: false,
    text: "ELENA : « ...ok. » — elle recommence en attendant, comme toujours, ton verdict final.",
  },
};

const TONO_FEEDBACK: Record<"congruente" | "tradisce", { ok: boolean; text: string }> = {
  congruente: {
    ok: true,
    text: "Matteo acquiesce, il ne dit pas grand-chose — mais au tour suivant, l'effort reste.",
  },
  tradisce: {
    ok: false,
    text: "Matteo se referme — les mots disaient une chose, le ton une autre, et la contradiction lui a fait perdre confiance.",
  },
};

const BEAT2_ATTENTION_TEXT: Record<Beat2Attention, string> = {
  libera: "Ton attention est libre, tu peux suivre Elena sans distractions.",
  divisa:
    "Un œil reste sur Matteo, qui nage quand même sans engagement juste à côté : donner à Elena l'attention calme qu'elle mérite coûte plus cher quand une partie de toi continue de le surveiller.",
};

export const esameTurno3StepsFr: Step[] = [
  // 0 — intro
  {
    day: "avant de commencer",
    pct: 0,
    nextLabel: "Commence ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Examen final · Épreuve 3</div>
        <h1>Les adolescents, et ceux qui savent déjà faire seuls</h1>
        <p className="lede">
          Tu es avec un groupe d&apos;ados de 14-18 ans. L&apos;échauffement prévoit des répétitions de virage — le
          préféré de personne. <strong>Matteo (16 ans)</strong> est dans le groupe depuis quelques mois.{" "}
          <strong>Elena (17 ans)</strong> te suit depuis trois ans : sur le virage, désormais, tu n&apos;as plus
          besoin de la regarder à chaque fois.
        </p>
        <div className="card warn">
          Ce n&apos;est pas un chapitre. Il n&apos;y a pas de bouton « question suivante ». Il n&apos;y a que ce qui
          se passe après ce que tu choisis.
        </div>
        <p className="lede">
          Comme dans les épreuves précédentes : l&apos;épreuve est divisée en <strong>beats</strong> — les moments
          d&apos;une même scène, l&apos;un après l&apos;autre — et la note va de 80 à 100, avec le{" "}
          <strong>100 avec félicitations</strong> réservé à qui sait aussi bien rattraper une erreur en temps réel.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Le pourquoi</div>
          <h1>« Pourquoi on doit toujours faire cet exercice, c&apos;est ennuyeux. »</h1>
          <p className="lede">
            Matteo s&apos;arrête, il ne croise pas les bras comme le ferait un enfant de douze ans — c&apos;est plus
            une vraie question qu&apos;un défi.
          </p>
          <p className="prompt">Qu&apos;est-ce que tu réponds — les mots que tu utilises, et avec quel ton ?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — récupération",
    pct: 24,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.beat2a as "recupero" | "insisti" | undefined;
      const fb = val ? BEAT2A_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2A · seulement parce que tu n&apos;as pas donné de vraie raison</div>
          <h1>Matteo au minimum</h1>
          <p className="lede">
            Matteo continue de nager au minimum, détaché du groupe d&apos;un mètre, sans pousser.
          </p>
          <p className="prompt">Tu as une deuxième bifurcation. Qu&apos;est-ce que tu fais maintenant ?</p>
          <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — beat2, la virata di Elena
  {
    day: "beat 2 — Elena",
    pct: 40,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q2 && !!a.elena,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const attn = beat2Attention(answers);
      const val = answers.elena as "silenzio" | "corregge" | undefined;
      const fb = val ? ELENA_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 2 · Lui faire confiance</div>
          <h1>Le virage d&apos;Elena</h1>
          <p className="lede">
            Pendant ce temps, indépendamment de la façon dont ça s&apos;est passé avec Matteo — c&apos;est un
            problème sans rapport, pas une conséquence — arrive le moment d&apos;Elena. Elle réalise un virage
            techniquement propre, celui qu&apos;il y a un an tu corrigeais presque à chaque fois. Aujourd&apos;hui,
            elle n&apos;en a pas eu besoin.
          </p>
          <div className="card">{BEAT2_ATTENTION_TEXT[attn]}</div>
          <p className="prompt">Qu&apos;est-ce que tu lui dis, juste après le virage ?</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="elena" options={ELENA_OPTIONS} selected={answers.elena} onPick={(v) => setResponse("elena", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 4 — beat3, congruenza sotto pressione
  {
    day: "beat 3 — Matteo",
    pct: 60,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.tono,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const val = answers.tono as "congruente" | "tradisce" | undefined;
      const fb = val ? TONO_FEEDBACK[val] : null;
      return (
        <>
          <div className="eyebrow">Beat 3 · Congruence sous pression</div>
          <h1>Le premier vrai effort de Matteo, aujourd&apos;hui</h1>
          <p className="lede">
            Vers la fin de l&apos;épreuve, Matteo — quelle que soit la version à laquelle tu es arrivé — essaie pour
            la première fois aujourd&apos;hui avec un vrai engagement. Même dans la version « Matteo détaché »,
            quelque chose le pousse : il voit Elena recevoir de la confiance au lieu de corrections, et il essaie.
            L&apos;exécution n&apos;est pas parfaite, mais il y a, pour la première fois aujourd&apos;hui, un vrai
            effort.
          </p>
          <p className="prompt">
            Écris ce que tu lui dis — ça doit rester cohérent : les mots, le ton et ce que ton corps communique
            doivent dire la même chose.
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>Ce que tu fais vraiment, en pratique</h2>
          <OptionGroup name="tono" options={TONO_OPTIONS} selected={answers.tono} onPick={(v) => setResponse("tono", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "clôture",
    pct: 82,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Clôture de l&apos;Épreuve 3 — la dernière des trois</div>
        <h1>En regardant en arrière sur les trois épreuves ensemble</h1>
        <p className="prompt">
          Qu&apos;est-ce que tu as appris sur toi-même comme moniteur, que tu ne savais pas en regardant seulement
          les dix chapitres un par un ?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Cette réflexion ne compte pas dans la note : c&apos;est la dernière avant le résultat final de
          l&apos;examen.
        </p>
      </>
    ),
  },

  // 6 — risultato
  {
    day: "résultat",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c2 = o === "D" ? (matteoRecovered(answers) ? "ratée, mais rattrapée" : "ratée, non rattrapée") : "gérée";
      const b1c5 = o === "A" ? "ton cohérent" : o === "B" ? "ton incohérent" : "aucune raison donnée";
      const b3c5 = answers.tono === "congruente" ? "retour congruent" : "ton qui trahit les mots";
      const c10 = answers.elena === "silenzio" ? "gérée" : "occasion manquée, pas une erreur grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Épreuve 3 terminée</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Les trois épreuves sont closes</div>
          <div className="eyebrow">Comment lire le résultat</div>
          <h1>Les adolescents, et ceux qui savent déjà faire seuls</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C2 · Communication adaptée à l&apos;âge (14-18)</span>
              <span className="esito">{c2}</span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Congruence</span>
              <span className="esito">
                Beat 1 : {b1c5} · Beat 3 : {b3c5}
              </span>
            </div>
            <div className="result-row">
              <span className="comp">C10 · Autonomie</span>
              <span className="esito">{c10}</span>
            </div>
          </div>
          {o === "D" && matteoRecovered(answers) && (
            <div className="card quote">
              Faire marche arrière sur un ordre mal donné, devant l&apos;ado qui t&apos;a mis à l&apos;épreuve, sans
              perdre la face et sans faire de scène : c&apos;est un bon rattrapage, fait sous observation. Exactement
              le genre de preuve qu&apos;il faut pour le 100 avec félicitations.
            </div>
          )}
          <p className="lede">
            L&apos;épreuve se termine dans tous les cas, quel que soit le chemin que tu as pris — cohérent avec « on
            ne peut pas échouer, seulement remettre à plus tard ». Avec ça, les trois épreuves de l&apos;examen final
            sont terminées.
          </p>
        </>
      );
    },
  },
];
