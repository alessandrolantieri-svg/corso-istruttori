import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { VakBars } from "@/components/VakBars";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import { computeVak, VAK_NOUN_PT, VAK_ADJ_PT } from "@/lib/vak";
import type { Step, StepContext } from "@/lib/chapters/types";
import { computeVakProfile } from "@/lib/chapters/capitolo-1-actions";

// Tradução em português brasileiro, não um capítulo independente: mesmos chapterId/chaves de
// resposta/values internos do capítulo italiano (src/lib/chapters/capitolo-1.tsx) — só o texto
// visível muda. Os value das opções VAK ("mostra"/"dire"/"sentire") continuam os mesmos em
// qualquer idioma: são comparados por computeVak()/computeVakProfile(), não são texto para
// traduzir.

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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

const Q1_OPTIONS: Option[] = [
  { value: "vede", label: "Mostro de novo para ela" },
  { value: "dice", label: "Explico de novo com outras palavras" },
  { value: "sente", label: "Pego a mão dela e faço ela sentir" },
  { value: "boh", label: "Não sei, depende do momento" },
];

const V_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "v1",
    prompt: "1. Você precisa explicar um movimento novo. O que você faz primeiro, por instinto?",
    options: [
      { value: "mostra", label: "Eu mesmo demonstro, na água, antes de dizer qualquer coisa" },
      { value: "dire", label: "Explico com palavras, passo a passo" },
      { value: "sentire", label: "Pego o braço dela e faço ela sentir o movimento" },
    ],
  },
  {
    key: "v2",
    prompt: "2. Você pensa numa aula que deu certo. O que você lembra primeiro?",
    options: [
      { value: "mostra", label: "Como o aluno parecia se mover — a postura dele, o rastro dele na água" },
      { value: "dire", label: "As palavras que trocamos, o tom da conversa" },
      { value: "sentire", label: "Como eu me senti — a energia, a satisfação física daquele momento" },
    ],
  },
  {
    key: "v3",
    prompt: "3. Um colega pede sua opinião sobre um exercício. Como você prefere explicar para ele?",
    options: [
      { value: "mostra", label: "Eu mostro para você, vem na água comigo" },
      { value: "dire", label: "Eu conto para você, vamos sentar cinco minutos" },
      { value: "sentire", label: "Vamos fazer juntos, você entende tentando" },
    ],
  },
  {
    key: "v4",
    prompt: "4. Quando você descreve um erro técnico para um colega, o que você faz com mais frequência?",
    options: [
      { value: "mostra", label: "Desenho ou faço mímica do movimento com as mãos" },
      { value: "dire", label: "Conto com palavras, com precisão" },
      { value: "sentire", label: "Refaço eu mesmo no ar, com o corpo inteiro" },
    ],
  },
  {
    key: "v5",
    prompt: "5. Um pai pergunta como está indo o filho dele. O que você faz para responder bem?",
    options: [
      { value: "mostra", label: "Mostro um vídeo, ou mostro para ele da borda da piscina na próxima vez" },
      { value: "dire", label: "Conto com palavras precisas o que mudou" },
      { value: "sentire", label: "Digo para ele entrar na água um instante com o filho, para sentir com o próprio corpo" },
    ],
  },
  {
    key: "v6",
    prompt: "6. Você precisa decorar uma sequência de passos técnicos para uma prova. Como você estuda melhor?",
    options: [
      { value: "mostra", label: "Assistindo vídeos ou olhando imagens da sequência" },
      { value: "dire", label: "Repetindo em voz alta, com minhas palavras" },
      { value: "sentire", label: "Refazendo o gesto com o corpo, mesmo fora da água" },
    ],
  },
];

const DIARY_KEYS = ["q2", "q7", "q8a", "q8b"];

