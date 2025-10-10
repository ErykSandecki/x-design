import { ReactNode } from 'react';

// components
import { TE2EValue, UITools } from 'shared';

// types
import { TAligmentHorizontalButtonGroup, TAligmentVerticalButtonGoup } from './types';
import { TButtonGroup } from 'shared/UITools/ButtonGroup/types';

export type TColumnAlignmentButtonsGroupProps<K, T extends TFunc<[K]>> = {
  buttonGroups: TAligmentHorizontalButtonGroup | TAligmentVerticalButtonGoup;
  disabled: boolean;
  e2eValue: TE2EValue;
  onClick: T;
};

const ColumnAlignmentButtonsGroup = <K, T extends TFunc<[K]>>({
  buttonGroups,
  disabled,
  e2eValue,
  onClick,
}: TColumnAlignmentButtonsGroupProps<K, T>): ReactNode => (
  <UITools.ButtonGroup
    buttons={buttonGroups.map(
      ({ key, name, tooltip }) =>
        ({
          disabled,
          name,
          onClick: () => onClick(key as K),
          tooltip,
        }) as TButtonGroup,
    )}
    e2eValue={e2eValue}
  />
);

export default ColumnAlignmentButtonsGroup;
