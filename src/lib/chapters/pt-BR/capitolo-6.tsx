import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
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

const K1_OPTIONS: Option[] = [
  { value: "no", label: "Não — melhor dizer o que fazer: «olhe para o lado quando respirar»", correct: true },
  { value: "si", label: "Sim — de qualquer forma é clara, diz o que evitar", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sim — é um dado real, medido em um estudo famoso", correct: false },
  { value: "no", label: "Não, é um número fora de contexto", correct: true },
];
const K3_OPTIONS: Option[] = [
  { value: "corpo", label: "No corpo — é o sinal mais difícil de falsificar", correct: true },
  { value: "parole", label: "Nas palavras — são a mensagem explícita, logo a mais confiável", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "bersaglio", label: "Um alvo", correct: true },
  { value: "ostacolo", label: "Um obstáculo", correct: false },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Não — em uma emergência real, a clareza imediata importa mais", correct: true },
  { value: "si", label: "Sim, a regra vale sempre, mesmo em emergência", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "sincero", label: "Como um elogio sincero — as palavras certas bastam de qualquer jeito", correct: false },
  { value: "abitudine", label: "Como algo dito por hábito, não um reconhecimento de verdade", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "no", label: "Não — ela responde «sim» quase sempre, independentemente do que aconteceu", correct: true },
  { value: "si", label: "Sim — se você perguntar com calma, a criança responde com sinceridade", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Eu comunico → ela escuta → fim", correct: false },
  { value: "fa", label: "Eu comunico → ela entende → ela faz", correct: true },
];
const M3_OPTIONS: Option[] = [
  { value: "secondo", label: "Você observa uma segunda tentativa, ou torna a primeira mais explícita", correct: true },
  { value: "chiedo", label: "Você volta a perguntar «você entendeu?» — geralmente basta para tirar a dúvida", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "chiedo", label: "Você pergunta se ela entendeu" },
  { value: "tentativo", label: "Você pede uma primeira tentativa curta, ou que ela mostre parada na borda" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "riparte", label: "Você dá a correção e deixa ela partir de novo, sem observar a próxima tentativa" },
  { value: "osservi", label: "Você dá a correção e observa a próxima tentativa antes de deixar ela seguir em frente" },
];

const T1_OPTIONS: Option[] = [
  { value: "no", label: "Não — quase todo mundo responde «sim» independentemente do que aconteceu", correct: true },
  { value: "si", label: "Sim — se você perguntar com atenção, a resposta é confiável", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Eu comunico → a criança escuta → fim", correct: false },
  { value: "fa", label: "Eu comunico → ela entende → ela faz", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "osservi", label: "Você observa uma primeira tentativa curta", correct: true },
  { value: "parte", label: "Você deixa ela partir para o exercício completo", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "chiedo", label: "Perguntar se ela entendeu, com palavras simples", correct: false },
  { value: "compito", label: "Uma pequena tarefa imediata: «me mostra agora»", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "parole", label: "Nas palavras — são a mensagem explícita, logo a mais confiável", correct: false },
  { value: "corpo", label: "No corpo — é o sinal mais difícil de falsificar", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sim, o importante é tentar — o erro se ajeita ao longo do caminho", correct: false },
  { value: "no", label: "Não — o erro é descoberto mais tarde, quando custa mais caro corrigi-lo", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "no", label: "Não — sempre é preciso pelo menos uma aula real na piscina, contada e verificada", correct: true },
  { value: "si", label: "Sim, se as respostas estão corretas, o resto é só formalidade", correct: false },
];
const T8_OPTIONS: Option[] = [
  { value: "decidi", label: "Decidir de qualquer forma, uma informação parcial basta", correct: false },
  { value: "secondo", label: "Observar uma segunda tentativa, ou tornar a primeira mais explícita", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "si", label: "Sim, a própria correção já basta, não precisa de mais nenhuma verificação", correct: false },
  { value: "no", label: "Não — a correção também precisa ser reverificada com a ação", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo6StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 6 · FAZER AGIR, E VER SE CHEGOU <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>«Você entendeu?» não serve para nada. E então?</h1>
        <p className="lede">
          O instrutor verifica se uma mensagem chegou observando se a criança faz o que foi
          pedido — não perguntando se ela entendeu.
        </p>
        <div className="card warn">
          <strong>Padrão mais alto.</strong> Junto com o Capítulo 3, esta é uma das duas
          competências da escuta: aqui não basta ADQUIRIDA, é preciso chegar a{" "}
          <strong>EXCELENTE</strong> antes da prova final — e só a simulação nunca é suficiente:
          é sempre necessária pelo menos uma aula real na piscina.
        </div>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Capítulo 5
  {
    day: "segunda-feira · 8 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada: uma instrução em forma positiva, dita parando para olhar a criança.
          O que você notou na reação dela, em comparação com o normal?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 5 volta</h2>
        <p className="prompt">1. «Não afunde a cabeça» é uma boa instrução?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. As palavras representam 7% da comunicação — isso é verdade em geral?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Se as palavras e o corpo se contradizem, a criança acredita em...</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Uma instrução em forma positiva dá ao corpo um alvo ou um obstáculo?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Em uma emergência real, é errado dizer «pare!» em vez de reformular em forma
          positiva?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Um garoto de 14 anos recebe um elogio verdadeiro, mas dito com tom mecânico e corpo
          distraído. Como ele provavelmente vive isso?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — terça-feira: comunico → entende → faz
  {
    day: "terça-feira · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Eu comunico → ela entende → ela faz</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Você disse a coisa certa, do jeito certo. Mas será que ela realmente chegou? Hoje você
          aprende a descobrir isso sem perguntar.
        </p>
        <p className="lede">
          A sequência real não é «eu comunico → a criança escuta». <strong>A ação é a
          prova</strong>, não a escuta. E a pergunta mais usada para verificar — «você
          entendeu?» — é quase inútil: uma criança responde «sim» quase sempre, tenha ela
          entendido ou não.
        </p>
        <div className="card quote">
          A pergunta certa não se faz com palavras: se faz com os olhos. Você dá a instrução, e
          observa o que acontece — não se ela balança a cabeça, mas se o corpo começa a fazer o
          que você pediu.
        </div>
        <p className="lede">
          <strong>Uma exceção útil:</strong> com os menores (faixa de 3 a 5 anos) você pode
          transformar a verificação em uma pequena tarefa imediata — «me mostra como você faz a
          estrelinha» — em vez de perguntar se entenderam. É a mesma regra: você verifica com a
          ação, não com a palavra.
        </p>
        <p className="lede">
          <strong>E se a primeira tentativa observada não for clara?</strong> Às vezes o
          movimento que você vê não está nem claramente certo nem claramente errado — você só
          viu uma parte, sem o suficiente para ter certeza. A culpa não é do método: observe uma
          segunda tentativa, ou torne a primeira um pouco mais explícita («faça de novo, um
          pouco mais devagar») — não volte a perguntar «você entendeu?», e não adivinhe.
          Verificar com a ação não quer dizer que um único olhar sempre baste: quer dizer que
          quem decide é sempre o que você vê — mesmo que às vezes seja preciso olhar duas vezes
          antes de ter certeza.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. «Você entendeu?» é confiável porque a criança responde com sinceridade?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. A sequência correta é:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. A primeira tentativa observada não está claramente certa nem claramente errada. O
          que você faz?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — quarta-feira: cenas + aplicação + simulação Sara
  {
    day: "quarta-feira",
    pct: 46,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback: ReactNode =
        answers.sim === "chiedo" ? (
          <div className="feedback retry">
            SARA: «Sim, entendi!» <em>(parte para o deslize — os braços dobram na hora)</em>
            <br />
            Você descobre o erro depois, no meio do exercício.
          </div>
        ) : answers.sim === "tentativo" ? (
          <div className="feedback ok">
            SARA: <em>(tenta a posição na borda — os braços já estão dobrados)</em> «...assim?»
            <br />
            Você vê antes mesmo dela partir — e pode corrigir enquanto ainda custa pouco.
          </div>
        ) : null;

      const sim2Feedback: ReactNode =
        answers.sim2 === "riparte" ? (
          <div className="feedback retry">
            SARA parte de novo, e ninguém sabe se o erro realmente foi corrigido até ela estar de
            novo no meio da piscina — a correção, sozinha, ainda não é uma verificação.
          </div>
        ) : answers.sim2 === "osservi" ? (
          <div className="feedback ok">
            SARA tenta de novo: os braços ficam quase esticados. Agora você sabe com certeza —
            não porque ela disse, mas porque você viu.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Quarta-feira</div>
          <h1>Se olha o corpo, não se escuta a resposta</h1>
          <div className="card scene">
            <div className="who">Uma criança de 8 anos, «sim, entendi»</div>
            <p>
              Depois da explicação da respiração lateral, ela diz «sim, entendi» com segurança.
              O instrutor a deixa partir para a piscina inteira. No meio do caminho ela começa a
              engolir água, para, tosse. Se ele tivesse olhado a primeira braçada, teria visto
              que ela virava a cabeça tarde demais em relação ao braço — visível na hora, não no
              meio do caminho. O «sim» não era mentira: era só inútil como informação.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Emma, 4 anos</div>
            <p>
              O instrutor acabou de mostrar como fazer a estrelinha. Com ela não faz sentido
              perguntar «você entendeu?» — em vez disso ele diz: «me mostra você, agora, na
              borda.» Emma abre os braços e as pernas, imperfeita mas na direção certa — três
              segundos, não dez minutos.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Um garoto de 15 anos</div>
            <p>
              Ele diz «sim, entendi, relaxa» com um tom meio impaciente, depois da explicação de
              uma virada técnica — nessa idade «você entendeu?» pode soar quase como uma ofensa.
              O instrutor não repete a pergunta, e nem pede «me mostra» como fez com a Emma:
              propõe, de igual para igual, «vamos fazer uma passagem devagar na borda antes de
              você pular, só para garantir o timing.» Ao fazer devagar, o garoto hesita
              exatamente no ponto crítico. Ele não foi testado como uma criança: recebeu uma
              verificação disfarçada de ajuste técnico.
            </p>
          </div>
          <p className="lede">
            <strong>
              Mesma regra, três faixas etárias diferentes — só muda o jeito como o pedido é
              vestido para a idade.
            </strong>
          </p>
          <p className="prompt">
            Você acabou de dar uma instrução a uma criança de 9 anos. Ela balança a cabeça e diz
            «sim, entendi». O que você faz, antes de deixar ela partir para o exercício
            completo?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se ele propõe
              uma primeira tentativa curta para observar, em vez de confiar na palavra e deixar
              ela seguir em frente por inteiro. */}
          <h2>Simulação</h2>
          <p className="lede">
            <strong>SARA, 10 anos.</strong> Você acabou de explicar a ela como manter os braços
            esticados durante o deslize. O que você faz para verificar se a instrução chegou?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim && (
            <>
              <p className="lede" style={{ marginTop: 14 }}>
                Qualquer que tenha sido sua primeira escolha, agora você viu o erro: os braços da
                Sara estão dobrados. Você dá uma correção em forma positiva, com tom e corpo
                coerentes.
              </p>
              <p className="prompt">
                Escreva o que você faz logo depois de dar a correção — não só a correção em si.
              </p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {sim2Feedback}
            </>
          )}
        </>
      );
    },
  },

  // 4 — quarta-feira à noite: transferência faixa 3-5
  {
    day: "quarta-feira à noite",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Faixa de 3 a 5 anos, sem ter tentado nada ainda</h1>
        <p className="lede">
          Uma criança de 5 anos, faixa de 3 a 5, precisa aprender a soprar bolhas debaixo
          d&apos;água. Você ainda não tentou nada com ela.
        </p>
        <p className="prompt">
          Como você verifica se ela entendeu, respeitando sua faixa etária — sem perguntar
          «você entendeu?»
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
      </>
    ),
  },

  // 5 — turno na piscina
  {
    day: "na piscina",
    pct: 69,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Sua vez na piscina</div>
        <h1>Um turno inteiro, sem «você entendeu?»</h1>
        <p className="lede">
          Esta semana, durante um turno inteiro, não pergunte «você entendeu?» a ninguém. Dê a
          instrução e observe a ação. Só isso.
        </p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Se você não tiver um turno esta semana: uma simulação reforçada desbloqueia a
          passagem, mas não basta para levar esta competência a EXCELENTE. Para isso, mais cedo
          ou mais tarde, é preciso uma aula real na piscina.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa Capítulo 5 + Capítulo 6
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 5 + Capítulo 6</div>
        <h1>A prova</h1>
        <p className="prompt">1. «Você entendeu?» é uma boa pergunta de verificação?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. A sequência correta é:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Uma criança diz «entendi» com segurança. O que você faz?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Com uma criança de 4 anos, a verificação correta é:</p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(do Capítulo 5)</em> Quando as palavras e o corpo se contradizem, a criança
          acredita em:
        </p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Confiar no «sim» em vez de observar a ação é um erro neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Para esta competência, uma boa simulação basta para EXCELENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. A primeira tentativa observada não é clara. A coisa certa a fazer é:</p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">9. Depois de dar uma correção, a verificação já está completa?</p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Um garoto de 13 anos diz «ok, entendi, vamos» com um tom levemente irritado.
          Escreva em duas linhas o que você faz antes de deixar ele partir.
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
        <p className="lede">Não sobre você — sobre o que você fez nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 3:
        </p>
        <div className="card quote">
          Você respondeu que deixaria ela partir. Mas «entendi» dito com segurança não é uma
          garantia — é só uma palavra. A diferença entre descobrir um erro na borda ou descobri-lo
          no meio da piscina é uma tentativa curta observada antes, que custa poucos segundos.
        </div>
      </>
    ),
  },

  // 8 — recuperação: só se a prova de sexta-feira tiver muitos erros (§12, D25/D27)
  {
    day: "recuperação",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "no", t2: "fa", t3: "osservi", t4: "compito", t5: "corpo",
        t6: "no", t7: "no", t8: "secondo", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Três vezes em que confiar custou caro</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — confiar na palavra, ou confiar na correção que você
          acabou de dar, em vez de observar o que realmente acontece.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de 9 anos, cotovelos baixos no nado de costas</div>
          <p>
            O instrutor explica como manter os cotovelos altos, depois pergunta «você entendeu?».
            A criança responde «sim» com segurança. Ele a deixa partir para a piscina inteira — no
            meio do caminho, os cotovelos continuam tão baixos quanto antes: o erro só aparece
            agora, quando já custou meia piscina.
          </p>
        </div>
        <p className="prompt">O que o instrutor deveria ter feito antes de deixar ela partir?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nada — o «sim» foi dito com segurança, bastava confiar", correct: false },
            {
              value: "tentativo",
              label: "Pedir uma tentativa curta para observar, antes da piscina inteira",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma correção dada, e depois deixada de lado</div>
          <p>
            O instrutor corrige a posição da cabeça de um aluno — «mantenha um pouco mais
            baixa» — e vira logo para outra criança, sem observar a próxima tentativa. Três
            piscinas depois, a cabeça continua na mesma posição de antes: ninguém tinha
            percebido.
          </p>
        </div>
        <p className="prompt">A correção, sozinha, já era uma verificação?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sim — tê-la dito bem já é suficiente", correct: false },
            {
              value: "no",
              label: "Não — é preciso ver ela refazer pelo menos uma vez, senão fica só uma palavra dita",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">A mesma situação, desta vez bem conduzida</div>
          <p>
            Uma garota diz «entendi, relaxa» com tom seguro, antes de tentar uma virada de
            bandeirola nunca feita antes. Desta vez o instrutor pede que ela mostre devagar na
            borda antes — e vê na hora que ela erra o momento do giro, antes mesmo de mergulhar.
          </p>
        </div>
        <p className="prompt">Por que funcionou, desta vez?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "azione",
              label: "Porque ele observou a ação em vez de confiar na palavra",
              correct: true,
            },
            { value: "sincera", label: "Porque desta vez a garota falou a verdade", correct: false },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          O «sim» nunca é a prova. A prova é sempre o que o corpo faz — na primeira vez que você
          observa, e de novo, na vez seguinte.
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
        <h1>Seu perfil é atualizado</h1>
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
                <td style={{ padding: "6px 0" }}>Como você verificou a Sara no §8, incluindo a correção</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 5</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Orientação para a ação e verificação</td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Para esta competência específica: o status EXCELENTE não é ativado sem pelo menos uma
          aula real na piscina, contada e verificada. Hoje continua ADQUIRIDA.
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
        <div className="done-badge">✓ Capítulo 6 concluído</div>
        <div className="eyebrow">Semana 6 de 10 · Capítulo 7 chegando</div>
        <h1>O retorno</h1>
        <p className="lede">
          Hoje você aprendeu a ver se algo chegou. Na semana que vem você aprende o que dizer
          depois — quando deu certo, e quando não deu.
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
          <div className="chip consolidata">
            <span className="name">4 · Sintonia</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Instruções e congruência</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">6 · Verificar com a ação <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">adquirida</span>
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
