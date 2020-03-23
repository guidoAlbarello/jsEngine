class EntityManager {
  constructor() {
    // We can refactor to have a better structure to organice objects. For now this is sufficient.
    this.entitiesByClass = [];
    this.entities = [];
    this.entitiesByTag = [];
  }

  instantiateObject(objectClass, ...args) {
    // I love you js. You're unbelievable.
    let newObject = new objectClass(...args);
    if (this.entitiesByClass[objectClass.name])
      this.entitiesByClass[objectClass.name].push(newObject);
    else
      this.entitiesByClass[objectClass.name] = [newObject];

    this.entities[newObject.getId()] = newObject;
    return newObject;
  }

  instantiateObjectWithTag(tag, objectClass, ...args) {
    let newObject = this.instantiateObject(objectClass, ...args);
    if (this.entitiesByTag[tag])
      this.entitiesByTag[tag].push(newObject);
    else
      this.entitiesByTag[tag] = [newObject];

    return newObject;
  }

  // This may not work... :) [WIP]
  destroyObject(objectId) {
    delete this.entities[objectId];
  }

  getEntitiesByTag() {
    return this.entitiesByTag;
  }
}
