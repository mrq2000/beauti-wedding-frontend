import { isArray, mergeWith } from 'lodash-es';

export const mergeWithoutArray = (obj: any, source: any) => {
  return mergeWith(obj, source, (objValue, srcValue) => {
    if (isArray(objValue)) {
      return srcValue;
    }
    return undefined;
  });
};
