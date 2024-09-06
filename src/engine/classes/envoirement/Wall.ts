import Point from "../abstract/Point.ts";
import { Color } from "../../types/CustomTypes.ts";
import Rectangle from "../abstract/Rectangle.ts";

export default class Wall {
  rectangle: Rectangle;
  color: Color;

  constructor(center: Point, width: number, height: number, color?: Color) {
    this.rectangle = new Rectangle(center, width, height);
    this.color = color ? color : "#000000";
  }
  getRectangle() {
    return this.rectangle;
  }

  // Move rectangle by dx and dy
  move(dx: number, dy: number) {
    this.rectangle.move(dx, dy);
  }

  // Draw rectangle on canvas with some color and show its center (or not)
  draw(ctx: CanvasRenderingContext2D, color?: Color, drawPoints?: boolean) {
    ctx.fillStyle = this.color;
    this.rectangle.draw(ctx, color, drawPoints);
  }

  // Create wall from object
  static CreateWall({
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
    return new Wall(new Point(x, y), width, height);
  }
}
