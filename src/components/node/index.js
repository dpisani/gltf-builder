import pickBuiltProperties from '../../util/pick-built-properties';
import NamedComponent from '../indexed-component/';

export default class Node extends NamedComponent {
  constructor() {
    super('nodes');

    this.properties = {
      ...this.properties,
      children: []
    };
  }

  addChild(child) {
    this.properties.children.push(child);

    return this;
  }

  build(indexer) {
    return pickBuiltProperties({
      ...this.properties,
      children: this.properties.children.map(node => indexer.indexOf(node))
    });
  }
}
