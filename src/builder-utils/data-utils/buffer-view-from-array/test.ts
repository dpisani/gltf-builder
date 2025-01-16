import 'should';
import 'should-sinon';

import { describe, it, beforeEach } from 'mocha';

import Buffer from '../../../components/buffer/index.js';
import BufferView from '../../../components/buffer-view/index.js';
import Accessor from '../../../components/accessor/index.js';

import createStubComponent from '../../../test-util/create-stub-component.js';
import { SinonStub } from 'sinon';

import bufferViewFromArray from './unwired.js';

const typedArray = Uint16Array.of(0, 1, 2);

const accessorStub = createStubComponent(Accessor, [
  'type',
  'componentType',
  'bufferView',
  'min',
  'max',
  'count'
]);

const bufferStub = createStubComponent(Buffer, ['data']);

const bufferViewStub = createStubComponent(BufferView, [
  'buffer',
  'byteLength'
]);

const deps = {
  Accessor: accessorStub.StubClass,
  Buffer: bufferStub.StubClass,
  BufferView: bufferViewStub.StubClass
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

describe('bufferViewFromArray utility', () => {
  it('returns an buffer view', () => {
    bufferViewFromArray(typedArray, deps).should.be.an.instanceOf(BufferView);
  });

  describe('bufferView', () => {
    let bufferView: BufferView;
    beforeEach(() => {
      bufferView = bufferViewFromArray(typedArray, deps);
    });

    it('sets the correct byteLength on the bufferView', () => {
      // 2 (UINT length) * 3
      bufferView.byteLength.should.be.calledWith(6);
    });

    it('sets a buffer on the bufferView', () => {
      bufferView.buffer.should.be.calledOnce();
      (bufferView.buffer as SinonStub).firstCall.args[0].should.be.an.instanceOf(
        Buffer
      );
    });

    describe('buffer', () => {
      let buffer: Buffer;
      beforeEach(() => {
        buffer = (bufferView.buffer as SinonStub).firstCall.args[0];
      });

      it('sets data on the buffer', () => {
        (buffer.data as SinonStub).firstCall.args[0].should.be.an.instanceOf(
          ArrayBuffer
        );
      });
    });
  });
});
