import Accessor from "../../../components/accessor/index.js";
import { Vec4 } from "../../../types/data-types.js";

import { bufferViewFromArray } from "../../data-utils/index.js";

import buildVec4AccessorUnwired from "./unwired.js";

/**
 * Creates an accessor for a 4 component vector array
 * with an underlying buffer.
 *
 * @param points An array of vectors.
 *
 * @returns An accessor for the data.
 */
export const buildVec4Accessor = (points: Vec4[]) =>
  buildVec4AccessorUnwired(points, { Accessor, bufferViewFromArray });
