class CollisionDetection {
	UNTAGGED = 0;
	colliders = [];

	constructor() {}

	update() {
		/*	for (let i = 0; i < this.colliders.length; i++) {
	    let collidersWithSameTag = this.colliders[i];
	    for (let j = 0; j < collidersWithSameTag.length;j++) {
		let collider = collidersWithSameTag[j];
		for (let k = j + 1; k < collidersWithSameTag.length;k++) {
		    let otherCollider = colldiersWithSameTag[k];
		    if(collider.collides(otherCollider) {
			return;
		    }
		}
	    }
	}*/
	}

	addCollider(object, collider) {
		if (this.colliders[collider.getTag()]) {
			this.colliders[collider.getTag()].push(collider);
		} else {
			this.colliders[collider.getTag()] = [collider];
		}
		object.addCollider(collider);
	}
}
