import { mapValues } from 'lodash';
import ComponentBase from '../component-base/';
import pickBuiltProperties from '../../util/pick-built-properties';

/**
 * Primitive - A builder for the GLTF Primitive object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-primitive|GLTF reference}
 * @hideconstructor
 */
export default class Primitive extends ComponentBase {
  static get modes() {
    return {
      POINTS: 0,
      LINES: 1,
      LINE_LOOP: 2,
      LINE_STRIP: 3,
      TRIANGLES: 4,
      TRIANGLE_STRIP: 5,
      TRIANGLE_FAN: 6
    };
  }

  constructor() {
    super({ attributes: {} });

    this.colour = this.color;
  }

  mode(mode) {
    this.properties.mode = mode;
    return this;
  }

  position(position) {
    this.properties.attributes.POSITION = position;
    return this;
  }

  normal(normal) {
    this.properties.attributes.NORMAL = normal;
    return this;
  }

  tangent(tangent) {
    this.properties.attributes.TANGENT = tangent;
    return this;
  }

  texcoord0(texcoord0) {
    this.properties.attributes.TEXCOORD_0 = texcoord0;
    return this;
  }

  texcoord1(texcoord1) {
    this.properties.attributes.TEXCOORD_1 = texcoord1;
    return this;
  }

  color(color) {
    this.properties.attributes.COLOR_0 = color;
    return this;
  }

  joints(joints) {
    this.properties.attributes.JOINTS_0 = joints;
    return this;
  }

  weights(weights) {
    this.properties.attributes.WEIGHTS_0 = weights;
    return this;
  }

  /**
   * indices - Sets the indices property on the primitive
   *
   * @param {accessor} indices an accessor for index data
   *
   * @returns this
   */
  indices(indices) {
    this.properties.indices = indices;
    return this;
  }

  build(indexer) {
    const { attributes, ...properties } = this.properties;

    const indexedAttributes = mapValues(attributes, accessor =>
      indexer.indexOf(accessor)
    );

    const { indices, ...nonIndexedProperties } = properties;

    return pickBuiltProperties({
      ...nonIndexedProperties,
      indices: indices && indexer.indexOf(indices),
      attributes: indexedAttributes
    });
  }
}
