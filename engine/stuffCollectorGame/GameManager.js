class GameManager extends Object3d {
  constructor(scene, objective) {
    super();
    this.scene = scene;
    this.objective = objective;
  }

  init() {
    this.generateGuards();
  }

  generateGuards() {
    let entity = gEntityManager.instantiateObjectWithTag('guard1', Guard);
    entity.setPatrollCenter([8, 3, 0]);
    entity.translate([8, 3, 0]);
    this.scene.addChild(entity);
    return;
  }

  update() {
    const player = gQuerySystem.getPlayer();
    const hp = player.getHP();
    const organsCollected = player.getInventory();

    //console.log(organsCollected);
    //debugger;
    if (this._gameOver(hp, organsCollected)) {
      this.scene.destroy();
    }

    return;
  }

  _gameOver(hp, organsCollected) {
    return (hp <= 0) || this._allOrgansCollected(organsCollected);
  }

  _allOrgansCollected(organs) {

    return Array.from(this.objective.keys()).reduce((acum, key) => {
      return acum && organs.has(key) && (organs[key] >= this.objective[key]);
    }, true);
  }
}
