import { FC } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';

// styles
import styles from './app.scss';
import { H1 } from 'shared/UI/components/Typography';
import { TypographyColor } from 'types/enums/scss/typographyColor';

const App: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return <H1 color={TypographyColor.blue1}>H1</H1>;
};

export default App;
