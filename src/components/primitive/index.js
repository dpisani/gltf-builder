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

  /**
   * Sets data for the TEXCOORD_0 property on the primitive
   *
   * @param {Accessor} texcoord Accessor containing Vec2 data
   * @returns {Primitive} this
   * @memberof Primitive
   */
  texcoord(texcoord) {
    this.properties.attributes.TEXCOORD_0 = texcoord;
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
   * @param {Accessor} indices an accessor for UInt index data
   *
   * @returns {Primitive} this
   */
  indices(indices) {
    this.properties.indices = indices;
    return this;
  }

  /**
   * material - Sets the material for this primitive
   *
   * @param {Material} material
   *
   * @returns {Primitive} this
   */
  material(material) {
    this.properties.material = material;

    return this;
  }

  build(indexer) {
    const { attributes, ...properties } = this.properties;

    const indexedAttributes = mapValues(attributes, accessor =>
      indexer.indexOf(accessor)
    );

    const { indices, material, ...nonIndexedProperties } = properties;

    return pickBuiltProperties({
      ...nonIndexedProperties,
      indices: indices && indexer.indexOf(indices),
      material: material && indexer.indexOf(material),
      attributes: indexedAttributes
    });
  }
}
