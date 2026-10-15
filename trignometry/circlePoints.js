const r = require("raylib");

function setup() {
  const world = {
    windowWidth: 400,
    windowHeight: 400,
    centerX: 200,
    centerY: 200,
    redius: 150,
    numberOfPoints: 12,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.windowWidth, world.windowHeight, "Points Around a Circle");
  r.SetTargetFPS(100);

  return world;
}

function drawPoints(world) {
  for (let i = 1; i <= world.numberOfPoints; i++) {
    const v2 = calculatePoint(world, i);
    r.DrawCircleV(v2, 5, r.RED);
  }
}

function calculatePoint(world, i) {
  const angle = ((2 * Math.PI) / world.numberOfPoints) * i;
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
  r.DrawCircle(world.centerX, world.centerY, world.redius, r.WHITE);
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
