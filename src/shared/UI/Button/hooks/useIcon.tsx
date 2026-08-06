import cx from 'classnames';
import { JSX, useCallback } from 'react';

// components
import Icon from '../../Icon/Icon';

// others

// types
import { InputSize } from '../../enums';
import { TButtonIconArgs } from '../types';
import { TObject } from 'types';

const iconModificators: Record<string, string> = {
  end: 'Button__icon--end',
  large: 'Button__icon--large',
  medium: 'Button__icon--medium',
  small: 'Button__icon--small',
  start: 'Button__icon--start',
};

export type TUseIcon = (data: TButtonIconArgs) => JSX.Element;

export const useIcon = (styles: TObject<string>, size: InputSize): TUseIcon =>
  useCallback(
    ({ name, placement }: TButtonIconArgs): JSX.Element => (
      <Icon
        classes={{
          className: cx(styles.Button__icon, styles[iconModificators[placement]], styles[iconModificators[size]]),
        }}
        name={name}
      />
    ),
    [],
  );
