class GameManager extends Object3d {
    TIME_BETWEEN_WAVES = 50;
    waveNumber = 0;

    constructor(scene) {
        super();
        this.lastFinishedWave = 0;
        this.scene = scene;
    }

    init() {
        this.loadWave();
    }

    update() {
        // Create new wave if current wave is over and TIME_BETWEEN_WAVES have passed
        if (this.lastFinishedWave >= this.TIME_BETWEEN_WAVES) {
            this.loadWave();
        } else if (!this.currentWave) {
            this.lastFinishedWave += gDeltaTime;
        }

        // Update current wave
        if (this.currentWave) {
            this.currentWave.update();

            // Check if the current wave is over
            if (this.currentWave.isOver()) {
                this.currentWave.terminate();
                this.currentWave = undefined;
                this.lastFinishedWave = 0;
                this.waveNumber += 1;
            }
        }
    }

    loadWave() {
        this.currentWave = gWaveFactory.createWave(this.waveNumber);
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