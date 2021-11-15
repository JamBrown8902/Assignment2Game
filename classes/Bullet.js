//Defines Bullet class
//Bullet objects are created by the Turret Enemy and fly towards the player at a set speed
class Bullet {
    constructor(posX,posY,bulletVelocity) {
		//Created using positional parameters (posX, posY) and velocity of the bullet

		//Defines options to be used by the Matter body (not affected by gravity)
        let options = {
			isStatic: false,
			inertia: Infinity,
			frictionAir: 0.99
		}
		
		//Creates attributes using parameters
		this.posX = posX;
		this.posY = posY;
		this.bulletVelocity = bulletVelocity;

		//Creates new Matter body for the object
		this.body = Matter.Bodies.circle(this.posX, this.posY, 20, options);
		Matter.World.add(world, this.body);

		//Moves the bullet towards the position it is firing at
        Matter.Body.translate(this.body,this.bulletVelocity);

		//Ensures the Matter body does not collide so it will travel in a straight path
		this.body.collisionFilter = {
			'group': -1,
			'category': 2,
			'mask': 0,
		  };
    }
    draw() {
		//Draw method to show and update the object

        let pos = this.body.position; //Create an shortcut alias
		pos.y = pos.y + globalHeight; //Updates objects height to imitate scrolling

		let newPos = Matter.Vector.create(0,globalHeight); //Creates new vector using new position
		Matter.Bounds.translate(this.body.bounds, newPos); //Translates bounds of bullet to new position

		//Draws object
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#ff0000'); //set the fill colour
		ellipse(pos.x, pos.y, 20); //draw the bullet

		//updates position attributes
		this.posX = pos.x;
		this.posY = pos.y;

		//Runs the shoot method to move the bullet
		this.shoot();
    }
	shoot() {
		//Updates the body and bounds positions using the bullet velocity
		Matter.Body.translate(this.body,this.bulletVelocity);
		Matter.Bounds.translate(this.body.bounds, this.bulletVelocity);
	}
}