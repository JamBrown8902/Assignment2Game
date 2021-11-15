//Defines Player class
//The player object is what the user controls by moving left to right
//The player will jump from platform to platform while avoiding hazards
//The player's lives are represented by the colour of the player (green -> yellow -> red -> game over)
class Player {
	constructor(posX, posY, width, height) {
		//Creates New Player at specific location
		//Uses positional parameters (posX, posY) and size parameters (width, height)

		//Creates new attributes using parameters
		this.posX = posX;
		this.posY = posY;
		this.width = width;
		this.height = height;

		//Creates new attributes and assignes default values
		this.lives = 3; //Number of lives player has left
		this.invunFrames = 60; //Number of frames user cannot be hit during, returned to 60 after being hit
		this.doublejumps = 0 //Number of double jump power ups the player has picked up

		//Defines options to be used when creating the player's Matter body (affected by gravity)
		let options = {
			restitution: 0,
			friction: 0.8

		}

		//Creates the player's Matter body
		this.body = Matter.Bodies.rectangle(this.posX, this.posY + (this.width/2), this.width, 0.1, options);
		Matter.World.add(world, this.body);
	}
	draw() {
		//Draw Method updates and shows the object

		let pos = this.body.position; //Create an shortcut alias
		
		//Calls multiple methods to check the status of the player
		this.checkCollisions();
		this.updateHeight();
		this.checkIfHit();
	
		//If left arrow or A key is pressed, moves the player to the left each frame
		if(keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
			pos.x = pos.x - 0.4;
		}
		//If right arrow or D key is pressed, moves the player to the left each frame
		if(keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
			pos.x = pos.x + 0.4;
		}
		//If up arrow, W key or Space bar is pressed, and the player has a double jump power up, activate the second jump 
		if((keyIsDown(32) || keyIsDown(UP_ARROW) || keyIsDown(87)) && this.doublejumps == 1) {
			apply_velocity(this.body,0,-12); //Applies jump velocity to player
			this.doublejumps = 0; //Returns pick up amount to zero
		}

		//Draws the rectangle to represent the player
		rectMode(CENTER); //switch centre to be centre rather than left, top
		//Switch case to determine what colour the player is
		switch(this.lives) {
			case 3:
				fill('#00ff00'); //set the fill colour (Green - 3 lives)
				break;
			case 2:
				fill('#ffff00'); //set the fill colour (Yellow - 2 lives)
				break;
			case 1:
				fill('#ff0000'); //set the fill colour (Red - 1 lives)
				break;
			case 0:
				pos.y = 99999; //Moves player off screen
				endGame(); //Calls the game over function
		}
		
		//Checks if player is off screen to loop back round
		if(pos.x < -10) { //If player went off left side of screen...
			Matter.Body.setPosition(this.body, {x:VP_WIDTH, y:pos.y}); //Set player position to right side of screen
		}
		if(pos.x > VP_WIDTH+10) { //If player went off right side of screen...
			Matter.Body.setPosition(this.body, {x:0, y:pos.y}); //Set player position to left side of screen
		}
		//Checks if player has fallen off screen...
		if(pos.y > VP_HEIGHT+100){
			endGame(); //Calls game over funtion
		}

		rect(pos.x, pos.y - (this.width/2), this.width, this.height); //Draw the rectangle


		if (this.doublejumps >= 1) { //If the player has a double jump pick up, draw the double jump... 
			ellipseMode(CENTER); //Switch centre to be centre rather than left, top
			fill('#E3C000'); //Set the fill colour
			ellipse(pos.x, pos.y-15, 10); //Draw the circle
		}
	

		
	}
	checkCollisions() {
		//Check collision method handles collisions for the player

		//If player is moving upwards, turn off collision so player does not get stuck on platforms
		if(this.body.velocity.y < 0) {
			this.body.collisionFilter = {
				'group': -1,
				'category': 2,
				'mask': 0,
			  };
		} else { //If player is moving down/falling, allow player to collide with platforms
			body.collisionFilter = {
				'group': 0,
				'category': 1,
				'mask': 0,
			  };

			//Loops through all platforms that are active 
			for(let platform = 0; platform < currentPlatforms.length; platform++) {
				if(Matter.Bounds.overlaps(this.body.bounds, currentPlatforms[platform].body.bounds)) { //Checks if Player bounds are overlapping with a platform's bounds...
					if(currentPlatforms[platform].type == "falling") { //If platform is a falling platform, call bouncedOn method
						currentPlatforms[platform].isBouncedOn();
					}
					apply_velocity(this.body,0,-12); //Apply jumping velocity to player
				}			
			}
		}		
	}
	updateHeight() {
		//Update height method is used to imitate scrolling once the player reaches the middle of the screen (Y-axis)

		//Checks to see if player has reached the middle of the screen, is moving up and global height hasn't already been set
		if(this.body.position.y < (VP_HEIGHT / 2) && globalHeight <= 0 && this.body.velocity.y < -0.5) {
			globalHeight = this.body.velocity.y * -1; //Sets globalHeight to be the player's velocity but moving in the opposite direction

		} else if(globalHeight > 0) { //If globalHeight has already been set...
			globalHeight = globalHeight - 0.26; //Decrease global height at almost the same rate as the the player's veloctiy decreases
			apply_velocity(this.body,this.body.velocity.x,0); //Ensure the player does not travel higher than the middle of the screen

		} else { //If player is not at the middle of the screen, set global height to zero
			globalHeight = 0;

		}
	}
	checkIfHit() {
		//Check if hit method checks to see if the player has been hit by a bullet, another enemy or powerup

		//Loops through every object in array of enemies
		for(let enemy = 0; enemy < currentEnemies.length; enemy++) {
			//Checks bounds of enemy and player to see if they have collided...
			if(Matter.Bounds.overlaps(this.body.bounds, currentEnemies[enemy].body.bounds) && this.invunFrames == 0) {
				this.invunFrames = 60; //Set invun frames to be 60 so player cannot be hit again
				if(currentEnemies[enemy] instanceof BlackHole) { //If enemy was a black hole...
					this.lives = 0; //Instantly set lives to 0
				} else { //If not a black hole...
					this.lives = this.lives - 1; //Decrease lives by one
				}
				//Remove enemy collided with from the array/game
				currentEnemies.splice(enemy,1);
			}
		}

		//Loops through all the power ups in array
		for(let powerUp = 0; powerUp < currentPowerUps.length; powerUp++) {
			//Checks bounds of power up and player to check if they have collided AND that power up is a double jump...
			if(Matter.Bounds.overlaps(this.body.bounds, currentPowerUps[powerUp].body.bounds) && currentPowerUps[powerUp] instanceof DoubleJump) {

				//
				if (this.doublejumps == 0){ //If double jumps collected is 0...
					this.doublejumps += 1 //Increase number of jumps collected
				}

				currentPowerUps.splice(powerUp,1); //Remove Double jump from array/game
			}			
		}

		if(this.invunFrames > 0) { //If invun frames are more than zero...
			this.invunFrames = this.invunFrames - 1; //Decrease invun frames by one (1 per frame)
		} else { //If invun frames are not more than zero...
			this.invunFrames = 0; //Set them to be exactly zero
		}
	}
}

