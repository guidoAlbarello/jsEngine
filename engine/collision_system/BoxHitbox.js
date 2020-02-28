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
            if ((this.object.getPosition()[0] + this.minX <= otherHitbox.getPosition()[0] + otherHitbox.maxX && this.object.getPosition()[0] + this.maxX >= otherHitbox.getPosition()[0] + otherHitbox.minX) &&
                (this.object.getPosition()[1] + this.minY <= otherHitbox.getPosition()[1] + otherHitbox.maxY && this.object.getPosition()[1] + this.maxY >= otherHitbox.getPosition()[1] + otherHitbox.minY) &&
                (this.object.getPosition()[2] + this.minZ <= otherHitbox.getPosition()[2] + otherHitbox.maxZ && this.object.getPosition()[2] + this.maxZ >= otherHitbox.getPosition()[2] + otherHitbox.minZ))
                return true;
            else
                return undefined;
        }
    }

    getMinX() {
        return this.object.getPosition()[0] + this.minX;
    }

    getMinY() {
        return this.object.getPosition()[1] + this.minY;
    }

    getMinZ() {
        return this.object.getPosition()[2] + this.minZ;
    }

    getMaxX() {
        return this.object.getPosition()[0] + this.maxX;
    }

    getMaxY() {
        return this.object.getPosition()[1] + this.maxY;
    }

    getMaxZ() {
        return this.object.getPosition()[2] + this.maxZ;
    }
}