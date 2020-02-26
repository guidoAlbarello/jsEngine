class GameManager extends Object3d {
    TIME_BETWEEN_WAVES = 1;
    waveNumber = 0;
    gameStats = {
        'playerKillCount': 0
    };

    constructor(scene) {
        super();
        this.lastFinishedWave = 0;
        this.scene = scene;
    }

    init() {
        this.loadWave();
    }

    update() {
        this.gameStats.playerKillCount = this.scene.getController().getPlayer().playerStats.killCount;
        // Create new wave if current wave is over and TIME_BETWEEN_WAVES have passed        
        if (!this.currentWave) {
            if (this.lastFinishedWave >= this.TIME_BETWEEN_WAVES) {
                console.log('Load new wave');
                this.loadWave();
            } else {
                this.lastFinishedWave += gDeltaTime;
            }
        }

        // Update current wave
        if (this.currentWave) {
            this.currentWave.update();

            // Check if the current wave is over
            if (this.currentWave.isOver(this.gameStats)) {
                console.log("End wave")
                this.currentWave.terminate();
                this.currentWave = undefined;
                this.lastFinishedWave = 0;
                this.waveNumber += 1;
            }
        }
    }

    loadWave() {
	console.log(  this.scene.getController().getPlayer());
        this.currentWave = gWaveFactory.createWave(this.waveNumber, this.scene.getController().getPlayer());
        this.currentWave.init(this.gameStats);
        for (let i = 0; i < this.currentWave.enemies.length; i++)
            this.scene.addChild(this.currentWave.enemies[i]);
        for (let i = 0; i < this.currentWave.chasers.length; i++)
            this.scene.addChild(this.currentWave.chasers[i]);
        for (let i = 0; i < this.currentWave.elements.length; i++)
            this.scene.addChild(this.currentWave.elements[i]);
    }

    destroy() {

    }
}
