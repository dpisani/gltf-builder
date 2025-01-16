import { Vec3, Vec4 } from '../../types/data-types.js';
import pickBuiltProperties from '../../util/pick-built-properties.js';
import Indexer from '../asset/indexer/index.js';
import Mesh from '../mesh/index.js';
import NamedComponent from '../named-component/index.js';

/**
 * Node - a builder for the GLTF node object
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-node | GLTF reference}
 * @hideconstructor
 */
export default class Node extends NamedComponent<{
  children: Node[];
  translation: Vec3;
  rotation: Vec4;
  scale: Vec3;
  mesh: Mesh;
  matrix: number[];
}> {
  constructor() {
    super({ indexName: 'nodes', defaultProperties: { children: [] } });
  }

  /**
   * Adds a child node under this one
   *
   * @param {Node} child
   * @returns {Node} this
   */
  addChild(child: Node): Node {
    if (this.properties.children) this.properties.children.push(child);

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
   */
  translation(x: number, y: number, z: number): Node {
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
   */
  rotation(x: number, y: number, z: number, w: number): Node {
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
   */
  scale(x: number, y: number, z: number): Node {
    this.properties.scale = [x, y, z];
    return this;
  }

  /**
   * Sets the mesh for this node
   *
   * @param {Mesh} mesh
   * @returns {Node} this
   */
  mesh(mesh: Mesh): Node {
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
  matrix(matrix: number[]): Node {
    this.properties.matrix = matrix;
    return this;
  }

  build(indexer: Indexer) {
    const { children, mesh, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      children: children?.map(node => indexer.indexOf(node)),
      mesh: mesh && indexer.indexOf(mesh)
    });
  }
}
