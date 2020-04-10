import Buffer from '../../components/buffer';
import BufferView from '../../components/buffer-view';
import Texture from '../../components/texture';
import TextureImage from '../../components/image';
import TextureInfo from '../../components/texture-info';

import { buildTextureFromArrayBuffer as buildTextureFromArrayBufferUnwired } from './unwired';

/**
 * @function buildTextureFromArrayBuffer
 *
 * @desc Creates the structure for a texture backed by an array buffer data source.
 *
 * @param {ArrayBuffer} arrayBuffer A JS array buffer containing image data.
 * @param {string} mimeType The mime type of the image. Must be image/png or image/jpeg.
 *
 * @returns {{texture: Texture, textureInfo: TextureInfo}} Object containing a texture object and a corresponding textureInfo object
 */
export const buildTextureFromArrayBuffer = (arrayBuffer, mimeType) =>
  buildTextureFromArrayBufferUnwired(arrayBuffer, mimeType, {
    Buffer,
    BufferView,
    TextureInfo,
    Texture,
    TextureImage
  });
