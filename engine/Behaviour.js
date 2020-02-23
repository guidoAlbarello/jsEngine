class Behaviour {
	object;
	init;
	update;

	constructor(object) {
		this.object = object;
		this.init = () => {};
		this.update = () => {};
	}

	setObject(object) {
		this.object = object;
	}

	setInit(init) {
		this.init = init;
	}

	setUpdate(update) {
		this.update = update;
	}
}
