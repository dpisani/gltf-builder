import AssetComponent from '../asset-component/';

export default class Asset extends AssetComponent {
  build() {
    return {
      asset: {
        version: '2.0',
        generator: 'gltf-builder'
      }
    };
  }
}
