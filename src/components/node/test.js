import 'should';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Node from './';
import chainMethods from '../../test-util/chain-methods';

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
    chainMethods(node).should.equal(node);
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

  describe('transformations', () => {
    it('can have its translation set', () => {
      node.translation(1, 2, 3);

      node.build().should.have.property('translation', [1, 2, 3]);
    });

    it('can have its rotation set', () => {
      node.rotation(1, 2, 3, 4);

      node.build().should.have.property('rotation', [1, 2, 3, 4]);
    });

    it('can have its scale set', () => {
      node.scale(1, 2, 3);

      node.build().should.have.property('scale', [1, 2, 3]);
    });
  });

  describe('Mesh', () => {
    const meshIndexerStub = stub()
      .withArgs('meshes')
      .onFirstCall()
      .returns(42);

    const indexerStub = {
      indexOf: meshIndexerStub
    };

    it('can have a mesh set', () => {
      const meshStub = {
        build: stub().returns({})
      };

      node.mesh(meshStub);

      const output = node.build(indexerStub);

      output.should.have.property('mesh');
      output.mesh.should.equal(42);
    });
  });
});
