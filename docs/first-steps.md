# **Basic Game Architecture**
### **What's a game as software?**
A game is a graphic application with strict requirements for responsiveness and visual smoothness. Lots of systems interact in the making a game: 
* Audio
* Physics
* AI
* Graphics
* I/O handling
* UI
* Networking
* Memory management
* Particle systems
* Animation

and more. 

### **Game Loop**
#### *Tutorial that sums up how game loop works: [How does the Game Engine Loope make a game possible?](https://www.haroldserrano.com/blog/the-heart-of-a-game-engine-the-game-engine-loop)*

At first instance a basic game can be modelled as:

```
// Run every x amount of seconds (16.6 for 60fps games for example)
while (game.isRunning()) {

	// Read the input of the user if any and alert any system that requires input
	readAndProcessInput();
	
	// Update the state of the world (update IA, update physics, …)
	updateSystems();
	
	// Draw the frame 
	renderFrame();
}
```

Most of the game logic is handled inside the `update` method. Here is where every object is updated given the corresponding logic. 

The `input` modifies controllers which are then accessed by the game objects to decouple the input device from the game object. This allows us to easily change the controller of a player. We can have a `PlayerController` class which has its state modified when the input is read (at the beginning of the loop). Then, in the update step when the player object is updated, it asks the `PlayerController` for input instead of talking directly with the `InputManager`.

More concrete example: in `Player`, instead of asking `InputManager.getRightKey()`, it'll ask the player controller `PlayerController.getMovement()`. This allows us to implement switching between different playable characters fairly easily. For example, if we have a soccer team we can model it as 11 `Player` objects. To switch between them we can just attach the player controller to one we want to control (the others will be controlled by an IA controller).

We will use an `OOP` entity component system for it's simplicity due to time constraints. An `ECS` is basically adding functionality to an object by aggregation and composition.

For example if we want to have an Enemy that can breath fire and be controlled by the IA, we can create two components: `BreathFire` and `IABehaviour`. We add them to the Enemy object and then in the update method we do somehting like this:

```
Enemy.update() {
	breathFire.update();
	IABehaviour.update();
}
```

Regarding the rendering part, it basically just draws the frame, pretty technical stuff that we can discuss later.

We always begin with a root node at the origin. If we add for example a chair object, that chair will be drawn in respect to the root node. So if we move/rotate/scale the root node, the chair will be affected by that transformation also.

The update and draw methods are basically a recursive call through the scene graph:

```
root.draw/udpate() {
	for each child:
		child.draw/update()
}
```