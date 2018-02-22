// kod projektu snake
var s;
var scl = 20;

var jedzenie;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);                             //spowalnianie wężą
  jedzenie = createVector(random(width), random(height));
}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  jedzenie = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}


function draw() {
  background(255, 204, 0);
  s.update();
  s.show();

  fill(255, 0, 100);
  rect(jedzenie.x, jedzenie.y, scl, scl);  //pojawianie się jedzenia
}

function keyPressed() {                       //regowanie na wciśnięty kalwisz
  if (keyCode === UP_ARROW) {
    s.dir (0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir (0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir (1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir (-1, 0);
  }
}
