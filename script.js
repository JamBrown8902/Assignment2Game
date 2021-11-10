"use strict"; //incorporating this 'expression' tells the browser to enable 'strict mode' - this mode helps ensure you write better code, for example, it prevents the use of undeclared variables.

//Saved "Tasks" to text file






const VP_WIDTH = 920, VP_HEIGHT = 690; //defined global const variables to hold the (vp) details (e.g., size, etc.)
var engine, world, body; //defined global variables to hold the game's viewport and the 'matter' engine components
var viewport;

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


	frameRate(1); //specifies the number of (refresh) frames displayed every second

}


function paint_background() {
	//a defined function to 'paint' the default background objects & colours for the world per frame
	background('#a0a1a2'); //use a 'hex' (denoted with '#') RGB colour (red: a0, green: a1, blue: a2 - appears as a grey colour) to set the background
}


function paint_assets() {
	//a defined function to 'paint' assets to the canvas
}


function draw() {
	//a 'p5' defined function that runs automatically and continously (up to your system's hardware/os limit) and based on any specified frame rate
	paint_background();
}
