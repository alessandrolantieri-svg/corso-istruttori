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

// Tradução para o português (Brasil) de caso-reale-02.tsx — mesmos chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero() do mockup caso-reale-02.html.
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
      "Você realmente se coloca no campo de visão dele — não só ao lado, mas entre ele e a distração — esperando que os olhos dele cheguem até os seus antes de falar",
  },
  { value: "B", label: "Você repete a mesma instrução mais alto, da sua posição, sem captar o olhar dele" },
];
const REC_OPTIONS: Option[] = [
  { value: "sposti", label: "Você se move fisicamente para o campo de visão dele e espera o contato visual antes de falar" },
  { value: "voce", label: "Você levanta a voz ainda mais, esperando que dessa vez funcione" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "O Nicolò olha para você. Você dá a instrução uma vez, simples: «pega a minha mão, vamos entrar juntos.» Ele segue.",
  },
  B: {
    ok: false,
    text: "O Nicolò continua olhando para o colega. A sua voz virou parte do barulho de fundo — ele não parou de te ouvir de propósito, ele ainda não te ouviu de verdade.",
  },
};

const REC_FEEDBACK: Record<"sposti" | "voce", { ok: boolean; text: string }> = {
  sposti: { ok: true, text: "O Nicolò percebe você, um pouco surpreso de te encontrar ali. Dessa vez a instrução chega." },
  voce: {
    ok: false,
    text: "O Nicolò se vira, mas assustado pelo tom mais do que atraído pela instrução — entra na água, mas recuando, sem estender a mão como pedido.",
  },
};

export const casoReale02StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 02",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 02</div>
        <h1>A criança que não escuta</h1>
        <p className="lede">Faixa 3-5. Competências: sintonia (Cap. 4) · instruções (Cap. 5).</p>
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
          <h1>Nicolò, 4 anos</h1>
          <p className="lede">
            É o segundo mês de curso dele. Você está agachado na altura dele, explicando que agora é a vez dele entrar
            na água segurando a sua mão. Ele olha para outro lugar — um colega brincando com uma pranchinha — e não dá
            sinal de ter te ouvido.
          </p>
          <p className="prompt">O que você faz, antes de repetir a instrução?</p>
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
      const rec = answers.rec as "sposti" | "voce" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Nicolò continua olhando para outro lugar</h1>
          <p className="lede">Você repetiu duas vezes, sem resultado.</p>
          <p className="prompt">O que você faz agora — diferente de repetir de novo?</p>
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
          O que você leva com você, deste cenário, para a próxima vez que uma criança pequena parecer não te escutar?
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
      const esito = o === "A" ? "resolvida na primeira tentativa" : answers.rec === "sposti" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A criança que não escuta</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Sintonia (Cap. 4)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Aos 3-5 anos, «não escuta» quase sempre significa «ainda não me viu» — a voz não é o problema, é o canal
            errado: sem o contato visual antes, o resto custa a chegar.
          </p>
        </>
      );
    },
  },
];
