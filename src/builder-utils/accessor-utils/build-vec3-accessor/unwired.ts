import AccessorType from "../../../components/accessor/index.js";
import BufferViewType from "../../../components/buffer-view/index.js";
import BufferType from "../../../components/buffer/index.js";
import { Vec3 } from "../../../types/data-types.js";
import { getMinMaxVectors } from "../getMinMaxVectors.js";

export default (
  points: Vec3[],
  {
    Accessor,
    BufferView,
    Buffer,
  }: {
    Accessor: typeof AccessorType;
    BufferView: typeof BufferViewType;
    Buffer: typeof BufferType;
  },
) => {
  const { min, max } = getMinMaxVectors(points, 3);

  const floats = new Float32Array(points.length * 3);
  points.forEach((point, i) => {
    floats.set(point, i * 3);
  });

  const buffer = new Buffer().data(floats.buffer);
  const bufferView = new BufferView()
    .buffer(buffer)
    .byteLength(floats.buffer.byteLength);

  return new Accessor()
    .bufferView(bufferView)
    .componentType(Accessor.ComponentTypes.FLOAT)
    .type(Accessor.AttributeTypes.VEC3)
    .min(min)
    .max(max)
    .count(points.length);
};
