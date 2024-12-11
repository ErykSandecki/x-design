import { FC, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useLocation } from 'react-router';

// components
import RouteTransitionLoader from './components/RouteTransitionLoader/RouteTransitionLoader';
import Title from './components/Title/Title';

// hooks
import { useHandleRouter } from './hooks/useHandleRouter';

// others
import { APP_ROUTES_DATA } from './constants/appRoutesData';

// utils
import { renderRoute } from './utils/renderRoute';

const Routing: FC = () => {
  const location = useLocation();

  useHandleRouter();

  return (
    <Suspense fallback={<RouteTransitionLoader />}>
      <Title />
      <Switch location={location}>
        {APP_ROUTES_DATA.map(renderRoute)}
        <Route path="*">{/* <NotFoundPage /> */}</Route>
      </Switch>
    </Suspense>
  );
};

export default Routing;
