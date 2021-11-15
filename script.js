"use strict"; //incorporating this 'expression' tells the browser to enable 'strict mode' - this mode helps ensure you write better code, for example, it prevents the use of undeclared variables.


//Saved "Tasks" to text file


const VP_WIDTH = 920, VP_HEIGHT = 690; //defined global const variables to hold the (vp) details (e.g., size, etc.)

var engine, world, body, //Defines global variables 
	viewport, //Defines the viewport 
	currentPlayer, //Defines variable to store the current player object
	currentPlatforms = [], //Defines Array to store all active platforms in the game
	currentPowerUps = [], //Defines Array to store all active power ups in the game
	currentEnemies = [], //Defines Array to store all active enemies in the game
	globalHeight, //Defines global height variable used for scrolling
	score, // Defines Score variable to display player's progress
	gameContinue = true; //Defines variable used for ending and resetting the game

//Function that applies a velocity to a matter object	
function apply_velocity(body, xVel, yVel) {
	Matter.Body.setVelocity( body, {x: xVel, y: yVel});
};

//Function to generate new platforms when previous platforms are off screen
function platform_positions(){

	//For loop checks every item in the currentPlatforms (checks every platform object)
	for (let i = 0; i < currentPlatforms.length; i++) {
		if(currentPlatforms[i].posY > VP_HEIGHT + 100) { //Checks if platform has fall off screen
			currentPlatforms.splice(i,1); //Splices platform, removing the object
			let lastItem = currentPlatforms[currentPlatforms.length - 1]; //Defines temporary local variable containing most recent platform 
			currentPlatforms.push(generatePlatform(lastItem.posY,lastItem.posX)); //Calls generatePlatform and passes most recent platform's position
		}	
	}
}

