import Point from "../abstract/Point.ts";
import CircleBody from "../Body.ts";
import Mouse from "./Mouse.ts";
import gameConfig from "../../gameConfig.ts";

export default class BallsCreator {
  canvas: HTMLCanvasElement | null;
  newBall: CircleBody;
  ctx: CanvasRenderingContext2D | null;
  x: number;
  y: number;
  mouse: Mouse;
  addCircleBody: (body: CircleBody) => void; // function provided by parent to add new circle body

  constructor(
    canvas: HTMLCanvasElement | null,
    defaultY: number,
    addCircleBody: (body: CircleBody) => void
  ) {
    this.x = 0;
    this.y = defaultY;
    this.addCircleBody = addCircleBody;
    if (canvas) {
      this.setCanvas(canvas);
    }
  }

  // set canvas, create new mouse, add onclick function to mouse
  setCanvas(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
    this.mouse = new Mouse(canvas);
    this.createNewBall();

    let onclickFunction = (position: Point, canvas: HTMLCanvasElement) => {
      this.addCircleBody(
        CircleBody.CreateBody({
          x: position.getX(),
          y: this.y,
          radius: this.newBall.circle.radius,
          vx: 0,
          vy: 0,
          ax: gameConfig.gravity.getX(),
          ay: gameConfig.gravity.getY(),
          color: this.newBall.color,
        })
      );
      this.createNewBall();
    };
    this.mouse.addOnclickFunction(onclickFunction);
  }

  // create next ball wich will be added to scene
  createNewBall() {
    let i = Math.floor(Math.random() * gameConfig.ballTypes);
    this.newBall = CircleBody.CreateBody({
      x: this.mouse.getPosition().getX(),
      y: this.y,
      radius: gameConfig.radiuces[i],
      vx: 0,
      vy: 0,
      ax: 0,
      ay: 0,
      color: gameConfig.colors[i],
    });
  }

  // draw new ball thar will be added on scene by click
  draw() {
    this.newBall.setCenterX(this.mouse.getPosition().getX());
    this.newBall.setCenterY(this.y);
    this.newBall.draw(this.ctx!);
  }
}
