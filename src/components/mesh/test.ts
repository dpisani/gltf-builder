import 'should';
import { describe, it, beforeEach } from 'mocha';

import Mesh from './index.js';
import { createStubInstance } from 'sinon';
import Indexer from '../asset/indexer/index.js';
import chainMethods from '../../test-util/chain-methods.js';
import Primitive from '../primitive/index.js';

describe('Mesh', () => {
  let mesh: Mesh;

  const indexStub = createStubInstance<Indexer>(Indexer);

  beforeEach(() => {
    mesh = new Mesh();
  });

  it('has a no properties by default', () => {
    mesh.build(indexStub).should.deepEqual({});
  });

  it('can have a name', () => {
    mesh.name('mesh name');

    mesh.build(indexStub).should.have.property('name', 'mesh name');
  });

  it('can have its setters chained', () => {
    chainMethods(mesh).should.equal(mesh);
  });

  it('can have primitives added', () => {
    const mockPrimitive1 = createStubInstance(Primitive);
    mockPrimitive1.build.returns({ value: 'primitive 1' });

    const mockPrimitive2 = createStubInstance(Primitive);
    mockPrimitive2.build.returns({ value: 'primitive 2' });

    (mesh
      .addPrimitive(mockPrimitive1)
      .addPrimitive(mockPrimitive2)
      .build(indexStub) as {
      primitives: Record<string, unknown>;
    }).primitives.should.deepEqual([
      { value: 'primitive 1' },
      { value: 'primitive 2' }
    ]);
  });
});
