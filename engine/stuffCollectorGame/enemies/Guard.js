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

  makeTree() {
    const isPlayerClose = (guard, player) => {
      return distance(player.getPosition(), guard.getPosition()) < 10;
    };

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
      isPlayerClose.bind(null, this.object, gQuerySystem.getPlayer())
    );

    let patroll = new ActionNode(() => {
      //move left and right;
      let player = gQuerySystem.getPlayer();
      if (distance(this.object.patrollCenter, this.object.getPosition()) > 3) {
        this.object.direction *= -1;
      }

      this.object.physicsComponent.setVelocityX(this.object.direction * 5);
      return returnStatement.SUCCESS;
    });
    let root = new Selector(
      new Map([
        ['engage', engage],
        ['patroll', patroll],
      ], null)
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
