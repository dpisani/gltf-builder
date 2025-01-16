import lodash from 'lodash';

const { pickBy, isNil, isArray, isEmpty } = lodash;

export default (object: object | null | undefined) =>
  pickBy(object, value => !isNil(value) && !(isArray(value) && isEmpty(value)));
