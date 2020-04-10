import { flatten } from 'lodash';

export default (points, { Accessor, bufferViewFromArray }) => {
  const components = flatten(points);
  const floats = Float32Array.of(...components);

  return new Accessor()
    .bufferView(bufferViewFromArray(floats))
    .componentType(Accessor.componentTypes.FLOAT)
    .type(Accessor.types.VEC4)
    .count(points.length);
};
