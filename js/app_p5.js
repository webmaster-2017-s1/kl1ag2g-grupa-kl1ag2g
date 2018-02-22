// kod projektu snake
var s;
var scl = 20;


function setup() {
  createCanvas(600, 600);
  s = new Snake();
}

function draw() {
  background(255, 204, 0);
  s.update();
  s.show();
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
