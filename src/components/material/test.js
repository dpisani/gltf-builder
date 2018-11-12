import 'should';

import { describe, it, beforeEach } from 'mocha';

import Material from './index';
import chainMethods from '../../test-util/chain-methods';

describe('Material', () => {
  let material;

  beforeEach(() => {
    material = new Material();
  });

  it('has no properties defined by default', () => {
    material.build().should.deepEqual({});
  });

  it('can have a name', () => {
    material.name('material name');

    material.build().should.have.property('name', 'material name');
  });

  it('can have its setters chained', () => {
    chainMethods(material).should.equal(material);
  });

  it('can have an emissive factor', () => {
    material
      .emissiveFactor([0, 0.5, 1])
      .build()
      .should.deepEqual({
        emissiveFactor: [0, 0.5, 1]
      });
  });

  it('can have an alpha mode', () => {
    material
      .alphaMode('OPAQUE')
      .build()
      .should.deepEqual({ alphaMode: 'OPAQUE' });
  });

  it('can have an alpha cutoff', () => {
    material
      .alphaCutoff(0.42)
      .build()
      .should.deepEqual({ alphaCutoff: 0.42 });
  });

  it('can have double sided set', () => {
    material
      .doubleSided(true)
      .build()
      .should.deepEqual({ doubleSided: true });
  });
});
