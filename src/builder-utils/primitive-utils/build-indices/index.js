import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import buildIndicesUnwired from './unwired';

/**
 * @function buildIndices
 *
 * @desc Creates an accessor for primitive indices
 * with an underlying buffer.
 *
 * @param {u_int[]} indices An array of indices.
 *
 * @returns {Accessor} An accessor for a data source for the indices.
 */
export const buildIndices = indices =>
  buildIndicesUnwired(indices, { Accessor, Buffer, BufferView });
