import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

export default class Accessor extends NamedComponent {
  static get componentTypes() {
    return {
      BYTE: 5120,
      UNSIGNED_BYTE: 5121,
      SHORT: 5122,
      UNSIGNED_SHORT: 5123,
      UNSIGNED_INT: 5125,
      FLOAT: 5126
    };
  }

  static get types() {
    return {
      SCALAR: 'SCALAR',
      VEC2: 'VEC2',
      VEC3: 'VEC3',
      VEC4: 'VEC4',
      MAT2: 'MAT2',
      MAT3: 'MAT3',
      MAT4: 'MAT4'
    };
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
  }

  build(indexer) {
    const { bufferView, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      bufferView: bufferView && indexer.indexOf(bufferView)
    });
  }
}
