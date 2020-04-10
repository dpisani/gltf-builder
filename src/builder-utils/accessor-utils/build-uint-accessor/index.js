import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';
import Accessor from '../../../components/accessor';

import buildUIntAccessorUnwired from './unwired';

/**
 * @function buildUIntAccessor
 *
 * @desc Creates an accessor for an array of unsigned integers
 * with an underlying buffer.
 *
 * @param {number[]} indices An array of integers.
 *
 * @returns {Accessor} An accessor for a data source.
 */
export const buildUIntAccessor = indices =>
  buildUIntAccessorUnwired(indices, { Accessor, Buffer, BufferView });
