import { BrowserRouter as Router } from 'react-router-dom';
import { FC } from 'react';
import { useSelector } from 'react-redux';

// components
import AppHelmet from 'components/AppHelmet/AppHelmet';
import AppInitializer from 'components/AppInitializer/AppInitializer';
// import ErrorPage from 'pages/ErrorPage/ErrorPage';
// import { Notification, Snackbar } from 'components';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// core
import Routing from 'core/Routing/Routing';

// others
import { className, classNames } from './classNames';

// store
import {
  isAppLoadedSelector,
  isPendingSelector,
} from 'store/appInitializer/selectors';

// styles
import styles from './app.scss';

const App: FC = () => {
  const isAppLoaded = useSelector(isAppLoadedSelector);
  const isPending = useSelector(isPendingSelector);

  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  // if (!isAppLoaded && isPending) {
  //   return (
  //     <main className={cx(classNamesWithTheme[className])}>
  //       <AppInitializer />
  //     </main>
  //   );
  // }

  // if (!isAppLoaded && !isPending) {
  //   return <Router>{/* <ErrorPage /> */}</Router>;
  // }

  return (
    <main className={cx(classNamesWithTheme[className])}>
      <AppHelmet />
      <Router>
        <Routing />
      </Router>
      {/* <Notification />
      <Snackbar /> */}
    </main>
  );
};

export default App;
