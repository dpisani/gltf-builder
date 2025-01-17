import "should";
import validator from "gltf-validator";
import { describe, it, beforeEach } from "mocha";

import Asset from "../../../components/asset/index.js";
import Primitive from "../../../components/primitive/index.js";

import { createPrimitiveFixture } from "../../../test-util/fixtures.js";

import { buildUIntAccessor } from "../index.js";

describe("buildUIntAccessor generator", () => {
  let asset: Asset;
  let primitive: Primitive;
  let generated: object;

  beforeEach(() => {
    const fixture = createPrimitiveFixture();
    asset = fixture.asset;
    primitive = fixture.primitive;

    const position = buildUIntAccessor([0, 1, 2]);
    primitive.indices(position);

    generated = asset.build();
  });

  it("generates valid GLTF when used for a primitive", async () => {
    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it("creates a buffer with correctly encoded data", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (generated as any).buffers[0].uri.should.equal(
      "data:application/octet-stream;base64,AAABAAIA",
    );
  });
});
