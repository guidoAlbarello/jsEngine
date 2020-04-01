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

    this.entities[newObject.getId()] = {object:newObject,
      class:objectClass.name};
    return newObject;
  }

  instantiateObjectWithTag(tag, objectClass, ...args) {
    let newObject = this.instantiateObject(objectClass, ...args);
    if (this.entitiesByTag[tag])
      this.entitiesByTag[tag].push(newObject);
    else
      this.entitiesByTag[tag] = [newObject];

    this.entities[newObject.getId()].tag = tag;
    return newObject;
  }

  destroyObject(objectId) {
    let entity = this.entities[objectId];
    this.removeFromEntitiesByClass(objectId,entity.class);
    this.removeFromEntitiesByTag(objectId,entity.tag);
    delete this.entities[objectId];
    entity.object.remove();
  }

  removeFromEntitiesByClass(objectId,nameClass){
    this.entitiesByClass[nameClass]=this.entitiesByClass[nameClass].filter(function(object, index, arr){ return object.getId() != objectId;})
  }

  removeFromEntitiesByTag(objectId,tag){
    this.entitiesByTag[tag]=this.entitiesByTag[tag].filter(function(object, index, arr){ return object.getId() != objectId;})
  }

  getEntitiesByTag() {
    return this.entitiesByTag;
  }
}
