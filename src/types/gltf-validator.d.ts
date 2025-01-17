declare module "gltf-validator" {
  interface GltfValidator {
    validateString(gltfString: string): Promise<object>;
  }

  const validator: GltfValidator;

  export default validator;
}
