import { pickBy, isUndefined } from 'lodash';

import NamedComponent from '../named-component/';

export default class Node extends NamedComponent {
  addChild(child) {
    this.properties.children = this.properties.children || [];
    this.properties.children.push(child);
  }

  build(indexer) {
    return pickBy(
      {
        ...this.properties,
        children:
          this.properties.children &&
          this.properties.children.map(node => indexer.indexOf('nodes', node))
      },
      p => !isUndefined(p)
    );
  }
}
