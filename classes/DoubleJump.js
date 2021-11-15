//Defines DoubleJump class
//The double jump power up allows the player to click space once it has been picked up, and gives the player an extra jump
class DoubleJump {
	constructor(posX,posY) {
		//Created using positional parameters (posX, posY)

		//Defines options for use when creating the Matter body (not affected by gravity)
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}

		//Creates attributes using parameters
		this.posX = posX;
		this.posY = posY;

		//Defines collected attribute, defaults to false
		this.collected = false;

		//Creates Matter body for collisions
		this.body = Matter.Bodies.circle(this.posX, this.posY, 20, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		//Draw method shows and updates object
		let pos = this.body.position; //Create an shortcut alias
		pos.y = pos.y + globalHeight; //Updates object position to imitate scrolling

		let newPos = Matter.Vector.create(0,globalHeight); //Creates new vector of new position for the object
		Matter.Bounds.translate(this.body.bounds, newPos); //Translates the object bounds to make sure collisions remain accurate

		//Draws a circle 
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#E3C000'); //set the fill colour
		ellipse(pos.x, pos.y, 20); //draw the circle

		//Updates the object's attributes
		this.posX = pos.x;
		this.posY = pos.y;
	}
}