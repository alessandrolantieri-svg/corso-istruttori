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

// Tradução para português europeu, não é um turno independente: as mesmas chapterId/chaves de
// resposta/valores internos do turno italiano (src/lib/exam/esame-turno-2.tsx) — muda apenas o
// texto visível.
// Porta 1:1 beat1Outcome()/needsBeat2A()/beat2Version()/soggetto() do mockup esame-turno2.html:
// aqui, ao contrário do Turno 1, o Beat 1 é uma única bifurcação com três desfechos (não duas
// leituras separadas).
type Beat1Outcome = "A" | "B" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  return (a.beat1 as Beat1Outcome) || null;
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "leonardo-rigido" | "recupero-riuscito" | "leonardo-fuori";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "leonardo-rigido";
  if (o === "D") return a.beat2a === "cambia" ? "recupero-riuscito" : "leonardo-fuori";
  return "pulita";
}
function soggetto(a: Record<string, string>): string {
  return beat2Version(a) === "leonardo-fuori" ? "Sofia" : "Leonardo";
}

const BEAT1_OPTIONS: Option[] = [
  {
    value: "A",
    label:
      "Reconheces que o mergulho não é o problema, é fazê-lo primeiro à frente de todos — ofereces-lhe um papel ou uma saída que não é uma rendição («mostra-me tu como o farias de forma diferente»)",
  },
  {
    value: "B",
    label: "Percebes que o problema é relacional, mas insistes na mesma em fazê-lo experimentar já, à frente de todos («anda, fazes e pronto, estão todos a olhar»)",
  },
  {
    value: "D",
    label: "Voltas a explicar a técnica do mergulho, talvez mais devagar («olha, é fácil: dobras os joelhos...»)",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Reconheces o erro e mudas de abordagem — deixas de explicar a técnica, aproximas-te, baixas a voz, ofereces-lhe uma saída que não o expõe",
  },
  {
    value: "insisti",
    label: "Insistes na mesma leitura — repetes a explicação técnica, talvez com mais firmeza",
  },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Mudas de canal — mostras o mergulho devagar na borda, ou guias fisicamente a posição dos braços",
  },
  { value: "parole", label: "Repetes outra vez por palavras, mesmo que reformuladas de forma diferente" },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Leonardo fica desarmado por um instante, depois descruza os braços. Propõe uma pequena variante própria, não exatamente o mergulho previsto mas próxima — e fá-la.",
  },
  B: {
    ok: false,
    text: "Leonardo fá-lo, mas com os ombros rígidos e sem olhar para ninguém — obedece, não participa.",
  },
  D: {
    ok: false,
    text: "Leonardo não estava a pedir uma explicação técnica — já percebeste isso pelo tom, mas a explicação chega na mesma. Ele fecha-se ainda mais: «já disse que não.» Um colega ao lado ri-se baixinho.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "Leonardo prepara-se na borda, descontraído, pronto para experimentar a sua variante.",
  "leonardo-rigido": "Leonardo está na borda, mas o corpo está tenso: experimenta sem participar mesmo.",
  "recupero-riuscito": "Leonardo, depois de ver a Sofia, aproxima-se por sua conta, um pouco cauteloso mas genuíno.",
  "leonardo-fuori":
    "Leonardo continua sentado fora do grupo. É a vez da Sofia, que esperava de qualquer forma pela sua vez — o beat continua com ela, com um olho que tem de ficar em Leonardo, sem o excluir de todo.",
};

