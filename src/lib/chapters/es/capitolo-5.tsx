import { OptionGroup } from "@/components/OptionGroup";
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

const DIARY_KEYS = ["q2","q7","q7b","qtrasf","t10"];

export const capitolo5StepsEs: Step[] = [
  // 0 — portada
  {
    day: "inicio",
    pct: 0,
    nextLabel: "Empezar ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Capítulo 5 · EL MENSAJE Y LA INSTRUCCIÓN</div>
        <h1>¿Qué le digo, y cómo se lo hago ver?</h1>
        <p className="lede">
          El instructor da instrucciones en positivo — dice qué hacer, no qué no hacer — y se
          asegura de que las palabras, el tono y el cuerpo digan lo mismo.
        </p>
      </>
    ),
  },

  // 1 — lunes: reflexión + repaso del Capítulo 4
  {
    day: "lunes · 8 min",
    pct: 12,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Lunes</div>
        <h1>¿Cómo te fue en la piscina?</h1>
        <p className="lede">
          La semana pasada: con el niño más cerrado — o más agitado — del grupo, te pusiste a su
          ritmo durante un minuto antes de pedirle algo. ¿Qué notaste — en él, o en ti?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Repaso — vuelve el Capítulo 4</h2>
        <p className="prompt">1. ¿Ponerse al ritmo del niño va antes o después de guiarlo?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "prima", label: "Antes", correct: true },
            { value: "dopo", label: "Después", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Un niño eufórico: ¿el primer paso es calmarlo enseguida?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Sí — si no lo calmas enseguida, puede írsete de las manos", correct: false },
            { value: "no", label: "No — primero le sigues la corriente un momento, y luego lo guías", correct: true },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. ¿La sintonía sirve para hacerte escuchar o para caerle bien?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "ascoltare", label: "Hacerte escuchar — es una capacidad profesional", correct: true },
            { value: "apprezzare", label: "Caerle bien — si le gustas al instructor, escucha más", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">
          4. ¿Ponerse al ritmo del niño solo funciona con quien se cierra, nunca con quien se
          activa?
        </p>
        <OptionGroup
          name="k4"
          options={[
            { value: "vero", label: "Verdadero — con quien ya está agitado, seguirle la corriente lo agita más", correct: false },
            { value: "falso", label: "Falso — funciona igual, al revés, con quien está agitado", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">5. Un niño que te seguía bien se cierra de nuevo a mitad de turno. ¿Qué haces?</p>
        <OptionGroup
          name="k5"
          options={[
            { value: "torni", label: "Retrocedes un paso: vuelves a encontrar su ritmo", correct: true },
            { value: "insisti", label: "Insistes — hasta hace un momento iba todo bien", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Con una adolescente distante, ¿la sintonía se construye igual que con un niño de 6
          años?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Sí, exactamente igual", correct: false },
            { value: "no", label: "No — la forma cambia con la edad, el orden es el mismo", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — martes: explicación + control
  {
    day: "martes · 13 min",
    pct: 30,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Martes</div>
        <h1>Un objetivo, no un obstáculo</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          Ahora que te escucha, lo que le dices — y cómo — marca toda la diferencia.
        </p>
        <p className="lede">
          <strong>La instrucción en positivo.</strong> «No dobles las piernas» solo dice qué no
          hacer — y deja todo lo demás abierto: el niño podría mantenerlas rígidas como una tabla,
          o no moverlas en absoluto, y la instrucción seguiría «cumplida». Le has quitado una sola
          cosa que no debe hacer, entre mil posibles, pero no le has dicho qué hacer de verdad.
          «Piernas rectas como un palo», en cambio, le da una sola cosa precisa que hacer: es el
          único movimiento que el cuerpo puede realmente ejecutar para obedecer.
        </p>
        <p className="lede">
          <strong>Una razón más, propia del agua.</strong> Un movimiento se aprende mejor cuando la
          atención está puesta en lo que debe pasar fuera del cuerpo — el agua que hay que empujar
          hacia atrás, la pared que hay que alcanzar — y no en qué músculo mover: muchos estudios
          lo confirman, siempre de la misma manera. «Empuja el agua hacia atrás» produce una
          brazada mejor que «estira el codo», aunque describan exactamente el mismo movimiento.
        </p>
        <p className="lede">
          <strong>La coherencia entre palabras, voz y cuerpo.</strong> Habrás oído que las palabras
          cuentan un 7%, el tono un 38%, el cuerpo un 55%. No es verdad — ese estudio se refería a
          un caso muy concreto: personas que escuchaban una sola palabra dicha de formas distintas
          y tenían que adivinar un sentimiento, no la comunicación en general. Si fuera cierto,
          podrías enseñar a nadar en un idioma desconocido y funcionaría igual el 93% de las veces
          — no es así.
        </p>
        <div className="card quote">
          Cuando las palabras dicen una cosa y el cuerpo dice otra, el niño cree al cuerpo — no
          porque «cuente más» en general, sino porque las palabras se controlan fácilmente,
          mientras que el cuerpo no: es más difícil fingirlo.
        </div>
        <p className="lede">
          <strong>¿Y cuando la prohibición parece inevitable?</strong> En una emergencia real — un
          niño que corre hacia el borde resbaladizo — un «¡alto!» seco es la reacción correcta:
          nadie se detiene a reformular en positivo. Fuera de eso, si tienes aunque sea un segundo
          para elegir las palabras, vale la pena usarlo para dar un objetivo en vez de una
          prohibición.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día</h2>
        <p className="prompt">1. «No dobles las piernas» ¿le da al cuerpo un objetivo o un obstáculo?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "bersaglio", label: "Un objetivo — de todas formas indica qué pierna mover", correct: false },
            { value: "ostacolo", label: "Un obstáculo que evitar — menos eficaz que un objetivo", correct: true },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. ¿Por qué «gana» el cuerpo sobre las palabras cuando se contradicen?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "falsificare", label: "Porque es más difícil fingirlo", correct: true },
            { value: "conta", label: "Porque cuenta más en general", correct: false },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">
          3. En una emergencia real — un niño que corre hacia un borde resbaladizo — ¿sigue siendo
          un error decir «¡alto!» en vez de reformular en positivo?
        </p>
        <OptionGroup
          name="m3"
          options={[
            { value: "si", label: "Sí, la regla vale siempre, incluso en una emergencia", correct: false },
            { value: "no", label: "No — en una emergencia real, la claridad inmediata importa más", correct: true },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — miércoles: tres escenas + transferencia + simulación con bifurcación
  {
    day: "miércoles",
    pct: 47,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "generico" || !!a.sim2),
    render: ({ answers, setReflection, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Miércoles</div>
        <h1>Tres segundos alineados</h1>
        <div className="card scene">
          <div className="who">«¡Muy bien!», dicho mirando el reloj</div>
          <p>
            Un instructor le dice «¡muy bien!» a un niño — pero mirando el reloj, con voz plana, ya
            vuelto hacia el siguiente. El niño oye la palabra correcta, pero no se siente animado:
            percibió que la atención ya estaba en otra parte.
          </p>
          <p>
            <strong>Corregido:</strong> el instructor se detiene un segundo, se da la vuelta, mira
            al niño, dice «muy bien» con un tono que sube. Tres segundos, no treinta — pero los
            tres alineados.
          </p>
        </div>
        <div className="card scene">
          <div className="who">«No hundas la cabeza», repetido sin efecto</div>
          <p>
            Un niño de 7 años sigue hundiendo la cabeza, aunque el instructor repita «no hundas la
            cabeza». El instructor cambia la frase, no el tono: «mantén una oreja dentro y otra
            fuera, como si estuvieras escuchando a escondidas.» En la siguiente brazada, la cabeza
            queda más alta.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Un chico de 14 años</div>
          <p>
            Acaba de mejorar mucho su tiempo en un largo. El instructor dice «buen trabajo», pero
            con los brazos cruzados, la mirada ya en el cronómetro, tono mecánico. El chico baja la
            mirada, se aleja sin expresión: a los 14 años, un cumplido dicho así parece algo dicho
            por costumbre, sin pensarlo — no un reconocimiento de verdad — y duele más que el
            silencio. La siguiente vez, el instructor se corrige: se detiene, lo mira a los ojos,
            dice «has cortado tres segundos, ¿tú también lo sentiste?» — esta vez el chico sonríe
            apenas, porque esta vez el instructor estaba realmente ahí.
          </p>
        </div>
        <p className="lede">
          <strong>
            Tres escenas, la misma regla debajo: las palabras abren la puerta, pero es la
            coherencia con la voz y el cuerpo lo que la mantiene abierta — a los 7 años como a los
            14.
          </strong>
        </p>
        <p className="prompt">Reescribe en positivo: «No hundas la cabeza cuando respiras.»</p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Nota para la corrección, no mostrada al instructor: el sistema busca una instrucción
            que describa qué hacer — no una versión más educada de la misma prohibición. */}
        <h2>Simulación</h2>
        <p className="lede">
          <strong>DAVIDE, 9 años.</strong> Acaba de completar por primera vez un largo entero a
          braza. ¿Qué le dices?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "generico", label: "«Bien, va, seguimos» — con prisa" },
            {
              value: "specifico",
              label: "Te detienes, lo miras: «te paraste a respirar sin hundirte, lo hiciste tú solo»",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "generico" && (
          <div className="feedback retry">
            DAVIDE: <em>(se aleja, no parece especialmente satisfecho)</em> «...ok.»
          </div>
        )}
        {answers.sim === "specifico" && (
          <div className="feedback ok">
            DAVIDE: <em>(sonríe, se queda ahí un momento más)</em> «...¿de verdad? ¿Lo hice bien?»
            <br />
            No es la longitud de la frase lo que marca la diferencia: es la especificidad, y el
            hecho de haberte detenido.
          </div>
        )}
        {answers.sim === "specifico" && (
          <div>
            <p className="lede" style={{ marginTop: 14 }}>
              Un momento después, Davide retoma para un segundo largo — pero esta vez dobla
              demasiado los brazos, un error técnico nuevo, nunca corregido antes con él.
            </p>
            <p className="prompt">
              Escribe la instrucción que le das ahora — en positivo, con tono y cuerpo coherentes.
            </p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "negativo", label: "Vuelves a una instrucción en negativo, o la dices distraídamente" },
                { value: "positivo", label: "Das una imagen positiva, deteniéndote a mirarlo" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "negativo" && (
              <div className="feedback retry">
                DAVIDE lo intenta de nuevo, pero el error sigue siendo el mismo — no recibió un
                objetivo al que apuntar, solo otra prohibición.
              </div>
            )}
            {answers.sim2 === "positivo" && (
              <div className="feedback ok">
                DAVIDE estira un poco más los brazos en el siguiente intento — pequeño, pero en la
                dirección correcta.
              </div>
            )}
          </div>
        )}
      </>
    ),
  },

  // 4 — miércoles por la noche: transferencia a un error nuevo
  {
    day: "miércoles por la noche",
    pct: 63,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Control de fin de día — transferencia</div>
        <h1>Un error nunca visto antes</h1>
        <p className="lede">
          Un niño sigue manteniendo los dedos abiertos durante la brazada, en vez de juntos. Tienes
          que darle una instrucción nueva — todavía no has probado nada con él.
        </p>
        <p className="prompt">
          Escribe la instrucción, en positivo, e intenta imaginar cómo la dirías — tono y cuerpo
          incluidos — de modo que los tres sean coherentes.
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Nota para la corrección, no mostrada al instructor: no es uno de los ejemplos ya
            vistos — es a propósito. El sistema comprueba si aplica la regla a un error técnico
            nunca visto en el capítulo, no solo si recuerda las frases ya leídas. */}
      </>
    ),
  },

  // 5 — en la piscina
  {
    day: "en la piscina",
    pct: 70,
    nextLabel: "Continuar ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Tu turno en la piscina</div>
        <h1>Una instrucción, deteniéndote a mirar</h1>
        <p className="lede">
          Esta semana, da una sola instrucción en positivo — di qué hacer, nunca qué no hacer — y
          detente un segundo mientras la dices: mira al niño, no el reloj, no al grupo.
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
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Viernes — examen acumulativo: Capítulo 4 + Capítulo 5</div>
        <h1>El examen</h1>
        <p className="prompt">1. «No dobles las piernas» ¿es una buena instrucción?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "no", label: "No — mejor decir qué hacer", correct: true },
            { value: "si", label: "Sí, es clara — de todas formas dice qué evitar", correct: false },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. ¿Es verdad que las palabras cuentan solo el 7% de la comunicación?</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "si", label: "Sí, es una ley general", correct: false },
            { value: "no", label: "No — ese estudio se refería a un caso muy específico", correct: true },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. Cuando las palabras y el cuerpo dicen cosas distintas, ¿a qué cree el niño?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "parole", label: "A las palabras — son el mensaje explícito, así que el más fiable", correct: false },
            { value: "corpo", label: "Al cuerpo — es la señal más difícil de fingir", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. ¿Una instrucción en positivo le da al cuerpo un objetivo o un obstáculo?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "bersaglio", label: "Un objetivo", correct: true },
            { value: "ostacolo", label: "Un obstáculo", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(del Capítulo 4)</em> ¿Ponerse al ritmo va antes de guiar?
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "si", label: "Sí", correct: true },
            { value: "no", label: "No", correct: false },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">
          6. ¿«Muy bien» dicho con voz plana, mirando a otro lado, funciona como ánimo?
        </p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — el niño percibe que la atención estaba en otra parte", correct: true },
            { value: "si", label: "Sí, la palabra cuenta de todas formas", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">
          7. En una emergencia real, ¿es un error decir «¡alto!» en vez de reformular en positivo?
        </p>
        <OptionGroup
          name="t7"
          options={[
            { value: "si", label: "Sí, la regla vale siempre", correct: false },
            { value: "no", label: "No — en una emergencia real, la claridad inmediata importa más", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">
          8. Un chico de 14 años recibe un cumplido de verdad pero dicho con tono mecánico, brazos
          cruzados, mirada en otra parte. ¿Cómo lo vive más probablemente?
        </p>
        <OptionGroup
          name="t8"
          options={[
            { value: "abitudine", label: "Como algo dicho por costumbre, no un reconocimiento de verdad", correct: true },
            { value: "sincero", label: "Como un cumplido sincero, las palabras bastan", correct: false },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">
          9. ¿Un ánimo específico bien dado sobre un error también «vale» para el siguiente error
          técnico, en el mismo minuto?
        </p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Sí, el efecto se extiende automáticamente", correct: false },
            { value: "no", label: "No — cada instrucción nueva hay que construirla de nuevo, positiva y coherente", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. Tienes que corregir a un niño de 8 años que dobla mal los codos durante la brazada.
          Escribe la instrucción, en positivo, en una sola frase.
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
          Ejemplo de feedback generado, en caso de error en la pregunta 2:
        </p>
        <div className="card quote">
          Respondiste que las palabras realmente cuentan solo el 7%. Ese número circula muchísimo,
          pero viene de un estudio sobre un caso muy concreto — no es una ley general de la
          comunicación. Lo que sí es verdad, y útil, es otra cosa: cuando las palabras y el cuerpo
          se contradicen, gana el cuerpo.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          El feedback nunca dice solo «te equivocaste»: dice qué mirar la próxima vez. El tono
          siempre es sobre el comportamiento observado, nunca sobre la persona (ver Capítulo 7, que
          retomará justamente esta regla).
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
      const corrette: Record<string, string> = {
        t1: "no", t2: "no", t3: "corpo", t4: "bersaglio", t5: "si",
        t6: "no", t7: "no", t8: "abitudine", t9: "no",
      };
      const sbagliate = Object.entries(corrette).filter(([k, v]) => a[k] !== v).length;
      return sbagliate >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recuperación — solo porque el examen encontró alguna dificultad</div>
        <h1>Tres frases en negativo, reescritas de verdad</h1>
        <p className="lede">
          No es un fracaso: es solo la señal de que vale la pena entrenar un poco más el
          automatismo más delicado de este capítulo — porque suavizar una prohibición no es lo
          mismo que dar un objetivo.
        </p>

        <div className="card scene">
          <div className="who">Un niño de espalda, la cabeza que se desliza hacia atrás</div>
          <p>
            El instructor ha repetido durante dos turnos «no eches la cabeza hacia atrás» — nada
            cambia. Intenta reformularla en positivo.
          </p>
        </div>
        <p className="prompt">¿Cuál de las dos da de verdad un objetivo, y no solo una prohibición más amable?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "morbida", label: "«Intenta no echarla tanto hacia atrás»", correct: false },
            {
              value: "mento",
              label: "«Barbilla hacia el pecho, mira la punta de tus pies»",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Una niña a braza, las piernas rígidas en tijera</div>
          <p>
            El instructor ha dicho «no mantengas las piernas rígidas» tres veces seguidas — las
            piernas siguen exactamente igual.
          </p>
        </div>
        <p className="prompt">¿Cuál de las dos funciona mejor?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "irrigidire", label: "«Intenta no ponerlas tan rígidas»", correct: false },
            {
              value: "pedala",
              label: "«Piernas suaves, como si pedalearas despacio en bicicleta»",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Un chico a estilo libre, sin aire a mitad de largo</div>
          <p>
            Aguanta la respiración durante brazadas enteras, luego emerge jadeando. El instructor
            ha probado con «no aguantes la respiración» — ningún cambio.
          </p>
        </div>
        <p className="prompt">¿Qué frase le da un objetivo que ejecutar, no solo una prohibición?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "trattenerlo", label: "«Intenta no aguantarla tanto tiempo»", correct: false },
            {
              value: "candela",
              label: "«Sopla despacio bajo el agua, como si soplaras una vela lejana»",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Una frase en positivo no es solo una versión más amable de la prohibición: es un objetivo
          distinto, hacia el que el cuerpo se mueve solo.
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
                <td style={{ padding: "6px 0" }}>La instrucción reescrita en el §7</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>El modo en que le hablaste a Davide en el §8, en ambos momentos</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>El relato del lunes sobre el Capítulo 4</td>
                <td style={{ textAlign: "right" }}>registrado ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Instrucciones y congruencia</td>
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
        <div className="done-badge">✓ Capítulo 5 completado</div>
        <div className="eyebrow">Semana 5 de 10 · Capítulo 6 en camino</div>
        <h1>Hacer que actúe, y ver si llegó</h1>
        <p className="lede">
          Hoy has aprendido a decir las cosas bien. La próxima semana aprenderás que no basta: la
          comunicación no termina cuando el niño escucha, termina cuando actúa.
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
          <div className="chip acquisita">
            <span className="name">5 · Instrucciones y congruencia</span>
            <span className="state">adquirida</span>
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
