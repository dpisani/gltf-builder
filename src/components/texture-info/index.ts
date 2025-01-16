import ComponentBase from '../component-base/index.js';
import pickBuiltProperties from '../../util/pick-built-properties.js';
import Texture from '../texture/index.js';
import Indexer from '../asset/indexer/index.js';

/**
 * TextureInfo - A builder for a GLTF TextureInfo object
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-textureinfo | GLTF reference}
 * @hideconstructor
 */
export default class TextureInfo extends ComponentBase<{
  texture: Texture;
  texCoord: number;
}> {
  /**
   * texture - sets the texture referenced by this component
   *
   * @param {Texture} texture
   * @returns {TextureInfo} this
   */
  texture(texture: Texture): TextureInfo {
    this.properties.texture = texture;

    return this;
  }

  /**
   * index - sets the texture referenced by this component
   *
   * Alias of {@link TextureInfo#texture}
   */
  index(texture: Texture) {
    return this.texture(texture);
  }

  /**
   * texCoord - sets the texCoord index used by mesh primitives.
   * Used to construct a string in the format TEXCOORD_<texCoord>
   *
   * @param {number} texCoord
   * @returns {TextureInfo} this
   */
  texCoord(texCoord: number): TextureInfo {
    this.properties.texCoord = texCoord;

    return this;
  }

  build(indexer: Indexer) {
    const { texture, ...properties } = this.properties;

    return pickBuiltProperties({
      ...properties,
      index: texture && indexer.indexOf(texture)
    });
  }
}
