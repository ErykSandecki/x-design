import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

// hooks
import { useOnBlurEvent } from './useOnBlurEvent';
import { useOnChangeEvent } from './useOnChangeEvent';

// store
import { mainParentIdSelectorCreator } from 'store/pageBuilder/selectors';

// types
import { TElement } from 'types';

// utils
import { getCoordinates } from '../utils/getCoordinates';

type TUsePositionEvents = {
  onBlurX: () => void;
  onBlurY: () => void;
  onChangeX: (value: string, withUpdateStore?: boolean) => void;
  onChangeY: (value: string, withUpdateStore?: boolean) => void;
  x: string;
  y: string;
};

export const usePositionEvents = (element: TElement): TUsePositionEvents => {
  const { alignment, coordinates, parentId, position } = element;
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const mainParentId = useSelector(mainParentIdSelectorCreator(parentId));
  const onBlurEvents = useOnBlurEvent(element, setX, setY, x, y);
  const onChangeEvents = useOnChangeEvent(element, setX, setY, x, y);

  useEffect(() => {
    const { x, y } = getCoordinates(element, mainParentId);

    setX(x.toString());
    setY(y.toString());
  }, [alignment, coordinates, parentId, position]);

  return {
    ...onBlurEvents,
    ...onChangeEvents,
    x,
    y,
  };
};
