class EnemyFactory {
    constructor() {
        
    }

    // Dummy cration methods for testing purposes. 
    createChaser() {
        return new Chaser();
    }

    createMeleeEnemy() {
        return new MeleeEnemy();
    }

    createRangeEnemy(player, maxShootingSpeed) {
        return new RangeEnemy(player, maxShootingSpeed, maxShootingSpeed/2);
    }
}
