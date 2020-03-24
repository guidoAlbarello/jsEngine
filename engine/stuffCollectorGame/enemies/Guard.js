class Guard extends Enemy {
  constructor() {
    super();
    this.init(1, 1.5, 'hibiscus_color', 1, 1);
    //  this.patrollCenter = patrollCenter;
    this.direction = 1;
    this.addBehaviour(new GuardBehaviour(this));
  }

  setPatrollCenter(pc) {
    this.patrollCenter = pc;
  }

  walk(p) {
    return;
  };
}
class GuardBehaviour extends Behaviour {
  constructor(object) {
    super(object);
    this.makeTree();
    this.update =
      () => {
        this.tree.tick({});
      };
  }

  patrollBehaviour() {
    let patroll = new ActionNode(() => {
      if (distance(this.object.patrollCenter, this.object.getPosition()) > 3) {
        let d = (this.object.getPosition()[0] - this.object.patrollCenter[0]) > 0 ? -1 : 1;
        this.object.direction = d;
      }

      this.object.physicsComponent.setVelocityX(this.object.direction * 5);
      return returnStatement.SUCCESS;
    });

    new Selector(
      new Map([
        //      ['gotoPatrollPosition', gotoPatrollPos],
        ['patroll', patroll],
      ])
    );
    return patroll;
  }

  engageBehaviour() {
    const move = new ActionNode(() => {
      //move towards player
      let player = gQuerySystem.getPlayer();
      const direction =
        (this.object.getPosition()[0] - player.getPosition()[0]) > 0 ? -1 : 1;
      this.object.physicsComponent.setVelocityX(direction * 5);
      return returnStatement.SUCCESS;
    });
    const atack = new ActionNode(() => {
      //atack player
      return returnStatement.SUCCESS;
    });
    let inAtackRange = new DecoratorNode(
      new Map([
        ['', atack],
      ]),
      () => {
        return false;
        //return distance(player.getPosition(), guard.getPosition()) < 2;
      }
    );
    let chooseAtackOrMove = new Selector(
      new Map([
        //      ['atack', atack],
        ['moveTowards', move],
      ])
    );

    let engage = new DecoratorNode(
      new Map([
        ['', chooseAtackOrMove],
      ]),
      () => { //if player close engage
        let playerPos = gQuerySystem.getPlayer().getPosition();
        let guardPos = this.object.getPosition();
        return distance(playerPos, guardPos) < 10;
      }
    );
    return engage;
  }

  makeTree() {

    let root = new Selector(
      new Map([
        ['engage', this.engageBehaviour()],
        ['patroll', this.patrollBehaviour()],
      ])
    );
    this.tree = new BehaviourTree(root);
  }
}

function distance(p1, p2) {
  return Math.sqrt(
    (p1[0] - p2[0]) ** 2 +
    (p1[1] - p2[1]) ** 2 +
    (p1[2] - p2[2]) ** 2);
}

function scalarProduct(p1, k) {
  return [p1[0] * k, p1[1] * k, p1[2] * k];
}

function add(p1, p2) {
  return [p1[0] + p2[0], p1[1] + p2[1], p1[2] + p2[2]];
}
