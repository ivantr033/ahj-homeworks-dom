import GoblinGame from '../GoblinGame';

describe('GoblinGame', () => {
  let container;
  let game;

  beforeEach(() => {
    jest.useFakeTimers();
    document.body.innerHTML = '<div id="game-container"></div>';
    container = document.getElementById('game-container');
  });

  afterEach(() => {
    if (game) {
      game.stopMoving();
    }
    jest.clearAllTimers();
  });

  test('This should generate the 16 squares and place the goblin in the initialization', () => {
    game = new GoblinGame(container);
    game.init();

    const cells = container.querySelectorAll('.cell');
    const goblinImg = container.querySelector('.goblin-img');

    // Measure cells and presence of the goblin in the DOM
    expect(cells.length).toBe(16);
    expect(goblinImg).not.toBeNull();
  });

  test('This should change cells when moveGoblin is executed', () => {
    game = new GoblinGame(container);
    game.init();

    const initialIndex = game.currentCellIndex;

    // Force the passage of time for the "setInterval" to take effect (1000ms)
    jest.advanceTimersByTime(1000);

    const newIndex = game.currentCellIndex;

    // Verify that the goblin has moved to a different cell
    expect(newIndex).not.toBe(initialIndex);
  });

  test('stopMoving should not fail if the interval has not started', () => {
    const game = new GoblinGame(container);
    // Calling stopMoving without having called init() before
    expect(() => game.stopMoving()).not.toThrow();
  });
});