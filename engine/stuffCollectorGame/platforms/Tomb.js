class Tomb extends Sprite {
    constructor() {
        super();
        this.init(2,1.3,"space_color", 1,1);

        this.level = 3;
        this.colorLevel = ["brown", "violet", "blue","space_color"];

        this.empty = false;

        let interactiveObj = new Interactive(2,1,1,function(){
        	if(this.object.level<0) this.remove();
        	this.object.level-=gDeltaTime;});
        interactiveObj.setObject(this);
        gDeveloperTools.drawHitbox(interactiveObj);
        this.addChild(interactiveObj);

        this.addBehaviour(this.createBehaviour(this));
    }

    createBehaviour(object){
        let behaviour = new Behaviour(object);

        behaviour.setUpdate(() => {
            if(!this.empty && behaviour.object.level <=0){
            	let organ = new Organ();
            	this.addChild(organ);
            	this.empty = true;
            }
            this.material.setTextureAtlas(this.colorLevel[Math.ceil(this.level)]);
        });

        return behaviour;
    }
}