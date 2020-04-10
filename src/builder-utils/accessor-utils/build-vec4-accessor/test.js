import 'should';
import 'should-sinon';

import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Accessor from '../../../components/accessor';

import createStubComponent from '../../../test-util/create-stub-component';
import buildVec4Accessor from './unwired';

const colours = [[0, 1, 0, 1], [1, 0, 0, 1], [0, 0, 1, 1]];

const accessorStub = createStubComponent(Accessor, [
  'type',
  'componentType',
  'bufferView',
  'min',
  'max',
  'count'
]);

const mockBufferView = {};
const bufferViewFromArrayStub = stub().returns(mockBufferView);

const deps = {
  Accessor: accessorStub.StubClass,
  bufferViewFromArray: bufferViewFromArrayStub
};

describe('buildVec4Accessor utility', () => {
  it('returns an accessor', () => {
    buildVec4Accessor(colours, deps).should.be.an.instanceOf(Accessor);
  });

  describe('accessor', () => {
    let accessor;

    beforeEach(() => {
      accessor = buildVec4Accessor(colours, deps);
    });

    it('sets the correct data types on the accessor', () => {
      accessor.type.should.be.calledWith(Accessor.types.VEC4);
      accessor.componentType.should.be.calledWith(
        Accessor.componentTypes.FLOAT
      );
    });

    it('sets a BufferView on the accessor using the data', () => {
      bufferViewFromArrayStub.firstCall.args[0].should.be.an.instanceOf(
        Float32Array
      );

      accessor.bufferView.should.be.calledOnce();
      accessor.bufferView.should.be.calledWith(mockBufferView);
    });

    it('sets a count of the number of elements in the accessor', () => {
      accessor.count.should.be.calledWith(3);
    });
  });
});
