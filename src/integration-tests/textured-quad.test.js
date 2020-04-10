import 'should';
import validator from 'gltf-validator';
import { describe, it, before } from 'mocha';
import fs from 'fs';
import path from 'path';

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
} from '../index';

describe('Textured quad integration test', () => {
  let asset;

  before(() => {
    /* global __dirname */
    const imageBuffer = fs.readFileSync(
      path.join(__dirname, 'small_texture.png')
    );

    asset = new Asset().addScene(
      new Scene().addNode(
        new Node().mesh(
          new Mesh().addPrimitive(
            new Primitive()
              .position(
                buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]])
              )
              .indices(buildUIntAccessor([0, 1, 2, 2, 1, 3]))
              .texcoord(buildVec2Accessor([[0, 0], [1, 0], [0, 1], [1, 1]]))
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

  it('can build a valid asset', () => {
    const gltf = asset.build();

    validator.validateString(JSON.stringify(gltf)).should.be.resolved();
  });

  it('creates a texture resource in the output', () => {
    const gltf = asset.build();

    gltf.textures.should.have.length(1);
  });
});
