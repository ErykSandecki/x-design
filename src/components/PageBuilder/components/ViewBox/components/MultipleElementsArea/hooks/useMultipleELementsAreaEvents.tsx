import { useState } from 'react';
import { useSelector } from 'react-redux';

// core
import { useRefs } from 'pages/PageBuilderPage/core/RefsProvider';

// hooks
import { useHandleUpdateCoordinates } from './useHandleUpdateCoordinates';

// others
import { INITIAL_COORDINATES_DATA } from '../constants';

// store
import { areParentsTheSameSelector, eventSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TCoordinatesData } from '../types';

export type TUseMultipleELementsAreaEvents = {
  coordinatesData: TCoordinatesData;
  showCorners: boolean;
};

export const useMultipleELementsAreaEvents = (): TUseMultipleELementsAreaEvents => {
  const { overlayContainerRef } = useRefs();
  const areParentsTheSame = useSelector(areParentsTheSameSelector);
  const isMultipleMoving = useSelector(eventSelectorCreator('isMultipleMoving')) as boolean;
  const showCorners = overlayContainerRef.current && areParentsTheSame && !isMultipleMoving;
  const [coordinatesData, setCoordinatesData] = useState(INITIAL_COORDINATES_DATA);

  useHandleUpdateCoordinates(isMultipleMoving, setCoordinatesData);

  return { coordinatesData, showCorners };
};
