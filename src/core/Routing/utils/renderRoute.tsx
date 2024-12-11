// components
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

// types
import { TAppRouteData } from '../types';

// utils
import { getRouteProps } from './getRouteProps';

export const renderRoute = (
  routeDataArg: TAppRouteData | TAppRouteData['name'],
): JSX.Element => {
  const routeData: TAppRouteData =
    typeof routeDataArg === 'string' ? { name: routeDataArg } : routeDataArg;

  const routeProps = getRouteProps(routeData);

  return <ProtectedRoute {...routeProps} key={routeData.name} />;
};
