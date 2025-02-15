import { FC, useState } from 'react';

// hooks
import { useTheme } from 'hooks/useTheme/useTheme';

// others
import { className, classNames } from './classNames';

// styles
import styles from './app.scss';
import { H1 } from 'shared/UI/components/Typography';
import { ColorsTheme } from 'types';
import Typography from 'shared/UI/components/Typography/Typography';
import { TypographyVariant } from 'shared/UI/components/Typography/enums';

const App: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const [visible, setVisivle] = useState(false);

  return (
    <>
      <H1 color={ColorsTheme.blue1} classes={{ className: 'sasd' }}>
        dasds
      </H1>
      <Typography variantMapping={{ h1: 'a' }} variant={TypographyVariant.h1}>
        czxzxc
      </Typography>
      <button onClick={() => setVisivle(!visible)}>
        {visible ? 'visible' : 'not'}
      </button>
    </>
  );
};

export default App;
