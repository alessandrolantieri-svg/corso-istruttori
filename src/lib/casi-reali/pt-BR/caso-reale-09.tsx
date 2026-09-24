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

// Porta 1:1 situOutcome()/needsRecupero() del mockup caso-reale-09.html.
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
      "Você muda de canal mesmo assim, mesmo que com ela até agora dizer sempre tivesse funcionado, porque o que você está usando não está funcionando",
  },
  { value: "B", label: "Você insiste em palavras, porque até agora isso sempre tinha bastado com ela, reformulando de novo" },
];
const REC_OPTIONS: Option[] = [
  { value: "cambia", label: "Você finalmente muda de canal (demonstração, ou contato físico guiado)" },
  { value: "parole", label: "Você insiste de novo em palavras, talvez mais devagar" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Você mostra o movimento devagar na água, na frente dela. Na tentativa seguinte, alguma coisa destrava. Não é que falar tenha deixado de funcionar com ela em geral: é só que aquele detalhe específico precisava de outro jeito para ser explicado.",
  },
  B: {
    ok: false,
    text: "Camilla erra pela terceira vez, do mesmo jeito. O fato de «dizer» normalmente funcionar com ela não significa que funcione sempre, com todos os detalhes.",
  },
};

const REC_FEEDBACK: Record<"cambia" | "parole", { ok: boolean; text: string }> = {
  cambia: {
    ok: true,
    text: "A tentativa seguinte melhora. Não era garantido que o canal certo fosse diferente do de sempre. É por isso que o repertório serve também com quem normalmente responde bem a um único jeito.",
  },
  parole: {
    ok: false,
    text: "Camilla continua errando, e começa a parecer mais cansada da atenção do que do próprio erro.",
  },
};

export const casoReale09StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 09",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 09</div>
        <h1>A garota que repete o mesmo erro</h1>
        <p className="lede">
          Faixa 11-13 anos. Competência: mudar de rumo (Cap. 8) — repertório, com uma garota para quem, até
          agora, «dizer» sempre tinha bastado.
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
          <h1>Camilla, 13 anos</h1>
          <p className="lede">
            Com ela, as explicações em palavras sempre funcionaram até agora. Mas num detalhe da braçada de
            peito, depois de duas explicações verbais detalhadas, ela continua errando exatamente do mesmo jeito.
          </p>
          <p className="prompt">O que você faz — já que até agora as explicações em palavras tinham bastado?</p>
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
      const rec = answers.rec as "cambia" | "parole" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Três tentativas idênticas</h1>
          <p className="lede">Todas com a mesma explicação verbal.</p>
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
          O que você leva com você, na próxima vez que um canal que sempre tinha funcionado parar de funcionar
          num detalhe específico?
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
      const esito = o === "A" ? "resolvida na primeira tentativa" : answers.rec === "cambia" ? "errada, mas recuperada (tarde)" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A garota que repete o mesmo erro</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Mudar de rumo (Cap. 8)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O Capítulo 8 diz isso de forma explícita: um canal que funcionou com uma criança num exercício não
            fecha o repertório: serviu para aquele momento, não quer dizer que vai funcionar sempre com ela.
          </p>
        </>
      );
    },
  },
];
