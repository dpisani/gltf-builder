import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

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
