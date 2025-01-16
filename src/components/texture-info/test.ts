import 'should';

import { describe, it, beforeEach } from 'mocha';
import { createStubInstance, stub } from 'sinon';

import chainMethods from '../../test-util/chain-methods.js';
import TextureInfo from './index.js';
import Indexer from '../asset/indexer/index.js';
import Texture from '../texture/index.js';

describe('TextureInfo', () => {
  let textureInfo: TextureInfo;

  const indexStub = createStubInstance<Indexer>(Indexer);
  indexStub.indexOf.returns(42);

  beforeEach(() => {
    textureInfo = new TextureInfo();
  });

  it('has no properties defined by default', () => {
    textureInfo.build(indexStub).should.deepEqual({});
  });

  it('can have its setters chained', () => {
    chainMethods(textureInfo).should.equal(textureInfo);
  });

  it('can have a texCoord', () => {
    textureInfo.texCoord(1);

    textureInfo.build(indexStub).should.deepEqual({ texCoord: 1 });
  });

  it('can have a texture which is built as index', () => {
    const textureStub = createStubInstance(Texture);
    textureStub.build.returns({});

    textureInfo.texture(textureStub);

    textureInfo.build(indexStub).should.deepEqual({ index: 42 });
  });
});
