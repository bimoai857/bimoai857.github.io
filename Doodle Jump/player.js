export default class Player {
  constructor(x, y, width, height, speed, jumpStrength, gravity,canvas) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.jumpStrength = jumpStrength;
    this.velocityX = 0;
    this.velocityY = 0;
    this.friction = 1;
    this.gravity = gravity;
    this.canvas=canvas;
  }

  draw(ctx) {
    ctx.fillStyle = "#00F";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.velocityX;
    this.y += this.velocityY;

    this.velocityX *= this.friction;
    this.velocityY += this.gravity;

    if (this.x < 0) {
      this.x = 0;
      this.velocityX = 0;
    } else if (this.x + this.width > this.canvas.width) {
      this.x = this.canvas.width - this.width;
      this.velocityX = 0;
    }

    if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    } else if (this.y + this.height > this.canvas.height) {
      this.y = this.canvas.height - this.height;
      this.velocityY = 0;
    }
  }

  jump() {
    if (this.y === this.canvas.height - this.height) {
      this.velocityY = -this.jumpStrength;
    }
  }
}
