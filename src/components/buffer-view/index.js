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

  byteLength(length) {
    this.properties.byteLength = length;

    return this;
  }

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
