import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução para o português brasileiro, não um capítulo independente: mesmos chapterId/chaves
// de resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-7.tsx) — só o
// texto visível muda.

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

const K_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "k1",
    prompt: "1. «Você entendeu?» é uma boa verificação?",
    options: [
      { value: "no", label: "Não — quase todo mundo diz sim independentemente do que aconteceu", correct: true },
      { value: "si", label: "Sim — se você perguntar com um tom firme, a criança responde com sinceridade", correct: false },
    ],
  },
  {
    key: "k2",
    prompt: "2. A sequência correta é:",
    options: [
      { value: "ascolta", label: "Eu comunico → a criança escuta, depois entende sozinha com o tempo", correct: false },
      { value: "fa", label: "Eu comunico → ela entende → ela faz", correct: true },
    ],
  },
  {
    key: "k3",
    prompt: "3. Uma criança diz «entendi» com segurança. Você deixa ela partir para o exercício inteiro?",
    options: [
      { value: "no", label: "Não — primeiro uma tentativa curta, observada", correct: true },
      { value: "si", label: "Sim — se ela diz com segurança, a tentativa curta é dispensável", correct: false },
    ],
  },
  {
    key: "k4",
    prompt: "4. Com uma criança de 4 anos, a verificação correta é perguntar se ela entendeu?",
    options: [
      { value: "si", label: "Sim — na idade dela basta perguntar com palavras simples", correct: false },
      { value: "no", label: "Não — uma pequena tarefa imediata: «me mostra agora»", correct: true },
    ],
  },
  {
    key: "k5",
    prompt: "5. A primeira tentativa observada não está claramente certa nem claramente errada. O que você faz?",
    options: [
      { value: "secondo", label: "Observa uma segunda tentativa, ou torna a primeira mais explícita", correct: true },
      { value: "chiedo", label: "Volta a perguntar «você entendeu?», já que ela já respondeu uma vez", correct: false },
    ],
  },
  {
    key: "k6",
    prompt: "6. Depois de dar uma correção, a verificação já está completa?",
    options: [
      { value: "si", label: "Sim, a própria correção basta, não precisa de mais nada", correct: false },
      { value: "no", label: "Não — a correção também precisa ser reverificada com a ação", correct: true },
    ],
  },
];

