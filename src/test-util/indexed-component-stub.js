export default (indexName, build = () => {}) => ({
  getIndexName: () => indexName,
  build
});
