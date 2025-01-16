import 'should';

import { describe, it, beforeEach } from 'mocha';
import { createStubInstance } from 'sinon';

import BufferView from './index.js';
import Buffer from '../buffer/index.js';
import Indexer from '../asset/indexer/index.js';
import chainMethods from '../../test-util/chain-methods.js';

describe('BufferView', () => {
  let bufferView: BufferView;
  const indexStub = createStubInstance<Indexer>(Indexer);
  indexStub.indexOf.returns(42);

  beforeEach(() => {
    bufferView = new BufferView();
  });

  it('has no properties defined by default', () => {
    bufferView.build(indexStub).should.deepEqual({});
  });

  it('can have a name', () => {
    bufferView.name('buffer view name');

    bufferView
      .build(indexStub)
      .should.have.property('name', 'buffer view name');
  });

  it('can have its setters chained', () => {
    chainMethods(bufferView).should.equal(bufferView);
  });

  it('can have a byteLength', () => {
    bufferView.byteLength(1024);

    bufferView.build(indexStub).should.deepEqual({ byteLength: 1024 });
  });

  it('can have a buffer', () => {
    const bufferStub = createStubInstance<Buffer>(Buffer);
    bufferStub.build.returns({});

    bufferView.buffer(bufferStub);

    bufferView.build(indexStub).should.deepEqual({ buffer: 42 });
  });
});
