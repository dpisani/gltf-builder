import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

/**
 * Accessor component types
 * @alias AccessorComponentTypes
 * @enum {number}
 */
const componentTypes = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  UNSIGNED_INT: 5125,
  FLOAT: 5126
};

/**
 * Describes the type of data held by an accessor
 * @alias AccessorAttributeTypes
 * @enum {string}
 */
const types = {
  SCALAR: 'SCALAR',
  VEC2: 'VEC2',
  VEC3: 'VEC3',
  VEC4: 'VEC4',
  MAT2: 'MAT2',
  MAT3: 'MAT3',
  MAT4: 'MAT4'
};

/**
 * Accessor - a builder for a GLTF accessor object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-accessor|GLTF reference}
 * @hideconstructor
 */
export default class Accessor extends NamedComponent {
  /**
   * @static componentTypes - Valid data types for accessors
   *
   * @type {AccessorComponentTypes}
   */
  static get componentTypes() {
    return componentTypes;
  }

  /**
   * @static types - Valid attribute types for accessors
   * @type {AccessorAttributeTypes}
   */
  static get types() {
    return types;
  }

  constructor() {
    super({ indexName: 'accessors' });
  }

  componentType(componentType) {
    this.properties.componentType = componentType;

    return this;
  }

  type(type) {
    this.properties.type = type;

    return this;
  }

  min(min) {
    this.properties.min = min;

    return this;
  }

  max(max) {
    this.properties.max = max;

    return this;
  }

  bufferView(bufferView) {
    this.properties.bufferView = bufferView;

    return this;
  }

  /**
   * count - sets the count property on the accessor
   *
   * @param {number} count number of attributes referenced by this accessor,
   * not to be confused with the number of bytes or number of components.
   *
   * @returns {Accessor} this
   */
  count(count) {
    this.properties.count = count;

    return this;
  }

  build(indexer) {
    const { bufferView, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      bufferView: bufferView && indexer.indexOf(bufferView)
    });
  }
}
