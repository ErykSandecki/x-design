import { FC, useEffect, useState } from 'react';

// components
import Main from './components/Main/Main';

import Toolbar from './components/Toolbar/Toolbar';

// types
import { MouseMode } from './enums';

export type TProps = {};

const HTMLEditor: FC<TProps> = () => {
  const [mouseMode, setMouseMode] = useState(MouseMode.default);
  const isLoading = false;

  useEffect(() => {}, []);

  return (
    <div>
      <Toolbar />
      <Main />
    </div>
  );
};

export default HTMLEditor;
