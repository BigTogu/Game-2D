import { Player } from "./player.js";
import { InputHandler } from "./input.js";
import { Background } from "./background.js";
import { Enemy, EnemyFly, EnemyGround, TrapEnemy } from "./enemy.js";
import { Projectile } from "./projectile.js";

window.addEventListener("load", function () {
  const loading = document.getElementById("loading");
  loading.style.display = "none"; //desapear the loading when it is fully load
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1000;
  canvas.height = 500;
  //fullScreen

  class Game {
    constructor(width, height) {
      this.width = width;
      this.height = height;
      this.speed = 5;
      this.gameStarted = false;
      this.background = new Background(this);
      this.player = new Player(this); //we are inside the class game so, i'll pass this as an argument
      this.input = new InputHandler(this);
      //this.projectile = new Projectile(this, player);
      this.enemies = []; //hold all current active enemies
      this.enemyTimer = 0;
      this.enemyInterval = 0;
      this.randomInterval = Math.random() * 2000 + 2000;
      this.score = 0;
      this.debug = true;
      this.projectiles = [];
      this.availableProjectile = true;
      this.collisions = [];
      this.time = 0;
      this.gameOver = false;
      this.enemy = new Enemy();
      this.sound = new Audio("./sound/Misc 02.wav");
      this.soundGame = new Audio("./sound/song18.mp3");
    }
    update(deltaTime) {
      this.time += deltaTime;
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

      if (this.input.keys.includes(" ") && this.availableProjectile == true) {
        this.sound.play();
        this.shootProjectile();
        this.availableProjectile = false;
        setTimeout(() => (this.availableProjectile = true), 200);
      }

      this.projectiles.forEach((projectile) => {
        projectile.update(deltaTime);
      });
      this.projectiles = this.projectiles.filter(
        (projectile) => !projectile.markedForDeletion
      );

      //collisions
      this.collisions.forEach((collision) => {
        collision.update(deltaTime);
        if (collision.markedForDeletion) this.collisions.splice(collision, 1);
      });
    }
    draw(context) {
      this.background.draw(context);
      this.displayStatusText(context);
      this.player.draw(context);

      this.enemies.forEach((element) => {
        element.enemy.draw(context);
      });
      this.projectiles.forEach((projectile) => {
        projectile.draw(context);
      });
      this.collisions.forEach((collision) => {
        collision.draw(context);
      });
    }

    shootProjectile() {
      this.projectiles.push(new Projectile(this, this.player));
    }

    addEnemy() {
      if (Math.random() > 0.2) {
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

      if (this.enemies.length <= 20) {
        const flyingEnemyObject = {
          id: "flyingEnemy",
          enemy: new EnemyFly(this),
        };

        this.enemies.push(flyingEnemyObject);
      }
    }

    restartGame() {
      this.background.restart();
      this.player.restart();
      this.enemies = [];
      this.score = 0;
      this.gameOver = false;
      this.projectiles = [];
      this.time = 0;
      lastTime = 0; // reset lastTime to 0
      animate(0);
    }
    displayStatusText(context) {
      context.font = "2rem Helvetica";
      context.fillStyle = "white";
      context.fillText("Score: " + this.score, 70, 50);
      context.fillStyle = "black";
      context.fillText("Score: " + this.score, 72, 52);
    }
    startGame() {
      animate(0);
    }
  }

  const game = new Game(canvas.width, canvas.height);
  let lastTime = 0;

  function animate(timeStamp) {
    game.soundGame.play();

    if (!game.gameOver) {
      const deltaTime = timeStamp - lastTime;
      lastTime = timeStamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the Rect (each animation frame will clear the last animation frame)
      game.update(deltaTime);
      game.draw(ctx);
      requestAnimationFrame(animate);
    } else {
      game.soundGame.pause();
    }
  }

  const startScreen = document.getElementById("start-screen");

  document.addEventListener("keydown", function (event) {
    if (event.code === "KeyS" && !game.gameStarted) {
      startScreen.style.display = "none";

      game.startGame();
      game.gameStarted = true;
    }
  });
});
