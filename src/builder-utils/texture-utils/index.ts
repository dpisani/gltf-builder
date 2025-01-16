import Buffer from '../../components/buffer/index.js';
import BufferView from '../../components/buffer-view/index.js';
import Texture from '../../components/texture/index.js';
import TextureImage, {
  SupportedMimeType
} from '../../components/image/index.js';
import TextureInfo from '../../components/texture-info/index.js';

import { buildTextureFromArrayBuffer as buildTextureFromArrayBufferUnwired } from './unwired.js';

/**
 * Creates the structure for a texture backed by an array buffer data source.
 *
 * @param arrayBuffer A JS array buffer containing image data.
 * @param mimeType The mime type of the image. Must be image/png or image/jpeg.
 *
 * @returns Object containing a texture object and a corresponding textureInfo object
 */
export const buildTextureFromArrayBuffer = (
  arrayBuffer: ArrayBuffer,
  mimeType: SupportedMimeType
) =>
  buildTextureFromArrayBufferUnwired(arrayBuffer, mimeType, {
    Buffer,
    BufferView,
    TextureInfo,
    Texture,
    TextureImage
  });
