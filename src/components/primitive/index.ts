import ComponentBase from "../component-base/index.js";
import pickBuiltProperties from "../../util/pick-built-properties.js";
import { ValueOf } from "ts-essentials";
import Accessor from "../accessor/index.js";
import Indexer from "../asset/indexer/index.js";
import Material from "../material/index.js";

/**
 * Rendering modes for a primitive. All values correspond to WebGL enum values.
 * @alias Modes
 * @enum {number}
 * @memberof Primitive
 * @static
 */
const modes = {
  POINTS: 0,
  LINES: 1,
  LINE_LOOP: 2,
  LINE_STRIP: 3,
  TRIANGLES: 4,
  TRIANGLE_STRIP: 5,
  TRIANGLE_FAN: 6,
} as const;

type RenderingMode = ValueOf<typeof modes>;

/**
 * A builder for the GLTF Primitive object
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-primitive | GLTF reference}
 * @hideconstructor
 */
export default class Primitive extends ComponentBase<{
  mode: RenderingMode;
  attributes: {
    POSITION?: Accessor;
    NORMAL?: Accessor;
    TANGENT?: Accessor;
    [texcoord: `TEXCOORD_${number}`]: Accessor;
    [texcoord: `COLOR_${number}`]: Accessor;
    [texcoord: `JOINTS_${number}`]: Accessor;
    [texcoord: `WEIGHTS_${number}`]: Accessor;
  };
  indices: Accessor;
  material: Material;
}> {
  public colour: typeof this.color;

  static get Modes() {
    return modes;
  }

  constructor() {
    super({ attributes: {} });

    this.colour = this.color;
  }

  /**
   * Sets the mode for this primitive
   *
   * @param {Primitive.Modes} mode
   * @returns {Primitive} this
   */
  mode(mode: RenderingMode): Primitive {
    this.properties.mode = mode;
    return this;
  }

  position(position: Accessor) {
    if (this.properties.attributes) {
      this.properties.attributes.POSITION = position;
    }
    return this;
  }

  normal(normal: Accessor) {
    if (this.properties.attributes) this.properties.attributes.NORMAL = normal;
    return this;
  }

  tangent(tangent: Accessor) {
    if (this.properties.attributes)
      this.properties.attributes.TANGENT = tangent;
    return this;
  }

  /**
   * Sets data for the TEXCOORD property on the primitive
   *
   * @param {Accessor} texcoord Accessor containing Vec2 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form TEXCOORD_<index>
   * @returns {Primitive} this
   */
  texcoord(texcoord: Accessor, index: number = 0): Primitive {
    if (this.properties.attributes)
      this.properties.attributes[`TEXCOORD_${index}`] = texcoord;
    return this;
  }

  /**
   * Sets data for the COLOR property on the primitive
   *
   * @param {Accessor} color Accessor containing Vec3 or Vec4 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form COLOR_<index>
   * @returns {Primitive} this
   */
  color(color: Accessor, index: number = 0): Primitive {
    if (this.properties.attributes)
      this.properties.attributes[`COLOR_${index}`] = color;
    return this;
  }

  /**
   * Sets data for the JOINTS property on the primitive
   *
   * @param {Accessor} joints Accessor containing Vec4 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form JOINTS_<index>
   * @returns {Primitive} this
   */
  joints(joints: Accessor, index: number = 0): Primitive {
    if (this.properties.attributes)
      this.properties.attributes[`JOINTS_${index}`] = joints;
    return this;
  }

  /**
   * Sets data for the WEIGHTS property on the primitive
   *
   * @param {Accessor} weights Accessor containing Vec4 data
   * @param {number} [index=0] The set index for this property, which gets applied in the form WEIGHTS_<index>
   * @returns {Primitive} this
   */
  weights(weights: Accessor, index: number = 0): Primitive {
    if (this.properties.attributes)
      this.properties.attributes[`WEIGHTS_${index}`] = weights;
    return this;
  }

  /**
   * Sets the indices property on the primitive
   *
   * @param {Accessor} indices an accessor for UInt index data
   *
   * @returns {Primitive} this
   */
  indices(indices: Accessor): Primitive {
    this.properties.indices = indices;
    return this;
  }

  /**
   * Sets the material for this primitive
   *
   * @param {Material} material
   *
   * @returns {Primitive} this
   */
  material(material: Material): Primitive {
    this.properties.material = material;

    return this;
  }

  build(indexer: Indexer) {
    const { attributes, ...properties } = this.properties;

    const indexedAttributes = Object.entries(attributes ?? {}).map(
      ([attribute, accessor]) => [
        attribute,
        accessor && indexer.indexOf(accessor),
      ],
    );

    const { indices, material, ...nonIndexedProperties } = properties;

    return pickBuiltProperties({
      ...nonIndexedProperties,
      indices: indices && indexer.indexOf(indices),
      material: material && indexer.indexOf(material),
      attributes: Object.fromEntries(indexedAttributes),
    });
  }
}
