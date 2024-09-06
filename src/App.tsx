import React, { useRef, useEffect } from "react";
import Engine from "./engine/classes/Engine.ts";
import Wall from "./engine/classes/envoirement/Wall.ts";
import Point from "./engine/classes/abstract/Point.ts";
import CircleBody from "./engine/classes/Body.ts";
import Vector2D from "./engine/classes/abstract/Vector2D.ts";
import Circle from "./engine/classes/abstract/Circle.ts";
import Floor from "./engine/classes/envoirement/Floor.ts";
import gameConfig from "./engine/gameConfig.ts";
import ScoreBar from "./engine/classes/envoirement/ScoreBar.ts";

function App(): JSX.Element {
  const canvas = useRef(null);
  let engine : Engine = new Engine(null);


  function animate () {
    engine.draw();
    requestAnimationFrame(animate);
  }

  useEffect(() => {
    if (canvas.current) { engine.setCanvas(canvas.current)}

    engine.addEntity(new Wall(new Point(50, 200), 10, 300));
    engine.addEntity(new Wall(new Point(350, 200), 10, 300));
    engine.addEntity(new Floor(new Point(200, 350), 310, 20));

    engine.addEntity(new ScoreBar(new Point(140, 390), 200));

    // engine.addEntity(new CircleBody(new Circle(new Point(100, 200), 10), new Vector2D(500, -30), gameConfig.gravity));
    // engine.addEntity(new CircleBody(new Circle(new Point(200, 200), 10), new Vector2D(200, -50), gameConfig.gravity));
    // engine.addEntity(new CircleBody(new Circle(new Point(300, 200), 10), new Vector2D(100, -100), gameConfig.gravity));
    animate();
  });
  return (
    <canvas ref={canvas} width="400" height="400" style={{ border: "1px solid black" }}></canvas>
  );
}

export default App;
