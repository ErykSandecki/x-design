// others
import { ROUTES } from '../constants/routes';

// types
import { TAppRouteData, TProtectedRouteProps } from '../types';

const getRoutePath = ({ name }: TAppRouteData): TAppRouteData['path'] =>
  ROUTES[name];

export const getRouteProps = (
  routeData: TAppRouteData,
): TProtectedRouteProps => ({
  component: routeData.Component,
  exact: true,
  guards: routeData.guards || [],
  name: routeData.name,
  path: getRoutePath(routeData),
});
