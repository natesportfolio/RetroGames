var img1;
var img2
var img3;
var img4;

function preload() {
  img1 = loadImage("../../assets/images/naklejka-space-invaders.jpg");
  img2 = loadImage("../../assets/images/alien.png");
  img3 = loadImage("../../assets/images/ship.png");
  img4 = loadImage("../../assets/images/shot.png");
}

function Aliens(xpos,ypos,width,height){
this.xpos = xpos;
this.ypos = ypos;
this.width = width;
this.height = height;
}

var alien = [];

function Shot(xpos,ypos,width,height){
this.xpos = xpos;
this.ypos = ypos;
this.width = 50;
this.height = 100;
}

var gameScreen = 0;
var shots = [];
var a = 0;
var x =0;
var y = 10;
var speed = 5;
var level = 1;
var score = 0;

var xspeed = 1;
var yspeed = 2;

function setup(){
    createCanvas(600, 600);
    background("grey");
    preload();

}

function draw(){
    if (gameScreen == 0) {
        initScreen();
    }
    if (gameScreen == 1){
        img2.resize(100, 100);
        background("grey");
        drawShip();
        move();
        drawAlien();
        addshot();
        disappear();
        drawScore();
        if (alien.length == 0){
            levels();
        }
    }
}
function initScreen(){
    image(img1, 0, 0);
    fill("black");
    textSize(50);
    textAlign(CENTER);
    text("Click Here To Start!   ", 300, 325);

}

 function drawShip(){
    img3.resize(100,50);
    var shipXpos = (((width/2) - 50) + x);
    image(img3, shipXpos, 550);
        if (shipXpos >= 600 ){
            x = -x +100 ;
        }else if(shipXpos  <= -75){
            x = -x;
        }
 }

function move(){
    if (keyIsDown(LEFT_ARROW)){
        x -= 5;
    }
        if (keyIsDown(RIGHT_ARROW)){
            x += 5;
        }
}

function drawAlien(){
    for (var s =0; s < alien.length; s++){
        image(img2,alien[s].xpos,alien[s].ypos);
        alien[s].xpos = alien[s].xpos + xspeed;

        if(alien[s].xpos < 0 || alien[s].xpos > 600 - (alien[s].width) ){
            xspeed = -xspeed;
            for (var d =0; d < alien.length; d++){
                alien[d].ypos = alien[d].ypos + yspeed;
            }
        }
       if(alien[s].ypos >= 490){
           background("black");
           fill("white");
           textSize(50);
           textAlign(CENTER);
           text("YOU LOSE", 305,260);
       }
    }
}

function keyPressed(){
  img4.resize(20, 20);
    if (keyCode == 32){
             shots.push(new Shot((((width/2) - 15) + x), 530));
        }
    }

function addshot(){
    for(var a = 0; a < shots.length; a++){
        fill("white");
        image(img4,shots[a].xpos, shots[a].ypos);
        shots[a].ypos = shots[a].ypos - y;
    }
}

function disappear(){
    for (var j = 0; j < shots.length; j++){
        for(var i = 0; i < alien.length; i++){
            if ((shots[j].xpos >= (alien[i].xpos - alien[i].width/2) && shots[j].xpos <= (alien[i].xpos + alien[i].width/2))){
              if(shots[j].ypos >= (alien[i].ypos - alien[i].height/2) && shots[j].ypos <= (alien[i].ypos + alien[i].height/2)){
              // shots.splice(j, 1);
                alien.splice(i, 1);
                score = score + 10;
            }
          }
        }
    }
    if (score >= 1000){
        background("black");
        fill("white");
        textSize(50);
        textAlign(CENTER);
        text("YOU HAVE WON", 305,260);
    }
}
function mousePressed(){
    if (gameScreen == 0) {
        if (mouseX >= 0 && mouseX <= 600 && mouseY >= 0 && mouseY <=600) {
            gameScreen ++;
        }
    }
}
function levels(){
    if (gameScreen == 1){
        for (var n =0; n<6; n++){
            alien.push(new Aliens(30 + (n*90),50,50,50));
            if (score >= 60 && alien.length >= 6) {
                for (var z =0; z<6; z++){
                    alien.push(new Aliens(30 + (z*90),125,50,50));
                    if (score >= 180 && alien.length >= 12){
                        y ++;
                        for (var x=0; x<6; x++){
                            alien.push(new Aliens(30 + (x*90),200,50,50));
                            if (score >= 360 && alien.length >= 18){
                                y ++;
                                for (var c =0; c<6; c++){
                                    alien.push(new Aliens(30 +(c*90),275,50,50));
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function drawScore(){
    fill('black');
    textSize(30);
    text("Score: " + score, 0, 0, 100, 100);
}
