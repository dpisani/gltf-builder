import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import { createPrimitiveFixture } from '../../../test-util/fixtures';

import { buildUIntAccessor } from '../index';

describe('buildUIntAccessor generator', () => {
  let asset;
  let primitive;
  let generated;

  beforeEach(() => {
    const fixture = createPrimitiveFixture();
    asset = fixture.asset;
    primitive = fixture.primitive;

    const position = buildUIntAccessor([0, 1, 2]);
    primitive.indices(position);

    generated = asset.build();
  });

  it('generates valid GLTF when used for a primitive', () => {
    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('creates a buffer with correctly encoded data', () => {
    generated.buffers[0].uri.should.equal(
      'data:application/octet-stream;base64,AAABAAIA'
    );
  });
});
