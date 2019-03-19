/**
 * @function bufferViewFromArray
 *
 * @desc Creates an accessor for primitive indices
 * with an underlying buffer.
 *
 * @param {TypedArray} typedArray One of the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray|Typed arrays}.
 *
 * @returns {BufferView} A buffer view configured with an underlying buffer.
 */
declare function bufferViewFromArray(typedArray: TypedArray): BufferView;

/**
 * @function buildColour
 *
 * @desc Creates an accessor for COLOR_0 data
 * with an underlying buffer.
 *
 * @param {Vec4[]} points An array of colours.
 *
 * @returns {Accessor} An accessor for the colour data.
 */
declare function buildColour(points: Vec4[]): Accessor;

/**
 * @function buildColor
 *
 * @desc an alias for {@link buildColour}
 *
 * @param {Vec4[]} points An array of colours.
 *
 * @returns {Accessor} An accessor for the colour data.
 */
declare function buildColor(points: Vec4[]): Accessor;

/**
 * @function buildIndices
 *
 * @desc Creates an accessor for primitive indices
 * with an underlying buffer.
 *
 * @param {number[]} indices An array of indices.
 *
 * @returns {Accessor} An accessor for a data source for the indices.
 */
declare function buildIndices(indices: number[]): Accessor;

/**
 * @function buildPosition
 *
 * @desc Creates an accessor for POSITION data
 * with an underlying buffer.
 *
 * @param {Vec3[]} points An array of points.
 *
 * @returns {Accessor} An accessor for a data source for the geometry.
 */
declare function buildPosition(points: Vec3[]): Accessor;

/**
 * Accessor component types
 * @alias AccessorComponentTypes
 * @enum {number}
 */
declare const enum AccessorComponentTypes {
    BYTE,
    UNSIGNED_BYTE,
    SHORT,
    UNSIGNED_SHORT,
    UNSIGNED_INT,
    FLOAT
}

/**
 * Describes the type of data held by an accessor
 * @alias AccessorAttributeTypes
 * @enum {string}
 */
declare const enum AccessorAttributeTypes {
    SCALAR,
    VEC2,
    VEC3,
    VEC4,
    MAT2,
    MAT3,
    MAT4
}

/**
 * Accessor - a builder for a GLTF accessor object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-accessor|GLTF reference}
 * @hideconstructor
 */
declare class Accessor {
    /**
     * @static componentTypes - Valid data types for accessors
     *
     * @type {AccessorComponentTypes}
     */
    static componentTypes: AccessorComponentTypes;
    /**
     * @static types - Valid attribute types for accessors
     * @type {AccessorAttributeTypes}
     */
    static types: AccessorAttributeTypes;
    /**
     * count - sets the count property on the accessor
     *
     * @param {number} count number of attributes referenced by this accessor,
     * not to be confused with the number of bytes or number of components.
     *
     * @returns {Accessor} this
     */
    count(count: number): Accessor;
}

/**
 * BufferView - a builder for a GLTF buffer view object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-bufferview|GLTF reference}
 * @hideconstructor
 */
declare class BufferView {
}

/**
 * AlphaMode - Describes the alpha mode of a material
 * @enum {string}
 */
declare const enum alphaMode {
    OPAQUE,
    MASK,
    BLEND
}

/**
 * Material - a builder for a GLTF material object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-material|GLTF reference}
 * @hideconstructor
 */
declare class Material {
    /**
     * @function Material#metallicRoughness
     *
     * @description Alias of {@link Material#pbrMetallicRoughness}
     */
    metallicRoughness(): void;
    /**
     * @static alphaModes - Valid alpha modes for materials
     *
     * @see {alphaMode}
     */
    static alphaModes: any;
    /**
     * emissiveFactor - sets the emissive colour of the material
     *
     * @param {Vec3} emissiveFactor emissive colour
     *
     * @returns this
     */
    emissiveFactor(emissiveFactor: Vec3): any;
    /**
     * alphaMode - sets the alpha mode of the material
     *
     * @param {alphaMode} alphaMode one of the valid alpha modes
     *
     * @returns this
     */
    alphaMode(alphaMode: alphaMode): any;
    /**
     * alphaCutoff - sets the alpha mode of the material
     * when alphaMode is set to {@link alphaMode.MASK}
     *
     * @param {number} alphaCutoff a number in the range [0, 1]
     *
     * @returns this
     */
    alphaCutoff(alphaCutoff: number): any;
    /**
     * doubleSided - sets whether the material is double sided.
     *
     * @param {boolean} doubleSided
     *
     * @returns this
     */
    doubleSided(doubleSided: boolean): any;
    /**
     * pbrMetallicRoughness - Sets values used to define the metallic-roughness material
     * model from Physically-Based Rendering (PBR) methodology.
     *
     * @param {MetallicRoughness} pbrMetallicRoughness a MetallicRoughness object
     *
     * @returns this
     */
    pbrMetallicRoughness(pbrMetallicRoughness: MetallicRoughness): any;
}

/**
 * MetallicRoughness - a builder for a GLTF pbrMetallicRoughness object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-pbrmetallicroughness|GLTF reference}
 * @hideconstructor
 */
declare class MetallicRoughness {
    /**
     * @function MetallicRoughness#baseColourFactor
     *
     * @description Alias of {@link MetallicRoughness#baseColorFactor}
     */
    baseColourFactor(): void;
    /**
     * baseColorFactor - Sets the material's base color factor.
     *
     * @param {Vec4} baseColorFactor colour
     *
     * @returns this
     */
    baseColorFactor(baseColorFactor: Vec4): any;
    /**
     * metallicFactor - Sets the material's metallic factor.
     *
     * @param {number} metallicFactor
     *
     * @returns this
     */
    metallicFactor(metallicFactor: number): any;
    /**
     * roughnessFactor - Sets the material's roughness factor.
     *
     * @param {number} roughnessFactor
     *
     * @returns this
     */
    roughnessFactor(roughnessFactor: number): any;
}

/**
 * Primitive - A builder for the GLTF Primitive object
 * @see {@link https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#reference-primitive|GLTF reference}
 * @hideconstructor
 */
declare class Primitive {
    /**
     * indices - Sets the indices property on the primitive
     *
     * @param {Accessor} indices an accessor for index data
     *
     * @returns this
     */
    indices(indices: Accessor): any;
    /**
     * material - Sets the material for this primitive
     *
     * @param {Material} material
     *
     * @returns this
     */
    material(material: Material): any;
}

/**
 * A three dimensional vector.
 * @typedef {number[]} Vec3
 */
declare type Vec3 = number[];

/**
 * A four dimensional vector.
 * @typedef {number[]} Vec4
 */
declare type Vec4 = number[];

/**
 * One of the {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray|Typed arrays}.
 * @typedef {(Int8Array|Uint8Array|Int32Array|Uint32Array|Float32Array|Float64Array)} TypedArray
 */
declare type TypedArray = Int8Array | Uint8Array | Int32Array | Uint32Array | Float32Array | Float64Array;

