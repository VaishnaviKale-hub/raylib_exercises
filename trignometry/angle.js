const r = require("raylib");

function setup() {
  const windowWidth = 600;
  const windowHeight = 600;
  const pointA = {
    x: 100,
    y: 300,
  };
  const pointB = {
    x: 200,
    y: 150,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(windowWidth, windowHeight, "Angle");
  r.SetTargetFPS(100);

  return {
    windowWidth,
    windowHeight,
    pointA,
    pointB,
  };
}

function drawLine(start, end, color) {
  r.DrawLineEx(start, end, 3, color);
}

function calculateDistance(pointA, pointB) {
  return Math.sqrt((pointB.x - pointA.x) ** 2 + (pointB.y - pointA.y) ** 2);
}

function calculateAngle(hypotenuse, opposite) {
  const angle = Math.asin(opposite / hypotenuse);
  return Math.ceil(angle * (180 / Math.PI));
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);
  const hypotenuse = calculateDistance(world.pointA, world.pointB);
  const opposite = calculateDistance(world.pointB, {
    x: world.pointB.x,
    y: world.pointA.y,
  });
  const angle = calculateAngle(hypotenuse, opposite);
  drawComponents(world, angle);
  r.EndDrawing();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    draw(world);
  }
}

function main() {
  const world = setup();

  loop(world);
}

main();

function drawComponents(world, angle) {
  r.DrawText(`Angle: ${angle}`, world.windowWidth - 150, 50, 20, r.BLUE);
  drawLine(
    { x: 50, y: world.pointA.y },
    { x: world.windowWidth - 50, y: world.pointA.y },
    r.GRAY,
  );

  drawLine({ x: 50, y: 50 }, { x: 50, y: world.pointA.y }, r.GRAY);
  drawLine(world.pointA, world.pointB, r.RED);
  drawLine(world.pointB, { x: world.pointB.x, y: world.pointA.y }, r.BLACK);

  r.DrawText("A", world.pointA.x, world.pointA.y + 10, 20, r.BLACK);
  r.DrawText("B", world.pointB.x, world.pointB.y - 25, 20, r.BLACK);
}
