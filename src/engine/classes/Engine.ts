import Scene from "./Scene.ts";
import Wall from "./envoirement/Wall.ts";
import { Event } from "../types/CustomTypes.ts";
import CircleBody from "./Body.ts";
import Floor from "./envoirement/Floor.ts";
import ScoreBar from "./envoirement/ScoreBar.ts";

type Entity = CircleBody | Wall | Floor | ScoreBar;

class Engine {
  canvas: HTMLCanvasElement | null;
  time: number;
  deltaTime: number;
  scene: Scene | null;
  events: Event[];

  constructor(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas ? canvas : null;
    this.scene = new Scene(canvas);
    this.time = Date.now();
    this.deltaTime = 0;
    this.events = [];
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.scene = new Scene(this.canvas);
  }

  // add entity to array
  addEntity(entity: Entity) {
    if (!this.scene) {
      throw new Error("Scene has no canvas");
    }
    if (entity instanceof CircleBody) {
      this.scene.addCircleBody(entity);
    } else if (entity instanceof Wall) {
      this.scene.addWall(entity);
    } else if (entity instanceof Floor) {
      this.scene.addFloor(entity);
    } else if (entity instanceof ScoreBar) {
      this.scene.setScoreBar(entity);
    }
  }

  // draw all entities
  draw() {
    if (!this.scene) {
      throw new Error("Scene has no canvas");
    }

    this.deltaTime = (Date.now() - this.time) / 1000;
    this.time = Date.now();

    this.scene.clear();
    this.scene.draw(this.deltaTime);
  }
}

export default Engine;
