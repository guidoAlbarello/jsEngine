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
