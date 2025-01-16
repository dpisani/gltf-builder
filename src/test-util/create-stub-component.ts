import { stub, SinonStub } from 'sinon';
import Indexer from '../components/asset/indexer/index.js';
import { Newable } from 'ts-essentials';

export default <
  SetterNames extends string,
  BuildResultType,
  T extends Newable<{
    build: ((indexer: Indexer) => BuildResultType);
  }>
>(
  Component: T,
  setterNames: SetterNames[] = [],
  buildResult: BuildResultType | undefined = undefined
): {
  StubClass: Newable<
    { [x in SetterNames]: SinonStub } & {
      build: () => BuildResultType | undefined;
    }
  >;
} => {
  return {
    StubClass: class extends Component {
      public build: () => BuildResultType;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        super(...args);

        this.build = () => {
          if (buildResult === undefined) {
            throw new Error(
              'buildResult needs to be given to createStubComponent'
            );
          }
          return buildResult;
        };

        for (const key of setterNames) {
          Object.defineProperty(this, key, { value: stub().returnsThis() });
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any
  };
};
