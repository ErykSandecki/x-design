import { useDispatch } from 'react-redux';

// store
import { setElementCoordinates } from 'store/pageBuilder/actions';

// types
import { TElement } from 'types';

export type TUseOnChangeEvent = {
  onChangeX: (value: string, withUpdateStore?: boolean) => void;
  onChangeY: (value: string, withUpdateStore?: boolean) => void;
};

export const useOnChangeEvent = (
  element: TElement,
  setX: (value: string) => void,
  setY: (value: string) => void,
  x: string,
  y: string,
): TUseOnChangeEvent => {
  const dispatch = useDispatch();
  const { id } = element;

  const updateStore = (
    x: number,
    y: number,
    withUpdateStore: boolean,
  ): void => {
    if (withUpdateStore) {
      dispatch(setElementCoordinates({ x, y }, id));
    }
  };

  const handleChangeX = (value: string, withUpdateStore: boolean): void => {
    setX(value);
    updateStore(parseFloat(value), parseFloat(y), withUpdateStore);
  };
  const handleChangeY = (value: string, withUpdateStore: boolean): void => {
    setY(value);
    updateStore(parseFloat(x), parseFloat(value), withUpdateStore);
  };

  return {
    onChangeX: handleChangeX,
    onChangeY: handleChangeY,
  };
};
