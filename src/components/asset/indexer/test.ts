import 'should';
import 'should-sinon';
import { describe, it, beforeEach } from 'mocha';
import { stub, spy } from 'sinon';

import Indexer from './index.js';
import NamedComponent from '../../named-component/index.js';

describe('Indexer', () => {
  let indexer: Indexer;

  beforeEach(() => {
    indexer = new Indexer();
  });

  describe('indexOf', () => {
    it('returns a sequential id for each object of the same type', () => {
      indexer
        .indexOf(new NamedComponent({ indexName: 'plumbus' }))
        .should.equal(0);
      indexer
        .indexOf(new NamedComponent({ indexName: 'plumbus' }))
        .should.equal(1);
      indexer
        .indexOf(new NamedComponent({ indexName: 'plumbus' }))
        .should.equal(2);
    });

    it('returns different sequences of ids for objects of different types', () => {
      indexer
        .indexOf(new NamedComponent({ indexName: 'plumbus' }))
        .should.equal(0);
      indexer
        .indexOf(new NamedComponent({ indexName: 'plumbus' }))
        .should.equal(1);
      indexer
        .indexOf(new NamedComponent({ indexName: 'schmeckel' }))
        .should.equal(0);
      indexer
        .indexOf(new NamedComponent({ indexName: 'schmeckel' }))
        .should.equal(1);
    });

    it('returns the correct id for a previously indexed object', () => {
      const dup = new NamedComponent({ indexName: 'plumbus' });

      indexer.indexOf(dup).should.equal(0);
      indexer
        .indexOf(new NamedComponent({ indexName: 'plumbus' }))
        .should.equal(1);
      indexer.indexOf(dup).should.equal(0);
    });
  });

  describe('buildIndexedEntities', () => {
    it('returns an empty object when nothing has been indexed', () => {
      indexer.buildIndexedEntities().should.deepEqual({});
    });

    it('builds all objects that have been indexed', () => {
      indexer.index(
        new NamedComponent({
          indexName: 'schmeckels',
          defaultProperties: { value: 'one' }
        })
      );

      indexer.index(
        new NamedComponent({
          indexName: 'schmeckels',
          defaultProperties: { value: 'two' }
        })
      );

      indexer.index(
        new NamedComponent({
          indexName: 'plumbii',
          defaultProperties: { value: 'three' }
        })
      );

      const output = indexer.buildIndexedEntities();

      output.schmeckels!.should.containDeep([
        { value: 'one' },
        { value: 'two' }
      ]);
      output.plumbii!.should.containDeep([{ value: 'three' }]);
    });

    it('builds indexed objects in the same order they were declared', () => {
      indexer.index(
        new NamedComponent({
          indexName: 'schmeckels',
          defaultProperties: { value: 'one' }
        })
      );

      indexer.index(
        new NamedComponent({
          indexName: 'schmeckels',
          defaultProperties: { value: 'two' }
        })
      );

      indexer.index(
        new NamedComponent({
          indexName: 'schmeckels',
          defaultProperties: { value: 'three' }
        })
      );

      indexer.index(
        new NamedComponent({
          indexName: 'schmeckels',
          defaultProperties: { value: 'four' }
        })
      );

      indexer
        .buildIndexedEntities()
        .schmeckels!.should.containDeepOrdered([
          { value: 'one' },
          { value: 'two' },
          { value: 'three' },
          { value: 'four' }
        ]);
    });

    it('builds each object only once', () => {
      const schmeckel = new NamedComponent({
        indexName: 'schmeckels',
        defaultProperties: { value: 'just me' }
      });

      indexer.index(schmeckel);
      indexer.index(schmeckel);

      indexer
        .buildIndexedEntities()
        .schmeckels!.should.deepEqual([{ value: 'just me' }]);
    });

    it('passes itself to indexed objects', () => {
      const component = new NamedComponent({
        indexName: 'schmeckels'
      });

      const buildSpy = spy(component, 'build');

      indexer.index(component);

      indexer.buildIndexedEntities();

      buildSpy.should.be.calledWith(indexer);
    });

    it('builds entities indexed during building', () => {
      const schmeckel = new NamedComponent({
        indexName: 'schmeckels'
      });

      stub(schmeckel, 'build').callsFake(indexer => {
        indexer.index(
          new NamedComponent({
            indexName: 'schmeckels',
            defaultProperties: { value: 'two' }
          })
        );
        return { value: 'one' };
      });

      indexer.index(schmeckel);

      indexer
        .buildIndexedEntities()
        .schmeckels!.should.containDeepOrdered([
          { value: 'one' },
          { value: 'two' }
        ]);
    });
  });
});
