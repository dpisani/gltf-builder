import Asset from "../components/asset/index.js";
import Scene from "../components/scene/index.js";
import Node from "../components/node/index.js";
import Mesh from "../components/mesh/index.js";
import Primitive from "../components/primitive/index.js";

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

export const createPrimitiveFixture = () => {
  const { asset, mesh } = createMeshFixture();
  const primitive = new Primitive();

  mesh.addPrimitive(primitive);

  return { asset, primitive };
};
