import goblinImage from '../../pic/goblin.png';

export default class GoblinGame {
  constructor(boardElement, boardSize = 4) {
    this.boardElement = boardElement;
    this.boardSize = boardSize;
    this.cells = [];
    this.currentCellIndex = null;
    this.goblinEl = null;
    this.intervalId = null;
  }

  init() {
    this.createBoard();
    this.createGoblin();
    this.startMoving();
  }

  createBoard() {
    const totalCells = this.boardSize * this.boardSize;
    for (let i = 0; i < totalCells; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.id = i;
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createGoblin() {
    this.goblinEl = document.createElement('img');
    this.goblinEl.src = goblinImage;
    this.goblinEl.classList.add('goblin-img');
    this.goblinEl.alt = 'Goblin';

    // Generate a random starting position
    this.currentCellIndex = Math.floor(Math.random() * this.cells.length);
    // Insert the goblin into the new cell, automatically move it without use removeChild!
    this.cells[this.currentCellIndex].appendChild(this.goblinEl);
  }

  getRandomNextIndex() {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * this.cells.length);
    } while (nextIndex === this.currentCellIndex); // Ensure the next cell is not the current one

    return nextIndex;
  }

  moveGoblin() {
    const nextIndex = this.getRandomNextIndex();
    this.currentCellIndex = nextIndex;

    // When you appendChild an existing node, the browser automatically transfers it to a different cell
    this.cells[nextIndex].appendChild(this.goblinEl);
  }

  startMoving(intervalMs = 1000) {
    this.intervalId = setInterval(() => this.moveGoblin(), intervalMs);
  }

  stopMoving() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
