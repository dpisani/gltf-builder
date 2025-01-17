import NamedComponent from "../named-component/index.js";
import pickBuiltProperties from "../../util/pick-built-properties.js";
import { ValueOf } from "ts-essentials";
import BufferView from "../buffer-view/index.js";
import Indexer from "../asset/indexer/index.js";

const supportedMimeTypes = ["image/jpeg", "image/png"] as const;

export type SupportedMimeType = ValueOf<typeof supportedMimeTypes>;

/**
 * TextureImage - a builder for a GLTF image object
 * @see {@link https://github.com/KhronosGroup/glTF/tree/master/specification/2.0#reference-image | GLTF reference}
 * @hideconstructor
 */
export default class TextureImage extends NamedComponent<{
  uri: string;
  mimeType: SupportedMimeType;
  bufferView: BufferView;
}> {
  constructor() {
    super({ indexName: "images" });
  }

  /**
   * Sets the image URI to use as image data
   *
   * @param {string} uri
   * @returns {TextureImage} this
   */
  uri(uri: string): TextureImage {
    this.properties.uri = uri;

    return this;
  }

  /**
   * Sets the mime-type for the image. Must be set if providing data via bufferView
   *
   * @param {string} mimeType must be one of "image/jpeg", "image/png"
   * @returns {TextureImage} this
   */
  mimeType(mimeType: SupportedMimeType): TextureImage {
    if (![...supportedMimeTypes, undefined].includes(mimeType)) {
      throw new Error(
        'Unsupported mimeType given to TextureImage. Allowed values are ["image/jpeg", "image/png"]',
      );
    }

    this.properties.mimeType = mimeType;

    return this;
  }

  /**
   * Sets the buffer view holding the image data.
   *
   * @param {BufferView} bufferView
   * @returns {TextureImage} this
   */
  bufferView(bufferView: BufferView): TextureImage {
    this.properties.bufferView = bufferView;

    return this;
  }

  build(indexer: Indexer) {
    const { bufferView, ...properties } = this.properties;

    if (bufferView && !properties.mimeType) {
      throw new Error(
        "Cannot build TextureImage. Component was supplied with a buffer view and no mime type",
      );
    }

    return pickBuiltProperties({
      ...properties,
      bufferView: bufferView && indexer.indexOf(bufferView),
    });
  }
}
