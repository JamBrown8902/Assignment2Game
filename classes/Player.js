class Player {
	constructor(posX, posY, width, height) {
		//Creates New Player at specific location
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.deceleration = 0.275;

		let options = {
			restitution: 0,
			friction: 0.8

		}

		this.body = Matter.Bodies.rectangle(this.posX, this.posY + (this.width/2), this.width, 0.1, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		let pos = this.body.position; //create an shortcut alias 
		this.checkCollisions();
		this.updateHeight();
	
		if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
			pos.x = pos.x - 0.4;
		}
		if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			pos.x = pos.x + 0.4;
		}



		//if(globalHeight > 0) {
		//	apply_velocity(this.body,this.body.velocity.x,this.body.velocity.y);
		//}
		

		rectMode(CENTER); //switch centre to be centre rather than left, top
		fill('#00ff00'); //set the fill colour
		
		// this.posX = pos.x;
		// this.posY = pos.y;
		
		if(pos.x < -10){
			Matter.Body.setPosition(this.body, {x:VP_WIDTH, y:pos.y})
		}
		if(pos.x > VP_WIDTH+10){
			Matter.Body.setPosition(this.body, {x:0, y:pos.y})
		}

		rect(pos.x, pos.y - (this.width/2), this.width, this.height); //draw the rectangle

		
		

		
	}
	checkCollisions() {

		if(this.body.velocity.y < 0) {
			this.body.collisionFilter = {
				'group': -1,
				'category': 2,
				'mask': 0,
			  };
		} else {
			body.collisionFilter = {
				'group': 0,
				'category': 1,
				'mask': 0,
			  };
			for(let platform = 0; platform < currentPlatforms.length; platform++) {
				if(Matter.Bounds.overlaps(this.body.bounds, currentPlatforms[platform].body.bounds)) {
					if(currentPlatforms[platform].type == "falling") {
						currentPlatforms[platform].isBouncedOn();
					}
					apply_velocity(this.body,0,-12);
				}			
			}
		}

		
		
	}
	updateHeight() {
		
		if(this.body.position.y < (VP_HEIGHT / 2) && globalHeight <= 0 && this.body.velocity.y < 0) {
			globalHeight = this.body.velocity.y * -1;

		} else if(globalHeight > 0) {
			globalHeight = globalHeight - 0.26;
			apply_velocity(this.body,this.body.velocity.x,0);

		}else {
			globalHeight = 0;

		}
	}
	
}