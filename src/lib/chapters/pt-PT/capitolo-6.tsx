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
      placeholder="Escreve aqui..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const K1_OPTIONS: Option[] = [
  { value: "no", label: "Não — é melhor dizer o que fazer: «olha para o lado quando respiras»", correct: true },
  { value: "si", label: "Sim — mesmo assim é clara, diz o que evitar", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sim — é um dado real, medido num estudo famoso", correct: false },
  { value: "no", label: "Não, é um número fora de contexto", correct: true },
];
const K3_OPTIONS: Option[] = [
  { value: "corpo", label: "No corpo — é o sinal mais difícil de fingir", correct: true },
  { value: "parole", label: "Nas palavras — são a mensagem explícita, por isso a mais fiável", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "bersaglio", label: "Um alvo", correct: true },
  { value: "ostacolo", label: "Um obstáculo", correct: false },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "Não — numa emergência real a clareza imediata importa mais", correct: true },
  { value: "si", label: "Sim, a regra vale sempre, mesmo numa emergência", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "sincero", label: "Como um elogio sincero — as palavras certas bastam de qualquer forma", correct: false },
  { value: "abitudine", label: "Como algo dito por hábito, não um reconhecimento verdadeiro", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "no", label: "Não — responde «sim» quase sempre, seja como for", correct: true },
  { value: "si", label: "Sim — se lhe perguntares com calma, a criança responde com sinceridade", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Comunico → ouve → fim", correct: false },
  { value: "fa", label: "Comunico → compreende → faz", correct: true },
];
const M3_OPTIONS: Option[] = [
  { value: "secondo", label: "Observas uma segunda tentativa, ou tornas a primeira mais explícita", correct: true },
  { value: "chiedo", label: "Voltas a perguntar «entendeste?» — normalmente basta para tirar a dúvida", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "chiedo", label: "Perguntas-lhe se entendeu" },
  { value: "tentativo", label: "Pedes-lhe uma primeira tentativa breve, ou que te mostre a postura parada na borda" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "riparte", label: "Dás a correção e deixas que continue, sem observar a tentativa seguinte" },
  { value: "osservi", label: "Dás a correção e observas a tentativa seguinte antes de a deixares continuar" },
];

