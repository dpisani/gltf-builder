import { cloneDeepWith, isFunction, pickBy } from 'lodash';
import ComponentBase from '../component-base/';

import Indexer from './indexer.js';

export default class Asset extends ComponentBase {
  constructor() {
    super();
    this.properties = {
      asset: {
        version: '2.0',
        generator: 'gltf-builder'
      }
    };
  }

  build() {
    const indexer = new Indexer();

    const customizer = value => {
      if (!value.build || !isFunction(value.build)) {
        return undefined;
      }

      return value.build(indexer);
    };

    const builtProperties = cloneDeepWith(this.properties, customizer);
    const builtIndices = cloneDeepWith(indexer.getIndexedObjects(), customizer);

    return { ...builtProperties, ...builtIndices };
  }

  getIndexers() {
    const indexedProperties = {
      scenes: this.properties.scenes
    };
    return new Indexer(pickBy(indexedProperties, p => p !== undefined));
  }

  addScene(scene) {
    if (scene) {
      this.properties.scenes = this.properties.scenes || [];
      this.properties.scenes.push(scene);
    }
  }
}
