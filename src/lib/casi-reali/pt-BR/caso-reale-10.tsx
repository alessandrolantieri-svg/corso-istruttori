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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-10.html.
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
      "Você dá a ela um retorno específico e concreto sobre o gesto técnico, sem discutir a frase dela («você empurrou forte com as pernas e esticou os braços — foi exatamente isso que fez funcionar»)",
  },
  { value: "B", label: "Você tenta convencê-la com palavras de que não foi sorte, de um jeito genérico («não, você é boa nisso, vamos»)" },
];
const REC_OPTIONS: Option[] = [
  { value: "specifico", label: "Você volta atrás com um retorno específico em vez de garantias genéricas" },
  { value: "generico", label: "Você insiste com garantias genéricas" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Ginevra escuta você, um pouco surpresa: você não disse que ela estava errada, deu a ela um motivo técnico preciso — e esse motivo mostra que não foi sorte. Na tentativa seguinte, ela tenta de novo com mais atenção.",
  },
  B: {
    ok: false,
    text: "Ginevra dá de ombros, sem se convencer — um elogio genérico não é suficiente para derrubar uma crença enraizada, ainda mais nessa idade, na frente do grupo.",
  },
};

const REC_FEEDBACK: Record<"specifico" | "generico", { ok: boolean; text: string }> = {
  specifico: {
    ok: true,
    text: "Dessa vez o detalhe técnico preciso chega até ela — e, ao contrário de um «você é boa nisso», é algo que Ginevra pode verificar sozinha na tentativa seguinte.",
  },
  generico: {
    ok: false,
    text: "Ginevra não muda de ideia — a desconfiança continua intacta, porque nada do que você disse deu a ela um motivo concreto para pensar diferente.",
  },
};

export const casoReale10StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 10",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 10</div>
        <h1>A garota que não acredita no próprio resultado</h1>
        <p className="lede">
          Faixa 11-13 anos. Competências: o retorno (Cap. 7) · sintonia (Cap. 4). Diferente de «ela tem medo»
          (Cenário 03): aqui não há um perigo percebido, há uma desconfiança crônica nas próprias capacidades.
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
          <h1>Ginevra, 11 anos</h1>
          <p className="lede">
            Ela acabou de fazer um mergulho de saída tecnicamente correto — o primeiro que deu certo, depois de
            semanas. Em vez de ficar contente, ela diz, olhando para outro lado: «foi só sorte, normalmente eu
            erro.»
          </p>
          <p className="prompt">O que você responde?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — recupero, solo se situ === "B"
  {
    day: "recuperação",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "specifico" | "generico" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Ginevra continua cética</h1>
          <p className="lede">Pronta para descartar a próxima tentativa também como sorte.</p>
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
          O que você leva com você, na próxima vez que um aluno descartar o próprio sucesso como sorte?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra na pontuação.
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
      const esito = o === "A" ? "resolvida na primeira tentativa" : answers.rec === "specifico" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A garota que não acredita no próprio resultado</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">O retorno (Cap. 7)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Contra a desconfiança, «você é boa nisso» não se sustenta — «você fez isso, e foi por isso que
            funcionou» sim. É o mesmo princípio do Capítulo 7 — um elogio específico se lembra, um vago se
            esquece — aplicado a quem não acredita em si mesma.
          </p>
        </>
      );
    },
  },
];
