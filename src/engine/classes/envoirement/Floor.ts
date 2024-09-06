import Point from "../abstract/Point.ts";
import { Color } from "../../types/CustomTypes.ts";
import Rectangle from "../abstract/Rectangle.ts";

export default class Floor {
  rectangle: Rectangle;
  color: Color;
  friction: number; // 0 - 1, 1 - no friction

  constructor(
    center: Point,
    width: number,
    height: number,
    color?: Color,
    friction?: number
  ) {
    this.rectangle = new Rectangle(center, width, height);
    this.color = color ? color : "#000000";
    this.friction = friction ? friction : 0.9;
  }

  getRectangle() {
    return this.rectangle;
  }
  getFriction() {
    return this.friction;
  }

  // Move rectangle by dx and dy
  move(dx: number, dy: number) {
    this.rectangle.move(dx, dy);
  }

  // Draw rectangle on canvas with some color and show its center
  draw(ctx: CanvasRenderingContext2D, color?: Color, drawPoints?: boolean) {
    ctx.fillStyle = this.color;
    this.rectangle.draw(ctx, color, drawPoints);
  }

  // Create floor platform from object
  static CreateFloor({
    x,
    y,
    width,
    height,
  }: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    return new Floor(new Point(x, y), width, height);
  }
}
