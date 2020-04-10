import ComponentBase from '../../component-base/';
import pickBuiltProperties from '../../../util/pick-built-properties';

/**
 * MetallicRoughness - a builder for a GLTF pbrMetallicRoughness object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-pbrmetallicroughness|GLTF reference}
 * @hideconstructor
 */
export default class MetallicRoughness extends ComponentBase {
  constructor() {
    super();

    /**
     * @function MetallicRoughness#baseColourFactor
     *
     * @description Alias of {@link MetallicRoughness#baseColorFactor}
     */
    this.baseColourFactor = this.baseColorFactor;
  }

  /**
   * baseColorFactor - Sets the material's base color factor.
   *
   * @param {Vec4} baseColorFactor colour
   *
   * @returns {MetallicRoughness} this
   */
  baseColorFactor(baseColorFactor) {
    this.properties.baseColorFactor = baseColorFactor;

    return this;
  }

  /**
   * metallicFactor - Sets the material's metallic factor.
   *
   * @param {number} metallicFactor
   *
   * @returns {MetallicRoughness} this
   */
  metallicFactor(metallicFactor) {
    this.properties.metallicFactor = metallicFactor;

    return this;
  }

  /**
   * roughnessFactor - Sets the material's roughness factor.
   *
   * @param {number} roughnessFactor
   *
   * @returns {MetallicRoughness} this
   */
  roughnessFactor(roughnessFactor) {
    this.properties.roughnessFactor = roughnessFactor;

    return this;
  }

  /**
   * Sets the material's base color texture.
   *
   * @param {TextureInfo} baseColorTexture
   * @returns {MetallicRoughness} this
   * @memberof MetallicRoughness
   */
  baseColorTexture(baseColorTexture) {
    this.properties.baseColorTexture = baseColorTexture;
    return this;
  }

  /**
   * @description Alias of {@link MetallicRoughness#baseColorTexture}
   */
  baseColourTexture(baseColourTexture) {
    return this.baseColorTexture(baseColourTexture);
  }

  /**
   * Sets the material's metallic roughness texture.
   * The metalness values are sampled from the B channel. The roughness values are sampled from the G channel.
   * These values are linear. If other channels are present (R or A), they are ignored for metallic-roughness
   *
   * @param {TextureInfo} metallicRoughnessTexture
   * @returns {MetallicRoughness} this
   * @memberof MetallicRoughness
   */
  metallicRoughnessTexture(metallicRoughnessTexture) {
    this.properties.metallicRoughnessTexture = metallicRoughnessTexture;
    return this;
  }

  build(indexer) {
    const {
      baseColorTexture,
      metallicRoughnessTexture,
      ...properties
    } = this.properties;

    return pickBuiltProperties({
      ...properties,
      baseColorTexture: baseColorTexture && baseColorTexture.build(indexer),
      metallicRoughnessTexture:
        metallicRoughnessTexture && metallicRoughnessTexture.build(indexer)
    });
  }
}
