import AccessorType from "../../../components/accessor/index.js";
import BufferViewType from "../../../components/buffer-view/index.js";
import BufferType from "../../../components/buffer/index.js";
import { Vec2 } from "../../../types/data-types.js";
import { getMinMaxVectors } from "../getMinMaxVectors.js";

export default (
  points: Vec2[],
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
  const { min, max } = getMinMaxVectors(points, 2);

  const floats = new Float32Array(points.length * 2);
  points.forEach((point, i) => {
    floats.set(point, i * 2);
  });

  const buffer = new Buffer().data(floats.buffer);
  const bufferView = new BufferView()
    .buffer(buffer)
    .byteLength(floats.buffer.byteLength);

  return new Accessor()
    .bufferView(bufferView)
    .componentType(Accessor.ComponentTypes.FLOAT)
    .type(Accessor.AttributeTypes.VEC2)
    .min(min)
    .max(max)
    .count(points.length);
};
