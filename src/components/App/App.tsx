import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

// components
import PageBuilderPage from 'pages/PageBuilderPage/PageBuilderPage';

// hooks
import { useDispatchMany } from 'hooks';

// store
import { appInit, initLanguage } from 'store/appInitializer/actions';
import {
  isAppLoadedSelector,
  isPendingSelector,
} from 'store/appInitializer/selectors';

const App: FC = () => {
  const dispatchMany = useDispatchMany();
  const isAppLoaded = useSelector(isAppLoadedSelector);
  const isPending = useSelector(isPendingSelector);

  useEffect(() => {
    dispatchMany(appInit(), initLanguage());
  }, []);

  if (!isAppLoaded && isPending) {
    return <main>Init</main>;
  }

  if (!isAppLoaded && !isPending) {
    return <main>Error</main>;
  }

  return <PageBuilderPage />;
};

export default App;
