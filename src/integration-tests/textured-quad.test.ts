import 'should';
import validator from 'gltf-validator';
import { describe, it, before } from 'mocha';
import fs from 'fs';

import {
  Asset,
  Scene,
  Mesh,
  Node,
  Primitive,
  Material,
  MetallicRoughness,
  buildUIntAccessor,
  buildVec3Accessor,
  buildVec2Accessor,
  buildTextureFromArrayBuffer
} from '../index.js';

import testFixture from 'test-fixture';

const fixtures = testFixture();

describe('Textured quad integration test', () => {
  let asset: Asset;

  before(() => {
    const imageBuffer = fs.readFileSync(fixtures.resolve('small_texture.png'));

    asset = new Asset().addScene(
      new Scene().addNode(
        new Node().mesh(
          new Mesh().addPrimitive(
            new Primitive()
              .position(
                buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]])
              )
              .indices(buildUIntAccessor([0, 1, 2, 2, 1, 3]))
              .texcoord(
                buildVec2Accessor([
                  Float32Array.of(0, 0),
                  Float32Array.of(1, 0),
                  Float32Array.of(0, 1),
                  Float32Array.of(1, 1)
                ])
              )
              .material(
                new Material().metallicRoughness(
                  new MetallicRoughness().baseColorTexture(
                    buildTextureFromArrayBuffer(imageBuffer, 'image/png')
                      .textureInfo
                  )
                )
              )
          )
        )
      )
    );
  });

  it('can build a valid asset', async () => {
    const gltf = asset.build();

    await validator.validateString(JSON.stringify(gltf)).should.be.resolved;
  });

  it('creates a texture resource in the output', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const gltf: any = asset.build();

    gltf.textures.should.have.length(1);
  });
});
