var playerY = 190;
var CPUy = 190;
var scorePlayer = 0;
var scoreCPU = 0;
var ballX = 305;
var ballY = 225;
var ballMomentumX = -4;
var ballMomentumY = 4;
var munro;
var playing = false;
var twoplayer = false;

function preload() {
  munro = loadFont("../../assets/fonts/Munro.ttf");
}

function setup() {
  createCanvas(640, 480);
  fill(0);
  rect(0, 0, 640, 480);
  textFont(munro);
  stroke(0);
  rect(290, 5, 20, 40);
  rect(340, 5, 40, 40);
  fill(255);
  rect(20, this.playerY, 20, 100);
  rect(600, this.CPUy, 20, 100);
  rect(this.ballX, this.ballY, 30, 30);
  textSize(30);
  text(scorePlayer, 285, 35);
  text(scoreCPU, 335, 35);
  stroke(255);
  line(320, 10, 320, 40);
  text("Press space to start", 200, 200);
  text("Press 2 for 2-player", 200, 300);
}

function keyPressed() {
  if (keyCode == 32) {
    start();
  }
  if (keyCode == 50) {
    twoPlayer();
  }
}

function draw() {
  if (this.playing) {
    fill(0);
    stroke(0);
    rect(20, this.playerY, 20, 100);
    rect(600, this.CPUy, 20, 100);
    rect(this.ballX, this.ballY, 30, 40);
    stroke(255);
    if (keyIsDown(UP_ARROW)) {
      if (this.playerY > 20) {
        this.playerY -= 4;
      }
    } else if (keyIsDown(DOWN_ARROW)) {
      if (this.playerY < 360) {
        this.playerY += 4;
      }
    }

    if (this.ballX <= 41) {
      if (this.ballY <= (this.playerY + 100) && this.ballY >= (this.playerY - 50)) {
        this.ballMomentumX *= -1.1;
      } else {
        scoreCPU++;
        this.ballMomentumX = -4;
        this.ballMomentumY = 4;
        this.ballX = 305;
        this.ballY = 225;
      }
    } else if (this.ballX >= 570) {
      if (this.ballY <= (this.CPUy + 100) && this.ballY >= (this.CPUy - 50)) {
        this.ballMomentumX *= -1.1;
      } else {
        scorePlayer++;
        this.ballMomentumX = -4;
        this.ballMomentumY = 4;
        this.ballX = 305;
        this.ballY = 225;
      }
    }

    if (this.ballY > 20 && this.ballY < 430) {
      this.ballY += this.ballMomentumY;
    }

    if (this.ballY == 21 || this.ballY == 409) {
      this.ballMomentumY *= -1;
    }

    this.ballX += this.ballMomentumX;

    if (!this.twoplayer) {
      if (this.ballY < 50 || this.ballY > 390) {
      } else {
        var difference = this.ballY - this.CPUy;
        if (difference > 0) {
          this.CPUy += 2;
        } else if (difference < 0) {
          this.CPUy -= 2;
        }
      }
    } else {
      if (keyIsDown(87)) {
        if (this.CPUy > 20) {
          this.CPUy -= 4;
        }
      } else if (keyIsDown(83)) {
        if (this.CPUy < 360) {
          this.CPUy += 4;
        }
      }
    }

    stroke(0);
    rect(285, 5, 20, 40);
    rect(335, 5, 40, 40);
    fill(255);
    rect(20, this.playerY, 20, 100);
    rect(600, this.CPUy, 20, 100);
    rect(this.ballX, this.ballY, 30, 30);
    textSize(30);
    text(scorePlayer, 285, 35);
    text(scoreCPU, 335, 35);
    stroke(255);
    line(320, 10, 320, 40);
  }

  if (scorePlayer == 10) {
    this.playing = false;
    if (this.twoplayer) {
      text("Player 1 Wins!", 250, 200);
    } else {
      text("You win!", 250, 200);
    }
  } else if (scoreCPU == 10) {
    this.playing = false;
    if (this.twoplayer) {
      text("Player 2 Wins!", 250, 200);
    } else {
      text("You lose!", 250, 200);
    }
  }
}

function start() {
  this.playing = true;
  fill(0);
  stroke(0);
  rect(190, 175, 300, 40);
  rect(190, 275, 300, 40);
}

function twoPlayer() {
  this.twoplayer = true;
  fill(0);
  stroke(0);
  rect(190, 275, 300, 40);
}
