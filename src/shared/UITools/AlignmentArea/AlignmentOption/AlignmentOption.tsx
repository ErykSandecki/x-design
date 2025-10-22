import { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Box from '../../../UI/Box/Box';
import Tooltip from '../../../UI/Tooltip/Tooltip';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

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
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);
  const { t } = useTranslation();

  return (
    <Tooltip
      content={t(`tooltip.alignmentFlow.${alignmentFlow}`)}
      e2eAttribute={E2EAttribute.alignmentAreaOption}
      e2eValue={alignmentFlow}
      key={alignmentFlow}
    >
      <Box
        classes={{
          className: cx(classNamesWithTheme[className].name, [
            classNamesWithTheme[className].modificators.selected,
            isSelected,
          ]),
        }}
        onClick={() => onClick(alignmentFlow)}
      >
        <Box
          classes={{
            className: cx(
              classNamesWithTheme.optionView.name,
              classNamesWithTheme.optionView.modificators[alignmentFlow],
            ),
          }}
        >
          {Array.from(Array(3), (_, index) => (
            <Box
              classes={{
                className: cx(classNamesWithTheme.indicator.name, [
                  classNamesWithTheme.indicator.modificators.selected,
                  isSelected,
                ]),
              }}
              key={index}
            />
          ))}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default AlignmentOption;
