import { FC } from 'react';

// components
import AlignmentOption from './AlignmentOption/AlignmentOption';
import Box from '../../UI/Box/Box';

// hooks
import { useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './alignment-area.scss';

// types
import { AlignmentFlow, E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

// utils
import { enumToArray } from 'utils';

export type TAlignmentAreaProps = {
  e2eValue?: TE2EDataAttributeProps['value'];
  fullWidth?: boolean;
  onClick: TFunc<[AlignmentFlow]>;
  value: AlignmentFlow;
};

export const AlignmentArea: FC<TAlignmentAreaProps> = ({ e2eValue = '', fullWidth = false, onClick, value }) => {
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.fullWidth,
          fullWidth,
        ]),
      }}
      e2eAttribute={E2EAttribute.alignmentArea}
      e2eValue={e2eValue}
    >
      {enumToArray<AlignmentFlow>(AlignmentFlow).map((alignmentFlow) => (
        <AlignmentOption
          alignmentFlow={alignmentFlow}
          isSelected={value === alignmentFlow}
          key={alignmentFlow}
          onClick={onClick}
        />
      ))}
    </Box>
  );
};

export default AlignmentArea;
