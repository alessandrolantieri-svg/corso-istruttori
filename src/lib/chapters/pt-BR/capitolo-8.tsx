import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução para o português brasileiro, não um capítulo independente: mesmos chapterId/chaves
// de resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-8.tsx) — só o
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

const K1: Option[] = [
  { value: "no", label: "Não — uma rotula a pessoa, a outra descreve o que aconteceu", correct: true },
  { value: "si", label: "Sim — é só outro jeito de dizer a mesma coisa", correct: false },
];
const K2: Option[] = [
  { value: "si", label: "Sim — quer dizer que ela ainda não tem a técnica certa", correct: false },
  { value: "no", label: "Não — é uma informação sobre o que ajustar, não uma nota sobre a criança", correct: true },
];
const K3: Option[] = [
  { value: "no", label: "Não — um retorno específico ensina o que repetir, um elogio genérico não", correct: true },
  { value: "si", label: "Sim — se motiva, mais cedo ou mais tarde ela entende sozinha o que fez bem", correct: false },
];
const K4: Option[] = [
  { value: "si", label: "Sim — um elogio vago é mais fácil de lembrar e reaplicar", correct: false },
  { value: "no", label: "Não — é o contrário: o específico é o que dá para repetir", correct: true },
];
const K5: Option[] = [
  { value: "entrambe", label: "Nomear as duas coisas, de forma específica", correct: true },
  { value: "uno", label: "Escolher só elogio, ou só correção", correct: false },
];
const K6: Option[] = [
  { value: "no", label: "Não — nessa idade o tom importa tanto quanto o conteúdo", correct: true },
  { value: "si", label: "Sim, o entusiasmo funciona em qualquer idade", correct: false },
];

const M1: Option[] = [
  { value: "si", label: "Sim — primeiro as palavras, depois o gesto, depois o contato", correct: false },
  { value: "no", label: "Não — depende da criança, não existe uma ordem válida para todos", correct: true },
];
const M2: Option[] = [
  { value: "no", label: "Não — quer dizer só que esse ainda não era o jeito certo", correct: true },
  { value: "si", label: "Sim — se um jeito simples não funciona, o problema está na criança", correct: false },
];
const M3: Option[] = [
  { value: "no", label: "Não — é o momento de parar e olhar o que mais existe (Capítulo 3)", correct: true },
  { value: "si", label: "Sim, é preciso insistir na comunicação", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "parole", label: "Você tenta de novo com uma explicação verbal, reformulada de outro jeito" },
  { value: "canale", label: "Você mostra o movimento a ela, ou guia com contato físico" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "stesso", label: "Você insiste no mesmo canal — com ela sempre funciona assim" },
  { value: "diverso", label: "Você tenta um canal ainda diferente, como se fosse um problema novo" },
];

