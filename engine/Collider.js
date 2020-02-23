class Collider {
	onCollisionEnter;
	onCollisionExit;
	onCollisionStay;

	tag;

	constructor() {
		this.onCollisionEnter = () => {};
		this.onCollisionExit = () => {};
		this.onCollisionStay = () => {};
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
		return tag;
	}

	setTag(tag) {
		this.tag = tag;
	}
}
