import BufferViewType from "../../../components/buffer-view/index.js";
import BufferType from "../../../components/buffer/index.js";

export default (
  typedArray: ArrayBufferView,
  {
    BufferView,
    Buffer,
  }: { BufferView: typeof BufferViewType; Buffer: typeof BufferType },
) => {
  const buffer = new Buffer().data(typedArray.buffer);
  const bufferView = new BufferView()
    .buffer(buffer)
    .byteLength(typedArray.buffer.byteLength);

  return bufferView;
};
