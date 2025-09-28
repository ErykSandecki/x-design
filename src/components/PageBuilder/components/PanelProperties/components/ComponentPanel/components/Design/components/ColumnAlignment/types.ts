// types
import { AlignmentHorizontal, AlignmentVertical } from 'types';
import { TButtonGroup } from 'shared/UITools/components/ButtonGroup/types';

export type TAligmentHorizontalButtonGroup = Array<Pick<TButtonGroup, 'name'> & { key: AlignmentHorizontal }>;
export type TAligmentVerticalButtonGoup = Array<Pick<TButtonGroup, 'name'> & { key: AlignmentVertical }>;
