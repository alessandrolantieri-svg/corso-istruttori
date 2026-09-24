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

// Tradução para o português (Brasil) de caso-reale-05.tsx — mesmos chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero() do mockup caso-reale-05.html.
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
      "Você muda de canal — mostra o movimento devagar, ou guia os braços dela fora da água antes de deixá-la tentar de novo",
  },
  { value: "B", label: "Você tenta de novo com as mesmas palavras, reformuladas de outro jeito" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Você finalmente muda de canal (demonstração ou contato físico guiado)" },
  { value: "parole", label: "Você continua insistindo com palavras, talvez mais devagar" },
];

export const casoReale05StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 05",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 05</div>
        <h1>A criança que não entende</h1>
        <p className="lede">
          Faixa 6-10. Competência: mudar de rumo (Cap. 8) — repertório e adaptação em tempo real.
        </p>
        <div className="card">
          Cenário curto e independente — não tem pontuação de exame: é material que você pode acessar quando quiser.
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
      const o = situOutcome(answers);
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Chiara, 7 anos</h1>
          <p className="lede">
            Você explicou duas vezes, com palavras, como coordenar os braços no nado de costas. Ela tenta de novo, e
            erra de novo, exatamente do mesmo jeito. Ela não parece distraída — olha para você, concentrada, e ainda
            não consegue.
          </p>
          <p className="prompt">O que você faz — não uma terceira explicação com palavras?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Na tentativa seguinte, o movimento está quase certo. Não faltava esforço a ela: faltava um canal
              diferente de «falar».
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              A Chiara erra de novo, do mesmo jeito. Não é um problema de quantas vezes você explica: é um problema de
              qual canal você usa.
            </div>
          )}
        </>
      );
    },
  },

  // 2 — recupero, solo se esito B
  {
    day: "recuperação",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.rec,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Recuperação · só porque não funcionou</div>
        <h1>Chiara errou três vezes com o mesmo canal</h1>
        <p className="prompt">O que você faz agora?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>O que você faz de verdade, na prática</h2>
        <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
        {answers.rec === "cambia" && (
          <div className="feedback ok">A tentativa seguinte melhora na hora e de forma visível.</div>
        )}
        {answers.rec === "parole" && (
          <div className="feedback retry">
            A Chiara começa a mostrar sinais de cansaço da atenção mais do que do erro em si — continuar assim não vai
            levar a nada diferente.
          </div>
        )}
      </>
    ),
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
          O que você leva com você, para a próxima vez que uma criança parecer concentrada, mas continuar errando do
          mesmo jeito?
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
    day: "como interpretar",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const esito = o === "A" ? "resolvida na primeira tentativa" : answers.rec === "cambia" ? "errada, mas recuperada (tarde)" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A criança que não entende</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Mudar de rumo (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            «Não entende» e «não escuta» parecem parecidos, mas não são o mesmo cenário: aqui a atenção existe — é o
            canal que falta, não o contato.
          </p>
        </>
      );
    },
  },
];
