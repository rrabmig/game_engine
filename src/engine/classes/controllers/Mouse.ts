import Point from "../abstract/Point.ts";

class Mouse {
  position: Point;
  canvas: HTMLCanvasElement;
  onClicks: ((position: Point, canvas: HTMLCanvasElement) => void)[];

  constructor(canvas: HTMLCanvasElement) {
    this.position = new Point(-1, -1);
    this.canvas = canvas;
    this.onClicks = []

    // set mouse position on mousemove
    this.canvas.addEventListener("mousemove", (event) => {
      const rect = canvas.getBoundingClientRect();
      this.position.setX(event.clientX - rect.left);
      this.position.setY(event.clientY - rect.top);
    });

    // execute all onclick functions on mousedown
    this.canvas.addEventListener('mousedown', ()=>{
        this.onClicks.forEach(onclickFunction => {
            onclickFunction(this.position, this.canvas)
        })
    })
  }

  getPosition() {
    return this.position
  }

  // push onclick function to array of onclick functions
  addOnclickFunction(func: (position: Point, canvas: HTMLCanvasElement) => void) {
    this.onClicks.push(func)
  }

  // clear array of onclick functions
  clearOnClicks () {
    this.onClicks = []
  }
}

export default Mouse
