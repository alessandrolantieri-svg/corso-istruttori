import type { ReactNode } from "react";
import { OptionGroup, type Option } from "@/components/OptionGroup";
import { VakBars } from "@/components/VakBars";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import { computeVak, VAK_NOUN_PT, VAK_ADJ_PT } from "@/lib/vak";
import type { Step, StepContext } from "@/lib/chapters/types";
import { computeVakProfile } from "@/lib/chapters/capitolo-1-actions";

// Tradução em português europeu, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-1.tsx) — só muda o
// texto visível. Os value das opções VAK ("mostra"/"dire"/"sentire") são sempre os mesmos em
// qualquer língua: são comparados por computeVak()/computeVakProfile(), não são texto para
// traduzir.

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

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

const Q1_OPTIONS: Option[] = [
  { value: "vede", label: "Volto a mostrar-lho" },
  { value: "dice", label: "Explico-lho outra vez por outras palavras" },
  { value: "sente", label: "Pego-lhe na mão e faço-o sentir" },
  { value: "boh", label: "Não sei, depende do momento" },
];

const V_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "v1",
    prompt: "1. Tens de explicar um movimento novo. O que fazes primeiro, por instinto?",
    options: [
      { value: "mostra", label: "Faço eu a demonstração, na água, antes de dizer seja o que for" },
      { value: "dire", label: "Explico por palavras, passo a passo" },
      { value: "sentire", label: "Pego-lhe no braço e faço-o sentir o movimento" },
    ],
  },
  {
    key: "v2",
    prompt: "2. Pensas numa aula que correu bem. Do que te lembras primeiro?",
    options: [
      { value: "mostra", label: "Como se via o aluno a mexer-se — a sua postura, o seu rasto na água" },
      { value: "dire", label: "As palavras que trocámos, o tom da conversa" },
      { value: "sentire", label: "Como me senti eu — a energia, a satisfação física daquele momento" },
    ],
  },
  {
    key: "v3",
    prompt: "3. Um colega pede-te conselho sobre um exercício. Como preferes explicar-lho?",
    options: [
      { value: "mostra", label: "Mostro-te, vem à água comigo" },
      { value: "dire", label: "Conto-te, sentemo-nos cinco minutos" },
      { value: "sentire", label: "Vamos fazê-lo juntos, percebes experimentando" },
    ],
  },
  {
    key: "v4",
    prompt: "4. Quando descreves um erro técnico a um colega, o que fazes mais vezes?",
    options: [
      { value: "mostra", label: "Desenho ou imito o movimento com as mãos" },
      { value: "dire", label: "Conto por palavras, com precisão" },
      { value: "sentire", label: "Refaço-o eu mesmo no ar, com o corpo todo" },
    ],
  },
  {
    key: "v5",
    prompt: "5. Um pai pergunta-te como vai o filho. O que fazes para responderes bem?",
    options: [
      { value: "mostra", label: "Mostro-lhe um vídeo, ou aponto-lho da margem da piscina da próxima vez" },
      { value: "dire", label: "Conto-lhe com palavras precisas o que mudou" },
      { value: "sentire", label: "Digo-lhe para entrar na água um instante com o filho, para o sentir ele mesmo" },
    ],
  },
  {
    key: "v6",
    prompt: "6. Tens de memorizar de cor uma sequência de passos técnicos para um exame. Como estudas melhor?",
    options: [
      { value: "mostra", label: "A ver vídeos ou imagens da sequência" },
      { value: "dire", label: "Repetindo-a em voz alta, por palavras minhas" },
      { value: "sentire", label: "Refazendo o gesto com o corpo, mesmo fora de água" },
    ],
  },
];

const DIARY_KEYS = ["q2", "q7", "q8a", "q8b"];

