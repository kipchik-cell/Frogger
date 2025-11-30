export class UI {
  constructor(game) {
    this.game = game;
    this.touchStartX = 0;
    this.touchStartY = 0;
  }

  init() {
    this.setupEventListeners();
    this.setupTouchControls();
  }

  setupEventListeners() {
    document.getElementById('start-btn').addEventListener('click', () => {
      this.startGame();
    });

    document.getElementById('restart-btn').addEventListener('click', () => {
      this.startGame();
    });

    document.getElementById('menu-btn').addEventListener('click', () => {
      this.showScreen('start-screen');
    });

    document.getElementById('next-level-btn').addEventListener('click', () => {
      this.game.nextLevel();
      this.game.updateDisplays();
    });

    this.setupKeyboardControls();
    document.getElementById('player-name').focus();
  }

  startGame() {
    this.game.init();
    this.game.updateDisplays();
    this.showScreen('game-screen');
  }

  setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
      const gameScreen = document.getElementById('game-screen');
      if (gameScreen.classList.contains('hidden')) return;

      const key = e.key;

      if (key === 'ArrowUp' || key === 'w' || key === 'W') {
        e.preventDefault();
        this.game.movePlayer('up');
      }
      else if (key === 'ArrowDown' || key === 's' || key === 'S') {
        e.preventDefault();
        this.game.movePlayer('down');
      }
      else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
        e.preventDefault();
        this.game.movePlayer('left');
      }
      else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
        e.preventDefault();
        this.game.movePlayer('right');
      }
      else if (key === 'p' || key === 'P') {
        e.preventDefault();
        if (this.game.state.isPaused) {
          this.game.resume();
        } else {
          this.game.pause();
        }
      }
    });
  }

  setupTouchControls() {
    const gameContainer = document.getElementById('game-container');

    gameContainer.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
      this.touchStartY = e.touches[0].clientY;
      e.preventDefault();
    });

    gameContainer.addEventListener('touchend', (e) => {
      if (document.getElementById('game-screen').classList.contains('hidden')) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchEndX - this.touchStartX;
      const diffY = touchEndY - this.touchStartY;
      const minSwipeDistance = 30;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > minSwipeDistance) {
        if (diffX > 0) {
          this.game.movePlayer('right');
        } else {
          this.game.movePlayer('left');
        }
      } else if (Math.abs(diffY) > minSwipeDistance) {
        if (diffY > 0) {
          this.game.movePlayer('down');
        } else {
          this.game.movePlayer('up');
        }
      }

      e.preventDefault();
    });
  }

  showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => {
      s.classList.add('hidden');
    });

    document.getElementById(screenId).classList.remove('hidden');
  }
}
