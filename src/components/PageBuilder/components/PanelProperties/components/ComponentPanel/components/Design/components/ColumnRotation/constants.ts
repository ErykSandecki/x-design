import { Dispatch } from 'redux';
import { noop } from 'lodash';

// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// store
import { rotateElements } from 'store/pageBuilder/actions';

// types
import { TButtonGroup } from 'shared/UITools/components/ButtonGroup/types';
import { TElement } from 'types';

// utils
import { normalizeAngle } from 'utils';

export const translationNameSpace = `${parentNameSpace}.columnRotation`;

export const OPTIONS_BUTTONS = (
  angle: TElement['angle'],
  dispatch: Dispatch,
): Array<TButtonGroup> => [
  {
    name: 'ToggleRotate',
    onClick: () => dispatch(rotateElements(normalizeAngle(angle + 90))),
  },
  { name: 'FlipHorizontal', onClick: noop },
  { name: 'FlipVertical', onClick: noop },
];
