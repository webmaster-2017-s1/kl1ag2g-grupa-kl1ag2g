// kod projektu [wpisz nazwę]
$(document).ready(function(){
	
  var field = $("#field");
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
  
  
	//Lets save the cell width in a variable for easy control
	var cw = 10;
	var d;
	var food;
	var score;
	
	//tworzenie snake'a
	var snake_array; //tablica tworząca snake'a
	
	function init()
	{
		d = "right"; //domyślny kierunek
		create_snake();
		create_food(); 
		
		
		//ruszanie snake'a za pomocą timera
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, 60);
	}
	init();
	
	function create_snake()
	{
		var length = 5; //dlugosc snake'a
		snake_array = []; //pusta poczatkowa tablica
		for(var i = length-1; i>=0; i--)
		{
			//tworzenie snake'a w lewym gornym rogu
			snake_array.push({x: i, y:0});
		}
	}
	
    //stworzenie jedzenia
	function create_food()
	{
		food = {
			x: Math.round(Math.random()*(w-cw)/cw), 
			y: Math.round(Math.random()*(h-cw)/cw), 
		};
		
	}
	
	//rysowanie snake'a
	function paint()
	{
		//rysowanie tla w kazdej klatce
		//rysowanie canvasu
		ctx.fillStyle = "rgb(255, 204, 0)";
		ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
		
		
		var nx = snake_array[0].x;
		var ny = snake_array[0].y;
		//Pozycja "głowy"

        
		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;