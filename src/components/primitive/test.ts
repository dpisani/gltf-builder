import "should";
import { describe, it, beforeEach } from "mocha";
import { createStubInstance, SinonStubbedInstance, stub } from "sinon";

import Primitive from "./index.js";
import chainMethods from "../../test-util/chain-methods.js";
import Indexer from "../asset/indexer/index.js";
import Accessor from "../accessor/index.js";
import Material from "../material/index.js";

type BuildResult = { attributes: Record<string, unknown> };

describe("Primitive", () => {
  let primitive: Primitive;

  const indexStub = createStubInstance<Indexer>(Indexer);

  beforeEach(() => {
    primitive = new Primitive();
  });

  it("has attributes by default", () => {
    primitive.build(indexStub).should.deepEqual({ attributes: {} });
  });

  it("can have its setters chained", () => {
    chainMethods(primitive).should.equal(primitive);
  });

  it("can have a primitive mode set", () => {
    primitive.mode(0);

    primitive.build(indexStub).should.have.property("mode", 0);
  });

  describe("accessors", () => {
    let indexerStub: SinonStubbedInstance<Indexer>;

    const accessorStub = createStubInstance(Accessor);
    accessorStub.build.returns({});

    beforeEach(() => {
      indexerStub = createStubInstance(Indexer);
      indexerStub.indexOf.onFirstCall().returns(42);
    });

    it("can have a POSITION accessor set", () => {
      primitive.position(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          POSITION: 42,
        },
      );
    });

    it("can have a NORMAL accessor set", () => {
      primitive.normal(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          NORMAL: 42,
        },
      );
    });

    it("can have a TANGENT accessor set", () => {
      primitive.tangent(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          TANGENT: 42,
        },
      );
    });

    it("can have a TEXCOORD_0 accessor set", () => {
      primitive.texcoord(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          TEXCOORD_0: 42,
        },
      );
    });

    it("can have a COLOR_0 accessor set", () => {
      primitive.color(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          COLOR_0: 42,
        },
      );
    });

    it("can have a JOINTS_0 accessor set", () => {
      primitive.joints(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          JOINTS_0: 42,
        },
      );
    });

    it("can have a WEIGHTS_0 accessor set", () => {
      primitive.weights(accessorStub);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          WEIGHTS_0: 42,
        },
      );
    });

    it("can have a TEXCOORD accessor set for any index", () => {
      primitive.texcoord(accessorStub, 5);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          TEXCOORD_5: 42,
        },
      );
    });

    it("can have a COLOR accessor set for any index", () => {
      primitive.color(accessorStub, 6);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          COLOR_6: 42,
        },
      );
    });

    it("can have a JOINTS accessor set for any index", () => {
      primitive.joints(accessorStub, 2);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          JOINTS_2: 42,
        },
      );
    });

    it("can have a WEIGHTS accessor set for any index", () => {
      primitive.weights(accessorStub, 1);

      (primitive.build(indexerStub) as BuildResult).attributes.should.deepEqual(
        {
          WEIGHTS_1: 42,
        },
      );
    });

    it("can have indices accessor set", () => {
      primitive.indices(accessorStub);

      primitive.build(indexerStub).should.have.property("indices", 42);
    });
  });

  it("can have a material set", () => {
    const materialStub = createStubInstance(Material);
    materialStub.build.returns({});

    const indexerStub = createStubInstance(Indexer);
    indexerStub.indexOf.onFirstCall().returns(42);

    primitive
      .material(materialStub)
      .build(indexerStub)
      .should.have.property("material", 42);
  });
});
