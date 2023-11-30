// Class representing an individual bouncing ball
class Ball {
    constructor(container) {
      this.container = container;
      this.element = document.createElement('div');
      this.element.className = 'ball';
      this.element.style.backgroundColor = this.getRandomColor();
      this.container.appendChild(this.element);
  
      this.maxX = this.container.clientWidth - this.element.clientWidth;
      this.maxY = this.container.clientHeight - this.element.clientHeight;
  
      this.element.style.left = Math.random() * this.maxX + 'px';
      this.element.style.top = Math.random() * this.maxY + 'px';
  
      this.speedX = (Math.random() - 0.5) * 8;
      this.speedY = (Math.random() - 0.5) * 8;
    }
  
    // Method to generate a random color for the ball
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    // Method to update the position of the ball
    update() {
      let x = parseFloat(this.element.style.left) + this.speedX;
      let y = parseFloat(this.element.style.top) + this.speedY;
  
      // Bounce off the container boundaries
      if (x < 0) {
        x = 0;
        this.speedX = -this.speedX;
      } else if (x > this.maxX) {
        x = this.maxX;
        this.speedX = -this.speedX;
      }
  
      if (y < 0) {
        y = 0;
        this.speedY = -this.speedY;
      } else if (y > this.maxY) {
        y = this.maxY;
        this.speedY = -this.speedY;
      }
  
      // Update the position of the ball
      this.element.style.left = x + 'px';
      this.element.style.top = y + 'px';
    }
  }
  
  // Class representing a collection of bouncing balls
  class BouncingBalls {
    constructor(container, numberOfBalls) {
      this.container = container;
      this.balls = [];
  
      // Create the specified number of bouncing balls
      for (let i = 0; i < numberOfBalls; i++) {
        this.balls.push(new Ball(this.container));
      }
    }
  
    // Method to update the positions of all bouncing balls
    updateBalls() {
      // Update each individual ball
      this.balls.forEach(ball => {
        ball.update();
      });
  
      // Handle collisions between balls
      for (let i = 0; i < this.balls.length; i++) {
        for (let j = i + 1; j < this.balls.length; j++) {
          const ball1 = this.balls[i];
          const ball2 = this.balls[j];
  
          // Calculate the distance between two balls
          const dx = parseFloat(ball2.element.style.left) - parseFloat(ball1.element.style.left);
          const dy = parseFloat(ball2.element.style.top) - parseFloat(ball1.element.style.top);
          const distance = Math.sqrt(dx * dx + dy * dy);
  
          // Check if there's a collision
          if (distance < ball1.element.clientWidth) {
            // Resolve the collision by moving the balls away from each other
            const angle = Math.atan2(dy, dx);
            const overlap = ball1.element.clientWidth - distance;
  
            const moveX = overlap * Math.cos(angle) * 0.5;
            const moveY = overlap * Math.sin(angle) * 0.5;
  
            ball1.element.style.left = parseFloat(ball1.element.style.left) - moveX + 'px';
            ball1.element.style.top = parseFloat(ball1.element.style.top) - moveY + 'px';
  
            ball2.element.style.left = parseFloat(ball2.element.style.left) + moveX + 'px';
            ball2.element.style.top = parseFloat(ball2.element.style.top) + moveY + 'px';
  
            // Swap velocities for a simple bounce effect
            [ball1.speedX, ball2.speedX] = [ball2.speedX, ball1.speedX];
            [ball1.speedY, ball2.speedY] = [ball2.speedY, ball1.speedY];
          }
        }
      }
  
      // Continue the animation by requesting the next frame
      requestAnimationFrame(() => this.updateBalls());
    }
  }
  
  // Get the container element from the HTML
  const container = document.getElementById('container');
  
  // Create an instance of the BouncingBalls class with 70 balls
  const bouncingBalls = new BouncingBalls(container, 70);
  
  // Start the animation loop
  bouncingBalls.updateBalls();
  