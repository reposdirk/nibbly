// src/game.js

const GRID_WIDTH = 32;
const GRID_HEIGHT = 24;
const CELL_SIZE = 20;

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
        this.body.unshift(head);
        if (this.grow) {
            this.grow = false;
        } else {
            this.body.pop();
        }
    }

    changeDirection(newDirection) {
        if (newDirection.x !== -this.direction.x || newDirection.y !== -this.direction.y) {
            this.direction = newDirection;
        }
    }

    eat() {
        this.grow = true;
    }

    checkCollision() {
        const head = this.body[0];
        return this.body.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
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
        this.isGameOver = false;
        this.state = 'menu'; // menu, running, paused, gameover
    }

    resetGame() {
        this.snake = new Snake();
        this.food = new Food();
        this.score = 0;
        this.isGameOver = false;
    }

    startGame() {
        this.resetGame();
        this.state = 'running';
        document.getElementById('startHint').style.display = 'none';
    }

    update(dt) {
        if (this.isGameOver) return;

        this.snake.update();
        if (this.snake.checkCollision()) {
            this.isGameOver = true;
        }

        if (this.snake.body[0].x === this.food.position.x && this.snake.body[0].y === this.food.position.y) {
            this.snake.eat();
            this.food.respawn();
            this.score++;
        }
    }

    render(ctx) {
        ctx.fillStyle = COLORS.BACKGROUND;
        ctx.fillRect(0, 0, GRID_WIDTH * CELL_SIZE, GRID_HEIGHT * CELL_SIZE);

        this.snake.body.forEach(segment => {
            ctx.fillStyle = COLORS.SNAKE;
            ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        });

        ctx.fillStyle = COLORS.FOOD;
        ctx.fillRect(this.food.position.x * CELL_SIZE, this.food.position.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        ctx.fillStyle = COLORS.TEXT;
        ctx.fillText(`Score: ${this.score}`, 10, 20);
    }
}
