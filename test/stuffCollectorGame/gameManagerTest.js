const {
  describe,
} = require('mocha');
const {
  expect,
} = require('chai');
const GammeManager = require('../../engine/stuffCollectorGame/GameManager');
const assert = require('assert');

describe('Game Over method:', function() {
  before(() => {
    const objective = new Map([
      ['liver', 1],
      ['brain', 1],
      ['heart', 1],
    ]);
    const gm = new GameManager(new Scene(), objctive);
    const collectedCompleted = objective;
    const collectedNotCompleted = new Map();
  });

  it('should be true if hp below 0 and objective is completed', function() {
    expect(gm._gameOver(-1, collectedCompleted)).to.be.false;
  });

  it('should be true if hp below 0 and objective not completed', function() {
    expect(gm._gameOver(-1, collectedNotCompleted)).to.be.false;
  });

  it('should be true if hp above 0 and objective is completed', function() {
    expect(gm._gameOver(-1, collectedCompleted)).to.be.true;
  });

  it('should be false if hp above 0 and objective not completed', function() {
    expect(gm._gameOver(-1, collectedNotCompleted)).to.be.false;
  });
});
