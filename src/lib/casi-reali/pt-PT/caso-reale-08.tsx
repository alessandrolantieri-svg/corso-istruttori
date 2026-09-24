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

// Porta 1:1 situOutcome()/needsRecupero()/recuperato()/needsScelta2() del mockup caso-reale-08.html.
type SituOutcome = "A" | "B" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "B";
}
function recuperato(a: Record<string, string>): boolean {
  return a.rec === "nomini";
}
function needsScelta2(a: Record<string, string>): boolean {
  return situOutcome(a) === "A" || (situOutcome(a) === "B" && recuperato(a));
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Reconheces a frustração (não é recusa, não é cansaço físico) e nomeias-a com calma antes de voltares à técnica («é frustrante, eu vejo isso. Vamos tentar outra vez uma coisa pequena, não tudo de uma vez»)",
  },
  { value: "B", label: "Vais direto à correção técnica, sem reconhecer o que ele está a sentir" },
];
const REC_OPTIONS: Option[] = [
  { value: "nomini", label: "Voltas atrás e nomeias o que vês, antes de voltares à técnica" },
  {
    value: "tecnica",
    label: "Insistes só na técnica, esperando que uma tentativa bem-sucedida resolva a frustração",
  },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Davide levanta o olhar, surpreendido por ter sido notado antes de ser corrigido. Acena que sim, e tenta outra vez com menos tensão nos ombros.",
  },
  B: {
    ok: false,
    text: "Davide executa outra vez, mecanicamente, sem tentar corrigir-se. Ninguém disse em voz alta o que ele está a sentir, e essa frustração começa a parecer resignação.",
  },
};

const REC_FEEDBACK: Record<"nomini" | "tecnica", { ok: boolean; text: string }> = {
  nomini: {
    ok: true,
    text: "Davide descontrai-se um pouco: «...é que nunca me sai bem.» Agora que foi dito, já podes trabalhar nisso.",
  },
  tecnica: {
    ok: false,
    text: "Davide continua a executar sem empenho real — a frustração não resolvida transformou-se em desinteresse.",
  },
};

export const casoReale08StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "caso real 08",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 08</div>
        <h1>O rapaz que erra e se fecha</h1>
        <p className="lede">
          Faixa etária 11-13. Competências: observar e interpretar (Cap. 3) · o retorno (Cap. 7) —
          reformulação do erro.
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
    pct: 16,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Davide, 12 anos</h1>
          <p className="lede">
            À quarta tentativa consecutiva de uma viragem, volta a errar. Não protesta, não recusa — bate
            com a mão na água e desvia o olhar, com os ombros curvados.
          </p>
          <p className="prompt">O que fazes — o que notas primeiro, e o que fazes primeiro?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recuperação",
    pct: 34,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "nomini" | "tecnica" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Davide executa mecanicamente</h1>
          <p className="lede">Sem sequer tentar corrigir-se.</p>
          <p className="prompt">O que fazes agora?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 3 — scelta2, il ritorno dopo il tentativo riuscito, solo se needsScelta2
  {
    day: "escolha 2 — o retorno",
    pct: 55,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    visible: (a) => needsScelta2(a),
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Escolha 2 · O retorno, depois da tentativa bem-sucedida</div>
        <h1>Davide tenta outra vez</h1>
        <p className="lede">E desta vez a viragem está quase correta.</p>
        <p className="prompt">Escreve o retorno que lhe dás — específico, não um «bem feito» genérico.</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — chiusura
  {
    day: "encerramento",
    pct: 80,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que levas contigo</h1>
        <p className="prompt">
          O que levas contigo, da próxima vez que um rapaz de 11-13 anos não protesta mas deixa de tentar
          corrigir-se?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em pontuação.
        </p>
      </>
    ),
  },

  // 5 — come si legge
  {
    day: "como se lê",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida à primeira" : recuperato(answers) ? "errada, mas recuperada" : "errada, não recuperada";
      const showScelta2 = needsScelta2(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>O rapaz que erra e se fecha</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
            {showScelta2 && (
              <div className="result-row">
                <span className="comp">O retorno (Cap. 7)</span>
                <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
              </div>
            )}
          </div>
          <p className="lede">
            Dos 11 aos 13 anos, a frustração muitas vezes não se diz por palavras: vê-se no gesto (a mão na água, o
            olhar desviado) antes de se ouvir na voz. O instrutor tem de a notar antes de corrigir o erro.
          </p>
        </>
      );
    },
  },
];
