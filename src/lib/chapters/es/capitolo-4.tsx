import { OptionGroup, type Option } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traducción al español, no un capítulo independiente: mismos chapterId/claves de respuesta/valores
// internos del capítulo italiano (src/lib/chapters/capitolo-4.tsx) — solo cambia el texto visible.

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
  { value: "via", label: "Tu permiso, antes de lanzarse", correct: true },
  { value: "coraggio", label: "Valor — cree que no es lo bastante valiente", correct: false },
];
const K2_OPTIONS: Option[] = [
  {
    value: "si",
    label: "Sí — mirar y entender son prácticamente lo mismo",
    correct: false,
  },
  {
    value: "no",
    label: "No — mirar es ver que ha pasado algo, entender es decidir qué significa",
    correct: true,
  },
];
const K3_OPTIONS: Option[] = [
  { value: "no", label: "No — a veces todavía falta otra cosa, antes", correct: true },
  {
    value: "si",
    label: "Sí, seguro — si la causa es la correcta, el niño se mueve enseguida",
    correct: false,
  },
];
const K4_OPTIONS: Option[] = [
  {
    value: "si",
    label: "Sí, una buena simulación ya demuestra que la competencia está adquirida",
    correct: false,
  },
  { value: "no", label: "No — siempre hace falta al menos una clase real en el agua", correct: true },
];
const K5_OPTIONS: Option[] = [
  { value: "no", label: "No, las señales siempre quedan separadas", correct: false },
  {
    value: "si",
    label: "Sí — la señal puede cambiar mientras observas, si la espera se alarga",
    correct: true,
  },
];
const K6_OPTIONS: Option[] = [
  {
    value: "misto",
    label: "Una mezcla entre esperar el permiso y la vergüenza de un grupo nuevo",
    correct: true,
  },
  { value: "dimenticato", label: "Se había olvidado de cómo se tira", correct: false },
];

const M1_OPTIONS: Option[] = [
  { value: "domanda", label: "Le haces una pregunta directa para que hable", correct: false },
  { value: "silenzio", label: "Por un momento, tú también te quedas quieto y en silencio", correct: true },
];
const M2_OPTIONS: Option[] = [
  {
    value: "tirare",
    label: "Tirar del brazo de alguien que todavía no te está siguiendo",
    correct: true,
  },
  { value: "esempio", label: "Dar buen ejemplo, así te sigue casi enseguida", correct: false },
];
const M3_OPTIONS: Option[] = [
  {
    value: "torni",
    label: "Vuelves atrás un paso: recuperas su ritmo otra vez, antes de proponer de nuevo la dirección",
    correct: true,
  },
  { value: "insisti", label: "Insistes — hasta hace un momento todo iba bien", correct: false },
];

const SIM_OPTIONS: Option[] = [
  { value: "diretta", label: "«Noa, ¿quieres entrar?»" },
  { value: "silenzio", label: "Te sientas cerca de ella en silencio, reflejando su quietud" },
];
const SIM2_OPTIONS: Option[] = [
  { value: "minimizza", label: "«Anda ya, es solo agua, no te preocupes»" },
  {
    value: "risolvi",
    label: "Le propones un gorro, o le dices que hoy puede llevar la cabeza fuera del agua",
  },
];

