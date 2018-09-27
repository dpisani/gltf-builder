import 'should';
import { describe, it, beforeEach } from 'mocha';

import Primitive from './index';

describe('Primitive', () => {
  let primitive;
  beforeEach(() => {
    primitive = new Primitive();
  });

  it('can have its setters chained', () => {
    primitive.mode().should.equal(primitive);
  });

  it('can have a primitive mode set', () => {
    primitive.mode(0);

    primitive.build().should.have.property('mode', 0);
  });

  describe.skip('geometry', () => {
    it('accepts points and represents the geometry as attributes', () => {
      primitive.addPoints([0, 0, 0], [0, 1, 0], [1, 1, 0]);

      primitive.build().attributes.should.deepEqual({});
    });
  });
});
