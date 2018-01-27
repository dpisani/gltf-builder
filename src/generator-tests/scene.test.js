import 'should';
import validator from 'gltf-validator';
import { describe, it } from 'mocha';

import Asset from '../components/asset';
import Scene from '../components/scene/';

describe('Scene generator', () => {
  it('generates valid GLTF with no attributes set', () => {
    const asset = new Asset();
    const scene = new Scene();

    asset.addScene(scene);

    const generated = JSON.stringify(asset.build());

    validator.validateString(generated).should.be.resolved();
  });

  it('generates valid GLTF with name set', () => {
    const asset = new Asset();
    const scene = new Scene();
    scene.name('scene name');

    asset.addScene(scene);

    const generated = JSON.stringify(asset.build());

    validator.validateString(generated).should.be.resolved();
  });
});
