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

const K_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "k1",
    prompt: "1. «Entendeste?» é uma boa verificação?",
    options: [
      { value: "no", label: "Não — quase todos dizem que sim, seja como for", correct: true },
      { value: "si", label: "Sim — se perguntares com um tom decidido, a criança responde com sinceridade", correct: false },
    ],
  },
  {
    key: "k2",
    prompt: "2. A sequência correta é:",
    options: [
      { value: "ascolta", label: "Comunico → a criança ouve, depois percebe sozinha com o tempo", correct: false },
      { value: "fa", label: "Comunico → compreende → faz", correct: true },
    ],
  },
  {
    key: "k3",
    prompt: "3. Uma criança diz «entendi» com segurança. Deixas que parta para o exercício completo?",
    options: [
      { value: "no", label: "Não — primeiro uma tentativa breve, observada", correct: true },
      { value: "si", label: "Sim — se o diz com segurança, a tentativa breve é dispensável", correct: false },
    ],
  },
  {
    key: "k4",
    prompt: "4. Com uma criança de 4 anos, a verificação correta é perguntar-lhe se entendeu?",
    options: [
      { value: "si", label: "Sim — a essa idade basta perguntar-lhe com palavras simples", correct: false },
      { value: "no", label: "Não — uma pequena tarefa imediata: «mostra-me agora»", correct: true },
    ],
  },
  {
    key: "k5",
    prompt: "5. A primeira tentativa observada não é claramente certa nem claramente errada. O que fazes?",
    options: [
      { value: "secondo", label: "Observas uma segunda tentativa, ou tornas a primeira mais explícita", correct: true },
      { value: "chiedo", label: "Voltas a perguntar «entendeste?», já que respondeu uma vez", correct: false },
    ],
  },
  {
    key: "k6",
    prompt: "6. Depois de dar uma correção, a verificação já está completa?",
    options: [
      { value: "si", label: "Sim, a própria correção já basta, não é preciso mais nada", correct: false },
      { value: "no", label: "Não — também a correção precisa de ser verificada com a ação", correct: true },
    ],
  },
];

const M_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "m1",
    prompt: "1. «Estás distraído» descreve um momento ou rotula a pessoa?",
    options: [
      { value: "persona", label: "Rotula a pessoa", correct: true },
      { value: "momento", label: "Descreve só o comportamento daquele momento, não ele como pessoa", correct: false },
    ],
  },
  {
    key: "m2",
    prompt: "2. Uma criança engoliu água durante o exercício. O que lhe aconteceu?",
    options: [
      { value: "fallito", label: "Errou o exercício, e precisa de correção imediata", correct: false },
      { value: "veloce", label: "Tentou ir mais depressa do que o corpo ainda aguentava", correct: true },
    ],
  },
  {
    key: "m3",
    prompt: "3. Uma tentativa melhora um detalhe mas perde outro. O retorno certo é:",
    options: [
      { value: "entrambe", label: "Nomear as duas coisas, de forma específica", correct: true },
      { value: "uno", label: "Escolher só elogio, ou só correção, para não confundir", correct: false },
    ],
  },
];

const SIM_OPTIONS: Option[] = [
  { value: "persona", label: "«Não estás atento, tens de te esforçar mais»" },
  { value: "comportamento", label: "«Os braços abriram-se cedo demais, mantém-nos fechados mais um pouco»" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "generico", label: "«Boa, muito melhor!» — só um elogio genérico" },
  { value: "entrambe", label: "Nomeias tanto a melhoria como o novo detalhe, ambos de forma específica" },
];

