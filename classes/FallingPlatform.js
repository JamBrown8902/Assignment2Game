//Defines FallingPlatform class
//A falling platform is a red coloured platform that falls once the player bounces on it
//It is designed to increase the difficulty for the player by removing a potential platform from the game
class FallingPlatform {
	constructor(posX,posY,width,height) {
		//Created using positional parameters (posX, posY) and size parameters (width, height)

		//Defines options for use when creating the Matter body (not affected by gravity)
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

		//Creates attributes with default values
		this.type = "falling"; //Type of platform
		this.broken = false; //Has the platform been bounced on
        this.falling = 0; //The speed at which the platform falls

		//Creates the matter body for the object to handle collisions
		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		//Draw method to show and update the object
		let pos = this.body.position; //Create an shortcut alias
		if(this.broken == true) { //If the platform has been bounced on...
            this.falling = 5; //Set falling speed to 5
			pos.y = pos.y + this.falling; //Update Y position
		} else { //If platform hasn't been bounced on...
            this.falling = 0; //Set falling speed to 0
        }


		pos.y = pos.y + globalHeight; //Updates position to imitate scrolling

		let newPos = Matter.Vector.create(0,globalHeight+this.falling); //Creates new position vector for object after it has been affected by falling/scrolling
		Matter.Bounds.translate(this.body.bounds, newPos); //Updates the bounds of the object to keep collisions accurate

		//Draws a rectangle to represent platform
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#ff0000'); //set the fill colour (red)
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		//Updates positional attributes
		this.posX = pos.x;
		this.posY = pos.y;		
	}
	isBouncedOn() {
		//Method to be called by player on collision
        if(currentPlayer.body.velocity.y > 1) { //If the player is falling at a valid speed and hits the platform...
            this.broken = true;	//Set the platform to be "broken" in order to make it fall
        }		
	}
}