import 'should';
import { describe, it } from 'mocha';

import Asset from './';

describe('Asset', () => {
  it('contains an asset section', () => {
    const asset = new Asset();
    const generated = asset.build();

    generated.should.have.property('asset');
  });

  it('specifies a version', () => {
    const asset = new Asset();
    const generated = asset.build();

    generated.asset.should.have.property('version', '2.0');
  });
});
