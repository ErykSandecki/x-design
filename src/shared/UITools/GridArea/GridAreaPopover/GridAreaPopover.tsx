import { FC, RefObject } from 'react';

// components
import CellsInput, { TCellsInputProps } from './CellsInput/CellsInput';
import GridInputs, { TGridInputsProps } from './GridInputs/GridInputs';
import Popover, { PopoverCompound, TPopoverProps } from '../../Popover/Popover';

// types
import { AlignPopoverHorizontally, AlignPopoverVertically } from '../../Popover/enums';

export type TGridAreaPopoverProps = Pick<TCellsInputProps, 'onClickCell'> &
  Pick<TPopoverProps, 'id'> &
  Pick<TGridInputsProps, 'onBlurColumns' | 'onBlurRows' | 'onChangeColumns' | 'onChangeRows'> & {
    columns: string;
    ref: RefObject<HTMLDivElement>;
    rows: string;
    selected: boolean;
    setSelected: TFunc<[boolean]>;
  };

export const GridAreaPopover: FC<TGridAreaPopoverProps> = ({
  columns,
  id,
  onClickCell,
  ref,
  rows,
  selected,
  setSelected,
  ...restProps
}) => (
  <Popover
    alignHorizontally={AlignPopoverHorizontally.left}
    alignVertically={AlignPopoverVertically.top}
    backgroundColor="neutral5"
    e2eValue="popover"
    id={id}
    offset={{ x: 12.5, y: 48.5 }}
    refItem={ref}
    selected={selected}
    style={{ height: '180px', width: '210px' }}
  >
    <PopoverCompound.PopoverRoot selected={selected} setSelected={setSelected}>
      <GridInputs columns={columns} rows={rows} {...restProps} />
      <CellsInput columns={columns} onClickCell={onClickCell} rows={rows} />
    </PopoverCompound.PopoverRoot>
  </Popover>
);

export default GridAreaPopover;
