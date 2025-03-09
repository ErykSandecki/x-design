// others
import { BASE_3D } from 'shared';

// store
import { areaAxisSelectorCreator } from '../../selectors';

describe('areaAxisSelectorCreator', () => {
  it('should return coordinates', () => {
    // before
    const selectorFunction = (areaAxisSelectorCreator('x') as any).resultFunc;

    // result
    expect(selectorFunction(BASE_3D)).toBe(BASE_3D.x);
  });
});
