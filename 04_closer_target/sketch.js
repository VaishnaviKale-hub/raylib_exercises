const r = require("raylib");
const g = require("./geometry")

const windowWidth = 500;
const windowHeight = 600;

const sourceX = 250;
const sourceY = 200;

const target2X = 400;
const target2Y = 168;
const target1X = 300;
const target1Y = 369;

function setup() {
  r.InitWindow(windowWidth, windowHeight, "loser Target");
  r.SetTargetFPS(50);
}

function update() { }

function nearestPoint(x, x1) {
  const T2 = g.distance(sourceX, sourceY, target1X, target1Y)
  const T1 = g.distance(sourceX, sourceY, target2X, target2Y)
  if (T1 > T2) {
    return x;
  }
  return x1;
}

function draw() {
  const radius = 20;
  const targetColor = r.RED;

  r.BeginDrawing();
  r.ClearBackground(r.GRAY);
  r.DrawCircle(sourceX, sourceY, radius, r.GREEN);
  r.DrawCircle(target1X, target1Y, radius, targetColor);
  r.DrawCircle(target2X, target2Y, radius, targetColor);
  r.DrawLine(
    sourceX,
    sourceY,
    nearestPoint(target1X, target2X),
    nearestPoint(target1Y, target2Y),
    r.WHITE,
  );
  r.EndDrawing();
}

function running() {
  return !r.WindowShouldClose();
}

function teardown() {
  r.CloseWindow();
}

module.exports = {
  running,
  setup,
  update,
  draw,
  teardown,
};