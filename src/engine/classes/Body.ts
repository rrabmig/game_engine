import Circle from "./abstract/Circle.ts";
import Vector2D from "./abstract/Vector2D.ts";
import { Color } from "../types/CustomTypes.ts";
import Wall from "./envoirement/Wall.ts";
import Floor from "./envoirement/Floor.ts";
import Point from "./abstract/Point.ts";
import gameConfig from "../gameConfig.ts";

export default class CircleBody {
  circle: Circle;
  #mass: number;
  velocity: Vector2D;
  acceleration: Vector2D;
  color?: Color;

  constructor(
    circle: Circle,
    velocity: Vector2D,
    acceleration: Vector2D,
    color?: Color
  ) {
    this.circle = circle;
    this.#mass = this.calculateMass(this.circle.radius);
    this.velocity = velocity;
    this.acceleration = acceleration;
    this.color = color ?? "#ffff00";
  }

  setCenter(center: Point) {
    this.circle.center = center;
  }

  setCenterX(x: number) {
    this.circle.setCenterX(x);
  }

  setCenterY(y: number) {
    this.circle.setCenterY(y);
  }

  getMass() {
    return this.#mass;
  }

  getVelocity() {
    return this.velocity;
  }

  getAcceleration() {
    return this.acceleration;
  }

  getCircle() {
    return this.circle;
  }

  // Calculate mass of circle based on its radius
  calculateMass(radius: number) {
    return Math.pow(radius, 2);
  }

  // Merge circle body with another
  merge(body: CircleBody, removeCircleBody: (body: CircleBody) => void) {
    // if it is last ball in list, don't merge
    let currentI = gameConfig.radiuces.indexOf(this.circle.radius);
    if (gameConfig.ballTypes === currentI + 1) {
      return false; // not merged
    }

    // increase radius, mass, color and velocity, set center to new mass center
    this.circle.radius = gameConfig.radiuces[currentI + 1];
    this.color = gameConfig.colors[currentI + 1];
    this.velocity = new Vector2D(0, 0);
    this.#mass = this.calculateMass(this.circle.radius);
    this.circle.center = Point.getMassCenter(
      this.circle.center,
      body.circle.center,
      this.#mass,
      body.getMass()
    );
    // remove another body
    removeCircleBody(body);

    return true; // merged
  }

  // Move circle based on velocity, change velocity based on acceleration
  afterDeltaTime(dt: number) {
    this.circle.move(this.velocity.x * dt, this.velocity.y * dt);
    this.velocity = Vector2D.add(
      Vector2D.multiply(this.acceleration, dt),
      this.velocity
    );
  }

  // Check if circle collides with other object TODO: Optimize
  analyzeCollision(
    walls: Wall[],
    floors: Floor[],
    circleBodys: CircleBody[],
    removeCircleBody: (body: CircleBody) => void
  ) {
    // Check if circle collides with wall or floor
    floors.forEach((floor) => {
      if (this.circle.collidesWith(floor)) {
        let displacement =
          -this.circle.center.getY() +
          floor.getRectangle().center.getY() -
          floor.getRectangle().height / 2 -
          this.circle.radius;
        this.circle.move(0, displacement);

        // Y velocity
        if (Math.abs(this.velocity.getY()) > 1) {
          this.velocity.setY(-this.velocity.getY() * 0.5);
        } else {
          this.velocity.setY(0);
        }

        // X velocity
        if (Math.abs(this.velocity.getX()) > 0.5) {
          this.velocity.setX(this.velocity.getX() * floor.getFriction());
        } else {
          this.velocity.setX(0);
        }
      }
    });

    // Check if circle collides with wall
    walls.forEach((wall) => {
      if (this.circle.collidesWith(wall)) {
        let displacement: number;
        if (this.circle.center.getX() < wall.getRectangle().center.getX()) {
          displacement =
            wall.getRectangle().center.getX() -
            this.circle.center.getX() -
            wall.getRectangle().width / 2 -
            this.circle.radius;
          this.circle.move(displacement, 0);
        } else {
          displacement =
            -wall.getRectangle().center.getX() +
            this.circle.center.getX() -
            wall.getRectangle().width / 2 -
            this.circle.radius;
          this.circle.move(-displacement, 0);
        }

        // Y velocity not changed

        // X velocity
        if (Math.abs(this.velocity.getX()) > 1) {
          this.velocity.setX(-this.velocity.getX() * 0.5);
        } else {
          this.velocity.setX(0);
        }
      }
    });

    // Check if circle collides with other circle
    circleBodys.forEach((body) => {
      if (this === body) return false;

      if (this.circle.collidesWith(body.circle)) {
        // merge circles if they are equal radius
        if (this.circle.radius === body.circle.radius) {
          let isMerged = this.merge(body, removeCircleBody);
          if (isMerged) return;
        }
        // if not merged, continue and change velocity after collision

        let energyLossProportion = 0.8;
        // https://en.wikipedia.org/wiki/Elastic_collision#Two-dimensional_collision_with_two_moving_objects

        // calculate new velocity by formula
        let M = (2 * body.getMass()) / (this.getMass() + body.getMass());
        let velDif = Vector2D.subtract(this.velocity, body.velocity);
        let posDiff = Point.differenceVector(
          this.circle.center,
          body.circle.center
        );
        let dot = Vector2D.dotProduct(velDif, posDiff);
        let denom =
          Point.differenceVector(
            this.circle.center,
            body.circle.center
          ).getMagnitude() ** 2;
        let mult = (-M * dot) / denom;
        let newVel = Vector2D.add(
          this.velocity,
          Vector2D.multiply(posDiff, mult)
        );
        this.velocity = Vector2D.multiply(newVel, energyLossProportion);

        body.velocity = Vector2D.multiply(
          Vector2D.add(
            body.velocity,
            Vector2D.multiply(
              posDiff,
              ((-1 * mult) / body.getMass()) * this.#mass
            )
          ),
          energyLossProportion
        );

        // move circle if they are overlapping
        let currentDistance = posDiff.getMagnitude();
        let overlapDistance =
          this.circle.radius + body.circle.radius - currentDistance;

        if (overlapDistance > 0.5) {
          let moveTan = posDiff.y / posDiff.x;
          let angle = Math.atan(moveTan);
          let moveX = overlapDistance * Math.cos(angle);
          let moveY = overlapDistance * Math.sin(angle);

          this.circle.center.move(
            moveX * Math.sign(posDiff.getX()),
            moveY + Math.sign(posDiff.getY())
          );
        }
      }
    });
  }

  // Draw body on canvas
  draw(ctx: CanvasRenderingContext2D) {
    this.circle.draw(ctx, this.color);
    return this;
  }

  // Create body from object
  static CreateBody({
    x,
    y,
    radius,
    vx,
    vy,
    ax,
    ay,
    color,
  }: {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    color?: Color;
  }) {
    return new CircleBody(
      Circle.CreateCircle({ x, y, radius }),
      new Vector2D(vx, vy),
      new Vector2D(ax, ay),
      color
    );
  }
}
