const r = require("raylib");
const g = require("./geometry")

const windowWidth = 500;
const windowHeight = 600;


function setup() {
  r.InitWindow(windowWidth, windowHeight, "Center Rectangle In Rectangle");
  r.SetTargetFPS(50);
}

function update() { }

function draw() {
  const x = 50;
  const y = 50;
  const width1 = 350;
  const height1 = 300;
  const width2 = 150;
  const height2 = 100;
  const color = r.WHITE;

  r.BeginDrawing();
  r.ClearBackground(r.BLUE);
  r.DrawRectangle(x, y, width1, height1, color);
  r.DrawRectangle(
    g.calcOffset(width1, width2, x),
    g.calcOffset(height1, height2, y),
    width2,
    height2,
    r.RED,
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
  update,
  setup,
  draw,
  teardown,
};