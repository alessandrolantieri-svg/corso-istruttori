import type { Tier } from "./score";
import type { Locale } from "@/lib/i18n/catalog";

// Testo originariamente portato verbatim da 06_ATTESTATO/attestato.html (design approvato, D22)
// — solo in italiano. Tradotto nelle altre 5 lingue su richiesta esplicita del proprietario
// (D58/D59): l'italiano resta il master, non va più toccato — le altre lingue si aggiornano di
// conseguenza se il testo italiano cambia in futuro. Le parole di livello non sono traduzioni
// letterali: ogni lingua usa il termine accademico che userebbe davvero per un attestato in
// quella lingua (es. "Matrícula de Honor" in spagnolo, "Distinção e Louvor" in portoghese, non
// "100 e lode" tradotto parola per parola) — scelta interpretativa dichiarata, non un dato che
// esisteva già da qualche parte.

export const TIER_WORD: Record<Locale, Record<Tier, string>> = {
  it: { sufficiente: "Sufficiente", buono: "Buono", ottimo: "Ottimo", lode: "100 e lode" },
  en: { sufficiente: "Satisfactory", buono: "Good", ottimo: "Very Good", lode: "Highest Honours" },
  es: { sufficiente: "Suficiente", buono: "Bien", ottimo: "Notable", lode: "Matrícula de Honor" },
  fr: { sufficiente: "Passable", buono: "Bien", ottimo: "Très Bien", lode: "Félicitations du Jury" },
  "pt-PT": { sufficiente: "Suficiente", buono: "Bom", ottimo: "Muito Bom", lode: "Distinção e Louvor" },
  "pt-BR": { sufficiente: "Suficiente", buono: "Bom", ottimo: "Ótimo", lode: "Distinção e Louvor" },
};

export const TIER_BODY: Record<Locale, Record<Tier, { pre: string; bold: string; post: string }>> = {
  it: {
    sufficiente: {
      pre: "ha completato il percorso di dieci settimane e superato l'esame finale, ",
      bold: "raggiungendo la competenza richiesta in tutte le aree",
      post: " del metodo insegnato in questo corso.",
    },
    buono: {
      pre: "ha completato il percorso di dieci settimane e superato l'esame finale, ",
      bold: "consolidando la maggior parte delle competenze",
      post: " del metodo insegnato in questo corso.",
    },
    ottimo: {
      pre: "ha completato il percorso di dieci settimane e superato l'esame finale, dimostrando un ",
      bold: "controllo solido e ormai maturo",
      post: " del metodo insegnato in questo corso.",
    },
    lode: {
      pre: "ha completato il percorso di dieci settimane e superato l'esame finale, dimostrando ",
      bold: "padronanza completa",
      post: " del metodo — messa alla prova, con successo, da un imprevisto reale durante l'esame.",
    },
  },
  en: {
    sufficiente: {
      pre: "has completed the ten-week path and passed the final exam, ",
      bold: "reaching the required competency in every area",
      post: " of the method taught in this course.",
    },
    buono: {
      pre: "has completed the ten-week path and passed the final exam, ",
      bold: "consolidating most of the competencies",
      post: " of the method taught in this course.",
    },
    ottimo: {
      pre: "has completed the ten-week path and passed the final exam, demonstrating ",
      bold: "solid, by-now mature command",
      post: " of the method taught in this course.",
    },
    lode: {
      pre: "has completed the ten-week path and passed the final exam, demonstrating ",
      bold: "complete mastery",
      post: " of the method — tested, successfully, by a real unexpected event during the exam.",
    },
  },
  es: {
    sufficiente: {
      pre: "ha completado el recorrido de diez semanas y superado el examen final, ",
      bold: "alcanzando la competencia requerida en todas las áreas",
      post: " del método enseñado en este curso.",
    },
    buono: {
      pre: "ha completado el recorrido de diez semanas y superado el examen final, ",
      bold: "consolidando la mayoría de las competencias",
      post: " del método enseñado en este curso.",
    },
    ottimo: {
      pre: "ha completado el recorrido de diez semanas y superado el examen final, demostrando un ",
      bold: "dominio sólido y ya maduro",
      post: " del método enseñado en este curso.",
    },
    lode: {
      pre: "ha completado el recorrido de diez semanas y superado el examen final, demostrando un ",
      bold: "dominio completo",
      post: " del método — puesto a prueba, con éxito, por un imprevisto real durante el examen.",
    },
  },
  fr: {
    sufficiente: {
      pre: "a terminé le parcours de dix semaines et réussi l'examen final, ",
      bold: "atteignant la compétence requise dans tous les domaines",
      post: " de la méthode enseignée dans ce cours.",
    },
    buono: {
      pre: "a terminé le parcours de dix semaines et réussi l'examen final, ",
      bold: "consolidant la plupart des compétences",
      post: " de la méthode enseignée dans ce cours.",
    },
    ottimo: {
      pre: "a terminé le parcours de dix semaines et réussi l'examen final, démontrant une ",
      bold: "maîtrise solide et désormais mature",
      post: " de la méthode enseignée dans ce cours.",
    },
    lode: {
      pre: "a terminé le parcours de dix semaines et réussi l'examen final, démontrant une ",
      bold: "maîtrise complète",
      post: " de la méthode — mise à l'épreuve, avec succès, par un imprévu réel pendant l'examen.",
    },
  },
  "pt-PT": {
    sufficiente: {
      pre: "completou o percurso de dez semanas e foi aprovado no exame final, ",
      bold: "atingindo a competência exigida em todas as áreas",
      post: " do método ensinado neste curso.",
    },
    buono: {
      pre: "completou o percurso de dez semanas e foi aprovado no exame final, ",
      bold: "consolidando a maior parte das competências",
      post: " do método ensinado neste curso.",
    },
    ottimo: {
      pre: "completou o percurso de dez semanas e foi aprovado no exame final, demonstrando um ",
      bold: "domínio sólido e já maduro",
      post: " do método ensinado neste curso.",
    },
    lode: {
      pre: "completou o percurso de dez semanas e foi aprovado no exame final, demonstrando ",
      bold: "domínio completo",
      post: " do método — posto à prova, com sucesso, por um imprevisto real durante o exame.",
    },
  },
  "pt-BR": {
    sufficiente: {
      pre: "completou a jornada de dez semanas e foi aprovado no exame final, ",
      bold: "atingindo a competência exigida em todas as áreas",
      post: " do método ensinado neste curso.",
    },
    buono: {
      pre: "completou a jornada de dez semanas e foi aprovado no exame final, ",
      bold: "consolidando a maior parte das competências",
      post: " do método ensinado neste curso.",
    },
    ottimo: {
      pre: "completou a jornada de dez semanas e foi aprovado no exame final, demonstrando um ",
      bold: "domínio sólido e já maduro",
      post: " do método ensinado neste curso.",
    },
    lode: {
      pre: "completou a jornada de dez semanas e foi aprovado no exame final, demonstrando ",
      bold: "domínio completo",
      post: " do método — posto à prova, com sucesso, por um imprevisto real durante o exame.",
    },
  },
};

