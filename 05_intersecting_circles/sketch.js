const r = require("raylib");
const g = require("./geometry")

const windowWidth = 800;
const windowHeight = 600;

function setup() {
  r.InitWindow(windowWidth, windowHeight, "Center Rectangle");
  r.SetTargetFPS(50);
}

function update() { }

function colorChoose(distance, radius1, radius2) {
  return distance < (radius1 + radius2) ? r.RED : r.BLACK;
}

function draw() {
  const circle1X = 500;
  const circle1Y = 200;
  const circle1R = 80;

  const circle2X = 300;
  const circle2Y = 200;
  const circle2R = 70;

  const distance = g.distance(circle2X - circle1X, circle2Y - circle1Y);
  const color = colorChoose(distance, circle1R, circle2R);

  r.BeginDrawing();
  r.ClearBackground(r.WHITE);
  r.DrawCircle(circle1X, circle1Y, circle1R, color);
  r.DrawCircle(circle2X, circle2Y, circle2R, color);
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