export default (typedArray, { BufferView, Buffer }) => {
  const buffer = new Buffer().data(typedArray.buffer);
  const bufferView = new BufferView()
    .buffer(buffer)
    .byteLength(typedArray.buffer.byteLength);

  return bufferView;
};
