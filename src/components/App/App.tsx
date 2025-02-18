import { FC, useState } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
// styles
import styles from './app.scss';

const App: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const [visible, setVisivle] = useState(false);

  return <></>;
};

export default App;
