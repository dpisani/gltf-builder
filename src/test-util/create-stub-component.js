import { stub } from 'sinon';

export default (Component, setterNames = [], buildResult = {}) => {
  return {
    StubClass: class extends Component {
      constructor() {
        super();
        const setterStubs = setterNames.reduce(
          (acc, setter) => ({ ...acc, [setter]: stub().returnsThis() }),
          {}
        );

        this.build = () => buildResult;

        for (const key in setterStubs) {
          this[key] = setterStubs[key];
        }
      }
    }
  };
};
