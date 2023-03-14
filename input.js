export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = []; //all the current active keys
    this.touchY = "";
    this.touchTreshold = 50; //to restart more

    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" || e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      } else if (e.key === "Enter" && this.game.gameOver) {
        this.game.restartGame();
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key === " ") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });

    window.addEventListener("touchstart", (e) => {
      this.touchY = e.changedTouches[0].pageY;
    });

    window.addEventListener("touchmove", (e) => {
      const swipeDistante = e.changedTouches[0].pageY - this.touchY;
      if (
        swipeDistante < -this.touchTreshold &&
        this.keys.indexOf("swipe up") === -1
      )
        this.keys.push("swipe up");
      else if (
        swipeDistante > this.touchTreshold &&
        this.keys.indexOf("swipe down") === -1
      ) {
        this.keys.push("swipe down");
        if (this.game.gameOver) this.game.restartGame();
      }
    });

    window.addEventListener("touchend", (e) => {
      this.keys.splice(this.keys.indexOf("swipe up"), 1);
      this.keys.splice(this.keys.indexOf("swipe down"), 1);
    });
  }
}
