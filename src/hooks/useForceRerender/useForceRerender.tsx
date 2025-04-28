import { useEffect, useState } from 'react';

export type TUseForceRerender = void;

export const useForceRerender = (
  dependencies: Array<any>,
): TUseForceRerender => {
  const [renderState, setRenderState] = useState(false);

  useEffect(() => {
    setRenderState(!renderState);
  }, [...dependencies]);
};
