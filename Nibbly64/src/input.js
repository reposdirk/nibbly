// src/input.js

const input = {
    keys: {
        up: false,
        down: false,
        left: false,
        right: false,
        wrap: false,
        pause: false,
        restart: false,
    },
    direction: { x: 0, y: 0 },
    lastDirection: { x: 0, y: 0 },

    init() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    },

    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                if (this.lastDirection.y === 0) {
                    this.direction = { x: 0, y: -1 };
                }
                this.keys.up = true;
                break;
            case 'ArrowDown':
            case 's':
                if (this.lastDirection.y === 0) {
                    this.direction = { x: 0, y: 1 };
                }
                this.keys.down = true;
                break;
            case 'ArrowLeft':
            case 'a':
                if (this.lastDirection.x === 0) {
                    this.direction = { x: -1, y: 0 };
                }
                this.keys.left = true;
                break;
            case 'ArrowRight':
            case 'd':
                if (this.lastDirection.x === 0) {
                    this.direction = { x: 1, y: 0 };
                }
                this.keys.right = true;
                break;
            case 'p':
                this.keys.pause = true;
                break;
            case 'r':
                this.keys.restart = true;
                break;
            case 't':
                this.keys.wrap = !this.keys.wrap;
                break;
        }
    },

    handleKeyUp(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
                this.keys.up = false;
                break;
            case 'ArrowDown':
            case 's':
                this.keys.down = false;
                break;
            case 'ArrowLeft':
            case 'a':
                this.keys.left = false;
                break;
            case 'ArrowRight':
            case 'd':
                this.keys.right = false;
                break;
            case 'p':
                this.keys.pause = false;
                break;
            case 'r':
                this.keys.restart = false;
                break;
        }
    },

    updateDirection() {
        if (this.direction.x !== 0 || this.direction.y !== 0) {
            this.lastDirection = { ...this.direction };
        }
    }
};

export function setupInput(game) {
    window.addEventListener('keydown', (e) => {
        console.log(`Taste gedrückt: ${e.code}`); // Debug-Zeile
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                if (input.lastDirection.y === 0) {
                    input.direction = { x: 0, y: -1 };
                }
                input.keys.up = true;
                break;
            case 'ArrowDown':
            case 's':
                if (input.lastDirection.y === 0) {
                    input.direction = { x: 0, y: 1 };
                }
                input.keys.down = true;
                break;
            case 'ArrowLeft':
            case 'a':
                if (input.lastDirection.x === 0) {
                    input.direction = { x: -1, y: 0 };
                }
                input.keys.left = true;
                break;
            case 'ArrowRight':
            case 'd':
                if (input.lastDirection.x === 0) {
                    input.direction = { x: 1, y: 0 };
                }
                input.keys.right = true;
                break;
            case 'p':
                input.keys.pause = true;
                break;
            case 'r':
                input.keys.restart = true;
                break;
            case 't':
                input.keys.wrap = !input.keys.wrap;
                break;
            case 'Space':
            case ' ':
                if (game.state === 'menu') {
                    game.startGame();
                }
                break;
        }
    });
}

export default input;