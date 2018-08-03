import pickBuiltProperties from '../../util/pick-built-properties';
import NamedComponent from '../named-component/';

export default class Scene extends NamedComponent {
  constructor() {
    super({ indexName: 'scenes', defaultProperties: { nodes: [] } });
  }

  addNode(node) {
    this.properties.nodes.push(node);

    return this;
  }

  build(indexer) {
    return pickBuiltProperties({
      ...this.properties,
      nodes: this.properties.nodes.map(node => indexer.indexOf(node))
    });
  }
}
