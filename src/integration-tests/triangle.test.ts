// Test to replicate the GLTF-embedded triangle sample model
// https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Triangle
import 'should';
import validator from 'gltf-validator';
import { describe, it } from 'mocha';

import {
  Asset,
  Scene,
  Mesh,
  Node,
  Primitive,
  buildUIntAccessor,
  buildVec3Accessor
} from '../index.js';

describe('triangle integration test', () => {
  const triangleAsset = new Asset().addScene(
    new Scene().addNode(
      new Node().mesh(
        new Mesh().addPrimitive(
          new Primitive()
            .position(buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0]]))
            .indices(buildUIntAccessor([0, 1, 2]))
        )
      )
    )
  );

  it('can build a triangle', async () => {
    const gltf = triangleAsset.build();

    await validator.validateString(JSON.stringify(gltf)).should.be.resolved;
  });

  it('can build a triangle with Float32 vectors as input', async () => {
    const asset = new Asset().addScene(
      new Scene().addNode(
        new Node().mesh(
          new Mesh().addPrimitive(
            new Primitive()
              .position(
                buildVec3Accessor([
                  Float32Array.of(0, 0, 0),
                  Float32Array.of(1, 0, 0),
                  Float32Array.of(0, 1, 0)
                ])
              )
              .indices(buildUIntAccessor([0, 1, 2]))
          )
        )
      )
    );

    const gltf = asset.build();

    await validator.validateString(JSON.stringify(gltf)).should.be.resolved;
    gltf.should.deepEqual(triangleAsset.build());
  });
});
