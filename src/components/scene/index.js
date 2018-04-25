import pickBuiltProperties from '../../util/pick-built-properties';
import IndexedComponent from '../indexed-component/';

export default class Scene extends IndexedComponent {
  constructor() {
    super('scenes');

    this.properties = {
      ...this.properties,
      nodes: []
    };
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
