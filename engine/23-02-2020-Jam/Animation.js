class Animation {
    constructor(update) {
	this.update = () => {update(this.object)};
    }

    setCurve(curve){
        this.curve = curve;
        this.positionInCurve = 0.0;
        this.speed = 0.001;
        this.update = this.followCurve;
    }

    setObject(object) {
	this.object = object;
    }

    setUpdate(update) {
	this.update = () => {update(this.object)};
    }
    
    followCurve() {
	    this.object.modelMatrix = this.curve.sample(this.positionInCurve);
        this.positionInCurve = (this.positionInCurve + this.speed * gDeltaTime)%this.curve.length();
    }

    update() {

    }
}
