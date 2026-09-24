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

// Tradução para o português (Brasil) de caso-reale-03.tsx — mesmos chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero() do mockup caso-reale-03.html.
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
      "Você reconhece o medo (ombros tensos, olhar fixo na água, não em você) e se aproxima sem apressá-la, estendendo a mão sem dizer «entra»",
  },
  {
    value: "B",
    label: "Você lê a pausa como birra ou distração e tenta convencê-la com palavras («vai, você já sabe fazer isso, já fez tantas vezes»)",
  },
];
const REC_OPTIONS: Option[] = [
  { value: "tempo", label: "Você para, se abaixa na altura dela e dá tempo, sem mais palavras de convencimento" },
  { value: "insisti", label: "Você continua insistindo com palavras, talvez prometendo alguma coisa em troca" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "A Beatrice não se move na hora, mas depois de um instante desloca o peso na sua direção — sentindo que não está sendo apressada, começa a confiar.",
  },
  B: {
    ok: false,
    text: "A Beatrice fica ainda mais rígida — as palavras não eram o problema, e insistir para convencê-la não toca o medo de verdade.",
  },
};

const REC_FEEDBACK: Record<"tempo" | "insisti", { ok: boolean; text: string }> = {
  tempo: {
    ok: true,
    text: "Depois de um momento de silêncio compartilhado, a Beatrice move um pé. Ela não foi convencida — recebeu o espaço de que precisava.",
  },
  insisti: {
    ok: false,
    text: "A Beatrice entra, mas se segurando firme na borda durante toda a aula — ela cedeu, não se sentiu compreendida.",
  },
};

export const casoReale03StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 03",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 03</div>
        <h1>A criança que tem medo</h1>
        <p className="lede">Faixa 3-5. Competências: observar e interpretar (Cap. 3) · sintonia (Cap. 4).</p>
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Beatrice, 5 anos</h1>
          <p className="lede">
            Primeira aula depois das férias. Na borda ela trava, não entra: ombros tensos, olhos fixos na água, não
            procura você com o olhar. Não chora, não diz nada.
          </p>
          <p className="prompt">
            Qual causa parece mais provável para você — e o que você faz para verificar, não o que você pergunta com
            palavras?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
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
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const rec = answers.rec as "tempo" | "insisti" | undefined;
      const fb = rec ? REC_FEEDBACK[rec] : null;
      return (
        <>
          <div className="eyebrow">Recuperação · só porque não funcionou</div>
          <h1>Beatrice continua parada, agora mais tensa</h1>
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
          O que você leva com você deste cenário, para a próxima vez que uma criança pequena travar em silêncio?
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
      const esito = o === "A" ? "resolvida na primeira tentativa" : answers.rec === "tempo" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A criança que tem medo</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O silêncio de uma criança com medo não é um vazio para preencher com mais palavras — é uma informação, e a
            resposta certa sempre começa por como você lê a situação, não pelo que você diz.
          </p>
        </>
      );
    },
  },
];
