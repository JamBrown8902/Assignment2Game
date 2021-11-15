//Defines Turret Enemy Class
//The turret enemy spawns on the other side of a platform and fires bullets at the player for them to dodge
//They are designed to add more obstacles to the player and encourage them to jump up quicker in order to despawn the enemy
class TurretEnemy {
    constructor(posX,posY) {
		//Created using positional parameters (posX, posY)

		//Defines options to be used when creating Matter body (not affected by gravity)
        let options = {
			isStatic: true,
		}
		
		//Creates attributes using parameters
		this.posX = posX;
		this.posY = posY;

		//Creates shooting cooldown attribute
		this.cooldown = 180;

		//Creates Matter body to handle collisions
		this.body = Matter.Bodies.circle(this.posX, this.posY, 60, options);
		Matter.World.add(world, this.body);

		//Makes sure the player cannot bounce off from body
		this.body.collisionFilter = {
			'group': -1,
			'category': 2,
			'mask': 0,
		  };
    }
    shoot() {
		//Shoot function calculates bullet velocity and creates a bullet projectile
		//Defines bullet velocity as the difference of position (to find direction)
        let bulletVelocity = Matter.Vector.sub(this.body.position,currentPlayer.body.position);
		//Edits bullet velocity to aim just above player (more likely to hit them when they are bouncing)
		bulletVelocity = Matter.Vector.add(bulletVelocity,{x: 0, y: -30});
		//Normalise bullet velocity so the value is 1 (used to make sure bullets always travel the same speed)
		bulletVelocity = Matter.Vector.normalise(bulletVelocity);
		//Multiply velocity by -3 to make sure velocity is in right direction and travelling at a fast enough speed
		bulletVelocity = Matter.Vector.mult(bulletVelocity,-3);
		//Create new bullet and add it to array of enemy objects
        currentEnemies.push(new Bullet(this.body.position.x,this.body.position.y,bulletVelocity));
    }
    draw() {
		//Draw method updates and shows the object
        let pos = this.body.position; //Create an shortcut alias
		pos.y = pos.y + globalHeight; //Updates the object's position to imitate scrolling

		let newPos = Matter.Vector.create(0,globalHeight); //Creates newPos vector to update object bounds using new positions
		Matter.Bounds.translate(this.body.bounds, newPos); //Translates bounds using newPos to ensure collisions remain accurate

		//Draws the circle representing the enemy
		ellipseMode(CENTER); //Switch centre to be centre rather than left, top
		fill('#FFC0CB'); //Set the fill colour 
		ellipse(pos.x, pos.y, 60); //Draw the circle

		//Updates positional attributes
		this.posX = pos.x;
		this.posY = pos.y;

		//Handles shooting cooldown
		if(this.cooldown <= 0) { //If cooldown has reached 0...
            this.shoot(); //Shoot method to fire bullet
			this.cooldown = 120; //Sets cooldown to 120 frames
        } else { //If cooldown hasn't reached zero...
			this.cooldown = this.cooldown - 1; //Decrease cooldown by one (1 per frame)
		}
    }


}