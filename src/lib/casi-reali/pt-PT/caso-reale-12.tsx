import { OptionGroup, type Option } from "@/components/OptionGroup";
import type { Step, StepContext } from "@/lib/chapters/types";

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Escreve aqui..."
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
      "Reconheces a oposição por trás do tom condescendente e nomeias-a com calma, sem confronto («ouvi o \"como tu quiseres\" — o que é que não está bem para ti neste exercício?»)",
  },
  { value: "B", label: "Levas o «como tu quiseres» à letra, ou insistes só no empenho técnico («vá lá, põe mais energia nisso»)" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Greta fica um pouco desarmada — não esperava que o sarcasmo fosse notado e não usado contra ela. Responde, mais direta: «...acho isto inútil, sinceramente.» Agora já podes trabalhar nisso.",
  },
  B: {
    ok: false,
    text: "Greta continua com o mesmo tom condescendente e a mesma execução preguiçosa — ninguém notou a oposição silenciosa dela, por isso Greta não tem motivo para mudar de atitude.",
  },
};

export const casoReale12StepsPtPT: Step[] = [
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
        <h1>O adolescente que executa de má vontade</h1>
        <p className="lede">
          Faixa etária 14-18. Competência: situações difíceis (Cap. 9). Diferente dos exemplos de desafio
          aberto já vistos no Capítulo 9 e no Turno 2 do exame: aqui a oposição não levanta a voz — sorri,
          executa, e desarma tudo com um tom que diz outra coisa.
        </p>
        <div className="card">
          Cenário breve e autónomo — não tem uma pontuação de exame: é material a que podes voltar sempre que
          quiseres.
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
            Dás-lhe uma indicação técnica. Ela responde: «claro, como tu quiseres», com um sorriso e um tom
            ligeiramente sarcástico, e depois executa uma versão propositadamente preguiçosa do exercício —
            não errada, só sem qualquer empenho.
          </p>
          <p className="prompt">
            É um problema técnico ou de relação? E o que fazes — não o que lhe dizes para a fazer
            esforçar-se mais?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
        <h1>O que levas contigo</h1>
        <p className="prompt">
          O que levas contigo, da próxima vez que uma recusa chega a sorrir em vez de desafiar?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em pontuação.
        </p>
      </>
    ),
  },

  // 3 — come si legge
  {
    day: "como se lê",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida à primeira" : "não resolvida — sinal não captado hoje";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>O adolescente que executa de má vontade</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Situações difíceis (Cap. 9)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O Capítulo 9 diz que a recusa nem sempre é ruidosa — aqui vai um passo mais além: pode até soar
            como concordância. O sinal não está nas palavras («como tu quiseres» é tecnicamente um sim),
            está no tom e no que é executado logo a seguir.
          </p>
        </>
      );
    },
  },
];
