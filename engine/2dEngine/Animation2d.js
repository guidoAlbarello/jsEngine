class Animation2d {
    constructor() {
        this.frames = []
        this.timer = 0;
        this.currentFrame = 0;
    }

    addFrame(offsetX, offsetY, duration) {
        let frame = {
            "offsetX": offsetX,
            "offsetY": offsetY,
            "duration": duration
        }
        this.frames.push(frame);
    }

    update() {
        if (this.frames.length > 0) {
            this.timer += gDeltaTime;
            if (this.frames[this.currentFrame].duration <= this.timer) {
                this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                this.timer = 0;
            }
        }
    }

    getCurrentFrame() {
        return this.frames[this.currentFrame];
    }
}