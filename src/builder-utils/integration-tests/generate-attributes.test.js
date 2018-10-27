import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import { createPrimitiveFixture } from '../../test-util/fixtures';

import { positionFromPoints } from '../generate-attributes';

describe('Primitive attribute generators', () => {
  let asset;
  let primitive;

  beforeEach(() => {
    const fixture = createPrimitiveFixture();
    asset = fixture.asset;
    primitive = fixture.primitive;
  });

  describe('positionFromPoints', () => {
    let generated;

    beforeEach(() => {
      const position = positionFromPoints([[0, 0, 0], [1, 0, 0], [0, 1, 0]]);
      primitive.position(position);

      generated = asset.build();
    });

    it('generates valid GLTF when used for a primitive', () => {
      validator.validateString(JSON.stringify(generated)).should.be.resolved();
    });

    it('creates a buffer with correctly encoded data', () => {
      generated.buffers[0].uri.should.equal(
        'data:application/octet-stream;base64,AAAAAAAAAAAAAAAAAACAPwAAAAAAAAAAAAAAAAAAgD8AAAAA'
      );
    });
  });
});
