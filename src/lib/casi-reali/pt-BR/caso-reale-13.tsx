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

// Porta 1:1 situOutcome() del mockup caso-reale-13.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você leva a pergunta a sério e oferece a ele uma escolha real e limitada, não simbólica («escolha você qual dos dois exercícios de pernas fazemos primeiro, o resto continua como programado»), com um tom que mostra que você pensou nisso de verdade",
  },
  {
    value: "B",
    label:
      "Você responde de um jeito tecnicamente correto mas apressado («quem faz a programação sou eu, tem um motivo para cada exercício»), verdadeiro no conteúdo mas dito sem parar, quase incomodado",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Andrea escolhe, com mais atenção do que teria colocado num exercício imposto — o ponto não era a escolha em si, era ter sido levado a sério.",
  },
  B: {
    ok: false,
    text: "Andrea não insiste, mas fica distante pelo resto da aula. Ele recebeu uma resposta certa no conteúdo, mas dita com um tom apressado, quase incomodado. As palavras diziam uma coisa, o tom outra — e isso fez ele parar de confiar.",
  },
};

export const casoReale13StepsPtBR: Step[] = [
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
          Faixa 14-18 anos. Competências: comunicação adequada à idade (Cap. 2) · congruência (Cap. 5). Último
          cenário da biblioteca — fecha o arco 3-18 iniciado com Nicolò, 4 anos, que só precisava ser olhado nos
          olhos.
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
          <h1>Andrea, 16 anos</h1>
          <p className="lede">
            Ele pergunta a você, não para criar polêmica mas de verdade: «por que você nunca me deixa escolher
            nada da programação? Eu sei bem o que preciso melhorar.»
          </p>
          <p className="prompt">O que você responde — as palavras, e com que tom?</p>
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
    day: "encerramento — o último da biblioteca",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento — o último da biblioteca</div>
        <h1>Olhando para trás, para todos os treze cenários</h1>
        <p className="prompt">
          O que têm em comum uma criança de 4 anos que só precisa ser olhada nos olhos, e um garoto de 16 que pede
          para escolher?
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
      const esito = o === "A" ? "resolvida na primeira tentativa" : "não resolvida — o pedido continua em aberto";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="exam-badge"><i className="ph-duotone ph-flag-checkered" aria-hidden="true" /> Biblioteca dos 13 Casos Reais completa</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>O adolescente que quer ser tratado como um adulto</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Comunicação adequada à idade + congruência</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <div className="card quote">
            O fio que atravessa toda a biblioteca, do primeiro cenário ao último: em cada idade o pedido muda de
            forma — um olhar, uma pergunta, um «por quê» — mas é sempre a mesma coisa: sentir-se visto por quem se
            é naquele momento, não pela idade que se tem.
          </div>
        </>
      );
    },
  },
];
