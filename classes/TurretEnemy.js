class TurretEnemy {
    constructor(posX,posY) {
        let options = {
			isStatic: true,
		}
		
		this.posX = posX;
		this.posY = posY;
		this.cooldown = 180;
		this.body = Matter.Bodies.circle(this.posX, this.posY, 60, options);

		Matter.World.add(world, this.body);

		this.body.collisionFilter = {
			'group': -1,
			'category': 2,
			'mask': 0,
		  };
    }
    shoot() {
        let bulletVelocity = Matter.Vector.sub(this.body.position,currentPlayer.body.position);
		bulletVelocity = Matter.Vector.add(bulletVelocity,{x: 0, y: -30});
		bulletVelocity = Matter.Vector.normalise(bulletVelocity);
		bulletVelocity = Matter.Vector.mult(bulletVelocity,-3);
        currentEnemies.push(new Bullet(this.body.position.x,this.body.position.y,bulletVelocity));
    }
    draw() {
        let pos = this.body.position; //create an shortcut alias
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#FFC0CB'); //set the fill colour
		
		ellipse(pos.x, pos.y, 60); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;

		if(this.cooldown == 0) {
            this.shoot();
			this.cooldown = 120;
        } else {
			this.cooldown = this.cooldown - 1;
		}
    }


}