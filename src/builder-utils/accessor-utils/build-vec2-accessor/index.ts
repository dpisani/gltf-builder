import Buffer from '../../../components/buffer/index.js';
import BufferView from '../../../components/buffer-view/index.js';
import Accessor from '../../../components/accessor/index.js';

import buildVec2AccessorUnwired from './unwired.js';
import { Vec2 } from '../../../types/data-types.js';

/**
 * Creates an accessor for a 2 component vector array
 * with an underlying buffer.
 *
 * @param points An array of points.
 *
 * @returns An accessor for a data source.
 */
export const buildVec2Accessor = (points: Vec2[]) =>
  buildVec2AccessorUnwired(points, { Accessor, Buffer, BufferView });
