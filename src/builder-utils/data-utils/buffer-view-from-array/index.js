import Buffer from '../../../components/buffer';
import BufferView from '../../../components/buffer-view';

import bufferViewFromArrayUnwired from './unwired';

/**
 * @function bufferViewFromArray
 *
 * @desc Creates an accessor for primitive indices
 * with an underlying buffer.
 *
 * @param {TypedArray} typedArray One of the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray|Typed arrays}.
 *
 * @returns {BufferView} A buffer view configured with an underlying buffer.
 */
export const bufferViewFromArray = typedArray =>
  bufferViewFromArrayUnwired(typedArray, { Buffer, BufferView });
