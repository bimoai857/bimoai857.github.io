
class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.rectangle = new Rectangle(50, 500, 50, 50, 0, 0);
        this.platforms = [];
        this.score = 0;
        this.mute = true;
        

        this.backgroundMusic = new Audio('stranger-things-124008.mp3');
        this.jumpSound = new Audio('jump.wav');
        this.collisionSound = new Audio('explodingplatform.mp3');

        this.leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

        this.setupPlatforms();
        this.setupEventListeners();
        this.setupSoundControls();
        this.startGame();
    }

    setupPlatforms() {
        const platformHeightPercentage = 5;
        const numPlatforms = 10;

        this.platforms = [];

        for (let i = 0; i < numPlatforms; i++) {
            let x = Math.random() * this.canvas.width;
            let y = (i + 1) * (this.canvas.height / (numPlatforms + 1)) - (platformHeightPercentage / 100) * this.canvas.height / 2;
            let height = (platformHeightPercentage / 100) * this.canvas.height;
            this.platforms.push(new Platform(x, y, 100, height, 2));
        }

        this.rectangle.y = this.platforms[0].y - this.rectangle.height;
        this.platforms[0].x = this.rectangle.x;
    }

    setupSoundControls() {
        const soundControlContainer = document.createElement('div');
        soundControlContainer.style.position = 'absolute';
        soundControlContainer.style.top = '10px';
        soundControlContainer.style.right = '10px';
        soundControlContainer.style.zIndex = '1000';

        const muteButton = document.createElement('button');
        muteButton.textContent = 'Play Sound';
        muteButton.addEventListener('click', () => this.toggleMute());

        soundControlContainer.appendChild(muteButton);
        document.body.appendChild(soundControlContainer);
    }

    toggleMute() {
        this.mute = !this.mute;

        if (this.mute) {
            this.backgroundMusic.pause();
        } else {
            this.backgroundMusic.play();
        }
    }

    startGame() {
        this.backgroundMusic.loop = true;
        this.backgroundMusic.volume = 0.5;


            this.backgroundMusic.play();
            this.gameLoop();
     
    }

    gameLoop() {
        this.clearCanvas();

        this.drawRectangle();
        this.movePlatforms();

        this.applyGravity();

        this.moveRectangle();

        this.checkCollisions();

        this.displayScore();

        requestAnimationFrame(() => this.gameLoop());
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRectangle() {
        // Color the rectangle green
        this.ctx.fillStyle = 'green';
        this.ctx.fillRect(this.rectangle.x, this.rectangle.y, this.rectangle.width, this.rectangle.height);
    }

    movePlatforms() {
        for (let i = 0; i < this.platforms.length; i++) {
            let platform = this.platforms[i];
            this.ctx.fillStyle = 'black'; // Set the platform color to black
            this.ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
            platform.y += platform.dy;
            if (platform.y > this.canvas.height) {
                platform.y = -platform.height;
                platform.x = Math.random() * this.canvas.width;
            }

            if (this.rectangle.y + this.rectangle.height > platform.y && this.rectangle.y < platform.y + platform.height &&
                this.rectangle.x + this.rectangle.width > platform.x && this.rectangle.x < platform.x + platform.width) {
                this.rectangle.dy = 0;
                this.rectangle.y = platform.y - this.rectangle.height;
                this.score++;
            }
        }
    }

    applyGravity() {
        this.rectangle.y += this.rectangle.dy;
        this.rectangle.dy += 0.5; // Gravity
    }

    moveRectangle() {
        this.rectangle.x += this.rectangle.dx;
    }

    checkCollisions() {
        if (this.rectangle.y > this.canvas.height) {
            if (!this.mute) this.collisionSound.play();

            if (this.score > 0) {
                this.leaderboard.push(this.score);
                this.leaderboard.sort((a, b) => b - a);
                this.leaderboard = this.leaderboard.slice(0, 5);

                localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard));
            }

            alert('Game over! Your score was ' + this.score + '\n\nLeaderboard:\n' + this.leaderboard.join('\n'));

            this.resetGame();
        }
    }

    displayScore() {
        this.ctx.font = '20px Arial';
        this.ctx.fillStyle = 'black'; // Set the text color to black
        this.ctx.fillText('Score: ' + this.score, 10, 30);
        this.ctx.fillText('High Score: ' + (this.leaderboard.length > 0 ? this.leaderboard[0] : 0), 10, 60);
    }

    setupEventListeners() {
        window.addEventListener('keydown', (event) => {
            this.handleKeyDown(event);
        });

        window.addEventListener('keyup', (event) => {
            this.handleKeyUp(event);
        });
    }

    handleKeyDown(event) {
        if (event.code === 'ArrowUp') {
            if (!this.mute) this.jumpSound.play();
            this.rectangle.dy = -10; // Jump speed
        }
        if (event.code === 'ArrowLeft') {
            this.rectangle.dx = -2; // Move left
        }
        if (event.code === 'ArrowRight') {
            this.rectangle.dx = 2; // Move right
        }
    }

    handleKeyUp(event) {
        if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') {
            this.rectangle.dx = 0; // Stop moving
        }
    }

    resetGame() {
        this.rectangle = new Rectangle(50, 500, 50, 50, 0, 0);
        this.platforms = [];
        this.setupPlatforms();
        this.score = 0;
    }
}


// Start the game
const jumpingRectangleGame = new Game();