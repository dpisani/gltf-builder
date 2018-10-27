import 'should';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import BufferView from './index';
import chainMethods from '../../test-util/chain-methods';

describe('BufferView', () => {
  let bufferView;

  beforeEach(() => {
    bufferView = new BufferView();
  });

  it('has no properties defined by default', () => {
    bufferView.build().should.deepEqual({});
  });

  it('can have a name', () => {
    bufferView.name('buffer view name');

    bufferView.build().should.have.property('name', 'buffer view name');
  });

  it('can have its setters chained', () => {
    chainMethods(bufferView).should.equal(bufferView);
  });

  it('can have a byteLength', () => {
    bufferView.byteLength(1024);

    bufferView.build().should.deepEqual({ byteLength: 1024 });
  });

  it('can have a buffer', () => {
    const indexStub = { indexOf: stub().returns(42) };
    const bufferStub = {
      build: stub().returns({})
    };

    bufferView.buffer(bufferStub);

    bufferView.build(indexStub).should.deepEqual({ buffer: 42 });
  });
});
