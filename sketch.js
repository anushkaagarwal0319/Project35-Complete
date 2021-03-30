var balloon;
var database, position;

function preload(){
  bg = loadImage("cityImage.png");
  balloonImg = loadImage("hotairballoon1.png")
}

function setup() {
  createCanvas(1500,800);
  balloon = createSprite(200, 560, 10, 10);
  balloon.addImage(balloonImg);

  database = firebase.database();
  balloonPosition = database.ref('balloon/height');
  balloonPosition.on("value", readHeight, showError);

}

function draw() {
  background(bg);  
  drawSprites();

  textSize(30);
  fill("black");
  stroke(4);
  textFont("Georgia");
  text("USE ARROW KEYS TO MOVE THE HOT AIR BALLOON!", 50, 50);

  balloon.display();

  //write code to move balloon
  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(10,0);
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addImage(balloonImg)
  balloon.scale = balloon.scale - 0.015;
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,10);
  balloon.addImage(balloonImg)
  balloon.scale = balloon.scale + 0.015;
}

}

//write functions
function updateHeight(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}