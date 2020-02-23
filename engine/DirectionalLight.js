class DirectionalLight {
	direction;
	intensity;

	setDirection(direction) {
		this.direction = vec3.create();
		vec3.normalize(this.direction, direction);
	}

	setIntensity(intensity) {
		this.intensity = intensity;
	}
}
