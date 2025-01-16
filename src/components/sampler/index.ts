import { ValueOf } from 'ts-essentials';
import NamedComponent from '../named-component/index.js';

/**
 * Magnification filter types. All values correspond to WebGL enum values.
 * @alias MagFilterTypes
 * @enum {number}
 * @memberof Sampler
 * @static
 */
const magFilterTypes = {
  NEAREST: 9728,
  LINEAR: 9729
} as const;

type MagFilterType = ValueOf<typeof magFilterTypes>;

/**
 * Minification filter types. All values correspond to WebGL enum values.
 * @alias MinFilterTypes
 * @enum {number}
 * @memberof Sampler
 * @static
 */
const minFilterTypes = {
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987
} as const;

type MinFilterType = ValueOf<typeof minFilterTypes>;

/**
 * Wrapping modes. All values correspond to WebGL enum values.
 * @alias WrapModes
 * @enum {number}
 * @memberof Sampler
 * @static
 */
const wrapModes = {
  CLAMP_TO_EDGE: 33071,
  MIRRORED_REPEAT: 33648,
  REPEAT: 10497
} as const;

type WrapMode = ValueOf<typeof wrapModes>;

/**
 * Sampler - a builder for a GLTF sampler object.
 * Defines filtering and wrapping modes for a texture.
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-sampler | GLTF reference}
 * @hideconstructor
 */
export default class Sampler extends NamedComponent<{
  magFilter: MagFilterType;
  minFilter: MinFilterType;
  wrapS: WrapMode;
  wrapT: WrapMode;
}> {
  static get MagFilterTypes() {
    return magFilterTypes;
  }

  static get MinFilterTypes() {
    return minFilterTypes;
  }

  static get WrapModes() {
    return wrapModes;
  }

  constructor() {
    super({ indexName: 'samplers' });
  }

  /**
   * Sets the magFilter mode for this sampler
   *
   * @param {Sampler.MagFilterTypes} magFilter
   * @returns {Sampler} this
   */
  magFilter(magFilter: MagFilterType): Sampler {
    this.properties.magFilter = magFilter;

    return this;
  }

  /**
   * Sets the minFilter mode for this sampler
   *
   * @param {Sampler.MinFilterTypes} minFilter
   * @returns {Sampler} this
   */
  minFilter(minFilter: MinFilterType): Sampler {
    this.properties.minFilter = minFilter;

    return this;
  }

  /**
   * Sets the S (U) wrapping mode for this sampler
   *
   * @param {Sampler.WrapModes} wrapS
   * @returns {Sampler} this
   */
  wrapS(wrapS: WrapMode): Sampler {
    this.properties.wrapS = wrapS;

    return this;
  }

  /**
   * Sets the T (V) wrapping mode for this sampler
   *
   * @param {Sampler.WrapModes} wrapT
   * @returns {Sampler} this
   */
  wrapT(wrapT: WrapMode): Sampler {
    this.properties.wrapT = wrapT;

    return this;
  }
}
