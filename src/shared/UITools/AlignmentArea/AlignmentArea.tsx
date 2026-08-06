import cx from 'classnames';
import { FC } from 'react';

// components
import AlignmentOption from './AlignmentOption/AlignmentOption';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// styles
import styles from './alignment-area.module.scss';

// types
import { AlignmentLayout, E2EAttribute } from 'types';

// utils
import { enumToArray } from 'utils';

export type TAlignmentAreaProps = {
  e2eValue?: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
  onClick: TFunc<[AlignmentLayout]>;
  value: AlignmentLayout;
};

export const AlignmentArea: FC<TAlignmentAreaProps> = ({ e2eValue = '', fullWidth = false, onClick, value }) => {
  return (
    <E2EDataAttribute type={E2EAttribute.alignmentArea} value={e2eValue}>
      <div
        className={cx(styles.AlignmentArea, {
          [styles['AlignmentArea--full-width']]: fullWidth,
        })}
      >
        {enumToArray<AlignmentLayout>(AlignmentLayout)
          .filter((alignmentFlow) => alignmentFlow !== AlignmentLayout.none)
          .map((alignmentFlow) => (
            <AlignmentOption
              alignmentFlow={alignmentFlow}
              isSelected={value === alignmentFlow}
              key={alignmentFlow}
              onClick={onClick}
            />
          ))}
      </div>
    </E2EDataAttribute>
  );
};

export default AlignmentArea;