const T1_OPTIONS: Option[] = [
  { value: "prima", label: "Antes", correct: true },
  { value: "dopo", label: "Después", correct: false },
];
const T2_OPTIONS: Option[] = [
  { value: "calma", label: "Decirle enseguida que se calme", correct: false },
  { value: "asseconda", label: "Seguirle la energía un momento, y luego guiarla", correct: true },
];
const T3_OPTIONS: Option[] = [
  { value: "no", label: "No — funciona igual, al revés, con quien se activa", correct: true },
  {
    value: "si",
    label: "Sí — con quien se agita solo hace falta calmarlo, no seguirle el ritmo",
    correct: false,
  },
];
const T4_OPTIONS: Option[] = [
  { value: "capito", label: "No haya entendido", correct: false },
  { value: "paura", label: "Tenga miedo", correct: true },
];
const T5_OPTIONS: Option[] = [
  { value: "no", label: "No — sirve para crear las condiciones para que te escuche", correct: true },
  {
    value: "si",
    label: "Sí — es sobre todo una cuestión de caerle bien al niño",
    correct: false,
  },
];
const T6_OPTIONS: Option[] = [
  { value: "si", label: "Sí, si tienes razón", correct: false },
  { value: "no", label: "No — aunque tengas razón, normalmente no funciona", correct: true },
];
const T7_OPTIONS: Option[] = [
  { value: "insisti", label: "Insistir, porque hasta hace un momento funcionaba", correct: false },
  {
    value: "torna",
    label: "Volver atrás un paso y recuperar su ritmo, antes de proponer de nuevo la dirección",
    correct: true,
  },
];
const T8_OPTIONS: Option[] = [
  { value: "no", label: "No — la forma cambia con la edad, pero el orden es siempre el mismo", correct: true },
  { value: "si", label: "Sí, exactamente de la misma manera", correct: false },
];
const T9_OPTIONS: Option[] = [
  { value: "rassicurato", label: "Se siente tranquilizado de todas formas", correct: false },
  { value: "richiude", label: "Se vuelve a cerrar — no se ha sentido tomado en serio", correct: true },
];

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo4StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 4 · LA SINTONÍA</div>
        <h1>¿Por qué habría de hacerme caso?</h1>
        <p className="lede">
          Ante un niño cerrado o silencioso — o ante uno agitado y eufórico — el instructor se pone
          a su ritmo un momento antes de pedirle nada, en vez de presionarlo o de apagarlo de
          golpe.
        </p>
      </>
    ),
  },

  // 1 — lunes: reflexión + consolidación Capítulo 3
  {
    day: "lunes · 10 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en el agua?</h1>
        <p className="lede">
          La semana pasada te pedí que, con el primer niño que se parara o dudara, tú también te
          pararas un segundo, y decidieras cuál de las cuatro causas te parecía más probable. ¿Cómo
          te fue? ¿Acertaste con la lectura?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidación — vuelve el Capítulo 3</h2>
        <p className="prompt">
          1. Un niño se para, te busca con los ojos, el cuerpo no está tenso. ¿Qué le falta más
          probablemente?
        </p>
        <OptionGroup name="k1" options={K1_OPTIONS} selected={answers.k1} onPick={(v, c) => setResponse("k1", v, c)} />
        <p className="prompt">2. ¿Mirar y entender son lo mismo?</p>
        <OptionGroup name="k2" options={K2_OPTIONS} selected={answers.k2} onPick={(v, c) => setResponse("k2", v, c)} />
        <p className="prompt">
          3. Has entendido bien la causa, pero el niño sigue sin moverse. ¿Significa que te habías
          equivocado de lectura?
        </p>
        <OptionGroup name="k3" options={K3_OPTIONS} selected={answers.k3} onPick={(v, c) => setResponse("k3", v, c)} />
        <p className="prompt">4. Para la competencia del Capítulo 3, ¿basta una buena simulación para llegar a EXCELENTE?</p>
        <OptionGroup name="k4" options={K4_OPTIONS} selected={answers.k4} onPick={(v, c) => setResponse("k4", v, c)} />
        <p className="prompt">
          5. Un niño que solo está esperando tu permiso, si tardas demasiado, ¿puede empezar a
          mostrar señales de miedo de verdad?
        </p>
        <OptionGroup name="k5" options={K5_OPTIONS} selected={answers.k5} onPick={(v, c) => setResponse("k5", v, c)} />
        <p className="prompt">
          6. En el ejemplo de Nadia, 12 años, ¿qué había detrás de su duda ante un grupo distinto
          del habitual?
        </p>
        <OptionGroup name="k6" options={K6_OPTIONS} selected={answers.k6} onPick={(v, c) => setResponse("k6", v, c)} />
      </>
    ),
  },

  // 2 — martes: explicación + control de fin de jornada
  {
    day: "martes · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Primero su ritmo, después el tuyo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Aunque leas bien la situación, a veces el niño sigue sin hacerte caso. Hoy aprendes por
          qué — y qué hacer, incluso antes de hablar.
        </p>
        <p className="lede">
          <strong>La sintonía no es caer bien.</strong> Es crear, en pocos segundos, las
          condiciones para que un niño esté dispuesto a escucharte. Sin ella, hasta la instrucción más
          acertada rebota.
        </p>
        <p className="lede">
          <strong>Primero te pones a su ritmo.</strong> Si está quieto y en silencio, por un
          momento tú también te quedas quieto y en silencio. Si está agitado y eufórico, por un
          momento sigues su energía en vez de apagarla con un «cálmate». No lo estás imitando:
          estás diciendo, con el cuerpo, «estoy aquí contigo, donde tú estás ahora».
        </p>
        <p className="lede">
          <strong>Solo después, lo guías.</strong> Una vez que ha sentido que vas a su paso, puedes
          proponer un pequeño paso en la dirección que tú quieres.
        </p>
        <div className="card quote">
          Guiar antes de haberte puesto a su ritmo es como tirar del brazo de alguien que todavía
          no te está siguiendo: puedes tener razón, pero no funciona.
        </div>
        <p className="lede">
          Funciona con quien se cierra — y funciona igual, al revés, con quien se activa. El primer
          movimiento es siempre el mismo: ir hacia él, no pedirle que venga enseguida hacia ti.
        </p>
        <p className="lede">
          <strong>Una última cosa, antes de seguir.</strong> La sintonía no es un interruptor que,
          una vez encendido, se queda encendido todo el turno: se puede perder a mitad de camino, y
          entonces hay que reconstruirla, no forzarla. Un niño que te ha seguido en dos ejercicios
          puede, en el tercero, volver a cerrarse — quizá está cansado, quizá el ejercicio nuevo lo
          ha descolocado. La tentación es insistir («venga, hasta hace un momento iba todo bien»),
          pero es otra vez el mismo error: estás intentando guiarlo mientras él, en este momento,
          ya no te sigue. Vuelve atrás un paso: recupera su ritmo otra vez, antes de proponer de
          nuevo la dirección. No hace falta empezar de cero: solo hace falta aplicar otra vez la
          misma regla de siempre.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de jornada</h2>
        <p className="prompt">1. Un niño está en silencio e inmóvil. ¿Qué haces primero?</p>
        <OptionGroup name="m1" options={M1_OPTIONS} selected={answers.m1} onPick={(v, c) => setResponse("m1", v, c)} />
        <p className="prompt">2. Guiar antes de haberte puesto a su ritmo es como:</p>
        <OptionGroup name="m2" options={M2_OPTIONS} selected={answers.m2} onPick={(v, c) => setResponse("m2", v, c)} />
        <p className="prompt">
          3. Un niño que te seguía bien vuelve a cerrarse a mitad de turno, con un ejercicio nuevo.
          ¿Qué haces?
        </p>
        <OptionGroup name="m3" options={M3_OPTIONS} selected={answers.m3} onPick={(v, c) => setResponse("m3", v, c)} />
      </>
    ),
  },

  // 3 — miércoles: escenas + reflexión + simulación con bifurcación
  {
    day: "miércoles",
    pct: 48,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "diretta" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => {
      const simFeedback =
        answers.sim === "diretta" ? (
          <div className="feedback retry">
            NOA: <em>(silencio, no se mueve)</em>
            <br />
            Una pregunta directa le pedía seguir un ritmo que todavía no era el suyo.
          </div>
        ) : answers.sim === "silenzio" ? (
          <div className="feedback ok">
            NOA: <em>(al cabo de unos segundos, dirige la mirada hacia ti)</em> «...tengo miedo de
            mojarme el pelo.»
            <br />
            Ponerte a su ritmo no la ha «desbloqueado» por arte de magia: le ha dado el espacio
            para decir qué le pasaba de verdad.
          </div>
        ) : null;

      const sim2Feedback =
        answers.sim2 === "minimizza" ? (
          <div className="feedback retry">
            NOA se vuelve a cerrar, vuelve al silencio — se había arriesgado a decírtelo, y no se
            ha sentido tomada en serio.
          </div>
        ) : answers.sim2 === "risolvi" ? (
          <div className="feedback ok">
            NOA: «...vale, lo intento así.» <em>(se levanta, se acerca al borde)</em>
            <br />
            Abrir la puerta con la sintonía no basta si, en cuanto el niño dice qué le pasa de
            verdad, la vuelves a cerrar tú con una respuesta genérica. El segundo movimiento cuenta
            tanto como el primero.
          </div>
        ) : null;

      return (
        <>
          <div className="eyebrow">Miércoles</div>
          <h1>Un niño cerrado, uno agitado, una adolescente distante</h1>
          <div className="card scene">
            <div className="who">Elia, 6 años</div>
            <p>
              Primer día con un grupo nuevo. No responde, brazos cruzados, mirada baja. El
              instructor se sienta a su lado, en silencio, durante veinte segundos — misma
              quietud, mismo silencio. Después, despacio: «a mí tampoco me apetece hablar a
              veces.» Después: «¿quieres solo mojarte los pies, por ahora?» Elia no responde con
              palabras. Pero mete los pies en el agua.
            </p>
            <p>
              Si el instructor hubiera guiado enseguida — «venga, vamos, verás qué divertido» — le
              habría pedido que siguiera un ritmo que todavía no era el suyo. Esos veinte segundos
              a su ritmo no «convencieron» a Elia con un argumento: solo le hicieron entender que
              podía quedarse donde estaba. Y desde ahí, un pequeño paso, lo dio él solo.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Diego, 8 años</div>
            <p>
              Llega al borde de la piscina ya a mil por hora: salta, habla velocísimo. El
              instructor, en vez de decir «cálmate», lo acompaña un rato: asiente rápido, le hace
              una pregunta corta y rápida, al ritmo de él. Solo después, poco a poco, va bajando el
              ritmo de la conversación — y Diego baja el ritmo con él, hasta que está listo para la
              primera instrucción.
            </p>
          </div>
          <div className="card scene">
            <div className="who">Bianca, 15 años</div>
            <p>
              Llega con la cara seria, responde a los saludos con un gesto apenas esbozado, brazos
              cruzados — no está cerrada como Elia, es el distanciamiento adolescente de quien hoy
              no tiene ganas de estar ahí. El instructor no se sienta a su lado en silencio, a los
              15 años quedaría raro: le habla poco, con el mismo tono seco que ella — «¿día duro?»
              Bianca responde con un «...un poco», pero ya es algo: ha dejado que el instructor
              llegara hasta donde ella estaba dispuesta a abrirse — no más. Solo entonces llega el
              ejercicio, con un tono normal — nada de entusiasmo fingido, que no encajaría con su
              estado de ánimo.
            </p>
          </div>
          <p className="lede">
            <strong>
              Un niño cerrado, uno agitado, una adolescente distante — la forma cambia, el orden
              no: primero su ritmo, solo después el tuyo.
            </strong>
          </p>
          <p className="prompt">
            Un niño de 8 años llega al borde de la piscina ya muy agitado, habla rápido, no puede
            estarse quieto ni un segundo. ¿Qué haces — o dices — en los primeros treinta segundos,
            ANTES de darle cualquier instrucción?
          </p>
          <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
          {/* Nota para la corrección, no mostrada al instructor: el sistema busca si sigue la
              energía un momento antes de bajarla — no si la apaga enseguida con un «cálmate». */}
          <h2>Simulación</h2>
          <p className="lede">
            <strong>NOA, 7 años.</strong> En el borde de la piscina, silenciosa, no responde a
            preguntas directas. ¿Qué haces o dices primero?
          </p>
          <OptionGroup name="sim" options={SIM_OPTIONS} selected={answers.sim} onPick={(v) => setResponse("sim", v)} />
          {simFeedback}
          {answers.sim === "silenzio" && (
            <div>
              <p className="lede" style={{ marginTop: 14 }}>
                La escena continúa. Ahora que Noa ha dicho cuál es el problema de verdad, te toca a
                ti responder a <em>eso</em>.
              </p>
              <p className="prompt">Escribe qué le dices o le propones ahora.</p>
              <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
              <OptionGroup
                name="sim2"
                options={SIM2_OPTIONS}
                selected={answers.sim2}
                onPick={(v) => setResponse("sim2", v)}
              />
              {sim2Feedback}
            </div>
          )}
        </>
      );
    },
  },

  // 4 — miércoles por la noche: control de fin de jornada (transferencia)
  {
    day: "miércoles por la noche",
    pct: 62,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de jornada — transferencia</div>
        <h1>Una escena distinta a la de ayer</h1>
        <p className="lede">
          Un niño de 10 años llega riendo fuerte, empuja en broma a un compañero, no consigue
          estarse quieto en la fila. No parece enfadado ni asustado: solo parece lleno de energía.
        </p>
        <p className="prompt">
          ¿Cómo abres el contacto con él, ANTES de pedirle que se ponga en fila y se quede quieto?
          Escribe tu razonamiento, no solo el movimiento.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca si reconoce esto
            como un caso de «agitado/eufórico» — seguir su energía un momento, no pedirle enseguida
            que se calme. */}
      </>
    ),
  },

  // 5 — en el agua
  {
    day: "en el agua",
    pct: 68,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en el agua</div>
        <h1>Un minuto a su ritmo</h1>
        <p className="lede">
          Esta semana, con el niño más cerrado — o más agitado — del grupo: ponte a su ritmo
          durante un minuto antes de pedirle nada. Quieto si está quieto, en silencio si está en
          silencio; rápido si está rápido, encendido si está encendido. Después, solo después,
          propón un paso pequeño.
        </p>
      </>
    ),
  },

  // 6 — viernes: test acumulativo
  {
    day: "viernes · 11 min",
    pct: 85,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — test acumulativo: Capítulo 3 + Capítulo 4</div>
        <h1>El test</h1>
        <p className="prompt">1. ¿Ponerse al ritmo del niño va antes o después de guiarlo?</p>
        <OptionGroup name="t1" options={T1_OPTIONS} selected={answers.t1} onPick={(v, c) => setResponse("t1", v, c)} />
        <p className="prompt">2. Un niño está eufórico y agitado. El primer movimiento correcto es:</p>
        <OptionGroup name="t2" options={T2_OPTIONS} selected={answers.t2} onPick={(v, c) => setResponse("t2", v, c)} />
        <p className="prompt">3. ¿Ponerse al ritmo del niño solo funciona con quien se cierra?</p>
        <OptionGroup name="t3" options={T3_OPTIONS} selected={answers.t3} onPick={(v, c) => setResponse("t3", v, c)} />
        <p className="prompt">
          4. <em>(del Capítulo 3)</em> Un niño se bloquea, hombros tensos, mirada fija en el agua.
          Es más probable que:
        </p>
        <OptionGroup name="t4" options={T4_OPTIONS} selected={answers.t4} onPick={(v, c) => setResponse("t4", v, c)} />
        <p className="prompt">5. ¿La sintonía sirve para caerle bien al niño?</p>
        <OptionGroup name="t5" options={T5_OPTIONS} selected={answers.t5} onPick={(v, c) => setResponse("t5", v, c)} />
        <p className="prompt">6. ¿Guiar antes de haberte puesto a su ritmo suele funcionar?</p>
        <OptionGroup name="t6" options={T6_OPTIONS} selected={answers.t6} onPick={(v, c) => setResponse("t6", v, c)} />
        <p className="prompt">
          7. Un niño que te seguía bien vuelve a cerrarse a mitad de turno. Lo correcto es:
        </p>
        <OptionGroup name="t7" options={T7_OPTIONS} selected={answers.t7} onPick={(v, c) => setResponse("t7", v, c)} />
        <p className="prompt">
          8. Con una adolescente distante, ¿la sintonía se construye igual que con un niño de 6
          años?
        </p>
        <OptionGroup name="t8" options={T8_OPTIONS} selected={answers.t8} onPick={(v, c) => setResponse("t8", v, c)} />
        <p className="prompt">
          9. Un niño revela cuál es su miedo de verdad, después de que te hayas puesto a su ritmo.
          Si respondes de forma genérica o le quitas importancia, ¿qué suele pasar?
        </p>
        <OptionGroup name="t9" options={T9_OPTIONS} selected={answers.t9} onPick={(v, c) => setResponse("t9", v, c)} />
        <p className="prompt">
          10. Un chico de 13 años llega al borde de la piscina en silencio, sin saludar a nadie.
          Escribe en dos líneas qué haces en los primeros diez segundos.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explica cómo funciona la corrección (§10, D34)
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
          Ejemplo de feedback generado, en caso de error en la pregunta 2:
        </p>
        <div className="card quote">
          Has respondido que lo calmarías enseguida. Pero un «cálmate» dicho a quien ya está muy
          alterado casi nunca funciona — porque no has llegado hasta donde está él, solo le has
          pedido que se mueva él solo. Seguirle el ritmo primero, aunque sea solo unos segundos,
          abre la puerta que después puedes cerrar tú.
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
        t1: "prima", t2: "asseconda", t3: "no", t4: "paura", t5: "no",
        t6: "no", t7: "torna", t8: "no", t9: "richiude",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el test ha encontrado alguna dificultad</div>
        <h1>Tres escenas más, para entrenar el orden</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena repasar el punto más delicado de
          este capítulo con algún ejemplo más — primero su ritmo, solo después el tuyo.
        </p>

        <div className="card scene">
          <div className="who">Samuele, 9 años</div>
          <p>
            Primer día con el grupo. Sentado en el borde, piernas fuera del agua, brazos cruzados,
            no responde a quien lo saluda.
          </p>
        </div>
        <p className="prompt">¿Qué haces primero?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "gioco", label: "Le propones enseguida un juego para romper el hielo", correct: false },
            {
              value: "silenzio",
              label: "Te sientas cerca de él, en silencio, un momento, antes de proponer nada",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Greta, 7 años</div>
          <p>
            Llega al borde de la piscina dando saltitos, cuenta el fin de semana sin parar, sin
            terminar una frase, no puede estarse quieta ni un segundo.
          </p>
        </div>
        <p className="prompt">¿Qué haces primero, antes de darle la primera instrucción?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "calma", label: "Le dices que se calme, así puedes empezar el ejercicio", correct: false },
            {
              value: "asseconda",
              label: "Por un momento sigues su ritmo — asientes rápido, una pregunta corta con la misma energía",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un niño que te seguía bien</div>
          <p>
            Ha seguido sin problemas los dos primeros ejercicios. En el tercero — nuevo, que nunca
            había hecho — se bloquea otra vez, cerrado como al principio del turno.
          </p>
        </div>
        <p className="prompt">¿Qué haces?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "insisti", label: "Insistes — hasta hace un momento te seguía, sigues por el mismo camino", correct: false },
            {
              value: "torna",
              label: "Vuelves atrás un paso: recuperas su ritmo otra vez, antes de proponer de nuevo la dirección",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Cerrado, agitado, o ya en marcha y luego parado otra vez — cambia la forma, nunca el
          orden: primero te pones a su ritmo, solo después lo guías.
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
                <td style={{ padding: "6px 0" }}>La respuesta al §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>Cómo has llegado a Noa en el §8, en los dos intercambios</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 3</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Sintonía</td>
                <td style={{ padding: "6px 0" }}>La más baja de las anteriores</td>
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
        <div className="done-badge">✓ Capítulo 4 completado</div>
        <div className="eyebrow">Semana 4 de 10 · Capítulo 5 a la vista</div>
        <h1>El mensaje y la instrucción</h1>
        <p className="lede">
          Hoy has aprendido a abrir la puerta. La próxima semana aprendes qué decir, una vez
          abierta — y por qué las palabras, la voz y el cuerpo tienen que decir lo mismo.
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
          <div className="chip acquisita">
            <span className="name">4 · Sintonía</span>
            <span className="state">adquirida</span>
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
