// others
import { translationNameSpace as parentNameSpace } from '../../constants';

// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';
import { TAligmentHorizontalButtonGroup, TAligmentVerticalButtonGoup } from './types';

export const HORIZONTAL_BUTTONS: TAligmentHorizontalButtonGroup = [
  { key: AlignmentHorizontal.left, name: 'AlignHorizontalLeft' },
  { key: AlignmentHorizontal.center, name: 'AlignHorizontalCenter' },
  { key: AlignmentHorizontal.right, name: 'AlignHorizontalRight' },
];

export const VERTICAL_BUTTONS: TAligmentVerticalButtonGoup = [
  { key: AlignmentVertical.top, name: 'AlignVerticalTop' },
  { key: AlignmentVertical.center, name: 'AlignVerticalCenter' },
  { key: AlignmentVertical.bottom, name: 'AlignVerticalBottom' },
];

export const translationNameSpace = `${parentNameSpace}.columnAlignment`;
