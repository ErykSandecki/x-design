import cx from 'classnames';
import { JSX, useCallback } from 'react';

// components
import Icon from '../../Icon/Icon';

// others
import { classNames } from '../classNames';

// types
import { InputSize } from '../../../enums';
import { TButtonIconArgs } from '../types';
import { TObject } from '../../../../../types';

export type TUseIcon = (data: TButtonIconArgs) => JSX.Element;

export const useIcon = (size: InputSize, styles: TObject<string>): TUseIcon =>
  useCallback(
    ({ placement, src: { name } }: TButtonIconArgs): JSX.Element => (
      <Icon
        classes={{
          className: cx(
            styles[classNames.icon.name],
            styles[classNames.icon.modificators[placement]],
            styles[classNames.icon.modificators[size]],
          ),
        }}
        name={name}
      />
    ),
    [],
  );
