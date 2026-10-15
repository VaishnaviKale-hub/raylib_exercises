const r = require("raylib");
const g = require("./geometry");

function setup() {
  const windowWidth = 500;
  const windowHeight = 500;
  const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];

  const gap = 20;
  const maxValue = g.maxValue(data);
  const maxHeight = windowHeight * (90 / 100);

  const palette = {
    bg: r.RAYWHITE,
    point: r.RED,
    line: r.BLACK,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(windowWidth, windowHeight, "Peak");
  r.SetTargetFPS(100);

  return {
    windowWidth,
    windowHeight,
    data,
    gap,
    maxValue,
    maxHeight,
    palette,
  };
}

function getPeakIndicators(world) {
  const peak = [];

  for (let i = 1; i <= world.data.length; i++) {
    peak.push(isPeak(world, i));
  }
  return peak;
}

function drawPeakPoints(peak, world) {
  for (let i = 0; i < peak.length; i++) {
    if (peak[i]) {
      const point = calculatePoint(world, i + 1);
      drawPeakPoint(point, world);
    }
  }
}

function drawPeakPoint(point, world) {
  r.DrawCircle(point.x, point.y, 4, world.palette.point);
}

function connectPoints(world) {
  for (let i = 1; i <= world.data.length - 1; i++) {
    const point1 = calculatePoint(world, i - 1);
    const point2 = calculatePoint(world, i);

    r.DrawLineV(point1, point2, world.palette.line);
  }
}

function isPeak(world, i) {
  return world.data[i] > world.data[i - 1] && world.data[i] > world.data[i + 1];
}

function calculatePoint(world, i) {
  const x = i * world.gap + world.gap;
  const height = (world.data[i] / 100) * world.maxHeight;
  const y = world.windowHeight - height;

  return {
    x: x,
    y: y,
    height: height,
  };
}

function update(world) {}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(world.palette.bg);

  connectPoints(world);

  // Don't calculate peak here
  // Only call two functions here = connectPoints(), drawPeakPoints();
  const peak = getPeakIndicators(world);
  drawPeakPoints(peak, world);

  r.EndDrawing();
}

function running(world) {
  return !r.WindowShouldClose();
}

function teardown(world) {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};
