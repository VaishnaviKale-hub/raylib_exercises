const r = require("raylib");

function setup() {
  const windowWidth = 800;
  const windowHeight = 800;
  const centerX = windowWidth / 2;
  const centerY = windowHeight / 2;
  const baseRedius = 150;
  const numberOfPoints = 100;
  const angle = Math.PI / numberOfPoints;
  const change = 200;
  const frequency = 10;
  const time = 0;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(windowWidth, windowHeight, "Trignometry Pattern");
  r.SetTargetFPS(50);

  return {
    windowWidth,
    windowHeight,
    centerX,
    centerY,
    baseRedius,
    numberOfPoints,
    angle,
    change,
    frequency,
    time,
  };
}

function calculateRedius(world, angle) {
  return (
    world.baseRedius +
    world.change * Math.sin(angle * world.frequency * world.time)
  );
}

function createPoint(world, i) {
  const angle = i * world.angle;
  const redius = calculateRedius(world, angle);
  return {
    angle,
    redius,
  };
}

function calculateScreenCoordinates(world, point) {
  const x = world.centerX + point.redius * Math.cos(point.angle + world.time);
  const y = world.centerY - point.redius * Math.sin(point.angle + world.time);
  return {
    x,
    y,
  };
}

function createPattern(world) {
  for (let i = 0; i < world.numberOfPoints; i++) {
    const point1 = calculateScreenCoordinates(world, createPoint(world, i));
    const point2 = calculateScreenCoordinates(world, createPoint(world, i + 1));
    connectPoints(point1, point2);
  }
}

function connectPoints(point1, point2) {
  r.DrawCircleV(point1, 4, r.BLUE);
  r.DrawCircleV(point2, 4, r.BLUE);
  r.DrawLineV(point1, point2, r.GREEN);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  createPattern(world);
  world.time += r.GetFrameTime();
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
