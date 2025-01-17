/**
 * Represents a point in 2D space, represented using either a typed array or an array of plain numbers.
 */
export type Vec2 = [number, number] | Float32Array;

/**
 * Represents a point in 3D space, represented using either a typed array or an array of plain numbers.
 */
export type Vec3 = [number, number, number] | Float32Array;

/**
 * Represents a point in 4D space, represented using either a typed array or an array of plain numbers.
 */
export type Vec4 = [number, number, number, number] | Float32Array;

export type Mat4 =
  | [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number,
    ]
  | Float32Array;
