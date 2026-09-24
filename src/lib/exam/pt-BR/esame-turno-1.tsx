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
// resposta/valores internos da rodada italiana (src/lib/exam/esame-turno-1.tsx) — muda apenas o
// texto visível.
// Porta 1:1 beat1Outcome()/beat2Version() do mockup esame-turno1.html: Aurora e Diego são duas
// leituras sem relação, avaliadas separadamente — quatro resultados, não dois.
type Beat1Outcome = "A" | "B" | "C" | "D" | null;
function beat1Outcome(a: Record<string, string>): Beat1Outcome {
  const aurora = a.aurora,
    diego = a.diego;
  if (!aurora || !diego) return null;
  if (aurora === "giusta" && diego === "giusta") return "A";
  if (aurora === "giusta" && diego === "sbagliata") return "B";
  if (aurora === "sbagliata" && diego === "giusta") return "C";
  return "D";
}
function needsBeat2A(a: Record<string, string>): boolean {
  return beat1Outcome(a) === "D";
}
type Beat2Version = "pulita" | "diego-agitato" | "aurora-ferma" | "recupero-riuscito" | "mai-recuperato";
function beat2Version(a: Record<string, string>): Beat2Version {
  const o = beat1Outcome(a);
  if (o === "A") return "pulita";
  if (o === "B") return "diego-agitato";
  if (o === "C") return "aurora-ferma";
  if (o === "D") return a.beat2a === "separi" ? "recupero-riuscito" : "mai-recuperato";
  return "pulita";
}

const AURORA_OPTIONS: Option[] = [
  { value: "giusta", label: "Você se aproxima, fica na altura dela, estende a mão sem dizer «entra»" },
  {
    value: "sbagliata",
    label: "Você usa uma garantia genérica ou tenta fazê-la entrar direto («vem, não aconteceu nada, entra»)",
  },
];
const DIEGO_OPTIONS: Option[] = [
  { value: "giusta", label: "Você dá a ele uma tarefa que use a energia dele («me traz as pranchinhas, corre!»)" },
  {
    value: "sbagliata",
    label: "Você só chama a atenção dele («Diego, para!») sem dar um lugar para aquela energia",
  },
];
const BEAT2A_OPTIONS: Option[] = [
  {
    value: "separi",
    label: "Você separa os dois problemas — dá ao Diego e à Elisa uma tarefa rápida e distinta, e só depois volta para a Aurora, com calma",
  },
  {
    value: "insisti",
    label: "Você insiste na mesma atitude que já não funcionou — chama todo mundo de novo em voz alta, ou repete a mesma garantia genérica",
  },
];

const BEAT1_FEEDBACK: Record<Exclude<Beat1Outcome, null>, { ok: boolean; text: string }> = {
  A: {
    ok: true,
    text: "Sentindo você por perto e sem pressão, a Aurora move o pé mais para dentro. O Diego, com algo para fazer, canaliza a energia e volta correndo para o grupo, contente.",
  },
  B: {
    ok: false,
    text: "A Aurora se solta e move o pé. O Diego para um segundo, mas quase na mesma hora volta a empurrar — uma chamada de atenção não deu a ele nada para fazer com aquela energia.",
  },
  C: {
    ok: false,
    text: "O Diego se afasta contente com a tarefa dele. A Aurora fica parada — a garantia não chegou até ela: a causa dela era medo, não hesitação, e palavras sozinhas não bastam para convencê-la.",
  },
  D: {
    ok: false,
    text: "A Aurora não se mexe — a garantia genérica não chegou até ela. O Diego, chamado em voz alta, para um segundo mas volta quase na mesma hora: ele não precisava de uma ordem, precisava descarregar aquela energia em algum lugar.",
  },
};

const BEAT2_VERSION_TEXT: Record<Beat2Version, string> = {
  pulita: "O grupo está tranquilo. Toda a sua atenção está livre para o Marco.",
  "diego-agitato": "O Diego continua se mexendo nas bordas do grupo enquanto você tenta acompanhar o Marco: um olho precisa continuar nele.",
  "aurora-ferma": "A Aurora ficou na borda, não voltou: um olho precisa continuar nela enquanto você trabalha com o Marco.",
  "recupero-riuscito": "O grupo se reuniu de novo, mas alguns minutos depois do previsto: o Marco esperou, um pouco distraído com o que aconteceu antes.",
  "mai-recuperato": "O grupo chega ainda agitado: o Diego continua atrapalhando nas bordas enquanto você tenta trabalhar com o Marco.",
};

