class Player {
	constructor(posX, posY, width, height) {
		//Creates New Player at specific location
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;
		this.lives = 3;
		this.invunFrames = 60;
		this.doublejumps = 0
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
		this.checkIfHit();
	
		if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
			pos.x = pos.x - 0.4;
		}
		if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			pos.x = pos.x + 0.4;
		}
		if(keyIsDown(32) && this.doublejumps == 1) {
			apply_velocity(this.body,0,-12);
			this.doublejumps = 0
		}


		//if(globalHeight > 0) {
		//	apply_velocity(this.body,this.body.velocity.x,this.body.velocity.y);
		//}
		

		rectMode(CENTER); //switch centre to be centre rather than left, top
		
		
		switch(this.lives) {
			case 3:
				fill('#00ff00'); //set the fill colour
				break;
			case 2:
				fill('#ffff00');
				break;
			case 1:
				fill('#ff0000'); //set the fill colour
				break;
			case 0:
				pos.x = -100
				endGame();
		}
		
		// this.posX = pos.x;
		// this.posY = pos.y;
		
		if(pos.x < -10){
			Matter.Body.setPosition(this.body, {x:VP_WIDTH, y:pos.y})
		}
		if(pos.x > VP_WIDTH+10){
			Matter.Body.setPosition(this.body, {x:0, y:pos.y})
		}
		if(pos.y > VP_HEIGHT+100){
			endGame();
		}

		rect(pos.x, pos.y - (this.width/2), this.width, this.height); //draw the rectangle

		if (this.doublejumps == 1){
			ellipseMode(CENTER); //switch centre to be centre rather than left, top
			fill('#E3C000'); //set the fill colour
			ellipse(pos.x, pos.y-15, 10); //draw the circle
		}
	

		
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
		
		if(this.body.position.y < (VP_HEIGHT / 2) && globalHeight <= 0 && this.body.velocity.y < -0.5) {
			globalHeight = this.body.velocity.y * -1;

		} else if(globalHeight > 0) {
			globalHeight = globalHeight - 0.26;
			apply_velocity(this.body,this.body.velocity.x,0);

		}else {
			globalHeight = 0;

		}
	}
	checkIfHit() {
		for(let enemy = 0; enemy < currentEnemies.length; enemy++) {
			if(Matter.Bounds.overlaps(this.body.bounds, currentEnemies[enemy].body.bounds) && this.invunFrames == 0) {
				this.invunFrames = 60;
				if(currentEnemies[enemy] instanceof BlackHole) {
					this.lives = 0;
				} else {
					this.lives = this.lives - 1;
				}
				currentEnemies.splice(enemy,1);
				
				
				
				console.log("HIT");
			}
		}
		for(let jumpcoins = 0; jumpcoins < currentDoubleJumps.length; jumpcoins++) {
			if(Matter.Bounds.overlaps(this.body.bounds, currentDoubleJumps[jumpcoins].body.bounds)) {
				if (this.doublejumps == 0){
					this.doublejumps += 1 
				}

				currentDoubleJumps.splice(jumpcoins,1);
			}			
		}
		if(this.invunFrames > 0) {
			this.invunFrames = this.invunFrames - 1;
		} else {
			this.invunFrames = 0;
		}
		
	}
	
}