import ComponentBase from '../component-base/';

export default class NamedComponent extends ComponentBase {
  // Sets the name of the component
  name(n) {
    this.properties.name = n;

    return this;
  }
}
