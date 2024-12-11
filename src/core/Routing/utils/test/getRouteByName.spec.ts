// types
import { RouteName } from '../../constants/routes';

// utils
import { getRouteByName } from '../getRouteByName';

describe('getRouteByName', () => {
  it('should return correct route', () => {
    // before
    const result = getRouteByName(RouteName.home);

    // result
    expect(result).toBe('/');
  });
});
