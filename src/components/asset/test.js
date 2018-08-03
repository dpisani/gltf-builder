import 'should';
import 'should-sinon';
import { describe, it, beforeEach } from 'mocha';
import { stub, spy } from 'sinon';

import Asset from './';
import Indexer from './indexer';

import createIndexedComponent from '../../util/indexed-component-stub';

describe('Asset', () => {
  let asset;

  beforeEach(() => {
    asset = new Asset();
  });

  it('contains an asset section', () => {
    const generated = asset.build();

    generated.should.have.property('asset');
  });

  it('specifies a version', () => {
    const generated = asset.build();

    generated.asset.should.have.property('version', '2.0');
  });

  it('represents indexed entities at the top level', () => {
    const indexerStub = {
      buildIndexedEntities: stub().returns({
        plumbus: ['p1'],
        schmeckel: ['s1', 's2']
      }),
      index: stub()
    };

    const generated = asset.build(indexerStub);

    generated.should.have.property('plumbus');
    generated.should.have.property('schmeckel');
    generated.plumbus.length.should.equal(1);
    generated.schmeckel.length.should.equal(2);
  });

  it('can have its setters chained', () => {
    asset.addScene().should.equal(asset);
  });

  describe('contains a list of scenes', () => {
    it('has no scenes property by default', () => {
      asset.build().should.not.have.property('scenes');
    });

    it('can have scenes added', () => {
      const sceneStub = createIndexedComponent('scenes', stub());

      const builtScene = {};
      sceneStub.build.returns(builtScene);
      asset.addScene(sceneStub);

      const generated = asset.build();

      generated.should.have.property('scenes');
      sceneStub.build.should.be.calledOnce();
      generated.scenes.length.should.equal(1);
      generated.scenes[0].should.equal(builtScene);
    });

    it('indexes scenes before building', () => {
      const scene1 = createIndexedComponent('scenes');
      const scene2 = createIndexedComponent('scenes');

      const indexer = new Indexer();
      indexer.index = spy(indexer.index);

      asset.addScene(scene1).addScene(scene2);

      asset.build(indexer);

      indexer.index.should.be.calledWith(scene1);
      indexer.index.should.be.calledWith(scene2);
    });
  });
});
