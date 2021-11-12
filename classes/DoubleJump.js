class DoubleJump {
	constructor(posX,posY) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		this.posX = posX;
		this.posY = posY;
		this.body = Matter.Bodies.circle(this.posX, this.posY, 80, options);
		this.collected = false;

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#E3C000'); //set the fill colour
		ellipse(pos.x, pos.y, 20); //draw the circle

		// if(this.collected == true) {
		// 	Matter.Body.setPosition(this.body, {x:, y:pos.y})
		// }
		this.posX = pos.x;
		this.posY = pos.y;
		
		
		
	}
}