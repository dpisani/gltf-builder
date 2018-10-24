import { flatten } from 'lodash';

import Buffer from '../../buffer';
import BufferView from '../../buffer-view';
import Accessor from '../../accessor';

/**
 * positionFromPoints - creates an accessor for POSITION data
 * with an underlying buffer.
 *
 * @param {Vec3[]} points An array of points.
 *
 * @returns {Accessor} An accessor for a data source for the geometry.
 */
export const positionFromPoints = points => {
  const components = flatten(points);
  const floats = Float32Array.of(...components);

  const buffer = new Buffer().data(floats.buffer);
  const bufferView = new BufferView()
    .buffer(buffer)
    .byteLength(floats.buffer.byteLength);

  return new Accessor()
    .bufferView(bufferView)
    .componentType(Accessor.componentTypes.FLOAT)
    .type(Accessor.types.VEC3);
};
