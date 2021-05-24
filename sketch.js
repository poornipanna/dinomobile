var backgroundImg;
var dino, dinoIdleImg, dinoRunImg, dinoJumpImg, dinoDeadImg;
var ground, groundImg, groundInv;
var edges;
var obstacle, obstacleImg, obstacleGroup;
var platform, platformImg, platformGroup;
var platformInv, platformInvGroup;
var skeleton, skeletonImg, skeletonGroup;
var stone, stoneStaticImg, stoneDynamicImg, stoneGroup;
var score = 0;
var life1, life2, life3, lifeImg;
var life = 3;
var gameState = "menu";
var gameOver, gameOverImg;
var play, playImg;
var fire, fireImg, fireGroup;
var replay, replayImg;
var instructions, instructionsImg;
var back, backImg;
var insText, insTextImg;

function preload(){

    backgroundImg = loadImage("images/bg/background.png");
    
    dinoIdleImg = loadAnimation("images/dino/idle/idle1.png");
    dinoRunImg = loadAnimation("images/dino/run/run1.png","images/dino/run/run2.png","images/dino/run/run3.png","images/dino/run/run4.png","images/dino/run/run5.png","images/dino/run/run6.png","images/dino/run/run7.png","images/dino/run/run8.png");
    dinoJumpImg = loadAnimation("images/dino/jump/jump2.png","images/dino/jump/jump3.png","images/dino/jump/jump4.png","images/dino/jump/jump5.png","images/dino/jump/jump6.png","images/dino/jump/jump7.png","images/dino/jump/jump8.png","images/dino/jump/jump9.png","images/dino/jump/jump10.png","images/dino/jump/jump11.png","images/dino/jump/jump12.png");
    dinoDeadImg = loadAnimation("images/dino/dead/dead1.png","images/dino/dead/dead2.png","images/dino/dead/dead3.png","images/dino/dead/dead4.png","images/dino/dead/dead5.png","images/dino/dead/dead6.png","images/dino/dead/dead7.png","images/dino/dead/dead8.png");

    groundImg = loadAnimation("images/bg/ground.png");

    obstacleImg = loadAnimation("images/bg/obstacle.png");
    platformImg = loadAnimation("images/bg/platform.png");
    skeletonImg = loadAnimation("images/bg/skeleton.png");
    stoneStaticImg = loadAnimation("images/bg/stone.png");
    stoneDynamicImg = loadAnimation("images/bg/stone.png","images/bg/stone1.png","images/bg/stone2.png","images/bg/stone3.png","images/bg/stone4.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png","images/bg/stone.png");
    fireImg = loadAnimation("images/bg/20.png");

    lifeImg = loadAnimation("images/bg/life.png");

    gameOverImg = loadAnimation("images/gameOver.png");
    playImg = loadAnimation("images/play.png");
    replayImg = loadAnimation("images/replay.jpg");
    instructionsImg = loadAnimation("images/instructions.jpg");
    backImg = loadAnimation("images/back.jpg");

    insTextImg = loadAnimation("images/insText.png");

}

function setup(){

    createCanvas(displayWidth-38,displayHeight-138);
    console.log(width)
    console.log(height)
    dino = createSprite(100,500,20,20);
    dino.addAnimation("dinoRun", dinoRunImg);
    dino.addAnimation("dinoIdle", dinoIdleImg);
    dino.addAnimation("dinoJump", dinoJumpImg);
    dino.addAnimation("dinoDead", dinoDeadImg);
    dino.scale = 0.2;
    dino.debug = true;
    dino.setCollider("rectangle",0,0,420,300);

    ground = createSprite(width/2,590,1200,20);
    ground.addAnimation("ground", groundImg);
    ground.scale = 1;
    ground.debug= true;
    ground.velocityX = -1;
    groundInv = createSprite(width/2,550,1200,20);
    groundInv.visible = false;

    obstacleGroup = new Group();
    platformGroup = new Group();
    platformInvGroup = new Group();
    skeletonGroup = new Group();
    stoneGroup = new Group();
    fireGroup = new Group();

    score = 0;

    life1 = createSprite(50,50,50,50);
    life1.addAnimation("life", lifeImg);
    life1.scale = 0.3;

    life2 = createSprite(100,50,50,50);
    life2.addAnimation("life", lifeImg);
    life2.scale = 0.3;

    life3 = createSprite(150,50,50,50);
    life3.addAnimation("life", lifeImg);
    life3.scale = 0.3;

    play = createSprite(width/2,height/2,50,50);
    play.addAnimation("play", playImg);
    play.scale = 0.5;
    
    
    gameOver = createSprite(650,300,50,50);
    gameOver.addAnimation("gameOver", gameOverImg);

    replay = createSprite(1150,50,50,50);
    replay.addAnimation("replay", replayImg);

    instructions = createSprite(width-50,50,50,50);
    instructions.scale= 0.5
    instructions.addAnimation("instructions", instructionsImg);

    back = createSprite(50,50,50,50);
    back.addAnimation("back", backImg);
    back.scale= 0.5;

    insText = createSprite(width/2,300,30,30);
    insText.addAnimation("insText", insTextImg);
    insText.scale = 0.7
    insText.visible = false;

}

