import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traducción española, no un capítulo independiente: mismos chapterId/claves de respuesta/valores
// internos del capítulo italiano (src/lib/chapters/capitolo-2.tsx) — solo cambia el texto visible.

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

const DIARY_KEYS = ["q2", "q7", "q7b", "q13", "t10"];

export const capitolo2StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 2 · QUIÉN TENGO DELANTE</div>
        <h1>Qué cambia entre un niño de 4 años y un chico de 15</h1>
        <p className="lede">
          El instructor reconoce la franja de un alumno por cómo le responde — no por la edad
          escrita en el documento de identidad — y elige en consecuencia la primera palabra que
          usa.
        </p>
      </>
    ),
  },

  // 1 — lunes: activación + consolidación Cap1
  {
    day: "lunes · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>Bienvenido de nuevo. ¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada te pedí una sola cosa: contar cuántas veces, en un turno, explicas la
          misma cosa exactamente del mismo modo.
        </p>
        <p className="prompt">
          ¿Cuántas veces lo contaste? Y, pensándolo bien: ¿hubo un momento en el que cambiar de
          modo tal vez habría funcionado mejor?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidación — vuelve el Capítulo 1</h2>
        <p className="prompt">1. ¿El test VAK te dice quién eres como instructor?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — te muestra un hábito, no una identidad", correct: true },
            { value: "si", label: "Sí, es un diagnóstico fiable", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Tu canal menos usado es aquel...</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "evita", label: "Que no necesitas aprender", correct: false },
            {
              value: "allena",
              label: "En el que corres el riesgo de no pensar bajo presión — el que hay que entrenar",
              correct: true,
            },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">
          3. Si un modo de explicar no funciona, ¿lo correcto es repetirlo más despacio?
        </p>
        <OptionGroup
          name="k3"
          options={[
            { value: "falso", label: "Falso — se cambia de canal, no se repite el mismo más despacio", correct: true },
            { value: "vero", label: "Verdadero — repetirlo más despacio ayuda a entenderlo mejor", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. En el ejemplo del niño de 8 años y la braza, ¿qué canal funcionó al final?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "mostra", label: "Mostrar", correct: false },
            { value: "dice", label: "Decir", correct: false },
            { value: "sente", label: "Hacer sentir — solo después de probar los otros dos", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. En ese ejemplo, ¿el instructor se había equivocado las primeras dos veces que lo
          intentó?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "si", label: "Sí, perdió tiempo inútilmente", correct: false },
            {
              value: "no",
              label:
                "No — solo usó, uno tras otro, sus dos canales más cómodos, antes de llegar al correcto",
              correct: true,
            },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Tu perfil VAK muestra una puntuación alta en «Decir»: ¿significa que nunca debes
          usar «Mostrar»?
        </p>
        <OptionGroup
          name="k6"
          options={[
            {
              value: "no",
              label: "No — solo significa que corres el riesgo de olvidarlo bajo presión, no que haya que evitarlo",
              correct: true,
            },
            { value: "si", label: "Sí, mejor quedarse con el canal fuerte", correct: false },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martes: la tabla de las franjas
  {
    day: "martes · 15 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.c1 && !!a.c2 && !!a.c3 && !!a.c4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>No la edad. La franja.</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana aprendes a reconocer no la edad de un niño, sino su franja — y son dos
          cosas distintas.
        </p>
        <p className="lede">
          Un niño de 6 años y uno de 9 están en la misma franja. Uno de 10 y uno de 11, no. Los
          límites no siguen el cumpleaños: siguen lo que un niño puede hacer de verdad con las
          palabras que le das.
        </p>
        <div className="table-wrap">
          <table className="fasce">
            <tbody>
              <tr>
                <th>Franja</th>
                <th>Qué cambia, de verdad</th>
              </tr>
              <tr>
                <td>3-5</td>
                <td>
                  Una cosa a la vez. Una instrucción con dos pasos a menudo se pierde a mitad de
                  camino. El juego es el lenguaje mismo.
                </td>
              </tr>
              <tr>
                <td>6-10</td>
                <td>
                  Empieza a seguir dos pasos en secuencia. El «muy bien» todavía funciona, simple
                  y directo.
                </td>
              </tr>
              <tr>
                <td>11-13</td>
                <td>
                  Llega la vergüenza delante del grupo — una corrección en voz alta puede cerrar a
                  un chico el resto de la clase.
                </td>
              </tr>
              <tr>
                <td>14-18</td>
                <td>
                  Exige el porqué. Una instrucción sin motivo no se ejecuta: se discute, o se ignora.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Reconoces la franja por cómo te responde, no por cuántos años tiene. Es lo único que de
          verdad tienes que aprender hoy.
        </div>
        <p className="lede">
          Equivocarse de franja cuesta en las dos direcciones: tratar a un chico de trece años
          como a un pequeño lo hace sentir ridiculizado; tratar a un niño de siete como a un
          adulto lo pierde a mitad de frase.
        </p>
        <p className="lede">
          <strong>
            Algo que vale la pena saber ya, y que complica un poco la tabla — a propósito.
          </strong>{" "}
          La franja no es un dato fijo, ni siquiera para el mismo niño. Un chico de 13 años, solo
          contigo, sin el grupo mirando, puede parecer otra persona: más abierto, más cómodo. No
          te equivocaste al valorarlo la semana pasada. Cambió el contexto, no él. Un niño de 9
          años muy seguro de sí mismo ya puede mostrar, en ciertas situaciones, la vergüenza
          típica de los 11-13. La tabla dice dónde mirar. El niño que tienes delante en ese
          momento da la respuesta verdadera.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">
          1. ¿Un niño de 6 años logra seguir una instrucción de dos pasos seguidos?
        </p>
        <OptionGroup
          name="c1"
          options={[
            { value: "no", label: "No, nunca antes de los 10 años", correct: false },
            { value: "si", label: "Sí — a los 6 años empieza justo ahora a lograrlo", correct: true },
          ]}
          selected={answers.c1}
          onPick={(v, correct) => setResponse("c1", v, correct)}
        />
        <p className="prompt">2. ¿Qué cambia de verdad para un chico de 15 años respecto a uno de 10?</p>
        <OptionGroup
          name="c2"
          options={[
            { value: "perche", label: "Exige el porqué — una instrucción sin motivo no la ejecuta", correct: true },
            { value: "parole", label: "Entiende palabras más difíciles", correct: false },
          ]}
          selected={answers.c2}
          onPick={(v, correct) => setResponse("c2", v, correct)}
        />
        <p className="prompt">
          3. Un chico de 13 años, sin el grupo alrededor, se comporta más «como un pequeño» de lo
          habitual, abierto y sin vergüenza. ¿Es una contradicción?
        </p>
        <OptionGroup
          name="c3"
          options={[
            { value: "si", label: "Sí, significa que te habías equivocado con su franja de edad", correct: false },
            {
              value: "no",
              label: "No — la franja de edad también se lee según el contexto: sin el grupo, la vergüenza pesa mucho menos",
              correct: true,
            },
          ]}
          selected={answers.c3}
          onPick={(v, correct) => setResponse("c3", v, correct)}
        />
        <p className="prompt">
          4. ¿Un niño de 9 años muy seguro de sí mismo puede ya mostrar, en ciertas situaciones,
          reacciones típicas de la franja 11-13?
        </p>
        <OptionGroup
          name="c4"
          options={[
            {
              value: "si",
              label: "Sí — los límites son orientativos: se lee la respuesta, no el documento de identidad",
              correct: true,
            },
            { value: "no", label: "No, nunca antes de cumplir 10 años", correct: false },
          ]}
          selected={answers.c4}
          onPick={(v, correct) => setResponse("c4", v, correct)}
        />
      </>
    ),
  },

  // 3 — miércoles: ejemplo + aplicación + simulación
  {
    day: "miércoles · 20 min",
    pct: 55,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "pubblico" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Cuatro niños, cuatro franjas, la misma atención</h1>
        <div className="card scene">
          <div className="who">Sofía, 5 años</div>
          <p>
            Se desliza mal de espaldas. En lugar de una larga corrección técnica, el instructor
            dice: «¡haz la estrella de mar!» — una imagen, una sola palabra. Sofía abre los
            brazos y el cuerpo se estira solo.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Tommaso, 9 años</div>
          <p>
            Tiene que aprender una entrada en dos tiempos. El instructor da la instrucción entera,
            seguida: «primero estiras los brazos, luego empujas con las piernas.» Tommaso la
            ejecuta en orden — a los 5 años habría sido casi imposible, a los 9 ya es normal.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Giacomo, 12 años</div>
          <p>
            Está haciendo mal un ejercicio técnico. El instructor, por costumbre, dice delante de
            todo el grupo: «Giacomo, mira que estás todo torcido, ¡relaja la espalda!» Giacomo
            se sonroja, se pone rígido, y evita el ejercicio el resto de la clase.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Andrés, 16 años</div>
          <p>
            Está aprendiendo un viraje más técnico que el que usaba hasta ahora. Siguiendo la
            costumbre adoptada con los más pequeños, el instructor le muestra el movimiento y
            solo dice «hazlo así». Andrés lo prueba de forma mecánica, luego pregunta: «¿pero por
            qué se hace así, no era más rápido el otro modo?» El instructor añade, en dos frases,
            por qué esa técnica gana tiempo justo donde él pierde velocidad. Andrés asiente, y
            esta vez le pone verdadero empeño.
          </p>
        </div>
        <p className="lede">
          El mismo respeto, aplicado de cuatro modos opuestos — con Giacomo bastaba acercarse y
          decirle lo mismo solo a él; con Andrés bastaba añadir el porqué que su franja exige.
        </p>
        <p className="prompt">
          Giacomo está repitiendo el mismo error. El grupo está cerca y puede oír. Reescribe la
          corrección — mismo contenido técnico, pero del modo correcto para su franja.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca dos cosas — que
            la corrección se mantenga privada (te acercas, bajas la voz, no gritas desde lejos) y
            que no apunte a la persona («estás todo torcido») sino al comportamiento («la espalda
            se está doblando»). */}
        <h2>Simulación</h2>
        <p className="lede">
          <strong>GIACOMO, 12 años.</strong> Acaba de cometer el mismo error. El grupo está
          cerca. ¿Qué haces?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "pubblico", label: "Se lo digo en voz alta, desde donde estoy — de todos modos es correcto" },
            { value: "privato", label: "Me acerco y se lo digo en voz baja, solo a él" },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "pubblico" && (
          <div className="feedback retry">
            GIACOMO: <em>(no responde, mira hacia otro lado, encoge los hombros)</em> «...vale.»{" "}
            <em>(el ejercicio se cierra aquí por hoy)</em>
            <br />
            Mismo contenido, pero desde lejos y delante de todos — a esta franja le cuesta más de
            lo que parece.
          </div>
        )}
        {answers.sim === "privato" && (
          <div className="feedback ok">
            GIACOMO: <em>(lo intenta de nuevo enseguida, sin esperar)</em> «...ah, vale, lo
            intento.»
            <br />
            Mismo error, misma corrección — solo cambia dónde y cómo lo has dicho.
          </div>
        )}
        {answers.sim === "privato" && (
          <>
            <p className="lede" style={{ marginTop: 14 }}>
              Giacomo lo intenta de nuevo. El movimiento mejora, pero todavía no es perfecto. Se
              gira hacia ti, no del todo seguro: «...ya está mejor, ¿no?»
            </p>
            <p className="prompt">Escribe qué le respondes ahora.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "specifico", label: "«Sí — los hombros ya están más bajos, se nota la diferencia»" },
                { value: "generico", label: "«Muy bien, sigue así»" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "specifico" && (
              <div className="feedback ok">
                GIACOMO se ilumina un poco, y lo intenta de nuevo con más seguridad — sabe
                exactamente qué funcionó, no solo que «va mejor».
              </div>
            )}
            {answers.sim2 === "generico" && (
              <div className="feedback retry">
                GIACOMO asiente, pero la duda sigue igual: no sabe qué exactamente ha mejorado,
                así que no sabe qué repetir a propósito en el siguiente intento.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — turno en la piscina
  {
    day: "en la piscina",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Adivina la franja, antes de mirar la edad</h1>
        <p className="lede">
          Esta semana elige un alumno e intenta adivinar su franja por cómo te responde — no por
          la edad que ya sabes. Luego, solo después, comprueba si tenías razón.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>
          No hace falta acertar. Hace falta haberse hecho la pregunta antes de dar la edad por
          sentada.
        </p>
        <p className="prompt">
          Un chico de 16 años, durante el calentamiento, pregunta: «¿pero por qué siempre tenemos
          que hacer este ejercicio tan aburrido?» — no lo dice para protestar, parece una
          pregunta de verdad. ¿Qué respondes, en una frase?
        </p>
        <Field id="q13" value={answers.q13 ?? ""} onChange={(v) => setReflection("q13", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca un motivo
            práctico y directo — ni una orden («porque lo digo yo») ni una lección larga. */}
      </>
    ),
  },

  // 5 — viernes test acumulativo
  {
    day: "viernes · 12 min",
    pct: 85,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — test acumulativo: Capítulo 1 + Capítulo 2</div>
        <h1>El test</h1>
        <p className="prompt">
          1. Marco tiene 5 años y Elena 13 — ninguno de los dos entra solo al agua. ¿La misma
          frase para convencerlos a ambos?
        </p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Sí, el miedo es el mismo a cualquier edad", correct: false },
            {
              value: "no",
              label: "No — a los 5 años un juego o una mano tendida, a los 13 que no la miren mientras duda",
              correct: true,
            },
            { value: "carattere", label: "Depende solo del carácter", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. Un chico de 15 años pregunta: «¿por qué tengo que hacer justo este ejercicio?». Respondes:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "dico", label: "«Porque lo digo yo, ahora hazlo»", correct: false },
            { value: "bracciata", label: "«Porque te alarga la brazada — pruébalo y siente la diferencia»", correct: true },
            { value: "ignoro", label: "Ignoras la pregunta y repites la instrucción", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">
          3. Verdadero o falso: la franja de edad se reconoce mejor por cómo responde que por el
          documento de identidad.
        </p>
        <OptionGroup
          name="t3"
          options={[
            { value: "vero", label: "Verdadero", correct: true },
            { value: "falso", label: "Falso", correct: false },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. ¿Un niño de 6 años logra seguir una instrucción de dos pasos seguidos?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "no", label: "No, todavía no", correct: false },
            { value: "si", label: "Sí — a los 6 años empieza justo ahora", correct: true },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">5. ¿Funciona tratar a un niño de 7 años con una larga explicación técnica, como a un adulto?</p>
        <OptionGroup
          name="t5"
          options={[
            { value: "no", label: "No — lo pierdes a mitad de camino, aunque parezca escuchar", correct: true },
            { value: "si", label: "Sí, si es clara", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. <em>(del Capítulo 1)</em> Tu canal VAK menos usado es aquel que hay que...
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "evita", label: "Evitar, porque no se te da bien", correct: false },
            {
              value: "allena",
              label: "Entrenar, porque es aquel en el que corres el riesgo de no pensar bajo presión",
              correct: true,
            },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. ¿Equivocarse de franja de edad cuesta solo en una dirección?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sí, solo si lo tratas demasiado como a un pequeño", correct: false },
            { value: "no", label: "No — cuesta en las dos direcciones", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un chico de 13 años, sin el grupo alrededor, se comporta de forma más abierta y
          menos torpe de lo habitual. ¿Qué significa?
        </p>
        <OptionGroup
          name="t8"
          options={[
            {
              value: "contesto",
              label: "Que la franja de edad también se lee según el contexto — sin el grupo, la vergüenza pesa mucho menos",
              correct: true,
            },
            { value: "sbagliato", label: "Que te habías equivocado al valorar su franja de edad", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. Andrés, 16 años, hace un ejercicio nuevo de forma mecánica hasta que le explicas
          también el porqué. ¿Qué le faltaba de verdad?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "attenzione", label: "Atención", correct: false },
            {
              value: "motivo",
              label: "Un motivo — a esta edad, una imagen o una orden solas a menudo no bastan",
              correct: true,
            },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Un niño de 11 años, delante del grupo, hace mal un ejercicio que ya sabía hacer.
          ¿Qué haces primero, incluso antes de corregirlo?
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 6 — feedback: explica cómo funciona la corrección (§10, D34)
  {
    day: "viernes · feedback",
    pct: 87,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Esto es lo que dicen tus respuestas</h1>
        <p className="lede">No sobre ti — sobre lo que has hecho en estas preguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Ejemplo de feedback generado, en caso de error en la pregunta 1:
        </p>
        <div className="card quote">
          Respondiste que sirve la misma frase para los dos. Repasa las dos edades: a los 5 años
          el miedo se supera con un juego o una presencia física cercana; a los 13, a menudo, el
          problema ya no es solo el agua — es que los demás lo vean dudar. Misma emoción de
          partida, obstáculo distinto.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          El feedback nunca dice solo «te has equivocado»: dice qué mirar la próxima vez. El tono
          siempre está sobre el comportamiento observado, nunca sobre la persona (ver Capítulo 7,
          que retomará justo esta regla).
        </p>
      </>
    ),
  },

  // 7 — recuperación: solo si el test del viernes tiene demasiados errores (§12, D25/D27)
  {
    day: "recuperación",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const correctAnswers: Record<string, string> = {
        t1: "no", t2: "bracciata", t3: "vero", t4: "si", t5: "no",
        t6: "allena", t7: "no", t8: "contesto", t9: "motivo",
      };
      const wrong = Object.entries(correctAnswers).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el test encontró alguna dificultad</div>
        <h1>Tres ejemplos más, para entrenar el ojo</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algunos ejemplos más — misma edad, reacciones distintas.
        </p>

        <div className="card scene">
          <div className="who">Dos niños, ambos de 10 años</div>
          <p>
            Mismo grupo. Al primero, después de un error, le dices delante de los demás «venga,
            inténtalo otra vez, tranquilo» — se encoge de hombros y lo intenta enseguida. Al
            segundo le dices la frase idéntica — se bloquea, se sonroja, y evita ese ejercicio el
            resto del turno.
          </p>
        </div>
        <p className="prompt">¿Están en la misma franja funcional?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Sí, tienen la misma edad", correct: false },
            {
              value: "no",
              label: "No — el primero todavía responde como 6-10, el segundo ya tiene la vergüenza típica de 11-13",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Martina, 11 años</div>
          <p>
            En grupo, una corrección en voz alta la cierra el resto de la clase — típico de
            11-13. La semana siguiente, sola contigo en una recuperación individual, la misma
            corrección exacta no la afecta en nada: responde y lo intenta de nuevo enseguida,
            simple, directa.
          </p>
        </div>
        <p className="prompt">¿Te equivocaste al valorar su franja la primera vez?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "no",
              label: "No — cambió el contexto (el grupo mirando), no ella",
              correct: true,
            },
            { value: "si", label: "Sí, la primera valoración era errónea", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Dos chicos, ambos de 12 años</div>
          <p>
            Les das a ambos la misma instrucción de dos pasos seguidos. El primero la sigue sin
            perderse. El segundo se pierde a mitad de camino, como haría un niño más pequeño, y te
            pide que repitas solo la primera parte.
          </p>
        </div>
        <p className="prompt">¿Al segundo hay que tratarlo como si tuviera 7 años?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Sí, en esto hay que tratarlo como a un niño pequeño", correct: false },
            {
              value: "no",
              label: "No — en esta tarea específica necesita un paso a la vez, pero sigue siendo 11-13 para todo lo demás",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          La tabla de franjas dice dónde mirar. El niño que tienes delante en ese momento, con ese
          grupo, en ese día, da la respuesta verdadera.
        </p>
      </>
    ),
  },

  // 8 — resultado
  {
    day: "viernes · resultado",
    pct: 95,
    nextLabel: "Ir al Panel ▸",
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
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>De dónde sale</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  knowledge_score
                </td>
                <td style={{ padding: "6px 0" }}>Las 10 preguntas del test</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  application_score
                </td>
                <td style={{ padding: "6px 0" }}>La corrección que reescribiste en §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  simulation_score
                </td>
                <td style={{ padding: "6px 0" }}>Cómo manejaste a Giacomo en §8, en los dos intercambios</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  reflection_score
                </td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 1</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  transfer_score
                </td>
                <td style={{ padding: "6px 0" }}>La respuesta del martes, sobre el chico de 16 años</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>
                  competency_score — Reconocimiento del alumno
                </td>
                <td style={{ padding: "6px 0" }}>La más baja de las anteriores</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },

  // 9 — panel
  {
    day: "panel",
    pct: 100,
    nextLabel: null,
    showBack: true,
    canNext: () => false,
    render: ({ vakProfile, answers }: StepContext) => (
      <>
        <div className="done-badge">✓ Capítulo 2 completado</div>
        <div className="eyebrow">Semana 2 de 10 · Capítulo 3 próximamente</div>
        <h1>Observar y entender</h1>
        <p className="lede">
          Hoy has aprendido a reconocer quién tienes delante. La próxima semana aprendes a leer
          qué le está pasando en ese momento preciso.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="es" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="es" />
        <h2>Tu progreso</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Conciencia personal</span>
            <span className="state">consolidada</span>
          </div>
          <div className="chip acquisita">
            <span className="name">2 · Reconocimiento del alumno</span>
            <span className="state">adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">4 · Sintonía</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">5 · Instrucciones y congruencia</span>
            <span className="state">no adquirida</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">6 · Verificar con la acción <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">no adquirida</span>
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
