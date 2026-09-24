import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Tradução portuguesa europeia, não um capítulo independente: mesmos chapterId/chaves de
// resposta/valores internos do capítulo italiano (src/lib/chapters/capitolo-8.tsx) — só o texto
// visível muda.

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

const K1: Option[] = [
  { value: "no", label: "Não — uma etiqueta a pessoa, a outra descreve o que aconteceu", correct: true },
  { value: "si", label: "Sim — é só outra forma de dizer a mesma coisa", correct: false },
];
const K2: Option[] = [
  { value: "si", label: "Sim — quer dizer que ainda não tem a técnica certa", correct: false },
  { value: "no", label: "Não — é uma informação sobre o que ajustar, não uma nota à criança", correct: true },
];
const K3: Option[] = [
  { value: "no", label: "Não — um retorno específico ensina o que repetir, um elogio genérico não", correct: true },
  { value: "si", label: "Sim — se a motiva, mais cedo ou mais tarde percebe sozinha o que fez bem", correct: false },
];
const K4: Option[] = [
  { value: "si", label: "Sim — um elogio vago é mais fácil de lembrar e de repetir", correct: false },
  { value: "no", label: "Não — é o contrário: o específico é o que se pode repetir", correct: true },
];
const K5: Option[] = [
  { value: "entrambe", label: "Nomear as duas coisas, de forma específica", correct: true },
  { value: "uno", label: "Escolher só elogio, ou só correção", correct: false },
];
const K6: Option[] = [
  { value: "no", label: "Não — a essa idade o tom conta tanto como o conteúdo", correct: true },
  { value: "si", label: "Sim, o entusiasmo funciona em qualquer idade", correct: false },
];

const M1: Option[] = [
  { value: "si", label: "Sim — primeiro as palavras, depois o gesto, depois o contacto", correct: false },
  { value: "no", label: "Não — depende da criança, não há uma ordem válida para todos", correct: true },
];
const M2: Option[] = [
  { value: "no", label: "Não — quer dizer só que aquela ainda não era a chave certa", correct: true },
  { value: "si", label: "Sim — se um modo simples não funciona, o problema está na criança", correct: false },
];
const M3: Option[] = [
  { value: "no", label: "Não — é o momento de parar e ver o que mais há (Capítulo 3)", correct: true },
  { value: "si", label: "Sim, é preciso insistir na comunicação", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "parole", label: "Tentas de novo com uma explicação verbal, reformulada de forma diferente" },
  { value: "canale", label: "Mostras-lhe o movimento, ou guias-a com um contacto físico" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "stesso", label: "Insistes no mesmo canal — com ela funciona sempre assim" },
  { value: "diverso", label: "Tentas um canal ainda diferente, como um problema novo" },
];

