class Collider {
	onCollisionEnter;
	onCollisionExit;
	onCollisionStay;

	tag;
	object;
	isColliding = false;
	
	constructor(tag) {
		this.tag = tag;
		this.onCollisionEnter = () => {};
		this.onCollisionExit = () => {};
		this.onCollisionStay = () => {};
	}

	collides(otherHitbox) {
		return this.object.getHitbox().intersects(otherHitbox);
	}

	setOnCollisionEnter(callback) {
		this.onCollisionEnter = callback;
	}

	setOnCollisionExit(callback) {
		this.onCollisionExit = callback;
	}

	setOnCollisionStay(callback) {
		this.onCollisionStay = callback;
	}

	getTag() {
		return this.tag;
	}

	setTag(tag) {
		this.tag = tag;
	}

	setObject(object) {
		this.object = object;
	}

	getHitbox() {
		return this.object.getHitbox();
	}
}
