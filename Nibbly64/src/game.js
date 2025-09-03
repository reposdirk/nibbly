// src/game.js

export const GRID_WIDTH = 32;
export const GRID_HEIGHT = 24;
export const CELL_SIZE = 20;

const COLORS = {
    BACKGROUND: '#000080', // dunkelblau
    SNAKE: '#00FF00',      // hellgrün
    FOOD: '#FF0000',       // rot
    TEXT: '#D3D3D3'        // hellgrau
};

class Snake {
    constructor() {
        this.body = [{ x: Math.floor(GRID_WIDTH / 2), y: Math.floor(GRID_HEIGHT / 2) }];
        this.direction = { x: 1, y: 0 }; // Start-Richtung: rechts
        this.grow = false;
    }

    update() {
        const head = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };
        
        // Wrap-Handling
        if (this.wrap) {
            if (head.x >= GRID_WIDTH) head.x = 0;
            if (head.x < 0) head.x = GRID_WIDTH - 1;
            if (head.y >= GRID_HEIGHT) head.y = 0;
            if (head.y < 0) head.y = GRID_HEIGHT - 1;
        }

        this.body.unshift(head);
        if (this.grow) {
            this.grow = false;
        } else {
            this.body.pop();
        }
    }

    changeDirection(newDirection) {
        // Keine 180°-Wende erlauben
        if (newDirection.x !== -this.direction.x || newDirection.y !== -this.direction.y) {
            this.direction = newDirection;
        }
    }

    eat() {
        this.grow = true;
    }

    checkCollision() {
        const head = this.body[0];
        
        // Wand-Kollision (wenn wrap aus ist)
        if (!this.wrap) {
            if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) {
                return true;
            }
        }
        
        // Selbst-Kollision
        return this.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    setWrap(wrap) {
        this.wrap = wrap;
    }
}

class Food {
    constructor() {
        this.position = this.spawn();
    }

    spawn() {
        return {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };
    }

    respawn() {
        this.position = this.spawn();
    }
}

export class Game {
    constructor() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.level = 1;
        this.wrap = false;
        this.crtEffect = false;
        this.isGameOver = false;
        this.state = 'menu'; // menu, running, paused, gameover
        this.updateUI();
    }

    resetGame() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.level = 1;
        this.isGameOver = false;
        this.updateUI();
    }

    startGame() {
        this.resetGame();
        this.state = 'running';
        document.getElementById('startHint').style.display = 'none';
        document.getElementById('gameOverHint').style.display = 'none';
    }

    togglePause() {
        if (this.state === 'running') {
            this.state = 'paused';
            document.getElementById('pauseHint').style.display = 'block';
        } else if (this.state === 'paused') {
            this.state = 'running';
            document.getElementById('pauseHint').style.display = 'none';
        }
    }

    toggleWrap() {
        this.wrap = !this.wrap;
        this.snake.setWrap(this.wrap);
        document.getElementById('wrap').textContent = `Wrap: ${this.wrap ? 'On' : 'Off'}`;
    }

    toggleCRT() {
        this.crtEffect = !this.crtEffect;
        document.querySelector('.game-container').classList.toggle('crt', this.crtEffect);
    }

    update(dt) {
        if (this.isGameOver || this.state !== 'running') return;

        this.snake.update();
        
        if (this.snake.checkCollision()) {
            this.isGameOver = true;
            this.state = 'gameover';
            document.getElementById('gameOverHint').style.display = 'block';
            return;
        }

        if (this.snake.body[0].x === this.food.position.x && this.snake.body[0].y === this.food.position.y) {
            this.snake.eat();
            this.food.respawn();
            this.score++;
            
            // Level-Up nach je 5 Punkten
            if (this.score % 5 === 0) {
                this.level++;
            }
            
            this.updateUI();
        }
    }

    updateUI() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('level').textContent = `Level: ${this.level}`;
    }

    render(ctx) {
        // Hintergrund
        ctx.fillStyle = COLORS.BACKGROUND;
        ctx.fillRect(0, 0, GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);

        // Snake
        this.snake.body.forEach(segment => {
            ctx.fillStyle = COLORS.SNAKE;
            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });

        // Food
        ctx.fillStyle = COLORS.FOOD;
        ctx.fillRect(this.food.position.x * CELL_SIZE, this.food.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}
