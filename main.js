import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { EnemyFly, EnemyGround, TrapEnemy } from "./enemy.js";
import { Projectile } from "./projectile.js";

window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.style.display = "none"; //desapear the loading when it is fully load
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  //fullScreen

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 3;
      this.background = new Background(this);
      this.player = new Player(this); //we are inside the class game so, i'll pass this as an argument
      this.input = new InputHandler();
      this.enemies = []; //hold all current active enemies
      this.enemyTimer = 0;
      this.enemyInterval = 0;
      this.randomInterval = Math.random() * 2000 + 2000;
      this.score = 0;
      this.debug = true;
      this.projectiles = [];
    }
    update(deltaTime) {
      this.background.update();
      this.player.update(this.input.keys, deltaTime);
      if (this.enemyTimer > this.enemyInterval + this.randomInterval) {
        this.addEnemy();
        this.enemyTimer = 0;
        this.randomInterval = Math.random() * 4000 + 2000;
      } else {
        this.enemyTimer += deltaTime;
      }
      this.enemies.forEach((element) => {
        element.enemy.update(deltaTime);
        if (element.enemy.markedForDeletion)
          this.enemies.splice(this.enemies.indexOf(element), 1);
      });
      if (this.input.keys.includes(" ")) {
        this.shootProjectile();
      }

      this.projectiles.forEach((projectile) => {
        projectile.update();
      });
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );
    }
    draw(context) {
      this.background.draw(context);
      this.player.draw(context);
      this.enemies.forEach((element) => {
        element.enemy.draw(context);
      });
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
    }

    shootProjectile() {
      this.projectiles.push(new Projectile(this, this.player));
      // console.log(this.projectiles);
    }

    addEnemy() {
      if (Math.random() < 0.5) {
        const groundEnemyObject = {
          id: "groundEnemy",
          enemy: new EnemyGround(this),
        };

        this.enemies.push(groundEnemyObject);
      }

      if (
        this.enemies.filter((enemy) => {
          return enemy.id == "trapEnemy" ? true : false;
        }).length == 0
      ) {
        const trapEnemyObject = {
          id: "trapEnemy",
          enemy: new TrapEnemy(this),
        };
        this.enemies.push(trapEnemyObject);
      }

      if (this.enemies.length <= 7) {
        const flyingEnemyObject = {
          id: "flyingEnemy",
          enemy: new EnemyFly(this),
        };

        this.enemies.push(flyingEnemyObject);
      }
    }
  }

  const game = new Game(canvas.width, canvas.height);
  // console.log(game);
  let lastTime = 0;

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    // console.log(deltaTime);
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the Rect (each animation frame will clear the last animation frame)
    game.update(deltaTime);
    game.draw(ctx);
    requestAnimationFrame(animate);
  }
  animate(0);
});
