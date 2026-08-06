import cx from 'classnames';
import { FC } from 'react';

// styles
import styles from './constrains-view.scss';

// types
import { Constrain } from '../../enums';
import { TAlignment } from 'types';

// utils
import { enumToArray } from 'utils';

const horizontalModificators: Record<string, string> = {
  center: 'ConstrainsView__horizontal--center',
  left: 'ConstrainsView__horizontal--left',
  right: 'ConstrainsView__horizontal--right',
};

const verticalModificators: Record<string, string> = {
  bottom: 'ConstrainsView__vertical--bottom',
  center: 'ConstrainsView__vertical--center',
  top: 'ConstrainsView__vertical--top',
};

const constrainModificators: Record<string, string> = {
  bottom: 'ConstrainsView__constrain--bottom',
  centerHorizontal: 'ConstrainsView__constrain--center-horizontal',
  centerVertical: 'ConstrainsView__constrain--center-vertical',
  left: 'ConstrainsView__constrain--left',
  right: 'ConstrainsView__constrain--right',
  top: 'ConstrainsView__constrain--top',
};

export type TConstrainsViewProps = {
  alignment: TAlignment;
  selected?: boolean;
};

export const ConstrainsView: FC<TConstrainsViewProps> = ({ alignment, selected }) => {
  return (
    <div
      className={cx(styles.ConstrainsView, {
        [styles['ConstrainsView--selected']]: selected,
        [styles[horizontalModificators[alignment?.horizontal]]]: !!alignment?.horizontal,
        [styles[verticalModificators[alignment?.vertical]]]: !!alignment?.vertical,
      })}
    >
      {enumToArray(Constrain).map((key) => (
        <div
          className={cx(
            styles.ConstrainsView__constrain,
            styles[constrainModificators[Constrain[key as keyof typeof Constrain]]],
          )}
          key={key as string}
        />
      ))}
    </div>
  );
};

export default ConstrainsView;
