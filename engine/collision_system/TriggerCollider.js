class TriggerCollider {
	onCollisionEnter;
	onCollisionExit;
	onCollisionStay;

	tag;
	object;

	constructor(tag) {
		this.tag = tag;
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

	setObject(object) {
		this.object = object;
	}
}
