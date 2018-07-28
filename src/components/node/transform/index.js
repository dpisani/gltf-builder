import ComponentBase from '../../component-base';
export default class Transform extends ComponentBase {
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
}
