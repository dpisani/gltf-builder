import 'should';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import chainMethods from '../../test-util/chain-methods';
import TextureInfo from './index';

describe('TextureInfo', () => {
  let textureInfo;

  beforeEach(() => {
    textureInfo = new TextureInfo();
  });

  it('has no properties defined by default', () => {
    textureInfo.build().should.deepEqual({});
  });

  it('can have its setters chained', () => {
    chainMethods(textureInfo).should.equal(textureInfo);
  });

  it('can have a texCoord', () => {
    textureInfo.texCoord(1);

    textureInfo.build().should.deepEqual({ texCoord: 1 });
  });

  it('can have a texture which is built as index', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const textureStub = {
      build: stub().returns({})
    };

    textureInfo.texture(textureStub);

    textureInfo.build(indexStub).should.deepEqual({ index: 42 });
  });
});
