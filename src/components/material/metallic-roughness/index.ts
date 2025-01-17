import ComponentBase from "../../component-base/index.js";
import pickBuiltProperties from "../../../util/pick-built-properties.js";
import { Vec4 } from "../../../types/data-types.js";
import Indexer from "../../asset/indexer/index.js";
import TextureInfo from "../../texture-info/index.js";

/**
 * MetallicRoughness - a builder for a GLTF pbrMetallicRoughness object
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-pbrmetallicroughness | GLTF reference}
 * @hideconstructor
 */
export default class MetallicRoughness extends ComponentBase<{
  baseColorFactor: Vec4;
  metallicFactor: number;
  roughnessFactor: number;
  baseColorTexture: TextureInfo;
  metallicRoughnessTexture: TextureInfo;
}> {
  public baseColourFactor: typeof this.baseColorFactor;

  constructor() {
    super();

    /**
     * Alias of {@link MetallicRoughness#baseColorFactor}
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
  baseColorFactor(baseColorFactor: Vec4): MetallicRoughness {
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
  metallicFactor(metallicFactor: number): MetallicRoughness {
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
  roughnessFactor(roughnessFactor: number): MetallicRoughness {
    this.properties.roughnessFactor = roughnessFactor;

    return this;
  }

  /**
   * Sets the material's base color texture.
   *
   * @param {TextureInfo} baseColorTexture
   * @returns {MetallicRoughness} this
   */
  baseColorTexture(baseColorTexture: TextureInfo): MetallicRoughness {
    this.properties.baseColorTexture = baseColorTexture;
    return this;
  }

  /**
   * Alias of {@link MetallicRoughness#baseColorTexture}
   */
  baseColourTexture(baseColourTexture: TextureInfo) {
    return this.baseColorTexture(baseColourTexture);
  }

  /**
   * Sets the material's metallic roughness texture.
   * The metalness values are sampled from the B channel. The roughness values are sampled from the G channel.
   * These values are linear. If other channels are present (R or A), they are ignored for metallic-roughness
   *
   * @param {TextureInfo} metallicRoughnessTexture
   * @returns {MetallicRoughness} this
   */
  metallicRoughnessTexture(
    metallicRoughnessTexture: TextureInfo,
  ): MetallicRoughness {
    this.properties.metallicRoughnessTexture = metallicRoughnessTexture;
    return this;
  }

  build(indexer: Indexer) {
    const { baseColorTexture, metallicRoughnessTexture, ...properties } =
      this.properties;

    return pickBuiltProperties({
      ...properties,
      baseColorTexture: baseColorTexture && baseColorTexture.build(indexer),
      metallicRoughnessTexture:
        metallicRoughnessTexture && metallicRoughnessTexture.build(indexer),
    });
  }
}
