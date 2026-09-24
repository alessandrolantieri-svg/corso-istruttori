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

// Tradução para português europeu de caso-reale-01.tsx — as mesmas chapterId/chaves de
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
      "Não repetes toda a explicação desde o início, mas verificas com uma pergunta breve e concreta o que ele viu («diz-me tu: para onde viro a cabeça para respirar?») em vez de «percebeste?»",
  },
  { value: "B", label: "Propões o exercício a pensar que «de qualquer forma já o fez outras vezes»" },
  {
    value: "D",
    label: "Pensas que ele não tem vontade de fazer o exercício, ou que se esqueceu de algo que já sabia («anda, tu sabes fazer isto, esforça-te»)",
  },
];
const SCELTA1B_OPTIONS: Option[] = [
  {
    value: "verifica",
    label: "Paras, baixas o tom, perguntas-lhe o que viu ou ouviu antes («quando chegaram os novos — deste tempo de ouvir tudo?»)",
  },
  { value: "insiste", label: "Insistes na leitura errada — repetes que ele tem de se esforçar mais, talvez com um tom mais firme" },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Mudas de canal — uma demonstração devagar na borda, ou um contacto físico guiado (a cabeça acompanhada no movimento certo)",
  },
  { value: "parole", label: "Repetes outra vez por palavras" },
];

const SITU_FEEDBACK: Record<Exclude<SituOutcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Tommaso volta-se de novo para ti. Responde, um pouco inseguro mas na direção certa: «...de lado?» Recuperaste a informação de que precisavas — ele sabe a parte geral, falta-lhe o pormenor que lhe escapou com o barulho.",
  },
  B: {
    ok: false,
    text: "Tommaso tenta, mas erra precisamente o pormenor da última parte que não tinha ouvido — vira a cabeça tarde demais em relação ao braço, um erro que já não fazia há semanas.",
  },
  D: {
    ok: false,
    text: "Tommaso pensa que foi repreendido por preguiça, mas a culpa não é dele: simplesmente não tinha ouvido. Fecha-se um pouco, executa o exercício de forma mecânica, sem tentar corrigir-se quando erra.",
  },
};

const SCELTA2_VERSION_TEXT: Record<Scelta2Version, string> = {
  pulita: "Tommaso respondeu bem à pergunta de verificação, experimenta o exercício com a informação correta.",
  "errore-successo": "Tommaso errou o pormenor que lhe tinha escapado, mas sem nenhuma repreensão pelo meio.",
  "recupero-riuscito": "Tommaso sabe que foi mal interpretado e depois compreendido: tenta de novo, um pouco mais seguro.",
  "mai-recuperato": "Tommaso deixou de tentar corrigir-se sozinho, executa de forma mecânica.",
};

