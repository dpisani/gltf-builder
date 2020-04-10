import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

import { fromByteArray } from 'base64-js';

/**
 * Buffer - a builder for a GLTF buffer object
 * This component builds provided data inline as a data URI
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-buffer|GLTF reference}
 * @hideconstructor
 */
export default class Buffer extends NamedComponent {
  constructor() {
    super({ indexName: 'buffers' });
  }

  /**
   * Sets the data stored in this buffer.
   *
   * @param {ArrayBuffer} arrayBuffer a JS array buffer containing binary data
   * @returns {Buffer} this
   */
  data(arrayBuffer) {
    this.properties.data = arrayBuffer;

    return this;
  }

  build() {
    const { data, ...properties } = this.properties;

    const buildDataUri = () => {
      if (!data) return undefined;

      const base64 = fromByteArray(new Uint8Array(data));
      return `data:application/octet-stream;base64,${base64}`;
    };

    return pickBuiltProperties({
      ...properties,
      uri: buildDataUri(),
      byteLength: data ? data.byteLength : 1
    });
  }
}
