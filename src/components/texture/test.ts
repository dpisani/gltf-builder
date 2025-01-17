import "should";

import { describe, it, beforeEach } from "mocha";
import { createStubInstance, stub } from "sinon";

import chainMethods from "../../test-util/chain-methods.js";
import Texture from "./index.js";
import Indexer from "../asset/indexer/index.js";
import Sampler from "../sampler/index.js";
import TextureImage from "../image/index.js";

describe("Texture", () => {
  let texture: Texture;

  const indexStub = createStubInstance<Indexer>(Indexer);
  indexStub.indexOf.returns(42);

  beforeEach(() => {
    texture = new Texture();
  });

  it("has no properties defined by default", () => {
    texture.build(indexStub).should.deepEqual({});
  });

  it("can have a name", () => {
    texture.name("texture image name");

    texture.build(indexStub).should.have.property("name", "texture image name");
  });

  it("can have its setters chained", () => {
    chainMethods(texture).should.equal(texture);
  });

  it("can have a sampler", () => {
    const samplerStub = createStubInstance(Sampler);
    samplerStub.build.returns({});

    texture.sampler(samplerStub);

    texture.build(indexStub).should.deepEqual({ sampler: 42 });
  });

  it("can have a source", () => {
    const textureImageStub = createStubInstance(TextureImage);
    textureImageStub.build.returns({});

    texture.source(textureImageStub);

    texture.build(indexStub).should.deepEqual({ source: 42 });
  });
});
