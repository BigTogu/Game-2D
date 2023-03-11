const animationStates = [
  {
    name: "idle",
    frames: 4,
  },
  {
    name: "run",
    frames: 4,
  },
  {
    name: "walk",
    frames: 4,
  },
  {
    name: "dead",
    frames: 4,
  },
  {
    name: "jump",
    frames: 4,
  },
];

export class Player {
  constructor(game) {
    //width & height of the game area
    this.game = game;
    this.image = document.getElementById("player");
    //width & height of the area of the png
    this.width = 160;
    this.height = 159;
    this.frameX = 0;
    this.frameY = 0;
    this.vy = 0;
    this.weight = 1;
    //position of the player
    this.x = 0;
    this.y = this.game.height - this.height - 85;

    this.gameFrame = 0;
    this.staggerFrames = 8;
    this.spriteAnimations = [];
    this.spriteAnimationsAssigment();
  }
  update(input, deltaTime) {
    this.checkColision();
    let position =
      Math.floor(this.gameFrame / this.staggerFrames) %
      this.spriteAnimations["run"].loc.length;
    this.frameX = this.width * position;
    this.frameY = this.spriteAnimations["walk"].loc[position].y;
    this.gameFrame++;

    if (input.includes("ArrowUp") && this.onGround()) this.vy -= 32;
    this.y += this.vy;
    let framePosition = this.spriteAnimations["jump"].loc;
    if (!this.onGround()) {
      this.vy += this.weight;
      this.frameY = framePosition[2].y;
      this.frameX = framePosition[2].x;
    } else {
      this.vy = 0;
    }

    //¿DOUBLE JUMP MAYBE???
  }
  draw(context) {
    if (this.game.debug)
      context.strokeRect(this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.frameX,
      this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  spriteAnimationsAssigment() {
    animationStates.forEach((state, index) => {
      let frames = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * this.width;
        let positionY = index * this.height;
        frames.loc.push({ x: positionX, y: positionY });
      }
      this.spriteAnimations[state.name] = frames;
    });
  }

  onGround() {
    return this.y >= this.game.height - this.height - 20;
  }

  checkColision() {
    this.game.enemies.forEach((element) => {
      if (
        element.enemy.x < this.x + this.width &&
        element.enemy.x + element.enemy.width > this.x &&
        element.enemy.y < this.y + this.height &&
        element.enemy.y + element.enemy.height > this.y
      ) {
        element.enemy.markedForDeletion = true;

        if (element.id === "flyingEnemy") {
          this.game.score++;
        }
      } else {
      }
    });
  }
}