const T1_OPTIONS: Option[] = [
  { value: "no", label: "Não — quase todos respondem que sim, seja como for", correct: true },
  { value: "si", label: "Sim — se perguntares com atenção, a resposta é fiável", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Comunico → a criança ouve → fim", correct: false },
  { value: "fa", label: "Comunico → compreende → faz", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "osservi", label: "Observas uma primeira tentativa breve", correct: true },
  { value: "parte", label: "Deixas que parta para o exercício completo", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "chiedo", label: "Perguntar-lhe se entendeu, com palavras simples", correct: false },
  { value: "compito", label: "Uma pequena tarefa imediata: «mostra-me agora»", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "parole", label: "Nas palavras — são a mensagem explícita, por isso a mais fiável", correct: false },
  { value: "corpo", label: "No corpo — é o sinal mais difícil de fingir", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sim, o importante é tentar — o erro corrige-se pelo caminho", correct: false },
  { value: "no", label: "Não — o erro descobre-se mais tarde, quando custa mais corrigi-lo", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "no", label: "Não — é sempre preciso pelo menos uma sessão real na piscina, contada e verificada", correct: true },
  { value: "si", label: "Sim, se as respostas estiverem certas, o resto é só formalidade", correct: false },
];
const T8_OPTIONS: Option[] = [
  { value: "decidi", label: "Decidir de qualquer forma, uma informação parcial basta", correct: false },
  { value: "secondo", label: "Observar uma segunda tentativa, ou tornar a primeira mais explícita", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "si", label: "Sim, a própria correção já basta, não é preciso mais nada", correct: false },
  { value: "no", label: "Não — também a correção precisa de ser verificada com a ação", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo6StepsPtPT: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 6 · FAZÊ-LA AGIR, E VER SE CHEGOU <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>«Entendeste?» não serve para nada. E então?</h1>
        <p className="lede">
          O instrutor verifica se uma mensagem chegou observando se a criança faz o que
          lhe foi pedido — não perguntando-lhe se entendeu.
        </p>
        <div className="card warn">
          <strong>Nível mais alto.</strong> Junto com o Capítulo 3, esta é uma das duas
          competências da escuta: aqui não basta ADQUIRIDA, é preciso chegar a{" "}
          <strong>EXCELENTE</strong> antes do exame final — e a simulação sozinha nunca
          basta: é sempre preciso pelo menos uma sessão real na piscina.
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
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada: uma instrução em positivo, dita parando para olhar para a
          criança. O que notaste na reação dela, em relação ao habitual?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 5 regressa</h2>
        <p className="prompt">1. «Não afundes a cabeça» é uma boa instrução?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. As palavras contam 7% da comunicação — é verdade em geral?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Se as palavras e o corpo se contradizem, a criança acredita em...</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Uma instrução em positivo dá ao corpo um alvo ou um obstáculo?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Numa emergência real, é errado dizer «para!» em vez de reformular em
          positivo?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Um rapaz de 14 anos recebe um elogio verdadeiro mas dito com tom mecânico e
          corpo distraído. Como é mais provável que o viva?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — terça-feira: comunico → compreende → faz
  {
    day: "terça-feira · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Comunico → compreende → faz</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Disseste a coisa certa, da forma certa. Mas será que chegou mesmo? Hoje
          aprendes a descobri-lo sem perguntar.
        </p>
        <p className="lede">
          A sequência verdadeira não é «comunico → a criança ouve». <strong>A ação é a
          prova</strong>, não o ouvir. E a pergunta mais usada para verificar —
          «entendeste?» — é quase inútil: uma criança responde «sim» quase sempre,
          quer tenha entendido quer não.
        </p>
        <div className="card quote">
          A pergunta certa não se faz com palavras: faz-se com os olhos. Dás a
          instrução, e olhas o que acontece — não se acena com a cabeça, mas se o corpo
          começa a fazer o que pediste.
        </div>
        <p className="lede">
          <strong>Uma exceção útil:</strong> com os mais pequenos (3-5 anos) podes
          transformar a verificação numa pequena tarefa imediata — «mostra-me como
          fazes a estrela» — em vez de perguntar se entenderam. Continua a ser a mesma
          regra: verificas com a ação, não com a palavra.
        </p>
        <p className="lede">
          <strong>E se a primeira tentativa observada não for clara?</strong> Às vezes
          o movimento que vês não é nem claramente certo nem claramente errado — só
          viste uma parte, não o suficiente para teres a certeza. Não é culpa do
          método: observa uma segunda tentativa, ou torna a primeira um pouco mais
          explícita («faz outra vez, um pouco mais devagar») — não voltes a perguntar
          «entendeste?», e não adivinhes. Verificar com a ação não significa que um só
          olhar chegue sempre: significa que quem decide é sempre o que vês — mesmo
          que às vezes seja preciso olhar duas vezes antes de teres a certeza.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. «Entendeste?» é fiável porque a criança responde com sinceridade?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. A sequência correta é:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. A primeira tentativa observada não é claramente certa nem claramente
          errada. O que fazes?
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
            SARA: «Sim, entendi!» <em>(parte para o deslize — os braços dobram-se logo)</em>
            <br />
            Descobres o erro depois, a meio do exercício.
          </div>
        ) : answers.sim === "tentativo" ? (
          <div className="feedback ok">
            SARA: <em>(experimenta a posição na borda — os braços já estão dobrados)</em> «...assim?»
            <br />
            Vês antes mesmo de ela partir — e podes corrigi-lo enquanto ainda custa pouco.
          </div>
        ) : null;

      const sim2Feedback: ReactNode =
        answers.sim2 === "riparte" ? (
          <div className="feedback retry">
            SARA parte de novo, e ninguém sabe se o erro se corrigiu mesmo até ela
            estar outra vez a meio da piscina — a correção, sozinha, ainda não é uma
            verificação.
          </div>
        ) : answers.sim2 === "osservi" ? (
          <div className="feedback ok">
            SARA tenta de novo: os braços ficam quase esticados. Agora sabes ao
            certo — não porque ela o disse, mas porque o viste.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Quarta-feira</div>
          <h1>Olha-se para o corpo, não se escuta a resposta</h1>
          <div className="card scene">
            <div className="who">Um menino de 8 anos, «sim, entendi»</div>
            <p>
              Depois da explicação da respiração lateral, diz «sim, entendi» com
              segurança. O instrutor deixa-o partir para o comprimento inteiro. A meio da
              piscina começa a engolir água, para, tosse. Se tivesse observado a primeira
              braçada, teria visto que virava a cabeça tarde demais em relação ao braço
              — visível logo ali, não a meio da piscina. O «sim» não era mentira: só era
              inútil como informação.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Emma, 4 anos</div>
            <p>
              O instrutor acabou de lhe mostrar como fazer a estrela. Com ela não faz
              sentido perguntar «entendeste?» — em vez disso diz-lhe: «mostra-me tu
              agora, na borda.» Emma abre os braços e as pernas, imperfeita mas na
              direção certa — três segundos, não dez minutos.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Um rapaz de 15 anos</div>
            <p>
              Diz «sim, entendi, tudo bem» com um tom um pouco impaciente, depois da
              explicação de uma viragem técnica — a essa idade, «entendeste?» pode
              parecer quase uma ofensa. O instrutor não lhe repete a pergunta, nem lhe
              pede «mostra-me» como fez com a Emma: propõe-lhe, de igual para igual,
              «vamos fazer uma passagem devagar na borda antes de te atirares, só para
              termos a certeza do tempo.» Ao fazê-lo devagar, o rapaz hesita exatamente
              no ponto crítico. Não foi posto à prova como uma criança: foi-lhe
              oferecida uma verificação disfarçada de afinação técnica.
            </p>
          </div>
          <p className="lede">
            <strong>
              Mesma regra, três idades diferentes — só muda a forma como o pedido é
              vestido consoante a idade.
            </strong>
          </p>
          <p className="prompt">
            Acabaste de dar uma instrução a uma criança de 9 anos. Ela acena com a
            cabeça e diz «sim, entendi». O que fazes, antes de a deixares partir para o
            exercício completo?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se propõe
              uma primeira tentativa breve para observar, em vez de confiar na palavra e
              deixá-lo seguir para o exercício completo. */}
          <h2>Simulação</h2>
          <p className="lede">
            <strong>SARA, 10 anos.</strong> Acabaste de lhe explicar como manter os
            braços esticados durante o deslize. O que fazes para verificar se a
            instrução chegou?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim && (
            <>
              <p className="lede" style={{ marginTop: 14 }}>
                Seja qual for a tua primeira escolha, agora viste o erro: os braços da
                Sara estão dobrados. Dás-lhe uma correção em positivo, com tom e corpo
                coerentes.
              </p>
              <p className="prompt">
                Escreve o que fazes logo a seguir a dar a correção — não só a correção
                em si.
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Faixa 3-5, sem teres experimentado nada ainda</h1>
        <p className="lede">
          Uma criança de 5 anos, na faixa 3-5, tem de aprender a soprar bolhas debaixo
          de água. Ainda não experimentaste nada com ela.
        </p>
        <p className="prompt">
          Como verificas se entendeu, respeitando a sua faixa etária — sem lhe
          perguntares «entendeste?»
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Um turno inteiro, sem «entendeste?»</h1>
        <p className="lede">
          Esta semana, durante um turno inteiro, não perguntes «entendeste?» a
          ninguém. Dá a instrução e olha para a ação. Só isso.
        </p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Se não tiveres turno esta semana: uma simulação reforçada desbloqueia a
          passagem, mas não basta para levar esta competência a EXCELENTE. Para isso,
          mais cedo ou mais tarde, é preciso uma sessão real na piscina.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo Capítulo 5 + Capítulo 6
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 5 + Capítulo 6</div>
        <h1>O teste</h1>
        <p className="prompt">1. «Entendeste?» é uma boa pergunta de verificação?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. A sequência correta é:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Uma criança diz «entendi» com segurança. O que fazes?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Com uma criança de 4 anos, a verificação correta é:</p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(do Capítulo 5)</em> Quando as palavras e o corpo se contradizem, a
          criança acredita em:
        </p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Acreditar no «sim» em vez de olhar para a ação é um erro neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Para esta competência, uma boa simulação basta para EXCELENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. A primeira tentativa observada não é clara. O correto é:</p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">9. Depois de dar uma correção, a verificação já está completa?</p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Um rapaz de 13 anos diz «ok, entendi, vamos lá» com um tom ligeiramente
          irritado. Escreve em duas linhas o que fazes antes de o deixares partir.
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
        <h1>Eis o que dizem as tuas respostas</h1>
        <p className="lede">Não sobre ti — sobre o que fizeste nestas perguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Exemplo de feedback gerado, em caso de erro na pergunta 3:
        </p>
        <div className="card quote">
          Respondeste que o deixarias partir. Mas «entendi» dito com segurança não é
          uma garantia — é só uma palavra. A diferença entre descobrir um erro na
          borda ou descobri-lo a meio da piscina é uma tentativa breve observada
          antes, que custa poucos segundos.
        </div>
      </>
    ),
  },

  // 8 — recuperação: só se o teste de sexta-feira teve muitos erros (§12, D25/D27)
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Três vezes em que confiar custou caro</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais
          delicado deste capítulo com mais alguns exemplos — confiar na palavra, ou
          confiar na correção que acabaste de dar, em vez de olhar o que acontece de
          verdade.
        </p>

        <div className="card scene">
          <div className="who">Um menino de 9 anos, cotovelos baixos nas costas</div>
          <p>
            O instrutor explica como manter os cotovelos altos, depois pergunta
            «entendeste?». O menino responde «sim» com segurança. Deixa-o partir para
            o comprimento inteiro — a meio, os cotovelos continuam tão baixos como
            antes: o erro só se vê agora, quando já custou meio comprimento.
          </p>
        </div>
        <p className="prompt">O que devia o instrutor ter feito antes de o deixar partir?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nada — o «sim» foi dito com segurança, bastava confiar", correct: false },
            {
              value: "tentativo",
              label: "Pedir-lhe uma tentativa breve para observar, antes do comprimento inteiro",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma correção dada, e depois deixada ali</div>
          <p>
            O instrutor corrige a posição da cabeça de um aluno — «mantém-na um pouco
            mais baixa» — e vira-se logo para outra criança, sem observar a tentativa
            seguinte. Três comprimentos depois, a cabeça continua na mesma posição de
            antes: ninguém tinha reparado.
          </p>
        </div>
        <p className="prompt">A correção, sozinha, já era uma verificação?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sim — tê-la dito bem já é suficiente", correct: false },
            {
              value: "no",
              label: "Não — é preciso vê-la repetida pelo menos uma vez, senão fica só numa palavra dita",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">A mesma situação, desta vez bem gerida</div>
          <p>
            Uma rapariga diz «entendi, tudo bem» com tom seguro, antes de tentar uma
            viragem de bandeirolas nunca feita. Desta vez o instrutor pede-lhe que lha
            mostre devagar na borda primeiro — e vê logo que erra o momento da
            viragem, ainda antes de se atirar.
          </p>
        </div>
        <p className="prompt">Porque resultou, desta vez?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "azione",
              label: "Porque olhou para a ação em vez de confiar na palavra",
              correct: true,
            },
            { value: "sincera", label: "Porque desta vez a rapariga disse a verdade", correct: false },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          O «sim» nunca é a prova. A prova é sempre o que o corpo faz — a primeira
          vez que olhas, e outra vez, na seguinte.
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
        <h1>O teu perfil atualiza-se</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Pontuação</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De onde vem</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>As 10 perguntas do teste</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>A resposta do §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como verificaste com a Sara no §8, correção incluída</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 5</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Guia da ação e verificação</td>
                <td style={{ padding: "6px 0" }}>O mais baixo dos anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Para esta competência específica: o estado EXCELENTE não é atribuído sem
          pelo menos uma sessão real na piscina, contada e verificada. Hoje mantém-se
          em ADQUIRIDA.
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
        <div className="eyebrow">Semana 6 de 10 · Capítulo 7 a caminho</div>
        <h1>O feedback</h1>
        <p className="lede">
          Hoje aprendeste a ver se algo chegou. Na próxima semana aprendes o que dizer
          a seguir — quando correu bem, e quando não.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="pt-PT" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-PT" />
        <h2>O teu progresso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Autoconhecimento pessoal</span>
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
            <span className="name">7 · O feedback</span>
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
