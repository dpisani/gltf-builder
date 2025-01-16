# Basic geometry

In GLTF, we can specify geometry by creating meshes that we attach to nodes in our scene. The building blocks
of these meshes are primitives (usually triangles) that are fed into the graphics processor and drawn to the screen.

## Creating primitives

Primitives in gltf-builder are composed using arrays of data that describe the various properties that our geometry might have.
The most common property we will use is `position`, which marks out the placement of vertices in 3D space. For example, a simple
square mesh can be made up out of two triangles having 3 vertices each:

```js
const { Primitive, buildVec3Accessor } = require('gltf-builder');

const squarePrimitive = new Primitive().position(
  buildVec3Accessor([
    [0, 0, 0], // triangle #1
    [1, 0, 0],
    [0, 1, 0],
    [0, 1, 0], // triangle #2
    [1, 0, 0],
    [1, 1, 0]
  ])
);
```

The 3D vectors representing the points on each triangle are represented here as 3-component arrays. gltf-builder also supports the
usage of vectors stored as `Float32Array` objects, such as those created by the [gl-matrix](http://glmatrix.net/) package.

We can re-use vertices in our primitives by setting the `indices` property on our primitive. The provided indices will then be used
to determine which triangles will be drawn.

```js
const {
  Primitive,
  buildVec3Accessor,
  buildUIntAccessor
} = require('gltf-builder');

const squarePrimitive = new Primitive()
  .position(
    buildVec3Accessor([
      [0, 0, 0], // vertex #0
      [1, 0, 0], // vertex #1
      [0, 1, 0], // vertex #2
      [1, 1, 0] // vertex #3
    ])
  )
  .indices(
    buildUIntAccessor([
      0, // triangle #1
      1,
      2,
      2, // triangle #2
      1,
      3
    ])
  );
```

This creates the same square as the first example by specifying the 4 corners of the square in the `position` property and then defining
the two triangles in the mesh using the `indices` property, reducing the number of vertices from 6 down to 4. Using indices to re-use points in
meshes can result in both smaller file sizes and more efficient GPU calls when rendering primitives.

The data provided for primitive properties needs to be provided via an [Accessor](https://dpisani.github.io/gltf-builder/Accessor.html).
gltf-builder comes with some utility functions to create data accessors, such as the `buildVec3Accessor` and `buildUIntAccessor` methods
that were used in these examples.

[More information about geometry in the GLTF specification](https://registry.khronos.org/glTF/specs/2.0/glTF-2.0.html#geometry)
