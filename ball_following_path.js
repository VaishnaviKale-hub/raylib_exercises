const r = require("raylib");

function setup() {
  const screen = {};
  screen.windowHeight = 600;
  screen.windowWidth = 600;
  screen.fps = 50;

  const A = {
    x: 200,
    y: 200,
  };
  const B = {
    x: 400,
    y: 300,
  };
  const C = {
    x: 300,
    y: 500,
  };

  const ball = {
    x: 200,
    y: 200,
  };
  const points = [A, B, C];
  const speed = 1;
  let targetIndex = 1;

  r.SetTraceLogLevel(r.LOG_NONE);
  r.InitWindow(screen.windowWidth, screen.windowHeight, "moving ball");
  r.SetTargetFPS(screen.fps);

  return {
    screen,
    points,
    ball,
    speed,
    targetIndex,
  };
}

function drawPath(point1, point2) {
  r.DrawLineV(point1, point2, r.BLUE);
}

function drawPoints(point) {
  r.DrawCircleV(point, 5, r.WHITE);
}

function calculateDistance(point1, point2) {
  const distance = Math.sqrt(
    (point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2,
  );
  return distance;
}

function findDirection(point1, point2, distance) {
  const directionX = (point2.x - point1.x) / distance;
  const directionY = (point2.y - point1.y) / distance;

  return {
    directionX,
    directionY,
  };
}

function move(ball, points, targetIndex, speed) {
  const index = targetIndex % points.length;
  const target = points[index];
  const distanceToTarget = calculateDistance(ball, target);

  if (distanceToTarget >= 1) {
    const direction = findDirection(ball, target, distanceToTarget);

    ball.x += direction.directionX * speed;
    ball.y += direction.directionY * speed;
  } else {
    return targetIndex + 1;
  }
  return targetIndex;
}

function draw(world) {
  r.BeginDrawing();
  r.ClearBackground(r.BLACK);

  for (let i = 0; i < world.points.length; i++) {
    drawPoints(world.points[i]);
  }

  drawPath(world.points[0], world.points[1]);
  drawPath(world.points[1], world.points[2]);
  drawPath(world.points[2], world.points[0]);
  r.DrawCircleV(world.ball, 10, r.RED);

  world.targetIndex = move(
    world.ball,
    world.points,
    world.targetIndex,
    world.speed,
  );

  r.EndDrawing();
}

function teardown() {
  r.CloseWindow();
}

function loop(world) {
  while (!r.WindowShouldClose()) {
    draw(world);
  }
}
function main() {
  const world = setup();
  loop(world);
  teardown();
}

main();
