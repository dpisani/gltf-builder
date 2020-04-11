export default (indices, { Accessor, BufferView, Buffer }) => {
  // get min and max component values
  const { min, max } = indices.reduce(
    (acc, index) => ({
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

  return new Accessor()
    .bufferView(bufferView)
    .componentType(Accessor.ComponentTypes.UNSIGNED_SHORT)
    .type(Accessor.AttributeTypes.SCALAR)
    .min([min])
    .max([max])
    .count(indices.length);
};
