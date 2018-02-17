import ComponentBase from '../component-base/';

import Indexer from './indexer.js';

export default class Asset extends ComponentBase {
  constructor() {
    super();
    this.properties = {
      scenes: []
    };
  }

  getAssetDefinition() {
    return {
      version: '2.0',
      generator: 'gltf-builder'
    };
  }

  build(indexer) {
    const indexBuilder = indexer || new Indexer();

    const builtIndices = indexBuilder.indexAndBuild({
      rootEntities: this.properties.scenes,
      rootEntitiesLabel: 'scenes'
    });

    return { asset: this.getAssetDefinition(), ...builtIndices };
  }

  addScene(scene) {
    if (scene) {
      this.properties.scenes.push(scene);
    }
  }
}
