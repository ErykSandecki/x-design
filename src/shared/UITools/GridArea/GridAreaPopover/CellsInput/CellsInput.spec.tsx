import { fireEvent } from '@testing-library/react';
import { noop } from 'lodash';

// components
import CellsInput from './CellsInput';
import { PopoverCompound } from '../../../Popover/Popover';

// types
import { E2EAttribute } from 'types';

// utils
import { customRender, getByE2EAttribute } from 'test';

describe('CellsInput snapshots', () => {
  it('should render CellsInput', () => {
    // before
    const { asFragment } = customRender(
      <PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <CellsInput columns="1" onClickCell={noop} rows="1" />
      </PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render when select last cell', () => {
    // before
    const { asFragment, container } = customRender(
      <PopoverCompound.PopoverRoot selected={false} setSelected={noop}>
        <CellsInput columns="1" onClickCell={noop} rows="1" />
      </PopoverCompound.PopoverRoot>,
    );

    // find
    const gridCellsInput = getByE2EAttribute(container, E2EAttribute.gridCellsInput);
    const gridCellInput = getByE2EAttribute(gridCellsInput, E2EAttribute.gridCellInput, 96);

    // action
    fireEvent.mouseMove(gridCellInput);

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
