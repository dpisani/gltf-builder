import Accessor from '../../../components/accessor';

import { bufferViewFromArray } from '../../data-utils';

import buildVec4AccessorUnwired from './unwired';

/**
 * @function buildVec4Accessor
 *
 * @desc Creates an accessor for a 4 component vector array
 * with an underlying buffer.
 *
 * @param {Vec4[]} points An array of vectors.
 *
 * @returns {Accessor} An accessor for the data.
 */
export const buildVec4Accessor = points =>
  buildVec4AccessorUnwired(points, { Accessor, bufferViewFromArray });
