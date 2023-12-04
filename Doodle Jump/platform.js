class Platform {
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  draw(ctx) {
    ctx.fillStyle = "#0F0";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.y = 0;
      this.x = Math.random() * (canvas.width - 40);
    }
  }
}

const platforms = [];
const platformSpeed = 1;
