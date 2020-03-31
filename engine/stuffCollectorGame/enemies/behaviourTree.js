returnStatement = {
	SUCCESS: 'success',
	FAILED: 'fail',
	RUNNING: 'running',
};
class Node {
	constructor(children) {
		this.children = children || new Map();
		if (this.children.keys().length > 0) {
			this.children.setParent(this);
			for (var tag of this.children.keys()) {
				this.children.get(tag).setParent(this);
			}
		}
	}

	setParent(p) {
		this.parent = p;
	}
}
class DecoratorNode extends Node {
	constructor(child, condition) {
		super(child);
		this.condition = condition;
		this.child = Array.from(this.children.values())[0];
	}

	tick(blackboard) {
		if (this.condition()) {
			return this.child.tick(blackboard);
		}

		return returnStatement.FAILED;
	}

	resume(blackboard, returnValue) {
		return this.parent.resume(blackboard, returnValue);
	}
}

class CompositeNode extends Node {

	//decorators is a Map instance wit ('tag', node instance) pairs
	constructor(children) {
		super(children);
	}

	//d = ('tag', instance)
	addDecorator(d) {
		this.children[d[0]] = d[1];
	}

	removeDecorator(tag) {
		this.children.delete(tag);
	}

}

class Sequence extends CompositeNode {
	//decorators is a Map instance wit ('tag', decorator instance) pairs
	constructor(decorators) {
		super(decorators);
		//this.children = decorators;
		this.current = null;
	}

	tick(blackboard) {
		//tick all children until one returns as FAIL
		for (var tag of this.children.keys()) {
			this.current = tag;
			let ret = this.children.get(tag).tick(blackboard);
			if (ret !== returnStatement.SUCCESS) {
				return ret;
			}
		}

		return returnStatement.SUCCESS;
	}

	resume(blackboard, returnValue) {
		let catchUp = false;
		for (var tag of this.children.keys()) {
			this.current = tag;
			if ((tag === this.current) && !catchUp) {
				catchUp = true;
				continue;
			}

			let ret = this.children.get(tag).tick(blackboard);
			if (ret === returnStatement.FAILED) {
				return this.parent.resume(blackboard, ret);
			}
		}

		return this.parent.resume(blackboard, returnStatement.SUCCESS);
	}

}

class Selector extends CompositeNode {
	constructor(decorators) {
		super(decorators);
		//    this.children = decorators;
	}

	tick(blackboard) {
		for (var tag of this.children.keys()) {
			let ret = this.children.get(tag).tick(blackboard);
			if (ret === returnStatement.SUCCESS) {
				return ret;
			}
		}

		return returnStatement.FAILED;
	}

	resume(blackboard, returnValue) {
		if (returnValue === returnStatement.SUCCESS) {
			return this.parent.resume(blackboard, returnValue);
		}

		let catchUp = false;
		for (var tag of this.children.keys()) {
			if ((tag === this.current) && !catchUp) {
				catchUp = true;
				continue;
			}

			let ret = this.children.get(tag).tick(blackboard);
			if (ret === returnStatement.SUCCESS) {
				return this.parent.resume(blackboard, ret);
			}
		}

		return this.parent.resume(blackboard, returnStatement.FAILED);
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
		this.root.parent = this;
		this.blackboard = {};
		this.blackboard.running = null;
	}

	tick() {
		if (this.blackboard.running === null) {
			return this.root.tick(this.blackboard);
		}

		let ret = this.blackboard.running.tick(this.blackboard);
		if (this.ret !== returnStatement.RUNNING) {
			this.blackboard.running.parent.continue(ret);
			this.blackboard.running = this.root;
		}

	}

	resume(blackboard, ret) {
		return ret;
	}

}
