import should from 'should';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import TextureImage from './index';
import chainMethods from '../../test-util/chain-methods';

describe('TextureImage', () => {
  let textureImage;

  beforeEach(() => {
    textureImage = new TextureImage();
  });

  it('has no properties defined by default', () => {
    textureImage.build().should.deepEqual({});
  });

  it('can have a name', () => {
    textureImage.name('texture image name');

    textureImage.build().should.have.property('name', 'texture image name');
  });

  it('can have its setters chained', () => {
    chainMethods(textureImage).should.equal(textureImage);
  });

  it('can reference data by a uri', () => {
    textureImage.uri('https://en.wikipedia.org/wiki/File:Example.jpg');

    textureImage.build().should.deepEqual({
      uri: 'https://en.wikipedia.org/wiki/File:Example.jpg'
    });
  });

  it('can have a mime type', () => {
    textureImage.mimeType('image/jpeg');

    textureImage.build().should.deepEqual({
      mimeType: 'image/jpeg'
    });
  });

  it('throws when given unsupported mime type', () => {
    should.throws(() => textureImage.mimeType('image/ief'));
  });

  it('can reference data by a buffer view and mime type', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const bufferViewStub = {
      build: stub().returns({})
    };

    textureImage.bufferView(bufferViewStub).mimeType('image/png');

    textureImage
      .build(indexStub)
      .should.deepEqual({ bufferView: 42, mimeType: 'image/png' });
  });

  it('throws if built with a buffer view and no mime type', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const bufferViewStub = {
      build: stub().returns({})
    };

    textureImage.bufferView(bufferViewStub);

    should.throws(() => textureImage.build(indexStub));
  });
});
