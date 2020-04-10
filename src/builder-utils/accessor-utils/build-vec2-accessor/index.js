import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import buildVec2AccessorUnwired from './unwired';

/**
 * @function buildVec2Accessor
 *
 * @desc Creates an accessor for a 2 component vector array
 * with an underlying buffer.
 *
 * @param {Vec2[]} points An array of points.
 *
 * @returns {Accessor} An accessor for a data source.
 */
export const buildVec2Accessor = points =>
  buildVec2AccessorUnwired(points, { Accessor, Buffer, BufferView });
