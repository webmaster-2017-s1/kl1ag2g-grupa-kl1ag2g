// kod projektu snake
var s;
var scl = 20;
var fr = 20; // startowe FPS
var food;


function setup() {

  var cnv = createCanvas(600, 600);
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
  s = new Snake();
  frameRate(fr);                            // prędkość węża
  pickLocation();
  console.log('sterowanie W, A, S, D; punkty wyświetlają się w konsoli');

}

function pickLocation() {
  var cols = floor(width/scl);
  var rows = floor(height/scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(255, 204, 0); //tło

  if (s.eat(food)) {      //funkcja powodująca pojawienie się nowego jedzenia po zjedzeniu
    pickLocation();
  }
  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);         // pojawianie się jedzenia
}



function keyPressed() {                   //reagowanie na wciśnięty klawisz
   if (keyCode === 87) {
     s.dir(0, -1);
   } else if (keyCode === 83) {
     s.dir(0, 1);
   } else if (keyCode === 68) {
     s.dir(1, 0);
   } else if (keyCode === 65) {
     s.dir(-1, 0);
  }  else if (keyCode === 82) {
  frameRate(15);
}else if (keyCode === 219) { // nacisnieto klawisz [
    if (fr >= 2) {fr = fr-1}; // min fps 1
    textSize(30);
    text("FPS:"+fr, 1, 30);
    frameRate(fr);
  } else if (keyCode === 221) { // nacisnieto klawisz ]
    if (fr <= 29) {fr = fr+1}; // max fps 30
    textSize(30);
    text("FPS:"+fr, 1, 30);
    frameRate(fr);
   }
 }
