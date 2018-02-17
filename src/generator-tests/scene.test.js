import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import Asset from '../components/asset';
import Scene from '../components/scene/';
import Node from '../components/node';

describe('Scene generator GLTF output', () => {
  let asset;
  let scene;
  beforeEach(() => {
    asset = new Asset();
    scene = new Scene();

    asset.addScene(scene);
  });
  it('is valid with no attributes set', () => {
    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('is valid with name set', () => {
    scene.name('scene name');

    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  describe('nodes', () => {
    it('is valid with a node added', () => {
      scene.addNode(new Node());

      const generated = asset.build();

      generated.scenes[0].nodes.length.should.equal(1);
      generated.scenes[0].nodes[0].should.equal(0);
      validator.validateString(JSON.stringify(generated)).should.be.resolved();
    });

    it('is valid with multiple nodes added', () => {
      scene.addNode(new Node());
      scene.addNode(new Node());
      scene.addNode(new Node());

      const generated = asset.build();

      generated.scenes[0].nodes.length.should.equal(3);
      generated.scenes[0].nodes[0].should.equal(0);
      generated.scenes[0].nodes[1].should.equal(1);
      generated.scenes[0].nodes[2].should.equal(2);
      generated.nodes.length.should.equal(3);
      validator.validateString(JSON.stringify(generated)).should.be.resolved();
    });
  });
});
