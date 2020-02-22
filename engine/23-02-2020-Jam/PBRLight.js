class PBRLight {
    direction;
    intensity;

    setDirection(direction) {
	this.direction = vec3.create();
	vec3.normalize(this.direction, direction);
    }
}
