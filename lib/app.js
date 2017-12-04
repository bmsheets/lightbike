import Game from './game.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  window.onload = () => {
    game.run();
  };
});
