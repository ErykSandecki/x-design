import { FC } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';

// styles
import styles from './app.scss';

const App: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return <div>App</div>;
};

export default App;
