import { cloneDeep } from 'lodash';
import pickBuiltProperties from '../../util/pick-built-properties';

export default class ComponentBase {
  constructor(defaultProperties) {
    this.properties = {
      ...(defaultProperties || {})
    };
  }

  /**
   * Returns a representation of this entity as JSON.
   * This does not need to build any of its child objects.
   * When called this will receive an Indexer as the first param
   * so that top level references can be obtained
   */
  build() {
    return cloneDeep(pickBuiltProperties(this.properties));
  }
}
