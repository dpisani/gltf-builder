import BufferType from "../../components/buffer/index.js";
import BufferViewType from "../../components/buffer-view/index.js";
import TextureType from "../../components/texture/index.js";
import TextureImageType, {
  SupportedMimeType,
} from "../../components/image/index.js";
import TextureInfoType from "../../components/texture-info/index.js";

export const buildTextureFromArrayBuffer = (
  arrayBuffer: ArrayBuffer,
  mimeType: SupportedMimeType,
  {
    Buffer,
    BufferView,
    Texture,
    TextureImage,
    TextureInfo,
  }: {
    Buffer: typeof BufferType;
    BufferView: typeof BufferViewType;
    Texture: typeof TextureType;
    TextureImage: typeof TextureImageType;
    TextureInfo: typeof TextureInfoType;
  },
) => {
  const bufferView = new BufferView()
    .buffer(new Buffer().data(arrayBuffer))
    .byteLength(arrayBuffer.byteLength);
  const textureImage = new TextureImage()
    .bufferView(bufferView)
    .mimeType(mimeType);
  const texture = new Texture().source(textureImage);

  const textureInfo = new TextureInfo().texture(texture);

  return { texture, textureInfo };
};
