import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import buildPositionUnwired from './unwired';

/**
 * @function buildPosition
 *
 * @desc Creates an accessor for POSITION data
 * with an underlying buffer.
 *
 * @param {Vec3[]} points An array of points.
 *
 * @returns {Accessor} An accessor for a data source for the geometry.
 */
export const buildPosition = points =>
  buildPositionUnwired(points, { Accessor, Buffer, BufferView });
