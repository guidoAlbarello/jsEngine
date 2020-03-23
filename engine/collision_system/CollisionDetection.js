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
			if (collidablesWithSameTag) {
				for (let j = 0; j < collidablesWithSameTag.length; j++) {
					let otherObject = collidablesWithSameTag[j];
					let collision = collider.collides(otherObject.getHitbox());
					if (collision) {
						if (!collider.isColliding) {
						collider.onCollisionEnter(otherObject, collision);
						collider.isColliding = true;
						} else {
							collider.onCollisionStay(otherObject, collision);
						}
					}
	
					if (collider.isColliding && !collision) {
						collider.onCollisionExit(otherObject);
						collider.isColliding = false;
					}
				}
			}
		}

		for (let i = 0; i < this.physicalColliders.length; i++) {
			let collider = this.physicalColliders[i];
			for (let j = i + 1; j < this.physicalColliders.length; j++) {
				let otherCollider = this.physicalColliders[j];
				let collision = collider.collides(otherCollider.getHitbox());
				if (collision) {
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

	removeColliders(objectId) {
		this.colliders = this.colliders.filter(collider => collider.object.getId() != objectId);
		this.physicalColliders = this.physicalColliders.filter(collider => collider.object.getId() != objectId);
		for (let tag in this.collidables) {
			this.collidables[tag] = this.collidables[tag].filter(object => object.getId() != objectId);
		}
	}
}
