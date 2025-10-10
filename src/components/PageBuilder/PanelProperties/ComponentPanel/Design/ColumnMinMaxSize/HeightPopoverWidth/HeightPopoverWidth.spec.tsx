import { noop } from 'lodash';
import { render } from '@testing-library/react';

// components
import HeightPopoverWidth from './HeightPopoverWidth';
import { UITools } from 'shared';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

describe('HeightPopoverWidth snapshots', () => {
  it('should render HeightPopoverWidth{max}', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverWidth score="max" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });

  it('should render HeightPopoverWidth{min}', () => {
    // before
    const { asFragment } = render(
      <UITools.PopoverCompound.PopoverRoot setSelected={noop}>
        <HeightPopoverWidth score="min" />
      </UITools.PopoverCompound.PopoverRoot>,
    );

    // result
    expect(asFragment()).toMatchSnapshot();
  });
});
