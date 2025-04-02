import cx from 'classnames';
import { useCallback } from 'react';

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
    ({
      placement,
      src: { applyFill, applyStroke, iconComponent, iconName },
    }: TButtonIconArgs): JSX.Element => (
      <Icon
        className={cx(
          styles[classNames.icon.name],
          {
            [styles[classNames.icon.modificators.applyFill]]: applyFill,
          },
          {
            [styles[classNames.icon.modificators.applyStroke]]: applyStroke,
          },
          styles[classNames.icon.modificators[placement]],
          styles[classNames.icon.modificators[size]],
        )}
        iconComponent={iconComponent}
        iconName={iconName}
        ignoreDefaultStyles
      />
    ),
    [],
  );
