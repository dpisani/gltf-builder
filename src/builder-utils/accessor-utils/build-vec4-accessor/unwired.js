export default (points, { Accessor, bufferViewFromArray }) => {
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