export const LODE_LINE: Record<Locale, string> = {
  it: "✦ 100 e lode — evidenza di adattamento in tempo reale durante l'esame",
  en: "✦ Highest Honours — evidence of real-time adaptation during the exam",
  es: "✦ Matrícula de Honor — evidencia de adaptación en tiempo real durante el examen",
  fr: "✦ Félicitations du Jury — preuve d'adaptation en temps réel pendant l'examen",
  "pt-PT": "✦ Distinção e Louvor — prova de adaptação em tempo real durante o exame",
  "pt-BR": "✦ Distinção e Louvor — prova de adaptação em tempo real durante o exame",
};

export const TAGLINE: Record<Locale, string> = {
  it: "Un metodo per capire chi hai davanti e trovare il modo giusto per arrivare a lui",
  en: "A method to understand who's in front of you and find the right way to reach them",
  es: "Un método para entender a quién tienes delante y encontrar la manera correcta de llegar a él",
  fr: "Une méthode pour comprendre qui tu as en face de toi et trouver la bonne façon de l'atteindre",
  "pt-PT": "Um método para perceberes quem tens à tua frente e encontrares o modo certo de chegar até ele",
  "pt-BR": "Um método para entender quem você tem à sua frente e encontrar o jeito certo de chegar até ele",
};

// Le cinque etichette fisse del layout (CertificateImage.tsx) — "La Chiave Giusta" resta il nome
// proprio del corso, mai tradotto, in nessuna lingua.
export const CERT_LABELS: Record<
  Locale,
  { completionEyebrow: string; certifiesThat: string; completedOnLabel: string; finalScoreLabel: string; verifiedByLabel: string }
> = {
  it: {
    completionEyebrow: "Attestato di completamento",
    certifiesThat: "Si certifica che",
    completedOnLabel: "Completato il",
    finalScoreLabel: "Punteggio finale",
    verifiedByLabel: "Verificato da",
  },
  en: {
    completionEyebrow: "Certificate of Completion",
    certifiesThat: "This certifies that",
    completedOnLabel: "Completed on",
    finalScoreLabel: "Final score",
    verifiedByLabel: "Verified by",
  },
  es: {
    completionEyebrow: "Certificado de Finalización",
    certifiesThat: "Se certifica que",
    completedOnLabel: "Completado el",
    finalScoreLabel: "Puntuación final",
    verifiedByLabel: "Verificado por",
  },
  fr: {
    completionEyebrow: "Attestation de Réussite",
    certifiesThat: "Il est certifié que",
    completedOnLabel: "Terminé le",
    finalScoreLabel: "Score final",
    verifiedByLabel: "Vérifié par",
  },
  "pt-PT": {
    completionEyebrow: "Certificado de Conclusão",
    certifiesThat: "Certifica-se que",
    completedOnLabel: "Concluído em",
    finalScoreLabel: "Pontuação final",
    verifiedByLabel: "Verificado por",
  },
  "pt-BR": {
    completionEyebrow: "Certificado de Conclusão",
    certifiesThat: "Certifica-se que",
    completedOnLabel: "Concluído em",
    finalScoreLabel: "Pontuação final",
    verifiedByLabel: "Verificado por",
  },
};
