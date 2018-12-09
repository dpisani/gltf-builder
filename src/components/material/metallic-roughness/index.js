import ComponentBase from '../../component-base/';

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
   * @returns this
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
   * @returns this
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
   * @returns this
   */
  roughnessFactor(roughnessFactor) {
    this.properties.roughnessFactor = roughnessFactor;

    return this;
  }
}
