import NamedComponent from '../named-component/';

export const componentTypes = {
  BYTE: 5120,
  UNSIGNED_BYTE: 5121,
  SHORT: 5122,
  UNSIGNED_SHORT: 5123,
  UNSIGNED_INT: 5125,
  FLOAT: 5126
};

export const types = {
  SCALAR: 'SCALAR',
  VEC2: 'VEC2',
  VEC3: 'VEC3',
  VEC4: 'VEC4',
  MAT2: 'MAT2',
  MAT3: 'MAT3',
  MAT4: 'MAT4'
};

export default class Accessor extends NamedComponent {
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
}
