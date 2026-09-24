import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Escreva aqui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

// Tradução para o português (Brasil) de caso-reale-04.tsx — mesmos chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero() do mockup caso-reale-04.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você procura a causa antes de insistir — se aproxima, diminui o ritmo, pergunta com calma se ele está cansado ou se prefere um jogo mais simples",
  },
  { value: "B", label: "Você insiste no exercício previsto, talvez com um tom mais firme ou prometendo uma recompensa" },
];
const REC_OPTIONS: Option[] = [
  {
    value: "abbassi",
    label: "Você para, diminui as exigências e oferece algo bem mais simples e lúdico, sem mencionar mais o exercício de antes",
  },
  { value: "insisti", label: "Você continua insistindo no exercício, esperando que o choro passe sozinho" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "O Samuele se abre um pouco: «...estou cansado.» Não era uma recusa da água, era uma criança de 4 anos sem mais energia — e nessa idade, dizer isso com um «não» é normal.",
  },
  B: {
    ok: false,
    text: "O Samuele se fecha ainda mais, repete «não» com mais força, e começa a chorar.",
  },
};

const REC_FEEDBACK: Record<"abbassi" | "insisti", { ok: boolean; text: string }> = {
  abbassi: {
    ok: true,
    text: "O Samuele se acalma, aos poucos. Ele não vai fazer o exercício previsto hoje — mas volta a ficar na água com você, e isso já é muito.",
  },
  insisti: {
    ok: false,
    text: "O Samuele continua fechado pelo resto da aula — o episódio não se resolveu, só parou.",
  },
};

export const casoReale04StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 04",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 04</div>
        <h1>A criança que recusa a instrução</h1>
        <p className="lede">
          Faixa 3-5. Competências: situações difíceis (Cap. 9) · sintonia (Cap. 4). Nessa idade, «não quero» raramente
          é desafio social — na maioria das vezes é sobrecarga: coisas demais ao mesmo tempo, pouca capacidade de dizer
          isso com palavras.
        </p>
        <div className="card">
          Cenário curto e independente — não tem pontuação de exame: é material que você pode acessar quando quiser.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situação",
    pct: 20,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Samuele, 4 anos</h1>
          <p className="lede">
            No terceiro exercício da aula, ele cruza os braços e diz, com voz pequena mas decidida: «não, não vou
            fazer.» Ele não está bravo com você — parece só exausto.
          </p>
          <p className="prompt">
            O que você faz — não o que você diz para convencê-lo, mas o que você faz para entender o que existe por
            trás desse «não»?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "recuperação",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "abbassi" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Samuele chora, sentado na borda</h1>
          <p className="lede">Ele não responde mais aos pedidos.</p>
          <p className="prompt">O que você faz agora?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — chiusura
  {
    day: "encerramento",
    pct: 75,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que você leva com você</h1>
        <p className="prompt">
          O que você leva com você, para a próxima vez que uma criança pequena disser «não» sem parecer brava?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em pontuação.
        </p>
      </>
    ),
  },

  // 4 — come si legge
  {
    day: "como interpretar",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida na primeira tentativa" : answers.rec === "abbassi" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A criança que recusa a instrução</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situações difíceis (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Nem todo «não», aos 3-5 anos, é um problema de relação para resolver — às vezes é só um jeito simples de dizer
            uma coisa verdadeira: por hoje, chega.
          </p>
        </>
      );
    },
  },
];
