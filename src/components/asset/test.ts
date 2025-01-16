import 'should';
import 'should-sinon';
import { describe, it, beforeEach } from 'mocha';
import { stub, spy, createStubInstance } from 'sinon';

import Asset from './index.js';
import Indexer from './indexer/index.js';

import { Dictionary } from 'ts-essentials';
import chainMethods from '../../test-util/chain-methods.js';
import Scene from '../scene/index.js';

type BuiltAsset = Dictionary<any>;

describe('Asset', () => {
  let asset: Asset;

  beforeEach(() => {
    asset = new Asset();
  });

  it('contains an asset section', () => {
    const generated = asset.build();

    generated.should.have.property('asset');
  });

  it('specifies a version', () => {
    const generated = asset.build();

    (generated as BuiltAsset).asset.should.have.property('version', '2.0');
  });

  it('represents indexed entities at the top level', () => {
    const indexerStub = createStubInstance(Indexer);
    indexerStub.buildIndexedEntities.returns({
      plumbus: ['p1'],
      schmeckel: ['s1', 's2']
    });

    const generated = asset.build(indexerStub);

    generated.should.have.property('plumbus');
    generated.should.have.property('schmeckel');
    (generated as BuiltAsset).plumbus.length.should.equal(1);
    (generated as BuiltAsset).schmeckel.length.should.equal(2);
  });

  it('can have its setters chained', () => {
    chainMethods(asset, ['getAssetDefinition']).should.equal(asset);
  });

  describe('contains a list of scenes', () => {
    it('has no scenes property by default', () => {
      asset.build().should.not.have.property('scenes');
    });

    it('can have scenes added', () => {
      const sceneStub = createStubInstance(Scene);
      sceneStub.getIndexName.returns('scenes');

      const builtScene = {};
      sceneStub.build.returns(builtScene);
      asset.addScene(sceneStub);

      const generated = asset.build();

      generated.should.have.property('scenes');
      sceneStub.build.should.be.calledOnce();
      (generated as BuiltAsset).scenes.length.should.equal(1);
      (generated as BuiltAsset).scenes[0].should.equal(builtScene);
    });

    it('indexes scenes before building', () => {
      const scene1 = createStubInstance(Scene);
      scene1.getIndexName.returns('scenes');
      const scene2 = createStubInstance(Scene);
      scene2.getIndexName.returns('scenes');

      const indexer = new Indexer();
      indexer.index = spy(indexer.index);

      asset.addScene(scene1).addScene(scene2);

      asset.build(indexer);

      indexer.index.should.be.calledWith(scene1);
      indexer.index.should.be.calledWith(scene2);
    });
  });
});
