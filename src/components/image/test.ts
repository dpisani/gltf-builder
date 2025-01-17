import should from "should";

import { describe, it, beforeEach } from "mocha";
import { createStubInstance, stub } from "sinon";

import TextureImage from "./index.js";
import chainMethods from "../../test-util/chain-methods.js";
import Indexer from "../asset/indexer/index.js";
import BufferView from "../buffer-view/index.js";

describe("TextureImage", () => {
  let textureImage: TextureImage;

  const indexStub = createStubInstance<Indexer>(Indexer);
  indexStub.indexOf.returns(42);

  beforeEach(() => {
    textureImage = new TextureImage();
  });

  it("has no properties defined by default", () => {
    textureImage.build(indexStub).should.deepEqual({});
  });

  it("can have a name", () => {
    textureImage.name("texture image name");

    textureImage
      .build(indexStub)
      .should.have.property("name", "texture image name");
  });

  it("can have its setters chained", () => {
    chainMethods(textureImage).should.equal(textureImage);
  });

  it("can reference data by a uri", () => {
    textureImage.uri("https://en.wikipedia.org/wiki/File:Example.jpg");

    textureImage.build(indexStub).should.deepEqual({
      uri: "https://en.wikipedia.org/wiki/File:Example.jpg",
    });
  });

  it("can have a mime type", () => {
    textureImage.mimeType("image/jpeg");

    textureImage.build(indexStub).should.deepEqual({
      mimeType: "image/jpeg",
    });
  });

  it("throws when given unsupported mime type", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    should.throws(() => textureImage.mimeType("image/ief" as any));
  });

  it("can reference data by a buffer view and mime type", () => {
    const bufferViewStub = createStubInstance(BufferView);
    bufferViewStub.build.returns({});

    textureImage.bufferView(bufferViewStub).mimeType("image/png");

    textureImage
      .build(indexStub)
      .should.deepEqual({ bufferView: 42, mimeType: "image/png" });
  });

  it("throws if built with a buffer view and no mime type", () => {
    const bufferViewStub = createStubInstance(BufferView);
    bufferViewStub.build.returns({});

    textureImage.bufferView(bufferViewStub);

    should.throws(() => textureImage.build(indexStub));
  });
});
