import { FC, useState } from 'react';

// compoentn
import { INITIAL_COORDINATES, ZoomBox } from 'shared';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';
// styles
import styles from './app.scss';

const App: FC = () => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const [visible, setVisivle] = useState(false);
  const [coordinates, setCoordinates] = useState(INITIAL_COORDINATES);

  return (
    <ZoomBox
      coordinates={coordinates}
      setCoordinates={setCoordinates}
    ></ZoomBox>
  );
};

export default App;
