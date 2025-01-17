import Buffer from "../../../components/buffer/index.js";
import BufferView from "../../../components/buffer-view/index.js";
import Accessor from "../../../components/accessor/index.js";

import buildUIntAccessorUnwired from "./unwired.js";

/**
 * Creates an accessor for an array of unsigned integers
 * with an underlying buffer.
 *
 * @param indices An array of integers.
 *
 * @returns An accessor for a data source.
 */
export const buildUIntAccessor = (indices: number[]): Accessor =>
  buildUIntAccessorUnwired(indices, { Accessor, Buffer, BufferView });
