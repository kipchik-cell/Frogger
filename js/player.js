export class Player {
  constructor(config) {
    this.config = config;
    this.position = { ...config.frogStart };
    this.element = null;
  }

  create(container) {
    this.element = document.createElement('div');
    this.element.className = 'frog';
    this.element.id = 'frog';
    this.updatePosition();
    container.appendChild(this.element);
  }

  move(direction) {
    const oldPosition = { ...this.position };

    switch(direction) {
      case 'up':
        if (this.position.y > 0) this.position.y--;
        break;
      case 'down':
        if (this.position.y < 9) this.position.y++;
        break;
      case 'left':
        if (this.position.x > 0) this.position.x--;
        break;
      case 'right':
        if (this.position.x < 8) this.position.x++;
        break;
    }

    if (oldPosition.x !== this.position.x || oldPosition.y !== this.position.y) {
      this.updatePosition();
    }
  }

  updatePosition() {
    if (this.element) {
      this.element.style.left = (this.position.x * this.config.cellSize) + 'px';
      this.element.style.top = (this.position.y * this.config.cellSize) + 'px';
    }
  }

  reset() {
    this.position = { ...this.config.frogStart };
    this.updatePosition();
  }

  isInRiver() {
    return this.position.y >= 1 && this.position.y <= 3;
  }

  getPosition() {
    return { ...this.position };
  }
}
