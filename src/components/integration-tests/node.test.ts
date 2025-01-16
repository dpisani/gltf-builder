import 'should';
import validator from 'gltf-validator';
import { describe, it, beforeEach } from 'mocha';

import Node from '../node/index.js';
import Mesh from '../mesh/index.js';

import { createNodeFixture } from '../../test-util/fixtures.js';
import Asset from '../asset/index.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GeneratedType = any;

describe('Node generator GLTF output', () => {
  let asset: Asset;
  let node: Node;

  beforeEach(() => {
    const fixture = createNodeFixture();
    asset = fixture.asset;
    node = fixture.node;
  });

  it('is valid with no attributes set when attached to a scene', async () => {
    const generated = asset.build();

    (generated as GeneratedType).nodes.length.should.equal(1);
    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it('is valid with name set', async () => {
    node.name('node name');

    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it('is valid with children added', async () => {
    const child1 = new Node().name('child1');
    const child2 = new Node().name('child2');
    node
      .name('node')
      .addChild(child1)
      .addChild(child2);

    const generated = asset.build();

    (generated as GeneratedType).nodes.length.should.equal(3);
    (generated as GeneratedType).nodes[0].name.should.equal('node');
    (generated as GeneratedType).nodes[1].name.should.equal('child1');
    (generated as GeneratedType).nodes[2].name.should.equal('child2');
    (generated as GeneratedType).nodes[0].children[0].should.equal(1);
    (generated as GeneratedType).nodes[0].children[1].should.equal(2);
    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it('is valid with transforms set', async () => {
    node
      .translation(1, 2, 3)
      .rotation(4, 5, 6, 7)
      .scale(8, 9, 0);

    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });

  it('is valid with a mesh set', async () => {
    const mesh = new Mesh().name('mesh1');

    node.mesh(mesh);

    const generated = asset.build();

    await validator.validateString(JSON.stringify(generated)).should.be
      .resolved;
  });
});
