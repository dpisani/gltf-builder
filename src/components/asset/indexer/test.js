import 'should';
import 'should-sinon';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Indexer from './';

describe('Indexer', () => {
  let indexer;

  beforeEach(() => {
    indexer = new Indexer();
  });

  describe('indexOf', () => {
    it('returns a sequential id for each object of the same type', () => {
      indexer.indexOf('plumbus', {}).should.equal(0);
      indexer.indexOf('plumbus', {}).should.equal(1);
      indexer.indexOf('plumbus', {}).should.equal(2);
    });

    it('returns different sequences of ids for objects of different types', () => {
      indexer.indexOf('plumbus', {}).should.equal(0);
      indexer.indexOf('plumbus', {}).should.equal(1);
      indexer.indexOf('schmeckel', {}).should.equal(0);
      indexer.indexOf('schmeckel', {}).should.equal(1);
    });

    it('returns the correct id for a previously indexed object', () => {
      const dup = {};

      indexer.indexOf('plumbus', dup).should.equal(0);
      indexer.indexOf('plumbus', {}).should.equal(1);
      indexer.indexOf('plumbus', dup).should.equal(0);
    });
  });

  describe('indexAndBuild', () => {
    it('returns an empty object when nothing has been indexed', () => {
      indexer.indexAndBuild().should.deepEqual({});
    });

    it('builds all objects that have been indexed', () => {
      indexer.index('schmeckels', {
        build: () => 'one'
      });

      indexer.index('schmeckels', {
        build: () => 'two'
      });

      indexer.index('plumbii', {
        build: () => 'three'
      });

      const output = indexer.indexAndBuild();

      output.schmeckels.should.containDeep(['one', 'two']);
      output.plumbii.should.containDeep(['three']);
    });

    it('builds indexed objects in the same order they were declared', () => {
      indexer.index('schmeckels', {
        build: () => 'one'
      });

      indexer.index('schmeckels', {
        build: () => 'two'
      });

      indexer.index('schmeckels', {
        build: () => 'three'
      });

      indexer.index('schmeckels', {
        build: () => 'four'
      });

      indexer
        .indexAndBuild()
        .schmeckels.should.containDeepOrdered(['one', 'two', 'three', 'four']);
    });

    it('builds each object only once', () => {
      const schmeckel = { build: () => 'just me' };

      indexer.index('schmeckels', schmeckel);
      indexer.index('schmeckels', schmeckel);

      indexer.indexAndBuild().schmeckels.should.deepEqual(['just me']);
    });

    it('passes itself to indexed objects', () => {
      const buildStub = stub().returns('');

      indexer.index('schmeckels', { build: buildStub });

      indexer.indexAndBuild();

      buildStub.should.be.calledWith(indexer);
    });

    it('builds entities indexed during building', () => {
      const schmeckel = {
        build: indexer => {
          indexer.index('schmeckels', { build: () => 'two' });
          return 'one';
        }
      };

      indexer.index('schmeckels', schmeckel);

      indexer
        .indexAndBuild()
        .schmeckels.should.containDeepOrdered(['one', 'two']);
    });
  });
});
