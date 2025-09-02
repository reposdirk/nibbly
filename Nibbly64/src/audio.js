// src/audio.js

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(buffer) {
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
}

async function loadSound(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    return audioContext.decodeAudioData(arrayBuffer);
}

let foodSound;
let gameOverSound;

async function initAudio() {
    foodSound = await loadSound('assets/food.wav'); // Placeholder path
    gameOverSound = await loadSound('assets/gameover.wav'); // Placeholder path
}

function playFood() {
    playSound(foodSound);
}

function playGameOver() {
    playSound(gameOverSound);
}

export { initAudio, playFood, playGameOver };