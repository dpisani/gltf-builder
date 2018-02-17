import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import Asset from '../components/asset';
import Scene from '../components/scene/';
import Node from '../components/node';

describe('Node generator GLTF output', () => {
  let asset;
  let scene;
  let node;

  beforeEach(() => {
    asset = new Asset();
    scene = new Scene();
    node = new Node();

    scene.addNode(node);
    asset.addScene(scene);
  });

  it('is valid with no attributes set when attached to a scene', () => {
    const generated = asset.build();

    generated.nodes.length.should.equal(1);
    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('is valid with name set', () => {
    node.name('node name');

    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('is valid with children added', () => {
    const child = new Node().name('node2');
    node.name('node1').addChild(child);

    const generated = asset.build();

    generated.nodes.length.should.equal(2);
    generated.nodes[0].name.should.equal('node1');
    generated.nodes[1].name.should.equal('node2');
    generated.nodes[0].children[0].should.equal(1);
    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });
});
