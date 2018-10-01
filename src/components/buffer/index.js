import NamedComponent from '../named-component/';
import pickBuiltProperties from '../../util/pick-built-properties';

import { fromByteArray } from 'base64-js';

export default class Buffer extends NamedComponent {
  constructor() {
    super({ indexName: 'buffers' });
  }

  data(arrayBuffer) {
    this.properties.data = arrayBuffer;

    return this;
  }

  build() {
    const { data, ...properties } = this.properties;

    const buildDataUri = () => {
      if (!data) return undefined;

      const base64 = fromByteArray(new Uint8Array(data));
      return `data:text/plain;base64,${base64}`;
    };

    return pickBuiltProperties({
      ...properties,
      uri: buildDataUri(),
      byteLength: data ? data.byteLength : 1
    });
  }
}
