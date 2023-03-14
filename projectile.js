import { CollisionAnimation } from "./collisionAnimation.js";

export class Projectile {
  constructor(game, player) {
    this.game = game;
    this.x = player.x + 100;
    this.y = player.y + 10;
    this.height = 3;
    this.width = 10;
    this.speed = 3;
    this.markedForDeletion = false;
    this.image = document.getElementById("projectile");
    this.sound = new Audio();
    this.sound.src = "./sound/Fire impact 1.wav";
  }

  update() {
    this.checkColision();
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    this.displayStatusText(context);
    context.drawImage(this.image, this.x, this.y);
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

          this.game.collisions.push(
            new CollisionAnimation(
              this.game,
              (element.enemy.x + element.enemy.width) * 0.5,
              (element.enemy.y + element.enemy.height) * 0.5
            )
          );
          this.game.score++;
          this.sound.play();
        }
      });
    });
  }

  displayStatusText(context) {
    context.font = "40px Helvetica";
    context.fillStyle = "white";
    context.fillText("Score: " + this.game.score, 20, 50);
    context.fillStyle = "black";
    context.fillText("Score: " + this.game.score, 22, 52);
  }
}
