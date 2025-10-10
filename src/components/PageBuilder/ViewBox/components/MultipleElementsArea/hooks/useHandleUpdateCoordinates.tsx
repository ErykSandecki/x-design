import { defer, first } from 'lodash';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// store
import { elementAttributeSelectorCreator, selectedElementsSelector } from 'store/pageBuilder/selectors';

// types
import { TCoordinatesData } from '../types';

// utils
import { getCoordinatesData } from '../utils/getCoordinatesData';

export type TUseHandleUpdateCoordinates = void;

export const useHandleUpdateCoordinates = (
  isMultipleMoving: boolean,
  setCoordinatesData: TFunc<[TCoordinatesData]>,
): TUseHandleUpdateCoordinates => {
  const selectedElements = useSelector(selectedElementsSelector);
  const firstElement = first(selectedElements);
  const angle = useSelector(elementAttributeSelectorCreator('angle', firstElement?.id));
  const { itemsRefs, zoomContentRef } = useRefs();

  useEffect(() => {
    defer(() => {
      const coordinates = getCoordinatesData(isMultipleMoving, itemsRefs, selectedElements, zoomContentRef);

      setCoordinatesData(coordinates);
    });
  }, [angle, isMultipleMoving, selectedElements]);
};
