import NamedComponent from '../named-component/';

/**
 * Magnification filter types. All values correspond to WebGL enum values.
 * @alias MagFilterTypes
 * @enum {number}
 */
const magFilterTypes = {
  NEAREST: 9728,
  LINEAR: 9729
};

/**
 * Minification filter types. All values correspond to WebGL enum values.
 * @alias MinFilterTypes
 * @enum {number}
 */
const minFilterTypes = {
  NEAREST: 9728,
  LINEAR: 9729,
  NEAREST_MIPMAP_NEAREST: 9984,
  LINEAR_MIPMAP_NEAREST: 9985,
  NEAREST_MIPMAP_LINEAR: 9986,
  LINEAR_MIPMAP_LINEAR: 9987
};

/**
 * Wrapping modes. All values correspond to WebGL enum values.
 * @alias WrapModes
 * @enum {number}
 */
const wrapModes = {
  CLAMP_TO_EDGE: 33071,
  MIRRORED_REPEAT: 33648,
  REPEAT: 10497
};

/**
 * Sampler - a builder for a GLTF sampler object.
 * Defines filtering and wrapping modes for a texture.
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-sampler|GLTF reference}
 * @hideconstructor
 */
export default class Sampler extends NamedComponent {
  /**
   * @static magFilterTypes - Valid mag filter settings
   *
   * @type {MagFilterTypes}
   */
  static get magFilterTypes() {
    return magFilterTypes;
  }

  /**
   * @static minFilterTypes - Valid min filter settings
   *
   * @type {MinFilterTypes}
   */
  static get minFilterTypes() {
    return minFilterTypes;
  }

  /**
   * @static wrapModes - Valid wrap settings
   *
   * @type {WrapModes}
   */
  static get wrapModes() {
    return wrapModes;
  }

  constructor() {
    super({ indexName: 'samplers' });
  }

  /**
   * Sets the magFilter mode for this sampler
   *
   * @param {MagFilterTypes} magFilter
   * @returns {Sampler} this
   * @memberof Sampler
   */
  magFilter(magFilter) {
    this.properties.magFilter = magFilter;

    return this;
  }

  /**
   * Sets the minFilter mode for this sampler
   *
   * @param {MinFilterTypes} minFilter
   * @returns {Sampler} this
   * @memberof Sampler
   */
  minFilter(minFilter) {
    this.properties.minFilter = minFilter;

    return this;
  }

  /**
   * Sets the S (U) wrapping mode for this sampler
   *
   * @param {WrapModes} wrapS
   * @returns {Sampler} this
   * @memberof Sampler
   */
  wrapS(wrapS) {
    this.properties.wrapS = wrapS;

    return this;
  }

  /**
   * Sets the T (V) wrapping mode for this sampler
   *
   * @param {WrapModes} wrapT
   * @returns {Sampler} this
   * @memberof Sampler
   */
  wrapT(wrapT) {
    this.properties.wrapT = wrapT;

    return this;
  }
}
