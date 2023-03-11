export class Projectile {
  constructor(game, player) {
    this.game = game;
    this.x = player.x;
    this.y = player.y;
    this.height = 3;
    this.width = 10;
    this.speed = 3;
    this.markedForDeletion = false;
  }

  update() {
    this.checkColision();
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.fillStyle = "red";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  checkColision() {
    this.game.projectiles.forEach((projectile) => {
      this.game.enemies.forEach((element) => {
        if (
          element.enemy.x < projectile.x + projectile.width &&
          element.enemy.x + element.enemy.width > projectile.x &&
          element.enemy.y < projectile.y + projectile.height &&
          element.enemy.y + element.enemy.height > projectile.y &&
          element.id === "flyingEnemy"
        ) {
          element.enemy.markedForDeletion = true;
          projectile.markedForDeletion = true;
          console.log("hello he colisionado");
        }
      });
    });
  }
}
