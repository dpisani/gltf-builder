import 'should';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import MetallicRoughness from './index';
import chainMethods from '../../../test-util/chain-methods';

describe('MetallicRoughness', () => {
  let metallicRoughness;

  beforeEach(() => {
    metallicRoughness = new MetallicRoughness();
  });

  it('has no properties defined by default', () => {
    metallicRoughness.build().should.deepEqual({});
  });

  it('can have its setters chained', () => {
    chainMethods(metallicRoughness).should.equal(metallicRoughness);
  });

  it('can have its base color factor set', () => {
    metallicRoughness
      .baseColorFactor([0, 0.1, 0.2, 0.3])
      .build()
      .should.deepEqual({ baseColorFactor: [0, 0.1, 0.2, 0.3] });
  });

  it('can have its metallic factor set', () => {
    metallicRoughness
      .metallicFactor(0.42)
      .build()
      .should.deepEqual({ metallicFactor: 0.42 });
  });

  it('can have its roughness factor set', () => {
    metallicRoughness
      .roughnessFactor(0.42)
      .build()
      .should.deepEqual({ roughnessFactor: 0.42 });
  });

  it('can have its base color texture set', () => {
    const textureInfoStub = {
      build: stub().returns({})
    };
    const indexStub = {
      indexOf: stub()
        .withArgs(textureInfoStub)
        .returns(42)
    };

    metallicRoughness
      .baseColorTexture(textureInfoStub)
      .build(indexStub)
      .should.deepEqual({ baseColorTexture: 42 });
  });

  it('can have its metallic roughness texture set', () => {
    const textureInfoStub = {
      build: stub().returns({})
    };
    const indexStub = {
      indexOf: stub()
        .withArgs(textureInfoStub)
        .returns(42)
    };

    metallicRoughness
      .metallicRoughnessTexture(textureInfoStub)
      .build(indexStub)
      .should.deepEqual({ metallicRoughnessTexture: 42 });
  });
});
