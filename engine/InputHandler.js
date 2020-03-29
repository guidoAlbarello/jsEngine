class InputHandler {
	constructor() {
		// TODO: Add variable to choose if mouse movement is calculated as move and drag or just move.
		this.isMouseDown = false;
		this.previousMouse = { x: 0, y: 0 };
		this.currentMouse = { x: 0, y: 0 };
		this.keys = new Array(256);
		for (let i = 0; i < 256; i++) {
			this.keys[i] = false;
		}
		this.zoom = 0;
	}

	init(canvas) {
		$(document).keydown(event => {
			let keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode <= 122 && keycode >= 97) {
				// if keycode is min letter
				keycode -= 32;
			}
			// Careful with OOR
			this.keys[keycode] = true;
		});

		$(document).keyup(event => {
			let keycode = event.keyCode ? event.keyCode : event.which;
			if (keycode <= 122 && keycode >= 97) {
				// if keycode is min letter
				keycode -= 32;
			}
			// Careful with OOR
			this.keys[keycode] = false;
		});

		$("#" + canvas.id).mousedown(event => {
			this.isMouseDown = true;
			this.previousMouse.x = this.currentMouse.x;
			this.previousMouse.y = this.currentMouse.y;
		});

		$("body").mouseup(event => {
			this.isMouseDown = false;
		});

		$("#" + canvas.id).mousemove(event => {
			this.currentMouse.x = event.clientX || event.pageX;
			this.currentMouse.y = event.clientY || event.pageY;
		});

		$("#" + canvas.id).mousewheel(event => {
			this.zoom = event.deltaY * event.deltaFactor;
		});
	}

	getInput(input) {
		// TODO: Add mouse movement
		switch (input) {
			case "up":
				return this.getKey(38); //Q
			case "down":
				return this.getKey(40); //E
			case "forward":
				return this.getKey(87); //W
			case "backwards":
				return this.getKey(83); //S
			case "right":
				return this.getKey(39); //D
			case "left":
				return this.getKey(37); //A
			case "change_camera":
				return this.getTapKey(69); //C
			case "change_mode":
				return this.getTapKey(66); //B
			case "hide_axis":
				return this.getTapKey(73); //H
			case "hide_vertical_grid":
				return this.getTapKey(89); //Y
			case "hide_horizontal_grid":
				return this.getTapKey(84); //Y
			case "jump":
				return this.getKey(38); //W
			//return this.getTapKey(32, 0.0166); // Space
			case "regulate":
				return this.getTapKey(82); // R
			case "shoot":
				return this.getKey(65); //Q
			//return this.isMouseDown;
			//return this.getTapKey(90);
			case "sword":
				return this.getKey(69); //E
			case "heavy_attack":
				return this.getKey(90); // Z 
			case "light_attack":
				return this.getKey(88); // X
			case "dash_attack":
				return this.getKey(67); // Keep E for now
			default:
				return false;
		}
	}

	getKeyWithDeadTime(keycode, deadTime) {
		if (this.keys[keycode].lastAccess) {
			if (this.keys[keycode].lastAccess > deadTime)
				this.keys[keycode].lastAccess = 0;
			else
				this.keys[keycode].lastAccess += gDeltaTime;
		} else {
			this.keys[keycode].lastAccess = 0;
		}
	}

	getKey(keycode) {
		return this.keys[keycode];
	}

	getTapKey(keycode) {
		let keyState = this.keys[keycode];
		this.keys[keycode] = false;
		return keyState;
	}

	getAxisInput() {
		let delta = { x: 0, y: 0 };
		if (this.isMouseDown) {
			// This sould be updated every update cycle. There's no inputHandler.update func,
			// but when a camera uses the mouse, it will enter this case every update.
			// Careful with the bug when the camera is switched to another one without mouse control,
			// the previousMouse won't be resetted, and when a new camera with mouse is selected
			// the first delta could be anything.
			delta = this.getDelta();
		}

		return delta;
	}

	getZoom() {
		return this.zoom;
	}

	setZoom(value) {
		this.zoom = value;
	}

	getDelta() {
		let delta = {
			x: this.currentMouse.x - this.previousMouse.x,
			y: this.currentMouse.y - this.previousMouse.y
		};
		this.previousMouse.x = this.currentMouse.x;
		this.previousMouse.y = this.currentMouse.y;
		return delta;
	}
}
