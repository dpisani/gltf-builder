import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

/**
 * BufferView - a builder for a GLTF buffer view object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-bufferview|GLTF reference}
 * @hideconstructor
 */
export default class BufferView extends NamedComponent {
  constructor() {
    super({ indexName: 'bufferViews' });
  }

  /**
   * Sets the length of the buffer view, in bytes
   *
   * @param {number} length
   * @returns {BufferView} this
   * @memberof BufferView
   */
  byteLength(length) {
    this.properties.byteLength = length;

    return this;
  }

  /**
   * Sets the buffer referenced by this buffer view
   *
   * @param {Buffer} buffer
   * @returns {BufferView} this
   * @memberof BufferView
   */
  buffer(buffer) {
    this.properties.buffer = buffer;

    return this;
  }

  build(indexer) {
    const { buffer, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      buffer: buffer && indexer.indexOf(buffer)
    });
  }
}
