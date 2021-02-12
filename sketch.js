var boy, boyImage;
var boyJumping, boyJumpingImage;

var coin, coinImage;
var mon1, mon1Image;
var mon2, mon2Image;

var obstacle1, obstacle1Image;
var obstacle2, obstacle2Image;
var obstacle3, obstacle3Image;
var obstacle4, obstacle4Image;
var obstacle1Group, obstacle2Group, obstacle3Group, obstacle4Group;
var coinGroup;
var moster1Group;
var Enemy2Group;


var scenery, sceneryImage;
var ground;

var score = 0;
var gameOver, restart;
var gameOverImg, restartImg;

var gameState = "PLAY";


function preload(){
  sceneryImage = loadImage("sprites/background1.jpg");
  boyImage = loadAnimation("sprites/run1.png", "sprites/run2.png", "sprites/run3.png", "sprites/run4.png");
  boyJumpingImage = loadAnimation("sprites/boyJumping.png");
  coinImage = loadImage("sprites/coin1.png");
  mon1Image = loadImage("sprites/mon1.png");
  mon2Image = loadImage("sprites/mon2.png");
  obstacle1Image = loadImage("sprites/obs1.png");
  obstacle2Image = loadImage("sprites/obs2.png");
  obstacle3Image = loadImage("sprites/obs3.png");
  obstacle4Image = loadImage("sprites/obs4.png");
  gameOverImg = loadImage("sprites/gameOver.png");
  restartImg = loadImage("sprites/restart.png");
}



function setup(){
 createCanvas(windowWidth, windowHeight);

 scenery = createSprite(750,350);
 scenery.addImage(sceneryImage);
 scenery.scale = 1.6;

 boy = createSprite(100,600,20,20);
 boy.addAnimation("running", boyImage);
 boy.scale = 0.4;

 ground = createSprite(597,windowHeight-81,5000,50);
 ground.visible = false;

 gameOver = createSprite(displayWidth/2,displayHeight/2);
 gameOver.addImage(gameOverImg);
 gameOver.scale = 0.3;

 restart = createSprite(displayWidth/2,displayHeight/2+140);
 restart.addImage(restartImg);
 restart.scale = 0.3

 boy.addAnimation("jumping", boyJumpingImage);

 obstacle1Group = new Group();
 obstacle2Group = new Group();
 obstacle3Group = new Group();
 obstacle4Group = new Group();

 coinGroup = new Group();

 monster1Group = new Group();
 Enemy2Group = new Group();

 


  
}

function draw(){
  background("white");
  boy.collide(ground);
  
  if(gameState === "PLAY"){
    boy.visible = true;
    gameOver.visible = false;
    restart.visible = false;
  
  if(keyDown("space") && boy.y >= 590) {
    boy.velocityY = -10.5;
    boy.changeAnimation("jumping", boyJumpingImage);
    

  }
  boy.changeAnimation("running", boyImage);
  boy.velocityY = boy.velocityY + 0.3;
  

  if(boy.isTouching(coinGroup)){
    score = score+ 1;
    coinGroup.destroyEach();
  }

  if(boy.isTouching(obstacle1Group)){
    gameState = "END";
    obstacle1Group.setVelocityXEach(0);
    obstacle1Group.destroyEach();
  }

  if(boy.isTouching(obstacle2Group)){
    gameState = "END";
    obstacle2Group.setVelocityXEach(0);
    obstacle2Group.destroyEach();
  }

  if(boy.isTouching(obstacle3Group)){
    gameState = "END";
    obstacle3Group.setVelocityXEach(0);
    obstacle3Group.destroyEach();
  }

  if(boy.isTouching(obstacle4Group)){
    gameState = "END";
    obstacle4Group.setVelocityXEach(0);
    obstacle4Group.destroyEach();
  }

  if(boy.isTouching(monster1Group)){
    gameState = "END";
    monster1Group.setVelocityXEach(0);
    monster1Group.destroyEach();
  }

  if(boy.isTouching(Enemy2Group)){
    gameState = "END";
    Enemy2Group.setVelocityXEach(0);
    Enemy2Group.destroyEach();
  }

  

  text(mouseX+","+mouseY, mouseX,mouseY);

  spawnCoin();
  

  if(frameCount % 250 === 0) {
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: spawnLantern();
              break;
      
      case 2: spawnBox();
              break;
      
      case 3: spawnNeedle();
              break; 
              
      case 4: spawnBox2();
              break;

      case 5: spawnEnemy1();       
              break;

      case 6: spawnEnemy2();       
              break;
              

      default: break;
    }
  }
}
  else if(gameState === "END"){
    gameOver.visible = true;
    restart.visible = true;
    boy.visible = false;
    coinGroup.setVelocityXEach(0);
    if(mousePressedOver(restart)) {
      reset();
    }
    coinGroup.destroyEach();
  }
  drawSprites();
  textSize(24)
  text("Score: "+ score, 1300,50);
}



function spawnLantern(){
   
  obstacle1 = createSprite(1500,670);
  obstacle1.addImage(obstacle1Image);
  obstacle1.scale = 0.7;
  obstacle1.velocityX = -6;
  obstacle1.lifetime = 500;
  obstacle1Group.add(obstacle1);
}

function spawnBox(){
   
  obstacle2 = createSprite(1500,670);
  obstacle2.addImage(obstacle2Image);
  obstacle2.scale = 0.5;
  obstacle2.velocityX = -6;
  obstacle2.lifetime = 500;
  obstacle2Group.add(obstacle2);
}

function spawnNeedle(){
   
  obstacle3 = createSprite(1500,670);
  obstacle3.addImage(obstacle3Image);
  obstacle3.scale = 0.7;
  obstacle3.velocityX = -6;
  obstacle3.lifetime = 500;
  obstacle3Group.add(obstacle3);
}

function spawnBox2(){
   
  obstacle4 = createSprite(1500,670);
  obstacle4.addImage(obstacle4Image);
  obstacle4.scale = 0.5;
  obstacle4.velocityX = -6;
  obstacle4.lifetime = 500;
  obstacle4Group.add(obstacle4);
}

function spawnEnemy1(){
   
  monster1 = createSprite(1500,700);
  monster1.addImage(mon1Image);
  monster1.scale = 0.6;
  monster1.velocityX = -6;
  monster1.lifetime = 500;
  monster1Group.add(monster1);
}

function spawnEnemy2(){
   
  Enemy2 = createSprite(1500,700);
  Enemy2.addImage(mon2Image);
  Enemy2.scale = 0.7;
  Enemy2.velocityX = -6;
  Enemy2.lifetime = 500;
  Enemy2Group.add(Enemy2);
}

function spawnCoin(){
  if(frameCount % 450 === 0){
 coin = createSprite(1500,20,40,40);
 coin.y = Math.round(random(290,490));
 coin.addImage(coinImage);
 coin.scale = 0.2;
 coin.velocityX = -4;
 coin.lifetime =  500;
 coinGroup.add(coin);
 
  }
}

function reset(){
  gameState = "PLAY";
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}





  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  







