import 'should';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Scene from './';

describe('Scene', () => {
  let scene;
  beforeEach(() => {
    scene = new Scene();
  });
  it('has no properties defined by default', () => {
    scene.build().should.deepEqual({});
  });

  it('can have a name', () => {
    scene.name('scene name');

    scene.build().should.have.property('name', 'scene name');
  });

  it('can have its setters chained', () => {
    scene.name().should.equal(scene);
  });

  describe('nodes', () => {
    const sceneIndexerStub = stub()
      .withArgs('nodes')
      .onFirstCall()
      .returns(42);
    const indexerStub = {
      indexOf: sceneIndexerStub
    };
    it('can have nodes added', () => {
      const nodeStub = {
        build: stub().returns({})
      };

      scene.addNode(nodeStub);
      const output = scene.build(indexerStub);

      output.should.have.property('nodes');
      output.nodes.length.should.equal(1);
      output.nodes[0].should.equal(42);
    });
  });
});
