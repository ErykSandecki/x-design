import { RefObject, useEffect } from 'react';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// types
import { TSelectedElement } from 'store/pageBuilder/types';

export type TUseInitializeRef = void;

export const useInitializeRef = (
  elementRef: RefObject<any>,
  id: TSelectedElement['id'],
): TUseInitializeRef => {
  const sharedRefs = useRefs();

  useEffect(() => {
    if (elementRef.current) {
      sharedRefs[id] = elementRef.current;
    }

    return () => {
      delete sharedRefs[id];
    };
  }, [elementRef]);
};
