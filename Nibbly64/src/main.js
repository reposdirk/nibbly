// src/main.js

import { Game } from './game.js';
import { setupInput } from './input.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const game = new Game();
setupInput(game);

let lastTime = 0;
const TICK_INTERVAL = 1000 / 10; // 10 Ticks/Sekunde
let tickAccumulator = 0;

canvas.width = GRID_WIDTH * CELL_SIZE;
canvas.height = GRID_HEIGHT * CELL_SIZE;

function gameLoop(time) {
    const dt = time - lastTime;
    lastTime = time;
    tickAccumulator += dt;

    if (game.state === 'menu') {
        game.render(ctx);
        document.getElementById('startHint').style.display = 'block';
    } else if (game.state === 'running') {
        while (tickAccumulator > TICK_INTERVAL) {
            game.update(TICK_INTERVAL);
            tickAccumulator -= TICK_INTERVAL;
        }
        game.render(ctx);
    }
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);