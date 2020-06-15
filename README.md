# gltf-builder

Create 3D models using JS.

gltf-builder provides a means to programatically construct 3D assets in the [glTF file format](https://github.com/KhronosGroup/glTF/blob/master/README.md). It aims to make procedural generation easier by letting you build up a model piece-by-piece without having to worry about the structure of the glTF file format itself.

## Installation

```
npm install gltf-builder
```

## Getting started

The gltf-builder package contains builders for various [glTF components](https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#properties-reference) used to construct a 3D asset. Each component allows for all of its properties to be set in a chaining style syntax, and can be then composed together to make the final product.

```js
const {
  Asset,
  Scene,
  Mesh,
  Node,
  Primitive,
  buildVec3Accessor
} = require('gltf-builder');

const triangleAsset = new Asset().addScene(
  new Scene().addNode(
    new Node().mesh(
      new Mesh().addPrimitive(
        new Primitive().position(
          buildVec3Accessor([[0, 0, 0], [1, 0, 0], [0, 1, 0]])
        )
      )
    )
  )
);

// Calling .build on the asset produces the final product as an object
const gltf = triangleAsset.build();

// Saving to a file
const fs = require('fs');
fs.writeFileSync('triangle.gltf', JSON.stringify(gltf), 'utf8');
```

The created model can be viewed online using [gltf-viewer](https://gltf-viewer.donmccurdy.com/) or added
to a scene using a framework like [A-Frame](https://aframe.io/).

## Docs

- [Guides](./guides/README.md)
- [API reference](https://dpisani.github.io/gltf-builder/index.html)
