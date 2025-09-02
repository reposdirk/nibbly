// src/storage.js

const HIGH_SCORE_KEY = 'nibbly64_highscore';

export function saveHighScore(score) {
    localStorage.setItem(HIGH_SCORE_KEY, score);
}

export function getHighScore() {
    return parseInt(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
}