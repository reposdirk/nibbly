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
        crt: false
    },
    direction: { x: 1, y: 0 },
    lastDirection: { x: 1, y: 0 },

    init() {
        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    },

    handleKeyDown(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'k':
                if (this.lastDirection.y === 0) {
                    this.direction = { x: 0, y: -1 };
                }
                this.keys.up = true;
                break;
            case 'ArrowDown':
            case 's':
            case 'j':
                if (this.lastDirection.y === 0) {
                    this.direction = { x: 0, y: 1 };
                }
                this.keys.down = true;
                break;
            case 'ArrowLeft':
            case 'a':
            case 'h':
                if (this.lastDirection.x === 0) {
                    this.direction = { x: -1, y: 0 };
                }
                this.keys.left = true;
                break;
            case 'ArrowRight':
            case 'd':
            case 'l':
                if (this.lastDirection.x === 0) {
                    this.direction = { x: 1, y: 0 };
                }
                this.keys.right = true;
                break;
            case 'p':
            case 'P':
                this.keys.pause = true;
                break;
            case 'r':
            case 'R':
                this.keys.restart = true;
                break;
            case 't':
            case 'T':
                this.keys.wrap = true;
                break;
            case 'c':
            case 'C':
                this.keys.crt = true;
                break;
        }
    },

    handleKeyUp(event) {
        switch (event.key) {
            case 'ArrowUp':
            case 'w':
            case 'k':
                this.keys.up = false;
                break;
            case 'ArrowDown':
            case 's':
            case 'j':
                this.keys.down = false;
                break;
            case 'ArrowLeft':
            case 'a':
            case 'h':
                this.keys.left = false;
                break;
            case 'ArrowRight':
            case 'd':
            case 'l':
                this.keys.right = false;
                break;
            case 'p':
            case 'P':
                this.keys.pause = false;
                break;
            case 'r':
            case 'R':
                this.keys.restart = false;
                break;
            case 't':
            case 'T':
                this.keys.wrap = false;
                break;
            case 'c':
            case 'C':
                this.keys.crt = false;
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
    input.init();

    window.addEventListener('keydown', (e) => {
        switch (e.key) {
            case ' ':
            case 'Space':
                if (game.state === 'menu') {
                    game.startGame();
                }
                break;
            case 'p':
            case 'P':
                game.togglePause();
                break;
            case 'r':
            case 'R':
                if (game.state === 'gameover') {
                    game.startGame();
                }
                break;
            case 't':
            case 'T':
                game.toggleWrap();
                break;
            case 'c':
            case 'C':
                game.toggleCRT();
                break;
        }
    });

    return input;
}

export default input;
