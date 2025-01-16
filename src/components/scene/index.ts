import pickBuiltProperties from '../../util/pick-built-properties.js';
import Indexer from '../asset/indexer/index.js';
import NamedComponent from '../named-component/index.js';
import Node from '../node/index.js';

/**
 * Scene - a builder for a glTF scene object.
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-scene | GLTF reference}
 * @hideconstructor
 */
export default class Scene extends NamedComponent<{nodes: Node[]}> {
  constructor() {
    super({ indexName: 'scenes', defaultProperties: { nodes: [] } });
  }

  /**
   * Adds a node to this scene
   *
   * @param {Node} node
   * @returns {Scene} this
   */
  addNode(node: Node): Scene {
    if(this.properties.nodes) this.properties.nodes.push(node);

    return this;
  }

  build(indexer: Indexer) {
    return pickBuiltProperties({
      ...this.properties,
      nodes: this.properties.nodes?.map(node => indexer.indexOf(node))
    });
  }
}
