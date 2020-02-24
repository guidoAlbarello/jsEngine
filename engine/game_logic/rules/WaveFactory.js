class WaveFactory {
    constructor() {

    }

    createWave(waveNumber) {
        let melee = gEnemyFactory.createMeleeEnemy();
        melee.translate([2,0,0]);
        let range = gEnemyFactory.createRangeEnemy();
        range.translate([0,0,-3]);
        return new Wave().addChaser(gEnemyFactory.createChaser()).addMeleeEnemy(melee).addRangeEnemy(range);
    }
}