const M_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "m1",
    prompt: "1. «Você está distraído» descreve um momento ou rotula a pessoa?",
    options: [
      { value: "persona", label: "Rotula a pessoa", correct: true },
      { value: "momento", label: "Descreve só o comportamento daquele momento, não ele como pessoa", correct: false },
    ],
  },
  {
    key: "m2",
    prompt: "2. Uma criança engoliu água durante o exercício. O que aconteceu com ela?",
    options: [
      { value: "fallito", label: "Ela errou o exercício, e precisa ser corrigida na hora", correct: false },
      { value: "veloce", label: "Ela tentou ir mais rápido do que o corpo ainda aguentava", correct: true },
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
  { value: "persona", label: "«Você não presta atenção, precisa se esforçar mais»" },
  { value: "comportamento", label: "«Os braços abriram cedo demais, mantenha eles fechados um pouco mais»" },
];

const SIM2_OPTIONS: Option[] = [
  { value: "generico", label: "«Muito bem, bem melhor!» — só um elogio genérico" },
  { value: "entrambe", label: "Você nomeia tanto a melhora quanto o novo detalhe, ambos de forma específica" },
];

const T_QUESTIONS: { key: string; prompt: string; options: Option[] }[] = [
  {
    key: "t1",
    prompt: "1. «Você está distraído» e «agora você estava olhando a janela» são a mesma coisa?",
    options: [
      { value: "si", label: "Sim — são duas formas diferentes de dizer a mesma coisa", correct: false },
      { value: "no", label: "Não — a primeira rotula a pessoa, a segunda descreve um momento", correct: true },
    ],
  },
  {
    key: "t2",
    prompt: "2. «Muito bem» é um bom elogio?",
    options: [
      { value: "no", label: "É agradável mas não ensina nada", correct: true },
      { value: "si", label: "Sim — é curto mas a criança entende mesmo assim o que fez bem", correct: false },
    ],
  },
  {
    key: "t3",
    prompt: "3. Uma criança engoliu água durante o exercício. Isso é um fracasso?",
    options: [
      { value: "si", label: "Sim — engolir água durante o exercício quer dizer que ela não consegue", correct: false },
      { value: "no", label: "Não — é uma informação", correct: true },
    ],
  },
  {
    key: "t4",
    prompt: "4. Um elogio vago é esquecido, um específico...",
    options: [
      { value: "ripete", label: "Se repete — a criança sabe o que fez para merecê-lo", correct: true },
      { value: "uguale", label: "Também é esquecido, não faz diferença — a criança lembra do mesmo jeito", correct: false },
    ],
  },
  {
    key: "t5",
    prompt: "5. (do Capítulo 6) «Você entendeu?» é uma boa verificação?",
    options: [
      { value: "si", label: "Sim — se ela responde na hora, quer dizer que entendeu bem", correct: false },
      { value: "no", label: "Não — até quem não entendeu costuma responder que sim", correct: true },
    ],
  },
  {
    key: "t6",
    prompt: "6. O retorno vago faz mal à criança?",
    options: [
      { value: "vuoto", label: "Não faz mal, mas não ensina nada", correct: true },
      { value: "male", label: "Sim, sempre — uma criança que sempre ouve o mesmo comentário se desliga", correct: false },
    ],
  },
  {
    key: "t7",
    prompt: "7. Uma tentativa melhora um detalhe mas perde outro. O retorno certo é:",
    options: [
      { value: "uno", label: "Escolher só elogio, ou só correção, para manter mais simples", correct: false },
      { value: "entrambe", label: "Nomear as duas coisas, de forma específica", correct: true },
    ],
  },
  {
    key: "t8",
    prompt: "8. Com um adolescente, um elogio específico dito com tom de torcida («muito bem, campeão!») funciona como com uma criança pequena?",
    options: [
      { value: "no", label: "Não — nessa idade o tom importa tanto quanto o conteúdo: respeitoso, não de torcida", correct: true },
      { value: "si", label: "Sim, o entusiasmo funciona em qualquer idade", correct: false },
    ],
  },
  {
    key: "t9",
    prompt: "9. Se você dá uma correção e a criança melhora só em parte, basta um elogio genérico na próxima tentativa?",
    options: [
      { value: "si", label: "Sim, o importante é encorajar", correct: false },
      { value: "no", label: "Não — é preciso nomear também o novo detalhe que ainda precisa ser corrigido", correct: true },
    ],
  },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo7StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 7 · O RETORNO</div>
        <h1>O que eu digo depois que ela tentou?</h1>
        <p className="lede">
          O instrutor dá um retorno — positivo ou corretivo — descrevendo o comportamento
          observado, nunca rotulando a pessoa.
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
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada: um turno inteiro sem perguntar «você entendeu?» a ninguém. O que
          você observou no lugar disso, e o que descobriu?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 6 volta</h2>
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
        <h1>O que ela fez, não quem ela é</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Você viu a ação. Agora: o que você diz a ela — depois, quando deu certo, e quando não
          deu?
        </p>
        <p className="lede">
          «Você está distraído» fala dele como pessoa. «Agora você estava olhando a janela» fala
          só do que aconteceu naquele momento. Se você repetir a primeira frase com frequência,
          ela vira um rótulo que a criança carrega: no fim ela para de tentar provar o
          contrário, porque é mais fácil virar aquilo que você diz que ela é. A segunda frase, ao
          contrário, descreve um momento preciso, que já pode mudar na tentativa seguinte.
        </p>
        <p className="lede">
          <strong>Vale também para os elogios.</strong> «Você é bom» é agradável mas não ensina
          nada. «Você manteve as pernas retas por toda a piscina» diz exatamente o que repetir.
        </p>
        <div className="card quote">
          Uma criança que engoliu água durante o exercício não «errou»: ela tentou ir mais
          rápido do que o corpo ainda estava pronto para aguentar. Dito assim, o erro vira uma
          informação a usar — não uma culpa a pagar.
        </div>
        <p className="lede">
          Até um elogio genérico pode fazer tanto mal quanto uma crítica genérica. Parece
          inofensivo — ninguém se ofende com um «muito bem» — mas uma criança que só ouve
          elogios vagos, capítulo após capítulo, para de saber o que realmente a torna boa. O
          retorno vago não faz mal: simplesmente não ensina nada, e ainda assim é tempo gasto
          sem construir nada.
        </p>
        <p className="lede">
          <strong>E quando a tentativa está no meio do caminho</strong> — nem claramente boa nem
          claramente errada? Acontece mais do que parece: uma criança que melhora um detalhe mas
          perde outro. A tentação é escolher uma única mensagem — tudo elogio, ou tudo correção —
          mas nenhuma das duas é totalmente verdadeira. O retorno correto nomeia as duas coisas,
          sempre de forma específica: «você manteve os braços esticados, isso é novo e está
          ótimo — mas a cabeça desceu um pouco cedo demais, tente manter ela mais tempo em
          cima.»
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
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
        <h1>Um elogio vago é esquecido</h1>
        <div className="card scene">
          <div className="who">Uma criança de 9 anos, «mas você não presta atenção!»</div>
          <p>
            Ele continua virando a cabeça tarde demais. Na terceira vez, o instrutor diz «mas
            você não presta atenção!» — a criança se fecha, desacelera. Se ele tivesse dito
            «você virou a cabeça um instante depois do braço — tenta virar junto com o braço,
            não depois», a criança teria recebido uma informação precisa, sem um rótulo para se
            defender.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Uma criança de 11 anos, o mergulho perfeito</div>
          <p>
            Ela completa pela primeira vez um mergulho de partida correto. O instrutor, com
            pressa, diz «muito bem!» sem parar. A criança não saberia dizer o que fez de
            diferente — e na próxima partida volta ao movimento antigo. Parar três segundos —
            «você se esticou bem nos braços, foi isso que mudou tudo» — teria dito a ela o que
            repetir.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um garoto de 16 anos</div>
          <p>
            Ele acabou de melhorar o tempo em uma virada, depois de semanas atrás do grupo. No
            Capítulo 2 você já viu o erro a evitar: tratar um adolescente com um tom de criança
            pequena faz ele se sentir zoado. Por isso o instrutor não diz «muito bem, campeão!».
            Ele diz, com tom normal, quase técnico: «você empurrou com as pernas um instante
            antes do toque, foi aí que você ganhou o tempo.» O garoto balança a cabeça, não
            sorri de forma exagerada — mas na próxima vez repete o mesmo movimento de propósito.{" "}
            <strong>
              Específico funciona em qualquer idade — mas aos 16 anos o tom com que é específico
              importa tanto quanto o conteúdo: respeitoso, não de torcida.
            </strong>
          </p>
        </div>
        <p className="lede">
          <strong>Três cenas, a mesma regra: nunca um rótulo, nunca um elogio genérico —
          sempre o comportamento preciso, em qualquer idade.</strong>
        </p>
        <p className="prompt">
          Uma criança de 10 anos acabou de completar pela primeira vez um mergulho de partida
          correto, depois de semanas de tentativas. Escreva o retorno que você daria a ela —
          específico, sobre o comportamento.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura um retorno que
            nomeie exatamente o que aconteceu, não um elogio genérico. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>TOMMASO, 8 anos.</strong> Ele acabou de errar o mesmo exercício pela segunda
          vez seguida. O que você diz a ele?
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "persona" && (
          <div className="feedback retry">
            TOMMASO: <em>(baixa o olhar)</em> «...desculpa.» <em>(faz de novo, do mesmo jeito de
            antes)</em>
            <br />
            Ele se desculpou, mas não recebeu nenhuma informação sobre o que mudar.
          </div>
        )}
        {answers.sim === "comportamento" && (
          <div className="feedback ok">
            TOMMASO: «Ah, ok» <em>(tenta de novo, mudando algo)</em>
            <br />
            Ele recebeu uma instrução precisa, e a usa.
          </div>
        )}
        {answers.sim && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Tommaso tenta de novo: os braços ficam fechados por mais tempo, uma melhora real —
              mas agora é a cabeça que vira um instante cedo demais, um detalhe novo, nunca
              corrigido com ele antes.
            </p>
            <p className="prompt">Escreva o retorno que você dá a ele agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                TOMMASO sorri, mas na tentativa seguinte a cabeça continua virando cedo demais —
                ele não sabe que ainda há algo para ajustar.
              </div>
            )}
            {answers.sim2 === "entrambe" && (
              <div className="feedback ok">
                TOMMASO: «...ok, então os braços estão bem mas a cabeça não» <em>(tenta de novo,
                desta vez atento às duas coisas)</em>
              </div>
            )}
            <p className="lede" style={{ fontSize: ".85rem" }}>
              O retorno sobre uma tentativa no meio do caminho não é um elogio enfraquecido nem
              uma correção disfarçada de elogio: são duas informações verdadeiras, ditas ambas,
              de forma específica.
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>Até quando dá certo</h1>
        <p className="lede">
          Uma criança de 7 anos acabou de fazer, pela primeira vez, uma entrada na água sem se
          agarrar na borda. Você ainda não decidiu o que dizer a ela.
        </p>
        <p className="prompt">Escreva o elogio que você faria a ela, específico, não genérico.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: não é a cena já vista (que era
            sobre um erro, não sobre um sucesso) — é proposital. O sistema verifica se ele
            aplica a mesma regra da especificidade também quando o retorno é positivo, não só
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Sua vez na piscina</div>
        <h1>Só o comportamento, nunca a pessoa</h1>
        <p className="lede">
          Esta semana, todo retorno que você der — positivo ou corretivo — precisa nomear um
          comportamento preciso, nunca a pessoa. Nada de «muito bem» e nada de «você não presta
          atenção»: só o que aconteceu.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: prova cumulativa Capítulo 6 + Capítulo 7
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 6 + Capítulo 7</div>
        <h1>A prova</h1>
        {T_QUESTIONS.map((q) => (
          <div key={q.key}>
            <p className="prompt">{q.prompt}</p>
            <OptionGroup name={q.key} options={q.options} selected={answers[q.key]} onPick={(v, correct) => setResponse(q.key, v, correct)} />
          </div>
        ))}
        <p className="prompt">
          10. Um garoto de 14 anos erra o mesmo erro técnico pela quarta vez e começa a mostrar
          frustração. Escreva o retorno que você daria a ele.
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
          Exemplo de feedback gerado, em caso de erro na pergunta 1:
        </p>
        <div className="card quote">
          Você respondeu que são a mesma coisa. Releia as duas: uma diz quem ele é
          («distraído»), a outra diz o que aconteceu naquele momento («você estava olhando a
          janela»). A segunda pode ser corrigida no momento seguinte. A primeira, repetida, vira
          algo difícil de se livrar.
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
        t1: "no", t2: "no", t3: "no", t4: "ripete", t5: "no",
        t6: "vuoto", t7: "entrambe", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Três exemplos a mais, para treinar o olhar</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — descrever o comportamento, não rotular a pessoa, e
          dizer de forma específica.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de 8 anos, o alongamento perfeito</div>
          <p>
            Pela primeira vez ela mantém os braços bem esticados de costas. O instrutor diz só
            «Muito bem!» e passa para o próximo aluno. A criança sorri, mas na piscina seguinte
            volta à posição antiga.
          </p>
        </div>
        <p className="prompt">O que faltou, nesse elogio?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nada — o entusiasmo do «muito bem» já basta para motivá-la", correct: false },
            {
              value: "cosa",
              label: "Saber exatamente o que ela fez de diferente — sem saber isso, ela não pode repetir",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma criança de 10 anos, o mergulho no meio do caminho</div>
          <p>
            No mergulho de partida, pela primeira vez ela mantém os braços bem esticados — uma
            novidade. Mas tira os pés cedo demais, um defeito que ela já tem há semanas. O
            instrutor diz só «você precisa prestar mais atenção nos pés», ignorando a melhora.
          </p>
        </div>
        <p className="prompt">O que falta nesse retorno?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "urgente",
              label: "Está bem assim — a correção do defeito que restou é a coisa mais urgente",
              correct: false,
            },
            {
              value: "entrambe",
              label:
                "Falta nomear também o que melhorou — os braços esticados — não só o defeito que restou",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Um garoto de 15 anos, a braçada melhorada</div>
          <p>
            Depois de semanas, ele finalmente melhora a braçada. O instrutor, animado, na frente
            de todo o grupo, grita com tom de torcida: «Muito bem campeão, você empurrou super
            bem com as pernas!»
          </p>
        </div>
        <p className="prompt">
          O conteúdo é específico («você empurrou super bem com as pernas»). Isso basta para essa
          idade?
        </p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sim — se o conteúdo é específico, o tom não importa", correct: false },
            {
              value: "no",
              label:
                "Não — nessa idade o tom importa tanto quanto o conteúdo: melhor normal e respeitoso, não de torcida",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          O comportamento descrito de forma precisa sempre deixa algo para repetir. O rótulo —
          bom ou mau — não deixa nada para usar.
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
                <td style={{ padding: "6px 0" }}>O retorno escrito no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como você corrigiu o Tommaso no §8, nas duas tentativas</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 6</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
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
        <div className="eyebrow">Semana 7 de 10 · Capítulo 8 chegando</div>
        <h1>Mudar de rumo</h1>
        <p className="lede">
          Hoje você aprendeu a dar um bom retorno. Na semana que vem você aprende o que fazer
          quando, apesar de tudo, o que você diz mesmo assim não funciona.
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
          <div className="chip consolidata">
            <span className="name">6 · Verificar com a ação <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">7 · O retorno</span>
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
