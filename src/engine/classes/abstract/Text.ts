import Point from "./Point.ts";

class Text {
  text: string;
  font: string;
  constructor(text: string, font: string) {
    this.text = text;
    this.font = font;
  }

  setFont(font: string) {
    this.font = font;
  }
  setText(text: string) {
    this.text = text;
  }
  
  // Draw text on canvas
  draw(ctx: CanvasRenderingContext2D, centerPoint: Point) {
    ctx.font = this.font;
    ctx.fillText(this.text, centerPoint.x, centerPoint.y);
  }
}

export default Text;
