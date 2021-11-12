class Boost {
    constructor(posX,posY,platform) {
        let options = {
			isStatic: true,
		}
		
		this.platform = platform;
		this.posX = posX;
		this.posY = posY;

		this.body = Matter.Bodies.rectangle(this.posX, this.posY, 30, 4, options);

		Matter.World.add(world, this.body);
    }
    draw() {
        let pos = this.body.position; //create an shortcut alias
		pos.y = this.platform.body.position.y - 7;
		//pos.y = pos.y + globalHeight;
		let newPos = Matter.Vector.create(0,globalHeight);
		Matter.Bounds.translate(this.body.bounds, newPos);
		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#fe019a'); //set the fill colour
		rect(pos.x, pos.y, 30, 4); //draw the rectangle

		this.posX = pos.x;
		this.posY = pos.y;
		this.checkIfPickedUp();
    }
    checkIfPickedUp() {
        if(Matter.Bounds.overlaps(this.body.bounds, currentPlayer.body.bounds)) {
			Matter.Body.setVelocity( currentPlayer.body, {x: 0, y: -20});
        }
    }
}