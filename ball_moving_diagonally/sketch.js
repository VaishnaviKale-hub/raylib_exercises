const r = require("raylib");

const windowWidth = 800;
const windowHeight = 600;

function setup() {
  r.InitWindow(windowWidth, windowHeight, "Center Rectangle");
  r.SetTargetFPS(50);
}

let x = 30;
let y = 40;

function update() {
  x = x + (windowWidth / windowHeight) * 3;
  y = y + 3;
  if (x > windowWidth) {
    x = -20;
    y = -20;
  }
}

function draw() {
  const color = r.WHITE;
  update(x, y);
  r.BeginDrawing();
  r.ClearBackground(r.BLUE);
  r.DrawCircle(x, y, 30, color);
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