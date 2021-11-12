"use strict"; //incorporating this 'expression' tells the browser to enable 'strict mode' - this mode helps ensure you write better code, for example, it prevents the use of undeclared variables.


//Saved "Tasks" to text file


const VP_WIDTH = 920, VP_HEIGHT = 690; //defined global const variables to hold the (vp) details (e.g., size, etc.)
var engine, world, body; //defined global variables to hold the game's viewport and the 'matter' engine components
var viewport; //Defines the viewport 
var currentPlayer; //Defines variable to store the current player object
var currentPlatforms = []; //Defines Array to store all active platforms in the game
var currentPowerUps = [];
var currentEnemies = [];
var currentDoubleJumps = [];
var globalHeight;
var score;
var gameContinue = true

function apply_velocity(body, xVel, yVel) {
	Matter.Body.setVelocity( body, {x: xVel, y: yVel});
};

function platform_positions(){
	//function to generate new platforms when previous platforms are off screen
	for (let i = 0; i < currentPlatforms.length; i++) {
		if(currentPlatforms[i].posY > VP_HEIGHT + 100){
			currentPlatforms.splice(i,1);
			let lastItem = currentPlatforms[currentPlatforms.length - 1];
			currentPlatforms.push(generatePlatform(lastItem.posY,lastItem.posX));
		}	
	}
}

// function generateBlackHole (){
// 	let posX = get_random(0,VP_WIDTH)
// 	let posY = -50
// 	let diameter = get_random(10,30)
// 	return(new BlackHole(posX,posY,diameter));
// }


function generatePlatform(previousHeight,previousWidth,platformWidth = 50,platformHeight = 10) {
	if(previousWidth > VP_WIDTH - 326) {
		previousWidth = VP_WIDTH - 326
	} else if(previousWidth < 326) {
		previousWidth = 326
	}
	let randomX = get_random(previousWidth+300,previousWidth-300);
	let randomY = get_random(previousHeight-140,previousHeight-100);
	let platformRandom = get_random(0,10);
	switch(platformRandom) {
		case 1: case 2:
			if(score > 100) {
				if(randomX > VP_WIDTH / 2) {
					return (new SlidingPlatform(randomX - 50,randomY,platformWidth,platformHeight));
				} else {
					return (new SlidingPlatform(randomX + 50,randomY,platformWidth,platformHeight));
				}
			} else {
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}
		case 3: case 4:
			if(score > 200) {
				return (new FallingPlatform(randomX,randomY,platformWidth,platformHeight));
			} else {
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}
		case 5:
			let newPlatform = new Platform(randomX,randomY,platformWidth,platformHeight)
			currentPowerUps.push(new Boost(randomX,randomY-7,newPlatform));
			return (newPlatform);
		case 6:
			if(randomX < (VP_WIDTH/2) - 50 || random > (VP_WIDTH/2) + 50) {
				currentPlatforms.push(new Platform(VP_WIDTH - randomX,randomY + 10,platformWidth,platformHeight))
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			} else {
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}
		case 7:
			if((randomX < (VP_WIDTH/2) - 50 || randomX > (VP_WIDTH/2) + 50) && score > 300) {
				currentEnemies.push(new TurretEnemy(VP_WIDTH - randomX,randomY + 10))
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			} else {
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}
		case 8:
			if((randomX < (VP_WIDTH/2) - 50 || randomX > (VP_WIDTH/2) + 50) && score > 300) {
				currentEnemies.push(new BlackHole(VP_WIDTH - randomX,randomY + 10))
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			} else {
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}
		
		case 9:
		if((randomX < (VP_WIDTH/2) - 50 || randomX > (VP_WIDTH/2) + 50) && score > 50) {
			currentDoubleJumps.push(new DoubleJump(VP_WIDTH - randomX,randomY + 10))
			return (new Platform(randomX,randomY,platformWidth,platformHeight));
		} else {
			return (new Platform(randomX,randomY,platformWidth,platformHeight));
		}

		default:
			return (new Platform(randomX,randomY,platformWidth,platformHeight));
	}
}

