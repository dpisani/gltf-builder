import 'should';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Node from './';

describe('Node', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('has no properties defined by default', () => {
    node.build().should.deepEqual({});
  });

  it('can have a name', () => {
    node.name('node name');

    node.build().should.have.property('name', 'node name');
  });

  it('can have its setters chained', () => {
    node.name().should.equal(node);
  });

  describe('children', () => {
    const sceneIndexerStub = stub()
      .withArgs('nodes')
      .onFirstCall()
      .returns(42)
      .onSecondCall()
      .returns(101);

    const indexerStub = {
      indexOf: sceneIndexerStub
    };

    it('can have nodes added', () => {
      const nodeStub = {
        build: stub().returns({})
      };

      node.addChild(nodeStub);
      node.addChild(nodeStub);
      const output = node.build(indexerStub);

      output.should.have.property('children');
      output.children.length.should.equal(2);
      output.children.should.deepEqual([42, 101]);
    });
  });
});
