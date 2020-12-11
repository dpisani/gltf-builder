import pickBuiltProperties from '../../util/pick-built-properties';
import NamedComponent from '../named-component/';

/**
 * Node - a builder for the GLTF node object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-node|GLTF reference}
 * @hideconstructor
 */
export default class Node extends NamedComponent {
  constructor() {
    super({ indexName: 'nodes', defaultProperties: { children: [] } });
  }

  /**
   * Adds a child node under this one
   *
   * @param {Node} child
   * @returns {Node} this
   * @memberof Node
   */
  addChild(child) {
    this.properties.children.push(child);

    return this;
  }

  /**
   * Sets the translation of this node along the x, y, and z axes.
   * Should not be used in conjunction with the matrix property.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Node} this
   * @memberof Node
   */
  translation(x, y, z) {
    this.properties.translation = [x, y, z];
    return this;
  }

  /**
   * Sets the node's unit quaternion rotation in the order (x, y, z, w), where w is the scalar.
   * Should not be used in conjunction with the matrix property.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @param {number} w
   * @returns {Node} this
   * @memberof Node
   */
  rotation(x, y, z, w) {
    this.properties.rotation = [x, y, z, w];
    return this;
  }

  /**
   * Sets the node's non-uniform scale, given as the scaling factors along the x, y, and z axes.
   * Should not be used in conjunction with the matrix property.
   *
   * @param {number} x
   * @param {number} y
   * @param {number} z
   * @returns {Node} this
   * @memberof Node
   */
  scale(x, y, z) {
    this.properties.scale = [x, y, z];
    return this;
  }

  /**
   * Sets the mesh for this node
   *
   * @param {Mesh} mesh
   * @returns {Node} this
   * @memberof Node
   */
  mesh(mesh) {
    this.properties.mesh = mesh;
    return this;
  }

  /**
   * Sets a matrix transformation property on this node. Should not be used in conjunction with
   * translation, rotation or scale properties.
   *
   * @param {number[]} matrix A 4x4 transformation matrix stored in column-major order.
   *
   * @returns {Node} this
   */
  matrix(matrix) {
    this.properties.matrix = matrix;
    return this;
  }

  build(indexer) {
    const { children, mesh, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      children: children.map(node => indexer.indexOf(node)),
      mesh: mesh && indexer.indexOf(mesh)
    });
  }
}
