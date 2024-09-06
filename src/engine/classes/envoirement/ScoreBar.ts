import Text from "../abstract/Text.ts";
import Point from "../abstract/Point.ts";
import CircleBody from "../Body.ts";

class ScoreBar {
  scoreNumber: number;
  scoreText: Text;
  center: Point;
  width: number;
  
  constructor(center: Point, width: number) {
    this.scoreNumber = 0;
    this.center = center;
    this.width = width;
    this.scoreText = new Text(
      `Score: ${this.scoreNumber.toString()}`,
      "40px serif"
    );
  }

  // Counts score from all circles
  updateScore(circleBodies: CircleBody[]) {
    const score = circleBodies.reduce(
      (acc, body) => acc + body.getCircle().radius,
      0
    );
    this.scoreNumber = score;
    this.scoreText.setText(`Score: ${this.scoreNumber.toString()}`);
  }

  // Draw text on canvas in center point
  draw(ctx: CanvasRenderingContext2D) {
    this.scoreText.draw(ctx, this.center);
  }
}

export default ScoreBar;
