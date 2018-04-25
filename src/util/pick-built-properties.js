import { pickBy, isNil, isArray, isEmpty } from 'lodash';

export default object =>
  pickBy(object, value => !isNil(value) && !(isArray(value) && isEmpty(value)));
