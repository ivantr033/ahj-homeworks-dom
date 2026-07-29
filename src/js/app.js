import GoblinGame from './GoblinGame';

document.addEventListener('DOMContentLoaded', () => {
  const boardContainer = document.getElementById('game-board');
  const game = new GoblinGame(boardContainer);
  game.init();
});
