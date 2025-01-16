import NamedComponent from '../named-component/index.js';
import pickBuiltProperties from '../../util/pick-built-properties.js';
import { ValueOf } from 'ts-essentials';
import { Vec3 } from '../../types/data-types.js';
import MetallicRoughness from './metallic-roughness/index.js';
import Indexer from '../asset/indexer/index.js';

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
} as const;

type AlphaMode = ValueOf<typeof alphaModes>;

/**
 * Material - a builder for a GLTF material object
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-material | GLTF reference}
 * @hideconstructor
 */
export default class Material extends NamedComponent<{
  emissiveFactor: Vec3;
  alphaMode: AlphaMode;
  alphaCutoff: number;
  doubleSided: boolean;
  pbrMetallicRoughness: MetallicRoughness;
}> {
  public metallicRoughness: typeof this.pbrMetallicRoughness;

  constructor() {
    super({ indexName: 'materials' });

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
  emissiveFactor(emissiveFactor: Vec3) {
    this.properties.emissiveFactor = emissiveFactor;

    return this;
  }

  /**
   * alphaMode - sets the alpha mode of the material
   *
   * @param {AlphaMode} alphaMode one of the valid alpha modes
   *
   * @returns this
   */
  alphaMode(alphaMode: AlphaMode) {
    this.properties.alphaMode = alphaMode;

    return this;
  }

  /**
   * alphaCutoff - sets the alpha cutoff of the material
   * when alphaMode is set to {@link Material.alphaMode.MASK}
   *
   * @param {number} alphaCutoff a number in the range [0, 1]
   *
   * @returns this
   */
  alphaCutoff(alphaCutoff: number) {
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
  doubleSided(doubleSided: boolean) {
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
  pbrMetallicRoughness(pbrMetallicRoughness: MetallicRoughness) {
    this.properties.pbrMetallicRoughness = pbrMetallicRoughness;

    return this;
  }

  build(indexer: Indexer) {
    const { pbrMetallicRoughness, ...properties } = this.properties;

    return pickBuiltProperties({
      pbrMetallicRoughness:
        pbrMetallicRoughness && pbrMetallicRoughness.build(indexer),
      ...properties
    });
  }
}
