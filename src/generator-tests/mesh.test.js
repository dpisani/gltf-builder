import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import { createMeshFixture } from './fixtures';

describe('Mesh generator GLTF output', () => {
  let asset;
  let mesh;

  beforeEach(() => {
    const fixture = createMeshFixture();

    asset = fixture.asset;
    mesh = fixture.mesh;
  });

  it('is valid with no attributes set', () => {
    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('is valid with name attribute set', () => {
    mesh.name('mesh 1');

    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });
});
