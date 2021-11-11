"use strict"; //incorporating this 'expression' tells the browser to enable 'strict mode' - this mode helps ensure you write better code, for example, it prevents the use of undeclared variables.

//Saved "Tasks" to text file






const VP_WIDTH = 920, VP_HEIGHT = 690; //defined global const variables to hold the (vp) details (e.g., size, etc.)
var engine, world, body; //defined global variables to hold the game's viewport and the 'matter' engine components
var viewport; //Defines the viewport 
var currentPlayer; //Defines variable to store the current player object
var currentPlatforms = []; //Defines Array to store all active platforms in the game
var globalHeight;
var score;

function apply_velocity(body, xVel, yVel) {
	Matter.Body.setVelocity( body, {x: xVel, y: yVel});
};


class Player {
	constructor(posX, posY, width, height) {
		//Creates New Player at specific location
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.deceleration = 0.275;

		let options = {
			restitution: 0,
			friction: 0.8

		}

		this.body = Matter.Bodies.rectangle(this.posX, this.posY + (this.width/2), this.width, 0.1, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias 
		this.checkCollisions();
		this.updateHeight();
		if(keyIsDown(LEFT_ARROW)) {
			pos.x = pos.x - 0.4;
		}
		if(keyIsDown(RIGHT_ARROW)) {
			pos.x = pos.x + 0.4;
		}

		//if(globalHeight > 0) {
		//	apply_velocity(this.body,this.body.velocity.x,this.body.velocity.y);
		//}
		

		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#00ff00'); //set the fill colour
		rect(pos.x, pos.y - (this.width/2), this.width, this.height); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;
	}
	checkCollisions() {

		if(this.body.velocity.y < 0) {
			this.body.collisionFilter = {
				'group': -1,
				'category': 2,
				'mask': 0,
			  };
		} else {
			body.collisionFilter = {
				'group': 0,
				'category': 1,
				'mask': 0,
			  };
			for(let platform = 0; platform < currentPlatforms.length; platform++) {
				if(Matter.Bounds.overlaps(this.body.bounds, currentPlatforms[platform].body.bounds)) {
					if(currentPlatforms[platform].type == "falling") {
						currentPlatforms[platform].isBouncedOn();
					}
					apply_velocity(this.body,0,-12);
				}			
			}
		}

		
		
	}
	updateHeight() {
		
		if(this.body.position.y < (VP_HEIGHT / 2) && globalHeight <= 0 && this.body.velocity.y < 0) {
			globalHeight = this.body.velocity.y * -1;

		} else if(globalHeight > 0) {
			globalHeight = globalHeight - 0.26;
			apply_velocity(this.body,this.body.velocity.x,0);

		}else {
			globalHeight = 0;

		}
	}
	
}

class Platform {
	constructor(posX,posY,width,height) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.type = "normal";

		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#222222'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;
		
	}
	
}

class FallingPlatform {
	constructor(posX,posY,width,height) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.type = "falling";
		this.broken = false;

		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		if(this.broken == true) {
			pos.y = pos.y + 5;
		}
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#ff0000'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;

		
	}
	isBouncedOn() {
		this.broken = true;	
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

function platform_positions(){
	//function to generate new platforms when previous platforms are off screen
	for (let i = 0; i < currentPlatforms.length; i++) {
		if(currentPlatforms[i].posY > VP_HEIGHT){
			currentPlatforms.splice(i,1);
			let lastItem = currentPlatforms[currentPlatforms.length - 1];
			currentPlatforms.push(generatePlatform(lastItem.posY,lastItem.posX));
		}	
	}
}

function generatePlatform(previousHeight,previousWidth,platformWidth = 50,platformHeight = 10) {
	if(previousWidth > VP_WIDTH - 326) {
		previousWidth = VP_WIDTH - 326
	} else if(previousWidth < 326) {
		previousWidth = 326
	}
	let randomX = get_random(previousWidth+300,previousWidth-300);
	let randomY = get_random(previousHeight-200,previousHeight-100);
	let platformRandom = get_random(0,5);
	if(platformRandom == 3 && score > 100) {
		return (new FallingPlatform(randomX,randomY,platformWidth,platformHeight));
	} else {
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


function setup() {
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


function paint_assets() {
	//a defined function to 'paint' assets to the canvas
	currentPlayer.draw();
	for(let platform = 0; platform < currentPlatforms.length; platform++) {
		currentPlatforms[platform].draw();
	}
}


function draw() {
	//a 'p5' defined function that runs automatically and continously (up to your system's hardware/os limit) and based on any specified frame rate
	if(globalHeight > 0) {
		score = score + 1;
	}
	console.log(score);
	Matter.Engine.update(engine);
	paint_background();
	paint_assets();
	platform_positions()
}
