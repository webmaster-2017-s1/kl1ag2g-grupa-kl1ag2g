// kod projektu [wpisz nazwę]
$(document).ready(function(){
//dostosowanie canvasu

var canvas = $("#canvas")[0];
var ctx = canvas.getContext("2d");
var w = $("#canvas").width();
var h = $("#canvas").height();

//rysowanie canvasu

ctx.fillStyle = "rgb(255, 204, 0)";
ctx.fillRect(0,0,w,h);
ctx.strokeStyle = "black";
ctx.strokeRect(0,0,w,h);

//tworzenie snake'a

var snake_array; //tablica komórek potrzebnych, by zbudować snake'a

function create_snake() {
    var length = 5; //dlugosc snake'a
    snake_array = []; //pusta, poczatkowa tablica

    for(var i = length-1; i>=0; i--) {
        snake_array.push({x: i, y:0}); //stworzenie snake'a na poczatkowej pozycji w lewym gornym rogu
    }
}

//rysowanie snake'a
function rysuj(){

    for(var i = 0; i < snake_array.length; i++){
        var c = snake_array[i];
        ctx.fillStyle = "blue"; //komorki, z ktorych zbudowany jest snake
        ctx.fillRect(c.x*10, c.y*10, 10, 10);
        ctx.strokeStyle = "black";
        ctx.strpleRect(c.x*10, c.y*10, 10, 10);

    }
}

    //;
});
