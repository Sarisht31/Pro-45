var PLAY = 1;
var END = 0;
var gameState = PLAY;

var runner, runnerRunning, runnerCollided;
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3

var score = 0;

var gameOver, restart;

localStorage["HighestScore"] = 0;

function preload(){
restartImage = loadImage("Sprites/restart.png");
gameOverImage = loadImage("Sprites/gameOver.png");
die = loadSound("Assets/die.mp3");  
jump = loadSound("Assets/jump.mp3");
check = loadSound("Assets/checkPoint.mp3");

}

function setup(){
createCanvas(800,200);


runner = createSprite(120,180,20,50);
//add animation
runner.scale = 0.5;


ground = createSprite(200,180,200,20);
//addImage
ground.x = ground.width/2;
ground. velocityX = -2


invisibleGround = createSprite(200,190,200,10);
invisibleGround.visible = false;

gameOver = createSprite(280,80,20,20);
gameOver.addImage(gameOverImage);
gameOver.scale = 0.6;
gameOver.visible = false;

restart = createSprite(260,130,20,20);
restart.addImage(restartImage);
restart.scale = 0.5;
restart.visible = false;

GroupObstacles = new Group();
}

function draw(){
background("black");

if (gameState === PLAY){

ground.velocityX = -(2 + Math.round(score/100));

if(keyDown("Space") && runner.y > 161 ){
runner.velocityX = -12;
jump.play();
}

runner.velocityY = runner.velocityY + 0.8;


camera.position.x = runner.x +200;

if(ground.x < 0){
ground.x = ground.width/2
}

spawnObstacles();

score = score + Math.round(getFrameRate()/60);

if(score > 0 && score % 100 === 0){
  check.play();
}

if(GroupObstacles.isTouching(runner)){
    die.play();
    gameState = END;
}

}else if(gameState === END){
  GroupObstacles.setVelocityXEach(0);
     //runner.changeAnimation("collided", );
    ground.velocityX=0;
    trex.velocityY=0;
    GroupObstacles.setLifetimeEach(-1);
     gameOver.visible = true;
    restart.visible = true;
}

runner.collide(invisibleGround);

if(localStorage["HighestScore" < score]){
  localStorage["HighestScore"] = score;
}
fill ("black");
textSize(15);
text("Score:" +score, 300, 50);
text("High Score:"+ localStorage["HighestScore"],150,50)

if(mousePressedOver(restart)){
  reset();
}

drawSprites();


}

function reset(){

gameState = PLAY;
gameOver.visible = false;
restart.visible = false;

GroupObstacles.setLifetimeEach(0);

//runner.changeAnimation("running",)

score = 0;
}

function spawnObstacles(){
if(frameCount % 60 === 0){
  obstacle = createSprite(600,165,10,40);
  obstacle.veocityX = -(6 + Math.round(score/100));

  //var rand = Math.round(random(1,6));

//switch(rand){
// case 1: obstacle.addImage();
// break;
//case 2: obstacle.addImage();
// break;
//case 3: obstacle.addImage();
// break;
//default: break;
//}

obstacle.scale = 0.5;
obstacle.lifetime = 100;

GroupObstacles.add(obstacle);
}
}






