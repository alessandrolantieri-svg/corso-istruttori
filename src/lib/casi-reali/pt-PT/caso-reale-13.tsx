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

// Porta 1:1 situOutcome() del mockup caso-reale-13.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Levas a pergunta a sério e ofereces-lhe uma escolha real e limitada, não simbólica («escolhe tu qual dos dois exercícios de pernas fazemos primeiro, o resto fica como estava programado»), com um tom que mostra que pensaste mesmo nisso",
  },
  {
    value: "B",
    label:
      "Respondes de forma tecnicamente correta mas apressada («a programação faço-a eu, há um motivo para cada exercício»), verdadeiro no conteúdo mas dito sem parar, quase incomodado",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Andrea escolhe, com mais atenção do que teria posto num exercício imposto — não era a escolha em si o que importava, era ter sido levado a sério.",
  },
  B: {
    ok: false,
    text: "Andrea não insiste, mas durante o resto da aula fica distante. Recebeu uma resposta certa no conteúdo, mas dita com um tom apressado, quase incomodado. As palavras diziam uma coisa, o tom dizia outra — e isso fez com que deixasse de confiar.",
  },
};

export const casoReale13StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "caso real 13",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 13 · último da biblioteca</div>
        <h1>O adolescente que quer ser tratado como um adulto</h1>
        <p className="lede">
          Faixa etária 14-18. Competências: comunicação por idade (Cap. 2) · congruência (Cap. 5). Último
          cenário da biblioteca — fecha o arco 3-18 iniciado com Nicolò, 4 anos, que só precisava de ser
          olhado nos olhos.
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
          <h1>Andrea, 16 anos</h1>
          <p className="lede">
            Pergunta-te, não para criar polémica mas a sério: «porque é que nunca me deixas escolher nada da
            programação? Sei bem o que preciso de melhorar.»
          </p>
          <p className="prompt">O que respondes — as palavras, e com que tom?</p>
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
    day: "encerramento — o último da biblioteca",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento — o último da biblioteca</div>
        <h1>Olhando para trás, para os treze cenários</h1>
        <p className="prompt">
          O que têm em comum uma criança de 4 anos que só precisa de ser olhada nos olhos, e um rapaz de 16
          que pede para escolher?
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
      const esito = o === "A" ? "resolvida à primeira" : "não resolvida — o pedido fica em cima da mesa";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Biblioteca dos 13 Casos Reais completa</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>O adolescente que quer ser tratado como um adulto</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicação por idade + congruência</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <div className="card quote">
            O fio que atravessa toda a biblioteca, do primeiro cenário ao último: em cada idade o pedido muda
            de forma — um olhar, uma pergunta, um «porquê» — mas é sempre a mesma coisa: sentir-se visto por
            quem se é naquele momento, não pela idade que se tem.
          </div>
        </>
      );
    },
  },
];
