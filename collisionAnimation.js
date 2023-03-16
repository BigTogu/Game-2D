export class CollisionAnimation {
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;

    this.image = document.getElementById("collisionEffect");
    this.frameX = 0;
    this.maxFrame = 7;

    this.width = 150;
    this.height = 170;

    this.markedForDeletion = false;
    this.fps = 15;
    this.frameInterval = 1000 / this.fps;
    this.frameTimer = 0;
  }

  draw(context) {
    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.game.height + this.x / 2,
      this.y,
      this.width,
      this.height
    );
  }

  update(deltaTime) {
    console.log(this.x);
    this.x -= this.game.speed;
    if (this.frameTimer > this.frameInterval) {
      this.frameX++;
      this.frameTimer = 0;
    } else {
      this.frameTimer += deltaTime;
    }
    // console.log("hola, he encontrado collisionAnimation");
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
}
