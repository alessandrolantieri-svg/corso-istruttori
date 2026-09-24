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

const K1: Option[] = [
  { value: "no", label: "No — una etiqueta a la persona, la otra describe lo que pasó", correct: true },
  { value: "si", label: "Sí — es solo otra forma de decir lo mismo", correct: false },
];
const K2: Option[] = [
  { value: "si", label: "Sí — significa que todavía no tiene la técnica correcta", correct: false },
  { value: "no", label: "No — es información sobre qué ajustar, no una calificación del niño", correct: true },
];
const K3: Option[] = [
  { value: "no", label: "No — una respuesta específica sí, un cumplido genérico no", correct: true },
  { value: "si", label: "Sí — si lo motiva, tarde o temprano entiende solo qué hizo bien", correct: false },
];
const K4: Option[] = [
  { value: "si", label: "Sí — un cumplido vago es más fácil de recordar y repetir", correct: false },
  { value: "no", label: "No — es al revés: el específico es el que se puede repetir", correct: true },
];
const K5: Option[] = [
  { value: "entrambe", label: "Nombrar las dos cosas, de forma específica", correct: true },
  { value: "uno", label: "Elegir solo elogio, o solo corrección", correct: false },
];
const K6: Option[] = [
  { value: "no", label: "No — a esa edad el tono importa tanto como el contenido", correct: true },
  { value: "si", label: "Sí, el entusiasmo funciona a cualquier edad", correct: false },
];

const M1: Option[] = [
  { value: "si", label: "Sí — primero las palabras, después el gesto, después el contacto", correct: false },
  { value: "no", label: "No — depende del niño, no hay un orden válido para todos", correct: true },
];
const M2: Option[] = [
  { value: "no", label: "No — solo significa que esa todavía no era la llave correcta", correct: true },
  { value: "si", label: "Sí — si una forma simple no funciona, el problema está en el niño", correct: false },
];
const M3: Option[] = [
  { value: "no", label: "No — es el momento de parar y mirar qué más puede haber (Capítulo 3)", correct: true },
  { value: "si", label: "Sí, hay que insistir con la comunicación", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "parole", label: "Vuelves a intentarlo con una explicación verbal, formulada de otra manera" },
  { value: "canale", label: "Le muestras el movimiento, o la guías con contacto físico" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "stesso", label: "Insistes en el mismo canal — con ella siempre funciona así" },
  { value: "diverso", label: "Pruebas un canal todavía distinto, como si fuera un problema nuevo" },
];

