import { OptionGroup } from "@/components/OptionGroup";
import { ChapterVakSection } from "@/components/ChapterVakSection";
import { ChapterDiarySection } from "@/components/ChapterDiarySection";
import type { Step, StepContext } from "@/lib/chapters/types";

// Traduzione inglese, non un capitolo indipendente: stessi chapterId/chiavi di risposta/valori
// interni del capitolo italiano (src/lib/chapters/capitolo-9.tsx) — solo il testo visibile
// cambia.

function Field({ id, value, onChange }: { id: string; value: string; onChange: (v: string) => void }) {
  return (
    <textarea
      className="field"
      id={id}
      placeholder="Write here..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

const DIARY_KEYS = ["q2", "q7", "q7b", "qtrasf", "t10"];

export const capitolo9StepsEn: Step[] = [
  // 0 — cover
  {
    day: "start",
    pct: 0,
    nextLabel: "Start ▸",
    showBack: false,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">Chapter 9 · WHEN THEY WON&apos;T HAVE IT</div>
        <h1>Can&apos;t do it, or won&apos;t have it?</h1>
        <p className="lede">
          Facing a child who refuses, resists, or openly defies, the instructor first looks for
          the good intention beneath the refusal — instead of insisting or clashing with it.
        </p>
      </>
    ),
  },

  // 1 — Monday: reflection + Chapter 8 consolidation
  {
    day: "Monday · 10 min",
    pct: 11,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.k1 && !!a.k2 && !!a.k3 && !!a.k4 && !!a.k5 && !!a.k6,
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Monday</div>
        <h1>How did it go in the pool?</h1>
        <p className="lede">
          Last week: three different ways ready for the same technical thing, and changing course
          if the first didn&apos;t work. Did it help? Which way did you use the most?
        </p>
        <Field id="q2" value={answers.q2 ?? ""} onChange={(v) => setReflection("q2", v)} />
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Consolidation — Chapter 8 comes back</h2>
        <p className="prompt">1. If a way doesn&apos;t work, is the right thing to repeat it louder?</p>
        <OptionGroup
          name="k1"
          options={[
            { value: "no", label: "No — you try a different one", correct: true },
            { value: "si", label: "Yes — if you repeat it more firmly, it usually works", correct: false },
          ]}
          selected={answers.k1}
          onPick={(v, correct) => setResponse("k1", v, correct)}
        />
        <p className="prompt">2. Does a good repertoire have, for every important thing, at least three different ways of saying it?</p>
        <OptionGroup
          name="k2"
          options={[
            { value: "si", label: "Yes", correct: true },
            { value: "no", label: "No, one done well is enough", correct: false },
          ]}
          selected={answers.k2}
          onPick={(v, correct) => setResponse("k2", v, correct)}
        />
        <p className="prompt">3. If a child can&apos;t do it one way, does it mean he can&apos;t do it at all?</p>
        <OptionGroup
          name="k3"
          options={[
            { value: "no", label: "No — it just means that wasn't the right way yet", correct: true },
            { value: "si", label: "Yes — if one way isn't enough, it means the child still can't do it", correct: false },
          ]}
          selected={answers.k3}
          onPick={(v, correct) => setResponse("k3", v, correct)}
        />
        <p className="prompt">4. Does the repertoire have a fixed order, valid for every child?</p>
        <OptionGroup
          name="k4"
          options={[
            { value: "si", label: "Yes — words first, then gesture, then touch, always in that order", correct: false },
            { value: "no", label: "No — it depends on the child", correct: true },
          ]}
          selected={answers.k4}
          onPick={(v, correct) => setResponse("k4", v, correct)}
        />
        <p className="prompt">
          5. You&apos;ve tried all three channels with a child, with no result. Is the right thing
          to invent a fourth variation?
        </p>
        <OptionGroup
          name="k5"
          options={[
            { value: "no", label: "No — it's time to stop and look at what else there is", correct: true },
            { value: "si", label: "Yes, you need to keep pushing", correct: false },
          ]}
          selected={answers.k5}
          onPick={(v, correct) => setResponse("k5", v, correct)}
        />
        <p className="prompt">
          6. Does a channel that worked on one exercise automatically work on the next exercise
          too?
        </p>
        <OptionGroup
          name="k6"
          options={[
            { value: "si", label: "Yes, once found it stays the right one", correct: false },
            { value: "no", label: "No — every new exercise may call for a different channel", correct: true },
          ]}
          selected={answers.k6}
          onPick={(v, correct) => setResponse("k6", v, correct)}
        />
      </>
    ),
  },

  // 2 — Tuesday: explanation + check
  {
    day: "Tuesday · 13 min",
    pct: 27,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.m1 && !!a.m2 && !!a.m3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow">Tuesday</div>
        <h1>&quot;Can&apos;t do it&quot; and &quot;won&apos;t have it&quot; aren&apos;t the same thing</h1>
        <p className="lede" style={{ fontStyle: "italic" }}>
          So far you&apos;ve learned what to do when a child can&apos;t manage it. Today
          you&apos;ll learn the difference — because it isn&apos;t the same thing — when a child
          simply won&apos;t have it.
        </p>
        <p className="lede">
          <strong>&quot;Can&apos;t do it&quot; is a teaching problem.</strong> The child wants to
          do what you&apos;re asking, but the approach doesn&apos;t work yet — that&apos;s what
          you learned in Chapter 8: you change course.
        </p>
        <p className="lede">
          <strong>&quot;Won&apos;t have it&quot; is a whole different thing.</strong> It&apos;s
          not that the approach is wrong: it&apos;s that he, right now, doesn&apos;t want to take
          it. He refuses, resists, sometimes openly defies — especially during the teenage years.
        </p>
        <p className="lede">
          Confusing the two is the second most common mistake of the trade (the first is the one
          from Chapter 8: repeating the same explanation instead of changing course). The reason
          is simple: faced with a refusal, it feels natural to explain again, maybe more clearly.
          That move works for &quot;can&apos;t do it&quot;. But it does nothing for &quot;won&apos;t
          have it&quot;. A child who refuses doesn&apos;t need another explanation: he needs you to
          understand why he&apos;s refusing.
        </p>
        <div className="card quote">
          Even the most irritating behavior — refusal, opposition, defiance — almost always hides
          an intention that, from the point of view of the one doing it, is positive. It
          doesn&apos;t excuse the behavior. But it gives you a different lever to pull.
        </div>
        <p className="lede">
          A child who refuses to get in the water is often not refusing you: he&apos;s protecting
          himself from something he fears. The teenager who defies you in front of the group,
          often, doesn&apos;t want to beat you: he wants to be seen as someone who matters, in
          front of his peers. Once you&apos;ve found the intention, you often also find a way to
          satisfy it without giving ground on the substance.
        </p>
        <p className="lede">
          Refusal isn&apos;t always loud: sometimes it&apos;s a teenager defying you at full
          volume, other times an 11-year-old girl who, without raising her voice, pulls back and
          says &quot;I won&apos;t even try&quot; — same mechanism, different volume.
        </p>
        <p className="lede">
          <strong>And what if even the offer you make gets refused too?</strong> It can happen.
          It&apos;s not an endless negotiation: you can try a second reading, calmly — but if even
          that leads nowhere, it&apos;s fine to stop and say clearly what the limit is, without
          harshness: &quot;ok, we&apos;ll leave this exercise for today — but the session
          continues.&quot; Looking for the good intention doesn&apos;t mean chasing it forever: it
          means giving it a real attempt, not zero attempts.
        </p>
        <h2><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check</h2>
        <p className="prompt">1. Do &quot;can&apos;t do it&quot; and &quot;won&apos;t have it&quot; call for the same response?</p>
        <OptionGroup
          name="m1"
          options={[
            { value: "no", label: "No — one is a teaching issue, the other a relational one", correct: true },
            { value: "si", label: "Yes — either way the right response is to explain it again", correct: false },
          ]}
          selected={answers.m1}
          onPick={(v, correct) => setResponse("m1", v, correct)}
        />
        <p className="prompt">2. Does finding the good intention behind a refusal excuse the behavior?</p>
        <OptionGroup
          name="m2"
          options={[
            { value: "si", label: "Yes — once you understand the reason, the refusal is fine as it is", correct: false },
            { value: "no", label: "No — it just gives you a different lever to pull", correct: true },
          ]}
          selected={answers.m2}
          onPick={(v, correct) => setResponse("m2", v, correct)}
        />
        <p className="prompt">3. If even the second offer gets refused, do you have to keep looking for others forever?</p>
        <OptionGroup
          name="m3"
          options={[
            { value: "no", label: "No — after a real second attempt, it's fine to stop calmly", correct: true },
            { value: "si", label: "Yes, until you find the right one", correct: false },
          ]}
          selected={answers.m3}
          onPick={(v, correct) => setResponse("m3", v, correct)}
        />
      </>
    ),
  },

  // 3 — Wednesday: three scenes + Riccardo simulation (two conditional exchanges)
  {
    day: "Wednesday",
    pct: 44,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => !!a.sim && (a.sim === "impone" || !!a.sim2),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Wednesday</div>
        <h1>Three refusals, three different intentions</h1>
        <div className="card scene">
          <div className="who">A 15-year-old boy</div>
          <p>
            He stops at the poolside, loudly, in front of the group: &quot;this exercise is
            stupid, I&apos;m not doing it.&quot; It&apos;s not that he doesn&apos;t understand the
            point of the exercise: he&apos;s just tested, in front of everyone, whether the
            instructor has control of the situation. The instructor answers, without raising his
            voice: &quot;ok. Show me how you&apos;d do it differently.&quot; It&apos;s not
            surrender — it&apos;s giving him a role, instead of a clash. The boy proposes a small
            variant, close enough to be accepted. The refusal wasn&apos;t about the exercise: it
            was about who decides.
          </p>
        </div>
        <div className="card scene">
          <div className="who">Alice, 12 years old</div>
          <p>
            A starting dive, never tried in front of the group before. She crosses her arms:
            &quot;I&apos;m not doing it, it&apos;s stupid.&quot; No loud defiance, just a flat refusal. The
            instructor understands the problem isn&apos;t the dive: it&apos;s getting it wrong in
            front of her friends. She offers her, quietly, to try it first, while the others are
            still sorting out their caps. Alice does it.
          </p>
        </div>
        <div className="card scene">
          <div className="who">An 8-year-old</div>
          <p>
            He crosses his arms and says nothing, turning to look at the wall, in front of an
            exercise he had already done without trouble the week before. No defiance, no audience
            to impress — just a silent, firm refusal. The instructor, instead of offering
            incentives (&quot;come on, then we&apos;ll play the game you like&quot;) or insisting,
            crouches down to his level: &quot;is today a bit of a heavy day?&quot; The child nods
            just slightly — it&apos;s not opposition, it&apos;s tiredness he can&apos;t yet put
            into the right words at 8. The instructor scales down the exercise, without making it
            a problem. The child does it.
          </p>
        </div>
        <p className="lede">
          <strong>
            Three refusals, three different intentions — challenging who&apos;s in charge,
            protecting himself from his peers&apos; eyes, or simply carrying a tiredness he
            can&apos;t yet put into words — and three different responses, each aimed at the real intention,
            not at the refusal itself.
          </strong>
        </p>
        <p className="prompt">
          A 6-year-old girl, on her third attempt to get into the water, starts crying and says
          &quot;no, I don&apos;t want to, stop.&quot; Write what you do — not what you say to convince
          her, but what you do to understand what&apos;s beneath that &quot;no&quot;.
        </p>
        <Field id="q7" value={answers.q7 ?? ""} onChange={(v) => setReflection("q7", v)} />
        {/* Grading note, not shown to the instructor: the system looks for whether they try to
            understand the cause (fear? tiredness? something that happened before?) instead of
            insisting directly on getting into the water. */}
        <h2>Simulation</h2>
        <p className="lede">
          <strong>RICCARDO, 16 years old.</strong> He crosses his arms: &quot;I don&apos;t feel like
          doing this exercise, period.&quot; What do you say to him?
        </p>
        <OptionGroup
          name="sim"
          options={[
            { value: "impone", label: "You explain again why the exercise matters, or tell him he has to do it anyway" },
            {
              value: "capisce",
              label: "You look for what's underneath, or offer him a choice within a boundary — e.g. \"which other exercise would you like to try?\"",
            },
          ]}
          selected={answers.sim}
          onPick={(v) => setResponse("sim", v)}
        />
        {answers.sim === "impone" && (
          <div className="feedback retry">
            RICCARDO: &quot;I said no.&quot; <em>(walks away, stays out of the exercise)</em>
          </div>
        )}
        {answers.sim === "capisce" && (
          <>
            <div className="feedback ok">
              RICCARDO: &quot;...I don&apos;t know, maybe the dives.&quot;{" "}
              <em>(comes back closer to the group)</em>
              <br />
              You didn&apos;t give ground on the substance — training continues. You gave ground
              on who chooses, and at 16 that&apos;s often what really matters.
            </div>
            <p className="lede" style={{ marginTop: 14 }}>
              After a couple of dives, Riccardo stops again: &quot;no, I&apos;m done with this too, I
              don&apos;t feel like anything today.&quot;
            </p>
            <p className="prompt">Write what you do now.</p>
            <Field id="q7b" value={answers.q7b ?? ""} onChange={(v) => setReflection("q7b", v)} />
            <OptionGroup
              name="sim2"
              options={[
                { value: "ancora", label: "You look for a third alternative, and then a fourth" },
                { value: "confine", label: "After a real second attempt already offered, you calmly say what the limit is" },
              ]}
              selected={answers.sim2}
              onPick={(v) => setResponse("sim2", v)}
            />
            {answers.sim2 === "ancora" && (
              <div className="feedback retry">
                RICCARDO learns that refusing always works — every &quot;no&quot; gets a new offer,
                without ever a real boundary.
              </div>
            )}
            {answers.sim2 === "confine" && (
              <div className="feedback ok">
                RICCARDO: &quot;...ok&quot; <em>(stays in the group, without protesting further)</em>
                <br />
                Looking for the good intention doesn&apos;t mean chasing it forever: a real
                attempt, not zero attempts — and not an endless negotiation either.
              </div>
            )}
          </>
        )}
      </>
    ),
  },

  // 4 — Wednesday evening: transfer
  {
    day: "Wednesday evening",
    pct: 60,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: ({ answers, setReflection }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> End-of-day check — transfer</div>
        <h1>Can&apos;t do it, or won&apos;t have it?</h1>
        <p className="lede">
          A 9-year-old girl, without raising her voice, simply says: &quot;I won&apos;t even try, I
          never manage it anyway.&quot; She&apos;s not angry, she seems resigned.
        </p>
        <p className="prompt">
          Is this &quot;can&apos;t do it&quot; or &quot;won&apos;t have it&quot;? What makes you think
          it&apos;s one rather than the other?
        </p>
        <Field id="qtrasf" value={answers.qtrasf ?? ""} onChange={(v) => setReflection("qtrasf", v)} />
        {/* Grading note, not shown to the instructor: there's no obvious answer — that's
            intentional. The system checks whether they reason about the signal (resignation,
            not active opposition) instead of automatically applying the pattern seen in today's
            examples. It could be both things at once: a real technical difficulty that,
            repeated, has turned into a refusal to try again. */}
      </>
    ),
  },

  // 5 — pool turn
  {
    day: "in the pool",
    pct: 68,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-person-simple-swim" aria-hidden="true" /> Your turn in the pool</div>
        <h1>Intention first, then the response</h1>
        <p className="lede">
          This week, with anyone who refuses something: before insisting, look for the good
          intention beneath the refusal. It doesn&apos;t have to excuse anything — it only has to
          give you a different lever from the one you were about to use.
        </p>
      </>
    ),
  },

  // 6 — Friday: cumulative test Chapter 8 + Chapter 9
  {
    day: "Friday · 11 min",
    pct: 86,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: (a) => ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"].every((k) => !!a[k]),
    render: ({ answers, setResponse, setReflection }: StepContext) => (
      <>
        <div className="eyebrow">Friday — cumulative test: Chapter 8 + Chapter 9</div>
        <h1>The test</h1>
        <p className="prompt">1. Are &quot;can&apos;t do it&quot; and &quot;won&apos;t have it&quot; the same problem?</p>
        <OptionGroup
          name="t1"
          options={[
            { value: "si", label: "Yes — in practice, refusal and difficulty are handled the same way", correct: false },
            { value: "no", label: "No — one is a teaching issue, the other a relational one", correct: true },
          ]}
          selected={answers.t1}
          onPick={(v, correct) => setResponse("t1", v, correct)}
        />
        <p className="prompt">2. A child who refuses needs, above all:</p>
        <OptionGroup
          name="t2"
          options={[
            { value: "capisce", label: "For you to understand what's beneath the refusal", correct: true },
            { value: "spiega", label: "Another, clearer explanation", correct: false },
          ]}
          selected={answers.t2}
          onPick={(v, correct) => setResponse("t2", v, correct)}
        />
        <p className="prompt">3. A 15-year-old defies you in front of the group. What is he likely testing?</p>
        <OptionGroup
          name="t3"
          options={[
            { value: "tecnica", label: "Your technical competence", correct: false },
            { value: "controllo", label: "Whether you have control of the situation", correct: true },
          ]}
          selected={answers.t3}
          onPick={(v, correct) => setResponse("t3", v, correct)}
        />
        <p className="prompt">4. A 12-year-old girl refuses a new exercise in front of the group. What is she most likely protecting?</p>
        <OptionGroup
          name="t4"
          options={[
            { value: "vergogna", label: "She doesn't want to get it wrong in front of her friends", correct: true },
            { value: "sfida", label: "She wants to challenge the instructor's authority", correct: false },
          ]}
          selected={answers.t4}
          onPick={(v, correct) => setResponse("t4", v, correct)}
        />
        <p className="prompt">
          5. <em>(from Chapter 8)</em> If a way doesn&apos;t work, the right thing is:
        </p>
        <OptionGroup
          name="t5"
          options={[
            { value: "forte", label: "Repeat it louder", correct: false },
            { value: "diverso", label: "Use a different one", correct: true },
          ]}
          selected={answers.t5}
          onPick={(v, correct) => setResponse("t5", v, correct)}
        />
        <p className="prompt">6. Is refusal always loud and noisy?</p>
        <OptionGroup
          name="t6"
          options={[
            { value: "no", label: "No — it can also be silent, a quiet pulling back without drama", correct: true },
            { value: "si", label: "Yes — a real refusal always shows, otherwise it isn't genuine", correct: false },
          ]}
          selected={answers.t6}
          onPick={(v, correct) => setResponse("t6", v, correct)}
        />
        <p className="prompt">7. An 8-year-old crosses his arms and doesn&apos;t answer, in front of an exercise he already knew how to do. What might that hide, besides defiance or embarrassment?</p>
        <OptionGroup
          name="t7"
          options={[
            { value: "niente", label: "Nothing, at that age it's always a tantrum", correct: false },
            { value: "stanchezza", label: "Even a tiredness he can't yet put into words", correct: true },
          ]}
          selected={answers.t7}
          onPick={(v, correct) => setResponse("t7", v, correct)}
        />
        <p className="prompt">8. If even the second offer gets refused, do you have to keep looking for others forever?</p>
        <OptionGroup
          name="t8"
          options={[
            { value: "si", label: "Yes, until you find the right one", correct: false },
            { value: "no", label: "No — after a real second attempt, it's fine to calmly say what the limit is", correct: true },
          ]}
          selected={answers.t8}
          onPick={(v, correct) => setResponse("t8", v, correct)}
        />
        <p className="prompt">9. Does saying clearly what the limit is, after a real attempt to understand, contradict &quot;looking for the good intention&quot;?</p>
        <OptionGroup
          name="t9"
          options={[
            { value: "si", label: "Yes, you have to keep pushing until the refusal ends", correct: false },
            { value: "no", label: "No — looking for the intention doesn't mean chasing it forever", correct: true },
          ]}
          selected={answers.t9}
          onPick={(v, correct) => setResponse("t9", v, correct)}
        />
        <p className="prompt">
          10. An 8-year-old refuses an exercise he had already done well the week before. Write in
          two lines what you do before insisting.
        </p>
        <Field id="t10" value={answers.t10 ?? ""} onChange={(v) => setReflection("t10", v)} />
      </>
    ),
  },

  // 7 — feedback: explains how the correction works (§10, D34)
  {
    day: "Friday · feedback",
    pct: 88,
    nextLabel: "Continue ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§10 · Feedback</div>
        <h1>Here&apos;s what your answers say</h1>
        <p className="lede">Not about you — about what you did in these questions.</p>
        <p className="lede" style={{ fontSize: ".85rem", fontStyle: "italic" }}>
          Example of generated feedback, in case of a wrong answer to question 2:
        </p>
        <div className="card quote">
          You answered that a clearer explanation is what&apos;s needed. But if the problem
          isn&apos;t that he doesn&apos;t understand — it&apos;s that he doesn&apos;t want to —
          explaining again changes nothing, because that isn&apos;t the point. First understand
          what&apos;s underneath, then decide what to say.
        </div>
        <p className="lede" style={{ fontSize: ".85rem" }}>
          Feedback never just says &quot;you got it wrong&quot;: it says what to look at next
          time. The tone always stays on the observed behavior, never on the person — the same
          rule from Chapter 7.
        </p>
      </>
    ),
  },

  // 8 — recovery: only if Friday's test has too many mistakes (§12, D25/D27)
  {
    day: "recovery",
    pct: 91,
    nextLabel: "Continue ▸",
    showBack: true,
    visible: (a) => {
      const correct: Record<string, string> = {
        t1: "no", t2: "capisce", t3: "controllo", t4: "vergogna", t5: "diverso",
        t6: "no", t7: "stanchezza", t8: "no", t9: "no",
      };
      const wrong = Object.entries(correct).filter(([k, v]) => a[k] !== v).length;
      return wrong >= 3;
    },
    canNext: (a) => !!a.rec1 && !!a.rec2 && !!a.rec3,
    render: ({ answers, setResponse }: StepContext) => (
      <>
        <div className="eyebrow"><i className="ph-duotone ph-arrow-counter-clockwise" aria-hidden="true" /> Recovery — just because the test found some difficulty</div>
        <h1>Three more examples, to train the boundary</h1>
        <p className="lede">
          It&apos;s not a failure: it&apos;s only the signal that it&apos;s worth revisiting the
          trickiest point of this chapter with a few more examples — recognizing refusal before
          reacting to it.
        </p>

        <div className="card scene">
          <div className="who">A 10-year-old</div>
          <p>
            He stops in front of a new dive and says, flatly: &quot;I&apos;m not doing it.&quot;
            The instructor, out of habit, repeats the technical explanation — slower, more
            detailed — convinced that making it clearer will be enough.
          </p>
        </div>
        <p className="prompt">Is that the right response to a refusal?</p>
        <OptionGroup
          name="rec1"
          options={[
            { value: "si", label: "Yes — a clearer explanation usually dissolves the refusal", correct: false },
            {
              value: "no",
              label: "No — a refusal isn't solved with a clearer explanation: first you need to understand what's underneath",
              correct: true,
            },
          ]}
          selected={answers.rec1}
          onPick={(v, correct) => setResponse("rec1", v, correct)}
        />

        <div className="card scene">
          <div className="who">Alessia, 11 years old</div>
          <p>
            During warm-up, loudly, in front of the group: &quot;I&apos;m not doing little-kid
            games.&quot; The week before, on that exact exercise, she had gotten it wrong in front
            of everyone.
          </p>
        </div>
        <p className="prompt">What is her refusal most likely protecting?</p>
        <OptionGroup
          name="rec2"
          options={[
            { value: "sfida", label: "She wants to challenge the instructor's authority", correct: false },
            {
              value: "imbarazzo",
              label: "She's protecting herself from an embarrassment already lived, not from the exercise itself",
              correct: true,
            },
          ]}
          selected={answers.rec2}
          onPick={(v, correct) => setResponse("rec2", v, correct)}
        />

        <div className="card scene">
          <div className="who">Davide, 14 years old</div>
          <p>
            He refuses the first offer. The instructor offers a second, well-calibrated one:
            refused too. He offers a third, then starts on a fourth.
          </p>
        </div>
        <p className="prompt">Is it right to keep offering alternatives forever?</p>
        <OptionGroup
          name="rec3"
          options={[
            { value: "si", label: "Yes, until you find the right one", correct: false },
            {
              value: "no",
              label: "No — after a real second attempt, it's fine to stop and calmly say what the limit is",
              correct: true,
            },
          ]}
          selected={answers.rec3}
          onPick={(v, correct) => setResponse("rec3", v, correct)}
        />

        <p className="lede" style={{ fontSize: ".85rem", marginTop: 14 }}>
          Refusal is never the real request: it&apos;s the symptom. And looking for the good intention
          doesn&apos;t mean chasing it forever — a real attempt, not zero attempts, and not an
          endless negotiation either.
        </p>
      </>
    ),
  },

  // 9 — result
  {
    day: "Friday · result",
    pct: 95,
    nextLabel: "Go to Dashboard ▸",
    showBack: true,
    canNext: () => true,
    render: () => (
      <>
        <div className="eyebrow">§11 · Result</div>
        <h1>Your profile is updated</h1>
        <div className="card">
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: ".86rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Score</th>
                <th style={{ textAlign: "left", padding: "6px 0", fontSize: ".7rem", color: "var(--ink-soft)", fontWeight: 400 }}>Where it comes from</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>knowledge_score</td>
                <td style={{ padding: "6px 0" }}>The 10 test questions</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>application_score</td>
                <td style={{ padding: "6px 0" }}>Your answer in §7</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>simulation_score</td>
                <td style={{ padding: "6px 0" }}>How you handled Riccardo in §8, across both exchanges</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>reflection_score</td>
                <td style={{ padding: "6px 0" }}>Monday&apos;s account of Chapter 8</td>
                <td style={{ textAlign: "right" }}>recorded ✓</td>
              </tr>
              <tr>
                <td style={{ padding: "6px 0", color: "var(--ink-soft)", fontFamily: "var(--mono)", fontSize: ".72rem" }}>competency_score — Difficult situations</td>
                <td style={{ padding: "6px 0" }}>The lowest of the scores above</td>
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
        <div className="done-badge">✓ Chapter 9 completed</div>
        <div className="eyebrow">Week 9 of 10 · Chapter 10 coming up</div>
        <h1>Letting go</h1>
        <p className="lede">
          You&apos;ve learned to read, to build rapport, to communicate, to verify, to correct, to
          change course, to hold your ground with refusal. Next week closes the circle: how you
          make sure that, one day, you&apos;re no longer needed.
        </p>
        <ChapterVakSection vakProfile={vakProfile} locale="en" />
        <ChapterDiarySection answers={answers} keys={DIARY_KEYS} locale="en" />
        <h2>Your progress</h2>
        <div className="chip-grid">
          <div className="chip consolidata">
            <span className="name">1 · Self-awareness</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">2 · Recognizing the student</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">3 · Watching and understanding <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">4 · Rapport</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">5 · Instructions and congruence</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">6 · Verifying through action <i className="ph-duotone ph-trophy" aria-hidden="true" /></span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">7 · The feedback</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip consolidata">
            <span className="name">8 · Changing course</span>
            <span className="state">consolidated</span>
          </div>
          <div className="chip acquisita">
            <span className="name">9 · Difficult situations</span>
            <span className="state">acquired</span>
          </div>
          <div className="chip non-acquisita">
            <span className="name">10 · Autonomy</span>
            <span className="state">not acquired</span>
          </div>
        </div>
      </>
    ),
  },
];
