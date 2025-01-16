import NamedComponent from '../named-component/index.js';
import pickBuiltProperties from '../../util/pick-built-properties.js';
import BufferView from '../buffer-view/index.js';
import Indexer from '../asset/indexer/index.js';
import { ValueOf } from 'ts-essentials';

/**
 * Accessor component types
 * @alias ComponentTypes
 * @enum {number}
 * @memberof Accessor
 * @static
 */
const componentTypes = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  UNSIGNED_INT: 5125,
  FLOAT: 5126
} as const;

type ComponentType = ValueOf<typeof componentTypes>;

/**
 * Describes the type of data held by an accessor
 * @alias AttributeTypes
 * @enum {string}
 * @memberof Accessor
 * @static
 */
const types = {
  SCALAR: 'SCALAR',
  VEC2: 'VEC2',
  VEC3: 'VEC3',
  VEC4: 'VEC4',
  MAT2: 'MAT2',
  MAT3: 'MAT3',
  MAT4: 'MAT4'
} as const;

type Type = ValueOf<typeof types>;

/**
 * Accessor - a builder for a GLTF accessor object
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-accessor| GLTF reference}
 * @hideconstructor
 */
export default class Accessor extends NamedComponent<{
  type: Type;
  componentType: ComponentType;
  min: number[];
  max: number[];
  bufferView: BufferView;
  count: number;
}> {
  static get ComponentTypes() {
    return componentTypes;
  }

  static get AttributeTypes() {
    return types;
  }

  constructor() {
    super({ indexName: 'accessors' });
  }

  componentType(componentType: ComponentType) {
    this.properties.componentType = componentType;

    return this;
  }

  type(type: Type) {
    this.properties.type = type;

    return this;
  }

  min(min: number[]) {
    this.properties.min = min;

    return this;
  }

  max(max: number[]) {
    this.properties.max = max;

    return this;
  }

  bufferView(bufferView: BufferView) {
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
  count(count: number) {
    this.properties.count = count;

    return this;
  }

  build(indexer: Indexer) {
    const { bufferView, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      bufferView: bufferView && indexer.indexOf(bufferView)
    });
  }
}
