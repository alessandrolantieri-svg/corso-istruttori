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

// Tradução para o português (Brasil), não é uma rodada independente: mesmos chapterId/chaves de
// resposta/valores internos da rodada italiana (src/lib/exam/esame-turno-2.tsx) — muda apenas o
// texto visível.
// Porta 1:1 beat1Outcome()/needsBeat2A()/beat2Version()/soggetto() do mockup esame-turno2.html:
// aqui, diferente da Rodada 1, o Beat 1 é uma única encruzilhada com três resultados (não duas
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
      "Você reconhece que o mergulho não é o problema, é fazer isso primeiro na frente de todo mundo — você oferece a ele um papel ou uma saída que não é uma rendição («me mostra você como faria diferente»)",
  },
  {
    value: "B",
    label: "Você entende que o problema é relacional, mas mesmo assim insiste para ele tentar na hora, na frente de todo mundo («vai, só faz, todo mundo tá olhando»)",
  },
  {
    value: "D",
    label: "Você reexplica a técnica do mergulho, talvez mais devagar («olha, é fácil: dobra os joelhos...»)",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Você reconhece o erro e muda de abordagem — para de explicar a técnica, se aproxima, baixa o tom de voz, oferece um jeito que não o expõe",
  },
  {
    value: "insisti",
    label: "Você insiste na mesma leitura — repete a explicação técnica, talvez com mais firmeza",
  },
];
const CANALE_OPTIONS: Option[] = [
  {
    value: "cambia",
    label: "Você muda de canal — mostra o mergulho devagar na borda, ou guia fisicamente a posição dos braços",
  },
  { value: "parole", label: "Você repete ainda com palavras, mesmo que reformuladas de outro jeito" },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "O Leonardo se desconcerta por um instante, depois solta os braços. Propõe uma pequena variante dele, não exatamente o mergulho previsto, mas parecida — e faz.",
  },
  B: {
    ok: false,
    text: "O Leonardo faz, mas com os ombros rígidos e sem olhar para ninguém — obedece, não participa.",
  },
  D: {
    ok: false,
    text: "O Leonardo não estava pedindo uma explicação técnica — você já tinha percebido isso pelo tom, mas a explicação vem mesmo assim. Ele se fecha ainda mais: «eu falei que não.» Um colega por perto dá uma risadinha.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "O Leonardo se prepara na borda, tranquilo, pronto para tentar a variante dele.",
  "leonardo-rigido": "O Leonardo está na borda, mas o corpo está tenso: tenta sem participar de verdade.",
  "recupero-riuscito": "O Leonardo, depois de olhar para a Sofia, se aproxima sozinho, um pouco cauteloso mas genuíno.",
  "leonardo-fuori":
    "O Leonardo continua sentado fora do grupo. É a vez da Sofia, que esperava a vez dela de qualquer forma — o beat continua com ela, com um olho que precisa continuar no Leonardo, sem excluí-lo de todo.",
};

