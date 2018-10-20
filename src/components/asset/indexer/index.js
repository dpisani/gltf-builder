export default class Indexer {
  constructor() {
    this.indices = {};
    this.toBuild = [];

    this.index = this.indexOf;
  }

  indexOf(o) {
    if (!o.getIndexName) {
      return undefined;
    }

    const type = o.getIndexName();

    let index = this.indices[type];
    if (!index) {
      index = this.indices[type] = [];
    }
    const id = this.indices[type].indexOf(o);

    if (id < 0) {
      index.push(o);
      const position = index.length - 1;
      this.toBuild.push({ type, position });
      return position;
    }

    return id;
  }

  getIndexedObjects() {
    return this.indices;
  }

  accessorFor() {}

  /**
   * Returns all of the tracked indices with the JSON
   * representations of all the entities within
   */
  buildIndexedEntities() {
    const builtEntities = {};

    while (this.toBuild.length > 0) {
      const nextEntity = this.toBuild.shift();
      const type = nextEntity.type;
      const entity = this.indices[type][nextEntity.position];

      if (builtEntities[type] === undefined) {
        builtEntities[type] = [];
      }

      builtEntities[type].push(entity.build(this));
    }

    return builtEntities;
  }
}
