import { Player } from './player.js';
import { ObstacleManager } from './obstacles.js';
import { LevelManager } from './levels.js';

export class Game {
  constructor() {
    this.config = {
      lanes: 10,
      cellSize: 60,
      frogStart: { x: 5, y: 9 },
      lives: 3,
      levelSpeed: [300, 200]
    };

    this.state = {
      playerName: 'Player',
      level: 1,
      lives: this.config.lives,
      score: 0,
      gameInterval: null,
      isPaused: false
    };

    this.player = new Player(this.config);
    this.obstacleManager = new ObstacleManager();
    this.levelManager = new LevelManager(this.config);

    this.gameContainer = document.getElementById('game-container');
    this.ui = null;
  }

  setUI(ui) {
    this.ui = ui;
  }

  init() {
    this.state.playerName = document.getElementById('player-name').value || 'Player';
    this.resetGame();
    this.generateGameElements();
    this.startGameLoop();
    this.updateDisplays();
  }

  resetGame() {
    this.state.level = 1;
    this.state.lives = this.config.lives;
    this.state.score = 0;
    this.player.reset();
    this.obstacleManager.clear();
    this.levelManager.resetHomes();
  }

  generateGameElements() {
    this.gameContainer.innerHTML = '';

    this.createArea('goal', 0, 0, 560, 60);
    this.createArea('river', 0, 60, 560, 180);
    this.createArea('road', 0, 240, 560, 240);
    this.createArea('safe', 0, 480, 560, 60);

    for (let i = 0; i < this.config.lanes; i++) {
      this.createArea('lane', 0, i * 60, 560, 60);
    }

    this.levelManager.generateLevel(this.state.level, this.obstacleManager, this.gameContainer);
    this.player.create(this.gameContainer);
  }

  createArea(className, x, y, width, height) {
    const area = document.createElement('div');
    area.className = className;
    area.style.left = x + 'px';
    area.style.top = y + 'px';
    area.style.width = width + 'px';
    area.style.height = height + 'px';
    this.gameContainer.appendChild(area);
  }

  startGameLoop() {
    if (this.state.gameInterval) {
      clearInterval(this.state.gameInterval);
    }

    this.state.gameInterval = setInterval(() => {
      if (!this.state.isPaused) {
        this.update();
      }
    }, this.config.levelSpeed[this.state.level - 1]);
  }

  update() {
    this.obstacleManager.update();
    this.checkCollisions();
    this.updateDisplays();
  }

  checkCollisions() {
    const frogElement = document.getElementById('frog');
    if (!frogElement) return;

    if (this.player.isInRiver()) {
      const onLog = this.obstacleManager.isOnLog(this.player.position);
      if (!onLog) {
        this.loseLife();
        return;
      }
    }

    if (this.obstacleManager.isHitByCar(this.player.position)) {
      this.loseLife();
      return;
    }

    const homeReached = this.levelManager.checkHomeReached(this.player.position);
    if (homeReached) {
      this.state.score += 100 * this.state.level;
      this.player.reset();

      if (this.levelManager.allHomesFilled()) {
        this.completeLevel();
      }
    }

    if (this.player.position.y < 1) {
      this.state.score += 50;
      this.player.reset();
    }
  }

  movePlayer(direction) {
    if (this.state.isPaused) return;
    this.player.move(direction);
    this.checkCollisions();
  }

  loseLife() {
    this.state.lives--;
    this.updateDisplays();

    if (this.state.lives <= 0) {
      this.gameOver();
    } else {
      this.player.reset();
    }
  }

  completeLevel() {
    if (this.state.level < 2) {
      if (this.ui) {
        this.ui.showScreen('level-complete-screen');
      }
    } else {
      this.state.score += 500;
      setTimeout(() => {
        this.gameOver();
      }, 1000);
    }
  }

  nextLevel() {
    this.state.level++;
    this.levelManager.resetHomes();
    this.generateGameElements();
    this.startGameLoop();
    this.updateDisplays();
    if (this.ui) {
      this.ui.showScreen('game-screen');
    }
  }

  gameOver() {
    clearInterval(this.state.gameInterval);
    document.getElementById('final-score').textContent = this.state.score;
    if (this.ui) {
      this.ui.showScreen('game-over-screen');
    }
  }

  pause() {
    this.state.isPaused = true;
  }

  resume() {
    this.state.isPaused = false;
  }

  updateDisplays() {
    document.getElementById('level-display').textContent = this.state.level;
    document.getElementById('lives-display').textContent = this.state.lives;
    document.getElementById('score-display').textContent = this.state.score;
    document.getElementById('player-display').textContent = this.state.playerName;
  }
}
