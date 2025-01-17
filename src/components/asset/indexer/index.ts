import { SafeDictionary } from "ts-essentials";
import NamedComponent from "../../named-component/index.js";

export default class Indexer {
  private indices: SafeDictionary<NamedComponent<Record<string, unknown>>[]>;
  private toBuild: { type: string; position: number }[];

  public index: typeof this.indexOf;

  constructor() {
    this.indices = {};
    this.toBuild = [];

    this.index = this.indexOf;
  }

  indexOf(o: NamedComponent<Record<string, unknown>>) {
    const type = o.getIndexName();

    let index = this.indices[type];
    if (!index) {
      index = this.indices[type] = [];
    }
    const id = index.indexOf(o);

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
    const builtEntities: SafeDictionary<unknown[]> = {};

    while (this.toBuild.length > 0) {
      const nextEntity = this.toBuild.shift();

      if (nextEntity) {
        const type = nextEntity.type;
        const entity = this.indices[type]?.[nextEntity.position];

        if (builtEntities[type] === undefined) {
          builtEntities[type] = [];
        }

        if (!entity) {
          throw new Error("Indexed entity could not be retrieved");
        }

        builtEntities[type].push(entity.build(this));
      }
    }

    return builtEntities;
  }
}
