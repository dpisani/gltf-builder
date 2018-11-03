import Accessor from '../../../components/accessor';

import { bufferViewFromArray } from '../../data-utils';

import buildColourUnwired from './unwired';

/**
 * @function buildColour
 *
 * @desc Creates an accessor for COLOR_0 data
 * with an underlying buffer.
 *
 * @param {Vec4[]} points An array of colours.
 *
 * @returns {Accessor} An accessor for the colour data.
 */
export const buildColour = points =>
  buildColourUnwired(points, { Accessor, bufferViewFromArray });

/**
 * @function buildColor
 *
 * @desc an alias for {@link buildColour}
 */
export const buildColor = buildColour;
