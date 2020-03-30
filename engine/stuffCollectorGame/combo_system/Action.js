class Action {
    constructor(name, object) {
        this.name = name;
        this.object = object;
        this.timer = 0;
        this.action_duration = 0;
    }

    init(data) {}
    animationReaction() {}
    gameplayReaction() {}

    execute(data) {
        // Add here interactions with other systems. Sound for example. 
        // Still need to lock animation and movement input while attacking. 
        console.log(this.name);
        this.timer = 0;
        this.init(data);
   //     this.animationReaction();
        this.gameplayReaction();
    }

    getName() {
        return this.name;
    }

    canSwitch() {
        return true;
    }

    update() {
        this.timer += gDeltaTime;
    }

    getTimer() {
        return this.timer;
    }

    getActionDuration() {
        return this.action_duration;
    }

    clean() {}
}
