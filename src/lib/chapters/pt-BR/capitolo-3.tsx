import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português brasileiro, não um capítulo independente: mesmos chapterId/chaves de
// resposta/values internos do capítulo italiano (src/lib/chapters/capitolo-3.tsx) — só o texto
// visível muda.

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

// Traz 1:1 a função simPath() do mockup: classifica a combinação das duas primeiras escolhas da
// simulação com Luca num caminho "aperta" (há uma terceira troca, em texto livre) ou "chiusa" (a
// cena termina sem a terceira troca).
function simPath(answers: Record<string, string>): "aperta" | "chiusa" {
  if (answers.sim1 === "curioso" && answers.sim2 === "scalda") return "aperta";
  if (answers.sim1 === "diretto" && answers.sim2 === "calma") return "aperta";
  return "chiusa";
}

const K1_OPTIONS: Option[] = [
  { value: "si", label: "Sim, o medo é o mesmo em qualquer idade", correct: false },
  { value: "no", label: "Não — aos 5 anos um jogo ou uma mão estendida, aos 13 não ser observada enquanto hesita", correct: true },
];
const K2_OPTIONS: Option[] = [
  { value: "bracciata", label: "«Porque alonga sua braçada — tenta e sente a diferença»", correct: true },
  { value: "dico", label: "«Porque eu estou mandando, agora faz»", correct: false },
];
const K3_OPTIONS: Option[] = [
  { value: "risponde", label: "Pelo jeito como responde", correct: true },
  { value: "carta", label: "Pela carteira de identidade", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "eta", label: "Você trata pela idade que consta no papel", correct: false },
  { value: "comportamento", label: "Você trata pelo comportamento que ela mostra", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Não — a faixa etária também se lê pelo contexto", correct: true },
  { value: "si", label: "Sim, você tinha errado ao avaliar ele", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "si", label: "Sim, se for clara", correct: false },
  { value: "no", label: "Não — você a perde na metade, mesmo que pareça estar ouvindo", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "freddo", label: "Frio", correct: true },
  { value: "paura", label: "Medo", correct: false },
  { value: "via", label: "Espera o sinal", correct: false },
  { value: "capito", label: "Não entendeu", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "paura", label: "Medo", correct: false },
  { value: "freddo", label: "Frio", correct: false },
  { value: "via", label: "Espera o sinal", correct: true },
  { value: "capito", label: "Não entendeu", correct: false },
];
const M3_OPTIONS: Option[] = [
  { value: "via", label: "Espera o sinal", correct: false },
  { value: "freddo", label: "Frio", correct: false },
  { value: "capito", label: "Não entendeu — a instrução ainda não está clara, é preciso explicar de novo, um aceno não basta", correct: true },
  { value: "paura", label: "Medo", correct: false },
];
const M4_OPTIONS: Option[] = [
  { value: "no", label: "Não, os quatro sinais continuam sempre separados e fixos", correct: false },
  { value: "si", label: "Sim — o sinal pode mudar enquanto você observa, se a espera se prolongar demais", correct: true },
];

const SIM1_OPTIONS: Option[] = [
  { value: "diretto", label: "«Vai, Luca, você já conseguiu antes, entra»" },
  { value: "curioso", label: "«Luca, o que você está sentindo? Está fria ou você está com um friozinho?»" },
];
const SIM2_OPTIONS_DIRETTO: Option[] = [
  { value: "insisti", label: "«Vai, Luca, você sabe fazer isso, vamos»" },
  { value: "calma", label: "Você se aproxima, abaixa a voz, pergunta com calma o que ele está sentindo" },
];
const SIM2_OPTIONS_CURIOSO: Option[] = [
  { value: "entra", label: "Você faz ele entrar de qualquer jeito, dizendo que o frio passa dentro da água" },
  { value: "scalda", label: "Você propõe trinta segundos de movimento fora da água, na borda, como com Giada" },
];

const T1_OPTIONS: Option[] = [
  { value: "capito", label: "Não entendeu", correct: false },
  { value: "paura", label: "Está com medo", correct: true },
  { value: "freddo", label: "Está com frio", correct: false },
  { value: "via", label: "Espera o sinal", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "paura", label: "Está com medo", correct: false },
  { value: "capito", label: "Não entendeu", correct: false },
  { value: "via", label: "Espera o sinal", correct: true },
  { value: "freddo", label: "Está com frio", correct: false },
];
const T3_OPTIONS: Option[] = [
  { value: "calore", label: "Falta calor — provavelmente está com frio", correct: true },
  { value: "coraggio", label: "Falta coragem", correct: false },
  { value: "spiegazione", label: "Falta uma explicação mais clara", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "tecnica", label: "Uma explicação técnica, como para um adulto", correct: false },
  { value: "motivo", label: "Um motivo prático e direto", correct: true },
  { value: "niente", label: "Nenhuma resposta, simplesmente se cumpre", correct: false },
];
const T5_OPTIONS: Option[] = [
  { value: "si", label: "Sim — se você olha com atenção, entende automaticamente o que está acontecendo", correct: false },
  { value: "no", label: "Não — olhar é ver que algo aconteceu, entender é decidir o que isso significa", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "no", label: "Não — de qualquer jeito ensina alguma coisa, muitas vezes o contrário", correct: true },
  { value: "si", label: "Sim, o importante é tentar", correct: false },
];
const T7_OPTIONS: Option[] = [
  { value: "si", label: "Sim, se as respostas estiverem certas", correct: false },
  { value: "no", label: "Não — é sempre necessária pelo menos uma aula de verdade na piscina", correct: true },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "Não, os quatro sinais continuam sempre separados", correct: false },
  { value: "si", label: "Sim — o sinal pode mudar enquanto você observa, se a espera se prolongar", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "misto", label: "Uma mistura entre esperar o sinal e a vergonha de um grupo novo que está olhando", correct: true },
  { value: "dimenticato", label: "Esqueceu como se faz o mergulho", correct: false },
  { value: "acqua", label: "Está com medo da água", correct: false },
];

