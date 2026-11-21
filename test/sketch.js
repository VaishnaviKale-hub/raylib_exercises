const r = require("raylib");
const geometry = require("./geometry");

const windowWidth = 500;
const windowHeight = 600;

function setup() {
  r.InitWindow(windowWidth, windowHeight, "Test");
  r.SetTargetFPS(50);
}

function update() {}

function draw() {
  r.BeginDrawing();
  r.ClearBackground(r.BLUE);

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