function draw(){

    background(backgroundImg);

    edges = createEdgeSprites();

    if(gameState === "menu"){
        gameOver.visible = false;
        play.visible = true;
        life1.visible = false;
        life2.visible = false;
        life3.visible = false;
        dino.visible = false;
        ground.visible = false;
        replay.visible = false;
        back.visible = false;
        instructions.visible = true;
        insText.visible = false;

        if(mousePressedOver(instructions)){
            gameState = "instructions";
        }

        if (touches.length > 0) {
            if (instructions.overlapPoint(touches[0].x, touches[0].y)) {
                gameState = "instructions";
              touches = []
            }
          }

        if(mousePressedOver(play)){
            gameState = "play";
        }

        if (touches.length > 0) {
            if (play.overlapPoint(touches[0].x, touches[0].y)) {
                gameState = "play";
              touches = []
            }
          }
    } else if(gameState === "instructions"){

        //text("Instructions", 600, 300);
        play.visible = false;
        back.visible = true;
        instructions.visible = false;
        insText.visible = true;

        if(mousePressedOver(back)){
            gameState = "menu";
        }

        if (touches.length > 0) {
            if (back.overlapPoint(touches[0].x, touches[0].y)) {
                gameState = "menu";
              touches = []
            }
          }

    }else if(gameState === "play"){

        play.visible = false;
        dino.visible = true;
        gameOver.visible = false;
        ground.visible = true;
        groundInv.visible = false;
        replay.visible = false;
        instructions.visible = false;
        insText.visible = false;

    spawnObstacles();
    spawnPlatforms();
    spawnStones();
    spawnFire();
  //  boostScore();


    
    if(ground.x < 0){
        ground.x = ground.width/2;
    }

    dino.collide(groundInv);
    dino.collide(edges[0]);
    dino.collide(edges[1]);
    dino.collide(edges[2]);
    dino.collide(edges[3]);
    dino.collide(platformGroup);
    //comment this
  // dino.collide(platformInvGroup);
  
    dino.collide(obstacleGroup);
    dino.collide(skeletonGroup);

    stoneGroup.collide(ground);

    stoneGroup.collide(obstacleGroup);
    stoneGroup.bounceOff(platformGroup);
   stoneGroup.collide(skeletonGroup);

    for(var i = 0; i < stoneGroup.length; i++){
        stoneGroup.get(i).velocityY = 10;
    }

    dino.velocityY = dino.velocityY + 1;

    if(dino.collide(ground)){
        dino.changeAnimation("dinoRun", dinoRunImg);
    }

    if(keyDown("up")){
        dino.velocityY = -10;
        dino.changeAnimation("dinoJump", dinoJumpImg);
    }

    if(keyDown("right")){
        dino.x = dino.x + 10;
    }

    if(keyDown("left")){
        dino.x = dino.x - 10;
    }

    if(fireGroup.collide(obstacleGroup)){
        fireGroup.destroyEach();
    }

    if(fireGroup.collide(stoneGroup)){
        fireGroup.destroyEach();
        stoneGroup.destroyEach();
        score += 5;
    }

    if(skeletonGroup.isTouching(dino)){
        skeleton.destroy();
        score += 10;
    } 

console.log("platform group")
      if( platformInvGroup.isTouching(dino) || platformGroup.isTouching(dino)) {
          console.log("dino is touching platform inv")
        dino.changeAnimation("dinoIdle", dinoIdleImg);
      }

 

    for(var i = 0; i < stoneGroup.length; i++){
        if(stoneGroup.get(i).y > 500){
            stoneGroup.get(i).changeAnimation("stoneDynamic", stoneDynamicImg);
        }
    }

    if(platformGroup.collide(dino)){
        dino.changeAnimation("dinoRun", dinoRunImg);
    }

    textSize(20);
    fill("white");
    text("Score: " + score, 1050, 50);

    if(obstacleGroup.collide(dino)){
        life = life - 1;
        obstacleGroup.destroyEach();
    }

    if(stoneGroup.collide(dino)){
        life = life - 1;
        stoneGroup.destroyEach();
    }

    if(life === 3){
        life1.visible = true;
        life2.visible = true;
        life3.visible = true;
    }

    if(life === 2){
        life1.visible = true;
        life2.visible = true;
        life3.visible = false;
    }

    if(life === 1){
        life1.visible = true;
        life2.visible = false;
        life3.visible = false;
    }

    if(life === 0){
        life1.visible = false;
        life2.visible = false;
        life3.visible = false;
        gameState = "end";
    }

    } else if(gameState === "end"){

        groundInv.velocityX = 0;
        ground.velocityX = 0;
        replay.visible = true;
        instructions.visible = false;
        insText.visible = false;

        dino.changeAnimation("dinoDead", dinoDeadImg);
        dino.animation.looping = false;
        dino.collide(groundInv);
        dino.velocityX = 0;
        dino.velocityY = 10;

        obstacleGroup.destroyEach();
        stoneGroup.destroyEach();
        skeletonGroup.destroyEach();
        platformGroup.destroyEach();
        platformInvGroup.destroyEach();
        fireGroup.destroyEach();

        score = 0;

        gameOver.visible = true;  

        if(mousePressedOver(replay)){
            gameState = "play";
            life = 3;
            score = 0;
            dino.x = 50;
        }

    }


    drawSprites();

}

