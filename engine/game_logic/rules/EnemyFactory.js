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

    createRangeEnemy() {
        return new RangeEnemy();
    }
}