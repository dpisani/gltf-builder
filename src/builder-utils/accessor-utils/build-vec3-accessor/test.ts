import 'should';
import 'should-sinon';

import { describe, it, beforeEach } from 'mocha';

import Buffer from '../../../components/buffer/index.js';
import BufferView from '../../../components/buffer-view/index.js';
import Accessor from '../../../components/accessor/index.js';

import createStubComponent from '../../../test-util/create-stub-component.js';
import { SinonStub } from 'sinon';

import buildVec3Accessor from './unwired.js';
import { Vec3 } from '../../../types/data-types.js';

const points: Vec3[] = [[0, 1, 0], [1, 0, 0], [0, 0, 1]];

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

describe('buildVec3Accessor utility', () => {
  it('returns an accessor', () => {
    buildVec3Accessor(points, deps).should.be.an.instanceOf(Accessor);
  });

  describe('accessor', () => {
    let accessor: Accessor;

    beforeEach(() => {
      accessor = buildVec3Accessor(points, deps);
    });

    it('sets the correct data types on the accessor', () => {
      accessor.type.should.be.calledWith(Accessor.AttributeTypes.VEC3);
      accessor.componentType.should.be.calledWith(
        Accessor.ComponentTypes.FLOAT
      );
    });

    it('sets the min and max on the accessor', () => {
      accessor.min.should.be.calledWith([0, 0, 0]);
      accessor.max.should.be.calledWith([1, 1, 1]);
    });

    it('sets a BufferView on the accessor', () => {
      accessor.bufferView.should.be.calledOnce();
      (accessor.bufferView as SinonStub).firstCall.args[0].should.be.an.instanceOf(
        BufferView
      );
    });

    it('sets a count of the number of elements in the accessor', () => {
      accessor.count.should.be.calledWith(3);
    });

    describe('bufferView', () => {
      let bufferView: BufferView;
      beforeEach(() => {
        bufferView = (accessor.bufferView as SinonStub).firstCall.args[0];
      });

      it('sets the correct byteLength on the bufferView', () => {
        // 4 (float length) * 3 * 3
        bufferView.byteLength.should.be.calledWith(36);
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
});
