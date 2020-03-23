class HealthPoints extends Sprite {
  constructor(hp=0) {
    super(1, 0.5, 'crimson_color', 1, 1);
    this.hp = hp;
  }

  getHP() {
    return this.hp;
  }

  setHP(newHP) {
    this.hp = newHP;
  }

  subtract(damage){
    this.hp-=damage;
  }
}