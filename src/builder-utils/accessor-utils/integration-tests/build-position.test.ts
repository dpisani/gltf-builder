import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import { createPrimitiveFixture } from '../../../test-util/fixtures.js';

import { buildVec3Accessor } from '../index.js';
import Asset from '../../../components/asset/index.js';
import Primitive from '../../../components/primitive/index.js';

describe('buildVec3Accessor generator', () => {
  let asset: Asset;
  let primitive: Primitive;

  beforeEach(() => {
    const fixture = createPrimitiveFixture();
    asset = fixture.asset;
    primitive = fixture.primitive;
  });

  describe('positionFromPoints', () => {
    let generated: object;

    beforeEach(() => {
      const position = buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0]]);
      primitive.position(position);

      generated = asset.build();
    });

    it('generates valid GLTF when used for a primitive', async () => {
      await validator.validateString(JSON.stringify(generated)).should.be
        .resolved;
    });

    it('creates a buffer with correctly encoded data', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (generated as any).buffers[0].uri.should.equal(
        'data:application/octet-stream;base64,AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAA'
      );
    });
  });
});
