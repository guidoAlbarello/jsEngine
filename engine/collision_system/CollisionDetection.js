class CollisionDetection {
	UNTAGGED = 0;
	colliders = [];
	collidables = [];
	physicalColliders = [];
	constructor() { }

	update() {
		for (let i = 0; i < this.colliders.length; i++) {
			let collider = this.colliders[i];
			let collidablesWithSameTag = this.collidables[collider.getTag()];
			for (let j = 0; j < collidablesWithSameTag.length; j++) {
				let otherObject = collidablesWithSameTag[j];
				let collision = collider.collides(otherObject.getHitbox());
				if (collision) {
					console.log("collision found")
					collider.onCollisionEnter(otherObject, collision);
				}
			}
		}

		for (let i = 0; i < this.physicalColliders.length; i++) {
			let collider = this.physicalColliders[i];
			for (let j = i + 1; j < this.physicalColliders.length; j++) {
				let otherCollider = this.physicalColliders[j];
				let collision = collider.collides(otherCollider.getHitbox());
				if (collision) {
					console.log("collision found")
					collider.onCollisionEnter(otherCollider);
				}
			}
		}
	}

	addCollider(collider) {
		this.colliders.push(collider);
	}

	addPhysicalCollider(collider) {
		this.physicalColliders.push(collider);
	}

	registerCollidable(object, tag) {
		if (this.collidables[tag])
			this.collidables[tag].push(object);
		else
			this.collidables[tag] = [object];
	}
}
