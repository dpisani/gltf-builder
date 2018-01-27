import { cloneDeep } from 'lodash';

export default class ComponentBase {
  constructor() {
    this.properties = {};
  }

  build() {
    return cloneDeep(this.properties);
  }
}
