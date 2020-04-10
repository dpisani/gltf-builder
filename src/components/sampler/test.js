import 'should';
import { describe, it, beforeEach } from 'mocha';

import chainMethods from '../../test-util/chain-methods';
import Sampler from './index';

describe('Sampler', () => {
  let sampler;

  beforeEach(() => {
    sampler = new Sampler();
  });

  it('has no properties defined by default', () => {
    sampler.build().should.deepEqual({});
  });

  it('can have a name', () => {
    sampler.name('sampler name');

    sampler.build().should.have.property('name', 'sampler name');
  });

  it('can have its setters chained', () => {
    chainMethods(sampler).should.equal(sampler);
  });

  it('can have a minFilter', () => {
    sampler.magFilter(9728);

    sampler.build().should.deepEqual({ magFilter: 9728 });
  });

  it('can have a minFilter', () => {
    sampler.minFilter(9984);

    sampler.build().should.deepEqual({ minFilter: 9984 });
  });

  it('can have a wrapS', () => {
    sampler.wrapS(33071);

    sampler.build().should.deepEqual({ wrapS: 33071 });
  });

  it('can have a wrapT', () => {
    sampler.wrapT(33071);

    sampler.build().should.deepEqual({ wrapT: 33071 });
  });
});
