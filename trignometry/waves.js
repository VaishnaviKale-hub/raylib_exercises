const r = require("raylib");

function setup() {
  const world = {
    windowWidth: 600,
    windowHeight: 400,
    fps: 50,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(world.windowWidth, world.windowHeight, "waves");
  r.SetTargetFPS(fps);

  return world;
}

function drawAxis(start, end) {
  r.DrawLineEx(start, end, 4, r.BLACK);
}

function drawMarks(text, x, y, color) {
  const font = 18;
  r.DrawText(text, x, y, font, color);
}

function drawWave(wave, x, point1, point2, color) {
  r.DrawCircle(x, point1, wave.redius, color);
  r.DrawCircle(x + wave.space, point2, wave.redius, color);
  r.DrawLine(x, point1, x + wave.space, point2, r.BLACK);
}

function drawWaves(world, wave) {
  for (let x = wave.centerX; x < world.windowWidth; x += wave.space) {
    if (wave.angle * wave.frequency <= 2 * Math.PI) {
      const sinPoint1 = calculateSinWavePoints(wave, wave.angle);
      const sinPoint2 = calculateSinWavePoints(wave, wave.angle + 0.5);

      const cosPoint1 = calculateCosWavePoints(wave, wave.angle);
      const cosPoint2 = calculateCosWavePoints(wave, wave.angle + 0.5);

      drawWave(wave, x, sinPoint1, sinPoint2, r.GREEN);
      drawWave(wave, x, cosPoint1, cosPoint2, r.RED);

      wave.angle += 0.5;
    }
  }
}

function calculateSinWavePoints(wave, angle) {
  const pointSin =
    wave.centerY - wave.amplitude * Math.sin(angle * wave.frequency);
  return pointSin;
}

function calculateCosWavePoints(wave, angle) {
  const point =
    wave.centerY - wave.amplitude * Math.cos(angle * wave.frequency);
  return point;
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.WHITE);
  const wave = {
    redius: 2,
    centerX: 50,
    centerY: 200,
    frequency: 0.6,
    amplitude: 100,
    angle: 0,
    space: 20,
  };

  drawAxis({ x: 50, y: 200 }, { x: world.windowWidth - 50, y: 200 });
  drawAxis({ x: 50, y: 50 }, { x: 50, y: world.windowHeight - 50 });
  drawMarks("Y", wave.centerX, 20, r.BLACK);
  drawMarks("X", world.windowWidth - 20, wave.centerY, r.BLACK);
  drawMarks("sin", world.windowWidth - 70, 20, r.GREEN);
  drawMarks("cos ", world.windowWidth - 70, 40, r.RED);

  drawMarks("0", 30, wave.centerY, r.BLACK);
  drawMarks("1", 30, wave.centerY - wave.amplitude, r.BLACK);
  drawMarks("-1", 30, wave.centerY + wave.amplitude, r.BLACK);
  drawWaves(world, wave);

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
