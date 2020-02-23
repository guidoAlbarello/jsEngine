class PointLight extends Object3d {
	constructor(position, intensity) {
		super();
		this.translate(position);
		this.intensity = intensity;
	}

	position() {
		return this.worldModelMatrix.slice(12, 15);
	}
}
