# 2048 Game

## Overview

This project is a React-based implementation of the classic 2048 puzzle game. The game logic, styling, and interactive elements are all built using React, taking advantage of hooks for state management and effects.

## How to Play

The goal of the game is to combine numbered tiles to eventually create a tile with the value 2048.

### Instructions

1.  Use the arrow keys on your keyboard to move all tiles on the grid.
2.  All tiles slide in the direction you choose until they hit another tile or the edge of the grid.
3.  When two tiles with the same number collide, they merge into a single tile with the sum of the two original tiles.
4.  A new tile (either a 2 or a 4) appears on the grid after each move.
5.  The game ends when the grid is full and there are no more possible moves (no adjacent tiles with the same value).

## Controls

*   **Arrow Keys:** Move tiles up, down, left, or right.
*   **Swipe Gestures:** Swipe on touch screens to move tiles.
*   **On-screen Buttons:** Use the arrow buttons on the game interface.
*   **Reset Button:** Restarts the game, clearing the board and score.

## Technologies Used

*   React
*   Vite
*   CSS

## Project Structure

*   `src/App.jsx`: Main component containing the game logic, state management, and rendering.
*   `src/App.css`: Styles for the game components, grid, tiles, and game-over screen.
*   `src/index.css`: Global styles for the application.
*   `src/main.jsx`: Entry point for the React application.
*   `index.html`: HTML template that hosts the React application.
*   `vite.config.js`: Configuration file for Vite, including React plugin and base URL.
*   `package.json`: Includes project dependencies and scripts for development, build, and deployment.

## Getting Started

To run the game locally, follow these steps:

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    ```
2.  Navigate to the project directory:

    ```bash
    cd 2048
    ```
3.  Install the dependencies:

    ```bash
    npm install
    ```
4.  Start the development server:

    ```bash
    npm run dev
    ```
5.  Open your browser and go to the address provided by Vite (usually `http://localhost:5173`).

## Building and Deploying

To build the game for production:

```bash
npm run build