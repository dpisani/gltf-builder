import Buffer from '../../../components/buffer/index.js';
import BufferView from '../../../components/buffer-view/index.js';
import Accessor from '../../../components/accessor/index.js';

import { Vec3 } from '../../../types/data-types.js';

import buildVec3AccessorUnwired from './unwired.js';

/**
 * Creates an accessor for a 3 component vector array
 * with an underlying buffer.
 *
 * @param points An array of vectors.
 *
 * @returns An accessor for a data source for the geometry.
 */
export const buildVec3Accessor = (points: Vec3[]) =>
  buildVec3AccessorUnwired(points, { Accessor, Buffer, BufferView });
