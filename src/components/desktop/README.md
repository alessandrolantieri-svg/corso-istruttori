# Cartella desktop — leggi prima di aggiungere qualcosa qui

**Questa cartella esiste per un solo motivo**: dare a chi usa l'app da PC (schermo largo) una
barra laterale con capitoli/esame/Casi Reali a fianco del contenuto, invece della colonna unica
pensata per il telefono. Decisione presa il 13 settembre 2026 (D65 in
`01_ANALISI/DECISIONI PRESE.md`), su richiesta esplicita del proprietario, isolata di proposito
in questa cartella separata.

**Regola ferma**: niente qui dentro deve mai cambiare cosa vede o come si comporta l'app su
telefono. Ogni componente attiva la propria parte di interfaccia solo sopra una soglia di
larghezza (oggi 960px, vedi `DESKTOP_BREAKPOINT` in `useIsDesktop.ts`) — sotto quella soglia,
questi componenti non renderizzano nulla, e la pagina resta esattamente come prima di questa
cartella.

**Cosa NON fare**: non duplicare qui le pagine esistenti (niente `src/app/desktop/...`, niente
copie di `ChapterRunner`/`dashboard/page.tsx`) — si aggiunge solo la *cornice* (barra laterale +
impaginazione a due colonne) attorno al contenuto che le pagine vere già producono, leggendo dati
già calcolati altrove (mai una seconda query Prisma per le stesse informazioni).

**Stato**: esteso a tutte le pagine principali — capitolo/esame/Caso Reale (via `ChapterRunner`),
Dashboard, Assistente e Attestato. Ogni pagina resta proprietaria del suo contenuto; questa
cartella aggiunge solo la barra e l'impaginazione a due colonne attorno.
