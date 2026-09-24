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

// Tradução para português europeu de caso-reale-05.tsx — as mesmas chapterId/chaves de
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
      "Mudas de canal — mostras-lhe o movimento devagar, ou guias-lhe os braços fora de água antes de a deixares tentar de novo",
  },
  { value: "B", label: "Tentas outra vez com as mesmas palavras, reformuladas de forma diferente" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Mudas finalmente de canal (demonstração ou contacto físico guiado)" },
  { value: "parole", label: "Insistes ainda por palavras, talvez mais devagar" },
];

export const casoReale05StepsPtPT: Step[] = [
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
        <h1>A criança que não compreende</h1>
        <p className="lede">
          Faixa etária 6-10. Competência: mudar de rumo (Cap. 8) — repertório e adaptação em tempo real.
        </p>
        <div className="card">
          Cenário breve e autónomo — não tem uma pontuação de exame: é material a que podes voltar quando quiseres.
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
            Explicaste-lhe duas vezes, por palavras, como coordenar os braços nas costas. Ela tenta de novo, e volta
            a errar, exatamente da mesma forma. Não parece distraída — olha para ti, concentrada, e continua sem lhe
            sair.
          </p>
          <p className="prompt">O que fazes — não uma terceira explicação por palavras?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {o === "A" && (
            <div className="feedback ok">
              Na tentativa seguinte, o movimento está quase certo. Não lhe faltava empenho: faltava-lhe um canal
              diferente de «dizer».
            </div>
          )}
          {o === "B" && (
            <div className="feedback retry">
              Chiara volta a errar, da mesma forma. Não é um problema de quantas vezes explicas: é um problema de
              qual canal usas.
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
        <p className="prompt">O que fazes agora?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>O que fazes mesmo, na prática</h2>
        <OptionGroup name="rec" options={REC_OPTIONS} selected={answers.rec} onPick={(v) => setResponse("rec", v)} />
        {answers.rec === "cambia" && (
          <div className="feedback ok">A tentativa seguinte melhora logo e de forma visível.</div>
        )}
        {answers.rec === "parole" && (
          <div className="feedback retry">
            Chiara começa a mostrar sinais de cansaço da atenção mais do que do erro em si — continuar assim não vai
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
        <h1>O que levas contigo</h1>
        <p className="prompt">
          O que levas contigo, para a próxima vez que uma criança parecer concentrada mas continuar a errar da mesma
          forma?
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
      const esito = o === "A" ? "resolvida à primeira" : answers.rec === "cambia" ? "errada, mas recuperada (tarde)" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que não compreende</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Mudar de rumo (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            «Não compreende» e «não ouve» parecem próximos, mas não são o mesmo cenário: aqui a atenção existe — é
            o canal que falta, não o contacto.
          </p>
        </>
      );
    },
  },
];
