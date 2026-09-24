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

// Tradução para português europeu de caso-reale-03.tsx — as mesmas chapterId/chaves de
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
      "Reconheces o medo (ombros tensos, olhar fixo na água, não em ti) e aproximas-te sem a pressionares, estendendo a mão sem dizeres «entra»",
  },
  {
    value: "B",
    label: "Lês a pausa como birra ou distração e tentas convencê-la por palavras («anda, tu já sabes fazer isto, já o fizeste tantas vezes»)",
  },
];
const REC_OPTIONS: Option[] = [
  { value: "tempo", label: "Paras, baixas-te ao nível dela e dás-lhe tempo, sem mais palavras de convencimento" },
  { value: "insisti", label: "Continuas a insistir por palavras, talvez prometendo algo em troca" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Beatrice não se mexe logo, mas ao fim de um momento desloca o peso na tua direção — sentindo-se sem pressão, começa a confiar.",
  },
  B: {
    ok: false,
    text: "Beatrice fica ainda mais tensa — as palavras não eram o problema, e insistir em convencê-la não toca no medo verdadeiro.",
  },
};

const REC_FEEDBACK: Record<"tempo" | "insisti", { ok: boolean; text: string }> = {
  tempo: {
    ok: true,
    text: "Depois de um momento de silêncio partilhado, Beatrice desloca um pé. Não foi convencida — foi-lhe dado o espaço de que precisava.",
  },
  insisti: {
    ok: false,
    text: "Beatrice entra, mas agarrada à borda durante toda a aula — cedeu, não se sentiu compreendida.",
  },
};

export const casoReale03StepsPtPT: Step[] = [
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
        <p className="lede">Faixa etária 3-5. Competências: observar e interpretar (Cap. 3) · sintonia (Cap. 4).</p>
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
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Beatrice, 5 anos</h1>
          <p className="lede">
            Primeira aula depois das férias. Na borda da piscina, bloqueia, não entra: ombros contraídos, olhos
            fixos na água, não procura o teu olhar. Não chora, não diz nada.
          </p>
          <p className="prompt">
            Qual causa te parece mais provável — e o que fazes para o verificar, não o que lhe perguntas por
            palavras?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
          O que levas contigo deste cenário, para a próxima vez que uma criança pequena bloquear em silêncio?
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
      const esito = o === "A" ? "resolvida à primeira" : answers.rec === "tempo" ? "errada, mas recuperada" : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que tem medo</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{esito}</span>
            </div>
          </div>
          <p className="lede">
            O silêncio de uma criança assustada não é um vazio a preencher com mais palavras — é uma informação, e
            a resposta certa começa sempre por como se lê, não por o que se diz.
          </p>
        </>
      );
    },
  },
];
