import {
  ComponentClass,
  ComponentType,
  FunctionComponent,
  LazyExoticComponent,
  ReactElement,
} from 'react';
import { RouteProps } from 'react-router';

// types
import { RouteName } from './constants/routes';

export type TProtectedRouteProps = {
  guards?: Array<TGuard>;
  name: RouteName;
} & RouteProps;

export type TGuard = {
  guardCheck: () => boolean;
  renderFallback: (
    routeProps: TProtectedRouteProps,
  ) => JSX.Element | ReactElement;
  translationKey?: string;
};

export type TComponent =
  | ComponentType<{}>
  | LazyExoticComponent<FunctionComponent>
  | LazyExoticComponent<ComponentClass<{}, unknown>>
  | undefined;

export type TAppRouteData = {
  Component?: TComponent;
  guards?: Array<TGuard>;
  name: RouteName;
  path?: string;
};

export type TAppRoutesData = Array<TAppRouteData | TAppRouteData['name']>;
