var trex, trexWalk, groundimage, ground, ground2, cloud, cloudimage, cactus, ci, ci2, ci3, ci4, ci5, ci6, score, PLAY = 1, END = 0, gamestate = PLAY, restart, gameover, gameoverpng, restartpng, trexcollided;
localStorage["highscore"] = 0
score = 0;
var CloudsGroup, ObstaclesGroup;
function preload(){
  trexWalk = loadAnimation("trex1.png", "trex3.png", "trex4.png") ;
  groundimage = loadImage("ground2.png");
  cloudimage = loadImage("cloud.png");
  ci = loadImage("obstacle1.png");
  ci2 = loadImage("obstacle2.png");
  ci3 = loadImage("obstacle3.png");
  ci4 = loadImage("obstacle4.png");
  ci5 = loadImage("obstacle5.png");
  ci6 = loadImage("obstacle6.png");
  restartpng = loadImage("restart.png");
  gameoverpng = loadImage("gameover.png");
  trexcollided = loadAnimation("trex_collided.png");
}

function setup() {
  createCanvas(600, 400);
  trex = createSprite(50, 340,10, 10);
  trex.addAnimation("trex", trexWalk);
  trex.addAnimation("trexc", trexcollided);
  trex.scale = 0.5;
  ground = createSprite(200, 380, 600, 20);
  ground.addImage("ground", groundimage);
  ground2 = createSprite(200, 390, 600, 10);
  ground2.visible = false;
  CloudsGroup = new Group();
  ObstaclesGroup = new Group();
  restart = createSprite(300, 280, 50, 50);
  gameover = createSprite(300,200, 10 ,10);
  restart.addImage(restartpng);
  gameover.addImage(gameoverpng);
  restart.visible = false;
  gameover.visible = false;
}

function draw() {
  background("white");
  if(gamestate == PLAY){
    if(trex.y > 360 && keyDown(UP_ARROW)){
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY+0.5;
    
    ground.velocityX = -5 - 2*score/100;
    if(ground.x < 0){
      ground.x = ground.width / 2
    }
    score = score + Math.round(getFrameRate()/60);
    var highscore = 0;
    spawnClouds();
    spawnObstacles();
    if(ObstaclesGroup.isTouching(trex)){
      gamestate = END;
    }
  }
  
  else if(gamestate == END){
    trex.velocityY = 0;
    ground.velocityX = 0;
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setVelocityXEach(0);
    gameover.visible = true;
    restart.visible = true;
    CloudsGroup.setLifetimeEach(-1);
    ObstaclesGroup.setLifetimeEach(-1);
    trex.changeAnimation("trexc", trexcollided);
    
  }
  
   if(mousePressedOver(restart)){
     reset();
   }
  
  text("score:" + score, 530, 10)
  trex.collide(ground2);
  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,320,40,10);
    cloud.y = random(280,320);
    cloud.addAnimation("cloud", cloudimage);
    cloud.scale = 0.5;
    cloud.velocityX = -3 - 2*score/100;
    
     //assign lifetime to the variable
    cloud.lifetime = 134;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}
function spawnObstacles() {
  if(frameCount % 80 == 0){
    var cactus = createSprite(600,365,40,10);
     var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cactus.addImage(ci);
              break;
      case 2: cactus.addImage(ci2);
              break;
      case 3: cactus.addImage(ci3);
              break;
      case 4: cactus.addImage(ci4);
              break;
      case 5: cactus.addImage(ci5);
              break;
      case 6: cactus.addImage(ci6);
              break;
      default: break;
    }
    cactus.scale = 0.5;
    cactus.velocityX = -5 - 2*score/100;
    cactus.lifetime = 130;
    ObstaclesGroup.add(cactus);
  }
}

function reset(){
  gamestate = PLAY;
  gameover.visible = false;
  restart.visible = false;
  trex.changeAnimation("trex", trexWalk);
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  if(localStorage["highscore"] < score){
    localStorage["highscore"] = score
  }
  console.log(localStorage["highscore"]);
  score = 0;
}
    
    
    
    
    