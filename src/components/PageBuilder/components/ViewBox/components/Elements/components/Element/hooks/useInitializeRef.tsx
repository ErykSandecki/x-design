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
    itemsRefs[id] = elementRef.current;

    return (): void => {
      delete itemsRefs?.[id];
    };
  }, [elementRef]);
};
