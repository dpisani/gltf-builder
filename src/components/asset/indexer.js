export default class Indexer {
  constructor() {
    this.indices = {};
  }

  indexOf(type, o) {
    let index = this.indices[type];
    if (!index) {
      index = this.indices[type] = [];
    }

    const id = this.indices[type].indexOf(o);

    if (id < 0) {
      index.push(o);
      return index.length - 1;
    }

    return id;
  }

  getIndexedObjects() {
    return this.indices;
  }
}
