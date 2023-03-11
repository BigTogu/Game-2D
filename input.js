export class InputHandler {
  constructor() {
    this.keys = []; //all the current active keys
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "ArrowUp" || e.key === " ") &&
        this.keys.indexOf(e.key) === -1
      ) {
        this.keys.push(e.key);
      }
    });

    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowUp" || e.key === " ") {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}
