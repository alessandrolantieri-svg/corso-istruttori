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

// Tradução para o português (Brasil) de caso-reale-01.tsx — mesmos chapterId/chaves de
// resposta/valores internos do original italiano: muda apenas o texto visível.
// Porta 1:1 situOutcome()/needsRecupero()/recuperato()/scelta2Version()/needsScelta3() do mockup
// caso-reale-01.html.
type SituOutcome = "A" | "B" | "D" | null;
function situOutcome(a: Record<string, string>): SituOutcome {
  return (a.situ as SituOutcome) || null;
}
function needsRecupero(a: Record<string, string>): boolean {
  return situOutcome(a) === "D";
}
function recuperato(a: Record<string, string>): boolean {
  return a.scelta1b === "verifica";
}
type Scelta2Version = "pulita" | "errore-successo" | "recupero-riuscito" | "mai-recuperato";
function scelta2Version(a: Record<string, string>): Scelta2Version {
  const o = situOutcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "errore-successo";
  if (o === "D") return recuperato(a) ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}
function needsScelta3(a: Record<string, string>): boolean {
  const v = scelta2Version(a);
  return v === "errore-successo" || v === "mai-recuperato";
}

const SITU_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Você não repete toda a explicação do zero, mas confere com uma pergunta curta e concreta o que ele viu («me diz: para onde eu viro a cabeça para respirar?») em vez de «entendeu?»",
  },
  { value: "B", label: "Você propõe o exercício pensando que «ele já fez isso outras vezes, tá tranquilo»" },
  {
    value: "D",
    label: "Você acha que ele não tem vontade de fazer o exercício, ou que esqueceu uma coisa que já sabia («vai, você sabe fazer, se esforça»)",
  },
];
const SCELTA1B_OPTIONS: Option[] = [
  {
    value: "verifica",
    label: "Você para, baixa o tom, pergunta o que ele viu ou ouviu antes («quando chegou aquele grupo novo — deu tempo de você ouvir tudo?»)",
  },
  { value: "insiste", label: "Você insiste na leitura errada — repete que ele precisa se esforçar mais, talvez com um tom mais firme" },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Você muda de canal — uma demonstração devagar na borda, ou um contato físico guiado (a cabeça acompanhada no movimento certo)",
  },
  { value: "parole", label: "Você repete de novo com palavras" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "O Tommaso vira de novo para você. Responde, um pouco inseguro mas na direção certa: «...de lado?» Você recuperou a informação que precisava — ele sabe a parte geral, falta o detalhe que escapou com o barulho.",
  },
  B: {
    ok: false,
    text: "O Tommaso tenta, mas erra justamente o detalhe da última parte que não tinha ouvido — vira a cabeça tarde demais em relação ao braço, um erro que já não cometia há semanas.",
  },
  D: {
    ok: false,
    text: "O Tommaso acha que foi repreendido por preguiça, mas a culpa não é dele: ele simplesmente não tinha ouvido. Ele se fecha um pouco, faz o exercício de forma mecânica, sem tentar se corrigir quando erra.",
  },
};

const SCELTA2_VERSION_TEXT: Record<Scelta2Version, string> = {
  pulita: "O Tommaso respondeu bem à pergunta de verificação, tenta o exercício com a informação certa.",
  "errore-successo": "O Tommaso errou o detalhe que tinha escapado dele, mas sem nenhuma repreensão no meio.",
  "recupero-riuscito": "O Tommaso sabe que foi mal interpretado e depois entendido: tenta de novo, um pouco mais confiante.",
  "mai-recuperato": "O Tommaso parou de tentar se corrigir sozinho, faz tudo de forma mecânica.",
};

