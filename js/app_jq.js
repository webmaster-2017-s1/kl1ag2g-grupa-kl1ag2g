// kod projektu [wpisz nazwę]
$(document).ready(function(){

  var field = $("#field");
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();


	var cw = 15;
	var d;
	var food;
	var score = 0;

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
		ctx.fillStyle = "rgb(50, 50, 50)";
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

        	snake_array.unshift(tail);

		for(var i = 0; i < snake_array.length; i++)
		{
			var c = snake_array[i];

			paint_cell(c.x, c.y);
		}

		//rysowanie jedzenia
		paint_cell_f(food.x, food.y);
		//rysowanie wyniku
		var score_text = "Score: " + score;
		ctx.fillText(score_text, 5, h-5);
	}
    
    

	//rysowanie komórek, z których składa się snake
	function paint_cell(x, y)
	{
		ctx.fillStyle = "rgb(238, 232, 225)";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

    	function paint_cell_f(x, y)
	{
		ctx.fillStyle = "red";
		ctx.fillRect(x*cw, y*cw, cw, cw);
		ctx.strokeStyle = "black";
		ctx.strokeRect(x*cw, y*cw, cw, cw);
	}

	function check_collision(x, y, array)
	{

		//ta fumkcja sprawdza czy podane koordynaty x i y istnieją w tablicy
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}

	//sterowanie
	$(document).keydown(function(e){
		var key = e.which;

		if(key == "65" && d != "right") d = "left";
		else if(key == "87" && d != "down") d = "up";
		else if(key == "68" && d != "left") d = "right";
		else if(key == "83" && d != "up") d = "down";

	})

})