const T1: Option[] = [
  { value: "lento", label: "Repetir mais devagar, pronunciando melhor as palavras", correct: false },
  { value: "diverso", label: "Usar logo um jeito diferente", correct: true },
];
const T2: Option[] = [
  { value: "tre", label: "Três jeitos diferentes", correct: true },
  { value: "uno", label: "Um jeito, bem preparado com antecedência", correct: false },
];
const T3: Option[] = [
  { value: "si", label: "Sim — se as palavras não bastam, o problema é que ela não consegue", correct: false },
  { value: "no", label: "Não — ainda não era o jeito certo, não é um limite da criança", correct: true },
];
const T4: Option[] = [
  { value: "no", label: "Não — depende de cada criança, não existe uma ordem igual para todos", correct: true },
  { value: "si", label: "Sim — primeiro as palavras, depois o gesto, por fim o contato", correct: false },
];
const T5: Option[] = [
  { value: "si", label: "Sim — dois jeitos diferentes de dizer a mesma coisa", correct: false },
  { value: "no", label: "Não — uma rotula a pessoa, a outra descreve o comportamento", correct: true },
];
const T6: Option[] = [
  { value: "no", label: "Não — funcionou para aquele movimento naquele momento: os outros dois continuam no repertório", correct: true },
  { value: "si", label: "Sim — uma vez entendido o canal dela, o repertório para ela está fechado", correct: false },
];
const T7: Option[] = [
  { value: "si", label: "Sim, é preciso insistir até encontrar o certo", correct: false },
  { value: "no", label: "Não — é o momento de parar e olhar o que mais existe", correct: true },
];
const T8: Option[] = [
  { value: "no", label: "Não — nessa idade precisa ser adaptado em algo respeitoso, mantendo o mesmo princípio", correct: true },
  { value: "si", label: "Sim, o canal importa mais que a forma com que você usa", correct: false },
];
const T9: Option[] = [
  { value: "si", label: "Sim, uma vez encontrado para uma criança continua sendo o certo", correct: false },
  { value: "no", label: "Não — cada exercício novo pode exigir um canal diferente", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo8StepsPtBR: Step[] = [
  // 0 — capa
  {
    day: "início",
    pct: 0,
    nextLabel: "Começar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 8 · MUDAR DE RUMO</div>
        <h1>Não funcionou. E agora?</h1>
        <p className="lede">
          Quando um jeito de explicar não funciona, o instrutor tenta logo outro — em vez de
          repetir o mesmo mais forte ou mais devagar.
        </p>
      </>
    ),
  },

  // 1 — segunda-feira: reflexão + consolidação Capítulo 7
  {
    day: "segunda-feira · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Segunda-feira</div>
        <h1>Como foi na piscina?</h1>
        <p className="lede">
          Na semana passada: todo retorno precisava nomear um comportamento, nunca a pessoa. Foi
          fácil ou você se pegou voltando aos velhos hábitos?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Reforço — o Capítulo 7 volta</h2>
        <p className="prompt">1. «Você está distraído» e «você estava olhando a janela» dizem a mesma coisa?</p>
        <OptionGroup name="k1" options={K1} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Uma criança engoliu água durante o exercício: isso é um fracasso?</p>
        <OptionGroup name="k2" options={K2} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. «Muito bem» ensina o que repetir?</p>
        <OptionGroup name="k3" options={K3} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Um elogio vago se repete mais facilmente que um específico?</p>
        <OptionGroup name="k4" options={K4} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Uma tentativa melhora um detalhe mas perde outro. O retorno certo é:
        </p>
        <OptionGroup name="k5" options={K5} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Com um adolescente, um elogio específico dito com tom de torcida funciona como com
          uma criança pequena?
        </p>
        <OptionGroup name="k6" options={K6} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — terça-feira: repertório dos três canais
  {
    day: "terça-feira · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Terça-feira</div>
        <h1>Se um jeito não funciona, você não repete — você muda</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Você deu um bom retorno, com a instrução certa, no momento certo — e ainda assim não
          funciona. E agora?
        </p>
        <p className="lede">
          O primeiro instinto, quando algo não funciona, é repetir — mais devagar, mais forte. É
          o erro mais comum da profissão: sob pressão, todos voltamos ao nosso jeito preferido.
        </p>
        <p className="lede">
          <strong>Construir um repertório</strong> significa ter, para cada coisa importante,
          pelo menos três jeitos diferentes de dizê-la: um que mostre, um que explique com
          palavras, um que faça sentir no corpo — os mesmos três canais do teste VAK, aplicados
          ao contrário.
        </p>
        <div className="card quote">
          Não existe uma ordem fixa. O repertório não diz qual você vai usar: só garante que,
          quando o primeiro não funciona, você já tem outros dois prontos.
        </div>
        <div className="card">
          <strong>O contato físico guiado tem uma regra a mais, antes do &quot;como&quot;: a
          permissão.</strong>
          <p>
            Antes de guiar os braços ou as pernas de uma criança, diga em voz alta, de um jeito
            que ela e quem está por perto possam ouvir — <em>&quot;vou segurar seu tornozelo,
            para você sentir o movimento&quot;</em>. Não comece pelo contato: comece pelo aviso.
          </p>
          <p>
            Guie só onde for tecnicamente necessário (mãos, braços, tornozelos, costas para a
            flutuação) — nunca o resto do corpo. Faça isso em um ponto visível, não isolado: na
            borda, na piscina aberta, onde um colega ou um responsável, se presente, possa ver o
            que você está fazendo.
          </p>
          <p>
            Se a criança se afastar, ficar tensa ou disser não — mesmo sem falar com palavras —
            aquele canal está fechado por aquele momento: volte a mostrar ou a explicar. Não
            insista para &quot;acostumá-la&quot;.
          </p>
          <p>
            Isso vale para qualquer faixa etária, e sua unidade pode ter seu próprio regulamento
            sobre esse ponto: nesse caso, é o regulamento da unidade que tem sempre a última
            palavra.
          </p>
        </div>
        <p className="lede">
          <strong>Você precisa de uma confiança básica para fazer isso:</strong> toda criança já
          tem dentro de si os recursos para conseguir — sua parte não é &quot;dar&quot; a
          capacidade a ela, é encontrar o jeito que faz ela aparecer. Se o primeiro jeito não
          funciona, não quer dizer que ela não consegue: quer dizer só que esse ainda não era o
          jeito certo.
        </p>
        <p className="lede">
          <strong>E se você já tentou os três canais, e nenhum funcionou?</strong> Nesse ponto o
          problema provavelmente já não é mais &quot;qual canal&quot;, mas outra coisa — talvez
          ela esteja com medo, talvez ainda não tenha entendido, talvez esteja com frio, talvez
          esteja só esperando seu sinal verde: as mesmas quatro causas do Capítulo 3. Nesse
          momento, insistir com uma quarta variação não ajuda: é como continuar batendo em uma
          porta quando você sabe que quem está dentro não pode responder agora. O repertório tem
          três jeitos, não infinitos — saber quando parar de vez faz parte da mesma competência.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia</h2>
        <p className="prompt">
          1. O repertório tem uma ordem fixa — sempre primeiro as palavras, depois o gesto,
          depois o contato?
        </p>
        <OptionGroup name="m1" options={M1} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">
          2. Se o primeiro jeito não funciona com uma criança, quer dizer que ela não consegue?
        </p>
        <OptionGroup name="m2" options={M2} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Você tentou os três canais, sem resultado. A coisa certa é inventar uma quarta
          variação?
        </p>
        <OptionGroup name="m3" options={M3} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — quarta-feira: três crianças, três canais + simulação Bianca (dois momentos)
  {
    day: "quarta-feira",
    pct: 46,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Quarta-feira</div>
        <h1>Três crianças, três canais vencedores diferentes</h1>
        <div className="card scene">
          <div className="who">Uma criança de 7 anos, o nado de peito</div>
          <p>
            Ele não consegue coordenar as pernas. O instrutor tenta com palavras três vezes.
            Nada muda. Ela muda de canal: faz ele sentir o movimento mexendo os tornozelos dele
            fora d&apos;água. A criança repete, quase certo, na primeira tentativa.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Sara, 10 anos</div>
          <p>
            Com outro instrutor, as palavras sempre tinham bastado — e isso a tinha convencido de
            que sempre bastariam. Com a virada ela continua errando. O instrutor tenta fazer ela
            sentir o movimento: ainda nada. Na terceira tentativa, mostra a ela o movimento
            inteiro, na água. É isso que a destrava.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um garoto de 15 anos</div>
          <p>
            Ele continua errando a entrada na água de um mergulho técnico, apesar da demonstração
            e da explicação com palavras. O terceiro canal — o contato físico, natural aos 7
            anos — aos 15 correria o risco de parecer fora de lugar. O instrutor adapta o canal à
            idade dele, sem mudar o princípio: mostra a ele um vídeo curto do próprio mergulho.
            Ao se ver, o garoto entende sozinho onde o movimento se quebra.
          </p>
        </div>
        <p className="lede">
          <strong>
            Três crianças, três canais vencedores diferentes — e em nenhum dos três casos o
            canal, ou a forma dele, era óbvio de antemão.
          </strong>
        </p>
        <p className="prompt">
          Você explicou com palavras, duas vezes, como manter o corpo esticado durante o
          deslize. A criança continua arqueando as costas. Escreva um jeito diferente — não com
          palavras — para fazer a mesma coisa chegar até ela.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura um canal
            diferente do que já foi tentado — não uma terceira explicação verbal reformulada. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>BIANCA, 9 anos.</strong> Ela já ouviu duas vezes a explicação com palavras de
          como mover os braços no nado de costas, e continua errando. O que você tenta agora —
          precisa ser diferente de &quot;com palavras&quot;.
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "parole" && (
          <div className="feedback retry">
            BIANCA: «...sim, ok» <em>(tenta de novo, mesmo erro de antes)</em>
          </div>
        )}
        {answers.sim === "canale" && (
          <div className="feedback ok">
            BIANCA: <em>(tenta o movimento seguindo o gesto que você mostrou)</em> «...ah,
            assim!»
            <br />
            Você não está se esforçando mais: só está usando um canal que antes não tinha
            tentado.
          </div>
        )}
        {!!answers.sim && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Outra semana. Bianca precisa aprender um exercício novo — a partida na água. Você
              tenta o mesmo canal que funcionou com ela da última vez. Desta vez não funciona:
              ela fica insegura, como com as palavras tempos atrás.
            </p>
            <p className="prompt">Escreva o que você faz agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "stesso" && (
              <div className="feedback retry">
                BIANCA continua errando — o canal que tinha funcionado uma vez não era uma
                descoberta definitiva, era só o certo para aquele movimento específico.
              </div>
            )}
            {answers.sim2 === "diverso" && (
              <div className="feedback ok">
                BIANCA: <em>(tenta o terceiro canal que restou)</em> «...ok, agora entendi.»
                <br />
                O repertório não se esgota na primeira descoberta: cada exercício novo pode
                exigir um canal diferente, até com a mesma criança.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — quarta-feira à noite: transferência
  {
    day: "quarta-feira à noite",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Verificação de fim de dia — transferência</div>
        <h1>O terceiro canal que resta</h1>
        <p className="lede">
          Você já tentou &quot;mostrar&quot; e &quot;fazer sentir&quot; com a mesma criança, sem
          resultado, em um movimento técnico nunca discutido até agora no curso.
        </p>
        <p className="prompt">O que você faz agora, e por que isso é coerente com o que você aprendeu hoje?</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se resta o
            terceiro canal ainda não tentado (&quot;dizer&quot;, com palavras) — não uma quarta
            variação do mesmo canal já descartado duas vezes. */}
      </>
    ),
  },

  // 5 — turno na piscina
  {
    day: "na piscina",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Sua vez na piscina</div>
        <h1>Três jeitos, prontos antes de entrar</h1>
        <p className="lede">
          Esta semana, prepare três jeitos diferentes de explicar a mesma coisa técnica antes de
          entrar na piscina. Se o primeiro não funcionar com uma criança, use logo outro — não
          repita o primeiro mais forte.
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
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — prova cumulativa: Capítulo 7 + Capítulo 8</div>
        <h1>A prova</h1>
        <p className="prompt">1. Se um jeito de explicar não funciona, a coisa certa é:</p>
        <OptionGroup name="t1" options={T1} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Um bom repertório tem, para cada coisa importante, pelo menos:</p>
        <OptionGroup name="t2" options={T2} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Se uma criança não consegue com a explicação com palavras, quer dizer que ela não consegue de jeito nenhum?</p>
        <OptionGroup name="t3" options={T3} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. O repertório tem uma ordem fixa, válida para toda criança?</p>
        <OptionGroup name="t4" options={T4} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(do Capítulo 7)</em> «Você está distraído» e «você estava olhando a janela» são a mesma coisa?
        </p>
        <OptionGroup name="t5" options={T5} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Um canal funcionou com uma criança em um exercício. Quer dizer que os outros dois, com ela, não servem mais?</p>
        <OptionGroup name="t6" options={T6} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">
          7. Você tentou os três canais com uma criança, sem resultado. A coisa certa é inventar
          uma quarta variação?
        </p>
        <OptionGroup name="t7" options={T7} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Com um adolescente, o contato físico guiado é sempre a forma certa do terceiro canal?</p>
        <OptionGroup name="t8" options={T8} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Um canal que funcionou em um exercício funciona automaticamente também no exercício
          seguinte?
        </p>
        <OptionGroup name="t9" options={T9} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Você já tentou dois jeitos diferentes com a mesma criança, e nenhum funcionou.
          Escreva em duas linhas o que você faz agora.
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
          Você respondeu que repetiria mais devagar. É o instinto mais natural, mas se um jeito
          não funcionou duas vezes, repeti-lo uma terceira raramente muda alguma coisa. O tempo
          que você gasta repetindo o mesmo jeito é tempo que poderia gastar tentando um diferente.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «você errou»: diz o que observar da próxima vez. O tom sempre
          fica sobre o comportamento observado, nunca sobre a pessoa — a mesma regra do Capítulo
          7.
        </p>
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
        t1: "diverso", t2: "tre", t3: "no", t4: "no", t5: "no",
        t6: "no", t7: "no", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque a prova encontrou alguma dificuldade</div>
        <h1>Três exemplos a mais, para reconhecer um canal de verdade diferente</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto mais delicado deste
          capítulo com mais alguns exemplos — o que realmente conta como &quot;outro jeito&quot;,
          e o que é só o mesmo caminho repetido.
        </p>

        <div className="card scene">
          <div className="who">Uma criança de 8 anos, o nado de peito</div>
          <p>
            Ele não consegue coordenar as pernas. O instrutor explica com palavras: «abre,
            empurra, fecha». Não funciona. Tenta de novo com palavras, desta vez mais devagar.
            Ainda nada. Tenta uma terceira vez, pronunciando cada sílaba.
          </p>
        </div>
        <p className="prompt">Ela tentou três jeitos diferentes?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sim — ela mudou o ritmo e o tom três vezes", correct: false },
            {
              value: "no",
              label: "Não — são três variações do mesmo canal (dizer), não três canais diferentes",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Uma criança de 9 anos, dois exercícios diferentes</div>
          <p>
            Na semana passada, fazer ela sentir o movimento com as mãos destravou o deslize.
            Esta semana ela precisa aprender a virada, um exercício nunca enfrentado antes. O
            instrutor, sem pensar, guia ela de novo com as mãos — &quot;afinal com ela funciona
            assim&quot;. Não funciona: ela fica insegura, como nas primeiras vezes.
          </p>
        </div>
        <p className="prompt">O que o instrutor errou, ainda antes de tentar?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "niente",
              label: "Nada — um canal que funcionou uma vez é a escolha certa também depois",
              correct: false,
            },
            {
              value: "nuovo",
              label:
                "Ele deu o canal como certo, em vez de tratar a virada como um problema novo",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Um garoto de 14 anos, o mergulho técnico</div>
          <p>
            Ele continua errando a entrada na água apesar de duas explicações com palavras. Na
            terceira tentativa, o instrutor fala com ele de novo — desta vez com termos técnicos
            mais precisos, &quot;o ângulo de entrada&quot;, &quot;a extensão do quadril&quot; —
            achando que mudou de abordagem.
          </p>
        </div>
        <p className="prompt">Ele realmente usou um canal novo?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "si",
              label: "Sim — uma linguagem mais técnica é um jeito diferente de explicar",
              correct: false,
            },
            {
              value: "no",
              label:
                "Não — ainda é \"dizer\", só com palavras mais difíceis: continua o mesmo canal já descartado duas vezes",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Mudar as palavras não é mudar de canal. O repertório só funciona se os três jeitos —
          mostrar, dizer, fazer sentir — continuarem realmente diferentes entre si, toda vez que
          forem necessários.
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
                <td style={{ padding: "6px 0" }}>O jeito alternativo escrito no §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como você mudou de caminho com a Bianca no §8, nas duas situações</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Repertório e adaptação</td>
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
        <div className="done-badge">✓ Capítulo 8 concluído</div>
        <div className="eyebrow">Semana 8 de 10 · Capítulo 9 chegando</div>
        <h1>Quando ela não topa</h1>
        <p className="lede">
          Até agora você aprendeu o que fazer quando uma criança não consegue. Na semana que vem
          você aprende a diferença — porque não é a mesma coisa — quando uma criança simplesmente
          não topa.
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
          <div className="chip consolidata">
            <span className="name">7 · O retorno</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">8 · Mudar de rumo</span>
            <span className="state">adquirida</span>
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
