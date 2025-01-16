import NamedComponent from '../named-component/index.js';
import pickBuiltProperties from '../../util/pick-built-properties.js';
import Sampler from '../sampler/index.js';
import TextureImage from '../image/index.js';
import Indexer from '../asset/indexer/index.js';

/**
 * Texture - a builder for a GLTF texture object
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-texture| GLTF reference}
 * @hideconstructor
 */
export default class Texture extends NamedComponent<{
  indexName: 'textures';
  sampler: Sampler;
  source: TextureImage;
}> {
  constructor() {
    super({ indexName: 'textures' });
  }

  /**
   * Sets the sampler for this texture
   *
   * @param {Sampler} sampler
   * @returns {Texture} this
   */
  sampler(sampler: Sampler): Texture {
    this.properties.sampler = sampler;

    return this;
  }

  /**
   * Sets the source image for this texture
   *
   * @param {TextureImage} source
   * @returns {Texture} this
   */
  source(source: TextureImage): Texture {
    this.properties.source = source;

    return this;
  }

  build(indexer: Indexer) {
    const { sampler, source, ...properties } = this.properties;

    return pickBuiltProperties({
      ...properties,
      sampler: sampler && indexer.indexOf(sampler),
      source: source && indexer.indexOf(source)
    });
  }
}
