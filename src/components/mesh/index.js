import NamedComponent from '../named-component';
import pickBuiltProperties from '../../util/pick-built-properties';

export default class Mesh extends NamedComponent {
  constructor() {
    super({ indexName: 'meshes', defaultProperties: { primitives: [] } });
  }

  addPrimitive(primitive) {
    this.properties.primitives.push(primitive);

    return this;
  }

  build(indexer) {
    return {
      ...pickBuiltProperties(this.properties),
      primitives: this.properties.primitives.map(primitive =>
        primitive.build(indexer)
      )
    };
  }
}
