import CircleBody from "./Body.ts";
import Wall from "./envoirement/Wall.ts";
import Floor from "./envoirement/Floor.ts";
import BallsCreator from "./controllers/BallsCreator.ts";
import ScoreBar from "./envoirement/ScoreBar.ts";
import Point from "./abstract/Point.ts";

export default class Scene {
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  scoreBar: ScoreBar | null;
  circleBodies: CircleBody[];
  walls: Wall[];
  floors: Floor[];
  ballsCreator: BallsCreator;

  constructor(canvas: HTMLCanvasElement | null) {
    if (canvas) {
      this.setCanvas(canvas);
    }
    this.circleBodies = [];
    this.walls = [];
    this.floors = [];
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.ballsCreator = new BallsCreator(canvas, 20, (body: CircleBody) => {
      this.addCircleBody(body);
    });
  }

  setScoreBar(scoreBar: ScoreBar) {
    this.scoreBar = scoreBar;
  }

  // create new score bar by parameters
  createScoreBar(x: number, y: number, width: number) {
    this.scoreBar = new ScoreBar(new Point(x, y), width);
  }

  // add circle body to array
  addCircleBody(body: CircleBody) {
    this.circleBodies.push(body);
  }

  // remove circle body from array
  removeCircleBody(body: CircleBody) {
    const index = this.circleBodies.indexOf(body);
    if (index > -1) {
      this.circleBodies.splice(index, 1);
    }
  }

  // add wall to array
  addWall(wall: Wall) {
    this.walls.push(wall);
  }

  // add floor to array
  addFloor(floor: Floor) {
    this.floors.push(floor);
  }

  // analyze collisions on the scene TODO: optimize
  analyzeCollisions() {
    this.circleBodies.forEach((body) =>
      body.analyzeCollision(
        this.walls,
        this.floors,
        this.circleBodies,
        this.removeCircleBody.bind(this)
      )
    );
  }

  // draw all entities
  draw(deltaTime: number) {
    if (!this.ctx || !this.canvas) {
      throw new Error("Canvas is not set");
    }

    this.circleBodies.forEach((body) => body.afterDeltaTime(deltaTime));
    this.analyzeCollisions();

    this.circleBodies.forEach((body) => body.draw(this.ctx!));
    this.walls.forEach((wall) => wall.draw(this.ctx!, undefined, true));
    this.floors.forEach((floor) => floor.draw(this.ctx!, undefined, true));

    if (this.scoreBar) {
      this.scoreBar.updateScore(this.circleBodies);
      this.scoreBar.draw(this.ctx);
    }
    if (this.ballsCreator) {
      this.ballsCreator.draw();
    }
  }

  // clear canvas
  clear() {
    if (!this.ctx || !this.canvas) {
      throw new Error("Canvas is not set");
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}
