import { JSX, useCallback } from 'react';

// components
import Icon from '../../Icon/Icon';

// others
import { classNames } from '../classNames';

// types
import { InputSize } from '../../../enums';
import { TButtonIconArgs } from '../types';
import {
  TThemeClassNames,
  TThemeClassNamesApplier,
} from 'hooks/useTheme/types';

export type TUseIcon = (data: TButtonIconArgs) => JSX.Element;

export const useIcon = (
  classNamesWithTheme: TThemeClassNames<typeof classNames>,
  cx: TThemeClassNamesApplier,
  size: InputSize,
): TUseIcon =>
  useCallback(
    ({ placement, src: { name } }: TButtonIconArgs): JSX.Element => (
      <Icon
        classes={{
          className: cx(
            classNamesWithTheme.icon.name,
            classNamesWithTheme.icon.modificators[placement],
            classNamesWithTheme.icon.modificators[size],
          ),
        }}
        name={name}
      />
    ),
    [],
  );