export const esameTurno2StepsPtPT: Step[] = [
  // 0 — intro
  {
    day: "antes de começar",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Exame final · Turno 2</div>
        <h1>A situação difícil</h1>
        <p className="lede">
          Estás com um grupo de jovens de 11-13 anos. É a vez do <strong>Leonardo (12 anos)</strong> experimentar
          primeiro um mergulho de partida — nunca feito antes, nunca à frente do grupo. Também a{" "}
          <strong>Sofia (11 anos)</strong> espera a sua vez, um pouco mais atrás.
        </p>
        <div className="card warn">
          Isto não é um capítulo. Não há um botão «pergunta seguinte». Há apenas o que acontece depois daquilo que
          escolhes.
        </div>
        <p className="lede">
          Como no Turno 1: o turno está dividido em <strong>beats</strong> — os momentos da mesma
          cena, um a seguir ao outro — e a nota vai de 80 a 100, com o <strong>100 com distinção</strong>{" "}
          reservado a quem também sabe recuperar bem de um erro em tempo real.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.beat1,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · A recusa</div>
          <h1>«Não faço, isso é uma estupidez.»</h1>
          <p className="lede">
            Leonardo para na borda, cruza os braços. Não treme, não procura o teu olhar, não parece alguém com
            medo — parece alguém que decidiu.
          </p>
          <p className="prompt">
            É mais provável que o Leonardo não consiga, ou que não queira? E o que fazes — não o que voltas a
            explicar-lhe?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="beat1" options={BEAT1_OPTIONS} selected={answers.beat1} onPick={(v) => setResponse("beat1", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recuperação",
    pct: 24,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · só porque o diagnóstico estava errado</div>
        <h1>Uma recusa vista pelos outros</h1>
        <p className="lede">
          Leonardo continua imóvel, braços cruzados. O riso baixinho de um colega ao lado não ajuda — agora já não
          é só uma recusa, é uma recusa vista pelos outros.
        </p>
        <p className="prompt">Tens uma segunda bifurcação. O que fazes agora?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>O que fazes mesmo, na prática</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "cambia" && (
          <div className="feedback ok">
            Leonardo descontrai-se, não de todo — continua um pouco cauteloso — mas acena que sim. Vê a Sofia
            experimentar, depois, sem que ninguém lhe peça de novo, aproxima-se da borda.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            Leonardo afasta-se um passo, senta-se na borda, fora do grupo de quem espera a sua vez. Deixa de
            responder.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la verifica che non si vede
  {
    day: "beat 2",
    pct: 38,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 2 · A verificação que não se vê</div>
          <h1>O contexto com que chegas</h1>
          <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
          <p className="lede">
            <strong>{chi} experimenta o mergulho.</strong> Entra de barriga em vez de cabeça — os braços não estão
            esticados para a frente no momento da entrada.
          </p>
          <p className="prompt">
            Como verificas se a instrução anterior chegou — sem perguntares «percebeste?» — e o que reparas?
          </p>
          <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        </>
      );
    },
  },

  // 4 — beat3a, cambiare strada
  {
    day: "beat 3 — mudar de rumo",
    pct: 52,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3 && !!a.canale,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const chi = soggetto(answers);
      return (
        <>
          <div className="eyebrow">Beat 3 · Mudar de rumo</div>
          <h1>Mesmo erro, segunda tentativa</h1>
          <p className="lede">
            Tentas corrigir a entrada por palavras: «mantém os braços mais juntos e esticados quando entrares.» Na
            segunda tentativa, mesmo erro — de barriga, braços não esticados.
          </p>
          <p className="prompt">
            A segunda tentativa é igual à primeira. O que fazes agora — sem repetir as mesmas palavras?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>O que fazes mesmo, na prática</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {answers.canale === "cambia" && (
            <div className="feedback ok">
              Na terceira tentativa, a entrada está quase correta — não perfeita, mas os braços ficam esticados, e a
              entrada é de cabeça.
            </div>
          )}
          {answers.canale === "parole" && (
            <div className="feedback retry">
              A terceira tentativa é idêntica à segunda — {chi} começa a mostrar sinais de cansaço da atenção, já
              não do erro em si.
            </div>
          )}
          <p className="lede" style={{ marginTop: 14, fontSize: ".86rem" }}>
            ({chi} é quem está a experimentar o mergulho nesta versão do turno.)
          </p>
        </>
      );
    },
  },

  // 5 — beat3b, il ritorno
  {
    day: "beat 3 — o retorno",
    pct: 66,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q4,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 3 · O retorno</div>
        <h1>Seja como for que tenha corrido a terceira tentativa</h1>
        <p className="lede">
          Seja qual tenha sido a terceira tentativa — quase certa, ou ainda igual — tens de dar um retorno.
        </p>
        <p className="prompt">Escreve o retorno que dás agora, específico sobre o comportamento, não sobre a pessoa.</p>
        <Field id="q4" value={answers.q4 ?? ""} onChange={(v) => setReflection("q4", v)} />
      </>
    ),
  },

  // 6 — chiusura
  {
    day: "encerramento",
    pct: 82,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => (beat2Version(a) === "leonardo-fuori" ? !!a.qleonardo && !!a.qchiusura : !!a.qchiusura),
    render: ({ answers, setReflection }: StepContext) => {
      const isFuori = beat2Version(answers) === "leonardo-fuori";
      return (
        <>
          <div className="eyebrow">Encerramento do Turno 2</div>
          <h1>{isFuori ? "Antes de avançar" : "O que levas contigo"}</h1>
          {isFuori && (
            <>
              <p className="prompt">
                Voltas para junto do Leonardo, sentado na borda? O que lhe dizes, ou não dizes, antes de encerrar?
              </p>
              <Field id="qleonardo" value={answers.qleonardo ?? ""} onChange={(v) => setReflection("qleonardo", v)} />
              <p className="lede" style={{ marginTop: 10, fontSize: ".84rem" }}>
                Não entra na pontuação — mas o sistema regista se a porta fica aberta para o próximo turno, ou se a
                recusa fica sem mais nenhuma palavra.
              </p>
            </>
          )}
          <p className="prompt" style={{ marginTop: 18 }}>
            Em todas as versões: o que levas contigo, deste turno, para o próximo?
          </p>
          <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        </>
      );
    },
  },

  // 7 — risultato
  {
    day: "resultado",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c9 =
        o === "A"
          ? "resolvida à primeira"
          : o === "B"
            ? "resolvida em parte"
            : answers.beat2a === "cambia"
              ? "errada, mas recuperada"
              : "errada, não recuperada";
      const c8 = answers.canale === "cambia" ? "resolvida à primeira" : "a reforçar";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Turno 2 concluído</div>
          <div className="eyebrow">Como se lê o resultado</div>
          <h1>A situação difícil</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C9 · Situações difíceis</span>
              <span className="esito">{c9}</span>
            </div>
            <div className="result-row">
              <span className="comp">C6 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Verificar com a ação</span>
              <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C8 · Mudar de rumo</span>
              <span className="esito">{c8}</span>
            </div>
            <div className="result-row">
              <span className="comp">C7 · O retorno</span>
              <span className="esito">registado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "cambia" && (
            <div className="card quote">
              Perceber em tempo real que leste mal a situação, e mudar de rumo à frente do grupo sem recuar de forma
              desajeitada: isto é uma ótima recuperação, feita à vista de todos. E é mesmo o tipo de prova que é
              preciso para o 100 com distinção.
            </div>
          )}
          <p className="lede">
            O turno continua de qualquer forma — coerente com «não se pode falhar, só adiar». O próximo turno espera
            por ti: <strong>Turno 3 — Os adolescentes, e quem já sabe fazer sozinho.</strong>
          </p>
        </>
      );
    },
  },
];
