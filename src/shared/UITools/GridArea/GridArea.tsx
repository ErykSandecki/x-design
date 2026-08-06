import cx from 'classnames';
import { FC, useRef } from 'react';
import { noop } from 'lodash';

// components
import Cells, { TCellsProps } from './Cells/Cells';
import E2EDataAttribute, { TE2EDataAttributeProps } from '../../E2EDataAttributes/E2EDataAttribute';
import GridAreaPopover, { TGridAreaPopoverProps } from './GridAreaPopover/GridAreaPopover';

// hooks
import { useOutsideClick } from 'hooks';

// styles
import styles from './grid-area.scss';

// types
import { E2EAttribute } from 'types';

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
    <E2EDataAttribute type={E2EAttribute.gridArea} value={e2eValue}>
      <div
        className={cx(styles.GridArea, {
          [styles['GridArea--full-width']]: fullWidth,
        })}
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
      </div>
    </E2EDataAttribute>
  );
};

export default GridArea;
