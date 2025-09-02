Erzeuge ein kleines Browser-Spiel in Vanilla JavaScript namens Nibbly64, inspiriert von C64-„Snake“. Anforderungen und Deliverables:

Ziel & Gameplay

Spielfeld als rasterbasiertes Canvas (z. B. 32×24 Zellen, anpassbare Zellgröße).

Steuerung: Pfeiltasten + WASD, optional HJKL. Keine 180°-Sofortwende.

Der Wurm bewegt sich in Ticks (Game Loop mit requestAnimationFrame + Fixed-Step Logic).

Ein „Punkt“ (Food) spawnt zufällig auf freien Zellen; bei Aufnahme wächst der Wurm um 1 Segment.

Kollisionen: mit sich selbst und optional Wänden ⇒ Game Over.

Konfig-Option: Wrap an/aus (Rand teleportiert auf Gegenseite, C64-Feeling).

Schwierigkeit: Basis-Speed + Level-Up nach X gesammelten Punkten (Tick-Intervall wird kürzer).

Pause (P), Neustart (R), Toggle Wrap (T) im Spiel.

Score + Highscore (persistiert in localStorage).

C64-Look & Audio

Farbpalette: nutze eine C64-ähnliche Palette als Konstanten (z. B. Hintergrund: dunkelblau; Wurm: hellgrün; Food: rot; Text/HUD: hellgrau).

Pixel-Font (lizenzfreie Alternativen) oder CSS-Nearest-Neighbor-Scaling, kein Anti-Aliasing (image-rendering: pixelated).

Optionaler CRT-Effekt: dezente Scanlines/Mask via CSS (abschaltbar).

SFX per Web Audio API: leiser „Beep“ beim Food, anderer Ton bei Game Over.

Code-Struktur (Dateien anlegen)

index.html: Canvas + HUD-Container, Meta-Tags, Title „Nibbly64“.

styles.css: C64-Farben, Pixel-Look, Responsive-Scaling (Canvas zentriert, füllt Breite bis Max-Pixelmaß).

src/main.js: Bootstrapping, Game Loop.

src/game.js: Spiellogik (Grid, Snake, Food, Collision, Scoring, State Machine).

src/input.js: Keyboard-Handling (debounced Richtungswechsel).

src/audio.js: einfache Sound-Helper (init, playFood, playGameOver).

src/storage.js: Highscore-Read/Write (localStorage).

assets/ (leer, falls später Sprites/Sounds dazukommen).

README.md: Kurzanleitung.

Technik & Qualität

Kein Framework, keine externen Libs. Nur Vanilla JS + Canvas.

Saubere Module, keine globalen Variablen; verwende ES-Module (type="module").

Timestep: Fixe Logik-Ticks (z. B. 8–12 pro Sekunde), Rendering entkoppelt.

Spielfeld/Größe konfigurierbar über Konstanten.

Klar getrennte Zustände: menu, running, paused, gameover.

Funktionen: resetGame(), update(dt), render(ctx), spawnFood(), checkCollision().

Edge-Cases: Food nicht auf Snake spawnen; Richtungsinput pro Tick exakt eine Änderung; bei Wrap kein Selbstkollision-Bug.

Linting: einfache ESLint-Config (empfohlen), optional.

README mit: Start (lokal & Codespaces), Steuerung, Settings, bekannte Limitierungen.

Dev-Komfort

Füge in package.json ein Skript dev mit einfachem Static-Server (Node http oder Vite im „vanilla“-Modus ohne Plugins; wenn Vite, minimal konfigurieren).

Port-Forwarding Hinweis für Codespaces in README.

Baue kleine In-Game-HUD (Score, Highscore, Level, Wrap-Status, Pausen-Hinweis).

Abnahme-Kriterien

Spiel startet direkt in Codespaces per npm install + npm run dev.

Snake bewegt sich geschmeidig; Food-Pickup verlängert zuverlässig.

Game Over funktioniert; Neustart setzt State korrekt zurück.

Highscore bleibt nach Reload erhalten.

CRT-Effekt lässt sich per Taste (z. B. C) toggeln.

Code ist in einzelne Dateien aufgeteilt wie oben beschrieben.

Erzeuge alle Dateien jetzt und befülle sie vollständig.