const T_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "t1",
    prompt: "1. «Estás distraído» e «agora estavas a olhar para a janela» são a mesma coisa?",
    options: [
      { value: "si", label: "Sim — são duas formas diferentes de dizer a mesma coisa", correct: false },
      { value: "no", label: "Não — a primeira rotula a pessoa, a segunda descreve um momento", correct: true },
    ],
  },
  {
    key: "t2",
    prompt: "2. «Bem feito» é um bom elogio?",
    options: [
      { value: "no", label: "É agradável mas não ensina nada", correct: true },
      { value: "si", label: "Sim — é breve mas a criança percebe na mesma o que fez bem", correct: false },
    ],
  },
  {
    key: "t3",
    prompt: "3. Uma criança engoliu água durante o exercício. É um fracasso?",
    options: [
      { value: "si", label: "Sim — engolir água durante o exercício quer dizer que não consegue", correct: false },
      { value: "no", label: "Não — é uma informação", correct: true },
    ],
  },
  {
    key: "t4",
    prompt: "4. Um elogio vago esquece-se, um específico...",
    options: [
      { value: "ripete", label: "Repete-se — a criança sabe o que fez para o merecer", correct: true },
      { value: "uguale", label: "Também, não faz diferença — a criança lembra-se na mesma", correct: false },
    ],
  },
  {
    key: "t5",
    prompt: "5. (do Capítulo 6) «Entendeste?» é uma boa verificação?",
    options: [
      { value: "si", label: "Sim — se responde logo, quer dizer que entendeu bem", correct: false },
      { value: "no", label: "Não — mesmo quem não entendeu responde muitas vezes que sim", correct: true },
    ],
  },
  {
    key: "t6",
    prompt: "6. O retorno vago faz mal à criança?",
    options: [
      { value: "vuoto", label: "Não faz mal, mas não ensina nada", correct: true },
      { value: "male", label: "Sim, sempre — uma criança que ouve sempre o mesmo comentário desliga-se", correct: false },
    ],
  },
  {
    key: "t7",
    prompt: "7. Uma tentativa melhora um detalhe mas perde outro. O retorno certo é:",
    options: [
      { value: "uno", label: "Escolher só elogio, ou só correção, para ficar mais simples", correct: false },
      { value: "entrambe", label: "Nomear as duas coisas, de forma específica", correct: true },
    ],
  },
  {
    key: "t8",
    prompt: "8. Com um adolescente, um elogio específico dito com tom de claque («muito bem, campeão!») funciona como com uma criança pequena?",
    options: [
      { value: "no", label: "Não — a essa idade o tom conta tanto como o conteúdo: respeitoso, não de claque", correct: true },
      { value: "si", label: "Sim, o entusiasmo funciona em qualquer idade", correct: false },
    ],
  },
  {
    key: "t9",
    prompt: "9. Se dás uma correção e a criança melhora só em parte, basta um elogio genérico na tentativa seguinte?",
    options: [
      { value: "si", label: "Sim, o importante é incentivar", correct: false },
      { value: "no", label: "Não — é preciso nomear também o novo detalhe ainda por corrigir", correct: true },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo7StepsPtPT: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 7 · O FEEDBACK</div>
        <h1>O que lhe digo depois de ele ter tentado?</h1>
        <p className="lede">
          O instrutor dá um retorno — positivo ou corretivo — descrevendo o
          comportamento observado, nunca rotulando a pessoa.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Capítulo 6
  {
    day: "segunda-feira · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada: um turno inteiro sem perguntar «entendeste?» a
          ninguém. O que olhaste no lugar disso, e o que descobriste?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 6 regressa</h2>
        {K_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 2 — terça-feira: descrever o comportamento, não rotular a pessoa
  {
    day: "terça-feira · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>O que fez, não quem é</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Viste a ação. Agora: o que lhe dizes — depois, quando correu bem, e
          quando não?
        </p>
        <p className="lede">
          «Estás distraído» fala dele como pessoa. «Agora estavas a olhar
          para a janela» fala só do que aconteceu naquele momento. Se
          repetires muitas vezes a primeira frase, torna-se uma etiqueta que
          a criança carrega consigo: no final deixa de tentar provar o
          contrário, porque é mais fácil tornar-se aquilo que lhe dizes que
          é. A segunda frase, pelo contrário, descreve um momento preciso,
          que pode mudar já na tentativa seguinte.
        </p>
        <p className="lede">
          <strong>Vale também para os elogios.</strong> «És bom» é agradável
          mas não ensina nada. «Mantiveste as pernas esticadas durante toda
          a piscina» diz-lhe exatamente o que repetir.
        </p>
        <div className="card quote">
          Uma criança que engoliu água durante o exercício não «errou»:
          tentou ir mais depressa do que o corpo ainda estava pronto para
          aguentar. Dito assim, o erro torna-se uma informação a usar — não
          uma culpa a pagar.
        </div>
        <p className="lede">
          Também um elogio genérico pode fazer tanto mal como uma crítica
          genérica. Parece inofensivo — ninguém se ofende com um «bem feito»
          — mas uma criança que só ouve elogios vagos, capítulo após
          capítulo, deixa de saber o que a torna realmente boa. O retorno
          vago não faz mal: simplesmente não ensina nada, e continua a ser
          tempo gasto sem construir nada.
        </p>
        <p className="lede">
          <strong>E quando a tentativa está a meio caminho</strong> — nem
          claramente conseguida nem claramente errada? Acontece mais vezes
          do que parece: uma criança que melhora um detalhe mas perde outro.
          A tentação é escolher só uma mensagem — tudo elogio, ou tudo
          correção — mas nenhuma das duas é totalmente verdadeira. O retorno
          correto nomeia as duas coisas, sempre de forma específica:
          «mantiveste os braços esticados, isso é novo e está ótimo — mas a
          cabeça baixou um pouco cedo demais, tenta mantê-la levantada mais
          um pouco.»
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        {M_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
      </>
    ),
  },

  // 3 — quarta-feira: cenas + aplicação + simulação Tommaso (duas tentativas)
  {
    day: "quarta-feira",
    pct: 46,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Um elogio vago esquece-se</h1>
        <div className="card scene">
          <div className="who">Um menino de 9 anos, «mas não estás atento!»</div>
          <p>
            Continua a virar a cabeça tarde demais. À terceira vez, o
            instrutor diz «mas não estás atento!» — o menino fecha-se,
            abranda. Se tivesse dito «viraste a cabeça um instante depois do
            braço — tenta virá-la junto com o braço, não depois», o menino
            teria tido uma informação precisa, sem etiqueta de que se
            defender.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um menino de 11 anos, o mergulho perfeito</div>
          <p>
            Completa pela primeira vez um mergulho de partida correto. O
            instrutor, a correr, diz «boa!» sem parar. O menino não saberia
            dizer o que fez de diferente — e no próximo mergulho volta ao
            movimento antigo. Parar três segundos — «esticaste-te bem nos
            braços, foi isso que mudou tudo» — ter-lhe-ia dito o que
            repetir.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um rapaz de 16 anos</div>
          <p>
            Acabou de melhorar o tempo numa viragem, depois de semanas atrás
            do grupo. No Capítulo 2 já viste o erro a evitar: tratar um
            adolescente com um tom de criança pequena faz com que se sinta a
            ser gozado. Por isso o instrutor não diz «muito bem, campeão!».
            Diz, com tom normal, quase técnico: «empurraste com as pernas um
            instante antes do toque, foi aí que ganhaste tempo.» O rapaz
            acena com a cabeça, não sorri de forma exagerada — mas na vez
            seguinte repete o mesmo movimento de propósito.{" "}
            <strong>
              Específico funciona em qualquer idade — mas aos 16 anos o tom
              com que é específico conta tanto como o conteúdo: respeitoso,
              não de claque.
            </strong>
          </p>
        </div>
        <p className="lede">
          <strong>Três cenas, a mesma regra: nunca uma etiqueta, nunca um
          elogio genérico — sempre o comportamento preciso, a qualquer
          idade.</strong>
        </p>
        <p className="prompt">
          Uma criança de 10 anos acabou de completar pela primeira vez um
          mergulho de partida correto, depois de semanas de tentativas.
          Escreve o retorno que lhe darias — específico, sobre o
          comportamento.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura
            um retorno que nomeie exatamente o que aconteceu, não um elogio
            genérico. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>TOMMASO, 8 anos.</strong> Acabou de errar o mesmo exercício
          pela segunda vez seguida. O que lhe dizes?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "persona" && (
          <div className="feedback retry">
            TOMMASO: <em>(baixa o olhar)</em> «...desculpa.» <em>(faz outra
            vez, da mesma forma que antes)</em>
            <br />
            Pediu desculpa, mas não recebeu nenhuma informação sobre o que
            mudar.
          </div>
        )}
        {answers.sim === "comportamento" && (
          <div className="feedback ok">
            TOMMASO: «Ah, ok» <em>(tenta de novo, mudando algo)</em>
            <br />
            Recebeu uma instrução precisa, e usa-a.
          </div>
        )}
        {answers.sim && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Tommaso tenta de novo: os braços ficam fechados durante mais
              tempo, uma melhoria real — mas agora é a cabeça que vira um
              instante cedo demais, um detalhe novo, nunca corrigido antes
              com ele.
            </p>
            <p className="prompt">Escreve o retorno que lhe dás agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                TOMMASO sorri, mas na tentativa seguinte a cabeça continua a
                virar cedo demais — não sabe que ainda há algo para ajustar.
              </div>
            )}
            {answers.sim2 === "entrambe" && (
              <div className="feedback ok">
                TOMMASO: «...ok, então os braços estão bem mas a cabeça não»{" "}
                <em>(tenta de novo, desta vez atento às duas coisas)</em>
              </div>
            )}
            <p className="lede" style={{ fontSize: ".85rem" }}>
              O retorno sobre uma tentativa a meio caminho não é um elogio
              enfraquecido nem uma correção disfarçada de elogio: são duas
              informações verdadeiras, ditas ambas, de forma específica.
            </p>
          </>
        )}
      </>
    ),
  },

  // 4 — quarta-feira à noite: transferência da regra ao retorno positivo
  {
    day: "quarta-feira à noite",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>Também quando corre bem</h1>
        <p className="lede">
          Uma menina de 7 anos acabou de fazer, pela primeira vez, uma
          entrada na água sem se agarrar à borda. Ainda não decidiste o que
          lhe dizer.
        </p>
        <p className="prompt">Escreve o elogio que lhe farias, específico, não genérico.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não é a cena já
            vista (que era sobre um erro, não sobre um sucesso) — é
            intencional. O sistema verifica se aplica a mesma regra da
            especificidade também quando o retorno é positivo, não só
            quando é corretivo. */}
      </>
    ),
  },

  // 5 — o turno na piscina
  {
    day: "na piscina",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Só o comportamento, nunca a pessoa</h1>
        <p className="lede">
          Esta semana, cada retorno que dás — positivo ou corretivo — tem de
          nomear um comportamento preciso, nunca a pessoa. Nada de «bem
          feito» nem de «não estás atento»: só o que aconteceu.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo Capítulo 6 + Capítulo 7
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 6 + Capítulo 7</div>
        <h1>O teste</h1>
        {T_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
        <p className="prompt">
          10. Um rapaz de 14 anos comete o mesmo erro técnico pela quarta vez
          e começa a mostrar frustração. Escreve o retorno que lhe darias.
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
          Exemplo de feedback gerado, em caso de erro na pergunta 1:
        </p>
        <div className="card quote">
          Respondeste que são a mesma coisa. Relê-as: uma diz quem ele é
          («distraído»), a outra diz o que aconteceu naquele momento
          («estavas a olhar para a janela»). A segunda pode corrigir-se logo
          a seguir. A primeira, repetida, torna-se algo difícil de largar.
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
        t1: "no", t2: "no", t3: "no", t4: "ripete", t5: "no",
        t6: "vuoto", t7: "entrambe", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais três exemplos, para treinar o olhar</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto
          mais delicado deste capítulo com mais alguns exemplos — descrever
          o comportamento, não rotular a pessoa, e dizê-lo de forma
          específica.
        </p>

        <div className="card scene">
          <div className="who">Um menino de 8 anos, o alongamento perfeito</div>
          <p>
            Pela primeira vez mantém os braços bem esticados de costas. O
            instrutor diz-lhe só «muito bem!» e passa para o próximo aluno.
            O menino sorri, mas no comprimento seguinte volta à posição
            antiga.
          </p>
        </div>
        <p className="prompt">O que faltou, neste elogio?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nada — o entusiasmo do «muito bem» basta para o motivar", correct: false },
            {
              value: "cosa",
              label: "Saber exatamente o que fez de diferente — sem o saber, não pode repeti-lo",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma menina de 10 anos, o mergulho a meio caminho</div>
          <p>
            No mergulho de partida, pela primeira vez mantém os braços bem
            esticados — uma novidade. Mas levanta os pés cedo demais, um
            defeito que já tem há semanas. O instrutor diz-lhe só «tens de
            ter mais cuidado com os pés», ignorando a melhoria.
          </p>
        </div>
        <p className="prompt">O que falta neste retorno?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "urgente",
              label: "Está bem assim — a correção do defeito que resta é o mais urgente",
              correct: false,
            },
            {
              value: "entrambe",
              label:
                "Falta nomear também o que melhorou — os braços esticados — não só o defeito que resta",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Um rapaz de 15 anos, a braçada melhorada</div>
          <p>
            Depois de semanas, melhora finalmente a braçada. O instrutor,
            entusiasmado, diante de todo o grupo, grita-lhe com tom de
            claque: «Muito bem campeão, empurraste lindamente com as
            pernas!»
          </p>
        </div>
        <p className="prompt">
          O conteúdo é específico («empurraste lindamente com as pernas»).
          Basta isto para estar bem a esta idade?
        </p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sim — se o conteúdo é específico, o tom não conta", correct: false },
            {
              value: "no",
              label:
                "Não — a esta idade o tom conta tanto como o conteúdo: melhor normal e respeitoso, não de claque",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          O comportamento descrito com precisão deixa sempre algo para
          repetir. A etiqueta — boa ou má — não deixa nada para usar.
        </p>
      </>
    ),
  },

  // 9 — resultado
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
                <td style={{ padding: "6px 0" }}>O retorno escrito no §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como corrigiste o Tommaso no §8, em ambas as tentativas</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 6</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Reforço e correção</td>
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
        <div className="done-badge">✓ Capítulo 7 concluído</div>
        <div className="eyebrow">Semana 7 de 10 · Capítulo 8 a caminho</div>
        <h1>Mudar de rumo</h1>
        <p className="lede">
          Hoje aprendeste a dar um bom retorno. Na próxima semana aprendes o
          que fazer quando, apesar de tudo, o que dizes continua sem
          funcionar.
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
          <div className="chip consolidata">
            <span className="name">6 · Verificar com a ação <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">7 · O feedback</span>
            <span className="state">adquirida</span>
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
