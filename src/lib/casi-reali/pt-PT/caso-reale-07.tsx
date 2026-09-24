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

// Porta 1:1 situOutcome() del mockup caso-reale-07.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  { value: "A", label: "Pedes-lhe a opinião dela antes da tua, ou ficas em silêncio a observar" },
  { value: "B", label: "Dás-lhe na mesma uma correção técnica, por hábito, mesmo que não esteja errada" },
];

export const casoReale07StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "caso real 07",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 07</div>
        <h1>A criança que precisa de autonomia</h1>
        <p className="lede">
          Faixa etária 6-10. Competência: autonomia (Cap. 10) — aqui aplicada antes dos exemplos habituais,
          para mostrar que não é uma competência só para os mais velhos.
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Vittoria, 10 anos</h1>
          <p className="lede">
            Há um mês que executa corretamente, sem erros, a entrada na água que antes corrigias sempre.
            Está prestes a repeti-la à tua frente, como sempre.
          </p>
          <p className="prompt">O que fazes, antes de ela a executar?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Vittoria executa, depois olha para ti: «...acho que entrei bem. É verdade?» — já deu a opinião
              dela antes de pedir a tua.
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Vittoria: «...ok.» Executa de novo à espera, como sempre, do teu veredito final.
            </div>
          )}
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
          O que levas contigo, da próxima vez que um aluno já souber fazer bem algo que antes corrigias
          sempre?
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
      const esito = o === "A" ? "resolvida à primeira" : "oportunidade perdida, não um erro grave";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que precisa de autonomia</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Autonomia (Cap. 10)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            A autonomia não é uma competência que se aplica só no fim do percurso, com os alunos mais velhos:
            uma criança de 10 anos que já sabe fazer bem uma coisa tem a mesma necessidade — ser deixada a
            avaliar-se sozinha — de um aluno de longa data.
          </p>
        </>
      );
    },
  },
];
