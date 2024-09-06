import Point from "./Point.ts";
import { Color } from "../../types/CustomTypes.ts";

// That is 2d vector
export default class Vector2D {
  x: number;
  y: number;

  constructor(x: number, y: number, color?: Color) {
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

  getAngle() {
    return Math.atan2(this.y, this.x);
  }

  getMagnitude() {
    return Math.hypot(this.x, this.y);
  }

  // Vector can be drawn on canvas from any point with some color
  draw(ctx: CanvasRenderingContext2D, point: Point, color?: Color) {
    ctx.fillStyle = color ? color : "#ffffff";
    ctx.beginPath();
    ctx.moveTo(point.x, point.y);
    ctx.lineTo(point.x + this.x, point.y + this.y);
    ctx.stroke();
  }

  // Rotate vector
  rotate(angle: number) {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    this.x = x;
    this.y = y;
  }

  // Static methods

  static dotProduct(a: Vector2D, b: Vector2D) {
    return a.x * b.x + a.y * b.y;
  }

  // Multiply vector by number
  static multiply(vector: Vector2D, factor: number) {
    return new Vector2D(vector.x * factor, vector.y * factor);
  }

  // Add two vectors
  static add(a: Vector2D, b: Vector2D) {
    return new Vector2D(a.x + b.x, a.y + b.y);
  }

  // Get angle between two vectors
  static angle(a: Vector2D, b: Vector2D) {
    return Math.atan2(b.y - a.y, b.x - a.x);
  }

  // Subtract two vectors
  static subtract(a: Vector2D, b: Vector2D) {
    return new Vector2D(a.x - b.x, a.y - b.y);
  }
}
