"use strict"; //incorporating this 'expression' tells the browser to enable 'strict mode' - this mode helps ensure you write better code, for example, it prevents the use of undeclared variables.

//Saved "Tasks" to text file






const VP_WIDTH = 920, VP_HEIGHT = 690; //defined global const variables to hold the (vp) details (e.g., size, etc.)
var engine, world, body; //defined global variables to hold the game's viewport and the 'matter' engine components
var viewport;
var currentPlayer;
var currentPlatforms = [];

class Player {
	constructor(posX, posY) {
		this.posX = posX;
		this.posY = posY;
	}
	draw() {
		draw_rect(60,100,this.posX,this.posY,0,255,0,CENTER);
	}
	
}

class Platform {
	constructor(posX,posY) {
		this.posX = posX;
		this.posY = posY;
	}
	draw() {
		draw_rect(100,20,this.posX,this.posY,50,50,50,CENTER);
	}
}


function draw_rect(sizeX,sizeY,posX,posY,r,g,b,drawMode) {
	//Function will draw a rectangle on the screen with the inputted colour and sized at a specific location
	//Determines rectMode (whether shape is drawn from corner or center etc.)
	rectMode(drawMode); 
	//Gives Rectangle an outline
	stroke(0, 0, 0); 
	strokeWeight(1); 
	
	//Colours Rectangle with specific rgb colour
	fill(r, g, b); 

	//Draws shape with specific size at set location
	rect(posX, posY, sizeX, sizeY); 
}

function apply_velocity() {
};


function apply_angularvelocity() {
};


function apply_force() {
};


function get_random(min, max) {
}


function preload() {
	//a 'p5' defined function runs automatically and used to handle asynchronous loading of external files in a blocking way; once complete
	//the 'setup' function is called (automatically)
}


function setup() {
	//a 'p5' defined function runs automatically once the preload function is complete
	viewport = createCanvas(VP_WIDTH, VP_HEIGHT); //set the viewport (canvas) size
	viewport.parent("viewport_container"); //attach the created canvas to the target div
	
	//enable the matter engine
	engine = Matter.Engine.create(); //the 'engine' is a controller that manages updating the 'simulation' of the world
	world = engine.world; //the instance of the world (contains all bodies, constraints, etc) to be simulated by the engine
	body = Matter.Body; //the module that contains all 'matter' methods for creating and manipulating 'body' models a 'matter' body 
	//is a 'rigid' body that can be simulated by the Matter.Engine; generally defined as rectangles, circles and other polygons)

	currentPlayer = new Player(VP_WIDTH/2,VP_HEIGHT/1.5);
	currentPlatforms.push(new Platform(255,255));

	frameRate(10); //specifies the number of (refresh) frames displayed every second

}


function paint_background() {
	//a defined function to 'paint' the default background objects & colours for the world per frame
	background('#a0a1a2'); //use a 'hex' (denoted with '#') RGB colour (red: a0, green: a1, blue: a2 - appears as a grey colour) to set the background
}


function paint_assets() {
	//a defined function to 'paint' assets to the canvas
	currentPlayer.draw();
	for(let platform = 0; platform < currentPlatforms.length; platform++) {
		currentPlatforms[platform].draw();
	}
}


function draw() {
	//a 'p5' defined function that runs automatically and continously (up to your system's hardware/os limit) and based on any specified frame rate
	paint_background();
	paint_assets();
	

}
