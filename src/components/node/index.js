import pickBuiltProperties from '../../util/pick-built-properties';
import NamedComponent from '../named-component/';
import Transform from './transform';

export default class Node extends NamedComponent {
  constructor() {
    super({ indexName: 'nodes', defaultProperties: { children: [] } });

    this.transform = new Transform();
  }

  addChild(child) {
    this.properties.children.push(child);

    return this;
  }

  translation(x, y, z) {
    this.transform.translation(x, y, z);
    return this;
  }

  rotation(x, y, z, w) {
    this.transform.rotation(x, y, z, w);
    return this;
  }

  scale(x, y, z) {
    this.transform.scale(x, y, z);
    return this;
  }

  build(indexer) {
    return pickBuiltProperties({
      ...this.properties,
      children: this.properties.children.map(node => indexer.indexOf(node)),
      ...this.transform.build()
    });
  }
}
