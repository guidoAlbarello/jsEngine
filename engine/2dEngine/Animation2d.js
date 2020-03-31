class Animation2d {
    static fromRow(row_number, col_i, n_frames, duration, flip = false) {
      let animation = new Animation2d();
      let col_f = col_i + n_frames;

      for (let col = col_i; col < col_f; ++col) {
        animation.addFrame(col, row_number, duration, flip);
      }
      return animation;
    }

    constructor() {
        this.frames = []
        this.timer = 0;
        this.currentFrame = 0;
        this.freezeTimer = 0;
        this.freezeDuration = 0;
    }

    addFrame(offsetX, offsetY, duration, flip = false) {
        let frame = {
            "offsetX": offsetX,
            "offsetY": offsetY,
            "duration": duration,
            "flip": flip
        }
        this.frames.push(frame);
    }

    update() {
        if (this.frames.length > 0) {
            if (this.freezeTimer >= this.freezeDuration) {
                this.freezeTimer = 0;
                this.timer += gDeltaTime;
                if (this.frames[this.currentFrame].duration <= this.timer) {
                    this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                    this.timer = 0;
                }
            } else {
                this.freezeTimer += gDeltaTime;
            }
        }
    }

    // Adds the frames of another animation, while maintaining the rest of the properties.
    addAnimation(otherAnimation) {
      this.frames = this.frames.concat(otherAnimation.frames);
      return this;
    }

    getCurrentFrame() {
        return this.frames[this.currentFrame];
    }

    freeze(secondsToFreeze) {
        this.freezeDuration = secondsToFreeze;
    }
}
