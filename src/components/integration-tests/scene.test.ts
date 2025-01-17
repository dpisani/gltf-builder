import "should";
import validator from "gltf-validator";
import { describe, it, beforeEach } from "mocha";

import Node from "../node/index.js";

import { createSceneFixture } from "../../test-util/fixtures.js";
import Asset from "../asset/index.js";
import Scene from "../scene/index.js";

describe("Scene generator GLTF output", () => {
  let asset: Asset;
  let scene: Scene;

  beforeEach(() => {
    const fixture = createSceneFixture();
    asset = fixture.asset;
    scene = fixture.scene;
  });
  it("is valid with no attributes set", async () => {
    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it("is valid with name set", async () => {
    scene.name("scene name");

    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  describe("nodes", () => {
    it("is valid with a node added", async () => {
      scene.addNode(new Node());

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const generated: any = asset.build();

      generated.scenes[0].nodes.length.should.equal(1);
      generated.scenes[0].nodes[0].should.equal(0);
      await validator.validateString(JSON.stringify(generated)).should.be
        .resolved;
    });

    it("is valid with multiple nodes added", async () => {
      scene.addNode(new Node());
      scene.addNode(new Node());
      scene.addNode(new Node());

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const generated: any = asset.build();

      generated.scenes[0].nodes.length.should.equal(3);
      generated.scenes[0].nodes[0].should.equal(0);
      generated.scenes[0].nodes[1].should.equal(1);
      generated.scenes[0].nodes[2].should.equal(2);
      generated.nodes.length.should.equal(3);
      await validator.validateString(JSON.stringify(generated)).should.be
        .resolved;
    });
  });
});
