class SlidingPlatform {
	constructor(posX,posY,width,height) {
		let options = {
			isStatic: true,
			restitution: 0,
			friction: 0.5
		}
		console.log("SLIDING PLATFORM GENERATED")
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.type = "sliding";
		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);
		this.movementRange = get_random(50,100);
		this.movementSpeed = get_random(1,2);
		this.originalX = posX
		this.moveLeft = false;

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias

		if(this.moveLeft == true) {
			pos.x = pos.x + this.movementSpeed;
			if(pos.x >= this.originalX + this.movementRange) {
				this.moveLeft = false;
			}
		} else {
			pos.x = pos.x - this.movementSpeed;
			if(pos.x <= this.originalX - this.movementRange) {
				this.moveLeft = true;
			}
		}
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#0000ff'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;
		
		
		
		
		
	}
}
