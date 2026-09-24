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

// Porta 1:1 situOutcome() del mockup caso-reale-11.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você pergunta a ele algo específico e pessoal sobre o treino, não algo genérico («o que você gostaria de melhorar, de verdade, esse ano?»), mostrando interesse real pela resposta dele",
  },
  { value: "B", label: "Você deixa passar, pensando que, se ele executa tudo corretamente, não há problema a enfrentar" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Simone pensa um instante, surpreso com a pergunta — ninguém tinha perguntado a ele daquele jeito antes. Ele responde com algo concreto, e nas semanas seguintes esse detalhe se torna um ponto de conexão real.",
  },
  B: {
    ok: false,
    text: "Simone continua executando tudo bem, e continua com a cabeça em outro lugar — o fato de não haver problemas visíveis não significa que ele não esteja desinteressado: só significa que o desinteresse não se vê a olho nu.",
  },
};

export const casoReale11StepsPtBR: Step[] = [
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
          Faixa 14-18 anos. Competências: comunicação adequada à idade (Cap. 2) · sintonia (Cap. 4). Diferente de
          quem executa de má vontade (Cenário 12): aqui não há conflito, há ausência — mais difícil de perceber
          porque ele não pede nada.
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
          <h1>Simone, 15 anos</h1>
          <p className="lede">
            Ele executa tudo o que você pede, corretamente, sem nenhum erro — e sem nenhum esforço visível. Nunca
            protesta, não faz perguntas, nunca olha para o relógio de forma óbvia. Simplesmente, parece estar em
            outro lugar.
          </p>
          <p className="prompt">
            O que você faz — com um garoto que não está pedindo nada, e não parece ter um problema evidente?
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
          O que você leva com você, na próxima vez que um adolescente executar tudo sem errar, e sem parecer
          realmente presente?
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
      const esito = o === "A" ? "resolvida na primeira tentativa" : "não resolvida — oportunidade não aproveitada hoje";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>O adolescente que executa sem estar presente</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicação adequada à idade (14-18)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O desinteresse silencioso é mais difícil de ver do que a recusa aberta: não existe um momento preciso
            em que «algo acontece» e você percebe que precisa intervir. O desinteresse precisa ser procurado, não
            esperado.
          </p>
        </>
      );
    },
  },
];
