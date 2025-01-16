import 'should';
import validator from 'gltf-validator';
import { describe, it } from 'mocha';

import Asset from '../asset/index.js';

describe('Asset generator GLTF output', () => {
  it('is valid with no attributes set', async () => {
    const asset = new Asset();
    const generated = JSON.stringify(asset.build());

    await validator.validateString(generated).should.be.resolved;
  });
});
