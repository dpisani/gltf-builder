import "should";
import { describe, it, beforeEach } from "mocha";

import chainMethods from "../../test-util/chain-methods.js";
import Sampler from "./index.js";
import { createStubInstance } from "sinon";
import Indexer from "../asset/indexer/index.js";

describe("Sampler", () => {
  let sampler: Sampler;

  const indexStub = createStubInstance<Indexer>(Indexer);

  beforeEach(() => {
    sampler = new Sampler();
  });

  it("has no properties defined by default", () => {
    sampler.build(indexStub).should.deepEqual({});
  });

  it("can have a name", () => {
    sampler.name("sampler name");

    sampler.build(indexStub).should.have.property("name", "sampler name");
  });

  it("can have its setters chained", () => {
    chainMethods(sampler).should.equal(sampler);
  });

  it("can have a minFilter", () => {
    sampler.magFilter(9728);

    sampler.build(indexStub).should.deepEqual({ magFilter: 9728 });
  });

  it("can have a minFilter", () => {
    sampler.minFilter(9984);

    sampler.build(indexStub).should.deepEqual({ minFilter: 9984 });
  });

  it("can have a wrapS", () => {
    sampler.wrapS(33071);

    sampler.build(indexStub).should.deepEqual({ wrapS: 33071 });
  });

  it("can have a wrapT", () => {
    sampler.wrapT(33071);

    sampler.build(indexStub).should.deepEqual({ wrapT: 33071 });
  });
});
