import "should";

import { describe, it, beforeEach } from "mocha";

import Buffer from "./index.js";
import chainMethods from "../../test-util/chain-methods.js";

describe("Buffer", () => {
  let buffer: Buffer;

  beforeEach(() => {
    buffer = new Buffer();
  });

  it("has a byteLength by default", () => {
    buffer.build().should.deepEqual({ byteLength: 1 });
  });

  it("can have a name", () => {
    buffer.name("buffer name");

    buffer.build().should.have.property("name", "buffer name");
  });

  it("can have its setters chained", () => {
    chainMethods(buffer).should.equal(buffer);
  });

  it("can receive an ArrayBuffer and encode the data as a data URI", () => {
    const intArray = Uint8Array.of(65, 66, 67); // utf-8: ABC

    buffer.data(intArray.buffer);

    buffer
      .build()
      .should.have.property("uri", "data:application/octet-stream;base64,QUJD");
  });

  it("should report the byteLength of the provided data", () => {
    const intArray = Uint8Array.of(65, 66, 67); // utf-8: ABC

    buffer.data(intArray.buffer);

    buffer.build().should.have.property("byteLength", 3);
  });
});
