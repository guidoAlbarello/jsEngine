class WaveFactory {
    constructor() {

    }

    createWave(waveNumber,player) {
        let wave = new Wave();

        let condition = new Condition();
        condition.setInit((gameStats) => {
            this.KILL_COUNT_TO_WIN = gameStats.playerKillCount + waveNumber;
        });
        condition.setCompletedCondition((gameStats) => {
            return gameStats.playerKillCount >= this.KILL_COUNT_TO_WIN;
        });

        if (waveNumber == 1) {
            let element = new Element();
            element.translate([5, 0, 0])

            let element2 = new Element();
            element2.translate([5, 0, 38])

            let element3 = new Element();
            gDeveloperTools.drawHitbox(element3);
            element3.translate([10, 0, 10]);
            wave.addElement(element).addElement(element2).addElement(element3);
        }

        for (let i = 0; i < waveNumber; i++) {
            let range = gEnemyFactory.createRangeEnemy(player, Math.floor(waveNumber));
            gDeveloperTools.drawHitbox(range);
            range.translate([(10 + Math.random() * 35) * (2 * Math.random() - 1), 0.6, (10 + Math.random() * 35) * (2 * Math.random() - 1)]);
            wave.addRangeEnemy(range);
        }

        return wave.addConditionToWin(condition);
    }
}
