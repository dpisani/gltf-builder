import NamedComponent from "../named-component/index.js";
import pickBuiltProperties from "../../util/pick-built-properties.js";
import Indexer from "../asset/indexer/index.js";
import Buffer from "../buffer/index.js";

/**
 * BufferView - a builder for a GLTF buffer view object
 * @see {@link https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#reference-bufferview | GLTF reference}
 * @hideconstructor
 */
export default class BufferView extends NamedComponent<{
  byteLength: number;
  buffer: Buffer;
}> {
  constructor() {
    super({ indexName: "bufferViews" });
  }

  /**
   * Sets the length of the buffer view, in bytes
   *
   * @param {number} length
   * @returns {BufferView} this
   */
  byteLength(length: number): BufferView {
    this.properties.byteLength = length;

    return this;
  }

  /**
   * Sets the buffer referenced by this buffer view
   *
   * @param {Buffer} buffer
   * @returns {BufferView} this
   */
  buffer(buffer: Buffer): BufferView {
    this.properties.buffer = buffer;

    return this;
  }

  build(indexer: Indexer) {
    const { buffer, ...properties } = this.properties;
    return pickBuiltProperties({
      ...properties,
      buffer: buffer && indexer.indexOf(buffer),
    });
  }
}