//Function to generate a new platform within jumping range of previous platform, and also adding powerups/enemies
function generatePlatform(previousHeight,previousWidth,platformWidth = 50,platformHeight = 10) {

	//Makes sure new platform is always on screen by checking previous location is within the x-axis boundaries
	if(previousWidth > VP_WIDTH - 326) {
		previousWidth = VP_WIDTH - 326
	} else if(previousWidth < 326) {
		previousWidth = 326
	}

	//Defines random variables to be used as the new platforms position and platform type (e.g. if it's normal or falling)
	let randomX = get_random(previousWidth+300,previousWidth-300),
		randomY = get_random(previousHeight-140,previousHeight-100),
		platformRandom = get_random(0,12);

	//Switch case to select what type of platform is being generated based on result of platformRandom
	switch(platformRandom) {

		//If random number is 1 or 2, try to generate Sliding platform
		case 1: case 2:
			if(score > 100) { //Checks that score is high enough to spawn more difficult platforms
				if(randomX > VP_WIDTH / 2) { //Checks which side of screen platform is on
					return (new SlidingPlatform(randomX - 50,randomY,platformWidth,platformHeight)); //Moves platform closer to the middle to ensure it doesnt slide off screen, then returns an instance of the SlidingPlatform class
				} else {
					return (new SlidingPlatform(randomX + 50,randomY,platformWidth,platformHeight)); //Moves platform closer to the middle to ensure it doesnt slide off screen, then returns an instance of the SlidingPlatform class
				}
			} else { //If score is not high enough, just generate a normal platform
				return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns instance of Platform class
			}

		//If random number is 3 or 4, try to generate a Falling platform
		case 3: case 4:
			if(score > 200) { //Checks that score is high enough to spawn more difficult platforms 
				return (new FallingPlatform(randomX,randomY,platformWidth,platformHeight)); //Returns an instance of the FallingPlatform class
			} else { //If score is not high enough, just generate a normal platform
				return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns instance of Platform class
			}

		//If random number is 5, try to generate a platform with a boost
		case 5:
			let newPlatform = new Platform(randomX,randomY,platformWidth,platformHeight) //Creates new instance of Platform class and stores in temporary variable
			currentPowerUps.push(new Boost(randomX,randomY-7,newPlatform)); //Uses new Platform to create a new instance of the Boost class, and passes the platform as a parameter to link their positions
			return (newPlatform); //Returns new platform instance, which has been linked with a boost
		
		//If random number is 6, try to generate an extra platform on the other side of the screen (to add extra jumping oppertunity)
		case 6:
			if(randomX < (VP_WIDTH/2) - 50 || random > (VP_WIDTH/2) + 50) { //Checks if platform isn't in the middle of the screen
				currentPlatforms.push(new Platform(VP_WIDTH - randomX,randomY + 10,platformWidth,platformHeight)) //Creates new instance of the Platform on the opposite side of the screen, with a slight height difference
				return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns another instance of the Platform class, therefore generating two platforms
			} else { //If platform position in the middle of the screen, just generate one instance of Platform
				return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns new instance of Platform
			}

		//If random number is 7, tries to generate a platform as well as a new enemy
		case 7:
			if((randomX < (VP_WIDTH/2) - 50 || randomX > (VP_WIDTH/2) + 50) && score > 300) { //If platform position isn't in the middle of the screen AND the score is high enough (>300), generate platform with enemy
				currentEnemies.push(new TurretEnemy(VP_WIDTH - randomX,randomY + 10)) //Pushes new instance of the TurretEnemy class on the opposite side of the screen
				return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns a new instance of the Platform class
			} else { //If platform is in the middle OR the score is not high enough, just return a regular platform
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}

		//If random number is 8, tries to generate a new black hole	
		case 8:
			if((randomX < (VP_WIDTH/2) - 75 || randomX > (VP_WIDTH/2) +75) && score > 300) { //Checks that platform is not in the middle and the score is high enough
				currentEnemies.push(new BlackHole(VP_WIDTH - randomX,randomY + 10)); //Pushes new instance of the BlackHole Class to the currenEnemies Array
				return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns a regular platform to be generated on the opposite side of the screen
			} else { //If platform is in the middle of score is not hight enough, just return a regular platform
				return (new Platform(randomX,randomY,platformWidth,platformHeight));
			}
		
		//If random number is 9, tries to generate a double jump to be picked up
		case 9:
		if((randomX < (VP_WIDTH/2) - 50 || randomX > (VP_WIDTH/2) + 50) && score > 50) { //Checks that platform is not in the middle and that the score is high enough
			currentPowerUps.push(new DoubleJump(VP_WIDTH - randomX,randomY + 10)) //Pushes a new instance of the DoubleJump class to the currentPowerUps list, spawning on the opposite side of the screen 
			return (new Platform(randomX,randomY,platformWidth,platformHeight)); //Returns a regular platform
		} else { //If platform is in the middle or score is too low, just return a regular platform
			return (new Platform(randomX,randomY,platformWidth,platformHeight));
		}

		//If random number is any other number, just return a new instance of the Platform class
		default:
			return (new Platform(randomX,randomY,platformWidth,platformHeight));
	}
}

function get_random(min, max) {
	//Returns a random value between the specified parameters
	//Rounds parameter up/down to an integer
	min = Math.ceil(min); 
	max = Math.floor(max);

	//Returns a random integer between the min and max integers
	return Math.floor(Math.random() * (max - min) + min); 
}


function preload() {
	//a 'p5' defined function runs automatically and used to handle asynchronous loading of external files in a blocking way; once complete
	//the 'setup' function is called (automatically)
}

function endGame(){
	//Function that runs when the game ends
	//Clears Arrays containing the game objects to clear the screen
	currentPlatforms = []; 
	currentPowerUps = [];
	currentEnemies = [];

	//Defines options used for drawing text
	background('#a0a1a2')
	fill(255,255,255)
	textStyle(BOLD);
	textSize(120);
	textAlign(CENTER, CENTER);
	text("YOU LOSE", VP_WIDTH/2,VP_HEIGHT/2) //Draws text to the page
	textStyle(NORMAL);
	textSize(20);
	text("Press [SPACE] to restart", VP_WIDTH/2,VP_HEIGHT/2+80) //Draws text to the page
	gameContinue = false; //Sets global variable gameContinue to false, affects draw function
}


