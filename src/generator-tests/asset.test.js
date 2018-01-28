import 'should';
import validator from 'gltf-validator';
import { describe, it } from 'mocha';

import Asset from '../components/asset';

describe('Asset generator GLTF output', () => {
  it('is valid with no attributes set', () => {
    const asset = new Asset();
    const generated = JSON.stringify(asset.build());

    validator.validateString(generated).should.be.resolved();
  });
});
