import 'should';
import { describe, it, beforeEach } from 'mocha';
import { createStubInstance } from 'sinon';

import Scene from './index.js';
import Indexer from '../asset/indexer/index.js';
import Node from '../node/index.js';
import chainMethods from '../../test-util/chain-methods.js';

describe('Scene', () => {
  let scene: Scene;

  const indexStub = createStubInstance<Indexer>(Indexer);

  beforeEach(() => {
    scene = new Scene();
  });
  it('has no properties defined by default', () => {
    scene.build(indexStub).should.deepEqual({});
  });

  it('can have a name', () => {
    scene.name('scene name');

    scene.build(indexStub).should.have.property('name', 'scene name');
  });

  it('can have its setters chained', () => {
    chainMethods(scene).should.equal(scene);
  });

  describe('nodes', () => {
    it('can have nodes added', () => {
      const nodeStub = createStubInstance(Node);
      nodeStub.build.returns({});

      const indexerStub = createStubInstance(Indexer);
      indexerStub.indexOf
        .withArgs(nodeStub)
        .onFirstCall()
        .returns(42);

      scene.addNode(nodeStub);
      const output = scene.build(indexerStub);

      output.should.have.property('nodes');
      (output as { nodes: number[] }).nodes.length.should.equal(1);
      (output as { nodes: number[] }).nodes[0].should.equal(42);
    });
  });
});
