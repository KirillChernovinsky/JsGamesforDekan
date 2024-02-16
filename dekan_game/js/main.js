const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Выбор карты, монстров и припятствия
// let choiceMap = prompt("выберите карту:")
// let choiceMonsters = prompt("выберите монстров:")
// let choiceObstacles = prompt("выберите припятствия:")


const ground = new Image();
// ground.src = `img/${choiceMap}.jpg`;
ground.src = "img/map4.jpg";

const foodImg = new Image();
foodImg.src = "img/food.png";


const monsterImg = new Image();
monsterImg.src = "img/monster.png";




let box = 32;

let score = 0;
let health = 5

let food = {
	x: Math.floor((Math.random() * 40)) * box,
	y: Math.floor((Math.random() * 20)) * box,
};


let monsters = [];
function generateMonster() {
	let newMonster = {
	  x: Math.floor((Math.random() * 40)) * box,
	  y: Math.floor((Math.random() * 20)) * box,
	};
	monsters.push(newMonster);
  }



let snake = [];
snake[0] = {
	x: 0,
	y: 0
};

let winplace = {
	x: 10,
	y: 10
}

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
	if(event.keyCode == 37 && dir != "right")
		dir = "left";
	else if(event.keyCode == 38 && dir != "down")
		dir = "up";
	else if(event.keyCode == 39 && dir != "left")
		dir = "right";
	else if(event.keyCode == 40 && dir != "up")
		dir = "down";
}

function eatTail(head, arr) {
	for(let i = 0; i < arr.length; i++) {
		if(head.x == arr[i].x && head.y == arr[i].y)
			clearInterval(game);
	}
}

function moveMonsters() {
	for(let i = 0; i < monsters.length; i++) {
	  let randomDirection = Math.floor(Math.random() * 4); // Генерация случайного числа для определения направления
  
	  if(randomDirection === 0 && monsters[i].x > 0) {
		monsters[i].x -= box; // Движение влево
	  } else if(randomDirection === 1 && monsters[i].x < 40 * box) {
		monsters[i].x += box; // Движение вправо
	  } else if(randomDirection === 2 && monsters[i].y > 0) {
		monsters[i].y -= box; // Движение вверх
	  } else if(randomDirection === 3 && monsters[i].y < 20 * box) {
		monsters[i].y += box; // Движение вниз
	  }
	}
  }

moveMonsters()
setInterval(moveMonsters, 1000);

generateMonster();
setInterval(generateMonster, 300);

function drawGame() {
	ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистка холста перед перерисовкой

	ctx.drawImage(ground, 0, 0);
	ctx.drawImage(foodImg, food.x, food.y);
  
	for(let i = 0; i < monsters.length; i++) {
	  ctx.drawImage(monsterImg, monsters[i].x, monsters[i].y);
	}
  


	  

	for(let i = 0; i < snake.length; i++) {
		ctx.fillStyle = i == 0 ? "green" : "red";
		ctx.fillRect(snake[i].x, snake[i].y, box, box);
	}

	ctx.fillStyle = "white";
	ctx.font = "50px Arial";
	ctx.fillText(score, box * 2.5, box * 1.7);
	ctx.fillText("Health: " + health, box * 2.5, box * 3.5);

	let snakeX = snake[0].x;
	let snakeY = snake[0].y;


	for (let i = 0; i < monsters.length; i++) {
		if (snakeX == monsters[i].x && snakeY == monsters[i].y) {
			health--;
			monsters.splice(i, 1); //удаление монстра после столкновения
		}
	}
	
	if(health === 0){
		alert('game over')
	}  

	if(score === 5){
		alert("Вы победили!!!")
	}

	if(snakeX == food.x && snakeY == food.y) {
		score++;
		food = {
			x: Math.floor((Math.random() * 40)) * box,
			y: Math.floor((Math.random() * 20)) * box,
		};
	} else
		snake.pop();

		
		if(snakeX == winplace.x && snakeY == winplace.y){
			alert("Ураа")
		} else {
			if(dir == "left") snakeX -= box;
            if(dir == "right") snakeX += box;
            if(dir == "up") snakeY -= box;
            if(dir == "down") snakeY += box;
        
            let newHead = {
                x: snakeX,
                y: snakeY
            };
        
            eatTail(newHead, snake);
        
            snake.unshift(newHead);
        }

		}



let game = setInterval(drawGame, 100);