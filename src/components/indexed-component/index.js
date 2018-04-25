import ComponentBase from '../component-base/';

export default class NamedComponent extends ComponentBase {
  constructor(indexName) {
    super();

    this.indexName = indexName || this.constructor.name.toLowercase();
  }

  // Sets the name of the component
  name(n) {
    this.properties.name = n;

    return this;
  }

  // Gets the name of the top level index this entity belongs to
  getIndexName() {
    return this.indexName;
  }
}
