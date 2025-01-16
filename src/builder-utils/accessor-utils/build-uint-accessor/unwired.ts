import type BufferType from '../../../components/buffer/index.js';
import type BufferViewType from '../../../components/buffer-view/index.js';
import type AccessorType from '../../../components/accessor/index.js';

export default (indices: number[], { Accessor, BufferView, Buffer }: {Accessor: typeof AccessorType, BufferView: typeof BufferViewType, Buffer: typeof BufferType}) => {
  // get min and max component values
  const { min, max } = indices.reduce<{ min?: number; max?: number }>(
    (
      acc,
      index: number
    ) => ({
      min: acc.min === undefined || index < acc.min ? index : acc.min,
      max: acc.max === undefined || index > acc.max ? index : acc.max
    }),
    {}
  );

  const ints = Uint16Array.of(...indices);

  const buffer = new Buffer().data(ints.buffer);
  const bufferView = new BufferView()
    .buffer(buffer)
    .byteLength(ints.buffer.byteLength);

  if (min === undefined || max === undefined ) {
    throw new Error("Invalid data provided.")
  }

  return new Accessor()
    .bufferView(bufferView)
    .componentType(Accessor.ComponentTypes.UNSIGNED_SHORT)
    .type(Accessor.AttributeTypes.SCALAR)
    .min([min])
    .max([max])
    .count(indices.length);
};
