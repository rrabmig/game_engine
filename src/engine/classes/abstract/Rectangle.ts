import Point from "./Point.ts";
import { Color } from "../../types/CustomTypes.ts";

export default class Rectangle {
  center: Point;
  width: number;
  height: number;

  constructor(center: Point, width: number, height: number) {
    this.center = center;
    this.width = width;
    this.height = height;
  }

  // Move rectangle by dx and dy
  move(dx: number, dy: number) {
    this.center.move(dx, dy);
  }

  // Draw rectangle on canvas with some color and show its center
  draw(
    ctx: CanvasRenderingContext2D,
    color?: Color,
    drawCenterPoint?: boolean
  ) {
    ctx.fillStyle = color ? color : "#000000";
    ctx.fillRect(
      this.center.getX() - this.width / 2,
      this.center.getY() - this.height / 2,
      this.width,
      this.height
    );
    if (drawCenterPoint) {
      this.center.draw(ctx, color);
    }
  }
}
