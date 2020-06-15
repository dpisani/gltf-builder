import ComponentBase from '../component-base/';

import Indexer from './indexer';

/**
 * Asset - a builder for a glTF asset object. This should be the root object used to build the final product.
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-asset|glTF reference}
 * @hideconstructor
 */
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

  /**
   * Builds a complete asset in the glTF file format.
   *
   * @returns {*} a complete glTF asset as an object
   * @memberof Asset
   */
  build(indexer) {
    const indexBuilder = indexer || new Indexer();

    this.properties.scenes.forEach(o => indexBuilder.index(o));

    const builtIndices = indexBuilder.buildIndexedEntities();

    return { asset: this.getAssetDefinition(), ...builtIndices };
  }

  /**
   * Adds a scene to this asset
   *
   * @param {Scene} scene
   * @returns {Asset} this
   * @memberof Asset
   */
  addScene(scene) {
    if (scene) {
      this.properties.scenes.push(scene);
    }

    return this;
  }
}
