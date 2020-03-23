class Guard extends Enemy {
  constructor() {
    super();
    this.init(1, 1.5, 'hibiscus_color', 1, 1);
  }

  makeTree() {
    const isPlayerClose = (guard, player) => {
      return distance(player.getPosition(), guard.getPosition()) < 10;
    };

    const move = new ActionNode(() => {
      //move towards player
      return returnStatement.SUCCESS;
    })
    const atack = new ActionNode(() => {
      //atack player
      return returnStatement.SUCCESS;
    });
    let inAtackRange = new DecoratorNode(
      () => {
        return distance(player.getPosition(), guard.getPosition()) < 2;
      },

      atack
    );
    let chooseAtackOrMove = new SelectorNode(
      new Map([
        ['atack', atack],
        ['moveTowards', move],
      ])
    );
    let engage = new DecoratorNode(
      isPlayerClose.bind(null, this, gQuerySystem.getPlayer()), chooseAtackOrMove);

    let patroll = new ActionNode(() => {
      //move left and right;
    });
    let root = new SelectorNode(
      new Map([
        ['engage', engage],
        ['patroll', patroll],
      ])
    );
    let tree = new BehaviourTree(root);
  }
}

function distance(p1, p2) {
  return Math.sqrt(
    (p1[0] - p2[0]) ** 2 +
    (p1[1] - p2[1]) ** 2 +
    (p1[2] - p2[2]) ** 2);
}
