import NamedComponent from "../named-component/index.js";
import pickBuiltProperties from "../../util/pick-built-properties.js";
import Primitive from "../primitive/index.js";
import Indexer from "../asset/indexer/index.js";

/**
 * Mesh - a builder for a GLTF mesh object, containing a set of primitives to be rendered
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-mesh | GLTF reference}
 * @hideconstructor
 */
export default class Mesh extends NamedComponent<{ primitives: Primitive[] }> {
  constructor() {
    super({ indexName: "meshes", defaultProperties: { primitives: [] } });
  }

  /**
   * Adds a primitive to the mesh
   *
   * @param {Primitive} primitive
   * @returns {Mesh} this
   */
  addPrimitive(primitive: Primitive): Mesh {
    if (this.properties.primitives) this.properties.primitives.push(primitive);

    return this;
  }

  build(indexer: Indexer) {
    const { primitives, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      primitives: primitives?.map((primitive) => primitive.build(indexer)),
    });
  }
}
