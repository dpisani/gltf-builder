import { flatten } from 'lodash';

export default (colours, { Accessor, bufferViewFromArray }) => {
  const components = flatten(colours);
  const floats = Float32Array.of(...components);

  return new Accessor()
    .bufferView(bufferViewFromArray(floats))
    .componentType(Accessor.componentTypes.FLOAT)
    .type(Accessor.types.VEC4)
    .count(colours.length);
};
