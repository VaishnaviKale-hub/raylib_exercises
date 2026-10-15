const r = require("raylib");

function setup() {
  const world = {
    windowWidth: 600,
    windowHeight: 400,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.windowWidth, world.windowHeight, "waves");
  r.SetTargetFPS(100);

  return world;
}

function calculateEllipsePoints(wave, angle) {
  const pointY = wave.centerY - wave.verticalHeight * Math.sin(angle);
  const pointX = wave.centerX + wave.horizontalHeight * Math.cos(angle);
  return {
    x: pointX,
    y: pointY,
  };
}

function drawEllipse(wave) {
  for (let angle = wave.angle; angle <= 2 * Math.PI; angle += wave.frequency) {
    const point1 = calculateEllipsePoints(wave, angle);
    const point2 = calculateEllipsePoints(wave, angle + wave.frequency);

    r.DrawCircleV(point1, wave.redius, r.RED);
    r.DrawCircle(point2.x, point2.y, wave.redius, r.RED);
    r.DrawLineEx(point1, point2, 2, r.BLACK);
  }
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);

  const wave = {
    redius: 2,
    centerX: 300,
    centerY: 200,
    frequency: 0.3,
    horizontalHeight: 200,
    verticalHeight: 100,
    angle: 0,
  };

  drawEllipse(wave);

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
