class SphericalHitbox extends Hitbox {
    object;

    constructor(radius) {
        super("SPHERICAL_HITBOX");
        this.radius = radius;
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

        if (otherHitbox.getType() == "BOX_HITBOX") {
             // get box closest point to sphere center by clamping
             let x = Math.max(otherHitbox.minX, Math.min(this.getPosition()[0], otherHitbox.maxX));
             let y = Math.max(otherHitbox.minY, Math.min(this.getPosition()[1], otherHitbox.maxY));
             let z = Math.max(otherHitbox.minZ, Math.min(this.getPosition()[2], otherHitbox.maxZ));
 
             // this is the same as isPointInsideSphere
             let distance = vec3.create();
             vec3.scaleAndAdd(distance, otherHitbox.getPosition(), this.getPosition(), -1)
 
             if (vec3.length(distance) < this.getRadius()) {
                 return true 
             } else {
                 return undefined;
             }
        }
    }
}