import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traducción al español, no un capítulo independiente: mismos chapterId/claves de respuesta/valores
// internos del capítulo italiano (src/lib/chapters/capitolo-3.tsx) — solo cambia el texto visible.

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

// Porta 1:1 la funzione simPath() del mockup: classifica la combinazione delle prime due
// scelte della simulazione con Luca in un percorso "aperta" (c'è un terzo scambio, a testo
// libero) o "chiusa" (la scena si chiude senza terzo scambio).
function simPath(answers: Record<string, string>): "aperta" | "chiusa" {
  if (answers.sim1 === "curioso" && answers.sim2 === "scalda") return "aperta";
  if (answers.sim1 === "diretto" && answers.sim2 === "calma") return "aperta";
  return "chiusa";
}

const K1_OPTIONS: Option[] = [
  { value: "si", label: "Sí, el miedo es igual a cualquier edad", correct: false },
  { value: "no", label: "No — a los 5 años, un juego o una mano tendida; a los 13, que nadie la mire mientras duda", correct: true },
];
const K2_OPTIONS: Option[] = [
  { value: "bracciata", label: "«Porque alarga tu brazada — pruébalo y siente la diferencia»", correct: true },
  { value: "dico", label: "«Porque lo digo yo, hazlo ya»", correct: false },
];
const K3_OPTIONS: Option[] = [
  { value: "risponde", label: "Por cómo responde", correct: true },
  { value: "carta", label: "Por el carné de identidad", correct: false },
];
const K4_OPTIONS: Option[] = [
  { value: "eta", label: "Lo tratas según la edad que tiene en el papel", correct: false },
  { value: "comportamento", label: "Lo tratas según el comportamiento que muestra", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No — la franja de edad también se lee del contexto", correct: true },
  { value: "si", label: "Sí, lo habías valorado mal", correct: false },
];
const K6_OPTIONS: Option[] = [
  { value: "si", label: "Sí, si es clara", correct: false },
  { value: "no", label: "No — la pierde a mitad de camino, aunque parezca que escucha", correct: true },
];

const M1_OPTIONS: Option[] = [
  { value: "freddo", label: "Frío", correct: true },
  { value: "paura", label: "Miedo", correct: false },
  { value: "via", label: "Espera tu permiso", correct: false },
  { value: "capito", label: "No ha entendido", correct: false },
];
const M2_OPTIONS: Option[] = [
  { value: "paura", label: "Miedo", correct: false },
  { value: "freddo", label: "Frío", correct: false },
  { value: "via", label: "Espera tu permiso", correct: true },
  { value: "capito", label: "No ha entendido", correct: false },
];
const M3_OPTIONS: Option[] = [
  { value: "via", label: "Espera tu permiso", correct: false },
  { value: "freddo", label: "Frío", correct: false },
  { value: "capito", label: "No ha entendido — la instrucción todavía no está clara, hay que explicarla de nuevo, un gesto no basta", correct: true },
  { value: "paura", label: "Miedo", correct: false },
];
const M4_OPTIONS: Option[] = [
  { value: "no", label: "No, las cuatro señales siempre quedan separadas y fijas", correct: false },
  { value: "si", label: "Sí — la señal puede cambiar mientras observas, si la espera se alarga demasiado", correct: true },
];

const SIM1_OPTIONS: Option[] = [
  { value: "diretto", label: "«Vamos Luca, ya lo has hecho antes, entra»" },
  { value: "curioso", label: "«Luca, ¿qué sientes? ¿Está fría, o tienes un poco de escalofríos?»" },
];
const SIM2_OPTIONS_DIRETTO: Option[] = [
  { value: "insisti", label: "«Vamos Luca, sabes hacerlo, va»" },
  { value: "calma", label: "Te acercas, bajas la voz, le preguntas con calma qué siente" },
];
const SIM2_OPTIONS_CURIOSO: Option[] = [
  { value: "entra", label: "Le haces entrar de todas formas, diciendo que el frío se pasará en el agua" },
  { value: "scalda", label: "Le propones treinta segundos de movimiento fuera del agua, en el borde, como con Giada" },
];

const T1_OPTIONS: Option[] = [
  { value: "capito", label: "No ha entendido", correct: false },
  { value: "paura", label: "Tiene miedo", correct: true },
  { value: "freddo", label: "Tiene frío", correct: false },
  { value: "via", label: "Espera tu permiso", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "paura", label: "Tiene miedo", correct: false },
  { value: "capito", label: "No ha entendido", correct: false },
  { value: "via", label: "Espera tu permiso", correct: true },
  { value: "freddo", label: "Tiene frío", correct: false },
];
const T3_OPTIONS: Option[] = [
  { value: "calore", label: "Le falta calor — probablemente tiene frío", correct: true },
  { value: "coraggio", label: "Le falta valor", correct: false },
  { value: "spiegazione", label: "Le falta una explicación más clara", correct: false },
];
const T4_OPTIONS: Option[] = [
  { value: "tecnica", label: "Una explicación técnica, como a un adulto", correct: false },
  { value: "motivo", label: "Un motivo práctico y directo", correct: true },
  { value: "niente", label: "Ninguna respuesta, simplemente se hace", correct: false },
];
const T5_OPTIONS: Option[] = [
  { value: "si", label: "Sí — si miras con atención, entiendes automáticamente qué está pasando", correct: false },
  { value: "no", label: "No — mirar es ver que ha pasado algo, entender es decidir qué significa", correct: true },
];
const T6_OPTIONS: Option[] = [
  { value: "no", label: "No — igual enseña algo, muchas veces lo contrario", correct: true },
  { value: "si", label: "Sí, lo importante es intentarlo", correct: false },
];
const T7_OPTIONS: Option[] = [
  { value: "si", label: "Sí, si las respuestas son correctas", correct: false },
  { value: "no", label: "No — siempre hace falta al menos una clase real en el agua", correct: true },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "No, las cuatro señales siempre quedan separadas", correct: false },
  { value: "si", label: "Sí — la señal puede cambiar mientras observas, si la espera se alarga", correct: true },
];
const T9_OPTIONS: Option[] = [
  { value: "misto", label: "Una mezcla entre esperar el permiso y la vergüenza de un grupo nuevo que la mira", correct: true },
  { value: "dimenticato", label: "Se ha olvidado de cómo se tira", correct: false },
  { value: "acqua", label: "Tiene miedo del agua", correct: false },
];