export const capitolo1StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 1 · EU</div>
        <h1>A comunicação é o resultado que você obtém</h1>
        <p className="lede">
          Não importa o que você queria dizer. Importa o que chegou até a criança. Se uma criança
          não faz o que você pediu, a pergunta útil não é «por que ela não me escuta» — é «como
          posso dizer isso de um jeito que chegue até ela».
        </p>
        <p className="lede">
          Tudo em A CHAVE CERTA nasce dessa única frase. O resto são os jeitos de colocá-la em
          prática.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira §2
  {
    day: "segunda-feira · 7 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.q1,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Boas-vindas à CHAVE CERTA</h1>
        <p className="lede">
          Duas perguntas — não existe uma resposta certa, elas servem só para você notar algo
          sobre você mesmo, antes ainda de ler uma linha de teoria.
        </p>
        <p className="prompt">
          1. Quando uma criança não entende o que você pediu, qual é a primeira coisa que você
          faz, por instinto?
        </p>
        <OptionGroup name="q1" options={Q1_OPTIONS} selected={answers.q1} onPick={(v) => setResponse("q1", v)} />
        <p className="prompt">2. E quando é um adulto que não entende você? É o mesmo primeiro movimento, ou é diferente?</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <p className="lede" style={{ marginTop: 14, fontStyle: "italic" }}>
          Guarde as duas na cabeça — o teste que você faz na quarta-feira volta a isso também.
        </p>
      </>
    ),
  },

  // 2 — terça-feira explicação + verificação
  {
    day: "terça-feira · 13 min",
    pct: 22,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Conhecer como você se comunica</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana você aprende uma coisa só, mas é a que sustenta tudo o resto: conhecer como
          você se comunica, antes de se preocupar com como a criança se comunica.
        </p>
        <p className="lede">
          Seu ciclo de trabalho sempre começa no mesmo ponto — não na criança, em você:{" "}
          <strong>
            eu → reconheço a criança → observo → entro em sintonia → comunico → faço a criança
            agir.
          </strong>
        </p>
        <p className="lede">
          Cada um de nós tem um jeito preferido de se fazer entender — tem quem mostre, quem
          explique com palavras, quem faça sentir o gesto. Nenhum está errado, mas se você usa
          sempre só um, no dia em que esse jeito não funcionar você não vai ter um plano B.
        </p>
        <p className="lede">
          <strong>Esses três jeitos também têm um nome técnico, que você vai ver bastante daqui para a frente: VAK.</strong>{" "}
          A sigla vem do inglês — <em>Visual, Auditory, Kinesthetic</em> — em português Visual,
          Auditivo, Cinestésico (a sigla continua a mesma): mostrar = visual, dizer = auditivo,
          fazer sentir = cinestésico. Você vai usar quase sempre as palavras simples, mas a partir
          de hoje, quando ler «teste VAK» ou «perfil VAK», já sabe do que se trata.
        </p>
        <div className="card quote">
          O teste não diz quem você é. Ele mostra um hábito seu. Você nunca vai encontrar escrito
          «você é visual» — vai encontrar «seu perfil mostra uma tendência para o mostrar».
        </div>
        <p className="lede">
          <strong>Vamos voltar à segunda pergunta de segunda-feira</strong> — a sobre o adulto.
          Para muitos instrutores, o primeiro movimento com um colega ou um pai é diferente do que
          fazem com uma criança: talvez com uma criança você mostre, e com um adulto explique com
          palavras, por hábito social, não por escolha consciente. Seu perfil VAK não é só sobre
          crianças: é o mesmo automatismo que você usa com qualquer pessoa. Se com os adultos você
          evita um canal que usa bastante com as crianças — ou o contrário — isso quer dizer uma
          coisa: esse hábito não depende só da piscina. É um automatismo seu, que você carrega
          para todo lugar.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">1. O teste VAK diz quem você é como instrutor?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "Não — ele mostra um hábito, não uma identidade", correct: true },
            { value: "si", label: "Sim, é uma fotografia definitiva", correct: false },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Se você usa sempre só um canal, o que acontece?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "niente", label: "Nada, o importante é ser claro", correct: false },
            { value: "terzo", label: "No dia em que esse jeito não funcionar, você não tem um plano B", correct: true },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">3. Seu automatismo de comunicação vale só para o jeito como você fala com as crianças na piscina?</p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sim, é específico do contexto da piscina", correct: false },
            { value: "no", label: "Não — é o mesmo automatismo que você usa também com adultos, colegas, pais", correct: true },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
      </>
    ),
  },

  // 3 — quarta-feira exemplo + aplicação
  {
    day: "quarta-feira · parte 1",
    pct: 34,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Três tentativas, três canais</h1>
        <div className="card scene">
          <div className="who">Um instrutor, uma criança de 8 anos, o nado peito</div>
          <p>
            A criança não consegue coordenar as pernas. O instrutor refaz a demonstração três
            vezes. Nada muda. Ele tenta explicar com palavras — «empurra como se estivesse
            empurrando a água para trás». A criança tenta de novo: um pouco melhor, mas ainda
            insegura. Então o instrutor pega os tornozelos dela fora da água e os move ele mesmo,
            de forma passiva: <strong>fazer sentir</strong>. A criança repete o movimento, quase
            perfeito, na primeira tentativa.
          </p>
        </div>
        <p className="lede">
          Três tentativas, três canais — só o terceiro funcionou de verdade. O instrutor não tinha
          errado o método nas duas primeiras vezes: só tinha usado, um atrás do outro, seus dois
          canais mais confortáveis.
        </p>
        <div className="card scene">
          <div className="who">O mesmo instrutor, naquela noite, com um colega novo</div>
          <p>
            Precisa explicar para ele como organizar o material na borda da piscina antes de um
            turno com os pequenos. Começa a falar na hora — lista, descreve, especifica cada
            detalhe em voz alta. O colega concorda com a cabeça, mas na primeira aula de verdade
            esquece metade das coisas. É o mesmo automatismo de antes, só que invertido. Com a
            criança, o instrutor mostra ou faz sentir primeiro, e fala depois. Com o adulto, ele
            vai direto para o «dizer» — um canal que na água usa pouco, mas que com as pessoas,
            fora da água, sai natural para ele. Só quando mostra fisicamente onde cada coisa fica,
            o colega realmente lembra.
          </p>
        </div>
        <p className="lede">
          A mesma pessoa, dois canais diferentes, dependendo do contexto — não de uma escolha
          consciente. É exatamente o tipo de automatismo que o teste de hoje começa a mostrar.
        </p>
        <p className="prompt">
          Pense na última vez em que você teve que explicar algo e não deu certo na hora. O que
          você fez primeiro — mostrou, falou, ou guiou com as mãos? E o segundo movimento foi
          diferente do primeiro, ou foi o mesmo repetido com mais força?
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não há uma resposta certa. O sistema
            olha para uma coisa só: se o segundo movimento foi diferente do primeiro, ou foi o
            mesmo repetido com mais força. */}
      </>
    ),
  },

  // 4 — o teste VAK de verdade
  {
    day: "quarta-feira · o teste",
    pct: 50,
    nextLabel: "Veja seu perfil ▸",
    showBack: true,
    canNext: (a) => !!a.v1 && !!a.v2 && !!a.v3 && !!a.v4 && !!a.v5 && !!a.v6,
    onLeave: computeVakProfile,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira — o teste</div>
        <h1>O teste VAK</h1>
        <p className="lede">
          Não existem respostas certas ou erradas: cada pergunta pede o que você faria — ou o que
          você lembra — primeiro.
        </p>
        {V_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v) => setResponse(q.key, v)} />
          </div>
        ))}
        <p className="lede" style={{ fontStyle: "italic", fontSize: ".82rem" }}>
          Representativo — o conjunto completo das perguntas chega na fase técnica.
        </p>
      </>
    ),
  },

  // 5 — quarta-feira: verificação de fim de dia sobre o resultado recém-saído
  {
    day: "quarta-feira · sobre o resultado",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — sobre seu resultado</div>
          <h1>Olhe seu perfil que acabou de sair</h1>
          <VakBars vak={vak} locale="pt-BR" />
          <p className="prompt">
            Pense num aluno que você acompanha há um tempo: com ele, qual dos três canais você usa
            menos — justamente o mais baixo no seu perfil?
          </p>
          <Field id="q8a" value={answers.q8a ?? ""} onChange={(v) => setReflection("q8a", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: não é uma pergunta com resposta
              certa ou errada: é a primeira vez que o perfil toca numa criança de verdade, não só
              na teoria. O sistema registra se está ligando o dado abstrato a uma pessoa real — é
              exatamente o passo necessário para usá-lo de verdade, e não deixá-lo apenas um
              número. */}
          <p className="prompt">
            Um passo pequeno a mais. Agora que você deu nome a esse canal, escreva uma situação
            concreta — na próxima semana, com esse mesmo aluno — em que você vai tentar usá-lo de
            propósito, mesmo que não seja natural para você.
          </p>
          <Field id="q8b" value={answers.q8b ?? ""} onChange={(v) => setReflection("q8b", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: o sistema não julga se ele
              consegue: olha só se a situação descrita é concreta (um momento preciso, um
              exercício preciso) e não genérica («vou tentar mais vezes»). Uma intenção genérica
              se esquece no primeiro imprevisto do turno — uma concreta fica. */}
        </>
      );
    },
  },

  // 6 — sexta-feira síntese (perfil de verdade)
  {
    day: "sexta-feira · 7 min",
    pct: 78,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => a.cv === "giusta",
    render: ({ answers, setResponse }: StepContext) => {
      const vak = computeVak(answers as never);
      const noun = VAK_NOUN_PT[vak.prevalente];
      const adj = VAK_ADJ_PT[vak.prevalente];
      const cvFeedback: ReactNode =
        answers.cv === "giusta" ? (
          <div className="feedback ok">Isso mesmo — um hábito pode se ampliar. Uma etiqueta fica grudada.</div>
        ) : answers.cv === "sbagliata" ? (
          <div className="feedback retry">Não tem nada de errado em ser breve — o erro é dizer que é quem você é. Tente de novo.</div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Sexta-feira</div>
          <h1>Seu perfil</h1>
          <p className="lede">
            Veja aqui como se lê, e como não se lê, seu resultado — o de verdade, recém-calculado
            a partir das suas respostas.
          </p>
          <VakBars vak={vak} locale="pt-BR" />
          <div className="card quote">
            Seu perfil mostra uma tendência para o <strong>{noun}</strong>. Não significa que você
            não saiba usar os outros canais — significa que, sob pressão, é a primeira coisa em
            que você pensa.
          </div>
          <p className="prompt">Qual frase você usaria para contar seu resultado a um colega?</p>
          <OptionGroup
            name="cv"
            options={[
              { value: "giusta", label: `«Seu perfil mostra uma tendência para o ${noun}» — descreve um hábito`, correct: true },
              { value: "sbagliata", label: `«Você é um instrutor ${adj}» — é mais curta`, correct: false },
            ]}
            selected={answers.cv}
            onPick={(v, correct) => setResponse("cv", v, correct)}
          />
          {cvFeedback}
        </>
      );
    },
  },

  // 7 — resultado + turno na piscina
  {
    day: "sexta-feira · resultado",
    pct: 92,
    nextLabel: "Ir para o Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow">§11 · Resultado</div>
          <h1>Seu perfil nasce, hoje</h1>
          <p className="lede">
            A partir de agora, cada capítulo termina com uma tabela como esta: quatro fotografias
            diferentes da mesma competência, não uma nota única — quanto você sabe (do teste),
            quanto você sabe aplicar por escrito, como você se sai numa cena simulada, quanto você
            reflete sobre um turno de verdade. Ficam escritos com o nome técnico deles, por
            transparência.
          </p>
          <div className="card">
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Pontuação</th>
                  <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De onde nasce hoje</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    application_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Sua resposta no §7 — você mudou de estratégia ou repetiu a mesma?</td>
                  <td style={{ textAlign: "right" }}>registrado ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    VAK — perfil inicial
                  </td>
                  <td style={{ padding: "6px 0" }}>As respostas do teste no §8</td>
                  <td style={{ textAlign: "right" }}>{capitalize(VAK_NOUN_PT[vak.prevalente])} ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    reflection_score
                  </td>
                  <td style={{ padding: "6px 0" }}>Ainda não — ainda não há um turno na piscina para contar</td>
                  <td style={{ textAlign: "right", color: "var(--ink-soft)" }}>ainda não</td>
                </tr>
              </tbody>
            </table>
          </div>
          <h2><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Seu turno na piscina</h2>
          <p className="lede">
            Esta semana não mude nada. Só conte quantas vezes você explica a mesma coisa
            exatamente do mesmo jeito, para crianças diferentes. O número que você encontrar não é
            uma nota. É o ponto de partida.
          </p>
          <p className="lede" style={{ fontStyle: "italic" }}>
            Se você não tiver um turno esta semana: faça o mesmo exercício pensando na última
            semana de trabalho que você lembra bem.
          </p>
        </>
      );
    },
  },

  // 8 — dashboard
  {
    day: "dashboard",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="done-badge">✓ Capítulo 1 concluído</div>
          <div className="eyebrow">Semana 1 de 10 · Capítulo 2 chegando</div>
          <h1>Quem tenho na minha frente</h1>
          <p className="lede">
            Hoje você olhou para você mesmo. Na próxima semana você aprende a olhar para a criança
            que está na sua frente.
          </p>
          <h2>Seu perfil VAK</h2>
          <VakBars vak={vak} locale="pt-BR" />
          <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-BR" />
          <h2>Seu progresso</h2>
          <div className="chip-grid">
            <div className="chip in-sviluppo">
              <span className="name">1 · Autoconhecimento</span>
              <span className="state">em desenvolvimento</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">2 · Reconhecimento do aluno</span>
              <span className="state">não adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
              <span className="state">não adquirida</span>
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
      );
    },
  },
];
