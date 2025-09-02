# Nibbly64

Nibbly64 is a simple browser game inspired by the classic C64 Snake game. The objective is to control the snake, collect food, and grow while avoiding collisions with itself or walls.

## Getting Started

### Local Development

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Nibbly64
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the specified port).

### Running in Codespaces

To run the game in GitHub Codespaces, follow the same steps as local development. Ensure that you forward the appropriate port to access the game in your browser.

## Controls

- Arrow Keys / WASD: Move the snake
- P: Pause the game
- R: Restart the game
- T: Toggle wrap (teleport to the opposite side)
- C: Toggle CRT effect (if implemented)

## Settings

- The game features a configurable grid size and cell dimensions.
- The snake grows by one segment each time it collects food.
- The game speed increases as the player collects points.

## Known Limitations

- The food may spawn on the snake in rare cases; this will be addressed in future updates.
- Ensure that direction changes are debounced to prevent immediate 180° turns.

Enjoy playing Nibbly64!