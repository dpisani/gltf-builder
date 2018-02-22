import { pickBy } from 'lodash';
import NamedComponent from '../named-component/';

export default class Scene extends NamedComponent {
  addNode(node) {
    this.properties.nodes = this.properties.nodes || [];
    this.properties.nodes.push(node);

    return this;
  }

  build(indexer) {
    return pickBy(
      {
        ...this.properties,
        nodes:
          this.properties.nodes &&
          this.properties.nodes.map(node => indexer.indexOf('nodes', node))
      },
      Boolean
    );
  }
}
