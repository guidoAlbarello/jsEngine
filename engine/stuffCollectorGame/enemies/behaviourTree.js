returnStatement = {
  SUCCESS: 'success',
  FAILED: 'fail',
  RUNNING: 'running',
};

class DecoratorNode {
  constructor(condition, child) {
    this.condition = condition;
    this.child = child;
  }

  tick(blackboard) {
    if (this.condition()) {
      return this.child.tick(blackboard);
    }

    return returnStatement.SUCCESS;
  }
}

class CompositeNode {

  //decorators is a Map instance wit ('tag', decorator instance) pairs
  constructor(decorators) {
    this.decorators = decorators;
  }

  tick(blackboard) {
    //excecutes all decorators until one returns as running
    for (var tag of this.decorators.keys()) {

      let ret = this.decorators.get(tag).tick(blackboard);
      if (ret == returnStatement.RUNNING) {
        return ret;
      }
    }

    return returnStatement.SUCCESS;
  }

  //d = ('tag', instance)
  addDecorator(d) {
    this.decorators[d[0]] = d[1];
  }

  removeDecorator(tag) {
    this.decorators.delete(tag);
  }

}

class Selector extends CompositeNode {
  constructor(decorators) {
    super();
  }

  tick(blackboard) {
    for (var tag of this.decorators.keys()) {

      let ret = this.decorators.get(tag).tick(blackboard);
      if (ret !== returnStatement.SUCCESS) {
        return ret;
      }
    }

    return returnStatement.FAILED;
  }

}
class ActionNode {
  constructor(action) {
    this.action = action;
  }

  tick(blackboard) {
    let ret = this.action();
    if (ret === returnStatement.RUNNING) {
      blackboard.running = this;
    }

    return ret;
  }
}

class BehaviourTree {
  constructor(root) {
    this.root = root;
    this.running = root;
  }

  tick() {
    let ret = this.running.tick(blackboard);
    if (this.running === null) {
      this.running = this.root;
    }

  }

}
