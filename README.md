# Block Jump by James and Flynn (Team 108)

## Basic Outline 
This game is a game based on the phone game *Doodle Jump*, where the user has to bounce between platforms and climb as high as possible whilst avoiding obstacles.  

## Task Allocation
To allocate and distribute tasks, we set up a Github project to create a Kanban board. We then assigned ourselves to tasks to make sure we knew what we had to develop. 
    
### Create bounce physics - Flynn & James (COMPLETED)
At the start of the project, Flynn researched matter.js' restitution property. However, due to complications with allowing the player to pass through platforms whilst jumping, We decided to manually change the player's velocity after each bounce. This allows us to track how the player is moving, so we can correctly apply collision between the player and the platforms.

### Camera Movement - James (COMPLETED)
The camera movement functionality was implemented by James at it works by checking whether the player has passed the center of the screen and when they have, the global height is increased and velocity is applied to the body of the screen to move the screen with the player and make sure that the player can't pass the middle of the screen. We did this to make sure that the user can always see what obstacles are ahead of them to make sure that the game is as playable and as fun as possible.


### Randomly Generate Platforms - Flynn & James (COMPLETED)
This functionality was implemented by both Flynn and James. To generate the platforms, we created an array of objects to store all the information of each platform. Using a for loop, we generated the platforms with random x values and random y values (relative to the previous platform). We decided to make the platform's Y positions relative to make sure that it is almost always possible for the user to ascend.

### Create special platforms and powerups - Flynn & James (COMPLETED)

**Falling Platforms - James**: 
This was created by detecting when the user has bounced on the platform, then the platform's velocity is changed to fall off the screen.

**Moving Platforms - Flynn**: 
This was done by changing the platform's x position between two random points to get the platform to move from left to right

**Bounce Platforms - James**: 
This was done by detecting when the user has bounced on the platform, and when they have, the user's velocity is increased past the standard velocity amount.

**Double Jump - Flynn**: 
This was done by randomly creating objects that disappear when the user touches them. This gives the illusion that the user has collected the item. Once the user has collected the item, a variable is changed within the Player class to say that the user has collected a double jump powerup. A symbol is displayed within the player to show the user that they have a double jump available and when they click 'W', up arrow or the spacebar, the user's velocity is changed as if the user has just bounced on a platform.

**Black Hole - Flynn & James**: 
This is done similarly to the double jump feature, where it is generated in a random position amongst the platforms, however, if the user touches a black hole, they die instantly.

**Shooting enemies - James**: 
This is done by generating a sprite in a random position on the page and then creating new sprites (bullets) that are assigned a velocity and trajectory in order to hit the player when they are passing by. When the player collides with the bullet or main turret sprite, they lose one of their 3 lives and the sprite is removed.          

### Moving the user when they move off the screen - Flynn (COMPLETED)
This was done by detecting whenever the user's x position is greater or less than the width of the canvas translating the player to the other side of the screen.

### Score - James (COMPLETED)
The score is determined by the global height of the game and this is directly displayed to the user on the screen using the text function in p5 js.

### End Screen - Flynn (COMPLETED)
This was done by creating a function that is called whenever the user's Y position is greater than the height of the screen and whenever the user runs out of lives. When this function is called, Game over is displayed on the screen and a boolean value is changed so that the draw() function doesn't run until the user presses the space key. This clashed with the feature that allows the user to press 'R' at any point during the game to reset the game. This is because you were able to reset the game when the game was over, so the game would break. This was fixed by making the reset function also dependent on the same boolean value. 


## Project Management
Throughout the project, we used Google Chat to make sure that we were able to communicate our problems and tasks. In addition to this, we met in person to show each other our progress. As well as this, we managed our time by using Github's project Kanban feature. This allowed us to manage our time correctly as we knew exactly what we had to do.

## What went well?
Throughout the project lifecycle, we were able to communicate with each other successfully to make sure that we always knew what we had to do so that we could keep the project development running smoothly. As well as this, we were able to develop an MVP ahead of schedule, which left us more time to fix bugs and complete project documentation. 

## Even better if?
If we were to carry out this project again, we would use a different coding environment such as Replit, so it is easier for us to see any changes being made live and we can work on the project at the same time, rather than using Github. Replit would also be better as it would be easier to use external sources if we wanted to change the sprites, background or sounds.

