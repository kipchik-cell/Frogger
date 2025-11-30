import { Game } from './game.js';
import { UI } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const game = new Game();
  const ui = new UI(game);

  game.setUI(ui);
  ui.init();
});
