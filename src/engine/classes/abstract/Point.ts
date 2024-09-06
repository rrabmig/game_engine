import { Color } from "../../types/CustomTypes";
import Vector2D from "./Vector2D.ts";

export default class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setX(x: number) {
    this.x = x;
  }

  setY(y: number) {
    this.y = y;
  }
  
  move(dx: number, dy: number) {
    this.x += dx;
    this.y += dy;
  }

  // Draw point on canvas with some color
  draw(ctx: CanvasRenderingContext2D, color?: Color) {
    ctx.fillStyle = color ? color : "#ff0000";
    ctx.fillRect(this.x, this.y, 2, 2);
  }

  // Get distance between two points
  static distance(a: Point, b: Point) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }

  // Get difference vector (a - b)
  static differenceVector(a: Point, b: Point) {
    return new Vector2D(a.x - b.x, a.y - b.y);
  }

  // Get mass center of two points with m1 and m2 masses
  static getMassCenter(p1: Point, p2: Point, m1: number, m2: number) {
    const x = (m1 * p1.x + m2 * p2.x) / (m1 + m2);
    const y = (m1 * p1.y + m2 * p2.y) / (m1 + m2);
    return new Point(x, y);
  }
}
