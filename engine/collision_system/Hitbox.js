class Hitbox {
  type;
  object;

  constructor(type) {
    this.type = type;
  }

  setObject(object) {
    this.object = object;
  }

  getType() {
    return this.type;
  }

  getPosition() {
    return this.object.getWorldPosition();
  }
}