function setup() {
	//a 'p5' defined function runs automatically once the preload function is complete
	//Ensures arrays containing game objects are clear
	currentPlatforms = []; 
	currentPowerUps = [];
	currentEnemies = [];

	viewport = createCanvas(VP_WIDTH, VP_HEIGHT); //set the viewport (canvas) size
	viewport.parent("viewport_container"); //attach the created canvas to the target div

	globalHeight = 0; //Sets globalHeight and score to 0 
	score = 0;

	//enable the matter engine
	engine = Matter.Engine.create(); //the 'engine' is a controller that manages updating the 'simulation' of the world
	world = engine.world; //the instance of the world (contains all bodies, constraints, etc) to be simulated by the engine
	body = Matter.Body; //the module that contains all 'matter' methods for creating and manipulating 'body' models a 'matter' body 
	//is a 'rigid' body that can be simulated by the Matter.Engine; generally defined as rectangles, circles and other polygons)


	currentPlayer = new Player(VP_WIDTH/2,VP_HEIGHT-100,30,50); //Creates new Player object
	currentPlatforms.push(new Platform(VP_WIDTH/2,VP_HEIGHT,VP_WIDTH,40)); //Creates the initial main Floor Platform

	currentPlatforms.push(generatePlatform(VP_HEIGHT,VP_WIDTH/2)); //Creates initial platform, always generating somewhere in the middle

	//Creates first group of platforms so player has initial platforms to jump to 
	for (let i = 1; i<10; i++){
		currentPlatforms.push(generatePlatform(currentPlatforms[i].posY,currentPlatforms[i].posX)); //Pushes new platform returned from generatePlatform, passing the previous platform's position
	}
	frameRate(60); //specifies the number of (refresh) frames displayed every second

}


function paint_background() {
	//a defined function to 'paint' the default background objects & colours for the world per frame
	background('#a0a1a2'); //use a 'hex' (denoted with '#') RGB colour (red: a0, green: a1, blue: a2 - appears as a grey colour) to set the background
}


function drawAllInList(objList) {
	//Function to draw all items in an object array
	//Loops through entire list of objects
	for(let x = 0; x < objList.length; x++) {
		objList[x].draw(); //Runs the draw method of each object
		if(objList != currentPlatforms) { //If Array being drawn isn't currentPlatforms (as it is handled differently), delete objects that are below screen
			if(objList[x].posY > VP_HEIGHT + 50) { //Checks if object is below screen
				objList.splice(x,1); //Splices object from the Array
			}
		}
	}
}

function paint_assets() {
	//a defined function to 'paint' assets to the canvas
	currentPlayer.draw(); //Draws the current player
	drawAllInList(currentPlatforms); //Draws the current platforms 
	drawAllInList(currentPowerUps); //Draws the current power ups
	drawAllInList(currentEnemies); //Draws the current enemies
}

function keyPressed(){
	if (keyCode === 82 && gameContinue) {
		setup();
	}
}

function draw() {
	//a 'p5' defined function that runs automatically and continously (up to your system's hardware/os limit) and based on any specified frame rate
	if ((!gameContinue) && keyIsDown(32)){ //If the game has ended and the space bar is pressed, restart the game (prompted by text to do so)
		setup(); //Runs setup function, restarting the game
		gameContinue = true; //Sets global variable gameContinue to true
	}
	if (gameContinue){ //If the game hasn't ended...
		if(globalHeight > 0) { //If globalHeight is more than zero, therefore the player is making the game scroll upwards, increase score
			score = score + 1;
		}

		Matter.Engine.update(engine); //Updates Matter engine objects
		
		paint_background(); //Paints the background
		paint_assets(); //Paints all assets
		platform_positions(); //Checks platform positions and generates new platforms if needed 

		//Draws score counter to the screen
		fill(255,255,255);
		textAlign(CENTER);
		textSize(50);
		text("Score: " + int(score), VP_WIDTH/2, 40,);
	}
}