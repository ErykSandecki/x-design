// types
import { RouteName } from '../../../constants/routes';

// utils
import { getRouteByName } from '../../../utils/getRouteByName';
import { getTitlesTranslationKeys } from '../utils';

describe('getTitlesTranslationKeys', () => {
  it('should return object with keys', () => {
    // before
    const homeRouteKey = getRouteByName(RouteName.home);
    const result = getTitlesTranslationKeys();

    // result
    expect(result[homeRouteKey]).toBe(`routing.title.${RouteName.home}`);
  });
});
