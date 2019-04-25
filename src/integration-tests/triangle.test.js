// Test to replicate the GLTF-embedded triangle sample model
// https://github.com/KhronosGroup/glTF-Sample-Models/tree/master/2.0/Triangle
import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import {
  Asset,
  Scene,
  Mesh,
  Node,
  Primitive,
  buildIndices,
  buildPosition
} from '../index';

describe('triangle integration test', () => {
  const triangleAsset = new Asset().addScene(
    new Scene().addNode(
      new Node().mesh(
        new Mesh().addPrimitive(
          new Primitive()
            .position(buildPosition([[0, 0, 0], [1, 0, 0], [0, 1, 0]]))
            .indices(buildIndices([0, 1, 2]))
        )
      )
    )
  );

  it('can build a triangle', () => {
    const gltf = triangleAsset.build();

    validator.validateString(JSON.stringify(gltf)).should.be.resolved();
  });

  it('can build a triangle with Float32 vectors as input', () => {
    const asset = new Asset().addScene(
      new Scene().addNode(
        new Node().mesh(
          new Mesh().addPrimitive(
            new Primitive()
              .position(
                buildPosition([
                  Float32Array.of(0, 0, 0),
                  Float32Array.of(1, 0, 0),
                  Float32Array.of(0, 1, 0)
                ])
              )
              .indices(buildIndices([0, 1, 2]))
          )
        )
      )
    );

    const gltf = asset.build();

    validator.validateString(JSON.stringify(gltf)).should.be.resolved();
    gltf.should.deepEqual(triangleAsset.build());
  });
});
