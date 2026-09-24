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

// Porta 1:1 situOutcome() del mockup caso-reale-12.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você reconhece a oposição por trás do tom acomodado e nomeia isso com calma, sem confronto («eu ouvi o \"como você quiser\" — o que não está fazendo sentido para você nesse exercício?»)",
  },
  { value: "B", label: "Você leva o «como você quiser» ao pé da letra, ou insiste só no esforço técnico («vamos, coloca mais energia nisso»)" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Greta se desconcerta por um instante — ela não esperava que o sarcasmo fosse percebido e não usado contra ela. Ela responde, mais direta: «...eu acho isso inútil, sinceramente.» Agora você pode trabalhar com isso.",
  },
  B: {
    ok: false,
    text: "Greta continua com o mesmo tom acomodado e a mesma execução preguiçosa — ninguém percebeu a oposição silenciosa dela, então Greta não tem motivo para mudar de atitude.",
  },
};

export const casoReale12StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 12",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 12</div>
        <h1>A adolescente que executa de má vontade</h1>
        <p className="lede">
          Faixa 14-18 anos. Competência: situações difíceis (Cap. 9). Diferente dos exemplos de desafio aberto já
          vistos no Capítulo 9 e na Rodada 2 da prova: aqui a oposição não levanta a voz — sorri, executa, e
          neutraliza tudo com um tom que diz outra coisa.
        </p>
        <div className="card">
          Cenário curto e independente — não tem pontuação de prova: é material que você pode revisitar quando
          quiser.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situação",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Greta, 17 anos</h1>
          <p className="lede">
            Você dá a ela uma instrução técnica. Ela responde: «claro, como você quiser», com um sorriso e um tom
            levemente sarcástico, depois executa uma versão propositalmente preguiçosa do exercício — não errada,
            só sem nenhum esforço.
          </p>
          <p className="prompt">
            É um problema técnico ou de relacionamento? E o que você faz — não o que você diz para fazê-la se
            esforçar mais?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — chiusura
  {
    day: "encerramento",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que você leva com você</h1>
        <p className="prompt">
          O que você leva com você, na próxima vez que uma recusa chegar sorrindo em vez de desafiando?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra na pontuação.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "como interpretar",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida na primeira tentativa" : "não resolvida — sinal não percebido hoje";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A adolescente que executa de má vontade</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situações difíceis (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O Capítulo 9 diz que a recusa nem sempre é barulhenta — aqui isso vai um passo além: pode até soar
            como concordância. O sinal não está nas palavras («como você quiser» é tecnicamente um sim), está no
            tom e no que é executado logo depois.
          </p>
        </>
      );
    },
  },
];
