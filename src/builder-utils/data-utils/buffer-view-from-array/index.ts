import Buffer from "../../../components/buffer/index.js";
import BufferView from "../../../components/buffer-view/index.js";

import bufferViewFromArrayUnwired from "./unwired.js";

/**
 * Creates an accessor for primitive indices
 * with an underlying buffer.
 *
 * @param typedArray One of the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray | Typed arrays}.
 *
 * @returns A buffer view configured with an underlying buffer.
 */
export const bufferViewFromArray = (typedArray: ArrayBufferView) =>
  bufferViewFromArrayUnwired(typedArray, { Buffer, BufferView });