const T1: Option[] = [
  { value: "lento", label: "Repeti-lo mais devagar, articulando melhor as palavras", correct: false },
  { value: "diverso", label: "Usar logo um diferente", correct: true },
];
const T2: Option[] = [
  { value: "tre", label: "Três modos diferentes", correct: true },
  { value: "uno", label: "Um modo, bem preparado com antecedência", correct: false },
];
const T3: Option[] = [
  { value: "si", label: "Sim — se as palavras não bastam, o problema é que não consegue", correct: false },
  { value: "no", label: "Não — ainda não era a chave certa, não é um limite da criança", correct: true },
];
const T4: Option[] = [
  { value: "no", label: "Não — depende de cada criança, não há uma ordem igual para todos", correct: true },
  { value: "si", label: "Sim — primeiro as palavras, depois o gesto, por fim o contacto", correct: false },
];
const T5: Option[] = [
  { value: "si", label: "Sim — duas formas diferentes de dizer a mesma coisa", correct: false },
  { value: "no", label: "Não — uma etiqueta a pessoa, a outra descreve o comportamento", correct: true },
];
const T6: Option[] = [
  { value: "no", label: "Não — serviu para aquele movimento naquele momento: os outros dois continuam no repertório", correct: true },
  { value: "si", label: "Sim — depois de descoberto o seu canal, o repertório para ela está fechado", correct: false },
];
const T7: Option[] = [
  { value: "si", label: "Sim, é preciso insistir até encontrar o certo", correct: false },
  { value: "no", label: "Não — é o momento de parar e ver o que mais há", correct: true },
];
const T8: Option[] = [
  { value: "no", label: "Não — a essa idade tem de se adaptar em algo respeitoso, mantendo o mesmo princípio", correct: true },
  { value: "si", label: "Sim, o canal conta mais do que a forma com que o usas", correct: false },
];
const T9: Option[] = [
  { value: "si", label: "Sim, uma vez encontrado para uma criança continua a ser o certo", correct: false },
  { value: "no", label: "Não — cada exercício novo pode exigir um canal diferente", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo8StepsPtPT: Step[] = [
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
          Quando um modo de explicar não funciona, o instrutor experimenta
          logo outro — em vez de repetir o mesmo mais alto ou mais devagar.
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
        <h1>Como correu na piscina?</h1>
        <p className="lede">
          Na semana passada: cada retorno tinha de nomear um comportamento,
          nunca a pessoa. Foi fácil ou surpreendeste-te a voltar aos velhos
          hábitos?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidação — o Capítulo 7 regressa</h2>
        <p className="prompt">1. «Estás distraído» e «estavas a olhar para a janela» dizem a mesma coisa?</p>
        <OptionGroup name="k1" options={K1} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Uma criança engoliu água durante o exercício: é um fracasso?</p>
        <OptionGroup name="k2" options={K2} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. «Bem feito» ensina o que repetir?</p>
        <OptionGroup name="k3" options={K3} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Um elogio vago repete-se mais facilmente do que um específico?</p>
        <OptionGroup name="k4" options={K4} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Uma tentativa melhora um detalhe mas perde outro. O retorno
          certo é:
        </p>
        <OptionGroup name="k5" options={K5} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Com um adolescente, um elogio específico dito com tom de claque
          funciona como com uma criança pequena?
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
        <h1>Se um modo não funciona, não o repetes — mudas-o</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Deste um bom retorno, com a instrução certa, no momento certo — e
          continua sem funcionar. E agora?
        </p>
        <p className="lede">
          O primeiro instinto, quando algo não funciona, é repeti-lo — mais
          devagar, mais alto. É o erro mais comum da profissão: sob pressão
          voltamos todos ao nosso modo preferido.
        </p>
        <p className="lede">
          <strong>Construir um repertório</strong> significa ter, para cada
          coisa importante, pelo menos três modos diferentes de a dizer: um
          que mostre, um que explique por palavras, um que se faça sentir no
          corpo — os mesmos três canais do teste VAK, aplicados ao
          contrário.
        </p>
        <div className="card quote">
          Não existe uma ordem fixa. O repertório não te diz qual vais usar:
          garante só que, quando o primeiro não funciona, já tens outros
          dois prontos.
        </div>
        <div className="card">
          <strong>O contacto físico guiado tem uma regra a mais, antes do
          «como»: a permissão.</strong>
          <p>
            Antes de guiar os braços ou as pernas de uma criança, diz-o em
            voz alta, de forma a que ela e quem está por perto possam ouvir
            — <em>«vou segurar-te no tornozelo, para sentires o
            movimento»</em>. Não partas do contacto: parte do aviso.
          </p>
          <p>
            Guia só onde é tecnicamente necessário (mãos, braços,
            tornozelos, costas para a flutuação) — nunca o resto do corpo.
            Faz-lo num sítio visível, não isolado: na borda, em piscina
            aberta, onde um colega ou um pai ou mãe, se presente, possa ver
            o que estás a fazer.
          </p>
          <p>
            Se a criança se retrai, fica rígida ou diz que não — mesmo sem
            o dizer por palavras — esse canal está fechado para aquele
            momento: volta a mostrar ou a explicar. Não insistas para «a
            habituar».
          </p>
          <p>
            Isto vale para todas as faixas etárias, e a tua instalação pode
            ter um regulamento próprio sobre este ponto: nesse caso, é o
            regulamento da instalação que tem sempre a última palavra.
          </p>
        </div>
        <p className="lede">
          <strong>Precisas de uma confiança de base para o fazer:</strong>{" "}
          cada criança já tem dentro de si os recursos para conseguir — a
          tua parte não é «dar-lhe» a capacidade, é encontrar o modo que a
          faz sair. Se o primeiro modo não funciona, não quer dizer que ela
          não consiga: quer dizer só que aquela ainda não era a chave
          certa.
        </p>
        <p className="lede">
          <strong>E se já experimentaste os três canais, e nenhum
          funcionou?</strong> Nessa altura o problema provavelmente já não é
          «qual canal», mas outra coisa — talvez tenha medo, talvez ainda
          não tenha percebido, talvez tenha frio, talvez esteja só à espera
          do teu sinal verde: as mesmas quatro causas do Capítulo 3. Nesse
          momento, insistir com uma quarta variação não serve de nada: é
          como continuar a bater a uma porta quando sabes que quem está lá
          dentro não te pode responder agora. O repertório tem três modos,
          não infinitos — saber quando parar de todo faz parte da mesma
          competência.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia</h2>
        <p className="prompt">
          1. O repertório tem uma ordem fixa — sempre primeiro as palavras,
          depois o gesto, depois o contacto?
        </p>
        <OptionGroup name="m1" options={M1} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">
          2. Se o primeiro modo não funciona com uma criança, quer dizer que
          ela não consegue?
        </p>
        <OptionGroup name="m2" options={M2} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Experimentaste os três canais, sem resultado. A coisa certa é
          inventar uma quarta variação?
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
          <div className="who">Um menino de 7 anos, a bruços</div>
          <p>
            Não consegue coordenar as pernas. O instrutor tenta por palavras
            três vezes. Nada muda. Muda de canal: faz-lhe sentir o
            movimento mexendo-lhe nos tornozelos fora de água. O menino
            repete-o, quase certo, à primeira tentativa.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Sara, 10 anos</div>
          <p>
            Com outro instrutor, as palavras tinham sempre bastado — e isso
            tinha-a convencido de que bastariam sempre. Com a viragem
            continua a errar. O instrutor tenta fazer-lhe sentir o
            movimento: ainda nada. À terceira tentativa, mostra-lhe o
            movimento inteiro, na água. É isso que a desbloqueia.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Um rapaz de 15 anos</div>
          <p>
            Continua a errar a entrada na água de um mergulho técnico,
            apesar da demonstração e da explicação por palavras. O terceiro
            canal — o contacto físico, natural aos 7 anos — aos 15
            arriscava-se a parecer deslocado. O instrutor adapta o canal à
            sua idade, sem mudar o princípio: mostra-lhe um pequeno vídeo do
            seu próprio mergulho. Ao ver-se, o rapaz percebe sozinho onde o
            movimento se quebra.
          </p>
        </div>
        <p className="lede">
          <strong>
            Três crianças, três canais vencedores diferentes — e em nenhum
            dos três casos o canal, ou a sua forma, era óbvio de antemão.
          </strong>
        </p>
        <p className="prompt">
          Explicaste por palavras, duas vezes, como manter o corpo esticado
          durante o deslize. A criança continua a arquear as costas.
          Escreve um modo diferente — não por palavras — para lhe fazer
          chegar a mesma coisa.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura
            um canal diferente do já experimentado — não uma terceira
            explicação verbal reformulada. */}
        <h2>Simulação</h2>
        <p className="lede">
          <strong>BIANCA, 9 anos.</strong> Já ouviu duas vezes a explicação
          por palavras de como mover os braços em costas, e continua a
          errar. O que experimentas agora — tem de ser diferente de «por
          palavras».
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "parole" && (
          <div className="feedback retry">
            BIANCA: «...sim, ok» <em>(tenta de novo, o mesmo erro de antes)</em>
          </div>
        )}
        {answers.sim === "canale" && (
          <div className="feedback ok">
            BIANCA: <em>(tenta o movimento seguindo o gesto que lhe
            mostraste)</em> «...ah, assim!»
            <br />
            Não estás a esforçar-te mais: estás só a usar um canal que ainda
            não tinhas experimentado.
          </div>
        )}
        {!!answers.sim && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Outra semana. Bianca tem de aprender um exercício novo — a
              partida na água. Experimentas o mesmo canal que resultou com
              ela da última vez. Desta vez não funciona: fica insegura, como
              com as palavras há tempos.
            </p>
            <p className="prompt">Escreve o que fazes agora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "stesso" && (
              <div className="feedback retry">
                BIANCA continua a errar — o canal que tinha funcionado uma
                vez não era uma descoberta definitiva, era só o certo para
                aquele movimento específico.
              </div>
            )}
            {answers.sim2 === "diverso" && (
              <div className="feedback ok">
                BIANCA: <em>(tenta o terceiro canal que restava)</em>{" "}
                «...ok, agora percebi.»
                <br />
                O repertório não se esgota na primeira descoberta: cada
                exercício novo pode exigir um canal diferente, mesmo com a
                mesma criança.
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Controlo de fim de dia — transferência</div>
        <h1>O terceiro canal que resta</h1>
        <p className="lede">
          Já experimentaste «mostrar» e «fazer sentir» com a mesma criança,
          sem resultado, sobre um movimento técnico ainda não discutido até
          agora no curso.
        </p>
        <p className="prompt">O que fazes agora, e porque é coerente com o que aprendeste hoje?</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para a correção, não mostrada ao instrutor: o sistema procura se
            resta o terceiro canal ainda não experimentado («dizer», por
            palavras) — não uma quarta variação do mesmo canal já excluído
            duas vezes. */}
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
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> O teu turno na piscina</div>
        <h1>Três modos, prontos antes de entrar</h1>
        <p className="lede">
          Esta semana, prepara três modos diferentes de explicar a mesma
          coisa técnica antes de entrares na piscina. Se o primeiro não
          funciona com uma criança, usa logo outro — não repitas o primeiro
          mais alto.
        </p>
      </>
    ),
  },

  // 6 — sexta-feira: teste cumulativo
  {
    day: "sexta-feira · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Sexta-feira — teste cumulativo: Capítulo 7 + Capítulo 8</div>
        <h1>O teste</h1>
        <p className="prompt">1. Se um modo de explicar não funciona, a coisa certa é:</p>
        <OptionGroup name="t1" options={T1} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Um bom repertório tem, para cada coisa importante, pelo menos:</p>
        <OptionGroup name="t2" options={T2} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Se uma criança não consegue com a explicação por palavras, quer dizer que não é capaz?</p>
        <OptionGroup name="t3" options={T3} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. O repertório tem uma ordem fixa, válida para todas as crianças?</p>
        <OptionGroup name="t4" options={T4} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(do Capítulo 7)</em> «Estás distraído» e «estavas a olhar
          para a janela» são a mesma coisa?
        </p>
        <OptionGroup name="t5" options={T5} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Um canal funcionou com uma criança num exercício. Quer dizer que os outros dois, com ela, já não servem?</p>
        <OptionGroup name="t6" options={T6} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">
          7. Experimentaste os três canais com uma criança, sem resultado. A
          coisa certa é inventar uma quarta variação?
        </p>
        <OptionGroup name="t7" options={T7} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Com um adolescente, o contacto físico guiado é sempre a forma certa do terceiro canal?</p>
        <OptionGroup name="t8" options={T8} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Um canal que funcionou num exercício funciona automaticamente
          também no exercício seguinte?
        </p>
        <OptionGroup name="t9" options={T9} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Já experimentaste dois modos diferentes com a mesma criança, e
          nenhum funcionou. Escreve em duas linhas o que fazes agora.
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
          Respondeste que o repetirias mais devagar. É o instinto mais
          natural, mas se um modo não funcionou duas vezes, repeti-lo uma
          terceira raramente muda alguma coisa. O tempo que passas a
          repetir o mesmo modo é tempo que podias passar a experimentar um
          diferente.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          O feedback nunca diz só «erraste»: diz o que observar da próxima
          vez. O tom mantém-se sempre sobre o comportamento observado,
          nunca sobre a pessoa — a mesma regra do Capítulo 7.
        </p>
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
        t1: "diverso", t2: "tre", t3: "no", t4: "no", t5: "no",
        t6: "no", t7: "no", t8: "no", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperação — só porque o teste encontrou alguma dificuldade</div>
        <h1>Mais três exemplos, para reconhecer um canal verdadeiramente diferente</h1>
        <p className="lede">
          Não é um fracasso: é só o sinal de que vale a pena rever o ponto
          mais delicado deste capítulo com mais alguns exemplos — o que
          conta realmente como «outro modo», e o que é só o mesmo caminho
          repetido.
        </p>

        <div className="card scene">
          <div className="who">Um menino de 8 anos, a bruços</div>
          <p>
            Não consegue coordenar as pernas. O instrutor explica por
            palavras: «abre, empurra, fecha». Não funciona. Tenta de novo
            por palavras, desta vez mais devagar. Continua nada. Tenta uma
            terceira vez, silabando cada palavra.
          </p>
        </div>
        <p className="prompt">Experimentou três modos diferentes?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sim — mudou o ritmo e o tom três vezes", correct: false },
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
          <div className="who">Uma menina de 9 anos, dois exercícios diferentes</div>
          <p>
            Na semana passada, fazer-lhe sentir o movimento com as mãos
            desbloqueou o deslize. Esta semana tem de aprender a viragem,
            um exercício nunca antes abordado. O instrutor, sem pensar,
            guia-a de novo com as mãos — «com ela funciona sempre assim».
            Não funciona: fica insegura, como das primeiras vezes.
          </p>
        </div>
        <p className="prompt">O que errou o instrutor, ainda antes de experimentar?</p>
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
                "Deu o canal como garantido em vez de tratar a viragem como um problema novo",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Um rapaz de 14 anos, o mergulho técnico</div>
          <p>
            Continua a errar a entrada na água apesar de duas explicações
            por palavras. À terceira tentativa, o instrutor fala-lhe outra
            vez — desta vez com termos técnicos mais precisos, «o ângulo de
            entrada», «a extensão da bacia» — pensando ter mudado de
            abordagem.
          </p>
        </div>
        <p className="prompt">Usou realmente um canal novo?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "si",
              label: "Sim — uma linguagem mais técnica é um modo diferente de explicar",
              correct: false,
            },
            {
              value: "no",
              label:
                "Não — continua a ser «dizer», só com palavras mais difíceis: mantém-se o mesmo canal já excluído duas vezes",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Mudar as palavras não é mudar de canal. O repertório só vale se
          os três modos — mostrar, dizer, fazer sentir — continuarem
          verdadeiramente diferentes entre si, sempre que são precisos.
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
                <td style={{ padding: "6px 0" }}>O modo alternativo escrito no §7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Como mudaste de rumo com a Bianca no §8, em ambas as situações</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>O relato de segunda-feira sobre o Capítulo 7</td>
                <td style={{ textAlign: "right" }}>registado ✓</td>
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
        <div className="eyebrow">Semana 8 de 10 · Capítulo 9 a caminho</div>
        <h1>Quando não quer saber</h1>
        <p className="lede">
          Até agora aprendeste o que fazer quando uma criança não consegue.
          Na próxima semana aprendes a diferença — porque não é a mesma
          coisa — quando uma criança simplesmente não quer saber.
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
          <div className="chip consolidata">
            <span className="name">7 · O feedback</span>
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
