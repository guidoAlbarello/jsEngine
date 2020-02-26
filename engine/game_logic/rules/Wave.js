class Wave {
    constructor() {
        this.conditionsToWin = [];
        this.enemies = [];
        this.chasers = [];
        this.elements = [];
    }

    addChaser(chaser) {
        this.chasers.push(chaser);
        return this;
    }

    addRangeEnemy(enemy) {
        this.enemies.push(enemy);
        return this;
    }

    addMeleeEnemy(enemy) {
        this.enemies.push(enemy);
        return this;
    }

    addElement(element) {
        this.elements.push(element);
        return this;
    }

    addConditionToWin(condition) {
        this.conditionsToWin.push(condition);
        return this;
    }

    isOver(gameStats) {
        for (let i = 0; i < this.conditionsToWin.length; i++) {
            if (!this.conditionsToWin[i].completed(gameStats))
                return false;
        }
        return true;
    }

    init(gameStats) {
        for (let i = 0; i < this.conditionsToWin.length; i++) {
            this.conditionsToWin[i].init(gameStats);
        }
    }

    terminate() {

    }

    update() {
        if (this.enemies.length >0)
        this.enemies[0].shoot([0,1,0]);
    }
}