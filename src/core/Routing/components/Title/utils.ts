// types
import { RouteName } from '../../constants/routes';
import { TObject } from 'types/generic';

// utils
import { enumToArray } from 'utils/transform/enumToArray';
import { getRouteByName } from '../../utils/getRouteByName';

export const getTitlesTranslationKeys = (): TObject<string> =>
  enumToArray<RouteName>(RouteName).reduce(
    (obj, key) => ({
      ...obj,
      [getRouteByName(RouteName[key])]: `routing.title.${key}`,
    }),
    {},
  );
