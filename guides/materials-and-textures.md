# Materials and textures

glTF assets use the [metallic-roughness model](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#materials)
for specifying materials on primitives. When building an asset using gltf-builder these metallic-roughness properties can be specified
by building up a `MetallicRoughness` object and attaching it to a `Material` instance.

```js
const {
  Asset,
  Scene,
  Mesh,
  Node,
  Primitive,
  Material,
  MetallicRoughness,
  buildVec3Accessor
} = require('gltf-builder');

const shinyRedMaterial = new Material().metallicRoughness(
  new MetallicRoughness()
    .baseColorFactor([1, 0, 0, 1]) // Colour specified in an RGBA vector
    .metallicFactor(0.8)
);

const redTriangle = new Asset().addScene(
  new Scene().addNode(
    new Node().mesh(
      new Mesh().addPrimitive(
        new Primitive()
          .position(buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0]]))
          .material(shinyRedMaterial) // Apply the material to the Primitive
      )
    )
  )
);

const gltf = redTriangle.build();
```

## Textures

An image can also be applied to a primitive by creating a texture and applying it to the `MetallicRoughness` object.
The texture itself needs to be supplied as a buffer containing the raw image data. e.g.

```js
const {
  Material,
  MetallicRoughness,
  buildTextureFromArrayBuffer
} = require('gltf-builder');

const fs = require('fs');

// Reading the image data using node's fs module. Supported formats are JPEG and PNG.
const imageDataBuffer = fs.readFileSync('texture.jpg');

const { textureInfo } = buildTextureFromArrayBuffer(
  imageDataBuffer,
  'image/jpeg'
);

const texturedMaterial = new Material().metallicRoughness(
  new MetallicRoughness().baseColorTexture(textureInfo)
);
```

The material can be applied to a primitive that has texture coordinate information set on it.

```js
const {
  Asset,
  Scene,
  Mesh,
  Node,
  Primitive,
  buildUIntAccessor,
  buildVec2Accessor,
  buildVec3Accessor
} = require('gltf-builder');

const texturedQuad = new Asset().addScene(
  new Scene().addNode(
    new Node().mesh(
      new Mesh().addPrimitive(
        new Primitive()
          .position(
            buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0]])
          )
          .indices(buildUIntAccessor([0, 1, 2, 2, 1, 3]))
          .texcoord(buildVec2Accessor([[0, 0], [1, 0], [0, 1], [1, 1]])) // Texture coordinates are represented as an array of 2D vectors
          .material(texturedMaterial) // Using the material from above
      )
    )
  )
);

const gltf = texturedQuad.build();
```
