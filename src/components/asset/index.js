import ComponentBase from '../component-base/';

import Indexer from './indexer';

export default class Asset extends ComponentBase {
  constructor() {
    super({ scenes: [] });
  }

  getAssetDefinition() {
    return {
      version: '2.0',
      generator: 'gltf-builder'
    };
  }

  build(indexer) {
    const indexBuilder = indexer || new Indexer();

    this.properties.scenes.forEach(o => indexBuilder.index(o));

    const builtIndices = indexBuilder.buildIndexedEntities();

    return { asset: this.getAssetDefinition(), ...builtIndices };
  }

  addScene(scene) {
    if (scene) {
      this.properties.scenes.push(scene);
    }

    return this;
  }
}
