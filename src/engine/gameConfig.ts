import Vector2D from "./classes/abstract/Vector2D.ts";
import { Color } from "./types/CustomTypes.ts";

interface IGameConfig {
  gravity: Vector2D;
  radiuces: number[];
  colors: Color[];
  ballTypes: number;
}

const gameConfig: IGameConfig = {
  gravity: new Vector2D(0, 400),
  radiuces: [5, 10, 20, 40],
  colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00"],
  ballTypes: 4,
};

export default gameConfig;