export const esameTurno2StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "antes de começar",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Exame final · Rodada 2</div>
        <h1>A situação difícil</h1>
        <p className="lede">
          Você está com um grupo de adolescentes de 11 a 13 anos. É a vez do <strong>Leonardo (12 anos)</strong> tentar
          primeiro um mergulho de partida — nunca fez antes, nunca na frente do grupo. A <strong>Sofia (11 anos)</strong>{" "}
          também espera a vez dela, um pouco mais atrás.
        </p>
        <div className="card warn">
          Isso não é um capítulo. Não existe um botão «próxima pergunta». Só existe o que acontece depois do que você
          escolhe.
        </div>
        <p className="lede">
          Como na Rodada 1: a rodada é dividida em <strong>beats</strong> — os momentos da mesma cena, um depois do
          outro — e a nota vai de 80 a 100, com o <strong>100 com louvor</strong> reservado para quem também sabe
          recuperar bem um erro em tempo real.
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
          <h1>«Não vou fazer, é bobo.»</h1>
          <p className="lede">
            O Leonardo para na borda, cruza os braços. Não treme, não procura o seu olhar, não parece alguém com medo —
            parece alguém que decidiu.
          </p>
          <p className="prompt">
            É mais provável que o Leonardo não consiga, ou que ele não queira? E o que você faz — não o que você
            explica de novo?
          </p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
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
          O Leonardo continua parado, braços cruzados. A risadinha de um colega por perto não ajuda — agora não é mais
          só uma recusa, é uma recusa vista pelos outros.
        </p>
        <p className="prompt">Você tem uma segunda encruzilhada. O que você faz agora?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>O que você faz de verdade, na prática</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "cambia" && (
          <div className="feedback ok">
            O Leonardo se solta, não de todo — continua um pouco cauteloso — mas concorda com a cabeça. Observa a Sofia
            tentar, depois, sem que ninguém peça de novo, se aproxima da borda.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            O Leonardo se afasta um passo, senta na borda, fora do grupo de quem espera a vez. Não responde mais.
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
          <h1>O contexto com que você chega</h1>
          <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
          <p className="lede">
            <strong>{chi} tenta o mergulho.</strong> Entra de barriga em vez de cabeça — os braços não ficam esticados
            para a frente no momento da entrada.
          </p>
          <p className="prompt">
            Como você verifica se a instrução anterior chegou até ele — sem perguntar «entendeu?» — e o que você
            percebe?
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
            Você tenta corrigir a entrada com palavras: «mantém os braços mais juntos e esticados quando entrar.» Na
            segunda tentativa, mesmo erro — de barriga, braços não esticados.
          </p>
          <p className="prompt">
            A segunda tentativa é igual à primeira. O que você faz agora — sem repetir as mesmas palavras?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <OptionGroup name="canale" options={CANALE_OPTIONS} selected={answers.canale} onPick={(v) => setResponse("canale", v)} />
          {answers.canale === "cambia" && (
            <div className="feedback ok">
              Na terceira tentativa a entrada está quase correta — não perfeita, mas os braços continuam esticados, e a
              entrada é de cabeça.
            </div>
          )}
          {answers.canale === "parole" && (
            <div className="feedback retry">
              A terceira tentativa é idêntica à segunda — {chi} começa a mostrar sinais de cansaço da atenção, não mais
              do erro em si.
            </div>
          )}
          <p className="lede" style={{ marginTop: 14, fontSize: ".86rem" }}>
            ({chi} é quem está tentando o mergulho nesta versão da rodada.)
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
        <h1>Seja como for que a terceira tentativa tenha ido</h1>
        <p className="lede">
          Seja como for que a terceira tentativa tenha sido — quase certa, ou ainda igual — você precisa dar um
          retorno.
        </p>
        <p className="prompt">Escreva o retorno que você dá agora, específico sobre o comportamento, não sobre a pessoa.</p>
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
          <div className="eyebrow">Encerramento da Rodada 2</div>
          <h1>{isFuori ? "Antes de continuar" : "O que você leva com você"}</h1>
          {isFuori && (
            <>
              <p className="prompt">
                Você volta para o Leonardo, sentado na borda? O que você diz a ele, ou não diz, antes de encerrar?
              </p>
              <Field id="qleonardo" value={answers.qleonardo ?? ""} onChange={(v) => setReflection("qleonardo", v)} />
              <p className="lede" style={{ marginTop: 10, fontSize: ".84rem" }}>
                Não entra na pontuação — mas o sistema registra se a porta continua aberta para a próxima rodada, ou se
                a recusa fica sem mais nenhuma palavra.
              </p>
            </>
          )}
          <p className="prompt" style={{ marginTop: 18 }}>
            Em todas as versões: o que você leva com você, desta rodada, para a próxima?
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
          ? "resolvida na primeira tentativa"
          : o === "B"
            ? "resolvida parcialmente"
            : answers.beat2a === "cambia"
              ? "errada, mas recuperada"
              : "errada, não recuperada";
      const c8 = answers.canale === "cambia" ? "resolvida na primeira tentativa" : "precisa de reforço";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Rodada 2 concluída</div>
          <div className="eyebrow">Como interpretar o resultado</div>
          <h1>A situação difícil</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C9 · Situações difíceis</span>
              <span className="esito">{c9}</span>
            </div>
            <div className="result-row">
              <span className="comp">C6 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Verificar com a ação</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C8 · Mudar de rumo</span>
              <span className="esito">{c8}</span>
            </div>
            <div className="result-row">
              <span className="comp">C7 · O retorno</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "cambia" && (
            <div className="card quote">
              Perceber em tempo real que você leu mal a situação, e mudar de rumo na frente do grupo sem dar uma marcha
              à ré desajeitada: isso é uma ótima recuperação, feita diante de todos. E é exatamente o tipo de prova que
              é preciso para o 100 com louvor.
            </div>
          )}
          <p className="lede">
            A rodada continua de qualquer forma — coerente com «não se pode falhar, só adiar». A próxima rodada espera
            por você: <strong>Rodada 3 — Os adolescentes, e quem já sabe se virar sozinho.</strong>
          </p>
        </>
      );
    },
  },
];