export const casoReale01StepsPtPT: Step[] = [
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
          Faixa etária 6-10. Competências abordadas: observar e interpretar (Cap. 3) · sintonia (Cap. 4) · o
          retorno (Cap. 7) · mudar de rumo (Cap. 8).
        </p>
        <div className="card">
          Ao contrário de um capítulo ou de um turno de exame, este cenário é breve e autónomo — não tem uma
          pontuação de exame: é material a que podes voltar quando quiseres.
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
            Terceira aula da semana. Estão a trabalhar a respiração lateral na borda da piscina, um exercício que
            ele já fez outras vezes. A meio da explicação, Tommaso olha para a porta de entrada — chegou um grupo
            novo, fazem barulho a pousar as malas. Quando volta a olhar para ti, tens a sensação de que não ouviu a
            última parte do que disseste.
          </p>
          <p className="prompt">O que fazes — antes de o deixares experimentar o exercício?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
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
        <div className="eyebrow">Escolha 1B · só porque não reconheceste a causa</div>
        <h1>Algo não bate certo</h1>
        <p className="lede">
          Tommaso executa o exercício mecanicamente, errando o mesmo pormenor de antes sem tentar corrigir-se. Não
          parece desmotivado — parece um pouco apagado, como quem espera outra repreensão.
        </p>
        <p className="prompt">Percebes que algo não bate certo na tua primeira leitura. O que fazes agora?</p>
        <Field id="q1b" value={answers.q1b ?? ""} onChange={(v) => setReflection("q1b", v)} />
        <h2>O que fazes mesmo, na prática</h2>
        <OptionGroup name="scelta1b" options={SCELTA1B_OPTIONS} selected={answers.scelta1b} onPick={(v) => setResponse("scelta1b", v)} />
        {answers.scelta1b === "verifica" && (
          <div className="feedback ok">
            Tommaso anima-se um pouco: «...não, na verdade não.» Não era falta de vontade: tinha-lhe escapado um
            bocado, e a repreensão só o tinha desanimado mais.
          </div>
        )}
        {answers.scelta1b === "insiste" && (
          <div className="feedback retry">
            Tommaso faz mais duas tentativas, sempre iguais, sem voltar a tentar corrigir-se sozinho. Deixou de
            procurar — não porque não saiba, mas porque percebeu que o problema, para ti, é ele e não o pormenor
            que lhe escapou.
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
          ? "Tommaso experimenta o exercício, e faz-o quase certo."
          : "Tommaso experimenta o exercício, e repete o mesmo erro no pormenor que lhe tinha escapado.";
      return (
        <>
          <div className="eyebrow">Escolha 2 · O retorno</div>
          <h1>O contexto com que chegas</h1>
          <div className="card">{SCELTA2_VERSION_TEXT[v]}</div>
          <p className="lede">{esito}</p>
          <p className="prompt">Escreve o retorno que lhe dás agora — específico sobre o comportamento, nunca sobre a pessoa.</p>
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
            Depois do retorno específico, Tommaso volta a tentar — mesmo erro uma terceira vez. A explicação por
            palavras, mesmo repetida com precisão, já não chega.
          </p>
          <p className="prompt">O que fazes agora — sem repetir outra vez as mesmas palavras?</p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {outcome === "cambia" && (
            <div className="feedback ok">
              Na tentativa seguinte, o movimento está quase correto — não perfeito, mas a cabeça vira no momento
              certo.
            </div>
          )}
          {outcome === "parole" && (
            <div className="feedback retry">
              Tommaso continua a errar o mesmo pormenor. Já não é um problema de distração: tornou-se um problema
              de canal — e o canal «dizer» já mostrou, três vezes, que não chega.
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
        <h1>O que levas contigo</h1>
        <p className="prompt">
          Em todas as versões: o que levas contigo, deste cenário, para a próxima vez que um aluno parecer distraído
          em vez de em dificuldade?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Reflexão livre, não entra em nenhuma pontuação: os Casos Reais não são um teste, são material de treino a
          que podes voltar em qualquer momento.
        </p>
      </>
    ),
  },

  // 6 — come si legge
  {
    day: "como se lê",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = situOutcome(answers);
      const oss =
        o === "A" ? "resolvida à primeira" : o === "B" ? "resolvida em parte" : recuperato(answers) ? "errada, mas recuperada" : "errada, não recuperada";
      const showScelta3 = needsScelta3(answers);
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Cenário concluído</div>
          <div className="eyebrow">Como se lê este cenário</div>
          <h1>A criança que se distrai</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">Observar e interpretar (Cap. 3)</span>
              <span className="esito">{oss}</span>
            </div>
            <div className="result-row">
              <span className="comp">O retorno (Cap. 7)</span>
              <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            {showScelta3 && (
              <div className="result-row">
                <span className="comp">Mudar de rumo (Cap. 8)</span>
                <span className="esito">{answers.canale === "cambia" ? "resolvida" : "a reforçar"}</span>
              </div>
            )}
          </div>
          <p className="lede">
            A primeira escolha tem três desfechos, não dois: reconhecer a distração e agir bem não é o mesmo que
            reconhecê-la e ignorá-la. Um erro de leitura não fecha o cenário — abre uma segunda bifurcação, com uma
            verdadeira recuperação possível.
          </p>
        </>
      );
    },
  },
];
