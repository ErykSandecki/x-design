import { FC, useContext, useEffect } from 'react';

// core
import { Context } from 'core/ContextProvider/ContextProvider';

// hooks
import { useDispatchMany } from 'hooks/useDispatchMany/useDispatchMany';

// others
import { APPLICATION_NAME } from 'constant/constants';
import { className, classNames } from './classNames';

// store
import { appInit, initLanguage } from 'store/appInitializer/actions';

// styles
import styles from './styles/app-initializer.scss';

// types
import { Theme } from 'types/enums';

const AppInitializer: FC = () => {
  const { theme } = useContext(Context);
  const dispatchMany = useDispatchMany();
  const isDarkMode = theme === Theme.dark;

  useEffect(() => {
    dispatchMany(appInit(), initLanguage());
  }, []);

  return <div className={styles[classNames[className]]}></div>;
};

export default AppInitializer;
