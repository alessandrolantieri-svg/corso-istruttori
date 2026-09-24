import { describe, expect, it } from "vitest";
import { splitIntoChunks, pickBestVoice } from "./ttsProvider";

// Voce finta minima — solo i campi che pickBestVoice legge davvero (name, lang). Un cast, non un
// mock di SpeechSynthesisVoice intero: qui si verifica la logica di scelta, non l'API browser
// (quella resta verificata dal vivo, vedi VOICE_ARCHITECTURE.md).
function voice(name: string, lang: string, isDefault = false) {
  return { name, lang, default: isDefault } as unknown as SpeechSynthesisVoice;
}

describe("splitIntoChunks", () => {
  it("frasi vicine e brevi restano nello stesso pezzo — il motore vocale suona più naturale con più testo insieme", () => {
    const chunks = splitIntoChunks("Prima frase. Seconda frase! Terza frase?");
    expect(chunks).toEqual(["Prima frase. Seconda frase! Terza frase?"]);
  });

  it("spezza solo quando il pezzo supererebbe la lunghezza massima, sempre a un confine di frase", () => {
    const lunga = "Questa è una frase piuttosto lunga, scritta apposta per avvicinarsi al limite. ";
    const testo = lunga.repeat(4).trim();
    const chunks = splitIntoChunks(testo);
    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(300);
      expect(chunk.trim().endsWith(".")).toBe(true); // mai spezzato a metà di una frase
    }
    expect(chunks.join(" ")).toBe(testo);
  });

  it("una singola frase più lunga del limite resta comunque un unico pezzo — mai spezzata a metà", () => {
    const frase = "Parola ".repeat(80).trim() + ".";
    expect(splitIntoChunks(frase)).toEqual([frase]);
  });

  it("un testo senza punteggiatura resta un unico pezzo", () => {
    expect(splitIntoChunks("nessuna punteggiatura qui")).toEqual(["nessuna punteggiatura qui"]);
  });

  it("un testo vuoto non produce pezzi vuoti", () => {
    expect(splitIntoChunks("   ")).toEqual(["   "]); // ripiego dichiarato: mai un array vuoto
  });
});

describe("pickBestVoice", () => {
  it("preferisce una voce con indizio di naturalezza nel nome, quando esiste", () => {
    const voices = [
      voice("Microsoft Cosimo - Italian (Italy)", "it-IT"),
      voice("Microsoft Elsa - Italian (Italy)", "it-IT"),
      voice("Microsoft Isabella Online (Natural) - Italian (Italy)", "it-IT"),
    ];
    expect(pickBestVoice(voices, "it-IT")?.name).toBe("Microsoft Isabella Online (Natural) - Italian (Italy)");
  });

  it("senza voci naturali e senza indicazione di default, sceglie comunque la prima disponibile", () => {
    const voices = [voice("Microsoft Cosimo - Italian (Italy)", "it-IT"), voice("Microsoft Elsa - Italian (Italy)", "it-IT")];
    expect(pickBestVoice(voices, "it-IT")?.name).toBe("Microsoft Cosimo - Italian (Italy)");
  });

  it("senza voci naturali, evita quella marcata default dal sistema se ce n'è un'altra (bug reale: Chrome/Brave restituivano sempre la voce classica maschile invece della femminile)", () => {
    const voices = [
      voice("Microsoft Cosimo - Italian (Italy)", "it-IT", true),
      voice("Microsoft Elsa - Italian (Italy)", "it-IT", false),
    ];
    expect(pickBestVoice(voices, "it-IT")?.name).toBe("Microsoft Elsa - Italian (Italy)");
  });

  it("se sono tutte marcate default (o nessuna lo è), ripiega comunque sulla prima — mai undefined quando esistono voci", () => {
    const voices = [
      voice("Microsoft Cosimo - Italian (Italy)", "it-IT", true),
      voice("Microsoft Elsa - Italian (Italy)", "it-IT", true),
    ];
    expect(pickBestVoice(voices, "it-IT")?.name).toBe("Microsoft Cosimo - Italian (Italy)");
  });

  it("nessuna voce per la lingua esatta: ripiega sulla stessa famiglia linguistica", () => {
    const voices = [voice("Some English (US) Voice", "en-US")];
    expect(pickBestVoice(voices, "en-GB")?.name).toBe("Some English (US) Voice");
  });

  it("nessuna voce disponibile: undefined, non un errore", () => {
    expect(pickBestVoice([], "it-IT")).toBeUndefined();
  });
});
