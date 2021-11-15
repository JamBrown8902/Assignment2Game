//Defines Boost class
//A boost power up is meant to act as a spring, if a player jumps on it, it will give them a much higher jump than usual
class Boost {
    constructor(posX,posY,platform) {
		//Created using positional parameters (posX and posY), as well as the platform it is on
        let options = {
			isStatic: true, //Not affected by gravity
		}
		
		//Creates attributes using parameters
		this.platform = platform;
		this.posX = posX;
		this.posY = posY;

		//Creates Matter body for the black hole, for use in collisions
		this.body = Matter.Bodies.rectangle(this.posX, this.posY, 30, 4, options);
		Matter.World.add(world, this.body);
    }
    draw() {
		//Draw method to show and update the object
        let pos = this.body.position; //Create an shortcut alias
		pos.y = this.platform.body.position.y - 7; //Ensures the boost is always on top of the linked platform

		let newPos = Matter.Vector.create(0,globalHeight); //Defines new position as a vector	
		Matter.Bounds.translate(this.body.bounds, newPos); //Updates bounds to new position to make sure collisions are still correct

		//Draws rectangle to represent boost
		rectMode(CENTER); //Switch centre to be centre rather than left, top
		fill('#fe019a'); //Set the fill colour
		rect(pos.x, pos.y, 30, 4); //Draw the rectangle

		//Updates attributes of the boost
		this.posX = pos.x;
		this.posY = pos.y;

		//Runs method to check if player has jumped on boost
		this.checkIfPickedUp();
    }
    checkIfPickedUp() {
		//Method to check if player has jumped on boost
        if(Matter.Bounds.overlaps(this.body.bounds, currentPlayer.body.bounds)) { //Checks collision between player and spring using bounds and the overlap function
			Matter.Body.setVelocity( currentPlayer.body, {x: 0, y: -20}); //Makes the player jump, giving a larger y velocity than usual
        }
    }
}