import GameController from '../GameController';
import GamePlay from '../GamePlay';
import GameState from '../GameState';
import PositionedCharacter from '../PositionedCharacter';
import Bowman from '../characters/bowman';

test('Test', () => {
  const gamePlay = new GamePlay();
  const gameState = new GameState();
  const container = document.createElement('div');
  container.outerHTML = '<div id="game-container"></div>';
  gamePlay.bindToDOM(container);
  const gameController = new GameController(gamePlay, gameState);
  gameController.init();
  const bowman = new PositionedCharacter(new Bowman(1), 1);
  gameController.playerTeam.push(bowman);
  gameController.onCellEnter(1);
  expect(gamePlay.cells[1].title).toBe('🎖1 ⚔25 🛡25 ❤50');
});
