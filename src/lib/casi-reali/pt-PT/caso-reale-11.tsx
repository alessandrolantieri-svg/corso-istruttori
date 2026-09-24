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

// Porta 1:1 situOutcome() del mockup caso-reale-11.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Perguntas-lhe algo específico e pessoal sobre o treino, não genérico («o que gostarias mesmo de melhorar este ano?»), mostrando interesse real pela resposta dele",
  },
  { value: "B", label: "Deixas passar, pensando que se ele executa tudo corretamente não há problema nenhum para resolver" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Simone pensa um pouco, surpreendido com a pergunta — ninguém lhe tinha perguntado isso nesses termos. Responde com algo concreto, e nas semanas seguintes esse pormenor torna-se um ponto de ligação real.",
  },
  B: {
    ok: false,
    text: "Simone continua a executar tudo bem, e a estar noutro lugar — o facto de não haver problemas visíveis não quer dizer que não esteja desinteressado: quer só dizer que o desinteresse não se vê a olho nu.",
  },
};

export const casoReale11StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "caso real 11",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 11</div>
        <h1>O adolescente que executa sem estar presente</h1>
        <p className="lede">
          Faixa etária 14-18. Competências: comunicação por idade (Cap. 2) · sintonia (Cap. 4). Diferente de
          quem executa de má vontade (Cenário 12): aqui não há conflito, há ausência — mais difícil de
          detetar porque não pede nada.
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
          <h1>Simone, 15 anos</h1>
          <p className="lede">
            Executa tudo o que pedes, corretamente, sem um erro — e sem qualquer empenho visível. Nunca
            protesta, não faz perguntas, nunca olha para o relógio de forma óbvia. Simplesmente, parece
            estar noutro lugar.
          </p>
          <p className="prompt">
            O que fazes — com um rapaz que não está a pedir nada, e não parece ter um problema evidente?
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
          O que levas contigo, da próxima vez que um adolescente executa tudo sem errar, e sem parecer
          realmente presente?
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
      const esito = o === "A" ? "resolvida à primeira" : "não resolvida — oportunidade não aproveitada hoje";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>O adolescente que executa sem estar presente</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicação por idade (14-18)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O desinteresse silencioso é mais difícil de ver do que a recusa aberta: não há um momento preciso
            em que «acontece algo» e percebes que tens de intervir. O desinteresse tem de ser procurado, não
            esperado.
          </p>
        </>
      );
    },
  },
];
