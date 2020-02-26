function distance(p1, p2) {
    return Math.sqrt(
        (p1[0] - p2[0]) ** 2
        + (p1[1] - p2[1]) ** 2
        + (p1[2] - p2[2]) ** 2);
}

function dotProduct(p1, p2) {
    return p1[0] * p2[0] + p1[1] * p2[1] + p1[2] * p2[2];
}

function scalarProduct(p1, k) {
    return [p1[0] * k, p1[1] * k, p1[2] * k];
}

function add(p1, p2) {
    return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];
}
function angle(p1, p2) {
    return Math.acos(dotProduct(p1, p2)
        / (dotProduct(p1, p2) * dotProduct(p1, p2)));
}
function normalize(v) {
    return scalarProduct(v, 1 / Math.sqrt(dotProduct(v, v)));
}
class RangeEnemyBehaviour extends Behaviour {
    life = 100;
    speed = 1;
    damage = 10;
    range = 100;
    view = [1, 0, 0];
    lastEnemyPos = undefined;
    timeSinceEnemyDetected = 0;
    stance = "chill";

    // In shoots per second
    MIN_SHOOTING_SPEED = 1;
    MAX_SHOOTING_SPEED = 3;

    CHANCE_TO_SHOOT = 0.2;

    constructor(actor, player, maxShootingSpeed) {
        super();
        //	this.attackCallback = attackCallback;
        this.actor = actor;
        this.player = player;
        this.shooting_speed = this.MIN_SHOOTING_SPEED + Math.random() * maxShootingSpeed;
        this.shootingTimer = 0;
        this.update = () => { this.react() };
    }

    inSight(playerPos) {
        let inRange = (distance(playerPos, this.actor.getPosition()) < this.range);
        let angl = angle(playerPos - this.actor.getPosition(), this.view);
        let inViewDirection = true;
        return inRange && inViewDirection;
    }
    terrainInTheWay(pos) {
        return false;
    }
    scanForTargets(playerPos, terrainElements) {
        if (!this.inSight(playerPos) || this.terrainInTheWay(playerPos)) {
            return undefined;
        }
        this.lastEnemyPos = playerPos;
        this.stance = "no chill";
        return playerPos;
    }
    rotate(angle) {
        return;
    }
    moveTowards(playerPos) {
        //	let angleRotation = angle(playerPos-this.actor.getPosition(),this.view);
        //	this.rotate(angleRotation);
        let newDirection =
            normalize(add(playerPos, scalarProduct(this.actor.getPosition(), -1)));
        //	console.log(newDirection);
        this.actor.physicsComponent.setVelocity(newDirection);
    }

    increaseTimeSinceEnemyDetected() {
        if (this.timeSinceEnemyDetected > 30) {
            return;
        }
        this.timeSinceEnemyDetected += 1;
    }
    relocate(targetPos) {
        if (targetPos != undefined) {
            this.moveTowards(targetPos);
            this.increaseTimeSinceEnemyDetected();
            return;
        }
        if (this.timeSinceEnemyDetected > 0) {
            this.moveTowards(this.lastEnemyPos);
            return;
        }
        else {
            //random patroll mvmnt
            return;
        }

    }

    attack(targetPos) {
        if (targetPos == undefined) {
            return;
        }
        let direction = add(targetPos, scalarProduct(this.actor.getPosition(), -1));
        this.actor.shoot(direction);
    }
    react() {
        //	console.log("react");
        let playerPos = this.player.getPosition();
        //	console.log(this.player.getPosition());
        let terrainElements = [];
        let targetPos = this.scanForTargets(playerPos, terrainElements);
        this.relocate(targetPos);

        if (this.shootingTimer >= (1 / this.shooting_speed)) {
            if (Math.random() > (1 - this.CHANCE_TO_SHOOT))
                this.attack(targetPos);
            this.shootingTimer = 0;
        } else {
            this.shootingTimer += gDeltaTime;
        }
    }

    takeDamage(dmg, dmgSrc) {
        this.life -= dmg;
        this.turnArround(dmgSrc);
    }
}

class RangeEnemy extends Object3d {
    MIN_RPOJECTILE_SPEED = 1;
    MAX_PROJECTILE_SPEED = 3;
    size = 0.5;

    constructor(player, maxShootingSpeed) {
        super();
        console.log(player);
        this.player = player;
        this.projectileSpeed = this.MIN_RPOJECTILE_SPEED + Math.random() * this.MAX_PROJECTILE_SPEED;
        let sphere = gSurfaceCreator.makeSphere(this.size, 40);
        let material = new PBRMaterial();
        material.setAlbedo("red");
        sphere.setMaterial(material);
        sphere.id = this.id;

        this.setHitbox(new SphericalHitbox(this.size));
        gCollisionDetection.registerCollidable(this, 'enemy');

        this.setPhysicsComponent(new PhysicsComponent());
        this.physicsComponent.setDontFall(true);
        this.addChild(sphere);

        this.setBehaviour(new RangeEnemyBehaviour(this, player, maxShootingSpeed));

        this.translate([0, this.size, 0]);
    }

    shoot(direction) {
        let projectile = gSurfaceCreator.makeSphere(0.05, 4);
        let material = new PBRMaterial();
        material.setAlbedo("violet");
        projectile.setMaterial(material);
        let collider = new Collider('player');
        collider.setOnCollisionEnter((otherObject) => {
            alert("Game over. Enemies killed: " + otherObject.playerStats.killCount);
            otherObject.remove();
            projectile.remove();
        });
        projectile.addCollider(collider);
        projectile.behaviour.setUpdate(() => {
            if (this.getPosition()[1] <= 0) {
                this.remove();
            }
        });
        projectile.setHitbox(new SphericalHitbox(0.05));
        projectile.modelMatrix = mat4.create();
        mat4.copy(projectile.modelMatrix, this.modelMatrix);
        // projectile.modelMatrix[13] = 3 * this.size;
        projectile.setPhysicsComponent(new PhysicsComponent());
        projectile.physicsComponent.setGravity(0.3);
        direction[1] += 1;
        projectile.physicsComponent.setVelocity(vecMulScalar(direction, this.projectileSpeed));
        let parent = this.parent;
        while (parent.parent) {
            parent = parent.parent;
        }
        parent.addChild(projectile);

    }
}
