import NamedComponent from '../named-component/';

export default class BufferView extends NamedComponent {
  constructor() {
    super({ indexName: 'bufferViews' });
  }

  byteLength(length) {
    this.properties.byteLength = length;

    return this;
  }
}
