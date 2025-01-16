import 'should';

import { describe, it, beforeEach } from 'mocha';
import { createStubInstance, stub } from 'sinon';

import MetallicRoughness from './index.js';
import chainMethods from '../../../test-util/chain-methods.js';
import Indexer from '../../asset/indexer/index.js';
import TextureInfo from '../../texture-info/index.js';

describe('MetallicRoughness', () => {
  let metallicRoughness: MetallicRoughness;

  const indexStub = createStubInstance<Indexer>(Indexer);
  indexStub.indexOf.returns(42);

  beforeEach(() => {
    metallicRoughness = new MetallicRoughness();
  });

  it('has no properties defined by default', () => {
    metallicRoughness.build(indexStub).should.deepEqual({});
  });

  it('can have its setters chained', () => {
    chainMethods(metallicRoughness).should.equal(metallicRoughness);
  });

  it('can have its base color factor set', () => {
    metallicRoughness
      .baseColorFactor([0, 0.1, 0.2, 0.3])
      .build(indexStub)
      .should.deepEqual({ baseColorFactor: [0, 0.1, 0.2, 0.3] });
  });

  it('can have its metallic factor set', () => {
    metallicRoughness
      .metallicFactor(0.42)
      .build(indexStub)
      .should.deepEqual({ metallicFactor: 0.42 });
  });

  it('can have its roughness factor set', () => {
    metallicRoughness
      .roughnessFactor(0.42)
      .build(indexStub)
      .should.deepEqual({ roughnessFactor: 0.42 });
  });

  it('can have its base color texture set and builds provided component', () => {
    const baseColorTextureStub = createStubInstance(TextureInfo);
    baseColorTextureStub.build.returns({ baseColorTextureData: true });

    metallicRoughness
      .metallicRoughnessTexture(baseColorTextureStub)
      .build(indexStub)
      .should.deepEqual({
        metallicRoughnessTexture: { baseColorTextureData: true }
      });

    baseColorTextureStub.build.should.be.calledOnce();
    baseColorTextureStub.build.should.be.calledWith(indexStub);
  });

  it('can have its metallic roughness texture set and builds provided component', () => {
    const metallicRoughnessTextureStub = createStubInstance(TextureInfo);
    metallicRoughnessTextureStub.build.returns({
      metallicRoughnessTextureData: true
    });

    metallicRoughness
      .metallicRoughnessTexture(metallicRoughnessTextureStub)
      .build(indexStub)
      .should.deepEqual({
        metallicRoughnessTexture: { metallicRoughnessTextureData: true }
      });

    metallicRoughnessTextureStub.build.should.be.calledOnce();
    metallicRoughnessTextureStub.build.should.be.calledWith(indexStub);
  });
});