const DIARY_KEYS = ["q2", "q7", "sim3", "qtrasf", "t10"];

export const capitolo3StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 3 · OLHAR E ENTENDER <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>Ele parou: está com medo ou não entendeu?</h1>
        <p className="lede">
          Diante de uma criança que para, trava ou hesita, o instrutor sabe distinguir entre
          quatro causas diferentes — e sabe que cada uma pede uma resposta diferente.
        </p>
        <div className="card warn">
          <strong>Um padrão mais alto.</strong> Cada competência deste curso passa por uma escala
          de níveis, em ordem: <strong>EM DESENVOLVIMENTO → ADQUIRIDA → CONSOLIDADA → EXCELENTE</strong> —
          mas só em duas, marcadas com o símbolo <i className="ph-duotone ph-trophy" aria-hidden="true" />, o curso pede para ir além: até{" "}
          <strong>EXCELENTE</strong>. Esta (Olhar e entender) e o Capítulo 6 (Verificar com a
          ação) são as duas competências da escuta: aqui não basta ADQUIRIDA, é preciso chegar a
          EXCELENTE antes da prova final — e só a simulação nunca basta: é sempre necessária pelo
          menos uma aula de verdade na piscina.
        </div>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + reforço do Capítulo 2
  {
    day: "segunda-feira · 10 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada o Capítulo 2 pediu uma coisa só: escolher um aluno e entender a faixa
          dele pelo jeito como ele respondia, não pela idade. Conte em duas linhas o que você
          notou.
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 2 volta</h2>
        <p className="prompt">1. Marco (5a) e Elena (13a) não entram na água sozinhos. A mesma frase serve para os dois?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Um adolescente de 15 anos pergunta: «por que eu tenho que fazer justo esse exercício?». Você responde:</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. A faixa etária se reconhece melhor pelo jeito como a criança responde ou pela carteira de identidade?</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Uma criança de 10 anos se comporta como uma de 12 — busca privacidade antes de ser corrigida. O que você faz?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">5. Um adolescente de 13 anos, sozinho com você sem o grupo, se comporta mais aberto do que o normal. Isso é uma contradição?</p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">6. Tratar uma criança de 7 anos com uma explicação técnica longa, como se fosse adulto, funciona?</p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — terça-feira: as quatro causas
  {
    day: "terça-feira · 14 min",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Olhar e entender não são a mesma coisa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana você aprende a fazer duas coisas que parecem uma só, e não são: olhar, e
          entender o que você está olhando.
        </p>
        <p className="lede">
          Uma criança para na borda da piscina, um instante antes do mergulho que já fez dez
          vezes. <strong>Olhar</strong> é ver que ela parou — isso qualquer um vê.{" "}
          <strong>Entender</strong> é a parte difícil: essa pausa pode significar quatro coisas
          diferentes.
        </p>
        <div className="table-wrap">
          <table className="cause">
            <tbody>
              <tr>
                <th>Está com...</th>
                <th>E o sinal é...</th>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-waves" aria-hidden="true" /> Medo</td>
                <td>O corpo enrijece, os olhos ficam fixos na água, não em você</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-question" aria-hidden="true" /> Não entendeu</td>
                <td>Olha para você, hesitante — espera um sinal que não vem</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-snowflake" aria-hidden="true" /> Frio</td>
                <td>Os braços se fecham junto ao corpo, talvez trema um pouco — nenhuma rigidez, nenhuma busca pelo seu olhar</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-eye" aria-hidden="true" /> Espera o sinal</td>
                <td>Procura você com os olhos antes de se mover — precisa do seu sinal</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Se você responder com a coisa errada, aquela criança aprende alguma coisa mesmo assim —
          só que não é o que você queria ensinar.
        </div>
        <p className="lede">
          <strong>
            Uma última coisa, antes de seguir em frente: isso complica a tabela de propósito,
            assim como já aconteceu com a faixa etária no capítulo anterior.
          </strong>{" "}
          Uma criança não fica parada como numa foto: o sinal pode mudar enquanto você observa,
          principalmente se você demorar demais para responder. Uma criança que no início só
          espera seu sinal — olhos em você, corpo tranquilo — pode mudar se você demorar demais a
          responder. O silêncio longo vira, ele mesmo, um sinal: parece para ela que algo não está
          certo. E assim o que era «espera o sinal» começa a virar medo de verdade. Observar não é
          tirar uma foto de uma vez só: é continuar olhando mesmo depois de já ter decidido uma
          resposta.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. Ombros fechados, leve tremor, nenhuma busca pelo seu olhar.</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. Procura você com os olhos antes de se mover, corpo não tenso.</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Você acabou de mostrar um exercício novo, nunca feito antes. A criança entra na água,
          para na metade, olha para você — não está esperando um sinal para continuar: parece
          mesmo não saber o que fazer agora.
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
        <p className="prompt">
          4. Uma criança que está só esperando seu sinal pode, se você demorar demais para
          responder, começar a mostrar sinais de medo de verdade?
        </p>
        <OptionGroup name="m4" options={M4_OPTIONS} selected={answers.m4} onPick={(v, correct) => setResponse("m4", v, correct)} />
      </>
    ),
  },

  // 3 — quarta-feira: cinco crianças, cinco leituras + simulação com Luca (três trocas)
  {
    day: "quarta-feira",
    pct: 44,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => {
      if (!a.sim1) return false;
      if (!a.sim2) return false;
      const path = simPath(a);
      if (path === "aperta") return !!a.sim3;
      return true;
    },
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const promptStyle = {
        fontSize: ".8rem",
        textTransform: "uppercase" as const,
        letterSpacing: ".03em",
        color: "var(--surface)",
        fontFamily: "var(--mono)",
        fontWeight: 700,
      };
      const sim2Options = answers.sim1 === "diretto" ? SIM2_OPTIONS_DIRETTO : SIM2_OPTIONS_CURIOSO;
      const path = answers.sim1 && answers.sim2 ? simPath(answers) : null;

      return (
        <>
          <div className="eyebrow">Quarta-feira</div>
          <h1>Cinco crianças, cinco leituras</h1>
          <div className="card scene">
            <div className="who">Sofia, 4 anos</div>
            <p>
              Pé na água até o tornozelo, parada. Ombros para cima, fechados; olhos fixos na água,
              não procura o instrutor. É medo, não incompreensão. O instrutor se coloca ao lado
              dela, estende a mão: «vem, eu seguro você.»
            </p>
          </div>
          <div className="card scene">
            <div className="who">Leo, 6 anos</div>
            <p>
              Acabou de ver o instrutor mostrar duas vezes um exercício novo, nunca feito antes.
              Entra na água e para na hora, corpo tranquilo, nenhum tremor. Olha para o instrutor
              — mas não com o olhar de quem espera um sinal: está procurando algo que não
              encontra. Não entendeu, não precisa de um sinal: o instrutor refaz a sequência mais
              uma vez, mais devagar, isolando só os braços. Leo a refaz na hora, sem parar de novo.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Giada, 8 anos</div>
            <p>
              Braços fechados ao redor do corpo, ombros curvados, um leve tremor nas mãos. Não
              procura o olhar do instrutor, não tem os olhos fixos e assustados. É só frio. Trinta
              segundos de movimento fora da água, na borda, antes de deixá-la entrar.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Nadia, 12 anos</div>
            <p>
              Precisa repetir um mergulho que já sabe fazer bem, mas hoje o grupo está diferente do
              normal — alguns adolescentes mais velhos, que chegaram para uma substituição. Para na
              borda: não treme, o corpo não está tenso, mas procura o olhar do instrutor duas, três
              vezes, sem dizer nada. Não é medo do mergulho: isso ela já sabe fazer. E também não é
              só «esperar o sinal». Também tem a vergonha do grupo novo — a mesma de que falava o
              Capítulo 2 nessa idade. O instrutor não diz nada em voz alta: só faz um pequeno aceno
              para ela, o mesmo que faria se o grupo fosse o de sempre. Nadia mergulha.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Matteo, 14 anos</div>
            <p>
              Parado no bloco de partida, o grupo olha para ele. O corpo está tenso de outro jeito,
              os olhos procuram o instrutor por um instante. Não é a água: é a fila olhando para
              ele. O instrutor abaixa a voz, só para ele: «pega um segundo, eu espero.»
            </p>
          </div>
          <p className="lede">
            <strong>
              Mesma pausa, cinco crianças, cinco leituras diferentes — todas as cinco certas,
              justamente por serem diferentes.
            </strong>{" "}
            Com Nadia, como com Matteo, o aceno silencioso funcionou melhor do que qualquer frase.
            Com Leo, por outro lado, um aceno não teria servido para nada: faltava a explicação,
            não a permissão.
          </p>
          <p className="prompt">
            Criança de 7 anos, parada na metade da travessia de peito. Você não sabe se está com
            medo, se não lembra o movimento, ou se espera um sinal seu. O que você diz — ou o que
            você pergunta — para entender, ANTES de dar uma instrução nova?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: não existe uma única resposta
              certa. O sistema procura uma coisa — que esteja perguntando, não supondo. Uma
              instrução direta fecha a informação, qualquer que seja a causa real. */}
          <h2>Simulação — três trocas para colocar Luca na água</h2>
          <p className="lede">
            <strong>LUCA, 9 anos.</strong> Na borda da piscina, um pé dentro, não entra. O grupo
            espera.
          </p>
          <p className="prompt" style={promptStyle}>Primeira troca</p>
          <p className="lede">O que você diz para ele primeiro?</p>
          <OptionGroup name="sim1" options={SIM1_OPTIONS} selected={answers.sim1} onPick={(v) => setResponse("sim1", v)} />
          {answers.sim1 === "diretto" && (
            <div className="feedback retry">
              LUCA: <em>(se afasta meio passo, o pé sai da água)</em> «...mas eu não quero.»
              <br />
              Uma instrução direta fechou a informação que estava faltando, qualquer que fosse a
              causa real.
            </div>
          )}
          {answers.sim1 === "curioso" && (
            <div className="feedback ok">
              LUCA: <em>(aponta para os braços, se encolhe um pouco)</em> «...tô com arrepio.»
              <br />
              Uma pergunta aberta te deu a informação: é frio, não medo. Luca se abre em vez de se
              fechar.
            </div>
          )}

          {answers.sim1 && (
            <>
              <p className="prompt" style={promptStyle}>Segunda troca</p>
              {answers.sim1 === "diretto" ? (
                <p className="lede">
                  O grupo ainda espera, e Luca está agora mais longe da borda. O que você diz para
                  ele agora?
                </p>
              ) : (
                <p className="lede">
                  Ele ainda está com frio, e o grupo espera. O que você faz agora — não só o que
                  diz?
                </p>
              )}
              <OptionGroup name="sim2" options={sim2Options} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {answers.sim2 === "insisti" && (
                <div className="feedback retry">
                  LUCA se afasta mais um passo, não responde mais — fica calado, olha para outro
                  lado.
                </div>
              )}
              {answers.sim2 === "calma" && (
                <div className="feedback ok">
                  LUCA: «...não sei, não tô a fim e pronto.»{" "}
                  <em>(para, não se afasta mais — não é uma informação clara, mas o contato voltou)</em>
                </div>
              )}
              {answers.sim2 === "entra" && (
                <div className="feedback retry">
                  LUCA hesita ainda mais, se encolhe mais — não se sente acreditado, e agora está
                  com ainda menos vontade de entrar do que antes.
                </div>
              )}
              {answers.sim2 === "scalda" && (
                <div className="feedback ok">
                  LUCA se aquece, se encolhe um pouco menos, e começa a se aproximar da borda
                  sozinho, sem que você precise falar de novo.
                </div>
              )}
            </>
          )}

          {path === "aperta" && (
            <>
              <p className="prompt" style={promptStyle}>Terceira troca — o fechamento</p>
              <p className="lede">
                Luca está agora perto da borda, ainda um pouco hesitante mas não fechado. Escreva
                a última coisa que você diz para ele antes de entrar.
              </p>
              <Field id="sim3" value={answers.sim3 ?? ""} onChange={(v) => setReflection("sim3", v)} />
              <p className="lede" style={{ fontSize: ".85rem" }}>Qualquer resposta razoável fecha bem a cena.</p>
              <div className="feedback ok" style={{ marginTop: 10 }}>
                LUCA entra, um pé de cada vez, mas entra. Você não ganhou nada — só entendeu, em
                vez de adivinhar.
              </div>
            </>
          )}
          {path === "chiusa" && (
            <>
              <p className="prompt" style={promptStyle}>A cena termina aqui — não hoje</p>
              <div className="feedback retry">
                O grupo, enquanto isso, seguiu em frente sem Luca. Luca fica na borda, calado. Não
                é um fracasso: é uma informação. Seja lá o que fosse, hoje você não encontrou a
                tempo. O que importa é o que você faz na próxima vez que ele parar — não o que
                aconteceu dessa vez.
              </div>
            </>
          )}
        </>
      );
    },
  },

  // 4 — quarta-feira à noite: transferência
  {
    day: "quarta-feira à noite",
    pct: 58,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Uma cena nunca vista</h1>
        <p className="lede">
          Uma criança de 10 anos para na metade de um exercício. Olha reto para frente, não treme,
          não procura você com os olhos — mas a respiração está mais curta do que o normal.
        </p>
        <p className="prompt">Qual causa parece mais provável para você, e por quê? Escreva seu raciocínio, não só a resposta.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não está na tabela de forma direta —
            é de propósito: costuma ser cansaço, um caso que parece com todas as quatro causas e
            não é exatamente nenhuma. O sistema verifica se a pessoa ainda está observando, não se
            tem a resposta exata. */}
      </>
    ),
  },

  // 5 — na piscina
  {
    day: "na piscina",
    pct: 66,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Seu turno na piscina</div>
        <h1>Pare um segundo você primeiro</h1>
        <p className="lede">
          Com a primeira criança que parar ou hesitar, antes de dizer qualquer coisa: pare um
          segundo você primeiro, e decida qual das quatro causas parece mais provável para você.
          Depois responda a essa, não à primeira frase que vier à cabeça.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>Não precisa acertar. Precisa ter se feito a pergunta antes de falar.</p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Se você não tiver um turno esta semana: o capítulo se desbloqueia mesmo assim com uma
          simulação reforçada — mas isso não basta para levar essa competência a EXCELENTE. Para
          isso é preciso, mais cedo ou mais tarde, uma aula de verdade na piscina.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 2 + Capítulo 3</div>
        <h1>A prova</h1>
        <p className="prompt">
          1. Uma criança de 12 anos trava antes de um mergulho que já fez antes. Não olha para
          você, fixa o olhar na água, ombros tensos para cima.
        </p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Uma criança de 5 anos para e procura você com os olhos, sem tensão no corpo.</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Treme levemente, braços fechados junto ao corpo, mas não procura seu olhar e não está com os ombros rígidos.</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">
          4. <em>(do Capítulo 2)</em> Um adolescente de 16 anos pergunta o porquê de um exercício.
          A resposta certa para a faixa etária dele é:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">5. Olhar e entender são a mesma coisa?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Responder à causa errada é um erro neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Para essa competência, uma boa simulação basta para EXCELENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">
          8. Uma criança que está só esperando seu sinal pode, se você demorar demais para
          responder, começar a mostrar sinais de medo de verdade?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Nadia, 12 anos, hesita diante de um mergulho que já sabe fazer, porque o grupo naquele
          dia está diferente do normal. O que provavelmente está por trás disso?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Uma criança de 8 anos executa um exercício errado pela terceira vez seguida, sempre
          do mesmo jeito. O que você observa, e o que começa a suspeitar?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica como funciona a correção (§10, D34)
  {
    day: "sexta-feira · feedback",
    pct: 88,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Veja o que suas respostas dizem</h1>
        <p className="lede">Não sobre você — sobre o que você fez nessas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 2:
        </p>
        <div className="card quote">
          Na pergunta 2 você respondeu «está com medo». Releia o sinal: nenhuma tensão no corpo,
          só o olhar que procura você. O medo geralmente aparece no corpo antes de aparecer nos
          olhos. Quando o olhar só procura o seu e nada mais, muitas vezes é só o sinal que está
          faltando — tente oferecer isso antes de oferecer segurança.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «você errou»: diz o que observar na próxima vez. O tom é sempre
          sobre o comportamento observado, nunca sobre a pessoa (veja o Capítulo 7, que vai
          retomar justamente essa regra).
        </p>
      </>
    ),
  },

  // 8 — recuperação: só se a prova de sexta teve muitos erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "paura", t2: "via", t3: "calore", t4: "motivo", t5: "no",
        t6: "no", t7: "no", t8: "si", t9: "misto",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Mais dois sinais, para não confundir</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever os dois sinais mais parecidos
          deste capítulo — frio e espera o sinal — com mais um exemplo de cada.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 6 anos</div>
          <p>
            Parado na borda, braços fechados ao redor do corpo, um leve tremor nas mãos. Não
            procura o olhar do instrutor — olha distraído para a água, não para ele.
          </p>
        </div>
        <p className="prompt">O que provavelmente está faltando para ele?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "via", label: "Espera o sinal — está esperando um aceno", correct: false },
            {
              value: "freddo",
              label: "Calor — nenhuma busca pelo olhar, só o corpo se fechando: está com frio",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Bianca, 9 anos</div>
          <p>
            Parada na borda, corpo relaxado, nenhum tremor. Antes de colocar um pé na água, procura
            você com os olhos duas vezes, sem dizer nada, como se estivesse esperando um aceno seu.
          </p>
        </div>
        <p className="prompt">O que provavelmente está faltando para ela?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "via",
              label: "Seu sinal — o corpo está tranquilo, só procura seu aceno",
              correct: true,
            },
            { value: "freddo", label: "Calor — provavelmente está com frio", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          O jeito mais rápido de diferenciar os dois: quem está com frio se fecha e não procura
          você; quem espera o sinal fica tranquilo e procura você com os olhos. Olhe
          principalmente para isso.
        </p>
      </>
    ),
  },

  // 9 — sexta-feira: resultado
  {
    day: "sexta-feira · resultado",
    pct: 95,
    nextLabel: "Ir para o Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Resultado</div>
        <h1>Seu perfil se atualiza</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Pontuação</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De onde nasce</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>As 10 perguntas da prova</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>A frase que você escreveu no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como você levou Luca para a água no §8, nas três trocas</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 2</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>transfer_score</td>
                <td style={{ padding: "6px 0" }}>A mesma reflexão, sobre a transferência real</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Observar e interpretar</td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores define o teto</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Para essa competência específica: mesmo chegando a ADQUIRIDA ou CONSOLIDADA, o estado
          EXCELENTE não é ativado sem pelo menos uma aula de verdade na piscina contada e
          verificada. Hoje fica em ADQUIRIDA — a aula de verdade vem com um turno de verdade, não
          com esta simulação.
        </p>
      </>
    ),
  },

  // 10 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 3 concluído</div>
        <div className="eyebrow">Semana 3 de 10 · Capítulo 4 chegando</div>
        <h1>A sintonia</h1>
        <p className="lede">
          Você aprendeu a ler o que acontece dentro de uma criança. Na próxima semana você aprende
          por que, mesmo quando você lê certo, às vezes ela continua sem te dar atenção.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-BR" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-BR" />
        <h2>Seu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Autoconhecimento</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Reconhecimento do aluno</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">4 · Sintonia</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Instruções e congruência</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Verificar com a ação <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · O retorno</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Mudar de rumo</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situações difíceis</span>
            <span className="state">não adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomia</span>
            <span className="state">não adquirida</span>
          </div>
        </div>
      </>
    ),
  },
];
