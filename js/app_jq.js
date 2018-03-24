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
        
		//Restart gry po uderzeniu w ścianę
		//Dodanie restartu przy uderzeniu w ciało snake'a
		//Gra resetuje się, gdy snake uderzy głowem w swoje ciało
		if(nx == -1 || nx == w/cw || ny == -1 || ny == h/cw || check_collision(nx, ny, snake_array))
		{
			//Restart gry
			init();
			
			return;
		}
		
		//Czas na stworzenie jedzenia
		//Jeśli nowa pozycja głowy jest równa pozycji jedzenia,
		//tworzona jest "nowa" głowa zamiast poruszania ogona
		if(nx == food.x && ny == food.y)
		{
			var tail = {x: nx, y: ny};
			score++;
			//Tworzenie jedzenia
			create_food();
		}
		else
		{
			var tail = snake_array.pop(); 
			tail.x = nx; tail.y = ny;
		}
		//Snake może teraz "połykać" jedzenie.