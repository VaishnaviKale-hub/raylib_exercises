const r = require("raylib");
const geometry = require("./geometry");


const windowWidth = 500;
const windowHeight = 600;

function setup() {
  r.InitWindow(windowWidth, windowHeight, "Center Rectangle");
  r.SetTargetFPS(50);
}

function update() { }

function draw() {
  const width = 150;
  const height = 100;
  const color = r.WHITE;

  r.BeginDrawing();
  r.ClearBackground(r.BLUE);
  r.DrawRectangle(
    geometry.calcOffset(windowWidth, width),
    geometry.calcOffset(windowHeight, height),
    width,
    height,
    color,
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