// src/main.js

import { Game, GRID_WIDTH, GRID_HEIGHT, CELL_SIZE } from './game.js';
import { setupInput } from './input.js';
import * as audio from './audio.js';
import { updateHighscoreDisplay } from './storage.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const game = new Game();
const input = setupInput(game);

// Canvas-Größe setzen
canvas.width = GRID_WIDTH * CELL_SIZE;
canvas.height = GRID_HEIGHT * CELL_SIZE;

// Audio initialisieren
audio.init();

// Highscore anzeigen
updateHighscoreDisplay();

// Game Loop
let lastTime = 0;
const BASE_TICK_INTERVAL = 1000 / 8; // 8 Ticks/Sekunde Basis-Geschwindigkeit
let tickAccumulator = 0;

function getTickInterval() {
    // Geschwindigkeit erhöht sich mit Level
    return BASE_TICK_INTERVAL / (1 + (game.level - 1) * 0.1);
}

function gameLoop(time) {
    const dt = time - lastTime;
    lastTime = time;
    tickAccumulator += dt;

    if (game.state === 'menu') {
        game.render(ctx);
        document.getElementById('startHint').style.display = 'block';
    } else if (game.state === 'running') {
        const interval = getTickInterval();
        
        while (tickAccumulator >= interval) {
            // Input verarbeiten
            game.snake.changeDirection(input.direction);
            input.updateDirection();
            
            // Spiel-Update
            game.update(interval);
            
            tickAccumulator -= interval;
        }
        
        game.render(ctx);
    }
    
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
