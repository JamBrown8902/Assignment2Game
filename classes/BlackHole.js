class BlackHole {
	constructor(posX,posY) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		this.posX = posX;
		this.posY = posY;
		this.body = Matter.Bodies.circle(this.posX, this.posY, 80, options);

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#000000'); //set the fill colour
		ellipse(pos.x, pos.y, 80); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;
		
		
		
	}
}