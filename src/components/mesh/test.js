import 'should';
import { describe, it, beforeEach } from 'mocha';

import Mesh from './index';

describe('Mesh', () => {
  let mesh;

  beforeEach(() => {
    mesh = new Mesh();
  });

  it('has a primitives property by default', () => {
    mesh.build().should.deepEqual({ primitives: [] });
  });

  it('can have a name', () => {
    mesh.name('mesh name');

    mesh.build().should.have.property('name', 'mesh name');
  });

  it('can have its setters chained', () => {
    mesh
      .name()
      .addPrimitive()
      .should.equal(mesh);
  });

  it('can have primitives added', () => {
    const mockPrimitive1 = { build: () => 'primitive 1' };
    const mockPrimitive2 = { build: () => 'primitive 2' };

    mesh
      .addPrimitive(mockPrimitive1)
      .addPrimitive(mockPrimitive2)
      .build()
      .primitives.should.deepEqual(['primitive 1', 'primitive 2']);
  });
});
