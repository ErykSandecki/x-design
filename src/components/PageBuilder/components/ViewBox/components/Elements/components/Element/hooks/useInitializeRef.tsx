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
  const { itemsRefs } = useRefs();

  useEffect(() => {
    if (elementRef.current) {
      itemsRefs[id] = elementRef.current;
    }

    return () => {
      delete itemsRefs[id];
    };
  }, [elementRef]);
};
