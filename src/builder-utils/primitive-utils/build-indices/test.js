import 'should';
import 'should-sinon';

import { describe, it, beforeEach } from 'mocha';

import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import createStubComponent from '../../../test-util/create-stub-component';
import buildIndices from './unwired';

const indices = [0, 1, 2];

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
};

describe('generateIndices utility', () => {
  it('returns an accessor', () => {
    buildIndices(indices, deps).should.be.an.instanceOf(Accessor);
  });

  describe('accessor', () => {
    let accessor;

    beforeEach(() => {
      accessor = buildIndices(indices, deps);
    });

    it('sets the correct data types on the accessor', () => {
      accessor.type.should.be.calledWith(Accessor.types.SCALAR);
      accessor.componentType.should.be.calledWith(
        Accessor.componentTypes.UNSIGNED_SHORT
      );
    });

    it('sets the min and max on the accessor', () => {
      accessor.min.should.be.calledWith([0]);
      accessor.max.should.be.calledWith([2]);
    });

    it('sets a BufferView on the accessor', () => {
      accessor.bufferView.should.be.calledOnce();
      accessor.bufferView.firstCall.args[0].should.be.an.instanceOf(BufferView);
    });

    it('sets a count of the number of elements in the accessor', () => {
      accessor.count.should.be.calledWith(3);
    });

    describe('bufferView', () => {
      let bufferView;
      beforeEach(() => {
        bufferView = accessor.bufferView.firstCall.args[0];
      });

      it('sets the correct byteLength on the bufferView', () => {
        // 2 (UINT length) * 3
        bufferView.byteLength.should.be.calledWith(6);
      });

      it('sets a buffer on the bufferView', () => {
        bufferView.buffer.should.be.calledOnce();
        bufferView.buffer.firstCall.args[0].should.be.an.instanceOf(Buffer);
      });

      describe('buffer', () => {
        let buffer;
        beforeEach(() => {
          buffer = bufferView.buffer.firstCall.args[0];
        });

        it('sets data on the buffer', () => {
          buffer.data.firstCall.args[0].should.be.an.instanceOf(ArrayBuffer);
        });
      });
    });
  });
});
