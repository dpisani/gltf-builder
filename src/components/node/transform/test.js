import 'should';

import { describe, it, beforeEach } from 'mocha';

import Transform from './index';

describe('Node transform descriptor', () => {
  let transform;

  beforeEach(() => {
    transform = new Transform();
  });

  it('builds an empty object by default', () => {
    transform.build().should.deepEqual({});
  });

  it('can have its setters chained', () => {
    transform
      .translation()
      .rotation()
      .scale()
      .should.equal(transform);
  });

  it('can have its translation set', () => {
    transform
      .translation(1, 2, 3)
      .build()
      .should.deepEqual({ translation: [1, 2, 3] });
  });

  it('can have its rotation set', () => {
    transform
      .rotation(1, 2, 3, 4)
      .build()
      .should.deepEqual({ rotation: [1, 2, 3, 4] });
  });

  it('can have its scale set', () => {
    transform
      .scale(1, 2, 3)
      .build()
      .should.deepEqual({ scale: [1, 2, 3] });
  });
});
