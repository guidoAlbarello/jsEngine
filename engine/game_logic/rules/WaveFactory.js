class WaveFactory {
    constructor() {

    }

    createWave(waveNumber) {
        let melee = gEnemyFactory.createMeleeEnemy();
        melee.translate([2,0,0]);
        let range = gEnemyFactory.createRangeEnemy();
        range.translate([0,0,-3]);

        let condition = new Condition();
        condition.setInit(() => {
            this.KILL_COUNT_TO_WIN = 1;
        });
        condition.setCompletedCondition((gameStats) => {
            return gameStats.playerKillCount >= this.KILL_COUNT_TO_WIN;
        });

        let element = new Element();
        element.translate([5,0,0])
        return new Wave().addElement(element).addChaser(gEnemyFactory.createChaser()).addMeleeEnemy(melee).addRangeEnemy(range).addConditionToWin(condition);
    }
}