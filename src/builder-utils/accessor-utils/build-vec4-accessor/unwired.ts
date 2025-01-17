import { Vec4 } from "../../../types/data-types.js";
import { bufferViewFromArray as bufferViewFromArrayType } from "../../data-utils/index.js";
import AccessorType from "../../../components/accessor/index.js";

export default (
  points: Vec4[],
  {
    Accessor,
    bufferViewFromArray,
  }: {
    Accessor: typeof AccessorType;
    bufferViewFromArray: typeof bufferViewFromArrayType;
  },
) => {
  const floats = new Float32Array(points.length * 4);
  points.forEach((point, i) => {
    floats.set(point, i * 4);
  });

  return new Accessor()
    .bufferView(bufferViewFromArray(floats))
    .componentType(Accessor.ComponentTypes.FLOAT)
    .type(Accessor.AttributeTypes.VEC4)
    .count(points.length);
};
