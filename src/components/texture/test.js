import 'should';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import chainMethods from '../../test-util/chain-methods';
import Texture from './index';

describe('Texture', () => {
  let texture;

  beforeEach(() => {
    texture = new Texture();
  });

  it('has no properties defined by default', () => {
    texture.build().should.deepEqual({});
  });

  it('can have a name', () => {
    texture.name('texture image name');

    texture.build().should.have.property('name', 'texture image name');
  });

  it('can have its setters chained', () => {
    chainMethods(texture).should.equal(texture);
  });

  it('can have a sampler', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const samplerStub = {
      build: stub().returns({})
    };

    texture.sampler(samplerStub);

    texture.build(indexStub).should.deepEqual({ sampler: 42 });
  });

  it('can have a source', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const textureImageStub = {
      build: stub().returns({})
    };

    texture.source(textureImageStub);

    texture.build(indexStub).should.deepEqual({ source: 42 });
  });
});
