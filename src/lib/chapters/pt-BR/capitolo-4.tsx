import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução em português brasileiro, não um capítulo independente: mesmos chapterId/chaves de
// resposta/values internos do capítulo italiano (src/lib/chapters/capitolo-4.tsx) — só o texto
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

const K1_OPTIONS: Option[] = [
  { value: "via", label: "O seu sinal, antes de se lançar", correct: true },
  { value: "coraggio", label: "Coragem — ele acha que não é corajoso o suficiente", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sim — olhar e entender são praticamente a mesma coisa", correct: false },
  {
    value: "no",
    label: "Não — olhar é ver que algo aconteceu, entender é decidir o que isso significa",
    correct: true,
  },
];
const K3_OPTIONS: Option[] = [
  { value: "no", label: "Não — às vezes ainda falta outra coisa, antes", correct: true },
  { value: "si", label: "Sim, com certeza — se a causa está certa, a criança se move na hora", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "si", label: "Sim, uma boa simulação já mostra que a competência foi adquirida", correct: false },
  { value: "no", label: "Não — sempre é necessária pelo menos uma aula de verdade na piscina", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Não, os sinais continuam sempre distintos", correct: false },
  {
    value: "si",
    label: "Sim — o sinal pode mudar enquanto você observa, se a espera se prolongar",
    correct: true,
  },
];
const K6_OPTIONS: Option[] = [
  {
    value: "misto",
    label: "Uma mistura entre esperar o sinal e a vergonha de um grupo novo",
    correct: true,
  },
  { value: "dimenticato", label: "Tinha esquecido como se faz o mergulho", correct: false },
];

const M1_OPTIONS: Option[] = [
  { value: "domanda", label: "Você faz uma pergunta direta para fazer ele falar", correct: false },
  { value: "silenzio", label: "Por um momento, você também fica parado e em silêncio", correct: true },
];
const M2_OPTIONS: Option[] = [
  {
    value: "tirare",
    label: "Puxar alguém pelo braço quando ele ainda não está te seguindo",
    correct: true,
  },
  { value: "esempio", label: "Dar o exemplo, assim ele segue quase na hora", correct: false },
];
const M3_OPTIONS: Option[] = [
  {
    value: "torni",
    label: "Você volta um passo atrás: encontra o ritmo dele de novo, antes de propor a direção outra vez",
    correct: true,
  },
  { value: "insisti", label: "Você insiste — até um instante atrás estava tudo bem", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "diretta", label: "«Noa, você quer entrar?»" },
  { value: "silenzio", label: "Você se senta perto dela em silêncio, espelhando sua imobilidade" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "minimizza", label: "«Ah, é só água, não precisa se preocupar»" },
  {
    value: "risolvi",
    label: "Você propõe uma touca, ou diz que ela pode manter a cabeça fora d'água hoje",
  },
];

const T1_OPTIONS: Option[] = [
  { value: "prima", label: "Antes", correct: true },
  { value: "dopo", label: "Depois", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "calma", label: "Dizer para ele se acalmar na hora", correct: false },
  { value: "asseconda", label: "Acompanhar por um momento a energia dele, depois guiá-la", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "no", label: "Não — funciona do mesmo jeito, ao contrário, com quem se agita", correct: true },
  {
    value: "si",
    label: "Sim — com quem se agita, basta acalmar, não acompanhar",
    correct: false,
  },
];
const T4_OPTIONS: Option[] = [
  { value: "capito", label: "Não entendeu", correct: false },
  { value: "paura", label: "Esteja com medo", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "no", label: "Não — serve para criar as condições para que ele te escute", correct: true },
  {
    value: "si",
    label: "Sim — é sobretudo uma questão de agradar a criança",
    correct: false,
  },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sim, se você estiver certo", correct: false },
  { value: "no", label: "Não — mesmo estando certo, geralmente não funciona", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "insisti", label: "Insistir, porque até um instante atrás estava funcionando", correct: false },
  {
    value: "torna",
    label: "Voltar um passo atrás e encontrar o ritmo dele de novo, antes de propor a direção outra vez",
    correct: true,
  },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "Não — a forma muda com a idade, mas a ordem continua a mesma", correct: true },
  { value: "si", label: "Sim, exatamente do mesmo jeito", correct: false },
];
const T9_OPTIONS: Option[] = [
  { value: "rassicurato", label: "Ela se sente tranquilizada de qualquer jeito", correct: false },
  { value: "richiude", label: "Ela se fecha de novo — não se sentiu levada a sério", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo4StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 4 · A SINTONIA</div>
        <h1>Por que ele deveria me dar ouvidos?</h1>
        <p className="lede">
          Diante de uma criança fechada ou silenciosa — ou diante de uma agitada e eufórica — o
          instrutor se coloca no ritmo dela por um momento antes de pedir qualquer coisa, em vez
          de pressioná-la ou calá-la na hora.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + reforço do Capítulo 3
  {
    day: "segunda-feira · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada pedi que, com a primeira criança que parasse ou hesitasse, você
          também parasse um segundo, e decidisse qual das quatro causas parecia mais provável.
          Como foi? A leitura estava certa?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 3 volta</h2>
        <p className="prompt">
          1. Uma criança para, procura você com os olhos, o corpo não está tenso. O que
          provavelmente está faltando para ela?
        </p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, c) => setResponse("k1", v, c)} />
        <p className="prompt">2. Olhar e entender são a mesma coisa?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, c) => setResponse("k2", v, c)} />
        <p className="prompt">
          3. Você entendeu bem a causa, mas a criança continua sem se mover. Isso quer dizer que
          você tinha lido errado?
        </p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, c) => setResponse("k3", v, c)} />
        <p className="prompt">4. Para a competência do Capítulo 3, uma boa simulação basta para EXCELENTE?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, c) => setResponse("k4", v, c)} />
        <p className="prompt">
          5. Uma criança que está só esperando o seu sinal pode, se você demorar demais, começar
          a mostrar sinais de medo de verdade?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, c) => setResponse("k5", v, c)} />
        <p className="prompt">
          6. No exemplo da Nadia, 12 anos, o que havia por trás da hesitação dela diante de um
          grupo diferente do normal?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, c) => setResponse("k6", v, c)} />
      </>
    ),
  },

  // 2 — terça-feira: explicação + verificação de fim de dia
  {
    day: "terça-feira · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Primeiro o ritmo dela, depois o seu</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Mesmo quando você lê a situação certo, às vezes a criança continua sem te dar ouvidos.
          Hoje você aprende por quê — e o que fazer, antes ainda de falar.
        </p>
        <p className="lede">
          <strong>A sintonia não é ser simpático.</strong> É criar, em poucos segundos, as
          condições para que uma criança esteja disposta a te escutar. Sem isso, até a instrução
          mais certa não surte efeito.
        </p>
        <p className="lede">
          <strong>Primeiro você se coloca no ritmo dela.</strong> Se está parada e em silêncio,
          por um instante você também fica parado e em silêncio. Se está agitada e eufórica, por
          um instante você acompanha a energia em vez de apagá-la com um «se acalma». Você não
          está imitando: está dizendo, com o corpo, «estou aqui com você, onde você está agora».
        </p>
        <p className="lede">
          <strong>Só depois você a guia.</strong> Assim que ela sentir que você está no passo
          dela, você pode propor um pequeno passo na direção que você quer.
        </p>
        <div className="card quote">
          Guiar antes de ter se colocado no ritmo dela é como puxar alguém pelo braço quando ele
          ainda não está te seguindo: você pode até estar certo, mas não funciona.
        </div>
        <p className="lede">
          Funciona com quem se fecha — e funciona do mesmo jeito, ao contrário, com quem se
          agita. O primeiro movimento é sempre o mesmo: ir até ela, não pedir que ela venha até
          você na hora.
        </p>
        <p className="lede">
          <strong>Uma última coisa, antes de seguir em frente.</strong> A sintonia não é um
          interruptor que, ligado uma vez, fica ligado o turno inteiro: pode se perder no meio do
          caminho, e aí precisa ser reconstruída, não forçada. Uma criança que te seguiu em dois
          exercícios pode, no terceiro, se fechar de novo — talvez esteja cansada, talvez o
          exercício novo a tenha desorientado. A tentação é insistir («vamos, estava tudo bem até
          agora há pouco»), mas é de novo o mesmo erro: você está tentando guiá-la enquanto ela,
          nesse momento, não está mais te seguindo. Volte um passo atrás: encontre o ritmo dela
          de novo, antes de propor a direção outra vez. Você não precisa recomeçar do zero: só
          precisa aplicar de novo a mesma regra de sempre.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. Uma criança está em silêncio e imóvel. O que você faz primeiro?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, c) => setResponse("m1", v, c)} />
        <p className="prompt">2. Guiar antes de ter se colocado no ritmo dela é como:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, c) => setResponse("m2", v, c)} />
        <p className="prompt">
          3. Uma criança que estava te seguindo bem se fecha na metade do turno, num exercício
          novo. O que você faz?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, c) => setResponse("m3", v, c)} />
      </>
    ),
  },

  // 3 — quarta-feira: cenas + reflexão + simulação com bifurcação
  {
    day: "quarta-feira",
    pct: 48,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "diretta" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback =
        answers.sim === "diretta" ? (
          <div className="feedback retry">
            NOA: <em>(silêncio, não se move)</em>
            <br />
            Uma pergunta direta pediu que ela seguisse um ritmo que ainda não era o dela.
          </div>
        ) : answers.sim === "silenzio" ? (
          <div className="feedback ok">
            NOA: <em>(depois de alguns segundos, desvia o olhar para você)</em> «...tenho medo do
            cabelo molhado.»
            <br />
            Se colocar no ritmo dela não a «destravou» como mágica: deu a ela o espaço para dizer
            o que realmente havia.
          </div>
        ) : null;

      const sim2Feedback =
        answers.sim2 === "minimizza" ? (
          <div className="feedback retry">
            NOA se fecha de novo, volta ao silêncio — ela tinha se arriscado a contar, e não foi
            levada a sério.
          </div>
        ) : answers.sim2 === "risolvi" ? (
          <div className="feedback ok">
            NOA: «...tá bem, eu tento assim.» <em>(se levanta, se aproxima da borda)</em>
            <br />
            Abrir a porta com a sintonia não basta se, assim que a criança diz o que realmente
            há, você a fecha de novo com uma resposta genérica. O segundo movimento conta tanto
            quanto o primeiro.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Quarta-feira</div>
          <h1>Uma criança fechada, uma agitada, uma adolescente distante</h1>
          <div className="card scene">
            <div className="who">Elia, 6 anos</div>
            <p>
              Primeiro dia com um grupo novo. Não responde, braços cruzados, olhar baixo. O
              instrutor se senta ao lado dele, em silêncio, por vinte segundos — a mesma
              imobilidade, o mesmo silêncio. Depois, devagar: «às vezes eu também não tenho
              vontade de falar.» Depois: «você quer só molhar os pés, por enquanto?» Elia não
              responde com palavras. Mas move os pés para dentro d&apos;água.
            </p>
            <p>
              Se o instrutor tivesse guiado na hora — «vamos, vai ser divertido!» — teria pedido
              que ele seguisse um ritmo que ainda não era o dele. Aqueles vinte segundos no ritmo
              dele não «convenceram» Elia com um argumento: só fizeram ele entender que podia
              ficar onde estava. E dali, um pequeno passo, ele deu sozinho.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Diego, 8 anos</div>
            <p>
              Chega na borda já a mil: pula, fala rapidíssimo. O instrutor, em vez de dizer «se
              acalma», por um tempo acompanha o ritmo dele: balança a cabeça rápido, faz uma
              pergunta curta e rápida como o ritmo dele. Só depois, aos poucos, ele diminui o
              ritmo da conversa — e Diego diminui junto, até estar pronto para a primeira
              instrução.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Bianca, 15 anos</div>
            <p>
              Chega com a cara fechada, responde aos cumprimentos com um aceno quase
              imperceptível, braços cruzados — não é fechada como Elia, é o distanciamento de
              adolescente que não tem vontade de estar ali hoje. O instrutor não senta ao lado
              dela em silêncio, aos 15 anos isso seria estranho: fala pouco com ela, no mesmo tom
              seco dela — «beleza, dia pesado?» Bianca responde com um «...meio que sim», mas já
              é alguma coisa: deixou que o instrutor a alcançasse, até onde ela estava disposta a
              se abrir — não mais que isso. Só nesse ponto chega o exercício, com um tom normal —
              sem entusiasmo falso, que não combinaria com o humor dela.
            </p>
          </div>
          <p className="lede">
            <strong>
              Uma criança fechada, uma agitada, uma adolescente distante — a forma muda, a ordem
              não: primeiro o ritmo dela, só depois o seu.
            </strong>
          </p>
          <p className="prompt">
            Uma criança de 8 anos chega na borda já superagitada, fala rápido, não fica parada um
            segundo. O que você faz — ou diz — nos primeiros trinta segundos, ANTES de dar
            qualquer instrução?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se ele está
              acompanhando a energia por um momento antes de diminuí-la — não se ele a apaga na
              hora com um «se acalma». */}
          <h2>Simulação</h2>
          <p className="lede">
            <strong>NOA, 7 anos.</strong> Na borda, silenciosa, não responde a perguntas diretas.
            O que você faz ou diz primeiro?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim === "silenzio" && (
            <div>
              <p className="lede" style={{ marginTop: 14 }}>
                A cena continua. Agora que a Noa disse qual é o problema de verdade, é sua vez de
                responder a <em>isso</em>.
              </p>
              <p className="prompt">Escreva o que você diz ou propõe a ela agora.</p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup
                name="sim2"
                options={SIM2_OPTIONS}
                selected={answers.sim2}
                onPick={(v) => setResponse("sim2", v)}
              />
              {sim2Feedback}
            </div>
          )}
        </>
      );
    },
  },

  // 4 — quarta-feira à noite: verificação de fim de dia (transferência)
  {
    day: "quarta-feira à noite",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Uma cena diferente da de ontem</h1>
        <p className="lede">
          Uma criança de 10 anos chega rindo alto, empurra um colega de brincadeira, não
          consegue ficar parada na fila. Não parece com raiva nem com medo: parece só cheia de
          energia.
        </p>
        <p className="prompt">
          Como você abre o contato com ela, ANTES de pedir que fique na fila e parada? Escreva
          seu raciocínio, não só a atitude.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se ele reconhece
            isso como um caso de «agitada/eufórica» — acompanhar por um momento a energia dela,
            não pedir que se acalme na hora. */}
      </>
    ),
  },

  // 5 — na piscina
  {
    day: "na piscina",
    pct: 68,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Seu turno na piscina</div>
        <h1>Um minuto no ritmo dela</h1>
        <p className="lede">
          Esta semana, com a criança mais fechada — ou mais agitada — do grupo: coloque-se no
          ritmo dela por um minuto antes de pedir qualquer coisa. Parado se ela está parada, em
          silêncio se ela está em silêncio; rápido se ela está rápida, agitado se ela está
          agitada. Só depois, proponha um passo pequeno.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa
  {
    day: "sexta-feira · 11 min",
    pct: 85,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 3 + Capítulo 4</div>
        <h1>A prova</h1>
        <p className="prompt">1. Se colocar no ritmo da criança vem antes ou depois de guiá-la?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, c) => setResponse("t1", v, c)} />
        <p className="prompt">2. Uma criança está eufórica e agitada. O primeiro movimento certo é:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, c) => setResponse("t2", v, c)} />
        <p className="prompt">3. Se colocar no ritmo da criança funciona só com quem se fecha?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, c) => setResponse("t3", v, c)} />
        <p className="prompt">
          4. <em>(do Capítulo 3)</em> Uma criança trava, ombros tensos, olhar fixo na água. É
          mais provável que:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, c) => setResponse("t4", v, c)} />
        <p className="prompt">5. A sintonia serve para ser simpático com a criança?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, c) => setResponse("t5", v, c)} />
        <p className="prompt">6. Guiar antes de ter se colocado no ritmo dela costuma funcionar?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, c) => setResponse("t6", v, c)} />
        <p className="prompt">
          7. Uma criança que estava te seguindo bem se fecha na metade do turno. A coisa certa a
          fazer é:
        </p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, c) => setResponse("t7", v, c)} />
        <p className="prompt">
          8. Com uma adolescente distante, a sintonia se constrói do mesmo jeito que com uma
          criança de 6 anos?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, c) => setResponse("t8", v, c)} />
        <p className="prompt">
          9. Uma criança revela qual é o medo dela de verdade, depois que você se colocou no
          ritmo dela. Se você responde de forma genérica ou minimiza, o que costuma acontecer?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, c) => setResponse("t9", v, c)} />
        <p className="prompt">
          10. Um garoto de 13 anos chega na borda em silêncio, sem cumprimentar ninguém. Escreva
          em duas linhas o que você faz nos primeiros dez segundos.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica como funciona a correção (§10, D34)
  {
    day: "sexta-feira · feedback",
    pct: 87,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Veja o que suas respostas dizem</h1>
        <p className="lede">Não sobre você — sobre o que você fez nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 2:
        </p>
        <div className="card quote">
          Você respondeu que acalmaria ela na hora. Mas um «se acalma» dito a quem já está
          agitado demais raramente funciona — porque você não a alcançou onde ela estava, só
          pediu que ela se movesse sozinha até você. Acompanhar primeiro, mesmo que só por poucos
          segundos, abre a porta que depois você mesmo pode fechar.
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
        t1: "prima", t2: "asseconda", t3: "no", t4: "paura", t5: "no",
        t6: "no", t7: "torna", t8: "no", t9: "richiude",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Mais três cenas, para treinar a ordem</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — primeiro o ritmo dela, só depois o seu.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 9 anos</div>
          <p>
            Primeiro dia com o grupo. Sentado na borda, pernas fora d&apos;água, braços cruzados,
            não responde a quem o cumprimenta.
          </p>
        </div>
        <p className="prompt">O que você faz primeiro?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "gioco", label: "Você propõe logo um jogo para quebrar o gelo", correct: false },
            {
              value: "silenzio",
              label: "Você se senta perto dele, em silêncio, por um momento, antes de propor qualquer coisa",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Greta, 7 anos</div>
          <p>
            Chega na borda pulando, conta o fim de semana em disparada sem terminar uma frase,
            não fica parada um segundo.
          </p>
        </div>
        <p className="prompt">O que você faz primeiro, antes de dar a primeira instrução?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "calma", label: "Você diz para ela se acalmar, assim pode começar o exercício", correct: false },
            {
              value: "asseconda",
              label: "Por um momento você acompanha o ritmo dela — balança a cabeça rápido, uma pergunta curta na mesma energia",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma criança que estava te seguindo bem</div>
          <p>
            Seguiu sem problemas os dois primeiros exercícios. No terceiro — novo, nunca feito
            antes — trava de novo, fechada como no começo do turno.
          </p>
        </div>
        <p className="prompt">O que você faz?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "insisti", label: "Você insiste — até um instante atrás ela estava te seguindo, então continua no mesmo caminho", correct: false },
            {
              value: "torna",
              label: "Você volta um passo atrás: encontra o ritmo dela de novo, antes de propor a direção outra vez",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Fechada, agitada, ou já em movimento e de novo parada — a forma muda, a ordem nunca:
          primeiro você se coloca no ritmo dela, só depois a guia.
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
                <td style={{ padding: "6px 0" }}>A resposta no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como você alcançou a Noa no §8, nas duas trocas</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 3</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Sintonia</td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
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
        <div className="done-badge">✓ Capítulo 4 concluído</div>
        <div className="eyebrow">Semana 4 de 10 · Capítulo 5 chegando</div>
        <h1>A mensagem e a instrução</h1>
        <p className="lede">
          Hoje você aprendeu a abrir a porta. Na semana que vem você aprende o que dizer, depois
          que ela está aberta — e por que as palavras, a voz e o corpo precisam dizer a mesma
          coisa.
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
          <div className="chip consolidata">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">4 · Sintonia</span>
            <span className="state">adquirida</span>
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