export const casoReale01StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "caso real 01",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Casos Reais · Cenário 01</div>
        <h1>A criança que se distrai</h1>
        <p className="lede">
          Faixa 6-10. Competências abordadas: observar e interpretar (Cap. 3) · sintonia (Cap. 4) · o retorno (Cap. 7) ·
          mudar de rumo (Cap. 8).
        </p>
        <div className="card">
          Diferente de um capítulo ou de uma rodada de exame, este cenário é curto e independente — não tem pontuação
          de exame: é material que você pode acessar quando quiser.
        </div>
      </>
    ),
  },

  // 1 — situazione
  {
    day: "situação",
    pct: 14,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.situ,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = situOutcome(answers);
      const fb = outcome ? SITU_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Situação</div>
          <h1>Tommaso, 8 anos</h1>
          <p className="lede">
            Terceira aula da semana. Vocês estão trabalhando a respiração lateral na borda, um exercício que ele já fez
            outras vezes. No meio da explicação, o Tommaso olha para a porta de entrada — chegou um grupo novo, fazendo
            barulho ao largar as bolsas no chão. Quando ele volta a olhar para você, você tem a sensação de que ele não
            ouviu a última parte do que você disse.
          </p>
          <p className="prompt">O que você faz — antes de fazer ele tentar o exercício?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="situ" options={SITU_OPTIONS} selected={answers.situ} onPick={(v) => setResponse("situ", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — scelta1b, solo se esito D
  {
    day: "escolha 1B — recuperação",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1b && !!a.scelta1b,
    visible: (a) => needsRecupero(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Escolha 1B · só porque você não reconheceu a causa</div>
        <h1>Alguma coisa não bate</h1>
        <p className="lede">
          O Tommaso faz o exercício de forma mecânica, errando o mesmo detalhe de antes sem tentar se corrigir. Ele não
          parece desanimado — parece meio apagado, como quem espera outra repreensão.
        </p>
        <p className="prompt">Você percebe que alguma coisa não bate na sua primeira leitura. O que você faz agora?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>O que você faz de verdade, na prática</h2>
        <OptionGroup name="scelta1b" options={SCELTA1B_OPTIONS} selected={answers.scelta1b} onPick={(v) => setResponse("scelta1b", v)} />
        {answers.scelta1b === "verifica" && (
          <div className="feedback ok">
            O Tommaso se anima um pouco: «...não, na verdade não.» Não era falta de vontade: um pedaço tinha escapado
            dele, e a repreensão só o desanimou mais.
          </div>
        )}
        {answers.scelta1b === "insiste" && (
          <div className="feedback retry">
            O Tommaso faz mais duas tentativas, sempre iguais, sem mais tentar se corrigir sozinho. Ele parou de
            tentar — não porque não sabe, mas porque entendeu que o problema, na sua visão, é ele, e não o detalhe que
            escapou dele.
          </div>
        )}
      </>
    ),
  },

  // 3 — scelta2, il ritorno
  {
    day: "escolha 2 — o retorno",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const v = scelta2Version(answers);
      const esito =
        v === "pulita" || v === "recupero-riuscito"
          ? "O Tommaso tenta o exercício, e faz quase certo."
          : "O Tommaso tenta o exercício, e repete o mesmo erro no detalhe que tinha escapado dele.";
      return (
        <>
          <div className="eyebrow">Escolha 2 · O retorno</div>
          <h1>O contexto com que você chega</h1>
          <div className="card">{SCELTA2_VERSION_TEXT[v]}</div>
          <p className="lede">{esito}</p>
          <p className="prompt">Escreva o retorno que você dá a ele agora — específico sobre o comportamento, nunca sobre a pessoa.</p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v2) => setReflection("q2", v2)} />
        </>
      );
    },
  },

  // 4 — scelta3, cambiare strada, solo se serve
  {
    day: "escolha 3 — mudar de rumo",
    pct: 65,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    visible: (a) => needsScelta3(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = answers.canale as "cambia" | "parole" | undefined;
      return (
        <>
          <div className="eyebrow">Escolha 3 · Mudar de rumo</div>
          <h1>Mesmo erro, uma terceira vez</h1>
          <p className="lede">
            Depois do retorno específico, o Tommaso tenta de novo — mesmo erro pela terceira vez. A explicação com
            palavras, mesmo repetida com precisão, não está bastando.
          </p>
          <p className="prompt">O que você faz agora — sem repetir de novo as mesmas palavras?</p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {outcome === "cambia" && (
            <div className="feedback ok">
              Na tentativa seguinte o movimento está quase correto — não perfeito, mas a cabeça vira no momento certo.
            </div>
          )}
          {outcome === "parole" && (
            <div className="feedback retry">
              O Tommaso continua errando o mesmo detalhe. Já não é mais um problema de distração: virou um problema de
              canal — e o canal «falar» já mostrou, três vezes, que não basta.
            </div>
          )}
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "encerramento",
    pct: 84,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.qchiusura,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento</div>
        <h1>O que você leva com você</h1>
        <p className="prompt">
          Em todas as versões: o que você leva com você, deste cenário, para a próxima vez que um aluno parecer
          distraído em vez de estar com dificuldade?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em nenhuma pontuação: os Casos Reais não são uma prova, são material de treino que
          você pode acessar a qualquer momento.
        </p>
      </>
    ),
  },

  // 6 — come si legge
  {
    day: "como interpretar",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const oss =
        o === "A" ? "resolvida na primeira tentativa" : o === "B" ? "resolvida parcialmente" : recuperato(answers) ? "errada, mas recuperada" : "errada, não recuperada";
      const showScelta3 = needsScelta3(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como interpretar este cenário</div>
          <h1>A criança que se distrai</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{oss}</span>
            </div>
            <div className="result-row">
              <span className="comp">O retorno (Cap. 7)</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            {showScelta3 && (
              <div className="result-row">
                <span className="comp">Mudar de rumo (Cap. 8)</span>
                <span className="esito">{answers.canale === "cambia" ? "resolvida" : "precisa de reforço"}</span>
              </div>
            )}
          </div>
          <p className="lede">
            A primeira escolha tem três resultados, não dois: reconhecer a distração e agir bem não é a mesma coisa que
            reconhecê-la e ignorá-la. Um erro de leitura não fecha o cenário — abre uma segunda encruzilhada, com uma
            recuperação real possível.
          </p>
        </>
      );
    },
  },
];
