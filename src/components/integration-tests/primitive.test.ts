import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import { createPrimitiveFixture } from '../../test-util/fixtures.js';
import Asset from '../asset/index.js';

describe('Primitive generator GLTF output', () => {
  let asset: Asset;

  beforeEach(() => {
    const fixture = createPrimitiveFixture();

    asset = fixture.asset;
  });

  it('is valid with no attributes set', async () => {
    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });
});
