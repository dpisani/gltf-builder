import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

/**
 * Describes the alpha mode of a material
 * @alias AlphaModes
 * @enum {string}
 * @memberof Material
 * @static
 */
const alphaModes = {
  OPAQUE: 'OPAQUE',
  MASK: 'MASK',
  BLEND: 'BLEND'
};

/**
 * Material - a builder for a GLTF material object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-material|GLTF reference}
 * @hideconstructor
 */
export default class Material extends NamedComponent {
  constructor() {
    super({ indexName: 'materials', defaultProperties: { children: [] } });

    /**
     * @function Material#metallicRoughness
     *
     * @description Alias of {@link Material#pbrMetallicRoughness}
     */
    this.metallicRoughness = this.pbrMetallicRoughness;
  }

  static get AlphaModes() {
    return alphaModes;
  }

  /**
   * emissiveFactor - sets the emissive colour of the material
   *
   * @param {Vec3} emissiveFactor emissive colour
   *
   * @returns this
   */
  emissiveFactor(emissiveFactor) {
    this.properties.emissiveFactor = emissiveFactor;

    return this;
  }

  /**
   * alphaMode - sets the alpha mode of the material
   *
   * @param {alphaMode} alphaMode one of the valid alpha modes
   *
   * @returns this
   */
  alphaMode(alphaMode) {
    this.properties.alphaMode = alphaMode;

    return this;
  }

  /**
   * alphaCutoff - sets the alpha mode of the material
   * when alphaMode is set to {@link alphaMode.MASK}
   *
   * @param {number} alphaCutoff a number in the range [0, 1]
   *
   * @returns this
   */
  alphaCutoff(alphaCutoff) {
    this.properties.alphaCutoff = alphaCutoff;

    return this;
  }

  /**
   * doubleSided - sets whether the material is double sided.
   *
   * @param {boolean} doubleSided
   *
   * @returns this
   */
  doubleSided(doubleSided) {
    this.properties.doubleSided = doubleSided;

    return this;
  }

  /**
   * pbrMetallicRoughness - Sets values used to define the metallic-roughness material
   * model from Physically-Based Rendering (PBR) methodology.
   *
   * @param {MetallicRoughness} pbrMetallicRoughness a MetallicRoughness object
   *
   * @returns this
   */
  pbrMetallicRoughness(pbrMetallicRoughness) {
    this.properties.pbrMetallicRoughness = pbrMetallicRoughness;

    return this;
  }

  build(indexer) {
    const { pbrMetallicRoughness, ...properties } = this.properties;

    return pickBuiltProperties({
      pbrMetallicRoughness:
        pbrMetallicRoughness && pbrMetallicRoughness.build(indexer),
      ...properties
    });
  }
}
