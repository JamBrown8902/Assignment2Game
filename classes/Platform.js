class Platform {
	constructor(posX,posY,width,height) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.type = "normal";

		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#222222'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;
		
	}
	
}