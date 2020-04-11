import { mapValues } from 'lodash';
import ComponentBase from '../component-base/';
import pickBuiltProperties from '../../util/pick-built-properties';

/**
 * Rendering modes for a primitive. All values correspond to WebGL enum values.
 * @alias Modes
 * @enum {number}
 * @memberof Primitive
 * @static
 */
const modes = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6
};

/**
 * A builder for the GLTF Primitive object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-primitive|GLTF reference}
 * @hideconstructor
 */
export default class Primitive extends ComponentBase {
  static get Modes() {
    return modes;
  }

  constructor() {
    super({ attributes: {} });

    this.colour = this.color;
  }

  /**
   * Sets the mode for this primitive
   *
   * @param {Primitive.Modes} mode
   * @returns {Primitive} this
   * @memberof Primitive
   */
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
   * Sets data for the TEXCOORD property on the primitive
   *
   * @param {Accessor} texcoord Accessor containing Vec2 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form TEXCOORD_<index>
   * @returns {Primitive} this
   * @memberof Primitive
   */
  texcoord(texcoord, index = 0) {
    this.properties.attributes[`TEXCOORD_${index}`] = texcoord;
    return this;
  }

  /**
   * Sets data for the COLOR property on the primitive
   *
   * @param {Accessor} color Accessor containing Vec3 or Vec4 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form COLOR_<index>
   * @returns {Primitive} this
   * @memberof Primitive
   */
  color(color, index = 0) {
    this.properties.attributes[`COLOR_${index}`] = color;
    return this;
  }

  /**
   * Sets data for the JOINTS property on the primitive
   *
   * @param {Accessor} joints Accessor containing Vec4 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form JOINTS_<index>
   * @returns {Primitive} this
   * @memberof Primitive
   */
  joints(joints, index = 0) {
    this.properties.attributes[`JOINTS_${index}`] = joints;
    return this;
  }

  /**
   * Sets data for the WEIGHTS property on the primitive
   *
   * @param {Accessor} weights Accessor containing Vec4 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form WEIGHTS_<index>
   * @returns {Primitive} this
   * @memberof Primitive
   */
  weights(weights, index = 0) {
    this.properties.attributes[`WEIGHTS_${index}`] = weights;
    return this;
  }

  /**
   * Sets the indices property on the primitive
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
   * Sets the material for this primitive
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
