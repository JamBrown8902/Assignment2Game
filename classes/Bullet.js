class bullet {
    constructor(posX,posY,bulletVelocity) {
        let options = {
			isStatic: false,
			inertia: Infinity,
			frictionAir: 0.99
		}
		
		this.posX = posX;
		this.posY = posY;

		this.body = Matter.Bodies.circle(this.posX, this.posY, 20, options);

		Matter.World.add(world, this.body);
		this.bulletVelocity = bulletVelocity;
        Matter.Body.translate(this.body,this.bulletVelocity);
		this.body.collisionFilter = {
			'group': -1,
			'category': 2,
			'mask': 0,
		  };
    }
    draw() {
        let pos = this.body.position; //create an shortcut alias
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#ff0000'); //set the fill colour
		ellipse(pos.x, pos.y, 20); //draw the bullet
		Matter.Bounds.shift(this.body.bounds,{x:pos.x, y:pos.y});

		this.posX = pos.x;
		this.posY = pos.y;
		this.shoot();
    }
	shoot() {
		Matter.Body.translate(this.body,this.bulletVelocity);
	}
}