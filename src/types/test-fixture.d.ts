declare module "test-fixture" {
  type Fixtures = {
    resolve: (path?: string) => string;
  };

  const defaultExport: (base?: string) => Fixtures;

  export default defaultExport;
}
