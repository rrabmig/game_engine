import { Color } from "../../types/CustomTypes.ts";
import Floor from "../envoirement/Floor.ts";
import Wall from "../envoirement/Wall.ts";
import Point from "./Point.ts";
import Rectangle from "./Rectangle.ts";

export default class Circle {
  center: Point;
  radius: number;
  constructor(center: Point, radius: number, color?: string) {
    this.center = center;
    this.radius = radius;
  }

  // Move circle center by dx and dy
  move(dx: number, dy: number) {
    this.center.move(dx, dy);
  }

  setRadius(radius: number) {
    this.radius = radius;
  }

  setCenter(center: Point) {
    this.center = center;
  }

  setCenterX(x: number) {
    this.center.setX(x);
  }

  setCenterY(y: number) {
    this.center.setY(y);
  }

  getRadius() {
    return this.radius;
  }

  // Draw circle on canvas with some color
  draw(ctx: CanvasRenderingContext2D, color?: Color) {
    ctx.fillStyle = color ? color : "#ffffff";
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Check if circle collides with other object
  collidesWith(other: Circle | Wall | Floor) {
    if (other instanceof Circle) {
      return this.collidesWithCircle(other);
    } else if (other instanceof Floor) {
      return this.collidesWithFloor(other.getRectangle());
    } else if (other instanceof Wall) {
      return this.collidesWithWall(other.getRectangle());
    }
  }

  // Check if circle collides with other circle
  private collidesWithCircle(other: Circle) {
    const distance = Circle.distance(this, other);
    return distance < this.radius + other.radius;
  }

  // Check if circle collides with floor
  private collidesWithFloor(other: Rectangle): boolean {
    if (
      this.center.x < other.center.x + other.width / 2 &&
      this.center.x > other.center.x - other.width / 2
    ) {
      if (
        this.center.y + this.radius > other.center.y - other.height / 2 &&
        this.center.y - this.radius < other.center.y + other.height / 2
      ) {
        return true;
      }
    }
    return false;
  }

  // Check if circle collides with wall
  private collidesWithWall(other: Rectangle): boolean {
    if (
      this.center.y < other.center.y + other.height / 2 &&
      this.center.y > other.center.y - other.height / 2
    ) {
      if (
        this.center.x + this.radius > other.center.x - other.width/2 &&
        this.center.x - this.radius < other.center.x + other.width/2) {
        return true;
      }
    }
    return false;
  }

  // Get distance between circles centers
  static distance(a: Circle, b: Circle) {
    return Point.distance(a.center, b.center);
  }

  // create circle by object
  static CreateCircle({
    x,
    y,
    radius,
  }: {
    x: number;
    y: number;
    radius: number;
  }) {
    return new Circle(new Point(x, y), radius);
  }
}