const T1: Option[] = [
  { value: "lento", label: "Repetirla más despacio, pronunciando mejor las palabras", correct: false },
  { value: "diverso", label: "Usar enseguida una distinta", correct: true },
];
const T2: Option[] = [
  { value: "tre", label: "Tres formas distintas", correct: true },
  { value: "uno", label: "Una forma, bien preparada de antemano", correct: false },
];
const T3: Option[] = [
  { value: "si", label: "Sí — si las palabras no bastan, el problema es que no puede", correct: false },
  { value: "no", label: "No — todavía no era la llave correcta, no un límite del niño", correct: true },
];
const T4: Option[] = [
  { value: "no", label: "No — depende de cada niño, no hay un orden igual para todos", correct: true },
  { value: "si", label: "Sí — primero las palabras, después el gesto, y el contacto al final", correct: false },
];
const T5: Option[] = [
  { value: "si", label: "Sí — dos formas distintas de decir lo mismo", correct: false },
  { value: "no", label: "No — una etiqueta a la persona, la otra describe el comportamiento", correct: true },
];
const T6: Option[] = [
  { value: "no", label: "No — funcionó para ese movimiento, en ese momento: los otros dos siguen en el repertorio", correct: true },
  { value: "si", label: "Sí — una vez encontrado su canal, su repertorio queda cerrado", correct: false },
];
const T7: Option[] = [
  { value: "si", label: "Sí, hay que insistir hasta encontrar el correcto", correct: false },
  { value: "no", label: "No — es el momento de parar y mirar qué más puede haber", correct: true },
];
const T8: Option[] = [
  { value: "no", label: "No — a esa edad hay que adaptarlo a algo respetuoso, manteniendo el mismo principio", correct: true },
  { value: "si", label: "Sí, el canal importa más que la forma en que lo usas", correct: false },
];
const T9: Option[] = [
  { value: "si", label: "Sí, una vez encontrado para un niño sigue siendo el correcto", correct: false },
  { value: "no", label: "No — cada ejercicio nuevo puede necesitar un canal distinto", correct: true },
];

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo8StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 8 · CAMBIAR DE RUMBO</div>
        <h1>No funcionó. ¿Y ahora?</h1>
        <p className="lede">
          Cuando una forma de explicar algo no funciona, el instructor prueba enseguida otra — en
          lugar de repetir lo mismo más fuerte o más despacio.
        </p>
      </>
    ),
  },

  // 1 — lunes: reflexión + consolidación Capítulo 7
  {
    day: "lunes · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada: cada respuesta tenía que nombrar un comportamiento, nunca a la
          persona. ¿Te resultó fácil, o te sorprendiste volviendo a las viejas costumbres?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidación — vuelve el Capítulo 7</h2>
        <p className="prompt">1. «Estás distraído» y «mirabas la ventana» ¿dicen lo mismo?</p>
        <OptionGroup name="k1" options={K1} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Un niño tragó agua durante el ejercicio: ¿es un fracaso?</p>
        <OptionGroup name="k2" options={K2} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. ¿«Muy bien» enseña qué repetir?</p>
        <OptionGroup name="k3" options={K3} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. ¿Un cumplido vago se repite más fácilmente que uno específico?</p>
        <OptionGroup name="k4" options={K4} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">
          5. Un intento mejora un detalle pero pierde otro. La respuesta correcta es:
        </p>
        <OptionGroup name="k5" options={K5} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">
          6. Con un adolescente, ¿un cumplido específico dicho con tono de porrista funciona igual
          que con un niño pequeño?
        </p>
        <OptionGroup name="k6" options={K6} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martes: repertorio de los tres canales
  {
    day: "martes · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Si algo no funciona, no lo repites — lo cambias</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Diste una buena respuesta, con la instrucción correcta, en el momento correcto — y aun
          así no funciona. ¿Y ahora?
        </p>
        <p className="lede">
          El primer instinto, cuando algo no funciona, es repetirlo — más despacio, más fuerte. Es
          el error más común del oficio: bajo presión todos volvemos a nuestra forma preferida.
        </p>
        <p className="lede">
          <strong>Construir un repertorio</strong> significa tener, para cada cosa importante, al
          menos tres formas distintas de decirla: una que muestre, una que explique con palabras,
          una que se sienta en el cuerpo — los mismos tres canales del test VAK, aplicados al
          revés.
        </p>
        <div className="card quote">
          No hay un orden fijo. El repertorio no te dice cuál vas a usar: solo te garantiza que,
          cuando el primero no funciona, ya tienes otros dos listos.
        </div>
        <div className="card">
          <strong>El contacto físico guiado tiene una regla más, antes del &quot;cómo&quot;: el
          permiso.</strong>
          <p>
            Antes de guiar los brazos o las piernas de un niño, dilo en voz alta, de modo que él y
            quien esté cerca puedan oírlo — <em>&quot;te agarro el tobillo, así sientes el
            movimiento&quot;</em>. No partas del contacto: parte del anuncio.
          </p>
          <p>
            Guía solo donde hace falta técnicamente (manos, brazos, tobillos, espalda para la
            flotación) — nunca el resto del cuerpo. Hazlo en un lugar visible, no apartado: en el
            borde, en la piscina abierta, donde un compañero o un padre o madre, si está presente,
            pueda ver lo que estás haciendo.
          </p>
          <p>
            Si el niño se retira, se pone rígido o dice que no — incluso sin decirlo con palabras
            — ese canal queda cerrado por ese momento: vuelve a mostrar o a explicar. No insistas
            para &quot;acostumbrarlo&quot;.
          </p>
          <p>
            Esto vale para cualquier edad, y tu instalación puede tener su propio reglamento sobre
            este punto: en ese caso, el reglamento de la instalación siempre tiene la última
            palabra.
          </p>
        </div>
        <p className="lede">
          <strong>Necesitas una confianza básica para hacerlo:</strong> cada niño ya tiene dentro
          de sí los recursos para lograrlo — tu parte no es &quot;darle&quot; la capacidad, es
          encontrar la forma que se la saca. Si la primera forma no funciona, no significa que él
          no pueda: solo significa que esa todavía no era la llave correcta.
        </p>
        <p className="lede">
          <strong>¿Y si probaste los tres canales, y ninguno funcionó?</strong> En ese punto el
          problema probablemente ya no es &quot;qué canal&quot;, sino otra cosa — quizá tiene
          miedo, quizá todavía no entendió, quizá tiene frío, quizá solo espera tu permiso: las
          mismas cuatro causas del Capítulo 3. En ese momento, insistir con una cuarta variación
          no sirve: es como seguir tocando una puerta cuando sabes que quien está dentro no te
          puede responder ahora. El repertorio tiene tres formas, no infinitas — saber cuándo
          parar del todo forma parte de la misma competencia.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">
          1. ¿El repertorio tiene un orden fijo — siempre primero las palabras, después el gesto,
          después el contacto?
        </p>
        <OptionGroup name="m1" options={M1} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">
          2. Si la primera forma no funciona con un niño, ¿significa que no puede?
        </p>
        <OptionGroup name="m2" options={M2} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Probaste los tres canales, sin resultado. ¿Lo correcto es inventar una cuarta
          variación?
        </p>
        <OptionGroup name="m3" options={M3} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
      </>
    ),
  },

  // 3 — miércoles: tres niños, tres canales + simulación Bianca (dos momentos)
  {
    day: "miércoles",
    pct: 46,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && !!a.sim2,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Tres niños, tres canales ganadores distintos</h1>
        <div className="card scene">
          <div className="who">Un niño de 7 años, la rana</div>
          <p>
            No logra coordinar las piernas. El instructor prueba con palabras tres veces. Nada
            cambia. Cambia de canal: le hace sentir el movimiento moviéndole los tobillos fuera
            del agua. El niño lo repite, casi bien, al primer intento.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Sara, 10 años</div>
          <p>
            Con otro instructor, las palabras siempre habían bastado — y eso la había convencido
            de que siempre bastarían. Con el viraje sigue equivocándose. El instructor prueba a
            hacerle sentir el movimiento: todavía nada. Al tercer intento, le muestra el
            movimiento completo, en el agua. Eso es lo que la desbloquea.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un chico de 15 años</div>
          <p>
            Sigue equivocándose en la entrada al agua de un salto técnico, a pesar de la
            demostración y la explicación con palabras. El tercer canal — el contacto físico,
            natural a los 7 años — a los 15 arriesgaría a parecer fuera de lugar. El instructor
            adapta el canal a su edad, sin cambiar el principio: le muestra un vídeo corto de su
            propio salto. Al verse, el chico entiende solo dónde se rompe el movimiento.
          </p>
        </div>
        <p className="lede">
          <strong>
            Tres niños, tres canales ganadores distintos — y en ninguno de los tres casos el
            canal, o su forma, era evidente de antemano.
          </strong>
        </p>
        <p className="prompt">
          Explicaste con palabras, dos veces, cómo mantener el cuerpo extendido durante el
          deslizamiento. El niño sigue arqueando la espalda. Escribe una forma distinta — no con
          palabras — de hacerle llegar lo mismo.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca un canal distinto
            del ya probado — no una tercera explicación verbal reformulada. */}
        <h2>Simulación</h2>
        <p className="lede">
          <strong>BIANCA, 9 años.</strong> Ya escuchó dos veces la explicación con palabras de
          cómo mover los brazos en espalda, y sigue equivocándose. ¿Qué pruebas ahora? — tiene que
          ser distinto de «con palabras».
        </p>
        <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
        {answers.sim === "parole" && (
          <div className="feedback retry">
            BIANCA: «...sí, vale» <em>(lo intenta de nuevo, el mismo error de antes)</em>
          </div>
        )}
        {answers.sim === "canale" && (
          <div className="feedback ok">
            BIANCA: <em>(prueba el movimiento siguiendo el gesto que le mostraste)</em> «...ah,
            así!»
            <br />
            No estás haciendo más esfuerzo: solo estás usando un canal que antes no habías
            probado.
          </div>
        )}
        {!!answers.sim && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Otra semana. Bianca tiene que aprender un ejercicio nuevo — la salida en el agua.
              Pruebas el mismo canal que funcionó con ella la última vez. Esta vez no funciona: se
              queda insegura, como antes con las palabras.
            </p>
            <p className="prompt">Escribe qué haces ahora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup name="sim2" options={SIM2_OPTIONS} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
            {answers.sim2 === "stesso" && (
              <div className="feedback retry">
                BIANCA sigue equivocándose — el canal que había funcionado una vez no era un
                descubrimiento definitivo, era solo el correcto para ese movimiento específico.
              </div>
            )}
            {answers.sim2 === "diverso" && (
              <div className="feedback ok">
                BIANCA: <em>(prueba el tercer canal que queda)</em> «...ok, ahora entendí.»
                <br />
                El repertorio no se agota en el primer descubrimiento: cada ejercicio nuevo puede
                necesitar un canal distinto, incluso con el mismo niño.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — miércoles por la noche: transferencia
  {
    day: "miércoles por la noche",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — transferencia</div>
        <h1>El tercer canal que queda</h1>
        <p className="lede">
          Ya probaste «mostrar» y «hacer sentir» con el mismo niño, sin resultado, en un
          movimiento técnico que hasta ahora nunca se había tratado en el curso.
        </p>
        <p className="prompt">¿Qué haces ahora, y por qué es coherente con lo que aprendiste hoy?</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca si queda el
            tercer canal aún no probado («decir», con palabras) — no una cuarta variación del
            mismo canal ya descartado dos veces. */}
      </>
    ),
  },

  // 5 — turno en la piscina
  {
    day: "en la piscina",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Tres formas, listas antes de entrar</h1>
        <p className="lede">
          Esta semana, prepara tres formas distintas de explicar una misma cosa técnica antes de
          entrar en la piscina. Si la primera no funciona con un niño, usa enseguida otra — no
          repitas la primera más fuerte.
        </p>
      </>
    ),
  },

  // 6 — viernes: examen acumulativo
  {
    day: "viernes · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) =>
      ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — examen acumulativo: Capítulo 7 + Capítulo 8</div>
        <h1>El examen</h1>
        <p className="prompt">1. Si una forma de explicar no funciona, lo correcto es:</p>
        <OptionGroup name="t1" options={T1} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Un buen repertorio tiene, para cada cosa importante, al menos:</p>
        <OptionGroup name="t2" options={T2} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Si un niño no lo logra con la explicación con palabras, ¿significa que no puede?</p>
        <OptionGroup name="t3" options={T3} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">4. ¿El repertorio tiene un orden fijo, válido para cualquier niño?</p>
        <OptionGroup name="t4" options={T4} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">
          5. <em>(del Capítulo 7)</em> ¿«Estás distraído» y «mirabas la ventana» son lo mismo?
        </p>
        <OptionGroup name="t5" options={T5} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. Un canal funcionó con un niño en un ejercicio. ¿Significa que los otros dos, con él, ya no sirven?</p>
        <OptionGroup name="t6" options={T6} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">
          7. Probaste los tres canales con un niño, sin resultado. ¿Lo correcto es inventar una
          cuarta variación?
        </p>
        <OptionGroup name="t7" options={T7} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">8. Con un adolescente, ¿el contacto físico guiado es siempre la forma correcta del tercer canal?</p>
        <OptionGroup name="t8" options={T8} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. ¿Un canal que funcionó en un ejercicio funciona automáticamente también en el
          siguiente ejercicio?
        </p>
        <OptionGroup name="t9" options={T9} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Ya probaste dos formas distintas con el mismo niño, y ninguna funcionó. Escribe en
          dos líneas qué haces ahora.
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
          Ejemplo de respuesta generada, en caso de error en la pregunta 1:
        </p>
        <div className="card quote">
          Respondiste que la repetirías más despacio. Es el instinto más natural, pero si una
          forma no funcionó dos veces, repetirla una tercera rara vez cambia algo. El tiempo que
          pasas repitiendo la misma forma es tiempo que podrías pasar probando una distinta.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          El feedback nunca dice solo «te equivocaste»: dice qué mirar la próxima vez. El tono
          siempre se queda en el comportamiento observado, nunca en la persona — la misma regla
          del Capítulo 7.
        </p>
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
      const correctas: Record<string, string> = {
        t1: "diverso", t2: "tre", t3: "no", t4: "no", t5: "no",
        t6: "no", t7: "no", t8: "no", t9: "no",
      };
      const equivocadas = Object.entries(correctas).filter(([k, v]) => a[k] !== v).length;
      return equivocadas >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el examen encontró alguna dificultad</div>
        <h1>Tres ejemplos más, para reconocer un canal de verdad distinto</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algún ejemplo más — qué cuenta de verdad como «otra forma», y qué es
          solo el mismo camino repetido.
        </p>

        <div className="card scene">
          <div className="who">Un niño de 8 años, la rana</div>
          <p>
            No logra coordinar las piernas. El instructor explica con palabras: «abre, empuja,
            cierra». No funciona. Lo intenta de nuevo con palabras, esta vez más despacio.
            Todavía nada. Lo intenta una tercera vez, pronunciando cada sílaba.
          </p>
        </div>
        <p className="prompt">¿Probó tres formas distintas?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sí — cambió el ritmo y el tono tres veces", correct: false },
            {
              value: "no",
              label: "No — son tres variaciones del mismo canal (decir), no tres canales distintos",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una niña de 9 años, dos ejercicios distintos</div>
          <p>
            La semana pasada, hacerle sentir el movimiento con las manos desbloqueó el
            deslizamiento. Esta semana tiene que aprender el viraje, un ejercicio nunca antes
            trabajado. El instructor, sin pensarlo, la guía otra vez con las manos — «total, con
            ella siempre funciona así». No funciona: se queda insegura, como las primeras veces.
          </p>
        </div>
        <p className="prompt">¿Qué hizo mal el instructor, incluso antes de intentarlo?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "niente",
              label: "Nada — un canal que funcionó una vez sigue siendo la elección correcta después",
              correct: false,
            },
            {
              value: "nuovo",
              label:
                "Dio por hecho el canal en lugar de tratar el viraje como un problema nuevo",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un chico de 14 años, el salto técnico</div>
          <p>
            Sigue equivocándose en la entrada al agua a pesar de dos explicaciones con palabras.
            Al tercer intento, el instructor vuelve a hablarle — esta vez con términos técnicos
            más precisos, «el ángulo de entrada», «la extensión de la cadera» — pensando que
            había cambiado de enfoque.
          </p>
        </div>
        <p className="prompt">¿Usó de verdad un canal nuevo?</p>
        <OptionGroup
          name="rec3"
          options={[
            {
              value: "si",
              label: "Sí — un lenguaje más técnico es una forma distinta de explicar",
              correct: false,
            },
            {
              value: "no",
              label:
                "No — sigue siendo «decir», solo con palabras más difíciles: sigue siendo el mismo canal ya descartado dos veces",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Cambiar las palabras no es cambiar de canal. El repertorio solo funciona si las tres
          formas — mostrar, decir, hacer sentir — siguen siendo de verdad distintas entre sí, cada
          vez que hacen falta.
        </p>
      </>
    ),
  },

  // 9 — resultado
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
                <td style={{ padding: "6px 0" }}>La forma alternativa escrita en el §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Cómo cambiaste de rumbo con Bianca en el §8, en las dos situaciones</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Repertorio y adaptación</td>
                <td style={{ padding: "6px 0" }}>El más bajo de los anteriores</td>
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
        <div className="done-badge">✓ Capítulo 8 completado</div>
        <div className="eyebrow">Semana 8 de 10 · Capítulo 9 próximamente</div>
        <h1>Cuando no quiere</h1>
        <p className="lede">
          Hasta ahora aprendiste qué hacer cuando un niño no lo logra. La semana que viene
          aprendes la diferencia — porque no es lo mismo — cuando un niño simplemente no quiere.
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
          <div className="chip consolidata">
            <span className="name">6 · Verificar con la acción <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · El feedback</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">8 · Cambiar de rumbo</span>
            <span className="state">adquirida</span>
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
