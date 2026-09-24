// L'UNICO interruttore della fase "app in costruzione" (D73, D74). Finché è acceso:
// - la pagina di login mostra «Entra e prova l'app, senza account» (un profilo di prova
//   condiviso da tutti — non esiste ancora la registrazione, D64);
// - capitoli e turni d'esame sono tutti apribili, senza dover completare i precedenti.
// Al lancio vero si mette a false QUI, e basta: tornano insieme il login obbligatorio e lo
// sblocco in sequenza. Non è una variabile d'ambiente di proposito — deve essere visibile nel
// codice e nel registro, non nascosta in una configurazione dell'hosting.
export const APP_IN_CONSTRUCTION = true;

// Le parti con l'IA (Tutor, Riflessioni, Progresso, «Cosa faccio oggi?») mostrano «In costruzione
// al momento» invece di provare a chiamare il modello (D76). Interruttore separato da quello
// sopra, di proposito: oggi il motivo è il credito Anthropic esaurito — quando torna, si riaccende
// solo questo, senza toccare login e capitoli.
export const AI_IN_CONSTRUCTION = true;