const DIARY_KEYS = ["q2", "q7", "sim3", "qtrasf", "t10"];

export const capitolo3StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 3 · MIRAR Y ENTENDER <i className="ph-duotone ph-trophy" aria-hidden="true" /></div>
        <h1>Se ha parado: ¿tiene miedo o no ha entendido?</h1>
        <p className="lede">
          Ante un niño que se para, se bloquea o duda, el instructor sabe distinguir entre cuatro
          causas distintas — y sabe que cada una necesita una respuesta diferente.
        </p>
        <div className="card warn">
          <strong>Un nivel más alto.</strong> Cada competencia de este curso pasa por una escala de
          niveles, en orden: <strong>EN DESARROLLO → ADQUIRIDA → CONSOLIDADA → EXCELENTE</strong> —
          pero solo en dos, marcadas con el símbolo <i className="ph-duotone ph-trophy" aria-hidden="true" />, el curso pide llegar más lejos: a{" "}
          <strong>EXCELENTE</strong>. Esta (Mirar y entender) y el Capítulo 6 (Verificar con la
          acción) son las dos competencias de la escucha: aquí ADQUIRIDA no basta, hace falta
          EXCELENTE antes del examen final — y la simulación sola nunca es suficiente: siempre hace
          falta al menos una clase real en el agua.
        </div>
      </>
    ),
  },

  // 1 — lunes: reflexión + consolidación Capítulo 2
  {
    day: "lunes · 10 min",
    pct: 10,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en el agua?</h1>
        <p className="lede">
          La semana pasada el Capítulo 2 te pidió una sola cosa: elegir a un alumno y entender su
          franja de edad por cómo te respondía, no por su edad. Cuenta en dos líneas qué notaste.
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidación — vuelve el Capítulo 2</h2>
        <p className="prompt">1. Marco (5 años) y Elena (13 años) no entran al agua solos. ¿La misma frase para los dos?</p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, correct) => setResponse("k1", v, correct)} />
        <p className="prompt">2. Un chico de 15 años pregunta: «¿por qué tengo que hacer justo este ejercicio?». Respondes:</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, correct) => setResponse("k2", v, correct)} />
        <p className="prompt">3. ¿La franja de edad se reconoce mejor por cómo responde o por el carné de identidad?</p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, correct) => setResponse("k3", v, correct)} />
        <p className="prompt">4. Un niño de 10 años se comporta como uno de 12 — busca intimidad antes de que lo corrijan. ¿Qué haces?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, correct) => setResponse("k4", v, correct)} />
        <p className="prompt">5. Un chico de 13 años, solo contigo sin el grupo, se muestra más abierto de lo normal. ¿Es una contradicción?</p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, correct) => setResponse("k5", v, correct)} />
        <p className="prompt">6. ¿Funciona tratar a un niño de 7 años con una larga explicación técnica, como a un adulto?</p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, correct) => setResponse("k6", v, correct)} />
      </>
    ),
  },

  // 2 — martes: las cuatro causas
  {
    day: "martes · 14 min",
    pct: 28,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3 && !!a.m4,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Mirar y entender no son lo mismo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Esta semana aprendes a hacer dos cosas que parecen una sola, y no lo son: mirar, y
          entender lo que estás mirando.
        </p>
        <p className="lede">
          Un niño se para en el borde de la piscina, justo antes de un salto que ya ha hecho diez
          veces. <strong>Mirar</strong> es ver que se ha parado — eso lo ve cualquiera.{" "}
          <strong>Entender</strong> es la parte difícil: esa pausa puede significar cuatro cosas
          distintas.
        </p>
        <div className="table-wrap">
          <table className="cause">
            <tbody>
              <tr>
                <th>Tiene...</th>
                <th>Y la señal es...</th>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-waves" aria-hidden="true" /> Miedo</td>
                <td>El cuerpo se pone rígido, los ojos se quedan fijos en el agua, no en ti</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-question" aria-hidden="true" /> No ha entendido</td>
                <td>Te mira, dudando — espera una señal que no llega</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-snowflake" aria-hidden="true" /> Frío</td>
                <td>Los brazos se aprietan al cuerpo, puede que tiemble un poco — sin rigidez, sin buscar tu mirada</td>
              </tr>
              <tr>
                <td><i className="ph-duotone ph-eye" aria-hidden="true" /> Espera tu permiso</td>
                <td>Te busca con los ojos antes de moverse — necesita que le des paso</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="card quote">
          Si respondes con lo que no toca, ese niño aprende algo de todas formas — solo que no es
          lo que querías enseñarle.
        </div>
        <p className="lede">
          <strong>
            Una última cosa, antes de seguir: la tabla se complica a propósito, igual que la franja
            de edad en el capítulo anterior.
          </strong>{" "}
          Un niño no se queda quieto como en una foto: la señal puede cambiar mientras lo observas,
          sobre todo si tardas demasiado en responder. Un niño que al principio solo espera tu
          permiso — ojos en ti, cuerpo tranquilo — puede cambiar si tardas demasiado en responder.
          El silencio largo se convierte él mismo en una señal: le parece que algo no va bien. Y así
          lo que era «espera el permiso» empieza a convertirse en miedo de verdad. Observar no es
          hacer una sola foto: es seguir mirando incluso después de haber decidido una respuesta.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de jornada</h2>
        <p className="prompt">1. Hombros apretados, ligero temblor, no busca tu mirada.</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, correct) => setResponse("m1", v, correct)} />
        <p className="prompt">2. Te busca con los ojos antes de moverse, cuerpo no tenso.</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, correct) => setResponse("m2", v, correct)} />
        <p className="prompt">
          3. Acabas de mostrar un ejercicio nuevo, que nunca había hecho. El niño entra al agua, se
          para a mitad de camino, te mira — no está esperando un gesto para seguir: parece que
          realmente no sabe qué hacer ahora.
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, correct) => setResponse("m3", v, correct)} />
        <p className="prompt">
          4. Un niño que solo está esperando tu permiso, si tardas demasiado en responderle, ¿puede
          empezar a mostrar señales de miedo de verdad?
        </p>
        <OptionGroup name="m4" options={M4_OPTIONS} selected={answers.m4} onPick={(v, correct) => setResponse("m4", v, correct)} />
      </>
    ),
  },

  // 3 — miércoles: cinco niños, cinco lecturas + simulación con Luca (tres intercambios)
  {
    day: "miércoles",
    pct: 44,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => {
      if (!a.sim1) return false;
      if (!a.sim2) return false;
      const path = simPath(a);
      if (path === "aperta") return !!a.sim3;
      return true;
    },
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const promptStyle = {
        fontSize: ".8rem",
        textTransform: "uppercase" as const,
        letterSpacing: ".03em",
        color: "var(--surface)",
        fontFamily: "var(--mono)",
        fontWeight: 700,
      };
      const sim2Options = answers.sim1 === "diretto" ? SIM2_OPTIONS_DIRETTO : SIM2_OPTIONS_CURIOSO;
      const path = answers.sim1 && answers.sim2 ? simPath(answers) : null;

      return (
        <>
          <div className="eyebrow">Miércoles</div>
          <h1>Cinco niños, cinco lecturas</h1>
          <div className="card scene">
            <div className="who">Sofía, 4 años</div>
            <p>
              Un pie en el agua hasta el tobillo, quieta. Hombros arriba, apretados; ojos fijos en
              el agua, no lo busca. Es miedo, no incomprensión. El instructor se pone a su lado, le
              tiende la mano: «ven, yo te sujeto.»
            </p>
          </div>
          <div className="card scene">
            <div className="who">Leo, 6 años</div>
            <p>
              Acaba de ver al instructor mostrar dos veces un ejercicio nuevo, que nunca había
              hecho. Entra al agua y se para enseguida, cuerpo tranquilo, sin temblores. Mira al
              instructor — pero no con la mirada de quien espera un gesto: está buscando algo que
              no encuentra. No ha entendido, un gesto no le sirve: el instructor repite la secuencia
              una vez más, más despacio, aislando solo los brazos. Leo la repite enseguida, sin
              volver a pararse.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Giada, 8 años</div>
            <p>
              Brazos apretados alrededor del cuerpo, hombros encogidos, un ligero temblor en las
              manos. No busca la mirada del instructor, no tiene los ojos fijos y asustados. Es
              solo frío. Treinta segundos de movimiento fuera del agua, en el borde, antes de
              dejarla entrar.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Nadia, 12 años</div>
            <p>
              Tiene que repetir un salto que ya le sale bien, pero hoy el grupo es distinto del
              habitual — algunos chicos mayores, que han venido por una sustitución. Se para en el
              borde: no tiembla, el cuerpo no está tenso, pero busca la mirada del instructor dos,
              tres veces, sin decir nada. No es miedo al salto: eso ya sabe hacerlo. Y tampoco es
              solo «esperar el permiso». También está la vergüenza por el grupo nuevo — la misma de
              la que hablaba el Capítulo 2 para esta edad. El instructor no dice nada en voz alta:
              solo le hace un pequeño gesto, el mismo que le haría si el grupo fuera el de siempre.
              Nadia se tira.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Matteo, 14 años</div>
            <p>
              Quieto en el bloque de salida, el grupo lo mira. El cuerpo está tenso de otra manera,
              los ojos buscan al instructor un instante. No es el agua: es la fila que lo mira. El
              instructor baja la voz, solo para él: «tómate un segundo, yo espero.»
            </p>
          </div>
          <p className="lede">
            <strong>
              Misma pausa, cinco niños, cinco lecturas distintas — las cinco correctas, justo
              porque son distintas.
            </strong>{" "}
            Con Nadia, como con Matteo, el gesto silencioso funcionó mejor que cualquier frase. Con
            Leo, en cambio, un gesto no habría servido de nada: faltaba la explicación, no el
            permiso.
          </p>
          <p className="prompt">
            Un niño de 7 años, parado a mitad de un largo a braza. No sabes si tiene miedo, si no
            recuerda el movimiento, o si espera una señal tuya. ¿Qué le dices — o qué le preguntas —
            para entenderlo, ANTES de darle una instrucción nueva?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para la corrección, no mostrada al instructor: no existe una única respuesta
              correcta. El sistema busca una cosa — que esté preguntando, no suponiendo. Una
              instrucción directa cierra la información, sea cual sea la causa real. */}
          <h2>Simulación — tres intercambios para meter a Luca en el agua</h2>
          <p className="lede">
            <strong>LUCA, 9 años.</strong> En el borde de la piscina, un pie dentro, no entra. El
            grupo espera.
          </p>
          <p className="prompt" style={promptStyle}>Primer intercambio</p>
          <p className="lede">¿Qué le dices primero?</p>
          <OptionGroup name="sim1" options={SIM1_OPTIONS} selected={answers.sim1} onPick={(v) => setResponse("sim1", v)} />
          {answers.sim1 === "diretto" && (
            <div className="feedback retry">
              LUCA: <em>(se aleja medio paso, el pie sale del agua)</em> «...pero yo no quiero.»
              <br />
              Una instrucción directa ha cerrado la información que te faltaba, fuera cual fuera la
              causa real.
            </div>
          )}
          {answers.sim1 === "curioso" && (
            <div className="feedback ok">
              LUCA: <em>(señala los brazos, se abraza un poco)</em> «...tengo escalofríos.»
              <br />
              Una pregunta abierta te ha dado la información: es frío, no miedo. Luca se abre en
              vez de cerrarse.
            </div>
          )}

          {answers.sim1 && (
            <>
              <p className="prompt" style={promptStyle}>Segundo intercambio</p>
              {answers.sim1 === "diretto" ? (
                <p className="lede">
                  El grupo sigue esperando, y Luca está ahora más lejos del borde. ¿Qué le dices
                  ahora?
                </p>
              ) : (
                <p className="lede">
                  Sigue teniendo frío, y el grupo espera. ¿Qué haces ahora — no solo qué dices?
                </p>
              )}
              <OptionGroup name="sim2" options={sim2Options} selected={answers.sim2} onPick={(v) => setResponse("sim2", v)} />
              {answers.sim2 === "insisti" && (
                <div className="feedback retry">
                  LUCA se aleja otro paso, ya no responde — se queda callado, mira hacia otro lado.
                </div>
              )}
              {answers.sim2 === "calma" && (
                <div className="feedback ok">
                  LUCA: «...no sé, no me apetece y ya está.»{" "}
                  <em>(se detiene, ya no se aleja más — no es una información clara, pero el contacto ha vuelto)</em>
                </div>
              )}
              {answers.sim2 === "entra" && (
                <div className="feedback retry">
                  LUCA duda todavía más, se abraza más fuerte — no se siente creído, y ahora tiene
                  incluso menos ganas de entrar que antes.
                </div>
              )}
              {answers.sim2 === "scalda" && (
                <div className="feedback ok">
                  LUCA entra en calor, se abraza un poco menos, y empieza a acercarse al borde por
                  su cuenta, sin que tengas que decírselo otra vez.
                </div>
              )}
            </>
          )}

          {path === "aperta" && (
            <>
              <p className="prompt" style={promptStyle}>Tercer intercambio — el cierre</p>
              <p className="lede">
                Luca está ahora cerca del borde, todavía un poco dudoso pero no cerrado. Escribe lo
                último que le dices antes de que entre.
              </p>
              <Field id="sim3" value={answers.sim3 ?? ""} onChange={(v) => setReflection("sim3", v)} />
              <p className="lede" style={{ fontSize: ".85rem" }}>Cualquier respuesta razonable cierra bien la escena.</p>
              <div className="feedback ok" style={{ marginTop: 10 }}>
                LUCA entra, un pie tras otro, pero entra. No has ganado nada — solo has entendido,
                en vez de adivinar.
              </div>
            </>
          )}
          {path === "chiusa" && (
            <>
              <p className="prompt" style={promptStyle}>La escena se cierra aquí — hoy no</p>
              <div className="feedback retry">
                El grupo, mientras tanto, ha seguido adelante sin Luca. Luca se queda en el borde,
                callado. No es un fracaso: es información. Fuera lo que fuera, hoy no lo has
                encontrado a tiempo. Lo que importa es qué haces la próxima vez que se pare — no lo
                que ha pasado hoy.
              </div>
            </>
          )}
        </>
      );
    },
  },

  // 4 — miércoles por la noche: transferencia
  {
    day: "miércoles por la noche",
    pct: 58,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de jornada — transferencia</div>
        <h1>Una escena nunca vista</h1>
        <p className="lede">
          Un niño de 10 años se para a mitad de un ejercicio. Mira al frente, no tiembla, no te
          busca con los ojos — pero respira más corto de lo habitual.
        </p>
        <p className="prompt">¿Qué causa te parece más probable, y por qué? Escribe tu razonamiento, no solo la respuesta.</p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no mostrada al instructor: no está en la tabla de forma
            directa — es intencional: suele ser cansancio, un caso que se parece a las cuatro
            causas y no es exactamente ninguna. El sistema comprueba si sigue observando, no si
            tiene la respuesta exacta. */}
      </>
    ),
  },

  // 5 — en el agua
  {
    day: "en el agua",
    pct: 66,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en el agua</div>
        <h1>Párate un segundo tú primero</h1>
        <p className="lede">
          Con el primer niño que se pare o dude, antes de decir nada: párate un segundo tú primero,
          y decide cuál de las cuatro causas te parece más probable. Después responde a esa, no a
          la primera frase que se te ocurra.
        </p>
        <p className="lede" style={{ fontStyle: "italic" }}>No hace falta acertar. Hace falta habértelo preguntado antes de hablar.</p>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Si esta semana no tienes turno: el capítulo se desbloquea igual con una simulación
          reforzada — pero eso no basta para llevar esta competencia a EXCELENTE. Para eso hace
          falta, tarde o temprano, una clase real en el agua.
        </p>
      </>
    ),
  },

  // 6 — viernes: test acumulativo
  {
    day: "viernes · 11 min",
    pct: 86,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — test acumulativo: Capítulo 2 + Capítulo 3</div>
        <h1>El test</h1>
        <p className="prompt">
          1. Un niño de 12 años se bloquea antes de un salto que ya ha hecho. No te mira, mira
          fijo el agua, hombros tensos hacia arriba.
        </p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, correct) => setResponse("t1", v, correct)} />
        <p className="prompt">2. Una niña de 5 años se para y te busca con los ojos, sin tensión en el cuerpo.</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, correct) => setResponse("t2", v, correct)} />
        <p className="prompt">3. Tiembla ligeramente, brazos apretados al cuerpo, pero no busca tu mirada y no tiene los hombros rígidos.</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, correct) => setResponse("t3", v, correct)} />
        <p className="prompt">
          4. <em>(del Capítulo 2)</em> Un chico de 16 años pregunta el porqué de un ejercicio. La
          respuesta correcta para su franja de edad es:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, correct) => setResponse("t4", v, correct)} />
        <p className="prompt">5. ¿Mirar y entender son lo mismo?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, correct) => setResponse("t5", v, correct)} />
        <p className="prompt">6. ¿Responder a la causa equivocada es un error neutro?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, correct) => setResponse("t6", v, correct)} />
        <p className="prompt">7. Para esta competencia, ¿basta una buena simulación para llegar a EXCELENTE?</p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, correct) => setResponse("t7", v, correct)} />
        <p className="prompt">
          8. Un niño que solo está esperando tu permiso, si tardas demasiado en responder, ¿puede
          empezar a mostrar señales de miedo de verdad?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, correct) => setResponse("t8", v, correct)} />
        <p className="prompt">
          9. Nadia, 12 años, duda ante un salto que ya sabe hacer, porque ese día el grupo es
          distinto del habitual. ¿Qué hay detrás, más probablemente?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, correct) => setResponse("t9", v, correct)} />
        <p className="prompt">
          10. Un niño de 8 años hace un ejercicio mal por tercera vez seguida, siempre de la misma
          forma. ¿Qué miras, y qué empiezas a sospechar?
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
        <p className="lede">No sobre ti — sobre lo que has hecho en estas preguntas.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Ejemplo de feedback generado, en caso de error en la pregunta 2:
        </p>
        <div className="card quote">
          En la pregunta 2 respondiste «tiene miedo». Vuelve a leer la señal: ninguna tensión en el
          cuerpo, solo la mirada que te busca. El miedo normalmente se ve primero en el cuerpo que
          en los ojos. Cuando la mirada solo te busca y nada más, muchas veces es solo el permiso
          lo que falta — prueba a ofrecerlo antes de ofrecer consuelo.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          El feedback nunca dice solo «te has equivocado»: dice qué mirar la próxima vez. El tono
          siempre está sobre el comportamiento observado, nunca sobre la persona (ver el Capítulo
          7, que retomará justo esta regla).
        </p>
      </>
    ),
  },

  // 8 — recuperación: solo si el test del viernes tiene demasiados errores (§12, D25/D27)
  {
    day: "recuperación",
    pct: 90,
    nextLabel: "Continuar ▸",
    showBack: true,
    visible: (a) => {
      const corrette: Record<string, string> = {
        t1: "paura", t2: "via", t3: "calore", t4: "motivo", t5: "no",
        t6: "no", t7: "no", t8: "si", t9: "misto",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el test ha encontrado alguna dificultad</div>
        <h1>Dos señales más, para no confundirlas</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar las dos señales más
          parecidas de este capítulo — frío y espera el permiso — con un ejemplo más cada una.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 6 años</div>
          <p>
            Quieto en el borde, brazos apretados alrededor del cuerpo, un ligero temblor en las
            manos. No busca la mirada del instructor — mira distraído hacia el agua, no hacia él.
          </p>
        </div>
        <p className="prompt">¿Qué le falta más probablemente?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "via", label: "El permiso — está esperando un gesto", correct: false },
            {
              value: "freddo",
              label: "Calor — ninguna búsqueda de la mirada, solo el cuerpo que se aprieta: tiene frío",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Bianca, 9 años</div>
          <p>
            Quieta en el borde, cuerpo relajado, sin temblores. Antes de meter un pie en el agua,
            te busca con los ojos dos veces, sin decir nada, como esperando un gesto tuyo.
          </p>
        </div>
        <p className="prompt">¿Qué le falta más probablemente?</p>
        <OptionGroup
          name="rec2"
          options={[
            {
              value: "via",
              label: "Tu permiso — el cuerpo está tranquilo, solo busca tu gesto",
              correct: true,
            },
            { value: "freddo", label: "Calor — probablemente tiene frío", correct: false },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          La forma más rápida de distinguirlas: quien tiene frío se aprieta y no te busca; quien
          espera el permiso se queda tranquilo y te busca con los ojos. Mira sobre todo ahí.
        </p>
      </>
    ),
  },

  // 9 — viernes: resultado
  {
    day: "viernes · resultado",
    pct: 95,
    nextLabel: "Ir a la Dashboard ▸",
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
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>Las 10 preguntas del test</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>La frase que escribiste tú en el §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Cómo has metido a Luca en el agua en el §8, en los tres intercambios</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 2</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>transfer_score</td>
                <td style={{ padding: "6px 0" }}>La misma reflexión, sobre la transferencia real</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Observar e interpretar</td>
                <td style={{ padding: "6px 0" }}>La más baja de las anteriores fija el techo</td>
                <td style={{ textAlign: "right" }}>✓</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Para esta competencia en concreto: aunque llegues a ADQUIRIDA o CONSOLIDADA, el estado
          EXCELENTE no se activa sin al menos una clase real en el agua contada y verificada. Hoy
          queda en ADQUIRIDA — la clase real llega con un turno de verdad, no con esta simulación.
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
        <div className="done-badge">✓ Capítulo 3 completado</div>
        <div className="eyebrow">Semana 3 de 10 · Capítulo 4 a la vista</div>
        <h1>La sintonía</h1>
        <p className="lede">
          Has aprendido a leer qué le pasa a un niño. La próxima semana aprendes por qué, aunque lo
          hayas leído bien, a veces sigue sin hacerte caso.
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
          <div className="chip acquisita">
            <span className="name">3 · Observar e interpretar <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">adquirida</span>
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
