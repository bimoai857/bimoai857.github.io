import Player  from './player.js';

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


const player = new Player(
  canvas.width / 2 - 20,
  canvas.height - 30,
  40,
  20,
  5,
  7,
  0.2,canvas
);


function draw() {
  player.draw(ctx);
  platforms.forEach((platform) => platform.draw(ctx));
}

function update() {
  player.update();
  platforms.forEach((platform) => platform.update());

  platforms.forEach((platform) => {
    if (
      player.x < platform.x + platform.width &&
      player.x + player.width > platform.x &&
      player.y + player.height > platform.y &&
      player.y < platform.y + platform.height
    ) {
      player.y = platform.y - player.height;
      player.velocityY = platform.speed;
    }
  });
}

function createPlatform() {
  const platform = new Platform(
    Math.random() * (canvas.width - 40),
    0,
    40,
    10,
    platformSpeed
  );
  platform.push(platform);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  draw();
  update();

  if (Math.random() < 1 / 50) {
    createPlatform();
  }

  requestAnimationFrame(gameLoop);
}

function keyDownHandler(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    player.velocityX = player.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    player.velocityX = -player.speed;
  } else if (e.key === "Up" || e.key === "ArrowUp") {
    player.jump();
  }
}

function keyUpHandler(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    player.velocityX = 0;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

gameLoop();
