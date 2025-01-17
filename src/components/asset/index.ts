import ComponentBase from "../component-base/index.js";
import Scene from "../scene/index.js";

import Indexer from "./indexer/index.js";

/**
 * Asset - a builder for a glTF asset object. This should be the root object used to build the final product.
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-asset | GLTF reference}
 * @hideconstructor
 */
export default class Asset extends ComponentBase<{ scenes: Scene[] }> {
  constructor() {
    super({ scenes: [] });
  }

  private getAssetDefinition() {
    return {
      version: "2.0",
      generator: "gltf-builder",
    };
  }

  /**
   * Builds a complete asset in the glTF file format.
   *
   * @returns {*} a complete glTF asset as an object
   */
  build(
    /** @ignore */
    indexer?: Indexer,
  ): object {
    const indexBuilder = indexer || new Indexer();

    this.properties.scenes?.forEach((o) => indexBuilder.index(o));

    const builtIndices = indexBuilder.buildIndexedEntities();

    return { asset: this.getAssetDefinition(), ...builtIndices };
  }

  /**
   * Adds a scene to this asset
   *
   * @param {Scene} scene
   * @returns {Asset} this
   */
  addScene(scene: Scene): Asset {
    if (scene && this.properties.scenes) {
      this.properties.scenes.push(scene);
    }

    return this;
  }
}
