// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';
import { TButtonGroup } from 'shared/UITools/ButtonGroup/types';

export type TAligmentHorizontalButtonGroup = Array<
  Pick<TButtonGroup, 'name' | 'tooltip'> & { key: AlignmentHorizontal }
>;
export type TAligmentVerticalButtonGoup = Array<Pick<TButtonGroup, 'name' | 'tooltip'> & { key: AlignmentVertical }>;
