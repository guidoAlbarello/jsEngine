class CollisionDetection {
    UNTAGGED = -1;
    colliders = [];
    
    constructor() {

    }

    checkCollitions() {

    }

    addPhysicsCollider(object, tag) {
	object.addCollider(new PhysicsCollider(), tag || UNTAGGED);
    }

    addTriggerCollider(object, tag) {
	// Set callback
	object.addCollider(new TriggerCollider(), tag || UNTAGGED);
    }
}
