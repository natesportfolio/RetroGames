var playerY = 20;
var CPUy = 20;
var scorePlayer = 0;
var scoreCPU = 0;
var ballX = 305;
var ballY = 225;
var ballMomentumX = -4;
var ballMomentumY = 4;
var munro;
var pai;
var fcc;
var consumer;

function preload() {
  munro = loadFont("../../assets/fonts/Munro.ttf");
  pai = loadImage("../../assets/images/ajitpai.png");
  fcc = loadImage("../../assets/images/FCCpaddle.png");
  consumer = loadImage("../../assets/images/Consumerpaddle.png");
}

function setup() {
  createCanvas(640, 480);
  fill(0);
  rect(0, 0, 640, 480);
  textFont(munro);
}

function draw() {
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
        this.ballMomentumX *= -1;
      } else {
        scoreCPU++;
        this.ballMomentumX = -4;
        this.ballMomentumY = 4;
        this.ballX = 305;
        this.ballY = 225;
      }
  } else if (this.ballX >= 570) {
    this.ballMomentumX *= -1;
  }

  if (this.ballY > 20 && this.ballY < 430) {
    this.ballY += this.ballMomentumY;
  }

  if (this.ballY == 21 || this.ballY == 409) {
    this.ballMomentumY *= -1;
  }

  this.ballX += this.ballMomentumX;

  if (this.ballY < 50 || this.ballY > 390) {
  } else {
    this.CPUy = this.ballY - 35;
  }

  var rand = round(random(0, 20));
  if (rand == 5) {
    this.playerY = round(random(20, 360));
  }

  stroke(0);
  rect(270, 5, 20, 40);
  rect(320, 5, 40, 40);
  fill(255);
  image(consumer, 20, this.playerY);
  image(fcc, 600, this.CPUy);
  image(pai, this.ballX, this.ballY, 30, 40);
  textSize(30);
  text(scorePlayer, 270, 35);
  text(scoreCPU, 320, 35);
  stroke(255);
  line(300, 10, 300, 40);
}
