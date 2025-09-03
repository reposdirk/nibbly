// src/storage.js

const STORAGE_KEY = 'nibbly64_highscore';

export function getHighscore() {
    return parseInt(localStorage.getItem(STORAGE_KEY)) || 0;
}

export function setHighscore(score) {
    const currentHighscore = getHighscore();
    if (score > currentHighscore) {
        localStorage.setItem(STORAGE_KEY, score.toString());
        document.getElementById('highscore').textContent = `Highscore: ${score}`;
        return true;
    }
    return false;
}

export function updateHighscoreDisplay() {
    document.getElementById('highscore').textContent = `Highscore: ${getHighscore()}`;
}
