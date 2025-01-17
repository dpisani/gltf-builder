import lodash from "lodash";
import Indexer from "../asset/indexer/index.js";

import pickBuiltProperties from "../../util/pick-built-properties.js";

const { cloneDeep } = lodash;

export default class ComponentBase<
  ComponentProperties extends Record<string, unknown>,
> {
  protected properties: Partial<ComponentProperties>;

  constructor(defaultProperties?: Partial<ComponentProperties>) {
    this.properties = {
      ...(defaultProperties ?? ({} as Partial<ComponentProperties>)),
    };
  }

  /**
   * Returns a representation of this entity as JSON.
   * This does not need to build any of its child objects.
   * @param indexer - A utility to obtain indices for top level entities
   * @ignore
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  build(indexer: Indexer) {
    return cloneDeep(pickBuiltProperties(this.properties));
  }
}
