import cx from 'classnames';
import { JSX, useCallback } from 'react';

// components
import Icon from '../../Icon/Icon';

// others
import { ICON_MODIFICATORS } from '../constants';

// types
import { InputSize } from '../../enums';
import { TButtonIconArgs } from '../types';
import { TObject } from 'types';

export type TUseIcon = (data: TButtonIconArgs) => JSX.Element;

export const useIcon = (styles: TObject<string>, size: InputSize): TUseIcon =>
  useCallback(
    ({ name, placement }: TButtonIconArgs): JSX.Element => (
      <Icon
        classes={{
          className: cx(styles.Button__icon, styles[ICON_MODIFICATORS[placement]], styles[ICON_MODIFICATORS[size]]),
        }}
        name={name}
      />
    ),
    [],
  );
