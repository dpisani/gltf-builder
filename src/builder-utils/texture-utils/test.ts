import "should";
import "should-sinon";

import { describe, it, beforeEach } from "mocha";

import Buffer from "../../components/buffer/index.js";
import BufferView from "../../components/buffer-view/index.js";
import Texture from "../../components/texture/index.js";
import TextureImage from "../../components/image/index.js";
import TextureInfo from "../../components/texture-info/index.js";

import createStubComponent from "../../test-util/create-stub-component.js";

import { buildTextureFromArrayBuffer } from "./unwired.js";
import { SinonStub } from "sinon";

const bufferStub = createStubComponent(Buffer, ["data"]);

const bufferViewStub = createStubComponent(BufferView, [
  "buffer",
  "byteLength",
]);

const textureStub = createStubComponent(Texture, ["source"]);

const textureImageStub = createStubComponent(TextureImage, [
  "mimeType",
  "bufferView",
]);

const textureInfoStub = createStubComponent(TextureInfo, ["texture"]);

const deps = {
  Buffer: bufferStub.StubClass,
  BufferView: bufferViewStub.StubClass,
  Texture: textureStub.StubClass,
  TextureImage: textureImageStub.StubClass,
  TextureInfo: textureInfoStub.StubClass,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

const imageBuffer = Uint8Array.of(65, 66, 67).buffer;

describe("buildTextureFromArrayBuffer utility", () => {
  it("returns a texture and textureInfo pair", () => {
    const result = buildTextureFromArrayBuffer(imageBuffer, "image/png", deps);

    result.should.have.properties(["texture", "textureInfo"]);
    result.texture.should.be.an.instanceOf(Texture);
    result.textureInfo.should.be.an.instanceOf(TextureInfo);
  });

  describe("texture", () => {
    let texture: Texture;

    beforeEach(() => {
      texture = buildTextureFromArrayBuffer(
        imageBuffer,
        "image/png",
        deps,
      ).texture;
    });

    it("sets a source image on the texture", () => {
      texture.source.should.be.calledOnce();
      (texture.source as SinonStub).firstCall.args[0].should.be.an.instanceOf(
        TextureImage,
      );
    });

    describe("textureImage", () => {
      let textureImage: TextureImage;
      beforeEach(() => {
        textureImage = (texture.source as SinonStub).firstCall.args[0];
      });

      it("sets the mime type for the image", () => {
        textureImage.mimeType.should.be.calledWith("image/png");
      });

      it("sets a BufferView on the image", () => {
        textureImage.bufferView.should.be.calledOnce();
        (
          textureImage.bufferView as SinonStub
        ).firstCall.args[0].should.be.an.instanceOf(BufferView);
      });

      describe("bufferView", () => {
        let bufferView: BufferView;
        beforeEach(() => {
          bufferView = (textureImage.bufferView as SinonStub).firstCall.args[0];
        });

        it("sets the correct byteLength on the bufferView", () => {
          bufferView.byteLength.should.be.calledWith(3);
        });

        it("sets a buffer on the bufferView", () => {
          bufferView.buffer.should.be.calledOnce();
          (
            bufferView.buffer as SinonStub
          ).firstCall.args[0].should.be.an.instanceOf(Buffer);
        });

        describe("buffer", () => {
          let buffer: Buffer;
          beforeEach(() => {
            buffer = (bufferView.buffer as SinonStub).firstCall.args[0];
          });

          it("sets data on the buffer", () => {
            (
              buffer.data as SinonStub
            ).firstCall.args[0].should.be.an.instanceOf(ArrayBuffer);
          });
        });
      });
    });
  });
});
