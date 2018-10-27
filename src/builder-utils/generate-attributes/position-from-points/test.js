import 'should';
import 'should-sinon';

import { describe, it, beforeEach } from 'mocha';

import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import createStubComponent from '../../../test-util/create-stub-component';
import positionFromPoints from './index';

const points = [[0, 1, 0], [1, 0, 0], [0, 0, 1]];

const accessorStub = createStubComponent(Accessor, [
  'type',
  'componentType',
  'bufferView',
  'min',
  'max'
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

describe('positionFromPoints utility', () => {
  it('returns an accessor', () => {
    positionFromPoints(points, deps).should.be.an.instanceOf(Accessor);
  });

  describe('accessor', () => {
    let accessor;

    beforeEach(() => {
      accessor = positionFromPoints(points, deps);
    });

    it('sets the correct data types on the accessor', () => {
      accessor.type.should.be.calledWith(Accessor.types.VEC3);
      accessor.componentType.should.be.calledWith(
        Accessor.componentTypes.FLOAT
      );
    });

    it('sets the min and max on the accessor', () => {
      accessor.min.should.be.calledWith([0, 0, 0]);
      accessor.max.should.be.calledWith([1, 1, 1]);
    });

    it('sets a BufferView on the accessor', () => {
      accessor.bufferView.should.be.calledOnce();
      accessor.bufferView.firstCall.args[0].should.be.an.instanceOf(BufferView);
    });

    describe('bufferView', () => {
      let bufferView;
      beforeEach(() => {
        bufferView = accessor.bufferView.firstCall.args[0];
      });

      it('sets the correct byteLength on the bufferView', () => {
        // 4 (float length) * 3 * 3
        bufferView.byteLength.should.be.calledWith(36);
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
