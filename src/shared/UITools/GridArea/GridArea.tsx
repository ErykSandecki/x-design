import cx from 'classnames';
import { FC, useRef } from 'react';
import { noop } from 'lodash';

// components
import Box from '../../UI/Box/Box';
import Cells, { TCellsProps } from './Cells/Cells';
import GridAreaPopover, { TGridAreaPopoverProps } from './GridAreaPopover/GridAreaPopover';

// hooks
import { useOutsideClick } from 'hooks';

// others

// styles
import styles from './grid-area.scss';

// types
import { E2EAttribute } from 'types';
import { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';

export type TGridAreaProps = TCellsProps &
  Pick<TGridAreaPopoverProps, 'onBlurColumns' | 'onBlurRows' | 'onChangeColumns' | 'onChangeRows' | 'onClickCell'> & {
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

  return (
    <Box
      classes={{
        className: cx('GridArea', styles.GridArea, {
          [styles['GridArea--full-width']]: fullWidth,
        }),
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
