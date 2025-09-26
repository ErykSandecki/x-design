import { useEffect, useLayoutEffect, useState } from 'react';

export type TUseWindowSize = {
  innerHeight: number;
  innerWidth: number;
};

export const useWindowSize = (): TUseWindowSize => {
  const [size, setSize] = useState({ innerHeight: 0, innerWidth: 0 });

  const updateSize = (): void => {
    setSize({ innerHeight: window.innerHeight, innerWidth: window.innerWidth });
  };

  useEffect(() => {
    updateSize();
  }, []);

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize);

    return (): void => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
};
