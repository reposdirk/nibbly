# Nibbly64

Ein C64-inspiriertes Snake-Spiel in Vanilla JavaScript.

## Start & Installation

### Lokal

```bash
npm install
npm run dev
```

### GitHub Codespaces

Das Spiel startet automatisch nach dem Öffnen des Codespaces:

1. npm install
2. npm run dev
3. Port 5173 wird automatisch weitergeleitet

## Steuerung

- **Pfeiltasten** oder **WASD**: Snake steuern
- **Leertaste**: Spiel starten
- **P**: Pause
- **R**: Neustart
- **T**: Wrap-Modus (Rand-Teleport) an/aus
- **C**: CRT-Effekt an/aus

## Features

- C64-inspirierte Farbpalette und Pixel-Look
- Klassisches Snake-Gameplay
- Highscore-System (localStorage)
- Level-System mit steigender Geschwindigkeit
- Optionaler CRT-Effekt
- Sound-Effekte

## Bekannte Limitierungen

- Food kann theoretisch auf der Snake spawnen
- Bei sehr schnellem Richtungswechsel kann es zu unerwarteten Kollisionen kommen
- Sound-Effekte sind sehr minimalistisch
