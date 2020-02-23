class CollisionDetection {
	UNTAGGED = 0;
	colliders = [];
	collidables = [];

	constructor() { }

	update() {
		for (let i = 0; i < this.colliders.length; i++) {
			let collider = this.colliders[i];
			let collidablesWithSameTag = this.collidables[collider.getTag()];
			for (let j = 0; j < collidablesWithSameTag.length; j++) {
				let otherObject = collidablesWithSameTag[j];
					if (collider.collides(otherObject.getHitbox()) {
						
					}
			}
		}
	}

	addCollider(object, collider) {
		this.colliders.push(collider);
		object.addCollider(collider);
	}

	registerCollidable(object, tag) {
		if (this.collidables[tag]) 
			this.collidables[tag].push(object);
		else
			this.collidables[tag] = [object];
	}
}
