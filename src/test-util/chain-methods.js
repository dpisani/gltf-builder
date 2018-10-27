const getAllMethodNames = obj => {
  let methods = new Set();
  while ((obj = Reflect.getPrototypeOf(obj))) {
    let keys = Reflect.ownKeys(obj);
    keys.forEach(k => methods.add(k));

    if (Reflect.getPrototypeOf(obj) === Object.prototype) break;
  }
  return methods;
};

export default component => {
  const functions = Array.from(getAllMethodNames(component)).filter(
    fn => !['build', 'getIndexName', 'constructor'].includes(fn)
  );

  return functions.reduce((acc, fn) => acc[fn](), component);
};
