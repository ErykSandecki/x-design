import cx from 'classnames';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Tooltip from '../../../UI/Tooltip/Tooltip';

// others
import { TOOLTIP_TRANSLATION_KEY } from 'constant/constants';

// styles
import styles from './alignment-option.scss';

// types
import { AlignmentLayout, E2EAttribute } from 'types';

const optionViewModificators: Record<string, string> = {
  bottomCenter: 'AlignmentOption__option-view--bottom-center',
  bottomLeft: 'AlignmentOption__option-view--bottomLeft',
  bottomRight: 'AlignmentOption__option-view--bottom-right',
  center: 'AlignmentOption__option-view--center',
  left: 'AlignmentOption__option-view--left',
  none: 'AlignmentOption__option-view--none',
  right: 'AlignmentOption__option-view--right',
  topCenter: 'AlignmentOption__option-view--top-center',
  topLeft: 'AlignmentOption__option-view--topLeft',
  topRight: 'AlignmentOption__option-view--top-right',
};

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
        <div className={cx(styles['AlignmentOption__option-view'], styles[optionViewModificators[alignmentFlow]])}>
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
