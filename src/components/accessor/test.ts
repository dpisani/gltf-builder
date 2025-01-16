import 'should';

import { describe, it, beforeEach } from 'mocha';
import { createStubInstance } from 'sinon';

import Accessor from './index.js';
import Indexer from '../asset/indexer/index.js';
import BufferView from '../buffer-view/index.js';
import chainMethods from '../../test-util/chain-methods.js';

describe('Accessor', () => {
  let accessor: Accessor;

  const indexStub = createStubInstance<Indexer>(Indexer);
  indexStub.indexOf.returns(42);

  beforeEach(() => {
    accessor = new Accessor();
  });

  it('has no properties defined by default', () => {
    accessor.build(indexStub).should.deepEqual({});
  });

  it('can have a name', () => {
    accessor.name('accessor name');

    accessor.build(indexStub).should.have.property('name', 'accessor name');
  });

  it('can have its setters chained', () => {
    chainMethods(accessor).should.equal(accessor);
  });

  it('can have a component type', () => {
    accessor.componentType(5120);

    accessor.build(indexStub).should.deepEqual({ componentType: 5120 });
  });

  it('can have a data type', () => {
    accessor.type('SCALAR');

    accessor.build(indexStub).should.deepEqual({ type: 'SCALAR' });
  });

  it('can have a min value', () => {
    accessor.min([1, 2, 3]);

    accessor.build(indexStub).should.deepEqual({ min: [1, 2, 3] });
  });

  it('can have a max value', () => {
    accessor.max([1, 2, 3]);

    accessor.build(indexStub).should.deepEqual({ max: [1, 2, 3] });
  });

  it.skip('matches the min value precision to the data type', () => {});

  it.skip('matches the max value precision to the data type', () => {});

  it('can have a bufferView', () => {
    const bufferViewStub = createStubInstance<BufferView>(BufferView);
    bufferViewStub.build.returns({});

    accessor.bufferView(bufferViewStub);

    accessor.build(indexStub).should.deepEqual({ bufferView: 42 });
  });

  it('can have a count', () => {
    accessor.count(42);

    accessor.build(indexStub).should.deepEqual({ count: 42 });
  });
});
