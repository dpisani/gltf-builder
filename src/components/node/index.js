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

  addChild(child) {
    this.properties.children.push(child);

    return this;
  }

  translation(x, y, z) {
    this.properties.translation = [x, y, z];
    return this;
  }

  rotation(x, y, z, w) {
    this.properties.rotation = [x, y, z, w];
    return this;
  }

  scale(x, y, z) {
    this.properties.scale = [x, y, z];
    return this;
  }

  mesh(mesh) {
    this.properties.mesh = mesh;
    return this;
  }

  /**
   * matrix - sets the matrix property
   *
   * @param {number[]} matrix A floating-point 4x4 transformation matrix stored in column-major order.
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
