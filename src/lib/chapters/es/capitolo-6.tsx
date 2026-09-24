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
      placeholder="Escribe aquí..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const K1_OPTIONS: Option[] = [
  { value: "no", label: "No — mejor decir qué hacer: «mira hacia un lado cuando respiras»", correct: true },
  { value: "si", label: "Sí — de todas formas es clara, dice qué evitar", correct: false },
];
const K2_OPTIONS: Option[] = [
  { value: "si", label: "Sí — es un dato real, medido en un estudio famoso", correct: false },
  { value: "no", label: "No, es un número fuera de contexto", correct: true },
];
const K3_OPTIONS: Option[] = [
  { value: "corpo", label: "Al cuerpo — es la señal más difícil de fingir", correct: true },
  { value: "parole", label: "A las palabras — son el mensaje explícito, así que el más fiable", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "bersaglio", label: "Un objetivo", correct: true },
  { value: "ostacolo", label: "Un obstáculo", correct: false },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No — en una emergencia real la claridad inmediata importa más", correct: true },
  { value: "si", label: "Sí, la regla vale siempre, incluso en una emergencia", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "sincero", label: "Como un cumplido sincero — las palabras correctas bastan de todas formas", correct: false },
  { value: "abitudine", label: "Como algo dicho por costumbre, no un reconocimiento de verdad", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "no", label: "No — responde «sí» casi siempre, sin importar qué", correct: true },
  { value: "si", label: "Sí — si se lo preguntas con calma, el niño responde con sinceridad", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Comunico → escucha → fin", correct: false },
  { value: "fa", label: "Comunico → comprende → actúa", correct: true },
];
const M3_OPTIONS: Option[] = [
  { value: "secondo", label: "Observas un segundo intento, o haces el primero más explícito", correct: true },
  { value: "chiedo", label: "Vuelves a preguntar «¿entendiste?» — normalmente basta para despejar la duda", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "chiedo", label: "Le preguntas si entendió" },
  { value: "tentativo", label: "Le pides un primer intento breve, o que te lo muestre parada en el borde" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "riparte", label: "Das la corrección y la dejas retomar, sin mirar el siguiente intento" },
  { value: "osservi", label: "Das la corrección y observas el siguiente intento antes de dejarla continuar" },
];

const T1_OPTIONS: Option[] = [
  { value: "no", label: "No — casi todos responden «sí» sin importar qué", correct: true },
  { value: "si", label: "Sí — si se pregunta con atención, la respuesta es fiable", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "ascolta", label: "Comunico → el niño escucha → fin", correct: false },
  { value: "fa", label: "Comunico → comprende → actúa", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "osservi", label: "Observas un primer intento breve", correct: true },
  { value: "parte", label: "Lo dejas partir para el ejercicio completo", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "chiedo", label: "Preguntarle si entendió, con palabras sencillas", correct: false },
  { value: "compito", label: "Una pequeña tarea inmediata: «muéstramelo ahora»", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "parole", label: "A las palabras — son el mensaje explícito, así que el más fiable", correct: false },
  { value: "corpo", label: "Al cuerpo — es la señal más difícil de fingir", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sí, lo importante es intentarlo — el error se arregla sobre la marcha", correct: false },
  { value: "no", label: "No — el error se descubre más tarde, cuando cuesta más corregirlo", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "no", label: "No — siempre hace falta al menos una sesión real en la piscina, contada y verificada", correct: true },
  { value: "si", label: "Sí, si las respuestas son correctas, el resto es solo formalidad", correct: false },
];
const T8_OPTIONS: Option[] = [
  { value: "decidi", label: "Decidir de todas formas, una información parcial basta", correct: false },
  { value: "secondo", label: "Observar un segundo intento, o hacer el primero más explícito", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "si", label: "Sí, la corrección misma basta, no hace falta más control", correct: false },
  { value: "no", label: "No — también la corrección hay que volver a verificarla con la acción", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo6StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 6 · HACERLO ACTUAR, Y VER SI LLEGÓ <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>«¿Entendiste?» no sirve de nada. ¿Entonces?</h1>
        <p className="lede">
          El instructor comprueba si un mensaje ha llegado observando si el niño hace lo que se le
          pidió — no preguntándole si entendió.
        </p>
        <div className="card warn">
          <strong>Nivel más alto.</strong> Junto con el Capítulo 3, esta es una de las dos
          competencias de la escucha: aquí no basta con ADQUIRIDA, hace falta llegar a{" "}
          <strong>EXCELENTE</strong> antes del examen final — y la simulación sola nunca basta:
          siempre hace falta al menos una sesión real en la piscina.
        </div>
      </>
    ),
  },

  // 1 — lunes: reflexión + repaso del Capítulo 5
  {
    day: "lunes · 8 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada: una instrucción en positivo, dicha deteniéndote a mirar al niño. ¿Qué
          notaste en su reacción, respecto a lo habitual?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Repaso — vuelve el Capítulo 5</h2>
        <p className="prompt">1. «No hundas la cabeza» ¿es una buena instrucción?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Las palabras cuentan el 7% de la comunicación — ¿es verdad en general?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. Si las palabras y el cuerpo se contradicen, el niño cree...</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. ¿Una instrucción en positivo le da al cuerpo un objetivo o un obstáculo?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. En una emergencia real, ¿es un error decir «¡alto!» en vez de reformular en positivo?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Un chico de 14 años recibe un cumplido de verdad pero dicho con tono mecánico y cuerpo
          distraído. ¿Cómo lo vive más probablemente?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martes: comunico → comprende → actúa
  {
    day: "martes · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Comunico → comprende → actúa</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Dijiste lo correcto, del modo correcto. Pero ¿de verdad llegó? Hoy aprendes a descubrirlo
          sin preguntar.
        </p>
        <p className="lede">
          La secuencia real no es «comunico → el niño escucha». <strong>La acción es la
          prueba</strong>, no el escuchar. Y la pregunta más usada para comprobarlo —
          «¿entendiste?» — es casi inútil: un niño responde «sí» casi siempre, haya entendido o no.
        </p>
        <div className="card quote">
          La pregunta correcta no se hace con palabras: se hace con los ojos. Das la instrucción, y
          miras qué pasa — no si asiente, sino si el cuerpo empieza a hacer lo que pediste.
        </div>
        <p className="lede">
          <strong>Una excepción útil:</strong> con los más pequeños (3-5 años) puedes convertir la
          comprobación en una pequeña tarea inmediata — «muéstrame cómo haces la estrella» — en vez
          de preguntar si entendieron. Sigue siendo la misma regla: compruebas con la acción, no
          con la palabra.
        </p>
        <p className="lede">
          <strong>¿Y si el primer intento que observas no es claro?</strong> A veces el movimiento
          que ves no es ni claramente correcto ni claramente incorrecto — solo has visto una parte,
          no suficiente para estar seguro. No es culpa del método: observa un segundo intento, o
          haz el primero un poco más explícito («hazlo de nuevo, un poco más despacio») — no
          vuelvas a preguntar «¿entendiste?», y no adivines. Comprobar con la acción no significa
          que baste siempre una sola mirada: significa que lo que decide siempre es lo que ves —
          aunque a veces haga falta mirar dos veces antes de estar seguro.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">1. ¿«¿Entendiste?» es fiable porque el niño responde con sinceridad?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. La secuencia correcta es:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. El primer intento que observas no es claramente correcto ni claramente incorrecto.
          ¿Qué haces?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — miércoles: escenas + aplicación + simulación Sara
  {
    day: "miércoles",
    pct: 46,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback: ReactNode =
        answers.sim === "chiedo" ? (
          <div className="feedback retry">
            SARA: «¡Sí, entendí!» <em>(sale para el deslizamiento — los brazos se doblan enseguida)</em>
            <br />
            El error lo descubres después, en medio del ejercicio.
          </div>
        ) : answers.sim === "tentativo" ? (
          <div className="feedback ok">
            SARA: <em>(prueba la posición en el borde — los brazos ya están doblados)</em> «...¿así?»
            <br />
            Lo ves antes incluso de que salga — y puedes corregirlo mientras todavía cuesta poco.
          </div>
        ) : null;

      const sim2Feedback: ReactNode =
        answers.sim2 === "riparte" ? (
          <div className="feedback retry">
            SARA retoma, y nadie sabe si el error se corrigió de verdad hasta que vuelve a estar a
            mitad de piscina — la corrección, por sí sola, todavía no es una verificación.
          </div>
        ) : answers.sim2 === "osservi" ? (
          <div className="feedback ok">
            SARA lo intenta de nuevo: los brazos quedan casi extendidos. Ahora lo sabes con certeza
            — no porque ella lo haya dicho, sino porque lo viste.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Miércoles</div>
          <h1>Se mira el cuerpo, no se escucha la respuesta</h1>
          <div className="card scene">
            <div className="who">Un niño de 8 años, «sí, entendí»</div>
            <p>
              Después de la explicación de la respiración lateral, dice «sí, entendí» con
              seguridad. El instructor lo deja partir para el largo entero. A mitad de piscina
              empieza a tragar agua, se para, tose. Si hubiera observado la primera brazada,
              habría visto que giraba la cabeza demasiado tarde respecto al brazo — visible
              enseguida, no a mitad de piscina. El «sí» no era mentira: solo era inútil como
              información.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Emma, 4 años</div>
            <p>
              El instructor acaba de mostrarle cómo hacer la estrella. Con ella no tiene sentido
              preguntar «¿entendiste?» — en cambio le dice: «muéstramela tú, ahora, en el borde.»
              Emma abre brazos y piernas, imperfecta pero en la dirección correcta — tres segundos,
              no diez minutos.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Un chico de 15 años</div>
            <p>
              Dice «sí, lo entendí, tranquilo» con un tono algo impaciente, después de la
              explicación de un viraje técnico — a esa edad, «¿entendiste?» puede sonar casi como
              una ofensa. El instructor no se lo repite, y tampoco le pide «muéstramelo» como a
              Emma: le propone, de igual a igual, «hagamos un pase lento en el borde antes de que
              te tires, solo para estar seguros del tiempo.» Al hacerlo despacio, el chico duda
              justo en el punto crítico. No fue puesto a prueba como un niño: se le ofreció una
              verificación disfrazada de ajuste técnico.
            </p>
          </div>
          <p className="lede">
            <strong>
              Misma regla, tres edades distintas — solo cambia cómo se viste la petición según la
              edad.
            </strong>
          </p>
          <p className="prompt">
            Acabas de darle una instrucción a un niño de 9 años. Él asiente y dice «sí, entendí».
            ¿Qué haces, antes de dejarlo partir para el ejercicio completo?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para la corrección, no mostrada al instructor: el sistema busca si propone un
              primer intento breve para observar, en vez de confiar en la palabra y dejarlo seguir
              para el ejercicio completo. */}
          <h2>Simulación</h2>
          <p className="lede">
            <strong>SARA, 10 años.</strong> Acabas de explicarle cómo mantener los brazos
            extendidos durante el deslizamiento. ¿Qué haces para comprobar si la instrucción
            llegó?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim && (
            <>
              <p className="lede" style={{ marginTop: 14 }}>
                Sea cual sea tu primera elección, ahora has visto el error: los brazos de Sara
                están doblados. Le das una corrección en positivo, con tono y cuerpo coherentes.
              </p>
              <p className="prompt">
                Escribe qué haces justo después de dar la corrección — no solo la corrección en
                sí.
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

  // 4 — miércoles por la noche: transferencia a edades 3-5
  {
    day: "miércoles por la noche",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — transferencia</div>
        <h1>Edades 3-5, sin haber probado nada todavía</h1>
        <p className="lede">
          Un niño de 5 años, en el grupo de 3-5 años, tiene que aprender a soplar burbujas bajo el
          agua. Todavía no has probado nada con él.
        </p>
        <p className="prompt">
          ¿Cómo compruebas si entendió, respetando su edad — sin preguntarle «¿entendiste?»
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
      </>
    ),
  },

  // 5 — turno en la piscina
  {
    day: "en la piscina",
    pct: 69,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Un turno entero, sin «¿entendiste?»</h1>
        <p className="lede">
          Esta semana, durante un turno entero, no le preguntes a nadie «¿entendiste?». Da la
          instrucción y mira la acción. Solo eso.
        </p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Si no tienes turno esta semana: una simulación reforzada desbloquea el paso siguiente,
          pero no basta para llevar esta competencia a EXCELENTE. Para eso, tarde o temprano, hace
          falta una sesión real en la piscina.
        </p>
      </>
    ),
  },

  // 6 — viernes: examen acumulativo Capítulo 5 + Capítulo 6
  {
    day: "viernes · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — examen acumulativo: Capítulo 5 + Capítulo 6</div>
        <h1>El examen</h1>
        <p className="prompt">1. ¿«¿Entendiste?» es una buena pregunta de comprobación?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. La secuencia correcta es:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Un niño dice «entendí» con seguridad. ¿Qué haces?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. Con un niño de 4 años, la comprobación correcta es:</p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(del Capítulo 5)</em> Cuando las palabras y el cuerpo se contradicen, el niño cree
          a:
        </p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. ¿Creer en el «sí» en vez de mirar la acción es un error neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Para esta competencia, ¿una buena simulación basta para EXCELENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. El primer intento que observas no es claro. Lo correcto es:</p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">9. Después de dar una corrección, ¿la comprobación ya está completa?</p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Un chico de 13 años dice «vale, entendí, vamos» con un tono un poco molesto. Escribe
          en dos líneas qué haces antes de dejarlo partir.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica cómo funciona la corrección (§10, D34)
  {
    day: "viernes · feedback",
    pct: 88,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Esto es lo que dicen tus respuestas</h1>
        <p className="lede">No sobre ti — sobre lo que hiciste en estas preguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Ejemplo de feedback generado, en caso de error en la pregunta 3:
        </p>
        <div className="card quote">
          Respondiste que lo dejarías partir. Pero un «entendí» dicho con seguridad no es una
          garantía — es solo una palabra. La diferencia entre descubrir un error en el borde o
          descubrirlo a mitad de piscina es un intento breve observado antes, que cuesta pocos
          segundos.
        </div>
      </>
    ),
  },

  // 8 — recuperación: solo si el examen del viernes tiene demasiados errores (§12, D25/D27)
  {
    day: "recuperación",
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
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el examen encontró alguna dificultad</div>
        <h1>Tres veces en que confiar salió caro</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algún ejemplo más — confiar en la palabra, o confiar en la corrección
          recién dada, en vez de mirar qué pasa de verdad.
        </p>

        <div className="card scene">
          <div className="who">Un niño de 9 años, codos bajos en espalda</div>
          <p>
            El instructor explica cómo mantener los codos altos, luego pregunta «¿entendiste?». El
            niño responde «sí» con seguridad. Lo deja partir para el largo entero — a mitad de
            camino, los codos siguen tan bajos como antes: el error solo se ve ahora, cuando ya ha
            costado medio largo.
          </p>
        </div>
        <p className="prompt">¿Qué debería haber hecho el instructor antes de dejarlo partir?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "niente", label: "Nada — el «sí» se dijo con seguridad, bastaba con confiar", correct: false },
            {
              value: "tentativo",
              label: "Pedirle un intento breve para observar, antes del largo entero",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una corrección dada, y luego dejada ahí</div>
          <p>
            El instructor corrige la posición de la cabeza de un alumno — «mantenla un poco más
            baja» — y se vuelve enseguida hacia otro niño, sin mirar el siguiente intento. Tres
            largos después, la cabeza sigue en la misma posición de antes: nadie se había dado
            cuenta.
          </p>
        </div>
        <p className="prompt">¿La corrección, por sí sola, ya era una comprobación?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "si", label: "Sí — haberla dicho bien ya es suficiente", correct: false },
            {
              value: "no",
              label: "No — hay que verla repetida al menos una vez, si no, se queda solo en una palabra dicha",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">La misma situación, esta vez bien gestionada</div>
          <p>
            Una chica dice «entendí, tranquilo» con tono seguro, antes de probar un viraje con
            banderines que nunca ha hecho. Esta vez el instructor le pide que se lo muestre despacio
            en el borde primero — y ve enseguida que falla el momento del giro, incluso antes de
            tirarse.
          </p>
        </div>
        <p className="prompt">¿Por qué funcionó, esta vez?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "azione",
              label: "Porque miró la acción en vez de confiar en la palabra",
              correct: true,
            },
            { value: "sincera", label: "Porque esta vez la chica dijo la verdad", correct: false },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          El «sí» nunca es la prueba. La prueba siempre es lo que hace el cuerpo — la primera vez
          que lo miras, y otra vez, la siguiente.
        </p>
      </>
    ),
  },

  // 9 — viernes: resultado
  {
    day: "viernes · resultado",
    pct: 95,
    nextLabel: "Ir al Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Resultado</div>
        <h1>Tu perfil se actualiza</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Puntuación</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De dónde viene</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>Las 10 preguntas del examen</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>La respuesta del §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Cómo comprobaste con Sara en el §8, corrección incluida</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 5</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Guía de la acción y verificación</td>
                <td style={{ padding: "6px 0" }}>El más bajo de los anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Para esta competencia concreta: el estado EXCELENTE no se activa sin al menos una sesión
          real en la piscina, contada y verificada. Hoy queda en ADQUIRIDA.
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
        <div className="done-badge">✓ Capítulo 6 completado</div>
        <div className="eyebrow">Semana 6 de 10 · Capítulo 7 en camino</div>
        <h1>El feedback</h1>
        <p className="lede">
          Hoy has aprendido a ver si algo llegó. La próxima semana aprenderás qué decir después —
          cuando salió bien, y cuando no.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="es" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="es" />
        <h2>Tu progreso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Conciencia personal</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Reconocimiento del alumno</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Sintonía</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Instrucciones y congruencia</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">6 · Verificar con la acción <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">7 · El feedback</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">8 · Cambiar de rumbo</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">9 · Situaciones difíciles</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomía</span>
            <span className="state">no adquirida</span>
          </div>
        </div>
      </>
    ),
  },
];
