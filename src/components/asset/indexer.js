import {pickBy, isEmpty} from 'lodash';
export default class Indexer {
  constructor() {
    this.indices = {};
    this.toBuild = [];
  }

  indexOf(type, o) {
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

  /**
   * Returns all of the tracked indices with the JSON
   * representations of all the entities within
   */
  indexAndBuild({ rootEntities, rootEntitiesLabel }) {
    const builtEntities = {
      [rootEntitiesLabel]: rootEntities.map(e => e.build(this))
    };

    while (this.toBuild.length > 0) {
      const nextEntity = this.toBuild.pop();
      const type = nextEntity.type;
      const entity = this.indices[type][nextEntity.position];

      if (builtEntities[type] === undefined) {
        builtEntities[type] = [];
      }

      builtEntities[type].push(entity.build(this));
    }

    return pickBy(builtEntities, e => !isEmpty(e));
  }
}
