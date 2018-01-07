import 'should';
import validator from 'gltf-validator';
import { describe, it } from 'mocha';

import Asset from '../asset';

describe('Asset generator', () => {
  it('generates valid GLTF', () => {
    const asset = new Asset();
    const generated = JSON.stringify(asset.build());

    validator.validateString(generated).should.be.resolved();
  });
});
