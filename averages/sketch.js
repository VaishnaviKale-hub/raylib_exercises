const r = require("raylib");
const g = require("./geometry");

function setup() {
  const windowWidth = 300;
  const windowHeight = 400;
  const data = [12, 45, 78, 23, 91, 56, 34, 67, 89, 40];
  const barWidth = 20;
  const gap = 4;
  const palette = {
    bg: r.RAYWHITE,
    bar: r.DARKBLUE,
    line: r.RED,
  };

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(windowWidth, windowHeight, "Averages");
  r.SetTargetFPS(100);

  return {
    windowWidth,
    windowHeight,
    data,
    barWidth,
    gap,
    palette,
  };
}

function update(world) {}

function drawBar(bar, world) {
  r.DrawRectangle(bar.x, bar.y, bar.width, bar.height, world.palette.bar);
}

function calculateBar(world, maxHeight, maxValue, i) {
  const x = i * (world.barWidth + world.gap);
  const height = (world.data[i] / maxValue) * maxHeight;
  const y = world.windowHeight - height;
  const width = world.barWidth;

  return {
    x: x,
    y: y,
    width: width,
    height: height,
  };
}

function drawAverageLine(world, y) {
  r.DrawLine(0, y, world.windowWidth, y, world.palette.line);
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(world.palette.bg);

  const maxValue = g.maxValue(world.data);
  const maxHeight = world.windowHeight * (90 / maxValue);
  const unitHeight = maxHeight / maxValue;
  const y = world.windowHeight - g.calculateAverage(world.data) * unitHeight;

  for (let i = 0; i < world.data.length; i++) {
    const bar = calculateBar(world, maxHeight, maxValue, i);
    drawBar(bar, world);
  }

  drawAverageLine(world, y);
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
