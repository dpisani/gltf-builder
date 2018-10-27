import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import { createPrimitiveFixture } from '../../test-util/fixtures';

describe('Primitive generator GLTF output', () => {
  let asset;

  beforeEach(() => {
    const fixture = createPrimitiveFixture();

    asset = fixture.asset;
  });

  it('is valid with no attributes set', () => {
    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });
});
