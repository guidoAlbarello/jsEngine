class QuerySystem {
  getPlayer() {
    let objects = this.getAllObjectsWithTag('player');
    if (!objects) return undefined;
    if (objects.length == 0) return undefined;
    return objects[0];
  }

  getAllObjectsWithTag(tag) {
    return gEntityManager.getEntitiesByTag()[tag];
  }
}
