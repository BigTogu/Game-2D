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
    let boundayX = this.game.width + (this.game.player.x + 100);
    let futureX = this.x + this.speed;
    this.x = futureX <= boundayX ? this.x + this.speed : boundayX;

    if (this.x >= boundayX) {
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    // this.displayStatusText(context);
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
          ["groundEnemy", "fliyingEnemy"].includes(element.id)
        ) {
          if (!element.enemy.markedForDeletion) {
            let collisionX = (element.enemy.x + element.enemy.width) * 0.5;

            this.game.collisions.push(
              new CollisionAnimation(
                this.game,
                collisionX,
                (element.enemy.y + element.enemy.height) * 0.5
              )
            );
            element.enemy.markedForDeletion = true;
            projectile.markedForDeletion = true;

            this.game.score++;
            this.sound.play();
          }
        }
      });
    });
  }
}
