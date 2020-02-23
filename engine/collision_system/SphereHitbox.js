class SphericalHitbox {
    type = "SPHERICAL_HITBOX";
    object;

    constructor(radius) {
        this.radius = radius;
    }

    setObject(object) {
        this.object = object;
    }

    getType() {
        return this.type;
    }

    getPosition() {
        return this.object.getPosition();
    }

    getRadius() {
        return this.radius;
    }

    intersects(otherHitbox) {
        if (otherHitbox.getType() == "SPHERICAL_HITBOX") {
            let differenceBetweenCenters = vec3.create();
            vec3.scaleAndAdd(differenceBetweenCenters, this.getPosition(), otherHitbox.getPosition(), -1);
            if (vec3.length(differenceBetweenCenters) > this.getRadius() + otherHitbox.getRadius()) {
                return undefined;
            } else {
                return true;
            }
        }
    }
}