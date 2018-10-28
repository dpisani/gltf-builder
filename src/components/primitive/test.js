import 'should';
import { describe, it, beforeEach } from 'mocha';
import { stub } from 'sinon';

import Primitive from './index';
import chainMethods from '../../test-util/chain-methods';

describe('Primitive', () => {
  let primitive;
  beforeEach(() => {
    primitive = new Primitive();
  });

  it('has attributes by default', () => {
    primitive.build().should.deepEqual({ attributes: {} });
  });

  it('can have its setters chained', () => {
    chainMethods(primitive).should.equal(primitive);
  });

  it('can have a primitive mode set', () => {
    primitive.mode(0);

    primitive.build().should.have.property('mode', 0);
  });

  describe('accessors', () => {
    let indexerStub;

    const accessorStub = {
      build: stub().returns({})
    };

    beforeEach(() => {
      const accessorIndexerStub = stub()
        .onFirstCall()
        .returns(42);

      indexerStub = {
        indexOf: accessorIndexerStub
      };
    });

    it('can have a POSITION accessor set', () => {
      primitive.position(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        POSITION: 42
      });
    });

    it('can have a NORMAL accessor set', () => {
      primitive.normal(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        NORMAL: 42
      });
    });

    it('can have a TANGENT accessor set', () => {
      primitive.tangent(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        TANGENT: 42
      });
    });

    it('can have a TEXCOORD_0 accessor set', () => {
      primitive.texcoord0(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        TEXCOORD_0: 42
      });
    });

    it('can have a TEXCOORD_1 accessor set', () => {
      primitive.texcoord1(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        TEXCOORD_1: 42
      });
    });

    it('can have a COLOR_0 accessor set', () => {
      primitive.color(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        COLOR_0: 42
      });
    });

    it('can have a JOINTS_0 accessor set', () => {
      primitive.joints(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        JOINTS_0: 42
      });
    });

    it('can have a WEIGHTS_0 accessor set', () => {
      primitive.weights(accessorStub);

      primitive.build(indexerStub).attributes.should.deepEqual({
        WEIGHTS_0: 42
      });
    });

    it('can have indices accessor set', () => {
      primitive.indices(accessorStub);

      primitive.build(indexerStub).should.have.property('indices', 42);
    });
  });
});
