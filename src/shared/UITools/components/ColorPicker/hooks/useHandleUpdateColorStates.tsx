import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';

export type TUseHandleUpdateColorStates = void;

export const useHandleUpdateColorStates = (
  alpha: string,
  color: string,
  setAlphaValue: TFunc<[string]>,
  setColorValue: TFunc<[string]>,
): TUseHandleUpdateColorStates => {
  const updateStates = useCallback(
    debounce((alpha: string, color: string) => {
      setAlphaValue(alpha);
      setColorValue(color.substring(1));
    }),
    [],
  );

  useEffect(() => {
    updateStates(alpha, color);
  }, [alpha, color]);
};
