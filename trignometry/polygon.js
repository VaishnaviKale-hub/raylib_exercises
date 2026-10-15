const r = require("raylib");

function setup() {
  const world = {
    windowWidth: 400,
    windowHeight: 400,
    centerX: 200,
    centerY: 200,
    redius: 150,
    numberOfSides: 7,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.windowWidth, world.windowHeight, "Polygon");
  r.SetTargetFPS(100);

  return world;
}

function drawPoints(world) {
  for (let i = 1; i <= world.numberOfSides; i++) {
    const p1 = calculatePoint(world, i);
    const p2 = calculatePoint(world, i + 1);
    r.DrawLineV(p1, p2, r.RED);
  }
}

function calculatePoint(world, i) {
  const angle = ((2 * Math.PI) / world.numberOfSides) * i;
  const y = world.centerY - Math.sin(angle) * world.redius;
  const x = world.centerX - Math.cos(angle) * world.redius;
  return {
    x,
    y,
  };
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);
  drawPoints(world);
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
