// src/audio.js

const audioContext = new (window.AudioContext || window.webkitAudioContext)();

class SoundEffect {
    constructor(frequency, duration, type = 'square') {
        this.frequency = frequency;
        this.duration = duration;
        this.type = type;
    }

    play() {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = this.type;
        oscillator.frequency.setValueAtTime(this.frequency, audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + this.duration);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + this.duration);
    }
}

const sounds = {
    food: new SoundEffect(440, 0.1),      // A4, kurzer Beep
    gameOver: new SoundEffect(220, 0.5)    // A3, längerer tiefer Ton
};

export function init() {
    // Audio-Kontext initialisieren (muss durch User-Interaktion geschehen)
    document.addEventListener('click', () => {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
    }, { once: true });
}

export function playFood() {
    sounds.food.play();
}

export function playGameOver() {
    sounds.gameOver.play();
}
