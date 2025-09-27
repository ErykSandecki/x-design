import { FC } from 'react';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './constrains-view.scss';

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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <div
      className={cx(
        classNamesWithTheme[className].name,
        [classNamesWithTheme[className].modificators.selected, selected],
        [classNamesWithTheme.horizontal.modificators[alignment?.horizontal], !!alignment?.horizontal],
        [classNamesWithTheme.vertical.modificators[alignment?.vertical], !!alignment?.vertical],
      )}
    >
      {enumToArray(Constrain).map((key) => (
        <div
          className={cx(
            classNamesWithTheme.constrain.name,
            classNamesWithTheme.constrain.modificators[Constrain[key as keyof typeof Constrain]],
          )}
          key={key as string}
        />
      ))}
    </div>
  );
};

export default ConstrainsView;
