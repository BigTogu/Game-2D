export class Enemy {
  constructor() {
    this.frameX = 0;
    this.frameY = 0;
    this.fps = 20;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    this.x -= this.speedX;
    this.y += this.speedY;

    if (this.frameTimer > this.frameInterval) {
      this.frameTimer = 0;
      if (this.frameX < this.maxFrame) this.frameX++;
      else this.frameX = 0; //reset to the first frame
    } else {
      this.frameTimer += deltaTime;
    }

    if (this.x < 0 - this.width) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

export class EnemyFly extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 60;
    this.height = 44;
    this.x = this.game.width;
    this.y = Math.random() * this.game.height * 0.5;
    this.speedX = Math.random() * 15 + 8;
    this.speedY = 0;
    this.image = document.getElementById("flyingEnemy");
    this.maxFrame = 5;
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class EnemyGround extends Enemy {
  constructor(game) {
    super();
    this.game = game;
    this.width = 89;
    this.height = 125;
    this.x = this.game.width;
    this.y = this.game.height - this.height - 50;
    this.speedX = Math.random() * 10 + 4;
    this.speedY = 0;
    this.image = document.getElementById("groundEnemy");
    this.maxFrame = 5;
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}

export class TrapEnemy extends Enemy {
  constructor(game) {
    super();
    this.name = "trapEnemy";
    this.game = game;
    this.width = 101.66;
    this.height = 100;
    this.x = this.game.width - 50;
    this.y = this.game.height - this.height + 17;
    this.speedX = this.game.speed;
    this.speedY = 0;
    this.image = document.getElementById("trapEnemy");
    this.maxFrame = 6;
  }

  update(deltaTime) {
    super.update(deltaTime);
  }
}
