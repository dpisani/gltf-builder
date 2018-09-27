import Asset from '../components/asset';
import Scene from '../components/scene/';
import Node from '../components/node';
import Mesh from '../components/mesh';

export const createAssetFixture = () => new Asset();

export const createSceneFixture = () => {
  const asset = createAssetFixture();
  const scene = new Scene();

  asset.addScene(scene);

  return { asset, scene };
};

export const createNodeFixture = () => {
  const { asset, scene } = createSceneFixture();
  const node = new Node();

  scene.addNode(node);

  return { asset, node };
};

export const createMeshFixture = () => {
  const { asset, node } = createNodeFixture();
  const mesh = new Mesh();

  node.mesh(mesh);

  return { asset, mesh };
};
