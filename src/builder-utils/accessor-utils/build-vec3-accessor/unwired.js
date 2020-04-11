export default (points, { Accessor, BufferView, Buffer }) => {
  // get min and max component values
  const min = [null, null, null];
  const max = [null, null, null];
  points.forEach(v => {
    for (let i = 0; i < 3; i++) {
      min[i] = min[i] === null || v[i] < min[i] ? v[i] : min[i];
      max[i] = max[i] === null || v[i] > max[i] ? v[i] : max[i];
    }
  });

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
