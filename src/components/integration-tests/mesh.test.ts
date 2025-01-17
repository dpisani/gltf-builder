import "should";
import validator from "gltf-validator";
import { describe, it, beforeEach } from "mocha";

import { createMeshFixture } from "../../test-util/fixtures.js";
import Asset from "../asset/index.js";
import Mesh from "../mesh/index.js";

describe("Mesh generator GLTF output", () => {
  let asset: Asset;
  let mesh: Mesh;

  beforeEach(() => {
    const fixture = createMeshFixture();

    asset = fixture.asset;
    mesh = fixture.mesh;
  });

  it("is valid with no attributes set", async () => {
    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it("is valid with name attribute set", async () => {
    mesh.name("mesh 1");

    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });
});
