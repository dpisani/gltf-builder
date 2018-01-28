import { cloneDeep, pickBy } from 'lodash';

export default class ComponentBase {
  constructor() {
    this.properties = {};
  }

  build() {
    return cloneDeep(pickBy(this.properties, p => p));
  }
}
