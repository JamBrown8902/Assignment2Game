//Defines Sliding Platform class
//Sliding platforms are blue platforms that move from left to right, making it more difficult to jump to
class SlidingPlatform {
	constructor(posX,posY,width,height) {
		//Created using positional parameters (posX, posY) and size parameters (width, height)

		//Defines options to be used when creating Matter body (not affected by gravity)
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}

		//Creates new attributes using parameters
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.originalX = posX; //Position for platform to move around

		//Creates new attributes using default values
		this.type = "sliding"; //Type of platform
		this.movementRange = get_random(50,100); //Random length of movement
		this.movementSpeed = get_random(1,2); //How quickly the platform moves
		this.moveLeft = false; //If the platform is moving left

		//Creates Matter body to handle collisions
		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		//Draw method updates position and shows the object

		let pos = this.body.position; //Create an shortcut alias

		if(this.moveLeft == false) { //If object is moving right..
			pos.x = pos.x + this.movementSpeed; //Move platform to the right using movement speed
			if(pos.x >= this.originalX + this.movementRange) { //If platform has reached maximum range...
				this.moveLeft = true; //Change direction
			}
		} else { //If platform is moving left...
			pos.x = pos.x - this.movementSpeed; //Move platform to the left using movement speed
			if(pos.x <= this.originalX - this.movementRange) { //If platform has reached maximum range...
				this.moveLeft = false; //Change direction
			}
		}

		let newPos; //Defines local variable to store new vector

		pos.y = pos.y + globalHeight; //Updates height to imitate scrolling

		if(this.moveLeft == true) { //Checks what direction platform is moving to create correct vector
			newPos = Matter.Vector.create(this.movementSpeed,globalHeight); //Updates newPos Vector
		} else {
			newPos = Matter.Vector.create(-this.movementSpeed,globalHeight); //Updates newPos Vector
		}
		
		//Moves bounds to new position to ensure collisions remain accurate
		Matter.Bounds.translate(this.body.bounds, newPos);

		//Draws rectangle
		rectMode(CENTER); //Switch centre to be centre rather than left, top
		fill('#0000ff'); //Set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //Draw the rectangle

		//Updates positional attributes
		this.posX = pos.x;
		this.posY = pos.y;
	}
}
