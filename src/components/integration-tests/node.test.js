import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import Node from '../node';
import Mesh from '../mesh';

import { createNodeFixture } from '../../test-util/fixtures';

describe('Node generator GLTF output', () => {
  let asset;
  let node;

  beforeEach(() => {
    const fixture = createNodeFixture();
    asset = fixture.asset;
    node = fixture.node;
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
    const child1 = new Node().name('child1');
    const child2 = new Node().name('child2');
    node
      .name('node')
      .addChild(child1)
      .addChild(child2);

    const generated = asset.build();

    generated.nodes.length.should.equal(3);
    generated.nodes[0].name.should.equal('node');
    generated.nodes[1].name.should.equal('child1');
    generated.nodes[2].name.should.equal('child2');
    generated.nodes[0].children[0].should.equal(1);
    generated.nodes[0].children[1].should.equal(2);
    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('is valid with transforms set', () => {
    node
      .translation(1, 2, 3)
      .rotation(4, 5, 6, 7)
      .scale(8, 9, 0);

    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });

  it('is valid with a mesh set', () => {
    const mesh = new Mesh().name('mesh1');

    node.mesh(mesh);

    const generated = asset.build();

    validator.validateString(JSON.stringify(generated)).should.be.resolved();
  });
});
