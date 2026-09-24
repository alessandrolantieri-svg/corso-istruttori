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
      "Dás-lhe um retorno específico e concreto sobre o gesto técnico, sem discutir a frase dela («empurraste com força com as pernas e esticaste os braços — foi exatamente isso que fez funcionar»)",
  },
  { value: "B", label: "Tentas convencê-la por palavras de que não foi por acaso, de forma genérica («ora essa, tu és boa nisto, vá lá»)" },
];
const REC_OPTIONS: Option[] = [
  { value: "specifico", label: "Voltas atrás com um retorno específico em vez de garantias genéricas" },
  { value: "generico", label: "Insistes com garantias genéricas" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Ginevra ouve-te, um pouco surpreendida: não lhe disseste que estava enganada, deste-lhe um motivo técnico preciso — e esse motivo demonstra que não foi por acaso. Na tentativa seguinte, volta a tentar com mais atenção.",
  },
  B: {
    ok: false,
    text: "Ginevra encolhe os ombros, pouco convencida — um elogio genérico não basta para desmontar uma convicção enraizada, especialmente nesta idade, à frente do grupo.",
  },
};

const REC_FEEDBACK: Record<"specifico" | "generico", { ok: boolean; text: string }> = {
  specifico: {
    ok: true,
    text: "Desta vez o pormenor técnico preciso chega — e, ao contrário de um «tu és boa nisto», é algo que Ginevra pode verificar sozinha na tentativa seguinte.",
  },
  generico: {
    ok: false,
    text: "Ginevra não muda de ideias — a falta de confiança mantém-se intacta, porque nada do que disseste lhe deu um motivo concreto para pensar de outra forma.",
  },
};

export const casoReale10StepsPtPT: Step[] = [
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
        <h1>A rapariga que não acredita no resultado</h1>
        <p className="lede">
          Faixa etária 11-13. Competências: o retorno (Cap. 7) · sintonia (Cap. 4). Diferente de «tem medo»
          (Cenário 03): aqui não há um perigo percebido, há falta de confiança crónica nas próprias
          capacidades.
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
            Acabou de executar um mergulho de partida tecnicamente correto — o primeiro bem-sucedido, depois
            de semanas. Em vez de estar contente, diz, olhando para outro lado: «foi só sorte, normalmente
            faço mal.»
          </p>
          <p className="prompt">O que respondes?</p>
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
          <p className="lede">Pronta a considerar também a próxima tentativa como sorte.</p>
          <p className="prompt">O que fazes agora?</p>
          <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
        <h1>O que levas contigo</h1>
        <p className="prompt">
          O que levas contigo, da próxima vez que um aluno considera um sucesso seu como sorte?
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
    day: "como se lê",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida à primeira" : answers.rec === "specifico" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A rapariga que não acredita no resultado</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">O retorno (Cap. 7)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            Contra a falta de confiança, «tu és boa nisto» não resiste — «fizeste isto, e foi por isso que
            funcionou» sim. É o mesmo princípio do Capítulo 7 — um elogio específico fica na memória, um
            vago esquece-se — aplicado a quem não acredita em si próprio.
          </p>
        </>
      );
    },
  },
];