export const esameTurno1StepsPtBR: Step[] = [
  // 0 — intro
  {
    day: "antes de começar",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Exame final · Rodada 1</div>
        <h1>O grupo dos pequenos</h1>
        <p className="lede">
          Você tem à sua frente um grupo de quatro crianças: <strong>Aurora (4 anos)</strong>, <strong>Elisa (6 anos)</strong>,{" "}
          <strong>Marco (7 anos)</strong> e <strong>Diego (9 anos)</strong>. É a rodada de quarta-feira: quinze minutos de
          aquecimento, depois o exercício da semana.
        </p>
        <div className="card warn">
          Isso não é um capítulo. Não existe um botão «próxima pergunta». Só existe o que acontece depois do que você
          escolhe.
        </div>
        <p className="lede">
          A rodada é dividida em <strong>beats</strong> — os momentos da mesma cena, um depois do outro: o que você
          escolhe em um beat muda o beat que vem a seguir. Não são perguntas separadas, é uma cena única que se move com
          você.
        </p>
        <p className="lede">
          A nota vai de 80 a 100. O <strong>100 com louvor</strong> é o nível mais alto: não basta responder bem, é
          preciso também saber recuperar um erro em tempo real, na frente do grupo — se isso acontecer com você, é uma
          oportunidade, não um problema.
        </p>
      </>
    ),
  },

  // 1 — beat1
  {
    day: "beat 1",
    pct: 14,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1 && !!a.aurora && !!a.diego,
    render: ({ answers, setReflection, setResponse }: StepContext) => {
      const outcome = beat1Outcome(answers);
      const fb = outcome ? BEAT1_FEEDBACK[outcome] : null;
      return (
        <>
          <div className="eyebrow">Beat 1 · Duas coisas ao mesmo tempo</div>
          <h1>Aurora e Diego, no mesmo momento</h1>
          <p className="lede">
            Você acabou de chegar na borda. <strong>Aurora</strong> está parada, o pé na água até o tornozelo, sem se
            mexer — os ombros para cima, tensos, os olhos fixos na água. No mesmo momento, <strong>Diego</strong> começa
            a empurrar o Marco de brincadeira, rindo alto, e não consegue ficar quieto.
          </p>
          <p className="prompt">Você tem um instante. Com quem você começa, e o que faz primeiro?</p>
          <Field id="q1" value={answers.q1 ?? ""} onChange={(v) => setReflection("q1", v)} />
          <h2>O que você faz de verdade, na prática</h2>
          <p className="lede">
            Aurora e Diego são duas situações sem relação — são avaliadas separadamente, não como um bloco único.
          </p>
          <p className="prompt">Com Aurora:</p>
          <OptionGroup name="aurora" options={AURORA_OPTIONS} selected={answers.aurora} onPick={(v) => setResponse("aurora", v)} />
          <p className="prompt">Com Diego:</p>
          <OptionGroup name="diego" options={DIEGO_OPTIONS} selected={answers.diego} onPick={(v) => setResponse("diego", v)} />
          {fb && <div className={`feedback ${fb.ok ? "ok" : "retry"}`}>{fb.text}</div>}
        </>
      );
    },
  },

  // 2 — beat2a, solo se esito D
  {
    day: "beat 2a — recuperação",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2a && !!a.beat2a,
    visible: (a) => needsBeat2A(a),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2A · só porque nenhuma das duas leituras estava certa</div>
        <h1>O grupo começa a se desunir</h1>
        <p className="lede">
          Aurora continua parada. O Diego, enquanto isso, voltou a empurrar — dessa vez a Elisa, que se afasta
          incomodada. O grupo começa a se desunir.
        </p>
        <p className="prompt">Você tem uma segunda encruzilhada. O que você faz agora?</p>
        <Field id="q2a" value={answers.q2a ?? ""} onChange={(v) => setReflection("q2a", v)} />
        <h2>O que você faz de verdade, na prática</h2>
        <OptionGroup name="beat2a" options={BEAT2A_OPTIONS} selected={answers.beat2a} onPick={(v) => setResponse("beat2a", v)} />
        {answers.beat2a === "separi" && (
          <div className="feedback ok">
            O Diego se afasta contente com uma tarefa para fazer. A Elisa, ouvida um instante à parte, se acalma. A
            Aurora, sem mais aquela agitação ao redor, finalmente move o pé mais para dentro.
          </div>
        )}
        {answers.beat2a === "insisti" && (
          <div className="feedback retry">
            A Elisa se afasta ainda mais, agora também emburrada. O Diego, sem nenhuma tarefa, volta a empurrar. A
            Aurora, ao ouvir a voz alta no grupo, fica mais tensa em vez de relaxar.
          </div>
        )}
      </>
    ),
  },

  // 3 — beat2, la consegna a Marco
  {
    day: "beat 2",
    pct: 45,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q2,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Beat 2 · A instrução para o Marco</div>
        <h1>O contexto com que você chega</h1>
        <div className="card">{BEAT2_VERSION_TEXT[beat2Version(answers)]}</div>
        <p className="lede">
          <strong>Agora é a vez do Marco, 7 anos.</strong> Ele precisa aprender a entrada na água em dois tempos —
          braços, depois pernas — um exercício novo para ele.
        </p>
        <p className="prompt">
          Escreva a instrução que você daria a ele, em positivo, adequada à faixa dele (6-10 anos: consegue lidar com
          dois passos seguidos).
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
      </>
    ),
  },

  // 4 — beat3, la verifica che non si vede
  {
    day: "beat 3",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q3,
    render: ({ answers, setReflection }: StepContext) => {
      const v = beat2Version(answers);
      const noise =
        v === "diego-agitato" || v === "mai-recuperato" ? (
          <div className="card">
            Bem nesse momento o Diego, na borda, ri alto de alguma coisa — o Marco pode ter parado pela hesitação
            técnica, ou por ter se distraído virando na direção da risada. A leitura das quatro causas do Capítulo 3 é
            de verdade mais difícil aqui, não só mais estressante: mais um elemento a descartar antes de chegar à causa
            real.
          </div>
        ) : v === "aurora-ferma" ? (
          <div className="card">
            A atenção está dividida entre o Marco e a Aurora — o risco não é um ruído que atrapalha a leitura, mas o
            tempo: quão rápido você percebe a hesitação do Marco enquanto um olho continua nela.
          </div>
        ) : (
          <div className="card">O momento está claro, nenhum ruído ao redor — só o Marco e a hesitação dele.</div>
        );
      return (
        <>
          <div className="eyebrow">Beat 3 · A verificação que não se vê</div>
          <h1>A hesitação do Marco</h1>
          <p className="lede">
            O Marco executa. Parece correto — mas ele para um instante antes do segundo passo, com uma expressão que
            você não consegue ler bem.
          </p>
          {noise}
          <p className="prompt">
            Qual das quatro causas do Capítulo 3 parece mais provável para você, e o que você faz — não o que você
            pergunta com palavras, o que você faz — para descobrir?
          </p>
          <Field id="q3" value={answers.q3 ?? ""} onChange={(v) => setReflection("q3", v)} />
        </>
      );
    },
  },

  // 5 — chiusura
  {
    day: "encerramento",
    pct: 80,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Encerramento da Rodada 1</div>
        <h1>O que você leva com você</h1>
        <p className="lede">
          A rodada termina. O grupo sai da água, a Aurora sorrindo, o Marco ainda um pouco inseguro sobre o último
          exercício.
        </p>
        <p className="prompt">
          Uma última pergunta, antes de passar para a Rodada 2: o que você leva com você, desta rodada, para a próxima?
        </p>
        <Field id="qchiusura" value={answers.qchiusura ?? ""} onChange={(v) => setReflection("qchiusura", v)} />
        <p className="lede" style={{ marginTop: 14, fontSize: ".84rem" }}>
          Essa reflexão não entra na pontuação: é a mesma que você fez por dez semanas, a última vez antes do resultado.
        </p>
      </>
    ),
  },

  // 6 — risultato
  {
    day: "resultado",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const o = beat1Outcome(answers);
      const c4 =
        o === "A"
          ? "resolvida na primeira tentativa"
          : o === "B" || o === "C"
            ? "resolvida parcialmente"
            : answers.beat2a === "separi"
              ? "errada, mas recuperada"
              : "errada, não recuperada";
      return (
        <>
          <div className="done-badge"><i className="ph-duotone ph-check-circle" aria-hidden="true" /> Rodada 1 concluída</div>
          <div className="eyebrow">Como interpretar o resultado</div>
          <h1>O grupo dos pequenos</h1>
          <div className="card">
            <div className="result-row">
              <span className="comp">C4 · Sintonia</span>
              <span className="esito">{c4}</span>
            </div>
            <div className="result-row">
              <span className="comp">C2 · Reconhecimento do aluno</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C5 · Instrução em positivo</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
            <div className="result-row">
              <span className="comp">C3 <i className="ph-duotone ph-trophy" aria-hidden="true" /> · Observar e interpretar</span>
              <span className="esito">registrado <i className="ph-duotone ph-check" aria-hidden="true" /></span>
            </div>
          </div>
          {o === "D" && answers.beat2a === "separi" && (
            <div className="card quote">
              Um erro recuperado bem não é o mesmo que nunca ter errado — mas também não é um simples remendo. Mostra
              que você sabe se adaptar bem sob pressão: o caminho para a nota máxima não passa só por uma rodada
              perfeita do começo ao fim.
            </div>
          )}
          <p className="lede">
            A rodada continua de qualquer forma, seja qual for o caminho que você tenha escolhido — coerente com «não se
            pode falhar, só adiar». A próxima rodada espera por você: <strong>Rodada 2 — A situação difícil.</strong>
          </p>
        </>
      );
    },
  },
];
