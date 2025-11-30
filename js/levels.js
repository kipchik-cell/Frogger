export class LevelManager {
  constructor(config) {
    this.config = config;
    this.homes = [];
  }

  generateLevel(level, obstacleManager, container) {
    this.createHomes(container);
    obstacleManager.clear();

    if (level === 1) {
      this.generateLevel1(obstacleManager, container);
    } else if (level === 2) {
      this.generateLevel2(obstacleManager, container);
    }
  }

  createHomes(container) {
    this.homes = [];
    for (let i = 0; i < 5; i++) {
      const home = {
        x: 40 + i * 120,
        y: 10,
        width: 80,
        height: 40,
        filled: false
      };
      this.homes.push(home);
      this.createHomeElement(home, container);
    }
  }

  createHomeElement(home, container) {
    const homeElement = document.createElement('div');
    homeElement.className = 'home';
    homeElement.style.left = home.x + 'px';
    homeElement.style.top = home.y + 'px';
    homeElement.style.width = home.width + 'px';
    homeElement.style.height = home.height + 'px';
    container.appendChild(homeElement);
  }

  generateLevel1(obstacleManager, container) {
    obstacleManager.createCar(0, 6, true, container);
    obstacleManager.createCar(1, 5, false, container);
    obstacleManager.createCar(2, 7, true, container);
    obstacleManager.createCar(3, 4, false, container);

    obstacleManager.createLog(0, 4, true, container);
    obstacleManager.createLog(1, 3, false, container);
    obstacleManager.createLog(2, 5, true, container);
  }

  generateLevel2(obstacleManager, container) {
    obstacleManager.createCar(0, 8, true, container);
    obstacleManager.createCar(0, 6, false, container);
    obstacleManager.createCar(1, 7, false, container);
    obstacleManager.createCar(1, 5, true, container);
    obstacleManager.createCar(2, 9, true, container);
    obstacleManager.createCar(2, 4, false, container);
    obstacleManager.createCar(3, 8, false, container);
    obstacleManager.createCar(3, 6, true, container);

    obstacleManager.createLog(0, 6, true, container);
    obstacleManager.createLog(0, 4, false, container);
    obstacleManager.createLog(1, 5, false, container);
    obstacleManager.createLog(1, 3, true, container);
    obstacleManager.createLog(2, 7, true, container);
    obstacleManager.createLog(2, 5, false, container);
  }

  checkHomeReached(playerPosition) {
    const playerX = playerPosition.x * 60 + 20;
    const playerY = playerPosition.y * 60 + 20;

    let homeReached = false;

    this.homes.forEach((home, index) => {
      if (!home.filled &&
        playerX >= home.x &&
        playerX <= home.x + home.width &&
        playerY >= home.y &&
        playerY <= home.y + home.height) {

        home.filled = true;
        homeReached = true;

        const homeFrog = document.createElement('div');
        homeFrog.className = 'frog';
        homeFrog.style.left = (home.x + home.width/2 - 20) + 'px';
        homeFrog.style.top = (home.y + home.height/2 - 20) + 'px';
        homeFrog.style.background = '#ff6b6b';
        document.getElementById('game-container').appendChild(homeFrog);
      }
    });

    return homeReached;
  }

  allHomesFilled() {
    return this.homes.every(home => home.filled);
  }

  resetHomes() {
    this.homes.forEach(home => {
      home.filled = false;
    });
  }
}
