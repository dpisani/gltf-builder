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
   * @param indexer - A utility to obtain indices for top level entities
   */
  build() {
    return cloneDeep(pickBuiltProperties(this.properties));
  }
}
