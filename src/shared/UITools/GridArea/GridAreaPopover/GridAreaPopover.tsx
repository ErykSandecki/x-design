import { FC, RefObject } from 'react';

// components
import GridInputs, { TGridInputsProps } from './GridInputs/GridInputs';
import Popover, { PopoverCompound, TPopoverProps } from '../../Popover/Popover';

// types
import { AlignPopoverHorizontally, AlignPopoverVertically } from '../../Popover/enums';

export type TGridAreaPopoverProps = Pick<TPopoverProps, 'id'> &
  Pick<TGridInputsProps, 'onBlurColumns' | 'onBlurRows' | 'onChangeColumns' | 'onChangeRows'> & {
    columns: string;
    ref: RefObject<HTMLDivElement>;
    rows: string;
    selected: boolean;
    setSelected: TFunc<[boolean]>;
  };

export const GridAreaPopover: FC<TGridAreaPopoverProps> = ({ id, ref, selected, setSelected, ...restProps }) => (
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
      <GridInputs {...restProps} />
    </PopoverCompound.PopoverRoot>
  </Popover>
);

export default GridAreaPopover;
