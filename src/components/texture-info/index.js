import ComponentBase from '../component-base/';
import pickBuiltProperties from '../../util/pick-built-properties';

/**
 * TextureInfo - A builder for a GLTF TextureInfo object
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-textureinfo|GLTF reference}
 * @hideconstructor
 */
export default class TextureInfo extends ComponentBase {
  /**
   * texture - sets the texture referenced by this component
   *
   * @param {Texture} texture
   * @returns {TextureInfo} this
   * @memberof TextureInfo
   */
  texture(texture) {
    this.properties.texture = texture;

    return this;
  }

  /**
   * index - sets the texture referenced by this component
   *
   * @description Alias of {@link TextureInfo#texture}
   */
  index(texture) {
    return this.texture(texture);
  }

  /**
   * texCoord - sets the texCoord index used by mesh primitives.
   * Used to construct a string in the format TEXCOORD_<texCoord>
   *
   * @param {number} texCoord
   * @returns {TextureInfo} this
   * @memberof TextureInfo
   */
  texCoord(texCoord) {
    this.properties.texCoord = texCoord;

    return this;
  }

  build(indexer) {
    const { texture, ...properties } = this.properties;

    return pickBuiltProperties({
      ...properties,
      index: texture && indexer.indexOf(texture)
    });
  }
}