function spawnObstacles(){

    if(frameCount % 150 === 0){
        obstacle = createSprite(1200,495,20,20);
        obstacle.addAnimation("obstacles", obstacleImg);
        obstacle.scale = 1;
        obstacle.debug = false;
        obstacle.velocityX = -5;
        
        obstacleGroup.add(obstacle);
    }

}

function spawnPlatforms(){

    if(frameCount % 350 === 0){
      //  platformInv = createSprite(1150, random(250, 400), 180, 20);
        platform = createSprite(1150, random(250, 400), 20, 20);
        platformInv = createSprite(platform.x, platform.y-15, 180, 20);
        platform.velocityX = -1;
        platformInv.velocityX = -1;
        platform.debug = true;
        platform.addAnimation("platform", platformImg);
        platformInv.visible = true;
        platform.scale = 0.5;
        platform.depth= platformInv.depth;
        platform.depth= platform.depth+1;

        if(frameCount % 500 === 0){
            skeleton = createSprite(platform.x, platform.y - 40, 20, 20);
            skeleton.addAnimation("skeleton", skeletonImg);
            skeleton.scale = 0.7;
            skeleton.debug = true;
            skeleton.velocityX = -2;

            skeletonGroup.add(skeleton);
        }

        platformGroup.add(platform);
        platformInvGroup.add(platformInv);
    }

}

function spawnStones(){

    if(frameCount % 100 === 0){
        stone = createSprite(random(0,1200), 0, 20, 20);
        stone.addAnimation("stoneStatic", stoneStaticImg);
        stone.addAnimation("stoneDynamic", stoneDynamicImg);
        stone.velocityY = 5;
        stone.scale = 0.25;
        stone.debug = false;
        stone.setCollider("rectangle", 0, 0, 200, 200);
        stone.lifetime = 300;

        stoneGroup.add(stone);        
    }

}

function spawnFire(){

    if(keyWentDown("space")){
        fire = createSprite(dino.x, dino.y, 20, 20);
        fire.addAnimation("fire", fireImg);
        fire.scale = 0.3;
        fire.visible = false;
        fire.lifetime = 150;
        fire.velocityX = 10;
        fire.visible = true;

        fireGroup.add(fire);
    }

}

function boostScore(){

    if(Math.round(score % 50) === 0){
        ground.velocityX = ground.velocityX * 1.01;
        for(var i = 0; i < platformGroup.length; i++){
            platformGroup.get(i).velocityX = platformGroup.get(i).velocityX * 1.01;
        }
        for(var i = 0; i < platformInvGroup.length; i++){
            platformInvGroup.get(i).velocityX = platformInvGroup.get(i).velocityX * 1.01;
        }
        for(var i = 0; i < stoneGroup.length; i++){
            stoneGroup.get(i).velocityY = stoneGroup.get(i).velocityY * 1.01;
        }
        for(var i = 0; i < skeletonGroup.length; i++){
            skeletonGroup.get(i).velocityX = skeletonGroup.get(i).velocityX * 1.01;
        }
        for(var i = 0; i < obstacleGroup.length; i++){
            obstacleGroup.get(i).velocityX = obstacleGroup.get(i).velocityX * 1.01;
        }
    }

}