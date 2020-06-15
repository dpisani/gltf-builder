import pickBuiltProperties from '../../util/pick-built-properties';
import NamedComponent from '../named-component/';

/**
 * Scene - a builder for a glTF scene object.
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-scene|glTF reference}
 * @hideconstructor
 */
export default class Scene extends NamedComponent {
  constructor() {
    super({ indexName: 'scenes', defaultProperties: { nodes: [] } });
  }

  /**
   * Adds a node to this scene
   *
   * @param {Node} node
   * @returns {Scene} this
   * @memberof Scene
   */
  addNode(node) {
    this.properties.nodes.push(node);

    return this;
  }

  build(indexer) {
    return pickBuiltProperties({
      ...this.properties,
      nodes: this.properties.nodes.map(node => indexer.indexOf(node))
    });
  }
}
