class BoxHitbox extends Hitbox {
    constructor(minX, minY, minZ, maxX, maxY, maxZ) {
        super("BOX_HITBOX");

        this.minX = minX;
        this.minY = minY;
        this.minZ = minZ;

        this.maxX = maxX;
        this.maxY = maxY;
        this.maxZ = maxZ;
    }

    intersects(otherHitbox) {
        if (otherHitbox.getType() == "SPHERICAL_HITBOX") {
            // get box closest point to sphere center by clamping
            let x = Math.max(this.object.getPosition()[0] + this.minX, Math.min(otherHitbox.getPosition()[0], this.object.getPosition()[0] + this.maxX));
            let y = Math.max(this.object.getPosition()[1] + this.minY, Math.min(otherHitbox.getPosition()[1], this.object.getPosition()[1] + this.maxY));
            let z = Math.max(this.object.getPosition()[2] + this.minZ, Math.min(otherHitbox.getPosition()[2], this.object.getPosition()[2] + this.maxZ));

            // this is the same as isPointInsideSphere
            let distance = vec3.create();
            vec3.scaleAndAdd(distance, [x, y, z], otherHitbox.getPosition(), -1)

            if (vec3.length(distance) < otherHitbox.getRadius())
                return true;
            else
                return undefined;

        }

        if (otherHitbox.getType() == "BOX_HITBOX") {
            if ((this.minX <= otherHitbox.maxX && this.maxX >= otherHitbox.minX) &&
                (this.minY <= otherHitbox.maxY && this.maxY >= otherHitbox.minY) &&
                (this.minZ <= otherHitbox.maxZ && this.maxZ >= otherHitbox.minZ))
                return true;
            else
                return undefined;
        }
    }
}