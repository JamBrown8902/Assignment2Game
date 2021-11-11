class FallingPlatform {
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
		this.type = "falling";
		this.broken = false;
        this.falling = 0;

		this.body = Matter.Bodies.rectangle(this.posX, this.posY, this.width, this.height, options);

		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias
		if(this.broken == true) {
            this.falling = 5;
			pos.y = pos.y + 5;
		} else {
            this.falling = 0;
        }
		pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight+this.falling);
		Matter.Bounds.translate(this.body.bounds, newPos);
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#ff0000'); //set the fill colour
		rect(pos.x, pos.y, this.width, this.height); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;

		
	}
	isBouncedOn() {
		this.broken = true;	
	}
}