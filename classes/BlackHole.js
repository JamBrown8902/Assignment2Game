
//Defines BlackHole Class to be used in script.js
//A black hole is an object that instantly ends the game if the player touches it
class BlackHole {
	constructor(posX,posY) {
		//Created using parameters for object's position

		//Defines options for the Matter object of the black hole (not affected by gravtiy)
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}

		//Defines position attributes for the black hole using parameters
		this.posX = posX;
		this.posY = posY;

		//Creates Matter body for the black hole, for use in collisions
		this.body = Matter.Bodies.circle(this.posX, this.posY, 80, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		//Method to draw black hole and update black hole's position

		let pos = this.body.position; //Create an shortcut alias
		pos.y = pos.y + globalHeight; //Updates position of black hole to imitate scrolling
		let newPos = Matter.Vector.create(0,globalHeight); //Defines new position as a vector
		Matter.Bounds.translate(this.body.bounds, newPos); //Updates the matter body's bounds so that collisions will still be accurate
		ellipseMode(CENTER); //Switch centre to be centre rather than left, top
		fill('#000000'); //Set the fill colour (Black)
		ellipse(pos.x, pos.y, 80); //Draw the circle

		//Updates position attributes
		this.posX = pos.x;
		this.posY = pos.y;		
	}
}