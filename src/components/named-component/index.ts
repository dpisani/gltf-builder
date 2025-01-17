import ComponentBase from "../component-base/index.js";

export default class NamedComponent<
  ComponentProperties extends Record<string, unknown> & { name?: never },
> extends ComponentBase<
  ComponentProperties extends { name: string }
    ? never
    : Omit<ComponentProperties, "name"> & { name?: string }
> {
  private indexName: string;

  constructor({
    indexName,
    defaultProperties,
  }: {
    indexName?: string;
    defaultProperties?: Partial<
      ComponentProperties extends { name: string }
        ? never
        : Omit<ComponentProperties, "name"> & { name?: string }
    >;
  }) {
    super(defaultProperties);

    this.indexName = indexName ?? this.constructor.name.toLowerCase();
  }

  /**
   * Sets the name of the component
   * @ignore
   */
  name(n: string) {
    this.properties.name = n;
    return this;
  }

  /**
   * Gets the name of the top level index this entity belongs to
   * @ignore
   */
  getIndexName() {
    return this.indexName;
  }
}
