import 'should';
import 'should-sinon';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Indexer from './';
import createIndexedComponent from '../../../util/indexed-component-stub';

describe('Indexer', () => {
  let indexer;

  beforeEach(() => {
    indexer = new Indexer();
  });

  describe('indexOf', () => {
    it('returns a sequential id for each object of the same type', () => {
      indexer.indexOf(createIndexedComponent('plumbus')).should.equal(0);
      indexer.indexOf(createIndexedComponent('plumbus')).should.equal(1);
      indexer.indexOf(createIndexedComponent('plumbus')).should.equal(2);
    });

    it('returns different sequences of ids for objects of different types', () => {
      indexer.indexOf(createIndexedComponent('plumbus')).should.equal(0);
      indexer.indexOf(createIndexedComponent('plumbus')).should.equal(1);
      indexer.indexOf(createIndexedComponent('schmeckel')).should.equal(0);
      indexer.indexOf(createIndexedComponent('schmeckel')).should.equal(1);
    });

    it('returns the correct id for a previously indexed object', () => {
      const dup = createIndexedComponent('plumbus');

      indexer.indexOf(dup).should.equal(0);
      indexer.indexOf(createIndexedComponent('plumbus')).should.equal(1);
      indexer.indexOf(dup).should.equal(0);
    });

    it('returns undefined for objects that do not have an index name', () => {
      (indexer.indexOf({}) === undefined).should.be.true();
    });
  });

  describe('indexAndBuild', () => {
    it('returns an empty object when nothing has been indexed', () => {
      indexer.indexAndBuild().should.deepEqual({});
    });

    it('builds all objects that have been indexed', () => {
      indexer.index(createIndexedComponent('schmeckels', () => 'one'));

      indexer.index(createIndexedComponent('schmeckels', () => 'two'));

      indexer.index(createIndexedComponent('plumbii', () => 'three'));

      const output = indexer.indexAndBuild();

      output.schmeckels.should.containDeep(['one', 'two']);
      output.plumbii.should.containDeep(['three']);
    });

    it('builds indexed objects in the same order they were declared', () => {
      indexer.index(createIndexedComponent('schmeckels', () => 'one'));

      indexer.index(createIndexedComponent('schmeckels', () => 'two'));

      indexer.index(createIndexedComponent('schmeckels', () => 'three'));

      indexer.index(createIndexedComponent('schmeckels', () => 'four'));

      indexer
        .indexAndBuild()
        .schmeckels.should.containDeepOrdered(['one', 'two', 'three', 'four']);
    });

    it('builds each object only once', () => {
      const schmeckel = createIndexedComponent('schmeckels', () => 'just me');

      indexer.index(schmeckel);
      indexer.index(schmeckel);

      indexer.indexAndBuild().schmeckels.should.deepEqual(['just me']);
    });

    it('passes itself to indexed objects', () => {
      const buildStub = stub().returns('');

      indexer.index(createIndexedComponent('schmeckels', buildStub));

      indexer.indexAndBuild();

      buildStub.should.be.calledWith(indexer);
    });

    it('builds entities indexed during building', () => {
      const schmeckel = createIndexedComponent('schmeckels', indexer => {
        indexer.index(createIndexedComponent('schmeckels', () => 'two'));
        return 'one';
      });

      indexer.index(schmeckel);

      indexer
        .indexAndBuild()
        .schmeckels.should.containDeepOrdered(['one', 'two']);
    });
  });
});