function apply_angularvelocity() {
};


function apply_force() {
};


function get_random(min, max) {
	//returns a random value between the specified parameters
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); 
}


function preload() {
	//a 'p5' defined function runs automatically and used to handle asynchronous loading of external files in a blocking way; once complete
	//the 'setup' function is called (automatically)
}

function endGame(){
	globalHeight = VP_HEIGHT+100
	background('#a0a1a2')
	fill(255,255,255)
			textStyle(BOLD);
			textSize(120);
			textAlign(CENTER, CENTER);
			text("YOU LOSE", VP_WIDTH/2,VP_HEIGHT/2)
			textStyle(NORMAL);
			textSize(20);
			text("Press [SPACE] to restart", VP_WIDTH/2,VP_HEIGHT/2+80)
			gameContinue = false;		
}

function setup() {
	currentPlatforms = []; 
	currentPowerUps = [];
	currentEnemies = [];
	currentDoubleJumps = [];
	//a 'p5' defined function runs automatically once the preload function is complete
	viewport = createCanvas(VP_WIDTH, VP_HEIGHT); //set the viewport (canvas) size
	viewport.parent("viewport_container"); //attach the created canvas to the target div
	globalHeight = 0;
	score = 0;

	//enable the matter engine
	engine = Matter.Engine.create(); //the 'engine' is a controller that manages updating the 'simulation' of the world
	world = engine.world; //the instance of the world (contains all bodies, constraints, etc) to be simulated by the engine
	body = Matter.Body; //the module that contains all 'matter' methods for creating and manipulating 'body' models a 'matter' body 
	//is a 'rigid' body that can be simulated by the Matter.Engine; generally defined as rectangles, circles and other polygons)

	engine.positionIterations = 10;
	engine.velocityIterations = 10;

	currentPlayer = new Player(VP_WIDTH/2,VP_HEIGHT-100,30,50);
	currentPlatforms.push(new Platform(VP_WIDTH/2,VP_HEIGHT,VP_WIDTH,40)); //Main Floor Platform

	currentPlatforms.push(generatePlatform(VP_HEIGHT,VP_WIDTH/2));

	for (let i = 1; i<6; i++){
		currentPlatforms.push(generatePlatform(currentPlatforms[i].posY,currentPlatforms[i].posX));
	}
	frameRate(60); //specifies the number of (refresh) frames displayed every second

}


function paint_background() {
	//a defined function to 'paint' the default background objects & colours for the world per frame
	background('#a0a1a2'); //use a 'hex' (denoted with '#') RGB colour (red: a0, green: a1, blue: a2 - appears as a grey colour) to set the background
}

function drawAllInList(objList) {
	for(let x = 0; x < objList.length; x++) {
		objList[x].draw();
		if(objList != currentPlatforms) {
			if(objList[x].posY > VP_HEIGHT + 50) {
				objList.splice(x,1);
			}
		}
	}
}

function paint_assets() {
	//a defined function to 'paint' assets to the canvas
	currentPlayer.draw();
	drawAllInList(currentPlatforms);
	drawAllInList(currentPowerUps);
	drawAllInList(currentEnemies);
	drawAllInList(currentDoubleJumps);
}

function keyPressed(){
	if (keyCode === 82) {
		setup();
	}
}

function draw() {
	if ((!gameContinue) && keyIsDown(32)){
		setup();
		gameContinue = true
	}
	if (gameContinue){
		//a 'p5' defined function that runs automatically and continously (up to your system's hardware/os limit) and based on any specified frame rate
		if(globalHeight > 0) {
			score = score + 1;
		}
		//console.log(score);
		Matter.Engine.update(engine);
		
		paint_background();
		paint_assets();
		platform_positions();
		fill(255,255,255);
		textAlign(CENTER);
		textSize(50);
		text("Score: " + int(score), VP_WIDTH/2, 40,);
	}
}



//SET GLOBAL HEIGHT VARIABLE TO CLEAR SCREEN MAKE ALL PLATFORMS FALL