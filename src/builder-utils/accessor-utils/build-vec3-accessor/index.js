import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import buildVec3AccessorUnwired from './unwired';

/**
 * @function buildVec3Accessor
 *
 * @desc Creates an accessor for a 3 component vector array
 * with an underlying buffer.
 *
 * @param {Vec3[]} points An array of vectors.
 *
 * @returns {Accessor} An accessor for a data source for the geometry.
 */
export const buildVec3Accessor = points =>
  buildVec3AccessorUnwired(points, { Accessor, Buffer, BufferView });
