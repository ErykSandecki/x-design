import cx from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Tooltip from '../../../UI/Tooltip/Tooltip';

// others
import { OPTION_VIEW_MODIFICATORS } from './constants';
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// styles
import styles from './alignment-option.scss';

// types
import { AlignmentLayout, E2EAttribute } from 'types';

export type TAlignmentOptionProps = {
  alignmentFlow: AlignmentLayout;
  isSelected: boolean;
  onClick: TFunc<[AlignmentLayout]>;
};

export const AlignmentOption: FC<TAlignmentOptionProps> = ({ alignmentFlow, isSelected, onClick }) => {
  const { t } = useTranslation();

  return (
    <Tooltip
      content={t(`${TOOLTIP_TRANSLATION_KEY}.alignmentFlow.${alignmentFlow}`)}
      e2eAttribute={E2EAttribute.alignmentAreaOption}
      e2eValue={alignmentFlow}
      key={alignmentFlow}
    >
      <div
        className={cx(styles.AlignmentOption, {
          [styles['AlignmentOption--selected']]: isSelected,
        })}
        onClick={() => onClick(alignmentFlow)}
      >
        <div className={cx(styles['AlignmentOption__option-view'], styles[OPTION_VIEW_MODIFICATORS[alignmentFlow]])}>
          {Array.from(Array(3), (_, index) => (
            <div
              className={cx(styles.AlignmentOption__indicator, {
                [styles['AlignmentOption__indicator--selected']]: isSelected,
              })}
              key={index}
            />
          ))}
        </div>
      </div>
    </Tooltip>
  );
};

export default AlignmentOption;
