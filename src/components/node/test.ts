import 'should';
import { describe, it, beforeEach } from 'mocha';
import { createStubInstance, match } from 'sinon';

import Node from './index.js';
import chainMethods from '../../test-util/chain-methods.js';
import Indexer from '../asset/indexer/index.js';
import Mesh from '../mesh/index.js';

describe('Node', () => {
  let node: Node;

  const indexStub = createStubInstance<Indexer>(Indexer);

  beforeEach(() => {
    node = new Node();
  });

  it('has no properties defined by default', () => {
    node.build(indexStub).should.deepEqual({});
  });

  it('can have a name', () => {
    node.name('node name');

    node.build(indexStub).should.have.property('name', 'node name');
  });

  it('can have its setters chained', () => {
    chainMethods(node).should.equal(node);
  });

  describe('children', () => {
    it('can have nodes added', () => {
      const nodeStub = createStubInstance(Node);
      nodeStub.build.returns({});

      const nodeStub2 = createStubInstance(Node);
      nodeStub2.build.returns({});

      const indexerStub = createStubInstance(Indexer);
      indexerStub.indexOf.withArgs(match.same(nodeStub)).returns(42);
      indexerStub.indexOf.withArgs(match.same(nodeStub2)).returns(101);

      node.addChild(nodeStub);
      node.addChild(nodeStub2);
      const output = node.build(indexerStub);

      output.should.have.property('children');
      (output as { children: number[] }).children.length.should.equal(2);
      (output as { children: number[] }).children.should.deepEqual([42, 101]);
    });
  });

  describe('transformations', () => {
    it('can have its translation set', () => {
      node.translation(1, 2, 3);

      node.build(indexStub).should.have.property('translation', [1, 2, 3]);
    });

    it('can have its translation set with an array', () => {
      node.translation([1, 2, 3]);

      node.build(indexStub).should.have.property('translation', [1, 2, 3]);
    });

    it('can have its rotation set', () => {
      node.rotation(1, 2, 3, 4);

      node.build(indexStub).should.have.property('rotation', [1, 2, 3, 4]);
    });

    it('can have its rotation set with an array', () => {
      node.rotation([1, 2, 3, 4]);

      node.build(indexStub).should.have.property('rotation', [1, 2, 3, 4]);
    });

    it('can have its scale set', () => {
      node.scale(1, 2, 3);

      node.build(indexStub).should.have.property('scale', [1, 2, 3]);
    });

    it('can have its scale set with an array', () => {
      node.scale([1, 2, 3]);

      node.build(indexStub).should.have.property('scale', [1, 2, 3]);
    });

    it('can have a matrix set', () => {
      node.matrix([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

      node
        .build(indexStub)
        .should.have.property('matrix', [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16
        ]);
    });
  });

  describe('Mesh', () => {
    const indexerStub = createStubInstance(Indexer);
    indexerStub.indexOf.onFirstCall().returns(42);

    it('can have a mesh set', () => {
      const meshStub = createStubInstance(Mesh);
      meshStub.build.returns({});

      node.mesh(meshStub);

      const output = node.build(indexerStub);

      output.should.have.property('mesh');
      (output as { mesh: number }).mesh.should.equal(42);
    });
  });
});
