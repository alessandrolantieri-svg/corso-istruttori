import { defineConfig } from "vitest/config";
import path from "node:path";

// FASE 10: test solo sulla logica pura (motore comandi, TTS/STT, segnale Tutor, catalogo i18n) —
// ambiente "node", non jsdom: nessuno di questi test tocca il DOM o una API browser reale, e un
// ambiente browser finto darebbe una falsa sicurezza su cose verificate solo dal vivo (vedi
// VOICE_ARCHITECTURE.md, "Cosa manca ancora, di proposito").
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
