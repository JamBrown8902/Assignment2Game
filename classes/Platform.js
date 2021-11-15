//Defines Platform class
//The platform object is the basic platform for the player to jump to and from. It has no special properties and makes up most of the game
class Platform {
	constructor(posX,posY,width,height) {
		//Created using positional parameters (posX, posY) and size parameters (width, height)

		//Defines options to be used when creating the Matter body (not affected by gravity)
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		
		//Creates attributes using parameters
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;

		//Sets type attribute to be normal
		this.type = "normal";

		//Creates a Matter body for the platform to handle collisions
		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		//Draw method to show and update the object
		let pos = this.body.position; //Create an shortcut alias

		pos.y = pos.y + globalHeight; //Updates object position to imitate scrolling

		let newPos = Matter.Vector.create(0,globalHeight); //Creates vector to represent the objects new position
		Matter.Bounds.translate(this.body.bounds, newPos); //Uses vector to update position of object bounds to make sure collisions remain accurate
		
		//Draws rectangle to represent object
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#222222'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		//Updates positional attributes of the class
		this.posX = pos.x;
		this.posY = pos.y;
		
	}
	
}