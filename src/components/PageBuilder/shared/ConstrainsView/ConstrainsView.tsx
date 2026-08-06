import cx from 'classnames';
import { FC } from 'react';

// others
import { CONSTRAIN_MODIFICATORS, HORIZONTAL_MODIFICATORS, VERTICAL_MODIFICATORS } from './constants';

// styles
import styles from './constrains-view.module.scss';

// types
import { Constrain } from '../../enums';
import { TAlignment } from 'types';

// utils
import { enumToArray } from 'utils';

export type TConstrainsViewProps = {
  alignment: TAlignment;
  selected?: boolean;
};

export const ConstrainsView: FC<TConstrainsViewProps> = ({ alignment, selected }) => {
  return (
    <div
      className={cx(styles.ConstrainsView, {
        [styles['ConstrainsView--selected']]: selected,
        [styles[HORIZONTAL_MODIFICATORS[alignment?.horizontal]]]: !!alignment?.horizontal,
        [styles[VERTICAL_MODIFICATORS[alignment?.vertical]]]: !!alignment?.vertical,
      })}
    >
      {enumToArray(Constrain).map((key) => (
        <div
          className={cx(
            styles.ConstrainsView__constrain,
            styles[CONSTRAIN_MODIFICATORS[Constrain[key as keyof typeof Constrain]]],
          )}
          key={key as string}
        />
      ))}
    </div>
  );
};

export default ConstrainsView;
