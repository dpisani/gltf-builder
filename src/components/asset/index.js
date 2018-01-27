import { cloneDeepWith, isFunction } from 'lodash';
import ComponentBase from '../component-base/';

export default class Asset extends ComponentBase {
  constructor() {
    super();
    this.properties = {
      asset: {
        version: '2.0',
        generator: 'gltf-builder'
      }
    };
  }

  build() {
    const customizer = value => {
      if (!value.build || !isFunction(value.build)) {
        return undefined;
      }

      return value.build();
    };

    return cloneDeepWith(this.properties, customizer);
  }

  addScene(scene) {
    if (scene) {
      this.properties.scenes = this.properties.scenes || [];
      this.properties.scenes.push(scene);
    }
  }
}
