import ComponentBase from '../component-base/';

export default class Scene extends ComponentBase {
  // Sets the name of the scene
  name(n) {
    this.properties.name = n;

    return this;
  }
}
