class GameManager extends Object3d {
	constructor(scene, objective) {
		super();
		this.scene = scene;
		this.objective = objective;
	}

	init() {
		//this.generateGuards();
	}

	generateGuards() {
		let entity = gEntityManager.instantiateObjectWithTag("guard1", Guard );
		entity.setPatrollCenter([ 8, 3, 0 ]);
		entity.translate([ 8, 3, 0 ]);
		this.scene.addChild( entity );
		return;
	}

	update() {
		const player = gQuerySystem.getPlayer();
		const hp = player.getHP();
		const organsCollected = player.getInventory();
		if ( this._playerWon( organsCollected ) ) {
			document.getElementById("my-canvas").style.display = "none";
			document.getElementById("img-win").style.display = "block";
		} else if ( this._playerDead( hp ) ) {
			document.getElementById("my-canvas").style.display = "none";
			document.getElementById("img").style.display = "block";
		}

	}
	_playerWon(organs) {
		console.log(gQuerySystem.getPlayer().inventory);
		return gQuerySystem.getPlayer().onEndPlatform && this._allOrgansCollected( organs );
	}

	_playerDead(hp) {
		return (hp <= 0);
	}
	_gameOver(hp, organs) {
		return this._playerDead( hp ) || this._playerWon( organs );
	}
	_allOrgansCollected(organs) {

		return Array.from( this.objective.keys() ).reduce( (acum, key) => {
			//	console.log(acum, key, organs.get(key));
			return acum && organs.has( key ) && (organs.get( key ) >= this.objective.get( key ));
		}, true );
	}
}
