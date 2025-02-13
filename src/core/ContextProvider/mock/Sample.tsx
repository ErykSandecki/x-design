import { useContext } from 'react';

// core
import { Context } from '../ContextProvider';

// types
import { Theme } from 'types/enums/theme';

export const Sample1 = () => {
  const { theme, setTheme } = useContext(Context);

  return (
    <div>
      {theme}
      <button onClick={() => setTheme(Theme.dark)}>Click</button>
    </div>
  );
};

export const Sample2 = () => {
  const { scrollLock, setScrollLock } = useContext(Context);

  return (
    <div>
      {`${scrollLock}`}
      <button onClick={() => setScrollLock(true)}>Click</button>
    </div>
  );
};
