import "should";

import { describe, it, beforeEach } from "mocha";
import { createStubInstance } from "sinon";

import Material from "./index.js";
import chainMethods from "../../test-util/chain-methods.js";
import Indexer from "../asset/indexer/index.js";
import MetallicRoughness from "./metallic-roughness/index.js";

describe("Material", () => {
  let material: Material;

  const indexStub = createStubInstance<Indexer>(Indexer);

  beforeEach(() => {
    material = new Material();
  });

  it("has no properties defined by default", () => {
    material.build(indexStub).should.deepEqual({});
  });

  it("can have a name", () => {
    material.name("material name");

    material.build(indexStub).should.have.property("name", "material name");
  });

  it("can have its setters chained", () => {
    chainMethods(material).should.equal(material);
  });

  it("can have an emissive factor", () => {
    material
      .emissiveFactor([0, 0.5, 1])
      .build(indexStub)
      .should.deepEqual({
        emissiveFactor: [0, 0.5, 1],
      });
  });

  it("can have an alpha mode", () => {
    material
      .alphaMode("OPAQUE")
      .build(indexStub)
      .should.deepEqual({ alphaMode: "OPAQUE" });
  });

  it("can have an alpha cutoff", () => {
    material
      .alphaCutoff(0.42)
      .build(indexStub)
      .should.deepEqual({ alphaCutoff: 0.42 });
  });

  it("can have double sided set", () => {
    material
      .doubleSided(true)
      .build(indexStub)
      .should.deepEqual({ doubleSided: true });
  });

  it("can have metallic roughness set and builds provided component", () => {
    const metallicRoughness = createStubInstance(MetallicRoughness);
    metallicRoughness.build.returns({ pbrMetallicRoughnessContent: true });

    material
      .pbrMetallicRoughness(metallicRoughness)
      .build(indexStub)
      .should.deepEqual({
        pbrMetallicRoughness: { pbrMetallicRoughnessContent: true },
      });

    metallicRoughness.build.should.be.calledOnce();
    metallicRoughness.build.should.be.calledWith(indexStub);
  });
});
