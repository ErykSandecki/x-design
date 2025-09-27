import { Dispatch } from 'redux';

// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// store
import { flipElements, rotateElements } from 'store/pageBuilder/actions';

// types
import { TButtonGroup } from 'shared/UITools/components/ButtonGroup/types';
import { TElement } from 'types';

// utils
import { normalizeAngle } from 'utils';

export const translationNameSpace = `${parentNameSpace}.columnRotation`;

export const OPTIONS_BUTTONS = (angle: TElement['angle'], dispatch: Dispatch): Array<TButtonGroup> => [
  {
    name: 'ToggleRotate',
    onClick: () => dispatch(rotateElements(normalizeAngle(angle + 90))),
  },
  { name: 'FlipHorizontal', onClick: () => dispatch(flipElements('x')) },
  { name: 'FlipVertical', onClick: () => dispatch(flipElements('y')) },
];
