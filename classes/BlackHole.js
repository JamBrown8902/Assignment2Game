class BlackHole {
	constructor(posX,posY,diameter) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		console.log("BLACK HOLE GENERATED")
		this.posX = posX;
		this.posY = posY;
		this.diameter = diameter;
		this.body = Matter.Bodies.circle(this.posX, this.posY, this.diameter, options);

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		ellipseMode(CENTER); //switch centre to be centre rather than left, top
		fill('#000000'); //set the fill colour
		circle(pos.x, pos.y, this.diameter); //draw the circle
		this.posX = pos.x;
		this.posY = pos.y;
		
		
		
	}
}