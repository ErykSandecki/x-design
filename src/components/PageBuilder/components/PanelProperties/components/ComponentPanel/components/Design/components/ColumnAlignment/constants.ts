// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';

export const translationNameSpace = `${parentNameSpace}.columnAlignment`;

export const HORIZONTAL_BUTTONS = [
  { key: AlignmentHorizontal.left, name: 'AlignHorizontalLeft' },
  { key: AlignmentHorizontal.center, name: 'AlignHorizontalCenter' },
  { key: AlignmentHorizontal.right, name: 'AlignHorizontalRight' },
];

export const VERTICAL_BUTTONS = [
  { key: AlignmentVertical.top, name: 'AlignVerticalTop' },
  { key: AlignmentVertical.center, name: 'AlignVerticalCenter' },
  { key: AlignmentVertical.bottom, name: 'AlignVerticalBottom' },
];
