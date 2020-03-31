function assertEQ(x, y, errmsg) {
  if (x != y) {
    console.log('%cTEST FAILED ' + errmsg, 'color: red');
    console.log(x + ' not equal to ' + y);
    console.log('\n');
  } else {
    console.log('%cTEST PASSED ' + errmsg, 'color: green');

  }
}

function testActionNodes() {
  let failsInOneTick = new ActionNode(() => {
    return returnStatement.FAILED;
  });

  let successInOneTick = new ActionNode(() => {
    return returnStatement.SUCCESS;
  });

  n = 4; // en este caso n es infomación externa al arbol
  let successAfterN = new ActionNode(() => {
    //console.log('n = ' + n);
    if (n == 0) {
      return returnStatement.SUCCESS;
    }

    n = n - 1;
    return returnStatement.RUNNING;
  });

  let blackboard = {};

  assertEQ(returnStatement.SUCCESS,
    successInOneTick.tick(blackboard),
    'Success in one tick');

  assertEQ(returnStatement.FAILED,
    failsInOneTick.tick(blackboard),
    'Fail in one tick');

  assertEQ(returnStatement.RUNNING, successAfterN.tick(blackboard), 'Success in five ticks n=4');
  assertEQ(returnStatement.RUNNING, successAfterN.tick(blackboard), 'Success in five ticks n=3');
  assertEQ(returnStatement.RUNNING, successAfterN.tick(blackboard), 'Success in five ticks n=2');
  assertEQ(returnStatement.RUNNING, successAfterN.tick(blackboard), 'Success in five ticks n=1');
  assertEQ(returnStatement.SUCCESS, successAfterN.tick(blackboard), 'Success in five ticks n=0');
}

function testDecoratorNodes() {
  console.log('\n DECORATOR TESTS');
  let action = new ActionNode(() => {
    return returnStatement.RUNNING;
  });
  let child = new Map([
    ['', new Sequence(new Map(
      [
        ['action', action],
      ]))]
  ]); //so it fails if condition is true

  playerPos = 5;
  let condition = () => { //hace algo si el player está cerca
    if (playerPos < 3) {
      return true;
    }

    return false;
  };

  let decorator = new DecoratorNode(child, condition);
  assertEQ(returnStatement.FAILED, decorator.tick({}),
    'Decorator evalueates condition succesfully if false');
  playerPos = 1;
  assertEQ(returnStatement.RUNNING, decorator.tick({}),
    'Decorator evalueates condition succesfully if true');
}

function treeTests() {
  console.log('\n DECORATOR TESTS');
  let action = new ActionNode(() => {
    return returnStatement.RUNNING;
  });
  let child = new Map([
    ['', new Sequence(new Map(
      [
        ['action', action],
      ]))]
  ]); //so it fails if condition is true

  playerPos = 5;
  let condition = () => { //hace algo si el player está cerca
    if (playerPos < 3) {
      return true;
    }

    return false;
  };

  let decorator = new DecoratorNode(child, condition);
  assertEQ(returnStatement.SUCCESS, decorator.tick({}),
    'Decorator evalueates condition succesfully if false');
  playerPos = 1;
  assertEQ(returnStatement.RUNNING, decorator.tick({}),
    'Decorator evalueates condition succesfully if true');
}
