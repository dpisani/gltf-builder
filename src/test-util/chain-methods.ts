const getAllMethodNames = (object: object): Set<string> => {
  const methods = new Set<string>();
  let obj: object | null = object;
  while ((obj = Reflect.getPrototypeOf(obj))) {
    const keys = Reflect.ownKeys(obj);
    keys.forEach(k => typeof k === 'string' && methods.add(k));

    if (Reflect.getPrototypeOf(obj) === Object.prototype) break;
  }
  return methods;
};

export default (component: object, exclude?: string[]) => {
  const functions = Array.from(getAllMethodNames(component)).filter(
    fn => !['build', 'getIndexName', 'constructor', ...(exclude ?? [])].includes(fn)
  );

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return functions.reduce((acc, fn): object => acc[fn](), component);
};
