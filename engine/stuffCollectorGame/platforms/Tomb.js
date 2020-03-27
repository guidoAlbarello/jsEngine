class Tomb extends Sprite {
    constructor() {
        super();
        this.init(2,1.3,"space_color", 1,1);
        this.level = 4;

        let interactiveObj = new Interactive(2,1,1,function(){
        	if(this.object.level>0) this.object.level-=gDeltaTime;
        	console.log(this.object.level);});
        interactiveObj.setObject(this);
        gDeveloperTools.drawHitbox(interactiveObj);
        this.addChild(interactiveObj);
    }
}