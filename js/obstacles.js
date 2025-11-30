export class ObstacleManager {
  constructor() {
    this.cars = [];
    this.logs = [];
  }

  createCar(lane, speed, movingRight, container) {
    const y = 240 + lane * 60 + 10;
    const car = {
      x: movingRight ? -80 : 560,
      y: y,
      width: 80,
      height: 40,
      speed: speed,
      movingRight: movingRight,
      element: null
    };

    this.cars.push(car);

    const carElement = document.createElement('div');
    carElement.className = 'car';
    carElement.style.left = car.x + 'px';
    carElement.style.top = car.y + 'px';
    carElement.style.width = car.width + 'px';
    carElement.style.height = car.height + 'px';
    container.appendChild(carElement);

    car.element = carElement;
    return car;
  }

  createLog(lane, speed, movingRight, container) {
    const y = 60 + lane * 60 + 10;
    const log = {
      x: movingRight ? -120 : 560,
      y: y,
      width: 120,
      height: 40,
      speed: speed,
      movingRight: movingRight,
      element: null
    };

    this.logs.push(log);

    const logElement = document.createElement('div');
    logElement.className = 'log';
    logElement.style.left = log.x + 'px';
    logElement.style.top = log.y + 'px';
    logElement.style.width = log.width + 'px';
    logElement.style.height = log.height + 'px';
    container.appendChild(logElement);

    log.element = logElement;
    return log;
  }

  update() {
    this.cars.forEach(car => {
      if (car.movingRight) {
        car.x += car.speed;
        if (car.x > 560) car.x = -car.width;
      } else {
        car.x -= car.speed;
        if (car.x < -car.width) car.x = 560;
      }
      car.element.style.left = car.x + 'px';
    });

    this.logs.forEach(log => {
      if (log.movingRight) {
        log.x += log.speed;
        if (log.x > 560) log.x = -log.width;
      } else {
        log.x -= log.speed;
        if (log.x < -log.width) log.x = 560;
      }
      log.element.style.left = log.x + 'px';
    });
  }

  isOnLog(playerPosition) {
    const playerX = playerPosition.x * 60 + 20;
    const playerY = playerPosition.y * 60 + 20;

    for (const log of this.logs) {
      const logLeft = log.x;
      const logRight = log.x + log.width;
      const logTop = log.y;
      const logBottom = log.y + log.height;

      if (playerY >= logTop && playerY <= logBottom) {
        if (playerX >= logLeft && playerX <= logRight) {
          return true;
        }
      }
    }
    return false;
  }

  isHitByCar(playerPosition) {
    const playerX = playerPosition.x * 60 + 20;
    const playerY = playerPosition.y * 60 + 20;

    for (const car of this.cars) {
      const carLeft = car.x;
      const carRight = car.x + car.width;
      const carTop = car.y;
      const carBottom = car.y + car.height;

      if (playerY >= carTop && playerY <= carBottom) {
        if (playerX >= carLeft && playerX <= carRight) {
          return true;
        }
      }
    }
    return false;
  }

  clear() {
    this.cars = [];
    this.logs = [];
  }
}