export const capitolo1StepsPtPT: Step[] = [
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
        <h1>A comunicação é o resultado que obténs</h1>
        <p className="lede">
          Não importa o que querias dizer. Importa o que chegou. Se uma criança não faz o que lhe
          pediste, a pergunta útil não é «porque não me ouve» — é «como posso dizer-lho de um modo
          que chegue».
        </p>
        <p className="lede">
          Tudo A CHAVE CERTA nasce desta única frase. O resto são os modos de a pôr em prática.
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
        <h1>Bem-vindo à CHAVE CERTA</h1>
        <p className="lede">
          Duas perguntas — não há uma resposta certa, servem só para reparares em algo sobre ti,
          ainda antes de leres uma única linha de teoria.
        </p>
        <p className="prompt">
          1. Quando uma criança não entende o que lhe pediste, qual é a primeira coisa que fazes,
          por instinto?
        </p>
        <OptionGroup name="q1" options={Q1_OPTIONS} selected={answers.q1} onPick={(v) => setResponse("q1", v)} />
        <p className="prompt">2. E quando é um adulto que não te entende? É o mesmo primeiro movimento, ou é diferente?</p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <p className="lede" style={{ marginTop: 14, fontStyle: "italic" }}>
          Guarda as duas — o teste de quarta-feira volta a isto também.
        </p>
      </>
    ),
  },

  // 2 — terça-feira explicação + controlo
  {
    day: "terça-feira · 13 min",
    pct: 22,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Conhecer como tu comunicas</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana aprendes uma coisa só, mas é aquela em que assenta tudo o resto: conhecer
          como tu comunicas, antes de te ocupares de como comunica a criança.
        </p>
        <p className="lede">
          O teu ciclo de trabalho começa sempre no mesmo ponto — não na criança, em ti:{" "}
          <strong>
            eu → reconheço a criança → observo → ponho-me em sintonia → comunico → faço-a agir.
          </strong>
        </p>
        <p className="lede">
          Cada um de nós tem um modo preferido de se fazer entender — quem mostra, quem explica
          por palavras, quem faz sentir o gesto. Nenhum está errado, mas se usares sempre e só um,
          no dia em que esse modo não funcionar não tens um plano B.
        </p>
        <p className="lede">
          <strong>Estes três modos também têm um nome técnico, que a partir de agora vais encontrar muitas vezes: VAK.</strong>{" "}
          A sigla vem do inglês — <em>Visual, Auditory, Kinesthetic</em> — em português Visual,
          Auditivo, Cinestésico (a sigla mantém-se igual): mostrar = visual, dizer = auditivo,
          fazer sentir = cinestésico. Vais quase sempre usar as palavras concretas, mas a partir de
          hoje, quando leres «teste VAK» ou «perfil VAK», sabes a que se refere.
        </p>
        <div className="card quote">
          O teste não te diz quem és. Mostra-te um hábito. Nunca vais encontrar escrito «és
          visual» — vais encontrar «o teu perfil mostra uma tendência para mostrar».
        </div>
        <p className="lede">
          <strong>Voltamos à segunda pergunta de segunda-feira</strong> — a do adulto. Para muitos
          instrutores, o primeiro movimento com um colega ou um pai é diferente do que têm com uma
          criança: talvez com uma criança mostres, e com um adulto expliques por palavras, por
          hábito social, não por escolha consciente. O teu perfil VAK não é só sobre crianças: é o
          mesmo automatismo que usas com qualquer pessoa. Se com os adultos evitas um canal que com
          as crianças usas muitas vezes — ou o contrário — significa uma coisa: esse hábito não
          depende só da piscina. É um automatismo teu, que levas contigo para todo o lado.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">1. O teste VAK diz-te quem és como instrutor?</p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "Não — mostra-te um hábito, não uma identidade", correct: true },
            { value: "si", label: "Sim, é uma fotografia definitiva", correct: false },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. Se usares sempre e só um canal, o que acontece?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "niente", label: "Nada, o importante é ser claro", correct: false },
            { value: "terzo", label: "No dia em que esse modo não funcionar, não tens um plano B", correct: true },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">3. O teu automatismo comunicativo diz respeito só ao modo como falas com as crianças na piscina?</p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sim, é específico do contexto da piscina", correct: false },
            { value: "no", label: "Não — é o mesmo automatismo que usas também com adultos, colegas, pais", correct: true },
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
          <div className="who">Um instrutor, uma criança de 8 anos, bruços</div>
          <p>
            A criança não consegue coordenar as pernas. O instrutor repete a demonstração três
            vezes. Nada muda. Tenta dizer-lho por palavras — «empurra como se estivesses a
            empurrar a água para trás». A criança tenta outra vez: um pouco melhor, mas ainda
            insegura. Depois o instrutor pega-lhe nos tornozelos fora de água e move-lhos ele,
            passivamente: <strong>fazer sentir</strong>. A criança repete-o, quase perfeito, à
            primeira tentativa.
          </p>
        </div>
        <p className="lede">
          Três tentativas, três canais — só a terceira funcionou por completo. O instrutor não
          tinha usado o método errado nas primeiras duas vezes: tinha apenas usado, um a seguir ao
          outro, os seus dois canais mais confortáveis.
        </p>
        <div className="card scene">
          <div className="who">O mesmo instrutor, nessa noite, com um colega novo</div>
          <p>
            Tem de lhe explicar como organizar o material à beira da piscina antes de um turno com
            os mais pequenos. Começa logo a falar — enumera, descreve, especifica cada detalhe em
            voz alta. O colega concorda com a cabeça, mas na primeira aula a sério esquece metade
            das coisas. É o mesmo automatismo de antes, mas ao contrário. Com a criança, o
            instrutor mostra ou faz sentir primeiro, e diz depois. Com o adulto vai direto ao
            «dizer» — um canal que na água usa pouco, mas que com as pessoas, fora de água, lhe sai
            natural. Só quando lhe mostra fisicamente onde vai cada coisa é que o colega se lembra
            mesmo.
          </p>
        </div>
        <p className="lede">
          A mesma pessoa, dois canais diferentes, consoante o contexto — não segundo uma escolha
          consciente. É exatamente o tipo de automatismo que o teste de hoje começa a mostrar.
        </p>
        <p className="prompt">
          Pensa na última vez que tiveste de explicar algo e não chegou logo. O que fizeste
          primeiro — mostraste, disseste, ou guiaste com as mãos? E o segundo movimento foi
          diferente do primeiro, ou foi o mesmo repetido com mais força?
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não há uma resposta certa. O sistema
            olha só para uma coisa: se o segundo movimento foi diferente do primeiro, ou foi o
            mesmo repetido com mais força. */}
      </>
    ),
  },

  // 4 — o teste VAK verdadeiro
  {
    day: "quarta-feira · o teste",
    pct: 50,
    nextLabel: "Ver o teu perfil ▸",
    showBack: true,
    canNext: (a) => !!a.v1 && !!a.v2 && !!a.v3 && !!a.v4 && !!a.v5 && !!a.v6,
    onLeave: computeVakProfile,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira — o teste</div>
        <h1>O teste VAK</h1>
        <p className="lede">
          Não há respostas certas ou erradas: cada pergunta pede o que farias — ou do que te
          lembras — primeiro.
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

  // 5 — quarta-feira: controlo de fim de dia sobre o resultado que acabou de sair
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
          <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — sobre o teu resultado</div>
          <h1>Olha para o perfil que acabaste de obter</h1>
          <VakBars vak={vak} locale="pt-PT" />
          <p className="prompt">
            Pensa num aluno que acompanhas há algum tempo: com ele, qual dos três canais usas
            menos — justamente o mais baixo no teu perfil?
          </p>
          <Field id="q8a" value={answers.q8a ?? ""} onChange={(v) => setReflection("q8a", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: não é uma pergunta com resposta
              certa ou errada: é a primeira vez que o perfil toca numa criança real, não só na
              teoria. O sistema regista se está a ligar o dado abstrato a uma pessoa real — é
              exatamente o passo que faz falta para o usar de verdade, e não o deixar num número. */}
          <p className="prompt">
            Mais um pequeno passo. Agora que nomeaste esse canal, escreve uma situação concreta —
            na próxima semana, com esse mesmo aluno — em que vais tentar usá-lo de propósito,
            mesmo que não te saia natural.
          </p>
          <Field id="q8b" value={answers.q8b ?? ""} onChange={(v) => setReflection("q8b", v)} />
          {/* Nota para a correção, não mostrada ao instrutor: o sistema não julga se consegue: só
              olha se a situação descrita é concreta (um momento preciso, um exercício preciso) e
              não genérica («vou tentar mais vezes»). Uma intenção genérica esquece-se ao primeiro
              imprevisto do turno — uma concreta fica. */}
        </>
      );
    },
  },

  // 6 — sexta-feira síntese (perfil verdadeiro)
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
          <div className="feedback ok">Exato — um hábito pode alargar-se. Uma etiqueta fica colada.</div>
        ) : answers.cv === "sbagliata" ? (
          <div className="feedback retry">Não é errado ser breve — é errado dizer que é quem és. Tenta outra vez.</div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Sexta-feira</div>
          <h1>O teu perfil</h1>
          <p className="lede">
            Eis como se lê, e como não se lê, o teu resultado — o verdadeiro, acabado de calcular a
            partir das tuas respostas.
          </p>
          <VakBars vak={vak} locale="pt-PT" />
          <div className="card quote">
            O teu perfil mostra uma tendência para <strong>{noun}</strong>. Não significa que não
            saibas usar os outros canais — significa que, sob pressão, é a primeira coisa em que
            pensas.
          </div>
          <p className="prompt">Que frase usarias para contar o teu resultado a um colega?</p>
          <OptionGroup
            name="cv"
            options={[
              { value: "giusta", label: `«O teu perfil mostra uma tendência para ${noun}» — descreve um hábito`, correct: true },
              { value: "sbagliata", label: `«És um instrutor ${adj}» — é mais curta`, correct: false },
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
    nextLabel: "Ir para o Painel ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="eyebrow">§11 · Resultado</div>
          <h1>O teu perfil cria-se, hoje</h1>
          <p className="lede">
            Daqui em diante, cada capítulo fecha com uma tabela como esta: quatro fotografias
            diferentes da mesma competência, não uma nota única — quanto sabes (do teste), quanto
            o sabes aplicar por escrito, como te sais numa cena simulada, quanto refletes sobre um
            turno real. Ficam escritos com o seu nome técnico, por transparência.
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
                  <td style={{ padding: "6px 0" }}>A tua resposta no §7 — mudaste de estratégia ou repetiste-a?</td>
                  <td style={{ textAlign: "right" }}>registado ✓</td>
                </tr>
                <tr>
                  <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                    VAK — perfil inicial
                  </td>
                  <td style={{ padding: "6px 0" }}>As respostas do teste §8</td>
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
          <h2><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</h2>
          <p className="lede">
            Esta semana não mudes nada. Conta só quantas vezes explicas a mesma coisa exatamente da
            mesma maneira, a crianças diferentes. O número que encontrares não é uma nota. É o
            ponto de partida.
          </p>
          <p className="lede" style={{ fontStyle: "italic" }}>
            Se não tiveres um turno esta semana: faz o mesmo exercício pensando na última semana de
            trabalho de que te lembras bem.
          </p>
        </>
      );
    },
  },

  // 8 — painel
  {
    day: "painel",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ answers }: StepContext) => {
      const vak = computeVak(answers as never);
      return (
        <>
          <div className="done-badge">✓ Capítulo 1 concluído</div>
          <div className="eyebrow">Semana 1 de 10 · Capítulo 2 a chegar</div>
          <h1>Quem tenho à minha frente</h1>
          <p className="lede">
            Hoje olhaste para ti mesmo. Na próxima semana aprendes a olhar para a criança que tens
            à tua frente.
          </p>
          <h2>O teu perfil VAK</h2>
          <VakBars vak={vak} locale="pt-PT" />
          <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="pt-PT" />
          <h2>O teu progresso</h2>
          <div className="chip-grid">
            <div className="chip in-sviluppo">
              <span className="name">1 · Consciência pessoal</span>
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
              <span className="name">7 · O regresso</span>
              <span className="state">não adquirida</span>
            </div>
            <div className="chip non-acquisita">
              <span className="name">8 · Mudar de caminho</span>
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
