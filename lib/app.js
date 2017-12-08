import Game from './game.js';
//
// document.addEventListener('DOMContentLoaded', () => {
//   const canvas = document.getElementById("game-canvas");
//   const ctx = canvas.getContext("2d");
//   const game = new Game(ctx);
//   game.run();
// });

const GAME_MODES = [
  {num_players: 1, num_bots: 1},
  {num_players: 1, num_bots: 3},
  {num_players: 2, num_bots: 0},
  {num_players: 2, num_bots: 2},
];

const gameModeButtons = document.querySelectorAll("#game-modes button");
gameModeButtons.forEach((button, idx) => {
  if (idx < 4) {
    button.addEventListener("click", startGame(GAME_MODES[idx]));
  } else {
    button.addEventListener("click", displayControls);
  }
});

function startGame(mode) {
  return function() {
    const menu = document.getElementById("game-menu");
    menu.style.display = "none";
    const canvas = document.getElementById("game-canvas");
    const ctx = canvas.getContext("2d");
    const game = new Game(ctx, mode);
    game.run();
  };
}

function displayControls() {
  const gameModes = document.getElementById("game-modes");
  gameModes.style.display = "none";
  const controls = document.getElementById("controls");
  controls.style.display = "flex";
  const back = document.getElementById("back-button");
  back.addEventListener("click", displayModes);
}

function displayModes() {
  const controls = document.getElementById("controls");
  controls.style.display = "none";
  const gameModes = document.getElementById("game-modes");
  gameModes.style.display = "flex";
}
