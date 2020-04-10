export const buildTextureFromArrayBuffer = (
  arrayBuffer,
  mimeType,
  { Buffer, BufferView, Texture, TextureImage, TextureInfo }
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
