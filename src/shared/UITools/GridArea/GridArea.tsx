import { FC, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box from '../../UI/Box/Box';
import Cells, { TCellsProps } from './Cells/Cells';
import GridAreaPopover, { TGridAreaPopoverProps } from './GridAreaPopover/GridAreaPopover';

// hooks
import { useOutsideClick, useTheme } from 'hooks';

// others
import { className, classNames } from './classNames';

// styles
import styles from './grid-area.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TGridAreaProps = TCellsProps &
  Pick<TGridAreaPopoverProps, 'onBlurColumns' | 'onBlurRows' | 'onChangeColumns' | 'onChangeRows'> & {
    e2eValue?: TE2EDataAttributeProps['value'];
    fullWidth?: boolean;
    idContainer?: string;
  };

export const GridArea: FC<TGridAreaProps> = ({
  columns,
  e2eValue = '',
  fullWidth = false,
  idContainer,
  rows,
  ...restProps
}) => {
  const ref = useRef(null);
  const { selected, setSelected } = useOutsideClick([], ref, noop, idContainer);
  const { classNamesWithTheme, cx } = useTheme(classNames, styles);

  return (
    <Box
      classes={{
        className: cx(className, classNamesWithTheme[className].name, [
          classNamesWithTheme[className].modificators.fullWidth,
          fullWidth,
        ]),
      }}
      e2eAttribute={E2EAttribute.gridArea}
      e2eValue={e2eValue}
      onClick={() => setSelected(true)}
      ref={ref}
    >
      <Cells columns={columns} rows={rows} />
      <GridAreaPopover
        columns={columns}
        ref={ref}
        rows={rows}
        selected={selected}
        setSelected={setSelected}
        {...restProps}
      />
    </Box>
  );
};

export default GridArea;
