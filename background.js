class Layer {
  constructor(game, width, height, image, speedModifier) {
    this.game = game;
    this.width = width;
    this.height = height;
    this.image = image;
    this.speedModifier = speedModifier;
    this.x = 0;
    this.y = 0;
    this.speed = this.speedModifier * this.game.speed;
  }
  update() {
    if (this.x <= 0 - this.width) this.x = 0;
    this.x -= this.speed;
  }

  draw(context) {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
    context.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

export class Background {
  constructor(game) {
    this.game = game;
    this.width = 1000;
    this.height = 500;
    this.backgroundLayer1 = document.getElementById("backgroundLayer1");
    this.backgroundLayer2 = document.getElementById("backgroundLayer2");
    this.backgroundLayer3 = document.getElementById("backgroundLayer3");
    this.backgroundLayer4 = document.getElementById("backgroundLayer4");
    this.backgroundLayer5 = document.getElementById("backgroundLayer5");

    this.layer1 = new Layer(
      this.game,
      this.width,
      this.height,
      this.backgroundLayer1,
      0.6
    );
    this.layer2 = new Layer(
      this.game,
      this.width,
      this.height,
      this.backgroundLayer2,
      0.8
    );
    this.layer3 = new Layer(
      this.game,
      this.width,
      this.height,
      this.backgroundLayer3,
      0.5
    );
    this.layer4 = new Layer(
      this.game,
      this.width,
      this.height,
      this.backgroundLayer4,
      1
    );
    this.layer5 = new Layer(
      this.game,
      this.width,
      this.height + 30,
      this.backgroundLayer5,
      0.7
    );

    this.backgroundArray = [
      this.layer1,
      this.layer2,
      this.layer3,
      this.layer4,
      this.layer5,
    ];
  }
  update() {
    this.backgroundArray.forEach((layer) => {
      layer.update();
    });
  }

  draw(context) {
    this.backgroundArray.forEach((layer) => {
      layer.draw(context);
    });
  }

  restart() {
    this.x = 0;
  }
}
